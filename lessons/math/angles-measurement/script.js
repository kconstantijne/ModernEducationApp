(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const concepts = {
    types: {
      title: 'Види кутів',
      description: 'Змінюй величину кута та спостерігай, як змінюється його назва.',
      insight: angle => angle < 90 ? `${angle}° менше за 90°, тому це гострий кут.` : angle === 90 ? 'Кут 90° називають прямим. Його сторони перпендикулярні.' : angle < 180 ? `${angle}° більше за 90°, але менше за 180° — це тупий кут.` : 'Кут 180° — розгорнутий: його сторони утворюють пряму.',
      footer: 'Гострий кут менший за прямий, а тупий — більший за прямий, але менший за розгорнутий.'
    },
    parts: {
      title: 'Будова кута',
      description: 'Знайди вершину та дві сторони кута. Позначення на моделі змінюються разом із кутом.',
      insight: angle => `Точка O — вершина кута. Промені OA та OB — його сторони. Величина кута зараз ${angle}° .`.replace('° .', '°.'),
      footer: 'Кут ∠AOB читають «кут AOB». Середня літера O позначає вершину.'
    },
    measure: {
      title: 'Градусна міра',
      description: 'Досліди, як градусна міра пов’язана з частиною повного оберту.',
      insight: angle => `${angle}° — це ${angle < 90 ? 'менше чверті' : angle === 90 ? 'чверть' : angle < 180 ? 'більше чверті, але менше половини' : 'половина'} повного оберту (360°).`,
      footer: 'Повний оберт — 360°, розгорнутий кут — 180°, прямий кут — 90°.'
    },
    protractor: {
      title: 'Транспортир',
      description: 'Уяви, що дугова шкала — це транспортир. Відлік починається від сторони OA.',
      insight: angle => `Сумісти центр транспортира з O, а нульову лінію — з OA. На шкалі потрібно знайти ${angle}°.`,
      footer: 'Не переплутай шкали транспортира: відлік починай із нуля, який лежить на початковій стороні кута.'
    }
  };

  const questionBank = {
    easy: [
      { q: 'Який кут має величину 45°?', a: ['Гострий', 'Прямий', 'Тупий', 'Розгорнутий'], correct: 0, why: '45° менше за 90°, тому кут гострий.' },
      { q: 'Скільки градусів має прямий кут?', a: ['45°', '90°', '120°', '180°'], correct: 1, why: 'Прямий кут дорівнює 90°.' },
      { q: 'Як називається спільний початок двох променів, що утворюють кут?', a: ['Сторона', 'Дуга', 'Вершина', 'Шкала'], correct: 2, why: 'Спільний початок променів називають вершиною кута.' },
      { q: 'Який із кутів є тупим?', a: ['30°', '75°', '90°', '130°'], correct: 3, why: 'Тупий кут більший за 90°, але менший за 180°.' }
    ],
    medium: [
      { q: 'Кут дорівнює 112°. Як його назвати?', a: ['Гострий', 'Прямий', 'Тупий', 'Розгорнутий'], correct: 2, why: '112° більше за 90° і менше за 180°, отже кут тупий.' },
      { q: 'Який кут утворює половину розгорнутого кута?', a: ['45°', '90°', '120°', '180°'], correct: 1, why: 'Розгорнутий кут — 180°. Його половина: 180° ÷ 2 = 90°.' },
      { q: 'Який інструмент використовують для вимірювання кутів у градусах?', a: ['Лінійку', 'Циркуль', 'Транспортир', 'Косинець для вимірювання довжини'], correct: 2, why: 'Транспортир має градусну шкалу, за якою вимірюють кути.' },
      { q: 'Який кут більший: 68° чи 86°?', a: ['68°', '86°', 'Вони рівні', 'Не можна порівняти'], correct: 1, why: '86 більше за 68, тому кут 86° більший.' },
      { q: 'Один із кутів дорівнює 90°. Яке твердження правильне?', a: ['Він гострий', 'Він прямий', 'Він розгорнутий', 'Він обов’язково тупий'], correct: 1, why: 'За означенням кут величиною 90° є прямим.' },
      { q: 'Яку величину має розгорнутий кут?', a: ['90°', '100°', '180°', '360°'], correct: 2, why: 'Розгорнутий кут утворює пряму й має величину 180°.' }
    ],
    hard: [
      { q: 'Кут становить 35°. На скільки градусів його потрібно збільшити, щоб отримати прямий кут?', a: ['45°', '55°', '65°', '145°'], correct: 1, why: '90° − 35° = 55°. Отже, потрібно додати 55°.' },
      { q: 'Розгорнутий кут поділили на два кути. Один дорівнює 72°. Чому дорівнює другий?', a: ['98°', '108°', '118°', '252°'], correct: 1, why: 'Сума суміжних кутів дорівнює 180°. 180° − 72° = 108°.' },
      { q: 'Кут A на 20° більший за 40°. Яка його величина?', a: ['20°', '40°', '60°', '80°'], correct: 2, why: '40° + 20° = 60°.' },
      { q: 'Який найменший із наведених кутів?', a: ['1°', '91°', '179°', '180°'], correct: 0, why: '1° менше за 91°, 179° і 180°.' },
      { q: 'Кут дорівнює 3/4 прямого кута. Яка його величина?', a: ['45°', '60°', '67,5°', '75°'], correct: 2, why: 'Прямий кут — 90°. 90° × 3/4 = 67,5°.' },
      { q: 'Кут збільшили з 48° до 121°. На скільки градусів він збільшився?', a: ['63°', '73°', '83°', '169°'], correct: 1, why: '121° − 48° = 73°.' },
      { q: 'Яке твердження про кут 90° є правильним?', a: ['Він більший за тупий кут', 'Він менший за будь-який гострий кут', 'Він більший за гострий кут', 'Він дорівнює розгорнутому куту'], correct: 2, why: 'Кожен гострий кут менший за 90°, тому прямий кут більший за гострий.' },
      { q: 'Два кути утворюють розгорнутий кут. Один із них у 2 рази більший за інший. Які це кути?', a: ['60° і 120°', '45° і 135°', '30° і 150°', '70° і 110°'], correct: 0, why: 'Нехай менший кут x, тоді більший 2x. x + 2x = 180°, отже x = 60°, а другий кут 120°.' }
    ]
  };

  const levelNames = { easy: 'Простий рівень', medium: 'Середній рівень', hard: 'Складний рівень' };
  const state = { concept: 'types', angle: 60, level: 'medium', index: 0, score: 0, selected: null, answered: false };
  const elements = {
    conceptCards: $$('[data-concept]'), modelHeading: $('#modelHeading'), modelDescription: $('#modelDescription'), modelInsight: $('#modelInsight'), modelFooterNote: $('#modelFooterNote'),
    angleSlider: $('#angleSlider'), angleOutput: $('#angleOutput'), angleValue: $('#angleValue'), angleType: $('#angleType'), angleSvgTitle: $('#angleSvgTitle'), angleSvgDesc: $('#angleSvgDesc'),
    angleFill: $('#angleFill'), baseRay: $('#baseRay'), movingRay: $('#movingRay'), angleArc: $('#angleArc'), rightMarker: $('#rightMarker'), vertexDot: $('#vertexDot'), vertexLabel: $('#vertexLabel'), baseLabel: $('#baseLabel'), rayLabel: $('#rayLabel'), angleLabel: $('#angleLabel'), protractorMarks: $('#protractorMarks'),
    levelButtons: $$('[data-level]'), quizLevelLabel: $('#quizLevelLabel'), questionCounter: $('#questionCounter'), quizProgress: $('#quizProgress'), quizProgressFill: $('#quizProgressFill'), quizForm: $('#quizForm'), answerFieldset: $('#answerFieldset'), questionText: $('#questionText'), answerList: $('#answerList'), quizFeedback: $('#quizFeedback'), quizScore: $('#quizScore'), checkAnswer: $('#checkAnswer'), nextQuestion: $('#nextQuestion'), quizPanel: $('#quizPanel'), resultPanel: $('#resultPanel'), resultTitle: $('#resultTitle'), resultMessage: $('#resultMessage'), finalScore: $('#finalScore'), finalPercent: $('#finalPercent'), retryQuiz: $('#retryQuiz'), themeToggle: $('[data-theme-toggle]')
  };

  function svgEl(name, attrs = {}) {
    const node = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
    return node;
  }

  function pointOnArc(cx, cy, radius, angle) {
    const radians = angle * Math.PI / 180;
    return { x: cx + radius * Math.cos(radians), y: cy - radius * Math.sin(radians) };
  }

  function classifyAngle(angle) {
    if (angle < 90) return 'Гострий кут';
    if (angle === 90) return 'Прямий кут';
    if (angle < 180) return 'Тупий кут';
    return 'Розгорнутий кут';
  }

  function drawModel() {
    const angle = state.angle;
    const cx = 92;
    const cy = 232;
    const radius = 180;
    const arcRadius = 53;
    const end = pointOnArc(cx, cy, radius, angle);
    const arcEnd = pointOnArc(cx, cy, arcRadius, angle);
    const mid = pointOnArc(cx, cy, arcRadius + 21, angle / 2);
    const largeArc = angle > 180 ? 1 : 0;

    elements.baseRay.setAttribute('d', `M ${cx} ${cy} L ${cx + radius} ${cy}`);
    elements.movingRay.setAttribute('d', `M ${cx} ${cy} L ${end.x.toFixed(2)} ${end.y.toFixed(2)}`);
    elements.angleFill.setAttribute('d', `M ${cx} ${cy} L ${cx + arcRadius} ${cy} A ${arcRadius} ${arcRadius} 0 ${largeArc} 0 ${arcEnd.x.toFixed(2)} ${arcEnd.y.toFixed(2)} Z`);
    elements.angleArc.setAttribute('d', `M ${cx + arcRadius} ${cy} A ${arcRadius} ${arcRadius} 0 ${largeArc} 0 ${arcEnd.x.toFixed(2)} ${arcEnd.y.toFixed(2)}`);
    elements.rightMarker.setAttribute('d', angle === 90 ? `M ${cx + 19} ${cy} L ${cx + 19} ${cy - 19} L ${cx} ${cy - 19}` : '');
    elements.vertexDot.setAttribute('cx', cx);
    elements.vertexDot.setAttribute('cy', cy);
    elements.vertexLabel.setAttribute('x', cx - 18);
    elements.vertexLabel.setAttribute('y', cy + 21);
    elements.baseLabel.setAttribute('x', cx + radius + 6);
    elements.baseLabel.setAttribute('y', cy + 5);
    elements.rayLabel.setAttribute('x', end.x + (angle > 145 ? -15 : 7));
    elements.rayLabel.setAttribute('y', end.y - 7);
    elements.angleLabel.setAttribute('x', mid.x - 14);
    elements.angleLabel.setAttribute('y', mid.y - 2);
    elements.angleLabel.textContent = `${angle}°`;

    elements.protractorMarks.replaceChildren();
    if (state.concept === 'protractor') {
      const outer = 105;
      for (let deg = 0; deg <= 180; deg += 10) {
        const p1 = pointOnArc(cx, cy, outer, deg);
        const p2 = pointOnArc(cx, cy, outer - (deg % 30 === 0 ? 12 : 6), deg);
        elements.protractorMarks.append(svgEl('line', { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y }));
        if (deg % 30 === 0) {
          const label = pointOnArc(cx, cy, outer - 24, deg);
          const text = svgEl('text', { x: label.x, y: label.y + 3, 'text-anchor': 'middle' });
          text.textContent = String(deg);
          elements.protractorMarks.append(text);
        }
      }
      elements.protractorMarks.append(svgEl('path', { d: `M ${cx - outer} ${cy} A ${outer} ${outer} 0 0 1 ${cx + outer} ${cy}` }));
    }

    elements.angleValue.textContent = String(angle);
    elements.angleOutput.textContent = `${angle}°`;
    elements.angleSlider.value = String(angle);
    elements.angleType.textContent = classifyAngle(angle);
    elements.angleSvgTitle.textContent = `${classifyAngle(angle)}, ${angle} градусів`;
    elements.angleSvgDesc.textContent = `Вершина O, сторона OA горизонтальна, сторона OB утворює кут ${angle} градусів. Це ${classifyAngle(angle).toLowerCase()}.`;
    const concept = concepts[state.concept];
    elements.modelHeading.textContent = concept.title;
    elements.modelDescription.textContent = concept.description;
    elements.modelInsight.textContent = concept.insight(angle);
    elements.modelFooterNote.textContent = concept.footer;
    elements.angleSlider.setAttribute('aria-valuetext', `${angle} градусів, ${classifyAngle(angle).toLowerCase()}`);
  }

  function setConcept(name) {
    if (!Object.hasOwn(concepts, name)) return;
    state.concept = name;
    elements.conceptCards.forEach(card => {
      const active = card.dataset.concept === name;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-pressed', String(active));
    });
    drawModel();
  }

  function makeAnswerOption(answer, index) {
    const label = document.createElement('label');
    label.className = 'answer-option';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'quizAnswer';
    input.value = String(index);
    input.setAttribute('aria-label', `${String.fromCharCode(65 + index)}. ${answer}`);
    const letter = document.createElement('span');
    letter.className = 'answer-letter';
    letter.textContent = String.fromCharCode(65 + index);
    const text = document.createElement('span');
    text.className = 'answer-text';
    text.textContent = answer;
    label.append(input, letter, text);
    input.addEventListener('change', () => {
      if (state.answered) return;
      state.selected = index;
      $$('.answer-option', elements.answerList).forEach(option => option.classList.remove('is-selected'));
      label.classList.add('is-selected');
    });
    return label;
  }

  function renderQuestion() {
    const questions = questionBank[state.level];
    const question = questions[state.index];
    state.selected = null;
    state.answered = false;
    elements.quizLevelLabel.textContent = levelNames[state.level];
    elements.questionCounter.textContent = `Запитання ${state.index + 1} із ${questions.length}`;
    elements.quizProgress.setAttribute('aria-valuemax', String(questions.length));
    elements.quizProgress.setAttribute('aria-valuenow', String(state.index));
    elements.quizProgressFill.style.width = `${(state.index / questions.length) * 100}%`;
    elements.questionText.textContent = question.q;
    elements.answerList.replaceChildren(...question.a.map(makeAnswerOption));
    elements.quizFeedback.hidden = true;
    elements.quizFeedback.className = 'quiz-feedback';
    elements.quizFeedback.replaceChildren();
    elements.checkAnswer.hidden = false;
    elements.checkAnswer.disabled = false;
    elements.nextQuestion.hidden = true;
    elements.quizScore.textContent = String(state.score);
  }

  function selectLevel(level) {
    if (!Object.hasOwn(questionBank, level)) return;
    state.level = level;
    state.index = 0;
    state.score = 0;
    state.selected = null;
    state.answered = false;
    elements.levelButtons.forEach(button => {
      const active = button.dataset.level === level;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    elements.quizPanel.hidden = false;
    elements.resultPanel.hidden = true;
    renderQuestion();
  }

  function appendFeedback(title, explanation) {
    const heading = document.createElement('strong');
    heading.textContent = title;
    const body = document.createElement('span');
    body.textContent = explanation;
    elements.quizFeedback.replaceChildren(heading, body);
  }

  function checkAnswer(event) {
    event.preventDefault();
    if (state.answered) return;
    if (state.selected === null) {
      elements.quizFeedback.hidden = false;
      elements.quizFeedback.className = 'quiz-feedback is-wrong';
      appendFeedback('Спочатку обери відповідь.', 'Натисни на один із варіантів, а потім перевір результат.');
      return;
    }
    const question = questionBank[state.level][state.index];
    state.answered = true;
    const options = $$('.answer-option', elements.answerList);
    options.forEach((option, index) => {
      const input = $('input', option);
      input.disabled = true;
      option.classList.add('is-locked');
      if (index === question.correct) option.classList.add('is-correct');
      if (index === state.selected && index !== question.correct) option.classList.add('is-wrong');
      option.classList.remove('is-selected');
    });
    const correct = state.selected === question.correct;
    if (correct) state.score += 1;
    elements.quizScore.textContent = String(state.score);
    elements.quizFeedback.hidden = false;
    elements.quizFeedback.className = `quiz-feedback ${correct ? 'is-correct' : 'is-wrong'}`;
    appendFeedback(correct ? 'Правильно! Так тримати.' : `Не зовсім. Правильна відповідь: ${question.a[question.correct]}.`, question.why);
    elements.quizProgress.setAttribute('aria-valuenow', String(state.index + 1));
    elements.quizProgressFill.style.width = `${((state.index + 1) / questionBank[state.level].length) * 100}%`;
    elements.checkAnswer.hidden = true;
    elements.nextQuestion.hidden = false;
    elements.nextQuestion.innerHTML = state.index === questionBank[state.level].length - 1 ? 'Побачити результат <span aria-hidden="true">→</span>' : 'Наступне запитання <span aria-hidden="true">→</span>';
    elements.nextQuestion.focus();
  }

  function finishQuiz() {
    const total = questionBank[state.level].length;
    const percent = Math.round((state.score / total) * 100);
    elements.quizPanel.hidden = true;
    elements.resultPanel.hidden = false;
    elements.finalScore.textContent = `${state.score}/${total}`;
    elements.finalPercent.textContent = `${percent}%`;
    if (percent >= 90) {
      elements.resultTitle.textContent = 'Блискучий результат!';
      elements.resultMessage.textContent = 'Ти чудово орієнтуєшся в темі. Спробуй складніші завдання або поясни правила комусь іншому.';
    } else if (percent >= 65) {
      elements.resultTitle.textContent = 'Чудова робота!';
      elements.resultMessage.textContent = 'Основи вже добре засвоєні. Переглянь пояснення до помилок і закріпи результат.';
    } else {
      elements.resultTitle.textContent = 'Є куди зростати!';
      elements.resultMessage.textContent = 'Повернися до інтерактивної моделі та шпаргалки, а потім спробуй ще раз. Помилки допомагають навчатися.';
    }
    elements.resultPanel.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    $('#retryQuiz').focus({ preventScroll: true });
  }

  function nextQuestion() {
    if (!state.answered) return;
    if (state.index < questionBank[state.level].length - 1) {
      state.index += 1;
      renderQuestion();
      elements.questionText.setAttribute('tabindex', '-1');
      elements.questionText.focus({ preventScroll: true });
    } else {
      finishQuiz();
    }
  }

  function resetModel() {
    state.angle = 60;
    setConcept('types');
  }



  elements.conceptCards.forEach(card => card.addEventListener('click', () => setConcept(card.dataset.concept)));
  elements.angleSlider.addEventListener('input', event => {
    state.angle = Number(event.currentTarget.value);
    drawModel();
  });
  $$('[data-angle]').forEach(button => button.addEventListener('click', () => {
    state.angle = Number(button.dataset.angle);
    drawModel();
  }));
  $('#resetModel').addEventListener('click', resetModel);
  elements.levelButtons.forEach(button => button.addEventListener('click', () => selectLevel(button.dataset.level)));
  elements.quizForm.addEventListener('submit', checkAnswer);
  elements.nextQuestion.addEventListener('click', nextQuestion);
  elements.retryQuiz.addEventListener('click', () => {
    selectLevel(state.level);
    elements.quizPanel.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    elements.questionText.focus({ preventScroll: true });
  });

  drawModel();
  renderQuestion();
})();
