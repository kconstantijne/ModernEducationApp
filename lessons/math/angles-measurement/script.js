
'use strict';

const concepts = {
  angle: {
    title: 'Кут — фігура з двох променів',
    description: 'Кут утворюють два промені зі спільним початком. Цей спільний початок називають вершиною кута, а промені — його сторонами.',
    note: 'Кут можна позначити трьома великими літерами, наприклад ∠AOB. Літера вершини O стоїть посередині.'
  },
  vertex: {
    title: 'Знайди вершину кута',
    description: 'Вершина — це точка, з якої виходять обидві сторони кута. У записі ∠AOB вершина позначена середньою літерою O.',
    note: 'Коли вимірюєш кут транспортиром, саме центр транспортира потрібно поставити на вершину.'
  },
  rays: {
    title: 'Досліджуй сторони кута',
    description: 'Сторони кута — це два промені зі спільним початком. Один промінь можна уявити як напрямну лінію, що починається у вершині й триває в одному напрямку.',
    note: 'Промені OA і OB мають спільний початок O. Кут показує, наскільки вони розходяться.'
  },
  measure: {
    title: 'Вимірюй кут у градусах',
    description: 'Градусна міра показує величину кута. Для вимірювання використовують транспортир, а результат записують числом із символом градуса: наприклад, 60°.',
    note: 'Прямий кут дорівнює 90°. Якщо кут менший за 90°, він гострий; якщо більший за 90°, але менший за 180°, — тупий.'
  }
};

const cheatNotes = [
  'Кут утворюють два промені зі спільним початком — вершиною.',
  'Гострий кут більший за 0° і менший за 90°.',
  'Прямий кут дорівнює 90°, а тупий — більший за 90° і менший за 180°.',
  'Розгорнутий кут дорівнює 180°; його сторони лежать на одній прямій у протилежних напрямках.',
  'Для вимірювання сумісти центр транспортира з вершиною кута, а нульову лінію — з однією зі сторін.'
];

