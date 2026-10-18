
'use strict';

const concepts = {
  triangle: {
    title: 'Трикутник — фігура з трьома сторонами',
    description: 'Трикутник — це многокутник, який має три сторони, три вершини й три кути. Вершини позначають великими літерами, а сторони часто — малими.',
    note: 'У будь-якого трикутника рівно три сторони, три вершини та три внутрішні кути. Сума внутрішніх кутів трикутника дорівнює 180°.'
  },
  sides: {
    title: 'Досліджуй довжини сторін',
    description: 'Порівняй довжини трьох сторін. Якщо всі вони рівні — трикутник рівносторонній; якщо рівні дві — рівнобедрений; якщо всі різні — різносторонній.',
    note: 'Рівносторонній трикутник є окремим випадком рівнобедреного в широкому значенні, але в шкільній класифікації його зазвичай виділяють окремо.'
  },
  angles: {
    title: 'Визначай трикутник за кутами',
    description: 'Гострий кут менший за 90°, прямий дорівнює 90°, а тупий більший за 90° і менший за 180°. У трикутнику може бути не більше одного прямого або тупого кута.',
    note: 'Сума трьох внутрішніх кутів трикутника становить 180°. Тому якщо один кут прямий або тупий, два інші обов’язково гострі.'
  },
  types: {
    title: 'Класифікуй трикутники',
    description: 'Трикутники класифікують за двома незалежними ознаками: довжинами сторін і величинами кутів. Наприклад, трикутник може бути і рівнобедреним, і гострокутним.',
    note: 'Назви за сторонами та за кутами описують різні властивості однієї фігури, тому їх можна поєднувати.'
  }
};

const cheatNotes = [
  'Трикутник має три сторони, три вершини й три кути.',
  'У рівностороннього трикутника всі сторони рівні, а кожен кут дорівнює 60°.',
  'У рівнобедреного трикутника дві сторони рівні; третя сторона — основа.',
  'Гострокутний: усі кути гострі. Прямокутний: один кут 90°. Тупокутний: один кут більший за 90°.',
  'Сума довжин будь-яких двох сторін має бути більшою за довжину третьої сторони.'
];

