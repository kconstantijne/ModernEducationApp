/* lessons/math/point-ray-line/script.js */
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

  const state = {
    concept: "point",
    position: 5,
    level: "medium",
    questionIndex: 0,
    score: 0,
    answered: 0,
    hasAnswered: false,
    finished: false,
    completed: false
  };

  const ui = {
    conceptCards: $$("[data-concept]"),
    modelHeading: $("#modelHeading"),
    modelTypeLabel: $("#modelTypeLabel"),
    modelSvgTitle: $("#modelSvgTitle"),
    modelSvgDesc: $("#modelSvgDesc"),
    modelDrawing: $("#modelDrawing"),
    modelAnnotations: $("#modelAnnotations"),
    positionLabel: $("#positionLabel"),
    positionHelp: $("#positionHelp"),
    pointPosition: $("#pointPosition"),
    positionOutput: $("#positionOutput"),
    modelExplanation: $("#modelExplanation"),
    resetModel: $("#resetModel"),

    levelCards: $$("[data-level]"),
    difficultyNote: $("#difficultyNote"),
    quizLevelLabel: $("#quizLevelLabel"),
    quizCard: $("#quizCard"),
    quizForm: $("#quizForm"),
    answerFieldset: $("#answerFieldset"),
    questionCounter: $("#questionCounter"),
    quizScore: $("#quizScore"),
    quizProgress: $("#quizProgress"),
    quizProgressFill: $("#quizProgressFill"),
    questionText: $("#questionText"),
    answerList: $("#answerList"),
    quizFeedback: $("#quizFeedback"),
    checkAnswer: $("#checkAnswer"),
    nextQuestion: $("#nextQuestion"),

    resultPanel: $("#resultPanel"),
    resultTitle: $("#resultTitle"),
    resultMessage: $("#resultMessage"),
    finalScore: $("#finalScore"),
    finalPercent: $("#finalPercent"),
    retryQuiz: $("#retryQuiz"),

    completionCard: $("#completionCard"),
    completionText: $("#completionText"),
    completionStatus: $("#completionStatus"),
    completeLesson: $("#completeLesson"),

    themeToggle: $("[data-theme-toggle]")
  };

  const required = [
    "modelHeading", "modelTypeLabel", "modelSvgTitle", "modelSvgDesc",
    "modelDrawing", "modelAnnotations", "positionLabel", "positionHelp",
    "pointPosition", "positionOutput", "modelExplanation", "resetModel",
    "difficultyNote", "quizLevelLabel", "quizCard", "quizForm",
    "answerFieldset", "questionCounter", "quizScore", "quizProgress",
    "quizProgressFill", "questionText", "answerList", "quizFeedback",
    "checkAnswer", "nextQuestion", "resultPanel", "resultTitle",
    "resultMessage", "finalScore", "finalPercent", "retryQuiz",
    "completionCard", "completionText", "completionStatus",
    "completeLesson"
  ];

  const missing = required.filter((key) => !ui[key]);

  if (missing.length) {
    console.error(
      "[Точка, промінь і пряма] Не знайдено елементи:",
      missing.join(", ")
    );
    return;
  }

  // ------------------------------------------------------------
  // 1. Дані понять та інтерактивна SVG-модель
  // ------------------------------------------------------------

  const SVG_NS = "http://www.w3.org/2000/svg";
  const MODEL = {
    point: {
      title: "Точка",
      label: "Окремий геометричний об’єкт",
      explanation:
        "Точка позначає місце. Її зображають маленькою крапкою та називають великою літерою. " +
        "Перемісти точку A повзунком, щоб побачити, як змінюється її положення.",
      positionLabel: "Положення точки A",
      positionHelp: "Переміщуй точку повзунком.",
      svgTitle: "Точка A на площині",
      svgDesc: "Одна точка A переміщується горизонтально по умовній сітці."
    },
    line: {
      title: "Пряма",
      label: "Нескінченна в обидва боки",
      explanation:
        "Пряма не має ні початку, ні кінця. Стрілки на обох кінцях показують, " +
        "що вона продовжується нескінченно. Точка A може змінювати своє положення на прямій.",
      positionLabel: "Положення точки A на прямій",
      positionHelp: "Переміщуй точку вздовж прямої.",
      svgTitle: "Пряма та точка A",
      svgDesc: "Пряма зі стрілками на обох кінцях і точкою A на ній."
    },
    ray: {
      title: "Промінь",
      label: "Початок і один напрямок",
      explanation:
        "Промінь має початок, але не має кінця. Початок позначено точкою A, " +
        "а стрілка показує напрямок продовження. Повзунок переміщує точку B уздовж променя.",
      positionLabel: "Положення точки B на промені",
      positionHelp: "Точка A — початок, а B може рухатися в напрямку стрілки.",
      svgTitle: "Промінь AB",
      svgDesc: "Промінь починається в точці A та продовжується вправо; точка B рухається по променю."
    },
    segment: {
      title: "Відрізок",
      label: "Дві кінцеві точки",
      explanation:
        "Відрізок має два кінці — A і B. На відміну від прямої та променя, " +
        "він обмежений і має певну довжину. Переміщуй точку B між кінцями відрізка.",
      positionLabel: "Положення точки B на відрізку",
      positionHelp: "Точки A і B позначають кінці відрізка.",
      svgTitle: "Відрізок AB",
      svgDesc: "Відрізок з кінцями A та B; точка B переміщується між крайніми положеннями."
    }
  };

  function svgEl(tag, attributes = {}) {
    const node = document.createElementNS(SVG_NS, tag);

    Object.entries(attributes).forEach(([name, value]) => {
      node.setAttribute(name, String(value));
    });

    return node;
  }

  function svgText(parent, text, x, y, className = "model-point-label", anchor = "middle") {
    const node = svgEl("text", {
      x,
      y,
      class: className,
      "text-anchor": anchor
    });
    node.textContent = text;
    parent.appendChild(node);
    return node;
  }

  function svgPath(parent, d, className, extra = {}) {
    const node = svgEl("path", { d, class: className, ...extra });
    parent.appendChild(node);
    return node;
  }

  function svgCircle(parent, cx, cy, r, label) {
    const circle = svgEl("circle", {
      cx,
      cy,
      r,
      class: "model-point"
    });
    parent.appendChild(circle);

    if (label) {
      svgText(parent, label, cx, cy - 17);
    }
  }

  function xFromPosition(position) {
    // Відображаємо повзунок 1–9 у координати 100–620.
    return 100 + ((position - 1) / 8) * 520;
  }

  function renderModel() {
    const data = MODEL[state.concept];
    const x = xFromPosition(state.position);
    const y = 130;
    const left = 65;
    const right = 655;

    ui.modelHeading.textContent = data.title;
    ui.modelTypeLabel.textContent = data.label;
    ui.modelSvgTitle.textContent = data.svgTitle;
    ui.modelSvgDesc.textContent = data.svgDesc;
    ui.positionLabel.textContent = data.positionLabel;
    ui.positionHelp.textContent = data.positionHelp;
    ui.positionOutput.value = String(state.position);
    ui.positionOutput.textContent = String(state.position);
    ui.modelDrawing.replaceChildren();
    ui.modelAnnotations.replaceChildren();

    if (state.concept === "point") {
      // Легкий напрямний пунктир не є частиною самої точки.
      svgPath(
        ui.modelDrawing,
        `M ${left} ${y} H ${right}`,
        "model-dashed"
      );
      svgCircle(ui.modelDrawing, x, y, 7, "A");

      svgText(
        ui.modelAnnotations,
        "Точка не має розміру",
        360,
        205,
        "model-helper"
      );
    }

    if (state.concept === "line") {
      svgPath(
        ui.modelDrawing,
        `M ${left} ${y} H ${right}`,
        "model-line",
        {
          "marker-start": "url(#arrowStart)",
          "marker-end": "url(#arrowEnd)"
        }
      );
      svgCircle(ui.modelDrawing, x, y, 7, "A");

      svgText(
        ui.modelAnnotations,
        "Продовжується в обидва боки",
        360,
        205,
        "model-helper"
      );
    }

    if (state.concept === "ray") {
      const origin = 100;
      const pointX = Math.max(origin + 30, x);

      svgPath(
        ui.modelDrawing,
        `M ${origin} ${y} H ${right}`,
        "model-line",
        { "marker-end": "url(#arrowEnd)" }
      );
      svgCircle(ui.modelDrawing, origin, y, 7, "A");
      svgCircle(ui.modelDrawing, pointX, y, 6, "B");

      svgText(
        ui.modelAnnotations,
        "Початок променя",
        origin,
        174,
        "model-helper"
      );
    }

    if (state.concept === "segment") {
      const start = 100;
      const end = Math.max(start + 30, x);

      svgPath(
        ui.modelDrawing,
        `M ${start} ${y} H ${end}`,
        "model-segment"
      );
      svgCircle(ui.modelDrawing, start, y, 7, "A");
      svgCircle(ui.modelDrawing, end, y, 7, "B");

      svgText(
        ui.modelAnnotations,
        "Відрізок має два кінці",
        360,
        205,
        "model-helper"
      );
    }

    ui.modelExplanation.textContent = data.explanation;
  }

  function setConcept(concept) {
    if (!Object.prototype.hasOwnProperty.call(MODEL, concept)) {
      return;
    }

    state.concept = concept;

    ui.conceptCards.forEach((card) => {
      const active = card.dataset.concept === concept;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-pressed", String(active));
    });

    renderModel();
  }

  ui.conceptCards.forEach((card) => {
    card.addEventListener("click", () => setConcept(card.dataset.concept));
  });

  ui.pointPosition.addEventListener("input", () => {
    const value = Number(ui.pointPosition.value);

    if (!Number.isFinite(value)) {
      return;
    }

    state.position = Math.max(1, Math.min(9, Math.round(value)));
    ui.pointPosition.value = String(state.position);
    renderModel();
  });

  ui.resetModel.addEventListener("click", () => {
    state.position = 5;
    ui.pointPosition.value = "5";
    setConcept("point");
    renderModel();
  });

  // ------------------------------------------------------------
  // 2. Набори завдань для трьох рівнів складності
  // correct — індекс правильної відповіді, починаючи з 0.
  // ------------------------------------------------------------

  const QUESTION_BANK = {
    easy: [
      {
        question: "Що позначає точка в геометрії?",
        answers: [
          "Точне місце",
          "Частину площини з довжиною",
          "Лінію з двома кінцями",
          "Фігуру з чотирма кутами"
        ],
        correct: 0,
        explanation: "Точка позначає місце. Вона не має вимірюваної довжини."
      },
      {
        question: "Скільки кінців має промінь?",
        answers: ["Жодного", "Один", "Два", "Чотири"],
        correct: 1,
        explanation: "Промінь має початок і продовжується нескінченно в одному напрямку."
      },
      {
        question: "Яка фігура продовжується в обидва боки без кінця?",
        answers: ["Відрізок", "Кут", "Пряма", "Точка"],
        correct: 2,
        explanation: "Пряма не має кінців і продовжується в обох напрямках."
      },
      {
        question: "Яку фігуру можна виміряти лінійкою, бо вона має два кінці?",
        answers: ["Пряму", "Промінь", "Точку", "Відрізок"],
        correct: 3,
        explanation: "Відрізок обмежений двома кінцевими точками, тому має певну довжину."
      }
    ],

    medium: [
      {
        question: "Яке твердження правильно описує пряму?",
        answers: [
          "Вона має один початок",
          "Вона має два кінці",
          "Вона нескінченна в обидва боки",
          "Вона складається лише з двох точок"
        ],
        correct: 2,
        explanation: "Пряма не має початку та кінця. Стрілки на схемі показують обидва напрямки продовження."
      },
      {
        question: "Точка A є початком променя AB. Що означає літера A?",
        answers: [
          "Кінець променя",
          "Початкову точку променя",
          "Середину променя",
          "Довжину променя"
        ],
        correct: 1,
        explanation: "У позначенні променя AB першою вказують його початкову точку A."
      },
      {
        question: "Скільки різних прямих можна провести через дві різні точки A і B?",
        answers: [
          "Жодної",
          "Одну",
          "Дві",
          "Нескінченно багато"
        ],
        correct: 1,
        explanation: "Через дві різні точки можна провести рівно одну пряму."
      },
      {
        question: "На прямій позначили точки A, B і C. Скільки відрізків утворюють усі пари цих точок?",
        answers: ["Один", "Два", "Три", "Шість"],
        correct: 2,
        explanation: "Кожна пара точок визначає відрізок: AB, AC і BC. Отже, їх три."
      },
      {
        question: "Яка відмінність між променем і відрізком?",
        answers: [
          "Промінь має один початок, а відрізок має два кінці",
          "Відрізок нескінченний в обидва боки",
          "Промінь має два кінці",
          "Між ними немає відмінності"
        ],
        correct: 0,
        explanation: "Промінь продовжується нескінченно в одному напрямку, а відрізок обмежений двома кінцями."
      },
      {
        question: "Точка C лежить між A і B на відрізку AB. Яка рівність правильна?",
        answers: [
          "AB = AC − CB",
          "AB = AC + CB",
          "AC = AB + CB",
          "CB = AB + AC"
        ],
        correct: 1,
        explanation: "Якщо C лежить між A і B, довжина всього відрізка дорівнює сумі частин: AB = AC + CB."
      }
    ],

    hard: [
      {
        question: "На одній прямій розташовано чотири різні точки A, B, C і D. Скільки відрізків визначають усі пари цих точок?",
        answers: ["4", "5", "6", "8"],
        correct: 2,
        explanation: "Кожен відрізок визначає пара точок. Кількість пар із чотирьох точок дорівнює 4 × 3 ÷ 2 = 6."
      },
      {
        question: "Точки A, B і C лежать на одній прямій, причому B розташована між A і C. AB = 4 см, BC = 7 см. Чому дорівнює AC?",
        answers: ["3 см", "11 см", "28 см", "7 см"],
        correct: 1,
        explanation: "Оскільки B лежить між A і C, AC = AB + BC = 4 + 7 = 11 см."
      },
      {
        question: "Яке твердження завжди правильне для двох різних точок A і B?",
        answers: [
          "Через них проходять дві різні прямі",
          "Вони не можуть належати одній прямій",
          "Через них проходить рівно одна пряма",
          "Вони завжди є кінцями одного променя"
        ],
        correct: 2,
        explanation: "Одна з основних властивостей геометрії: через дві різні точки проходить рівно одна пряма."
      },
      {
        question: "На промені з початком A позначили точки B і C. Яке твердження обов’язково правильне?",
        answers: [
          "A є серединою BC",
          "Промінь має кінець у C",
          "Точки A, B і C лежать на одній прямій",
          "AB і AC завжди рівні"
        ],
        correct: 2,
        explanation: "Точки, що належать одному променю, лежать на одній прямій. Відстані до B і C можуть бути різними."
      },
      {
        question: "Відрізок AB завдовжки 15 см. Точка C лежить між A і B, AC = 9 см. Чому дорівнює CB?",
        answers: ["24 см", "9 см", "6 см", "5 см"],
        correct: 2,
        explanation: "CB = AB − AC = 15 − 9 = 6 см."
      },
      {
        question: "Скільки променів із початком O утворюють дві різні точки A і B, якщо A і B лежать по різні боки від O на одній прямій?",
        answers: ["Один", "Два", "Три", "Чотири"],
        correct: 1,
        explanation: "Із точки O у протилежних напрямках виходять два промені: один у бік A, інший у бік B."
      },
      {
        question: "На прямій позначили п’ять різних точок. Скільки відрізків можна скласти з усіх пар цих точок?",
        answers: ["5", "10", "15", "20"],
        correct: 1,
        explanation: "Кожна пара точок визначає один відрізок. Для п’яти точок кількість пар: 5 × 4 ÷ 2 = 10."
      },
      {
        question: "Яке твердження про відрізок, промінь і пряму є правильним?",
        answers: [
          "Усі три мають два кінці",
          "Лише пряма має початок",
          "Відрізок обмежений, промінь має початок, пряма не має кінців",
          "Промінь має два початки"
        ],
        correct: 2,
        explanation: "Відрізок має два кінці, промінь — один початок, а пряма нескінченна в обидва боки."
      }
    ]
  };

  const LEVELS = {
    easy: {
      title: "Простий рівень",
      note: "Простий рівень: 4 запитання на базові визначення та впізнавання фігур.",
      count: 4
    },
    medium: {
      title: "Середній рівень",
      note: "Середній рівень: 6 запитань на розуміння понять і застосування правил.",
      count: 6
    },
    hard: {
      title: "Складний рівень",
      note: "Складний рівень: 8 запитань на логіку, властивості точок і обчислення довжин.",
      count: 8
    }
  };

  function currentQuestions() {
    return QUESTION_BANK[state.level];
  }

  function currentQuestion() {
    return currentQuestions()[state.questionIndex];
  }

  function updateLevelUI() {
    const level = LEVELS[state.level];

    ui.levelCards.forEach((card) => {
      const active = card.dataset.level === state.level;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-pressed", String(active));
    });

    ui.difficultyNote.textContent = level.note;
    ui.quizLevelLabel.textContent = level.title;
  }

  function setFeedback(message, kind = "neutral") {
    ui.quizFeedback.hidden = !message;
    ui.quizFeedback.textContent = message;
    ui.quizFeedback.className = `quiz-feedback is-${kind}`;
  }

  function updateQuizProgress() {
    const questions = currentQuestions();
    const total = questions.length;
    const shownIndex = Math.min(state.questionIndex + 1, total);

    ui.questionCounter.textContent = `Запитання ${shownIndex} із ${total}`;
    ui.quizScore.textContent = `Правильних: ${state.score}`;
    ui.quizProgress.setAttribute("aria-valuemax", String(total));
    ui.quizProgress.setAttribute("aria-valuenow", String(state.answered));
    ui.quizProgressFill.style.width = `${(state.answered / total) * 100}%`;
  }

  function renderQuestion() {
    const question = currentQuestion();

    state.hasAnswered = false;
    ui.questionText.textContent = question.question;
    ui.answerList.replaceChildren();
    ui.answerFieldset.disabled = false;
    ui.checkAnswer.hidden = false;
    ui.nextQuestion.hidden = true;
    ui.nextQuestion.textContent = "Наступне запитання";
    setFeedback("");

    question.answers.forEach((answer, index) => {
      const label = document.createElement("label");
      label.className = "answer-option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "quizAnswer";
      input.value = String(index);
      input.required = true;
      input.setAttribute("aria-label", answer);

      const text = document.createElement("span");
      text.textContent = answer;

      label.append(input, text);
      ui.answerList.appendChild(label);
    });

    updateQuizProgress();
  }

  function checkAnswer(event) {
    event.preventDefault();

    if (state.finished || state.hasAnswered) {
      return;
    }

    const selected = $('input[name="quizAnswer"]:checked', ui.answerList);

    if (!selected) {
      setFeedback(
        "Спочатку обери один варіант відповіді.",
        "neutral"
      );
      return;
    }

    const question = currentQuestion();
    const selectedIndex = Number(selected.value);
    const correct = selectedIndex === question.correct;

    state.hasAnswered = true;
    state.answered += 1;

    if (correct) {
      state.score += 1;
    }

    $$(".answer-option", ui.answerList).forEach((label, index) => {
      const radio = $("input", label);
      radio.disabled = true;

      if (index === question.correct) {
        label.classList.add("is-correct");
      }

      if (index === selectedIndex && !correct) {
        label.classList.add("is-incorrect");
      }
    });

    ui.answerFieldset.disabled = true;
    ui.checkAnswer.hidden = true;
    ui.nextQuestion.hidden = false;

    if (state.questionIndex === currentQuestions().length - 1) {
      ui.nextQuestion.textContent = "Показати результат";
    }

    const prefix = correct
      ? "Правильно!"
      : "Цього разу відповідь неправильна.";

    setFeedback(`${prefix} ${question.explanation}`, correct ? "correct" : "incorrect");
    updateQuizProgress();
  }

  function showResult() {
    state.finished = true;

    const total = currentQuestions().length;
    const percent = Math.round((state.score / total) * 100);

    ui.quizForm.hidden = true;
    ui.resultPanel.hidden = false;
    ui.finalScore.textContent = `${state.score}/${total}`;
    ui.finalPercent.textContent = `${percent}%`;

    if (percent === 100) {
      ui.resultTitle.textContent = "Ідеально!";
      ui.resultMessage.textContent =
        "Усі відповіді правильні. Ти впевнено розрізняєш точку, пряму, промінь і відрізок.";
    } else if (percent >= 70) {
      ui.resultTitle.textContent = "Чудовий результат!";
      ui.resultMessage.textContent =
        "Ти добре засвоїв матеріал. Переглянь пояснення до помилкових відповідей, щоб закріпити знання.";
    } else if (percent >= 40) {
      ui.resultTitle.textContent = "Добрий початок!";
      ui.resultMessage.textContent =
        "Ти вже розумієш частину понять. Повернися до інтерактивної моделі та шпаргалки й спробуй ще раз.";
    } else {
      ui.resultTitle.textContent = "Час дослідити ще раз";
      ui.resultMessage.textContent =
        "Повтори відмінності між прямою, променем і відрізком. Після цього можеш пройти тест повторно.";
    }

    ui.completeLesson.disabled = false;
    ui.completionText.textContent =
      `Тест завершено: ${state.score} із ${total} правильних відповідей (${percent}%). Тепер можеш позначити урок завершеним.`;
    ui.completionStatus.textContent = "Тест пройдено. Урок ще не позначено завершеним.";

    ui.resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    ui.resultTitle.focus?.();
  }

  function goToNextQuestion() {
    if (!state.hasAnswered || state.finished) {
      return;
    }

    if (state.questionIndex >= currentQuestions().length - 1) {
      showResult();
      return;
    }

    state.questionIndex += 1;
    renderQuestion();
    ui.questionText.focus();
  }

  function startQuiz(level = state.level) {
    if (!Object.prototype.hasOwnProperty.call(QUESTION_BANK, level)) {
      return;
    }

    state.level = level;
    state.questionIndex = 0;
    state.score = 0;
    state.answered = 0;
    state.hasAnswered = false;
    state.finished = false;
    state.completed = false;

    updateLevelUI();

    ui.quizForm.hidden = false;
    ui.resultPanel.hidden = true;
    ui.completeLesson.disabled = true;
    ui.completionCard.classList.remove("is-complete");
    ui.completionText.textContent =
      "Досліди модель, повтори шпаргалку та пройди мінітест. Після тесту зможеш позначити урок завершеним.";
    ui.completionStatus.textContent = "Урок ще не завершено.";
    ui.completeLesson.textContent = "Завершити урок";

    renderQuestion();
  }

  ui.quizForm.addEventListener("submit", checkAnswer);
  ui.nextQuestion.addEventListener("click", goToNextQuestion);
  ui.retryQuiz.addEventListener("click", () => startQuiz(state.level));

  ui.levelCards.forEach((card) => {
    card.addEventListener("click", () => {
      const nextLevel = card.dataset.level;

      if (nextLevel === state.level) {
        return;
      }

      startQuiz(nextLevel);
      ui.quizSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ------------------------------------------------------------
  // 3. Завершення уроку. Нагороди не нараховуються без API платформи.
  // ------------------------------------------------------------

  ui.completeLesson.addEventListener("click", () => {
    if (!state.finished || state.completed) {
      return;
    }

    state.completed = true;
    ui.completionCard.classList.add("is-complete");
    ui.completeLesson.disabled = true;
    ui.completeLesson.textContent = "Урок завершено";
    ui.completionStatus.textContent =
      `Урок завершено. Результат: ${state.score} із ${currentQuestions().length}.`;

    // Місце для інтеграції з гейміфікацією:
    // перед підключенням перевірте реальний API проєкту.
    // Невідомі методи, глобальні змінні та нагороди не викликаються.
  });

  // Початковий стан.
  ui.pointPosition.value = String(state.position);
  setConcept(state.concept);
  updateThemeButton();
  startQuiz("medium");
})();