const questions = {
  easy: [
    {
      q: 'Що утворюють два промені зі спільним початком?',
      a: ['Відрізок', 'Кут', 'Пряму', 'Трикутник'],
      correct: 1,
      explanation: 'Два промені зі спільним початком утворюють кут. Спільний початок називають вершиною.'
    },
    {
      q: 'Як називається спільний початок сторін кута?',
      a: ['Вершина', 'Середина', 'Діаметр', 'Центр кола'],
      correct: 0,
      explanation: 'Вершина — це точка, з якої виходять обидві сторони кута.'
    },
    {
      q: 'Яка градусна міра прямого кута?',
      a: ['45°', '180°', '90°', '60°'],
      correct: 2,
      explanation: 'Прямий кут дорівнює рівно 90°. Наприклад, він є в куті аркуша прямокутної форми.'
    },
    {
      q: 'Який кут називають гострим?',
      a: ['Рівний 180°', 'Більший за 90°', 'Рівний 90°', 'Менший за 90° і більший за 0°'],
      correct: 3,
      explanation: 'Гострий кут має градусну міру більше за 0°, але менше за 90°.'
    }
  ],

  medium: [
    {
      q: 'Кут має величину 125°. Як його назвати?',
      a: ['Гострий', 'Тупий', 'Прямий', 'Нульовий'],
      correct: 1,
      explanation: '125° більше за 90°, але менше за 180°, тому це тупий кут.'
    },
    {
      q: 'Який кут є розгорнутим?',
      a: ['90°', '45°', '180°', '135°'],
      correct: 2,
      explanation: 'Розгорнутий кут дорівнює 180°. Його сторони є протилежними променями однієї прямої.'
    },
    {
      q: 'Транспортир показує 72°. Який це кут?',
      a: ['Тупий', 'Прямий', 'Розгорнутий', 'Гострий'],
      correct: 3,
      explanation: '72° менше за 90° і більше за 0°, отже, кут гострий.'
    },
    {
      q: 'На транспортирі потрібно виміряти кут. Що слід зробити насамперед?',
      a: [
        'Поставити центр транспортира на вершину кута',
        'Порахувати всі поділки лінійки',
        'Сумістити край транспортира з вершиною, не зважаючи на сторони',
        'Помножити показник на 2'
      ],
      correct: 0,
      explanation: 'Центр транспортира суміщають із вершиною кута, а нульову лінію — з однією зі сторін. Тоді можна прочитати градусну міру біля другої сторони.'
    },
    {
      q: 'Яка градусна міра більша за 90°, але менша за 180°?',
      a: ['35°', '90°', '140°', '180°'],
      correct: 2,
      explanation: '140° лежить між 90° і 180°, тому це тупий кут.'
    },
    {
      q: 'Яке твердження правильне?',
      a: [
        'Кут 90° є тупим',
        'Кут 30° є гострим',
        'Кут 180° є прямим',
        'Кут 110° є гострим'
      ],
      correct: 1,
      explanation: '30° менше за 90°, отже, це гострий кут. 90° — прямий, 110° — тупий, 180° — розгорнутий.'
    }
  ],

  hard: [
    {
      q: 'Учень виміряв кут і отримав 89°. Який висновок правильний?',
      a: [
        'Це прямий кут',
        'Це тупий кут',
        'Це розгорнутий кут',
        'Це гострий кут, на 1° менший за прямий'
      ],
      correct: 3,
      explanation: '89° на один градус менше за 90°, тому кут гострий, а не прямий.'
    },
    {
      q: 'Кут збільшили з 40° на 25°. Якою стала його величина?',
      a: ['65°', '55°', '75°', '15°'],
      correct: 0,
      explanation: 'Додаємо приріст до початкової величини: 40° + 25° = 65°.'
    },
    {
      q: 'Кут зменшили зі 150° на 35°. Яка нова величина й вид кута?',
      a: ['115°, гострий', '125°, тупий', '115°, тупий', '185°, розгорнутий'],
      correct: 2,
      explanation: '150° − 35° = 115°. Це більше за 90° і менше за 180°, тому кут тупий.'
    },
    {
      q: 'На скільки градусів прямий кут менший за розгорнутий?',
      a: ['45°', '90°', '180°', '270°'],
      correct: 1,
      explanation: 'Розгорнутий кут — 180°, прямий — 90°. Різниця: 180° − 90° = 90°.'
    },
    {
      q: 'Марко назвав кут 90° гострим. Яка помилка в його міркуванні?',
      a: [
        'Гострі кути завжди більші за 180°',
        'Кут 90° не можна виміряти',
        'Кут 90° є прямим, бо гострий кут менший за 90°',
        'Гострий кут завжди дорівнює 0°'
      ],
      correct: 2,
      explanation: 'Гострий кут строго менший за 90°. Кут, який дорівнює 90°, називають прямим.'
    },
    {
      q: 'Кут 178° порівняно з розгорнутим кутом…',
      a: ['на 2° менший', 'на 2° більший', 'дорівнює йому', 'на 90° менший'],
      correct: 0,
      explanation: '180° − 178° = 2°. Отже, кут 178° на 2° менший за розгорнутий.'
    },
    {
      q: 'Який набір містить лише гострі кути?',
      a: [
        '30°, 90°, 45°',
        '10°, 89°, 65°',
        '91°, 40°, 50°',
        '0°, 45°, 60°'
      ],
      correct: 1,
      explanation: 'Усі кути в наборі 10°, 89° і 65° більші за 0° та менші за 90°.'
    },
    {
      q: 'Під час вимірювання одна сторона кута збігається з нульовою лінією, а друга проходить через позначку 135°. Який результат слід записати?',
      a: ['45°', '90°', '180°', '135°'],
      correct: 3,
      explanation: 'Якщо нульову лінію суміщено правильно, градусна міра читається за позначкою, через яку проходить друга сторона: це 135°.'
    }
  ]
};

const levelInfo = {
  easy: { label: 'Простий рівень', stars: 10 },
  medium: { label: 'Середній рівень', stars: 15 },
  hard: { label: 'Складний рівень', stars: 20 }
};

const state = {
  concept: 'angle',
  level: 'easy',
  index: 0,
  correct: 0,
  answered: false,
  finished: false,
  rewardClaimed: false
};

const $ = (id) => document.getElementById(id);

const conceptGrid = $('conceptGrid');
const angleRange = $('angleRange');
const angleInput = $('angleInput');

const angleOrigin = { x: 220, y: 235 };
const rayLength = 165;
const arcRadius = 60;

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

  const content = document.createElement('span');
  const strong = document.createElement('strong');
  strong.textContent = 'Пам’ятай: ';

  content.append(strong, document.createTextNode(concepts[key].note));
  $('conceptNote').append(icon, content);
}

function classifyAngle(degrees) {
  if (degrees === 0) return 'Нульовий';
  if (degrees === 180) return 'Розгорнутий';
  if (degrees === 90) return 'Прямий';

  return degrees < 90 ? 'Гострий' : 'Тупий';
}

