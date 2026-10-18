const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
initializeApp();
const db = getFirestore();
const KEY = 'learning-lab-profile-v2';
const REWARDS = { simple: 5, medium: 10, hard: 20 };
const RANK = { simple: 1, medium: 2, hard: 3 };
function difficulty(value) {
  const v = String(value || '').toLowerCase();
  if (['hard','advanced','difficult','складний'].includes(v)) return 'hard';
  if (['simple','easy','beginner','початковий','простий'].includes(v)) return 'simple';
  return 'medium';
}
function cleanScore(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0 || n > 100) throw new HttpsError('invalid-argument', 'Некоректний результат тесту.');
  return Math.round(n);
}
exports.claimLessonReward = onCall({ maxInstances: 10 }, async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Увійдіть в обліковий запис, щоб отримувати комп’юшки.');
  const uid = request.auth.uid;
  const lessonId = String(request.data?.lessonId || '').trim();
  if (!/^[a-z0-9-]{2,100}$/i.test(lessonId)) throw new HttpsError('invalid-argument', 'Некоректний ідентифікатор уроку.');
  const score = cleanScore(request.data?.scorePercent);
  const level = difficulty(request.data?.difficulty);
  if (score < 70) return { success: true, passed: false, coinsAwarded: 0, score, message: 'Потрібно набрати щонайменше 70%, щоб отримати комп’юшки.' };
  const profileRef = db.doc(`users/${uid}/privateData/progress`);
  const result = await db.runTransaction(async tx => {
    const snap = await tx.get(profileRef);
    const profile = snap.exists && snap.data().profile && typeof snap.data().profile === 'object' ? snap.data().profile : {};
    const coins = Math.max(0, Math.floor(Number(profile.coins) || 0));
    const completed = Array.isArray(profile.completed) ? profile.completed : [];
    const lessonResults = profile.lessonResults && typeof profile.lessonResults === 'object' ? profile.lessonResults : {};
    const lessonRewards = profile.lessonRewards && typeof profile.lessonRewards === 'object' ? profile.lessonRewards : {};
    const previous = lessonResults[lessonId] || { bestScore: null, baseAwarded: false, baseReward: 0 };
    const previousBest = previous.bestScore == null ? null : Number(previous.bestScore);
    let highest = previous.highestRewardedLevel || (previous.baseAwarded ? (previous.lastDifficulty || (Number(previous.baseReward) >= 20 ? 'hard' : Number(previous.baseReward) >= 10 ? 'medium' : 'simple')) : null);
    let amount = 0;
    if (RANK[level] > (RANK[highest] || 0)) {
      amount += REWARDS[level] - (REWARDS[highest] || 0);
      highest = level;
      previous.baseAwarded = true;
      previous.baseReward = REWARDS[level];
      previous.highestRewardedLevel = level;
      if (!completed.includes(lessonId)) completed.push(lessonId);
    }
    if (previousBest !== null && score > previousBest) amount += Math.max(1, Math.round((previous.baseReward || REWARDS[level]) * (score - previousBest) / 100));
    if (previousBest === null || score > previousBest) previous.bestScore = score;
    previous.lastScore = score;
    previous.lastDifficulty = level;
    previous.lastAttemptAt = new Date().toISOString();
    previous.highestRewardedLevel = highest;
    lessonResults[lessonId] = previous;
    lessonRewards[lessonId] = Math.max(Number(lessonRewards[lessonId]) || 0, Number(previous.baseReward) || 0);
    const ledger = Array.isArray(profile.ledger) ? profile.ledger : [];
    if (amount > 0) ledger.push({ id: `${Date.now()}-${lessonId}`, at: new Date().toISOString(), type: 'lesson-reward', lessonId, amount, score, difficulty: level, description: `Винагорода за урок: ${lessonId}` });
    profile.coins = coins + amount;
    profile.completed = completed;
    profile.lessonResults = lessonResults;
    profile.lessonRewards = lessonRewards;
    profile.ledger = ledger.slice(-500);
    profile.perfect = Array.isArray(profile.perfect) ? profile.perfect : [];
    if (score === 100 && !profile.perfect.includes(lessonId)) profile.perfect.push(lessonId);
    tx.set(profileRef, { profile, updatedAt: FieldValue.serverTimestamp(), rewardSource: 'server' }, { merge: true });
    return { success: true, passed: true, coinsAwarded: amount, score, profile };
  });
  return result;
});