const questions = {
  easy: [
    {
      q: 'Скільки сторін має трикутник?',
      a: ['Дві', 'Три', 'Чотири', 'П’ять'],
      correct: 1,
      explanation: 'Трикутник має три сторони, які сполучають три вершини.'
    },
    {
      q: 'Як називається трикутник, у якого всі сторони рівні?',
      a: ['Різносторонній', 'Прямокутний', 'Рівносторонній', 'Тупокутний'],
      correct: 2,
      explanation: 'У рівностороннього трикутника всі три сторони однакової довжини. Кожен його кут дорівнює 60°.'
    },
    {
      q: 'Який кут називають прямим?',
      a: ['Менший за 90°', 'Рівний 90°', 'Більший за 90°', 'Рівний 180°'],
      correct: 1,
      explanation: 'Прямий кут має величину рівно 90°.'
    },
    {
      q: 'Скільки вершин має трикутник?',
      a: ['Одна', 'Дві', 'Шість', 'Три'],
      correct: 3,
      explanation: 'У трикутника три вершини — точки, у яких сходяться його сторони.'
    }
  ],

  medium: [
    {
      q: 'Довжини сторін трикутника — 4 см, 4 см і 7 см. Який це трикутник за сторонами?',
      a: ['Рівнобедрений', 'Рівносторонній', 'Різносторонній', 'Неможливо визначити'],
      correct: 0,
      explanation: 'Дві сторони мають однакову довжину — 4 см, тому трикутник рівнобедрений.'
    },
    {
      q: 'Який трикутник має один кут 90°?',
      a: ['Гострокутний', 'Тупокутний', 'Рівносторонній', 'Прямокутний'],
      correct: 3,
      explanation: 'Прямокутний трикутник має один прямий кут, тобто кут величиною 90°.'
    },
    {
      q: 'Чи можна побудувати трикутник зі сторонами 2 см, 3 см і 6 см?',
      a: ['Так, завжди', 'Так, якщо кут прямий', 'Ні, бо 2 + 3 менше за 6', 'Ні, бо всі сторони різні'],
      correct: 2,
      explanation: 'Сума двох коротших сторін 2 + 3 = 5 см, а це менше за 6 см. Умова існування трикутника не виконується.'
    },
    {
      q: 'Два кути трикутника дорівнюють 50° і 60°. Чому дорівнює третій кут?',
      a: ['70°', '80°', '90°', '110°'],
      correct: 0,
      explanation: 'Сума кутів трикутника дорівнює 180°. Третій кут: 180° − 50° − 60° = 70°.'
    },
    {
      q: 'Які кути має гострокутний трикутник?',
      a: ['Один прямий і два гострі', 'Один тупий і два гострі', 'Усі три гострі', 'Усі три прямі'],
      correct: 2,
      explanation: 'У гострокутному трикутнику кожен із трьох кутів менший за 90°.'
    },
    {
      q: 'Сторони трикутника дорівнюють 5 см, 6 см і 7 см. Як назвати його за сторонами?',
      a: ['Рівносторонній', 'Рівнобедрений', 'Різносторонній', 'Прямокутний'],
      correct: 2,
      explanation: 'Усі три довжини різні, отже, це різносторонній трикутник. За кутами його класифікують окремо.'
    }
  ],

  hard: [
    {
      q: 'Кути трикутника мають величини 35°, 55° і 90°. Який це трикутник за кутами?',
      a: ['Прямокутний', 'Гострокутний', 'Тупокутний', 'Рівносторонній'],
      correct: 0,
      explanation: 'Один із кутів дорівнює 90°, отже, трикутник прямокутний. Перевірка: 35° + 55° + 90° = 180°.'
    },
    {
      q: 'Периметр рівностороннього трикутника дорівнює 27 см. Яка довжина однієї сторони?',
      a: ['6 см', '8 см', '12 см', '9 см'],
      correct: 3,
      explanation: 'Усі три сторони рівні, тому довжина сторони дорівнює 27 ÷ 3 = 9 см.'
    },
    {
      q: 'Які довжини можуть бути сторонами трикутника?',
      a: ['2 см, 2 см, 5 см', '3 см, 4 см, 7 см', '4 см, 5 см, 6 см', '1 см, 3 см, 5 см'],
      correct: 2,
      explanation: 'Для 4, 5 і 6 суми будь-яких двох сторін більші за третю. В інших наборах принаймні дві сторони в сумі не перевищують третю.'
    },
    {
      q: 'Один кут трикутника дорівнює 110°. Який висновок правильний?',
      a: ['Трикутник гострокутний', 'Трикутник прямокутний', 'Трикутник тупокутний', 'Усі кути рівні'],
      correct: 2,
      explanation: 'Кут 110° більший за 90°, тому трикутник тупокутний. Два інші кути мають бути гострими.'
    },
    {
      q: 'У рівнобедреному трикутнику кут при вершині дорівнює 40°. Чому дорівнює кожен кут при основі?',
      a: ['40°', '60°', '70°', '140°'],
      correct: 2,
      explanation: 'Кути при основі рівні. Разом вони становлять 180° − 40° = 140°, отже, кожен дорівнює 140° ÷ 2 = 70°.'
    },
    {
      q: 'Яке твердження про рівносторонній трикутник правильне?',
      a: ['У нього лише дві рівні сторони', 'Один кут дорівнює 90°', 'Кожен кут дорівнює 60°', 'Сума кутів дорівнює 90°'],
      correct: 2,
      explanation: 'Усі кути рівностороннього трикутника рівні, а їх сума — 180°. Тому кожен кут дорівнює 180° ÷ 3 = 60°.'
    },
    {
      q: 'Два кути трикутника дорівнюють 25° і 95°. Який третій кут і вид трикутника за кутами?',
      a: ['60°, гострокутний', '60°, тупокутний', '70°, прямокутний', '95°, тупокутний'],
      correct: 1,
      explanation: 'Третій кут: 180° − 25° − 95° = 60°. Оскільки є кут 95° > 90°, трикутник тупокутний.'
    },
    {
      q: 'Учень каже: «Трикутник зі сторонами 5 см, 5 см і 5 см — різносторонній». У чому помилка?',
      a: ['Периметр завеликий', 'Усі сторони рівні, тому він рівносторонній', 'Такий трикутник побудувати не можна', 'У нього немає кутів'],
      correct: 1,
      explanation: 'Різносторонній трикутник має три сторони різної довжини. Тут усі сторони по 5 см, тому трикутник рівносторонній.'
    }
  ]
};