function polarPoint(radius, degrees) {
  const radians = degrees * Math.PI / 180;

  return {
    x: angleOrigin.x + radius * Math.cos(radians),
    y: angleOrigin.y - radius * Math.sin(radians)
  };
}

function svgElement(tag, attributes) {
  const element = document.createElementNS(
    'http://www.w3.org/2000/svg',
    tag
  );

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, String(value));
  });

  return element;
}

function drawProtractor() {
  const group = $('protractorMarks');
  group.replaceChildren();

  for (let degree = 0; degree <= 180; degree += 10) {
    const outer = polarPoint(132, degree);
    const inner = polarPoint(
      degree % 30 === 0 ? 113 : 121,
      degree
    );

    group.append(svgElement('line', {
      x1: inner.x.toFixed(2),
      y1: inner.y.toFixed(2),
      x2: outer.x.toFixed(2),
      y2: outer.y.toFixed(2),
      stroke: degree % 30 === 0 ? '#a6a1d8' : '#d4d2e8',
      'stroke-width': degree % 30 === 0 ? 2 : 1.2,
      'stroke-linecap': 'round'
    }));

    if (degree % 30 === 0) {
      const labelPoint = polarPoint(151, degree);

      const label = svgElement('text', {
        x: labelPoint.x.toFixed(2),
        y: (labelPoint.y + 4).toFixed(2),
        'text-anchor': 'middle',
        fill: '#777b96',
        'font-size': 10,
        'font-weight': 700
      });

      label.textContent = String(degree);
      group.append(label);
    }
  }
}

function updateAngle(rawValue, message = true) {
  const degrees = Number(rawValue);

  if (
    !Number.isFinite(degrees) ||
    !Number.isInteger(degrees) ||
    degrees < 0 ||
    degrees > 180
  ) {
    $('modelStatus').classList.add('is-error');
    $('modelStatus').classList.remove('is-success');
    $('modelStatus').textContent =
      'Введи ціле число від 0° до 180°. Модель не змінено.';

    angleInput.setAttribute('aria-invalid', 'true');
    return false;
  }

  angleInput.removeAttribute('aria-invalid');

  angleRange.value = String(degrees);
  angleInput.value = String(degrees);

  $('rangeValue').textContent = `${degrees}°`;
  $('angleReadout').textContent = `${degrees}°`;

  const type = classifyAngle(degrees);

  $('angleTypeBadge').textContent = `${type} кут`;
  $('angleClassification').textContent = type;

  $('angleComparison').textContent =
    degrees < 90
      ? 'Менший'
      : degrees === 90
        ? 'Дорівнює'
        : degrees < 180
          ? 'Більший'
          : '180°';

  const end = polarPoint(rayLength, degrees);

  $('angleRay').setAttribute(
    'd',
    `M ${angleOrigin.x} ${angleOrigin.y} L ${end.x.toFixed(2)} ${end.y.toFixed(2)}`
  );

  $('rayEndLabel').setAttribute(
    'x',
    (end.x + (degrees > 100 ? -15 : 7)).toFixed(2)
  );

  $('rayEndLabel').setAttribute(
    'y',
    (end.y + (degrees > 140 ? -8 : 2)).toFixed(2)
  );

  const arcStart = polarPoint(arcRadius, 0);
  const arcEnd = polarPoint(arcRadius, degrees);
  const largeArc = degrees > 180 ? 1 : 0;

  const arcPath = degrees === 0
    ? ''
    : `M ${arcStart.x.toFixed(2)} ${arcStart.y.toFixed(2)} A ${arcRadius} ${arcRadius} 0 ${largeArc} 0 ${arcEnd.x.toFixed(2)} ${arcEnd.y.toFixed(2)}`;

  $('angleArc').setAttribute('d', arcPath);

  const labelPoint = polarPoint(
    arcRadius + 27,
    Math.max(8, Math.min(172, degrees / 2))
  );

  $('angleMeasureLabel').setAttribute(
    'x',
    labelPoint.x.toFixed(2)
  );

  $('angleMeasureLabel').setAttribute(
    'y',
    (labelPoint.y - 4).toFixed(2)
  );

  $('angleMeasureLabel').textContent = `${degrees}°`;

  const marker = $('rightAngleMark');

  if (degrees === 90) {
    marker.setAttribute(
      'd',
      `M ${angleOrigin.x + 25} ${angleOrigin.y} L ${angleOrigin.x + 25} ${angleOrigin.y - 25} L ${angleOrigin.x} ${angleOrigin.y - 25}`
    );

    marker.setAttribute('opacity', '1');
  } else {
    marker.setAttribute('d', '');
    marker.setAttribute('opacity', '0');
  }

  const explanation = degrees === 0
    ? 'Кут 0° — нульовий: обидві сторони збігаються.'
    : degrees === 90
      ? 'Кут 90° — прямий. На моделі його позначено маленьким квадратиком.'
      : degrees === 180
        ? 'Кут 180° — розгорнутий: сторони є протилежними променями.'
        : degrees < 90
          ? `Кут ${degrees}° — гострий, бо менший за 90°.`
          : `Кут ${degrees}° — тупий, бо більший за 90°, але менший за 180°.`;

  $('modelStatus').classList.remove('is-error');
  $('modelStatus').classList.toggle('is-success', message);
  $('modelStatus').replaceChildren();

  const dot = document.createElement('span');
  dot.className = 'status-dot';

  $('modelStatus').append(
    dot,
    document.createTextNode(explanation)
  );

  return true;
}

