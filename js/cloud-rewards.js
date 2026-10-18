/* Безкоштовне клієнтське нарахування комп’юшок через Firestore.
   Увага: без довіреного сервера клієнт може підробити баланс. Це компроміс для безкоштовного тарифу. */
import { auth, db } from './firebase-client.js';
import { doc, runTransaction, serverTimestamp } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';

const PROFILE_KEY = 'learning-lab-profile-v2';
const EMPTY = { coins: 0, completed: [], perfect: [], achievements: [], lessonRewards: {}, lessonResults: {}, purchases: [], ledger: [] };
const REWARDS = { simple: 5, medium: 10, hard: 20 };
const RANK = { simple: 1, medium: 2, hard: 3 };
const SHOP = {
  'avatar-neon': { title: 'Неоновий аватар', price: 30, type: 'cosmetic' },
  'profile-frame': { title: 'Рамка дослідника', price: 45, type: 'cosmetic' },
  'hint-token': { title: 'Жетон підказки', price: 20, type: 'utility' },
  'title-inventor': { title: 'Звання «Винахідник»', price: 60, type: 'cosmetic' }
};
function normalizeDifficulty(value) {
  const v = String(value || '').toLowerCase();
  if (['hard', 'advanced', 'difficult', 'складний'].includes(v)) return 'hard';
  if (['simple', 'easy', 'beginner', 'початковий', 'простий'].includes(v)) return 'simple';
  return 'medium';
}
function normalizeProfile(value) {
  const p = { ...EMPTY, ...(value || {}) };
  p.coins = Math.max(0, Math.floor(Number(p.coins) || 0));
  for (const key of ['completed','perfect','achievements','purchases','ledger']) p[key] = Array.isArray(p[key]) ? p[key] : [];
  for (const key of ['lessonRewards','lessonResults']) p[key] = p[key] && typeof p[key] === 'object' ? p[key] : {};
  return p;
}
function localize(p) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  localStorage.setItem('learning-lab-completed', JSON.stringify(p.completed));
  window.dispatchEvent(new CustomEvent('learninglab:cloud-restored'));
  window.dispatchEvent(new CustomEvent('learninglab:progress-changed'));
}
function requireUser() {
  if (!auth.currentUser) throw new Error('Увійди в акаунт, щоб синхронізувати комп’юшки.');
  return doc(db, 'users', auth.currentUser.uid, 'privateData', 'progress');
}
function ledger(p, entry) {
  p.ledger.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, at: new Date().toISOString(), ...entry });
  p.ledger = p.ledger.slice(-500);
}

export async function awardTestResultCloud(lessonId, scorePercent, difficulty = 'medium') {
  if (!lessonId || !Number.isFinite(Number(scorePercent))) return { success: false, passed: false, coinsAwarded: 0, message: 'Некоректний результат тесту.' };
  const score = Math.max(0, Math.min(100, Math.round(Number(scorePercent))));
  if (score < 70) return { success: true, passed: false, coinsAwarded: 0, score, message: 'Потрібно набрати щонайменше 70%, щоб отримати комп’юшки.' };
  const level = normalizeDifficulty(difficulty);
  const profileRef = requireUser();
  const result = await runTransaction(db, async tx => {
    const snap = await tx.get(profileRef);
    const p = normalizeProfile(snap.exists() ? snap.data().profile : null);
    const previous = { bestScore: null, baseAwarded: false, baseReward: 0, ...(p.lessonResults[lessonId] || {}) };
    const previousBest = previous.bestScore == null ? null : Number(previous.bestScore);
    let highest = previous.highestRewardedLevel || (previous.baseAwarded ? (previous.lastDifficulty || (Number(previous.baseReward) >= 20 ? 'hard' : Number(previous.baseReward) >= 10 ? 'medium' : 'simple')) : null);
    if (highest && !REWARDS[highest]) highest = normalizeDifficulty(highest);
    let baseAward = 0, improvementBonus = 0;
    if (RANK[level] > (RANK[highest] || 0)) {
      baseAward = REWARDS[level] - (REWARDS[highest] || 0);
      if (baseAward > 0) {
        highest = level;
        previous.baseAwarded = true;
        previous.baseReward = REWARDS[level];
        if (!p.completed.includes(lessonId)) p.completed.push(lessonId);
        ledger(p, { type: 'lesson-base', lessonId, amount: baseAward, score, difficulty: level, description: `Винагорода за рівень складності (${level})` });
      }
    }
    if (previousBest !== null && score > previousBest) {
      improvementBonus = Math.max(1, Math.round((previous.baseReward || REWARDS[level]) * (score - previousBest) / 100));
      ledger(p, { type: 'lesson-improvement', lessonId, amount: improvementBonus, previousScore: previousBest, score, difficulty: level, description: `Бонус за покращення результату` });
    }
    if (previousBest === null || score > previousBest) previous.bestScore = score;
    previous.lastScore = score; previous.lastDifficulty = level; previous.lastAttemptAt = new Date().toISOString();
    previous.highestRewardedLevel = highest; previous.baseAwarded = Boolean(highest); previous.baseReward = highest ? REWARDS[highest] : 0;
    p.lessonResults[lessonId] = previous;
    p.lessonRewards[lessonId] = Math.max(Number(p.lessonRewards[lessonId]) || 0, Number(previous.baseReward) || 0);
    p.coins += baseAward + improvementBonus;
    if (score === 100 && !p.perfect.includes(lessonId)) p.perfect.push(lessonId);
    tx.set(profileRef, { profile: p, updatedAt: serverTimestamp(), rewardSource: 'client' });
    return { success: true, passed: true, coinsAwarded: baseAward + improvementBonus, baseAward, improvementBonus, score, bestScore: previous.bestScore, highestRewardedLevel: highest, profile: p };
  });
  if (result.profile) localize(result.profile);
  result.message = result.baseAward ? `🪙 +${result.baseAward} комп’юшок за рівень «${level === 'simple' ? 'Простий' : level === 'medium' ? 'Середній' : 'Складний'}»!` : result.improvementBonus ? `🪙 +${result.improvementBonus} комп’юшок за покращення результату!` : 'Нових комп’юшок цього разу немає. Покращуй свій найкращий результат!';
  return result;
}

export async function purchaseRewardCloud(itemId) {
  const item = SHOP[itemId];
  if (!item) return { success: false, message: 'Такої нагороди немає.' };
  const profileRef = requireUser();
  const result = await runTransaction(db, async tx => {
    const snap = await tx.get(profileRef);
    const p = normalizeProfile(snap.exists() ? snap.data().profile : null);
    if (item.type === 'cosmetic' && p.purchases.some(x => x.itemId === itemId && x.status !== 'consumed')) return { success: false, message: 'Цю нагороду вже відкрито.' };
    if (p.coins < item.price) return { success: false, message: 'Поки бракує комп’юшок для цієї нагороди.' };
    p.coins -= item.price;
    const purchase = { itemId, title: item.title, price: item.price, type: item.type, purchasedAt: new Date().toISOString(), status: 'owned' };
    p.purchases.push(purchase);
    ledger(p, { type: 'shop-purchase', itemId, amount: -item.price, description: `Відкрито нагороду: ${item.title}` });
    tx.set(profileRef, { profile: p, updatedAt: serverTimestamp(), rewardSource: 'client' });
    return { success: true, purchase, profile: p, message: `Нагороду відкрито: ${item.title}.` };
  });
  if (result.profile) localize(result.profile);
  return { ...result, item: { id: itemId, ...item } };
}
