/* lessons/math/rectangle-square/script.js */
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const SVG_NS = "http://www.w3.org/2000/svg";

  const state = {
    concept: "rectangle",
    sideA: 8,
    sideB: 5,
    level: "medium",
    questionIndex: 0,
    score: 0,
    answered: 0,
    hasAnswered: false,
    finished: false,
    completed: false
  };

  const ui = {
    conceptCards: $$("[data-shape]"),
    modelHeading: $("#modelHeading"),
    shapeSvgTitle: $("#shapeSvgTitle"),
    shapeSvgDesc: $("#shapeSvgDesc"),
    shapeDrawing: $("#shapeDrawing"),
    shapeLabels: $("#shapeLabels"),
    sideA: $("#sideA"),
    sideB: $("#sideB"),
    sideAValue: $("#sideAValue"),
    sideBValue: $("#sideBValue"),
    sideBControl: $("#sideBControl"),
    perimeterValue: $("#perimeterValue"),
    areaValue: $("#areaValue"),
    perimeterFormula: $("#perimeterFormula"),
    areaFormula: $("#areaFormula"),
    modelHint: $("#modelHint"),
    calculationNote: $("#calculationNote"),
    resetModel: $("#resetModel"),

    levelCards: $$("[data-level]"),
    difficultyNote: $("#difficultyNote"),
    quizLevelLabel: $("#quizLevelLabel"),
    quizSection: $("#quizSection"),
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

  const requiredElements = [
    "modelHeading", "shapeSvgTitle", "shapeSvgDesc", "shapeDrawing",
    "shapeLabels", "sideA", "sideB", "sideAValue", "sideBValue",
    "sideBControl", "perimeterValue", "areaValue", "perimeterFormula",
    "areaFormula", "modelHint", "calculationNote", "resetModel",
    "difficultyNote", "quizLevelLabel", "quizSection", "quizForm",
    "answerFieldset", "questionCounter", "quizScore", "quizProgress",
    "quizProgressFill", "questionText", "answerList", "quizFeedback",
    "checkAnswer", "nextQuestion", "resultPanel", "resultTitle",
    "resultMessage", "finalScore", "finalPercent", "retryQuiz",
    "completionCard", "completionText", "completionStatus",
    "completeLesson"
  ];

  const missing = requiredElements.filter((key) => !ui[key]);

  if (missing.length) {
    console.error("[Прямокутник і квадрат] Відсутні елементи:", missing);
    return;
  }

  // ------------------------------------------------------------
  // 1. Інтерактивна геометрична модель
  // ------------------------------------------------------------

  const CONCEPTS = {
    rectangle: {
      heading: "Прямокутник",
      svgTitle: "Модель прямокутника",
      description: "Прямокутник зі сторонами a та b.",
      hint: "Змінюй довжину й ширину. Протилежні сторони прямокутника рівні."
    },
    square: {
      heading: "Квадрат",
      svgTitle: "Модель квадрата",
      description: "Квадрат, у якого всі сторони однакової довжини.",
      hint: "У квадрата всі сторони рівні. Змінюй сторону a — усі чотири сторони змінюватимуться разом."
    },
    perimeter: {
      heading: "Периметр",
      svgTitle: "Периметр прямокутника",
      description: "Периметр — сума довжин усіх сторін фігури.",
      hint: "Периметр показує загальну довжину межі фігури. Змінюй сторони та стеж за результатом."
    },
    area: {
      heading: "Площа",
      svgTitle: "Площа прямокутника",
      description: "Площа показує, скільки одиничних квадратів уміщується всередині фігури.",
      hint: "Площа залежить від обох сторін. Зверни увагу на сітку всередині фігури."
    }
  };

  function svgEl(tag, attrs = {}) {
    const node = document.createElementNS(SVG_NS, tag);

    for (const [key, value] of Object.entries(attrs)) {
      node.setAttribute(key, String(value));
    }

    return node;
  }

  function addSvgText(parent, text, x, y, className = "shape-side-label") {
    const node = svgEl("text", {
      x,
      y,
      class: className,
      "text-anchor": "middle"
    });
    node.textContent = text;
    parent.appendChild(node);
    return node;
  }

  function formatNumber(value) {
    return Number.isInteger(value)
      ? String(value)
      : value.toLocaleString("uk-UA", { maximumFractionDigits: 2 });
  }

  function isSquare() {
    return state.concept === "square";
  }

  function actualSideB() {
    return isSquare() ? state.sideA : state.sideB;
  }

  function setConcept(concept) {
    if (!Object.hasOwn(CONCEPTS, concept)) return;

    state.concept = concept;

    ui.conceptCards.forEach((card) => {
      const active = card.dataset.shape === concept;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-pressed", String(active));
    });

    renderModel();
  }

  function renderModel() {
    const concept = CONCEPTS[state.concept];
    const a = state.sideA;
    const b = actualSideB();
    const perimeter = 2 * (a + b);
    const area = a * b;

    ui.modelHeading.textContent = concept.heading;
    ui.shapeSvgTitle.textContent = concept.svgTitle;
    ui.shapeSvgDesc.textContent =
      `${concept.description} Довжина a — ${a} сантиметрів, ширина b — ${b} сантиметрів.`;
    ui.modelHint.textContent = concept.hint;

    ui.sideA.value = String(a);
    ui.sideAValue.textContent = `${a} см`;
    ui.sideAValue.value = `${a} см`;

    ui.sideB.value = String(state.sideB);
    ui.sideBValue.textContent = `${b} см`;
    ui.sideBValue.value = `${b} см`;

    ui.sideB.disabled = isSquare();
    ui.sideBControl.classList.toggle("is-disabled", isSquare());
    ui.sideBControl.setAttribute("aria-disabled", String(isSquare()));

    ui.perimeterValue.replaceChildren();
    ui.perimeterValue.append(document.createTextNode(formatNumber(perimeter)));
    const perimeterUnit = document.createElement("small");
    perimeterUnit.textContent = " см";
    ui.perimeterValue.appendChild(perimeterUnit);

    ui.areaValue.replaceChildren();
    ui.areaValue.append(document.createTextNode(formatNumber(area)));
    const areaUnit = document.createElement("small");
    areaUnit.textContent = " см²";
    ui.areaValue.appendChild(areaUnit);

    if (isSquare()) {
      ui.perimeterFormula.textContent = "P = 4 × a";
      ui.areaFormula.textContent = "S = a × a";
      ui.calculationNote.textContent =
        `P = 4 × ${a} = ${perimeter} см. S = ${a} × ${a} = ${area} см².`;
    } else {
      ui.perimeterFormula.textContent = "P = 2 × (a + b)";
      ui.areaFormula.textContent = "S = a × b";
      ui.calculationNote.textContent =
        `P = 2 × (${a} + ${b}) = ${perimeter} см. S = ${a} × ${b} = ${area} см².`;
    }

    drawShape(a, b);
  }

  function drawShape(a, b) {
    ui.shapeDrawing.replaceChildren();
    ui.shapeLabels.replaceChildren();

    // Розміри моделі масштабуються так, щоб фігура вміщувалася в SVG.
    const width = a * 18;
    const height = b * 18;
    const x = (440 - width) / 2;
    const y = (300 - height) / 2;
    const right = x + width;
    const bottom = y + height;

    if (state.concept === "area") {
      const unit = 18;

      for (let row = 0; row < b; row += 1) {
        for (let col = 0; col < a; col += 1) {
          const cell = svgEl("rect", {
            x: x + col * unit,
            y: y + row * unit,
            width: unit,
            height: unit,
            class: "area-cell"
          });
          ui.shapeDrawing.appendChild(cell);
        }
      }
    }

    const shape = svgEl("rect", {
      x, y, width, height,
      rx: 2,
      class: `shape-outline${isSquare() ? " square" : ""}`
    });
    ui.shapeDrawing.appendChild(shape);

    // Позначки прямих кутів.
    const marker = 9;
    const corners = [
      `M ${x + marker} ${y} H ${x + marker} V ${y + marker} H ${x}`,
      `M ${right - marker} ${y} V ${y + marker} H ${right}`,
      `M ${right - marker} ${bottom} V ${bottom - marker} H ${right}`,
      `M ${x + marker} ${bottom} V ${bottom - marker} H ${x}`
    ];

    corners.forEach((path) => {
      ui.shapeDrawing.appendChild(svgEl("path", {
        d: path,
        class: "shape-angle"
      }));
    });

    // Виносні лінії та позначення сторін.
    const topLineY = y - 22;
    const leftLineX = x - 22;

    ui.shapeDrawing.append(
      svgEl("path", {
        d: `M ${x} ${y - 5} V ${topLineY - 2} M ${right} ${y - 5} V ${topLineY - 2} M ${x} ${topLineY} H ${right}`,
        class: "shape-measure"
      }),
      svgEl("path", {
        d: `M ${x - 5} ${y} H ${leftLineX - 2} M ${x - 5} ${bottom} H ${leftLineX - 2} M ${leftLineX} ${y} V ${bottom}`,
        class: "shape-measure"
      })
    );

    addSvgText(
      ui.shapeLabels,
      `a = ${a} см`,
      x + width / 2,
      Math.max(19, topLineY - 7)
    );

    addSvgText(
      ui.shapeLabels,
      `b = ${b} см`,
      Math.max(25, leftLineX - 5),
      y + height / 2,
    ).setAttribute("transform", `rotate(-90 ${Math.max(25, leftLineX - 5)} ${y + height / 2})`);

    if (state.concept === "area") {
      addSvgText(
        ui.shapeLabels,
        `S = ${areaLabel(a, b)} см²`,
        x + width / 2,
        bottom + 23
      );
    }
  }

  function areaLabel(a, b) {
    return formatNumber(a * b);
  }

  ui.conceptCards.forEach((card) => {
    card.addEventListener("click", () => setConcept(card.dataset.shape));
  });

  ui.sideA.addEventListener("input", () => {
    const value = Number(ui.sideA.value);
    if (!Number.isFinite(value)) return;

    state.sideA = Math.max(1, Math.min(12, Math.round(value)));
    renderModel();
  });

  ui.sideB.addEventListener("input", () => {
    const value = Number(ui.sideB.value);
    if (!Number.isFinite(value)) return;

    state.sideB = Math.max(1, Math.min(10, Math.round(value)));
    renderModel();
  });

  ui.resetModel.addEventListener("click", () => {
    state.sideA = 8;
    state.sideB = 5;
    ui.sideA.value = "8";
    ui.sideB.value = "5";
    setConcept("rectangle");
  });

  // ------------------------------------------------------------
  // 2. Банк запитань для трьох рівнів
  // ------------------------------------------------------------

  const QUESTION_BANK = {
    easy: [
      {
        question: "Скільки прямих кутів має прямокутник?",
        answers: ["Два", "Три", "Чотири", "Жодного"],
        correct: 2,
        explanation: "Усі чотири кути прямокутника — прямі, тобто по 90°."
      },
      {
        question: "Яка властивість притаманна квадрату?",
        answers: [
          "Усі сторони різної довжини",
          "Усі сторони рівні",
          "Лише дві сторони рівні",
          "Немає прямих кутів"
        ],
        correct: 1,
        explanation: "Квадрат має чотири рівні сторони та чотири прямі кути."
      },
      {
        question: "Знайди периметр квадрата зі стороною 3 см.",
        answers: ["6 см", "9 см", "12 см", "12 см²"],
        correct: 2,
        explanation: "Периметр квадрата P = 4 × a = 4 × 3 = 12 см."
      },
      {
        question: "Яка одиниця підходить для вимірювання площі?",
        answers: ["см", "см²", "кг", "см³"],
        correct: 1,
        explanation: "Площу вимірюють квадратними одиницями, наприклад см² або м²."
      }
    ],

    medium: [
      {
        question: "Довжина прямокутника 8 см, ширина 3 см. Чому дорівнює периметр?",
        answers: ["11 см", "22 см", "24 см", "24 см²"],
        correct: 1,
        explanation: "P = 2 × (8 + 3) = 2 × 11 = 22 см."
      },
      {
        question: "Знайди площу прямокутника зі сторонами 7 см і 4 см.",
        answers: ["11 см²", "22 см²", "28 см²", "28 см"],
        correct: 2,
        explanation: "S = a × b = 7 × 4 = 28 см²."
      },
      {
        question: "Периметр квадрата дорівнює 36 см. Яка довжина його сторони?",
        answers: ["6 см", "9 см", "12 см", "18 см"],
        correct: 1,
        explanation: "У квадрата чотири рівні сторони, тому a = 36 ÷ 4 = 9 см."
      },
      {
        question: "Яке твердження правильне?",
        answers: [
          "Кожен прямокутник є квадратом",
          "Квадрат не має прямих кутів",
          "Кожен квадрат є прямокутником",
          "У прямокутника всі сторони завжди рівні"
        ],
        correct: 2,
        explanation: "Квадрат має всі властивості прямокутника, але додатково має чотири рівні сторони."
      },
      {
        question: "Площа прямокутника 30 см², а одна сторона — 6 см. Знайди іншу сторону.",
        answers: ["5 см", "24 см", "36 см", "6 см"],
        correct: 0,
        explanation: "Інша сторона дорівнює площі, поділеній на відому сторону: 30 ÷ 6 = 5 см."
      },
      {
        question: "На скільки збільшиться периметр квадрата, якщо його сторону збільшити з 4 см до 6 см?",
        answers: ["2 см", "4 см", "8 см", "12 см"],
        correct: 2,
        explanation: "Було 4 × 4 = 16 см, стало 4 × 6 = 24 см. Різниця: 24 − 16 = 8 см."
      }
    ],

    hard: [
      {
        question: "Прямокутник має периметр 34 см, а його довжина — 10 см. Знайди ширину.",
        answers: ["7 см", "14 см", "17 см", "24 см"],
        correct: 0,
        explanation: "P = 2(a + b), отже a + b = 34 ÷ 2 = 17. Ширина b = 17 − 10 = 7 см."
      },
      {
        question: "Площа квадрата дорівнює 64 см². Чому дорівнює його периметр?",
        answers: ["16 см", "24 см", "32 см", "256 см"],
        correct: 2,
        explanation: "Сторона квадрата дорівнює √64 = 8 см. Периметр P = 4 × 8 = 32 см."
      },
      {
        question: "Довжину прямокутника збільшили вдвічі, а ширину не змінили. Як змінилася площа?",
        answers: [
          "Не змінилася",
          "Збільшилася вдвічі",
          "Збільшилася втричі",
          "Збільшилася вчетверо"
        ],
        correct: 1,
        explanation: "S = a × b. Якщо замість a взяти 2a, то площа стане 2a × b = 2S."
      },
      {
        question: "Периметр прямокутника 50 см. Одна сторона 15 см. Яка площа прямокутника?",
        answers: ["150 см²", "300 см²", "15 см²", "100 см²"],
        correct: 0,
        explanation: "Півпериметр: 50 ÷ 2 = 25 см. Інша сторона: 25 − 15 = 10 см. Площа: 15 × 10 = 150 см²."
      },
      {
        question: "Квадрат і прямокутник мають однакову площу 36 см². Яка сторона квадрата?",
        answers: ["6 см", "9 см", "18 см", "36 см"],
        correct: 0,
        explanation: "Площа квадрата S = a². Оскільки 6 × 6 = 36, його сторона дорівнює 6 см."
      },
      {
        question: "Який квадратний периметр має прямокутник зі сторонами 12 см і 5 см?",
        answers: ["17 см", "34 см", "60 см²", "24 см"],
        correct: 1,
        explanation: "Периметр — це довжина межі: P = 2 × (12 + 5) = 34 см. Одиниця вимірювання — см."
      },
      {
        question: "Периметр квадрата дорівнює 28 см. Чому дорівнює його площа?",
        answers: ["7 см²", "28 см²", "49 см²", "196 см²"],
        correct: 2,
        explanation: "Сторона a = 28 ÷ 4 = 7 см. Площа S = 7 × 7 = 49 см²."
      },
      {
        question: "У прямокутника одна сторона 9 см, а площа 72 см². На скільки сантиметрів периметр більший за 30 см?",
        answers: ["2 см", "4 см", "6 см", "8 см"],
        correct: 1,
        explanation: "Друга сторона: 72 ÷ 9 = 8 см. Периметр: 2 × (9 + 8) = 34 см. Різниця: 34 − 30 = 4 см."
      }
    ]
  };

  const LEVELS = {
    easy: {
      title: "Простий рівень",
      note: "Простий рівень: 4 запитання на розпізнавання фігур і базові правила."
    },
    medium: {
      title: "Середній рівень",
      note: "Середній рівень: 6 запитань на обчислення периметра, площі та розуміння властивостей."
    },
    hard: {
      title: "Складний рівень",
      note: "Складний рівень: 8 запитань на логіку, зворотні обчислення та аналіз змін."
    }
  };

  function getQuestions() {
    return QUESTION_BANK[state.level];
  }

  function setQuizFeedback(message, type = "neutral") {
    ui.quizFeedback.textContent = message;
    ui.quizFeedback.hidden = !message;
    ui.quizFeedback.className = `quiz-feedback is-${type}`;
  }

  function updateLevelUI() {
    ui.levelCards.forEach((card) => {
      const active = card.dataset.level === state.level;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-pressed", String(active));
    });

    ui.difficultyNote.textContent = LEVELS[state.level].note;
    ui.quizLevelLabel.textContent = LEVELS[state.level].title;
  }

  function updateProgress() {
    const total = getQuestions().length;
    const number = Math.min(state.questionIndex + 1, total);

    ui.questionCounter.textContent = `Запитання ${number} із ${total}`;
    ui.quizScore.textContent = `Правильних: ${state.score}`;
    ui.quizProgress.setAttribute("aria-valuemax", String(total));
    ui.quizProgress.setAttribute("aria-valuenow", String(state.answered));
    ui.quizProgressFill.style.width = `${(state.answered / total) * 100}%`;
  }

  function renderQuestion() {
    const question = getQuestions()[state.questionIndex];

    state.hasAnswered = false;
    ui.questionText.textContent = question.question;
    ui.answerList.replaceChildren();
    ui.answerFieldset.disabled = false;
    ui.checkAnswer.hidden = false;
    ui.nextQuestion.hidden = true;
    ui.nextQuestion.textContent = "Наступне запитання";
    setQuizFeedback("");

    question.answers.forEach((answer, index) => {
      const label = document.createElement("label");
      label.className = "answer-option";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quizAnswer";
      radio.value = String(index);
      radio.required = true;

      const answerText = document.createElement("span");
      answerText.textContent = answer;

      label.append(radio, answerText);
      ui.answerList.appendChild(label);
    });

    updateProgress();
  }

  function checkAnswer(event) {
    event.preventDefault();

    if (state.finished || state.hasAnswered) return;

    const selected = $('input[name="quizAnswer"]:checked', ui.answerList);

    if (!selected) {
      setQuizFeedback("Обери один варіант відповіді, а потім натисни «Перевірити відповідь».", "neutral");
      return;
    }

    const question = getQuestions()[state.questionIndex];
    const selectedIndex = Number(selected.value);
    const isCorrect = selectedIndex === question.correct;

    state.hasAnswered = true;
    state.answered += 1;

    if (isCorrect) state.score += 1;

    $$(".answer-option", ui.answerList).forEach((label, index) => {
      const input = $("input", label);
      input.disabled = true;

      if (index === question.correct) {
        label.classList.add("is-correct");
      }

      if (index === selectedIndex && !isCorrect) {
        label.classList.add("is-incorrect");
      }
    });

    ui.answerFieldset.disabled = true;
    ui.checkAnswer.hidden = true;
    ui.nextQuestion.hidden = false;

    if (state.questionIndex === getQuestions().length - 1) {
      ui.nextQuestion.textContent = "Показати результат";
    }

    const prefix = isCorrect
      ? "Правильно!"
      : "Не зовсім. Правильну відповідь позначено зеленим.";

    setQuizFeedback(`${prefix} ${question.explanation}`, isCorrect ? "correct" : "incorrect");
    updateProgress();
  }

  function showResult() {
    state.finished = true;

    const total = getQuestions().length;
    const percent = Math.round((state.score / total) * 100);

    ui.quizForm.hidden = true;
    ui.resultPanel.hidden = false;
    ui.finalScore.textContent = `${state.score}/${total}`;
    ui.finalPercent.textContent = `${percent}%`;

    if (percent === 100) {
      ui.resultTitle.textContent = "Без жодної помилки!";
      ui.resultMessage.textContent =
        "Чудово! Ти впевнено розрізняєш властивості прямокутника й квадрата та вмієш застосовувати формули.";
    } else if (percent >= 75) {
      ui.resultTitle.textContent = "Чудова робота!";
      ui.resultMessage.textContent =
        "Ти добре засвоїв тему. Переглянь пояснення до помилкових відповідей, щоб закріпити знання.";
    } else if (percent >= 50) {
      ui.resultTitle.textContent = "Гарний початок!";
      ui.resultMessage.textContent =
        "Основи вже знайомі. Повтори формули периметра й площі та спробуй пройти тест ще раз.";
    } else {
      ui.resultTitle.textContent = "Продовжуй дослідження!";
      ui.resultMessage.textContent =
        "Повернися до інтерактивної моделі й шпаргалки. Крок за кроком ти навчишся розв’язувати ці задачі.";
    }

    ui.completeLesson.disabled = false;
    ui.completionText.textContent =
      `Тест пройдено: ${state.score} із ${total} правильних відповідей (${percent}%). Тепер можна позначити урок завершеним.`;
    ui.completionStatus.textContent = "Тест завершено. Урок ще не позначено завершеним.";

    ui.resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function nextQuestion() {
    if (!state.hasAnswered || state.finished) return;

    if (state.questionIndex >= getQuestions().length - 1) {
      showResult();
      return;
    }

    state.questionIndex += 1;
    renderQuestion();
    ui.questionText.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function startQuiz(level = state.level) {
    if (!Object.hasOwn(QUESTION_BANK, level)) return;

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
    ui.completeLesson.textContent = "Завершити урок";
    ui.completionCard.classList.remove("is-complete");
    ui.completionText.textContent =
      "Досліди модель, повтори шпаргалку та пройди мінітест. Після тесту зможеш позначити урок завершеним.";
    ui.completionStatus.textContent = "Урок ще не завершено.";

    renderQuestion();
  }

  ui.quizForm.addEventListener("submit", checkAnswer);
  ui.nextQuestion.addEventListener("click", nextQuestion);
  ui.retryQuiz.addEventListener("click", () => startQuiz(state.level));

  ui.levelCards.forEach((card) => {
    card.addEventListener("click", () => {
      const nextLevel = card.dataset.level;

      if (nextLevel === state.level) return;

      startQuiz(nextLevel);
      ui.quizSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ------------------------------------------------------------
  // 3. Позначення уроку завершеним
  // ------------------------------------------------------------

  ui.completeLesson.addEventListener("click", () => {
    if (!state.finished || state.completed) return;

    state.completed = true;
    ui.completionCard.classList.add("is-complete");
    ui.completeLesson.disabled = true;
    ui.completeLesson.textContent = "Урок завершено";
    ui.completionStatus.textContent =
      `Урок завершено. Результат: ${state.score} із ${getQuestions().length}.`;

    // Інтеграцію з винагородами можна додати після перевірки
    // реального API гейміфікації навчальної платформи.
    // Тут навмисно не викликаються невідомі функції.
  });

  // Початкове відображення.
  renderModel();
  updateThemeButton();
  startQuiz("medium");
})();