function resetModel() {
  updateAngle(60, false);
  $('modelStatus').classList.remove('is-error');
}

function renderQuestion() {
  const list = questions[state.level];
  const item = list[state.index];

  state.answered = false;

  $('feedbackBox').hidden = true;
  $('feedbackBox').className = 'feedback-box';
  $('nextQuestion').disabled = true;

  $('nextQuestion').innerHTML = state.index === list.length - 1
    ? 'Побачити результат <span aria-hidden="true">→</span>'
    : 'Наступне <span aria-hidden="true">→</span>';

  $('questionCounter').textContent =
    `Запитання ${state.index + 1} із ${list.length}`;

  $('correctCounter').textContent = String(state.correct);

  $('questionNumber').textContent =
    String(state.index + 1).padStart(2, '0');

  $('questionText').textContent = item.q;

  const progress = Math.round(
    (state.index / list.length) * 100
  );

  $('progressFill').style.width = `${progress}%`;

  $('progressTrack').setAttribute(
    'aria-valuenow',
    String(progress)
  );

  $('answerList').replaceChildren();

  item.a.forEach((answer, index) => {
    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'answer-option';
    button.dataset.answer = String(index);

    button.setAttribute(
      'aria-label',
      `Варіант ${String.fromCharCode(65 + index)}: ${answer}`
    );

    const letter = document.createElement('span');
    letter.className = 'answer-letter';
    letter.textContent = String.fromCharCode(65 + index);

    const text = document.createElement('span');
    text.className = 'answer-text';
    text.textContent = answer;

    button.append(letter, text);

    button.addEventListener('click', () => {
      chooseAnswer(index);
    });

    $('answerList').append(button);
  });
}

function chooseAnswer(index) {
  if (state.answered || state.finished) return;

  const item = questions[state.level][state.index];

  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index >= item.a.length
  ) {
    return;
  }

  state.answered = true;

  const correct = index === item.correct;

  if (correct) {
    state.correct += 1;
  }

  $('answerList').querySelectorAll('.answer-option').forEach((button) => {
    const chosen = Number(button.dataset.answer);

    button.disabled = true;

    if (chosen === item.correct) {
      button.classList.add('is-correct');
    }

    if (chosen === index && !correct) {
      button.classList.add('is-wrong');
    }
  });

  $('correctCounter').textContent = String(state.correct);

  $('feedbackBox').hidden = false;
  $('feedbackBox').classList.add(
    correct ? 'is-correct' : 'is-wrong'
  );

  const heading = document.createElement('strong');

  heading.textContent = correct
    ? 'Правильно! '
    : 'Спробуй запам’ятати. ';

  const paragraph = document.createElement('p');
  paragraph.textContent = item.explanation;

  $('feedbackBox').replaceChildren(heading, paragraph);

  $('nextQuestion').disabled = false;

  const progress = Math.round(
    ((state.index + 1) / questions[state.level].length) * 100
  );

  $('progressFill').style.width = `${progress}%`;

  $('progressTrack').setAttribute(
    'aria-valuenow',
    String(progress)
  );
}

