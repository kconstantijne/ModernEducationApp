
/* Інтерактивний урок: «Прямокутник та квадрат», 5 клас.
   Чистий JavaScript, без сторонніх бібліотек. */
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const concepts = [
    {
      id: "rectangle",
      icon: "▱",
      title: "Прямокутник",
      subtitle: "Чотири прямі кути",
      description: "Прямокутник — це чотирикутник, у якого всі кути прямі. Протилежні сторони рівні.",
      fact: "Якщо довжина 8 см, а ширина 3 см, то периметр дорівнює 2 × (8 + 3) = 22 см."
    },
    {
      id: "square",
      icon: "□",
      title: "Квадрат",
      subtitle: "Усі сторони рівні",
      description: "Квадрат — це прямокутник, у якого всі чотири сторони рівні. Усі його кути прямі.",
      fact: "Якщо сторона квадрата 5 см, то периметр — 4 × 5 = 20 см, а площа — 5 × 5 = 25 см²."
    },
    {
      id: "perimeter",
      icon: "↔",
      title: "Периметр",
      subtitle: "Довжина межі фігури",
      description: "Периметр — це сума довжин усіх сторін фігури. Він показує, скільки одиниць довжини потрібно для обходу межі.",
      fact: "Для прямокутника P = 2 × (a + b), а для квадрата P = 4 × a."
    },
    {
      id: "area",
      icon: "❖",
      title: "Площа",
      subtitle: "Місце всередині фігури",
      description: "Площа показує, скільки квадратних одиниць уміщується всередині фігури.",
      fact: "Площа прямокутника S = a × b, а площа квадрата S = a × a."
    }
  ];

  const cheatSheet = [
    {
      icon: "📐",
      title: "Прямі кути",
      color: "blue",
      text: "Кожен кут прямокутника й квадрата дорівнює 90°.",
      example: "У фігури чотири прямі кути."
    },
    {
      icon: "↔️",
      title: "Протилежні сторони",
      color: "purple",
      text: "У прямокутника протилежні сторони попарно рівні.",
      example: "Довжини 7 см і 3 см повторюються попарно."
    },
    {
      icon: "🟪",
      title: "Ознака квадрата",
      color: "pink",
      text: "Квадрат має чотири рівні сторони та чотири прямі кути.",
      example: "Сторони: 4 см, 4 см, 4 см, 4 см."
    },
    {
      icon: "🔁",
      title: "Формула периметра",
      color: "yellow",
      text: "Периметр — сума всіх сторін.",
      example: "P прям. = 2(a + b); P кв. = 4a."
    },
    {
      icon: "🧩",
      title: "Формула площі",
      color: "green",
      text: "Площу прямокутника обчислюємо множенням довжини на ширину.",
      example: "S = a × b; одиниці площі — см², м² тощо."
    }
  ];

  const questions = {
    easy: [
      {
        q: "Скільки прямих кутів має прямокутник?",
        a: ["Два", "Три", "Чотири", "Жодного"],
        correct: 2,
        explanation: "У прямокутника всі чотири кути прямі, тобто по 90°."
      },
      {
        q: "Яка фігура має чотири рівні сторони й чотири прямі кути?",
        a: ["Трикутник", "Квадрат", "Коло", "Будь-який прямокутник"],
        correct: 1,
        explanation: "Квадрат має і чотири рівні сторони, і чотири прямі кути."
      },
      {
        q: "Як називається сума довжин усіх сторін фігури?",
        a: ["Площа", "Ширина", "Об'єм", "Периметр"],
        correct: 3,
        explanation: "Периметр — це загальна довжина межі фігури."
      },
      {
        q: "Яка формула площі прямокутника зі сторонами a і b?",
        a: ["S = a + b", "S = 2(a + b)", "S = a × b", "S = 4a"],
        correct: 2,
        explanation: "Площу прямокутника обчислюємо множенням довжини на ширину: S = a × b."
      }
    ],

    medium: [
      {
        q: "Довжина прямокутника 8 см, ширина 3 см. Чому дорівнює периметр?",
        a: ["11 см", "22 см", "24 см", "16 см"],
        correct: 1,
        explanation: "P = 2 × (8 + 3) = 2 × 11 = 22 см."
      },
      {
        q: "Сторона квадрата дорівнює 6 см. Яка його площа?",
        a: ["12 см²", "24 см²", "36 см²", "18 см²"],
        correct: 2,
        explanation: "S = 6 × 6 = 36 см². Для площі використовують квадратні одиниці."
      },
      {
        q: "Периметр квадрата дорівнює 28 см. Яка довжина його сторони?",
        a: ["7 см", "6 см", "14 см", "4 см"],
        correct: 0,
        explanation: "У квадрата чотири рівні сторони, тому a = 28 ÷ 4 = 7 см."
      },
      {
        q: "Площа прямокутника 45 см², а одна сторона 9 см. Знайди іншу сторону.",
        a: ["36 см", "9 см", "6 см", "5 см"],
        correct: 3,
        explanation: "Інша сторона дорівнює площі, поділеній на відому сторону: 45 ÷ 9 = 5 см."
      },
      {
        q: "Яке твердження завжди правильне?",
        a: [
          "Кожен прямокутник — квадрат",
          "У квадрата лише два прямі кути",
          "Квадрат є прямокутником",
          "У прямокутника всі сторони різні"
        ],
        correct: 2,
        explanation: "Квадрат відповідає визначенню прямокутника, бо має чотири прямі кути."
      },
      {
        q: "Сторони прямокутника 10 см і 4 см. Яка його площа?",
        a: ["28 см²", "40 см²", "14 см²", "80 см²"],
        correct: 1,
        explanation: "S = 10 × 4 = 40 см²."
      }
    ],

    hard: [
      {
        q: "Периметр прямокутника 34 см, його довжина 10 см. Яка ширина?",
        a: ["7 см", "14 см", "4 см", "5 см"],
        correct: 0,
        explanation: "Півпериметр дорівнює 34 ÷ 2 = 17 см. Ширина: 17 − 10 = 7 см."
      },
      {
        q: "Площа квадрата дорівнює 64 см². Чому дорівнює його периметр?",
        a: ["16 см", "24 см", "32 см", "64 см"],
        correct: 2,
        explanation: "Сторона квадрата дорівнює 8 см, адже 8 × 8 = 64. Периметр: 4 × 8 = 32 см."
      },
      {
        q: "Прямокутник має периметр 26 см і ширину 5 см. Яка його площа?",
        a: ["40 см²", "30 см²", "65 см²", "20 см²"],
        correct: 0,
        explanation: "Півпериметр 13 см, довжина 13 − 5 = 8 см. Площа: 8 × 5 = 40 см²."
      },
      {
        q: "Який квадрат має більшу площу?",
        a: ["Зі стороною 5 см", "Зі стороною 4 см", "Площі однакові", "Неможливо визначити"],
        correct: 0,
        explanation: "5² = 25 см², а 4² = 16 см², тому більшу площу має квадрат зі стороною 5 см."
      },
      {
        q: "Довжину прямокутника збільшили вдвічі, а ширину не змінили. Як змінилася площа?",
        a: ["Зменшилася вдвічі", "Збільшилася вдвічі", "Збільшилася на 2 см²", "Не змінилася"],
        correct: 1,
        explanation: "Якщо довжину a замінити на 2a, площа стане 2a × b = 2S, тобто подвоїться."
      },
      {
        q: "Периметр квадрата 36 см. Яка його площа?",
        a: ["81 см²", "36 см²", "72 см²", "9 см²"],
        correct: 0,
        explanation: "Сторона: 36 ÷ 4 = 9 см. Площа: 9 × 9 = 81 см²."
      },
      {
        q: "Який прямокутник із цілими додатними сторонами та периметром 20 см має найбільшу площу?",
        a: ["1 см × 9 см", "2 см × 8 см", "4 см × 6 см", "5 см × 5 см"],
        correct: 3,
        explanation: "За периметра 20 см найбільшу площу серед наведених має квадрат 5 × 5 = 25 см²."
      },
      {
        q: "Площа прямокутника 48 см². Одна сторона 6 см. Який його периметр?",
        a: ["28 см", "24 см", "54 см", "16 см"],
        correct: 0,
        explanation: "Друга сторона: 48 ÷ 6 = 8 см. Периметр: 2 × (6 + 8) = 28 см."
      }
    ]
  };

  const state = {
    concept: "rectangle",
    level: "easy",
    questionIndex: 0,
    correct: 0,
    answered: false,
    answers: [],
    stars: 0,
    totalStars: 0,
    modelShape: "rectangle",
    length: 8,
    width: 4
  };

  function announce(message, target = $("#live-message")) {
    if (target) target.textContent = message;
  }

  function renderConcepts() {
    const container = $("#concept-cards, [data-concept-cards]");
    if (!container) return;

    container.replaceChildren();

    concepts.forEach((concept) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "concept-card";
      button.dataset.concept = concept.id;
      button.setAttribute("aria-pressed", String(concept.id === state.concept));

      const icon = document.createElement("span");
      icon.className = "concept-card__icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = concept.icon;

      const title = document.createElement("strong");
      title.textContent = concept.title;

      const subtitle = document.createElement("span");
      subtitle.textContent = concept.subtitle;

      button.append(icon, title, subtitle);
      button.addEventListener("click", () => selectConcept(concept.id));
      container.append(button);
    });
  }

  function selectConcept(id) {
    const concept = concepts.find((item) => item.id === id);
    if (!concept) return;

    state.concept = id;

    $$(".concept-card").forEach((card) => {
      const selected = card.dataset.concept === id;
      card.setAttribute("aria-pressed", String(selected));
      card.classList.toggle("is-selected", selected);
    });

    const title = $("#concept-title, [data-concept-title]");
    const description = $("#concept-description, [data-concept-description]");
    const fact = $("#concept-example, [data-concept-example]");

    if (title) title.textContent = concept.title;
    if (description) description.textContent = concept.description;
    if (fact) fact.textContent = concept.fact;

    announce(`Вибрано поняття: ${concept.title}.`);
  }

  function renderCheatSheet() {
    const container = $("#cheat-sheet, [data-cheat-sheet]");
    if (!container) return;

    container.replaceChildren();

    cheatSheet.forEach((item) => {
      const card = document.createElement("article");
      card.className = `cheat-card accent-${item.color}`;

      const icon = document.createElement("span");
      icon.className = "cheat-card__icon";
      icon.textContent = item.icon;
      icon.setAttribute("aria-hidden", "true");

      const title = document.createElement("h3");
      title.textContent = item.title;

      const text = document.createElement("p");
      text.textContent = item.text;

      const example = document.createElement("p");
      example.className = "cheat-card__example";
      example.textContent = item.example;

      card.append(icon, title, text, example);
      container.append(card);
    });
  }

  function modelElements() {
    return {
      svg: $("#geometry-svg, [data-geometry-svg]"),
      length: $("#length-input, [data-length-input]"),
      width: $("#width-input, [data-width-input]"),
      lengthValue: $("#length-value, [data-length-value]"),
      widthValue: $("#width-value, [data-width-value]"),
      perimeter: $("#model-perimeter, [data-model-perimeter]"),
      area: $("#model-area, [data-model-area]"),
      shapeLabel: $("#model-shape-label, [data-model-shape-label]"),
      feedback: $("#model-feedback, [data-model-feedback]")
    };
  }

  function renderModel() {
    const el = modelElements();
    const a = state.length;
    const b = state.modelShape === "square" ? a : state.width;

    if (el.length) el.value = String(a);

    if (el.width) {
      el.value = String(state.width);
      el.disabled = state.modelShape === "square";
    }

    if (el.lengthValue) el.lengthValue.textContent = `${a} см`;
    if (el.widthValue) el.widthValue.textContent = `${b} см`;

    if (el.perimeter) {
      const perimeter = state.modelShape === "square" ? 4 * a : 2 * (a + b);
      el.perimeter.textContent = `${perimeter} см`;
    }

    if (el.area) {
      const area = state.modelShape === "square" ? a * a : a * b;
      el.area.textContent = `${area} см²`;
    }

    if (el.shapeLabel) {
      el.shapeLabel.textContent =
        state.modelShape === "square" ? "Квадрат" : "Прямокутник";
    }

    if (el.feedback) {
      el.feedback.textContent = state.modelShape === "square"
        ? `У квадрата всі сторони рівні: ${a} см.`
        : `Протилежні сторони рівні: ${a} см і ${b} см.`;
    }

    if (el.svg) drawShape(el.svg, a, b, state.modelShape);
  }

  function drawShape(svg, a, b, shape) {
    const ns = "http://www.w3.org/2000/svg";

    svg.replaceChildren();
    svg.setAttribute("viewBox", "0 0 360 230");
    svg.setAttribute("role", "img");
    svg.setAttribute(
      "aria-label",
      shape === "square"
        ? `Квадрат зі стороною ${a} сантиметрів`
        : `Прямокутник зі сторонами ${a} і ${b} сантиметрів`
    );

    const maxW = 260;
    const maxH = 135;
    const scale = Math.min(maxW / a, maxH / b);
    const w = a * scale;
    const h = b * scale;
    const x = (360 - w) / 2;
    const y = (190 - h) / 2;

    const rect = document.createElementNS(ns, "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", w);
    rect.setAttribute("height", h);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#e9e5ff");
    rect.setAttribute("stroke", "#7665d8");
    rect.setAttribute("stroke-width", "3");

    svg.append(rect);

    const addText = (text, tx, ty) => {
      const node = document.createElementNS(ns, "text");
      node.setAttribute("x", tx);
      node.setAttribute("y", ty);
      node.setAttribute("text-anchor", "middle");
      node.setAttribute("font-size", "13");
      node.setAttribute("font-family", "inherit");
      node.setAttribute("fill", "currentColor");
      node.textContent = text;
      svg.append(node);
    };

    addText(`${a} см`, x + w / 2, y + h + 22);
    addText(`${b} см`, x + w + 25, y + h / 2 + 4);
    addText("90°", x + 20, y + 20);
  }

  function resetModel() {
    state.modelShape = "rectangle";
    state.length = 8;
    state.width = 4;

    const shapeSelect = $("#shape-select, [data-shape-select]");
    if (shapeSelect) shapeSelect.value = "rectangle";

    renderModel();
    announce("Модель скинуто до початкових значень.");
  }

  function levelLabel(level) {
    return {
      easy: "простий",
      medium: "середній",
      hard: "складний"
    }[level] || level;
  }

  function setLevel(level) {
    if (!questions[level]) return;

    state.level = level;
    state.questionIndex = 0;
    state.correct = 0;
    state.answered = false;
    state.answers = [];

    $$(".level-card, [data-level]").forEach((card) => {
      const selected = (card.dataset.level || card.value) === level;
      card.classList.toggle("is-selected", selected);
      card.setAttribute("aria-pressed", String(selected));
    });

    const levelSelect = $("#level-select, [data-level-select]");
    if (levelSelect) levelSelect.value = level;

    renderQuestion();
    announce(`Обрано ${levelLabel(level)} рівень. Починаємо нову спробу.`);
  }

  function renderQuestion() {
    const list = questions[state.level];
    const levelLabel = $("#quizLevelLabel");
    if (levelLabel) levelLabel.textContent = state.level === "easy" ? "Простий рівень" : state.level === "medium" ? "Середній рівень" : "Складний рівень";
    const resultPanel = $("#quizResult, #quiz-result, [data-quiz-result]");
    const quizPanel = $("#quizActive, #quiz-panel, [data-quiz-panel]");

    if (state.questionIndex >= list.length) {
      showResults();
      return;
    }

    if (resultPanel) resultPanel.hidden = true;
    if (quizPanel) quizPanel.hidden = false;

    state.answered = false;

    const question = list[state.questionIndex];
    const qText = $("#questionText, #question-text, [data-question-text]");

    if (qText) qText.textContent = question.q;

    const count = $("#questionCounter, #question-count, [data-question-count]");
    if (count) {
      count.textContent = `Запитання ${state.questionIndex + 1} із ${list.length}`;
    }

    const progress = $("#progressFill, #quiz-progress, [data-quiz-progress]");
    if (progress) {
      if (progress.tagName === "DIV") {
        progress.style.width = `${(state.questionIndex / list.length) * 100}%`;
        progress.setAttribute("role", "progressbar");
        progress.setAttribute("aria-valuemin", "0");
        progress.setAttribute("aria-valuemax", String(list.length));
        progress.setAttribute("aria-valuenow", String(state.questionIndex));
        progress.setAttribute("aria-valuetext", `${state.questionIndex} із ${list.length}`);
      } else {
        progress.max = list.length;
        progress.value = state.questionIndex;
      }
    }

    const correctCount = $("#correctCounter, #correct-count, [data-correct-count]");
    if (correctCount) correctCount.textContent = String(state.correct);

    const options = $("#answerList, #answer-options, [data-answer-options]");

    if (options) {
      options.replaceChildren();

      question.a.forEach((answer, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer-option";
        button.dataset.answerIndex = String(index);
        button.setAttribute(
          "aria-label",
          `Варіант ${String.fromCharCode(65 + index)}: ${answer}`
        );

        const letter = document.createElement("span");
        letter.className = "answer-option__letter";
        letter.textContent = String.fromCharCode(65 + index);

        const text = document.createElement("span");
        text.textContent = answer;

        button.append(letter, text);
        button.addEventListener("click", () => chooseAnswer(index));
        options.append(button);
      });
    }

    const feedback = $("#feedbackBox, #answer-feedback, [data-answer-feedback]");

    if (feedback) {
      feedback.hidden = true;
      feedback.textContent = "";
      feedback.className = "answer-feedback";
    }

    const next = $("#nextQuestion, #next-question, [data-next-question]");
    if (next) next.hidden = true;
  }

  function chooseAnswer(index) {
    if (state.answered) return;

    const list = questions[state.level];
    const question = list[state.questionIndex];

    if (!question || index < 0 || index >= question.a.length) return;

    state.answered = true;

    const isCorrect = index === question.correct;
    if (isCorrect) state.correct++;

    state.answers.push({
      questionIndex: state.questionIndex,
      selected: index,
      correct: isCorrect
    });

    $$(".answer-option").forEach((button) => {
      button.disabled = true;

      const answerIndex = Number(button.dataset.answerIndex);

      if (answerIndex === question.correct) {
        button.classList.add("is-correct");
      } else if (answerIndex === index) {
        button.classList.add("is-incorrect");
      }
    });

    const feedback = $("#feedbackBox, #answer-feedback, [data-answer-feedback]");

    if (feedback) {
      feedback.hidden = false;
      feedback.classList.toggle("is-correct", isCorrect);
      feedback.classList.toggle("is-incorrect", !isCorrect);
      feedback.textContent =
        `${isCorrect ? "Правильно! " : "Не зовсім. "}${question.explanation}`;
    }

    const correctCount = $("#correctCounter, #correct-count, [data-correct-count]");
    if (correctCount) correctCount.textContent = String(state.correct);

    const next = $("#nextQuestion, #next-question, [data-next-question]");

    if (next) {
      next.hidden = false;
      next.textContent =
        state.questionIndex === list.length - 1
          ? "Показати результат"
          : "Наступне запитання";
      next.focus({ preventScroll: true });
    }

    const progress = $("#progressFill, #quiz-progress, [data-quiz-progress]");
    if (progress) {
      if (progress.tagName === "DIV") {
        const total = questions[state.level].length;
        progress.style.width = `${((state.questionIndex + 1) / total) * 100}%`;
        progress.setAttribute("aria-valuenow", String(state.questionIndex + 1));
      } else progress.value = state.questionIndex + 1;
    }

    announce(
      isCorrect
        ? "Правильна відповідь."
        : "Відповідь неправильна. Прочитай пояснення."
    );
  }

  function showResults() {
    const list = questions[state.level];
    const total = list.length;
    const percent = Math.round((state.correct / total) * 100);
state.stars = percent >= 90 ? 3
      : percent >= 70 ? 2
      : percent >= 50 ? 1
      : 0;

    const quizPanel = $("#quizActive, #quiz-panel, [data-quiz-panel]");
    const resultPanel = $("#quizResult, #quiz-result, [data-quiz-result]");

    if (quizPanel) quizPanel.hidden = true;
    if (resultPanel) resultPanel.hidden = false;

    const score = $("#finalCorrect, #result-score, [data-result-score]");
    if (score) score.textContent = `${state.correct} / ${total}`;

    const percentEl = $("#finalPercent, #result-percent, [data-result-percent]");
    if (percentEl) percentEl.textContent = `${percent}%`;

    const stars = $("#earnedStars, #result-stars, [data-result-stars]");
    if (stars) {
      stars.textContent = "★".repeat(state.stars) +
        "☆".repeat(3 - state.stars);
    }

    const message = $("#resultMessage, #result-message, [data-result-message]");

    if (message) {
      message.textContent = percent >= 90
        ? "Чудова робота! Ти впевнено розрізняєш прямокутник і квадрат."
        : percent >= 70
          ? "Гарний результат! Повтори формули й спробуй здобути ще більше зірок."
          : percent >= 50
            ? "Непоганий початок. Переглянь шпаргалку та потренуйся ще."
            : "Не здавайся! Повернися до понять і моделі, а потім пройди тест знову.";
    }

    const earned = $("#earned-stars, [data-earned-stars]");
    if (earned) earned.textContent = String(state.stars);

    const totalStars = $("#starBalance, #total-stars, [data-total-stars]");

    if (totalStars) {
      state.totalStars += state.stars;
      totalStars.textContent = String(state.totalStars);
    }

    announce(`Тест завершено. Правильних відповідей: ${state.correct} із ${total}.`);
  
    // Єдине нарахування комп’юшок: результат обробляється після відображення підсумку.
    Promise.resolve().then(async () => {
      const scorePercent = typeof percent !== 'undefined' ? percent : (typeof pct !== 'undefined' ? pct : 0);
      const rewardResult = await window.LearningGamification?.awardTestResult("rectangle-square", scorePercent, state.level);
      const claimButton = document.getElementById('claimReward');
      if (claimButton) claimButton.hidden = true;
      const starLabel = document.getElementById('earnedStars');
      if (starLabel) starLabel.textContent = rewardResult?.passed ? `🪙 ${rewardResult.coinsAwarded} комп’юшок` : 'Потрібно 70% для винагороди';
      const note = document.getElementById('rewardNote');
      if (note) note.textContent = rewardResult?.message || 'Комп’юшки нараховуються автоматично після тесту.';
    });
}
function restartQuiz() {
    state.questionIndex = 0;
    state.correct = 0;
    state.answered = false;
    state.answers = [];

    renderQuestion();
    announce("Тест розпочато знову.");
  }

  function bind(selector, event, callback) {
    $$(selector).forEach((element) => {
      element.addEventListener(event, callback);
    });
  }

  function init() {
    renderConcepts();
    renderCheatSheet();
    selectConcept(state.concept);
    renderModel();
    renderQuestion();

    bind("#length-input, [data-length-input]", "input", (event) => {
      state.length = clamp(Number(event.currentTarget.value) || 1, 1, 12);

      if (state.modelShape === "square") {
        state.width = state.length;
      }

      renderModel();
    });

    bind("#width-input, [data-width-input]", "input", (event) => {
      state.width = clamp(Number(event.currentTarget.value) || 1, 1, 12);
      renderModel();
    });

    bind("#shape-select, [data-shape-select]", "change", (event) => {
      state.modelShape =
        event.currentTarget.value === "square" ? "square" : "rectangle";

      if (state.modelShape === "square") {
        state.width = state.length;
      }

      renderModel();
    });

    bind("#reset-model, [data-reset-model]", "click", resetModel);

    bind("#nextQuestion, #next-question, [data-next-question]", "click", () => {
      if (!state.answered) return;

      state.questionIndex++;
      renderQuestion();
    });

    bind("#retryQuiz, #restart-quiz, [data-restart-quiz]", "click", restartQuiz);

    bind(".level-card, [data-level]", "click", (event) => {
      const card = event.currentTarget;
      setLevel(card.dataset.level || card.value);
    });

    bind("#start-lesson, [data-start-lesson]", "click", () => {
      const target = $("#concepts, #step-01, [data-step='concepts']");

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });

    bind("#theme-toggle, [data-theme-toggle]", "click", () => {
      const root = document.documentElement;
      const dark = root.dataset.theme !== "dark";

      root.dataset.theme = dark ? "dark" : "light";

      const button = $("#theme-toggle, [data-theme-toggle]");

      if (button) {
        button.setAttribute("aria-pressed", String(dark));
        button.setAttribute(
          "aria-label",
          dark ? "Увімкнути світлу тему" : "Увімкнути темну тему"
        );
      }
    });

    bind("#level-select, [data-level-select]", "change", (event) => {
      setLevel(event.currentTarget.value);
    });

    bind('a[href^="#"]', "click", (event) => {
      const href = event.currentTarget.getAttribute("href");

      if (!href || href === "#") return;

      const target = $(href);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