const levelInfo = {
  easy: { label: 'Простий рівень', stars: 10 },
  medium: { label: 'Середній рівень', stars: 15 },
  hard: { label: 'Складний рівень', stars: 20 }
};

const state = {
  concept: 'triangle',
  level: 'easy',
  index: 0,
  correct: 0,
  answered: false,
  finished: false,
  rewardClaimed: false,
  stars: 0
};

const $ = (id) => document.getElementById(id);
const conceptGrid = $('conceptGrid');

function setConcept(key) {
  if (!concepts[key]) return;

  state.concept = key;

  conceptGrid.querySelectorAll('[data-concept]').forEach((button) => {
    const active = button.dataset.concept === key;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  $('labTitle').textContent = concepts[key].title;
  $('labDescription').textContent = concepts[key].description;
  $('conceptNote').replaceChildren();

  const icon = document.createElement('span');
  icon.className = 'note-icon';
  icon.textContent = '✦';

  const text = document.createElement('span');
  const strong = document.createElement('strong');
  strong.textContent = 'Пам’ятай: ';

  text.append(strong, document.createTextNode(concepts[key].note));
  $('conceptNote').append(icon, text);
}

function classifySides(a, b, c) {
  if (a === b && b === c) return 'Рівносторонній';
  if (a === b || a === c || b === c) return 'Рівнобедрений';
  return 'Різносторонній';
}

function triangleAngles(a, b, c) {
  const sides = [a, b, c].sort((x, y) => x - y);
  const [x, y, z] = sides;
  const delta = x * x + y * y - z * z;

  if (Math.abs(delta) < 1e-8) return 'Прямокутний';
  return delta > 0 ? 'Гострокутний' : 'Тупокутний';
}

function triangleIsValid(a, b, c) {
  return [a, b, c].every(Number.isFinite) &&
    [a, b, c].every((v) => Number.isInteger(v) && v >= 1 && v <= 12) &&
    a + b > c &&
    a + c > b &&
    b + c > a;
}

function drawTriangle(a, b, c) {
  // Сторона a = BC, b = AC, c = AB.
  const scale = 25;
  const A = { x: 180, y: 220 };
  const B = { x: 180 - c * scale, y: 220 };
  const xC = (b * b + c * c - a * a) / (2 * c);
  const yC = Math.sqrt(Math.max(0, b * b - xC * xC));
  const C = { x: B.x + xC * scale, y: 220 - yC * scale };

  const pts = [A, B, C];
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const width = maxX - minX;
  const height = maxY - minY;
  const fit = Math.min(
    290 / Math.max(width, 1),
    185 / Math.max(height, 1),
    1.2
  );

  const mapped = pts.map((p) => ({
    x: 180 + (p.x - (minX + maxX) / 2) * fit,
    y: 125 + (p.y - (minY + maxY) / 2) * fit
  }));

  const [pa, pb, pc] = mapped;

  $('trianglePolygon').setAttribute(
    'points',
    mapped.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  );

  $('sideLabelA').setAttribute('x', ((pb.x + pc.x) / 2 - 14).toFixed(1));
  $('sideLabelA').setAttribute('y', ((pb.y + pc.y) / 2 - 7).toFixed(1));
  $('sideLabelA').textContent = String(a);

  $('sideLabelB').setAttribute('x', ((pa.x + pc.x) / 2 + 7).toFixed(1));
  $('sideLabelB').setAttribute('y', ((pa.y + pc.y) / 2 - 3).toFixed(1));
  $('sideLabelB').textContent = String(b);

  $('sideLabelC').setAttribute('x', ((pa.x + pb.x) / 2 - 4).toFixed(1));
  $('sideLabelC').setAttribute('y', (Math.max(pa.y, pb.y) + 17).toFixed(1));
  $('sideLabelC').textContent = String(c);

  $('triangleSvg').setAttribute(
    'aria-label',
    `Трикутник зі сторонами ${a}, ${b} і ${c}`
  );
}

function updateTriangle(a, b, c, message) {
  if (!triangleIsValid(a, b, c)) {
    $('modelStatus').className = 'stage-status is-error';
    $('modelStatus').textContent =
      'Такого трикутника не існує. Перевір, чи сума будь-яких двох сторін більша за третю, а кожна довжина — від 1 до 12.';
    return false;
  }

  drawTriangle(a, b, c);

  const sidesType = classifySides(a, b, c);
  const anglesType = triangleAngles(a, b, c);

  $('sideClassification').textContent = sidesType;
  $('angleClassification').textContent = anglesType;
  $('triangleTypeBadge').textContent = sidesType;
  $('modelStatus').className = 'stage-status is-success';
  $('modelStatus').textContent =
    message || `Готово! Це ${sidesType.toLowerCase()} і ${anglesType.toLowerCase()} трикутник.`;

  return true;
}

function getSideValues() {
  return ['sideA', 'sideB', 'sideC'].map((id) => Number($(id).value));
}

function buildTriangle() {
  updateTriangle(...getSideValues());
}

function resetTriangle() {
  $('sideA').value = '5';
  $('sideB').value = '6';
  $('sideC').value = '7';

  updateTriangle(
    5,
    6,
    7,
    'Приклад відновлено. Порівняй сторони й кути трикутника.'
  );
}

function applyPreset(kind) {
  const presets = {
    equilateral: [6, 6, 6],
    isosceles: [5, 5, 8],
    right: [3, 4, 5]
  };

  const vals = presets[kind];
  if (!vals) return;

  ['sideA', 'sideB', 'sideC'].forEach((id, i) => {
    $(id).value = String(vals[i]);
  });

  buildTriangle();
}

function renderQuestion() {
  const set = questions[state.level];

  if (state.index >= set.length) {
    showResults();
    return;
  }

  state.answered = false;
  $('quizActive').hidden = false;
  $('quizResult').hidden = true;
  $('quizLevelLabel').textContent = levelInfo[state.level].label;
  $('questionCounter').textContent =
    `Запитання ${state.index + 1} із ${set.length}`;
  $('correctCounter').textContent = String(state.correct);
  $('questionNumber').textContent = String(state.index + 1).padStart(2, '0');
  $('questionText').textContent = set[state.index].q;
  $('answerList').replaceChildren();
  $('feedbackBox').hidden = true;
  $('feedbackBox').textContent = '';
  $('nextQuestion').disabled = true;

  const progress = Math.round((state.index / set.length) * 100);
  $('progressFill').style.width = `${progress}%`;
  $('progressTrack').setAttribute('aria-valuenow', String(progress));

  set[state.index].a.forEach((answer, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-option';

    const letter = document.createElement('span');
    letter.className = 'answer-letter';
    letter.textContent = String.fromCharCode(65 + index);

    const label = document.createElement('span');
    label.className = 'answer-text';
    label.textContent = answer;

    button.append(letter, label);
    button.addEventListener('click', () => chooseAnswer(index));
    $('answerList').append(button);
  });
}

function chooseAnswer(choice) {
  if (state.answered || state.finished) return;

  const question = questions[state.level][state.index];
  state.answered = true;

  const buttons = [...$('answerList').querySelectorAll('button')];

  buttons.forEach((button, i) => {
    button.disabled = true;

    if (i === question.correct) {
      button.classList.add('is-correct');
    }

    if (i === choice && choice !== question.correct) {
      button.classList.add('is-wrong');
    }
  });

  const correct = choice === question.correct;
  if (correct) state.correct++;

  $('correctCounter').textContent = String(state.correct);

  const feedback = $('feedbackBox');
  feedback.hidden = false;
  feedback.className = `feedback-box ${correct ? 'is-correct' : 'is-wrong'}`;

  const heading = document.createElement('strong');
  heading.textContent = correct ? 'Правильно!' : 'Спробуй запам’ятати:';

  const explanation = document.createElement('p');
  explanation.textContent = question.explanation;

  feedback.replaceChildren(heading, explanation);
  $('nextQuestion').disabled = false;
  $('nextQuestion').innerHTML =
    state.index === questions[state.level].length - 1
      ? 'Побачити результат <span aria-hidden="true">→</span>'
      : 'Наступне <span aria-hidden="true">→</span>';
}

function nextQuestion() {
  if (!state.answered) return;
  state.index++;
  renderQuestion();
}

function showResults() {
  state.finished = true;
  $('quizActive').hidden = true;
  $('quizResult').hidden = false;

  const total = questions[state.level].length;
  const percent = Math.round((state.correct / total) * 100);
$('finalCorrect').textContent = `${state.correct}/${total}`;
  $('finalPercent').textContent = `${percent}%`;
  $('earnedStars').textContent = `+${levelInfo[state.level].stars}`;

  $('resultTitle').textContent =
    percent === 100
      ? 'Безпомилково!'
      : percent >= 75
        ? 'Чудова робота!'
        : percent >= 50
          ? 'Гарний поступ!'
          : 'Тренування триває!';

  $('resultMessage').textContent =
    percent === 100
      ? 'Ти правильно відповів/відповіла на всі запитання й чудово розрізняєш види трикутників.'
      : percent >= 75
        ? 'Ти добре розумієш тему. Переглянь пояснення до помилок, щоб закріпити знання.'
        : percent >= 50
          ? 'Основи вже знайомі. Повтори шпаргалку й спробуй ще раз, щоб покращити результат.'
          : 'Не засмучуйся: повернися до моделі та шпаргалки, а потім пройди тест знову.';

  $('claimReward').disabled = state.rewardClaimed;
  $('rewardNote').textContent = state.rewardClaimed
    ? `За цю спробу вже отримано ${levelInfo[state.level].stars} зірочок. Загалом: ${state.stars}.`
    : 'Зірочки нараховуються один раз за завершену спробу.';

  $('progressFill').style.width = '100%';
  $('progressTrack').setAttribute('aria-valuenow', '100');

    // Єдине нарахування комп’юшок: результат обробляється після відображення підсумку.
    Promise.resolve().then(async () => {
      const scorePercent = typeof percent !== 'undefined' ? percent : (typeof pct !== 'undefined' ? pct : 0);
      const rewardResult = await window.LearningGamification?.awardTestResult("triangle", scorePercent, state.level);
      const claimButton = document.getElementById('claimReward');
      if (claimButton) claimButton.hidden = true;
      const starLabel = document.getElementById('earnedStars');
      if (starLabel) starLabel.textContent = rewardResult?.passed ? `🪙 ${rewardResult.coinsAwarded} комп’юшок` : 'Потрібно 70% для винагороди';
      const note = document.getElementById('rewardNote');
      if (note) note.textContent = rewardResult?.message || 'Комп’юшки нараховуються автоматично після тесту.';
    });
}
function resetQuiz() {
  state.index = 0;
  state.correct = 0;
  state.answered = false;
  state.finished = false;
  state.rewardClaimed = false;

  $('claimReward').disabled = false;
  $('nextQuestion').innerHTML = 'Наступне <span aria-hidden="true">→</span>';

  renderQuestion();
}

function chooseLevel(level) {
  if (!questions[level]) return;

  state.level = level;

  document.querySelectorAll('[data-level]').forEach((button) => {
    const active = button.dataset.level === level;
    button.classList.toggle('is-selected', active);
    button.setAttribute('aria-pressed', String(active));
  });

  resetQuiz();
}

function claimReward() {
  if (!state.finished || state.rewardClaimed) return;

  state.rewardClaimed = true;
  state.stars += levelInfo[state.level].stars;

  $('claimReward').disabled = true;
  $('rewardNote').textContent =
    `Нараховано ${levelInfo[state.level].stars} зірочок! Твій загальний рахунок: ${state.stars} ✦`;
}

conceptGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-concept]');
  if (button) setConcept(button.dataset.concept);
});

document.querySelectorAll('[data-level]').forEach((button) => {
  button.addEventListener('click', () => chooseLevel(button.dataset.level));
});

document.querySelectorAll('[data-triangle-preset]').forEach((button) => {
  button.addEventListener('click', () =>
    applyPreset(button.dataset.trianglePreset)
  );
});

$('buildTriangle').addEventListener('click', buildTriangle);
$('resetTriangle').addEventListener('click', resetTriangle);
$('resetModel').addEventListener('click', resetTriangle);
$('nextQuestion').addEventListener('click', nextQuestion);
$('retryQuiz').addEventListener('click', resetQuiz);
$('claimReward').addEventListener('click', claimReward);

$('sideA').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') buildTriangle();
});

$('sideB').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') buildTriangle();
});

$('sideC').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') buildTriangle();
});

setConcept('triangle');
updateTriangle(5, 6, 7);
renderQuestion();