function finishQuiz() {
  state.finished = true;

  const list = questions[state.level];

  const percent = Math.round(
    (state.correct / list.length) * 100
  );
$('quizActive').hidden = true;
  $('quizResult').hidden = false;

  $('finalCorrect').textContent =
    `${state.correct}/${list.length}`;

  $('finalPercent').textContent = `${percent}%`;

  $('earnedStars').textContent =
    `+${levelInfo[state.level].stars}`;

  $('resultTitle').textContent =
    percent === 100
      ? 'Ідеально! Ти майстер кутів!'
      : percent >= 70
        ? 'Чудова робота!'
        : percent >= 40
          ? 'Добрий початок!'
          : 'Кожна спроба навчає!';

  $('resultMessage').textContent =
    percent === 100
      ? 'Усі відповіді правильні. Ти впевнено розрізняєш і вимірюєш кути!'
      : percent >= 70
        ? 'Ти добре розумієш тему. Повтори складні моменти й спробуй покращити результат.'
        : percent >= 40
          ? 'Основи вже знайомі. Переглянь шпаргалку та потренуйся ще раз.'
          : 'Повернися до понять і моделі кута — практика допоможе розібратися.';

  $('claimReward').disabled = false;

  $('claimReward').innerHTML =
    'Отримати зірочки <span aria-hidden="true">✦</span>';

  $('rewardNote').textContent =
    'Зірочки нараховуються один раз за завершену спробу.';

  $('progressFill').style.width = '100%';
  $('progressTrack').setAttribute('aria-valuenow', '100');

    // Єдине нарахування комп’юшок: результат обробляється після відображення підсумку.
    Promise.resolve().then(async () => {
      const scorePercent = typeof percent !== 'undefined' ? percent : (typeof pct !== 'undefined' ? pct : 0);
      const rewardResult = await window.LearningGamification?.awardTestResult("angles-measurement", scorePercent, state.level);
      const claimButton = document.getElementById('claimReward');
      if (claimButton) claimButton.hidden = true;
      const starLabel = document.getElementById('earnedStars');
      if (starLabel) starLabel.textContent = rewardResult?.passed ? `🪙 ${rewardResult.coinsAwarded} комп’юшок` : 'Потрібно 70% для винагороди';
      const note = document.getElementById('rewardNote');
      if (note) note.textContent = rewardResult?.message || 'Комп’юшки нараховуються автоматично після тесту.';
    });
}
function nextQuestion() {
  if (!state.answered || state.finished) return;

  if (state.index < questions[state.level].length - 1) {
    state.index += 1;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function startQuiz(level = state.level) {
  if (!questions[level]) return;

  state.level = level;
  state.index = 0;
  state.correct = 0;
  state.answered = false;
  state.finished = false;
  state.rewardClaimed = false;

  $('quizActive').hidden = false;
  $('quizResult').hidden = true;

  $('quizLevelLabel').textContent = levelInfo[level].label;

  document.querySelectorAll('[data-level]').forEach((button) => {
    const active = button.dataset.level === level;

    button.classList.toggle('is-selected', active);

    button.setAttribute(
      'aria-pressed',
      String(active)
    );
  });

  renderQuestion();
}

function claimReward() {
  if (!state.finished || state.rewardClaimed) return;

  state.rewardClaimed = true;

  $('claimReward').disabled = true;
  $('claimReward').textContent = 'Зірочки отримано ✓';

  $('rewardNote').textContent =
    `Нараховано ${levelInfo[state.level].stars} зірочок за завершення рівня «${levelInfo[state.level].label.toLowerCase()}».`;
}

conceptGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-concept]');

  if (button) {
    setConcept(button.dataset.concept);
  }
});

angleRange.addEventListener('input', () => {
  updateAngle(angleRange.value, false);
});

angleInput.addEventListener('change', () => {
  updateAngle(angleInput.value);
});

angleInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    updateAngle(angleInput.value);
  }
});

document.querySelectorAll('[data-angle-preset]').forEach((button) => {
  button.addEventListener('click', () => {
    updateAngle(button.dataset.anglePreset);
  });
});

$('applyAngle').addEventListener('click', () => {
  updateAngle(angleInput.value);
});

$('resetAngle').addEventListener('click', resetModel);
$('resetModel').addEventListener('click', resetModel);

document.querySelectorAll('[data-level]').forEach((button) => {
  button.addEventListener('click', () => {
    startQuiz(button.dataset.level);
  });
});

$('nextQuestion').addEventListener('click', nextQuestion);

$('retryQuiz').addEventListener('click', () => {
  startQuiz(state.level);
});

$('claimReward').addEventListener('click', claimReward);

drawProtractor();
setConcept('angle');
updateAngle(60, false);
startQuiz('easy');
