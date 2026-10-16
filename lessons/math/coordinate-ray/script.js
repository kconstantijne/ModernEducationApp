
(() => {
  "use strict";

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  const concepts = {
    ray: {
      title: "Координатний промінь",
      description:
        "Координатний промінь має початок, напрям і одиничний відрізок. Числа на ньому зростають праворуч.",
      note:
        "Промінь продовжується в одному напрямі, тому на ньому можна позначати дедалі більші числа.",
      status:
        "Зверни увагу: позначки йдуть від 0 праворуч у напрямі зростання чисел."
    },

    origin: {
      title: "Початок відліку — точка O",
      description:
        "Початок координатного променя позначають O. Його координата дорівнює нулю.",
      note:
        "Точка O має координату 0. Відлік поділок починають саме від неї.",
      status:
        "Точка O завжди стоїть на початку променя та відповідає числу 0."
    },

    unit: {
      title: "Одиничний відрізок задає крок",
      description:
        "Одиничний відрізок — це відрізок, довжину якого прийнято за одну одиницю. Він визначає відстань між сусідніми цілими числами, якщо поділки рівні.",
      note:
        "Якщо відрізок від 0 до 1 дорівнює 1 см, то від 0 до 4 — 4 см.",
      status:
        "Зміни значення кроку: номер поділки залишиться тим самим, але її число зміниться."
    },

    coordinate: {
      title: "Координата показує місце точки",
      description:
        "Координата точки — це число, яке відповідає її положенню на координатному промені. Її записують у дужках після назви точки.",
      note:
        "Якщо точка A розташована на шостій поділці від O за одиничного кроку 1, то A(6).",
      status:
        "Обери номер поділки й визнач координату точки A."
    }
  };

  const levelNames = {
    easy: "Простий рівень",
    medium: "Середній рівень",
    hard: "Складний рівень"
  };

  const rewards = {
    easy: 10,
    medium: 15,
    hard: 20
  };

  const questions = {
    easy: [
      {
        q: "Яку координату має початок координатного променя O?",
        a: ["1", "0", "10", "100"],
        correct: 1,
        why: "Початок відліку позначають O, і його координата дорівнює 0."
      },
      {
        q: "У якому напрямі зростають числа на координатному промені?",
        a: [
          "Ліворуч від початку",
          "В обидва боки однаково",
          "Праворуч від початку",
          "Напрям не має значення"
        ],
        correct: 2,
        why: "Координатний промінь починається в O і продовжується праворуч, де числа зростають."
      },
      {
        q: "Що називають одиничним відрізком?",
        a: [
          "Відрізок, довжину якого прийнято за одиницю",
          "Будь-який найдовший відрізок",
          "Відстань між числами 2 і 5",
          "Саму точку O"
        ],
        correct: 0,
        why: "Одиничний відрізок задає масштаб променя: за його довжину приймають одну одиницю."
      },
      {
        q: "Як записати, що точка A має координату 4?",
        a: ["4A", "A=4 см", "A(4)", "(A)4"],
        correct: 2,
        why: "Назву точки записують перед координатою в дужках: A(4)."
      }
    ],

    medium: [
      {
        q: "Одна поділка дорівнює 1. Яке число стоїть на п’ятій поділці після 0?",
        a: ["4", "5", "6", "10"],
        correct: 1,
        why: "Від 0 відраховуємо п’ять рівних одиничних кроків: отримуємо 5."
      },
      {
        q: "Одиничний відрізок дорівнює 2 см. Яка відстань від 0 до координати 3?",
        a: ["3 см", "5 см", "6 см", "9 см"],
        correct: 2,
        why: "До координати 3 є три одиничні кроки по 2 см: 3 × 2 = 6 см."
      },
      {
        q: "На якій поділці розташована точка B(7), якщо крок дорівнює 1?",
        a: ["На сьомій", "На шостій", "На першій", "На восьмій"],
        correct: 0,
        why: "Координата 7 означає сім одиничних кроків від початку O."
      },
      {
        q: "Крок між сусідніми поділками дорівнює 5. Яка координата четвертої поділки?",
        a: ["9", "15", "20", "25"],
        correct: 2,
        why: "Координата дорівнює номеру поділки, помноженому на значення кроку: 4 × 5 = 20."
      },
      {
        q: "Яка точка розташована правіше на промені: M(3) чи N(8)?",
        a: [
          "M(3)",
          "N(8)",
          "Вони в одному місці",
          "Не можна визначити"
        ],
        correct: 1,
        why: "На координатному промені більше число розташоване правіше. Оскільки 8 > 3, правіше точка N."
      },
      {
        q: "Від 0 до точки C — чотири рівні кроки по 3 одиниці. Яка координата C?",
        a: ["7", "12", "4", "9"],
        correct: 1,
        why: "Кожен крок дорівнює 3 одиницям, а кроків чотири: 4 × 3 = 12."
      }
    ],

    hard: [
      {
        q: "Одиничний відрізок дорівнює 4 см. На якій відстані від O буде точка A(6)?",
        a: ["10 см", "20 см", "24 см", "6 см"],
        correct: 2,
        why: "Координата 6 означає шість одиничних відрізків: 6 × 4 = 24 см."
      },
      {
        q: "На промені сусідні позначки мають координати 0, 3, 6, 9… Яка координата наступної позначки?",
        a: ["10", "11", "12", "15"],
        correct: 2,
        why: "Кожного разу додаємо 3: 9 + 3 = 12."
      },
      {
        q: "Точка A має координату 18, а крок між позначками дорівнює 3. На якій поділці стоїть A?",
        a: ["На 3-й", "На 6-й", "На 9-й", "На 15-й"],
        correct: 1,
        why: "Щоб знайти номер поділки, координату ділимо на крок: 18 ÷ 3 = 6."
      },
      {
        q: "Учень позначив точку з координатою 5 на четвертій поділці, де крок дорівнює 1. У чому помилка?",
        a: [
          "Помилки немає",
          "На четвертій поділці координата має бути 4",
          "Координата початку не 0",
          "Координати не записують числами"
        ],
        correct: 1,
        why: "За кроку 1 четверта поділка відповідає числу 4. Щоб дістатися 5, потрібно п’ять одиничних кроків."
      },
      {
        q: "Точки P(11) і Q(7) розміщені на промені. На скільки одиниць P правіше за Q?",
        a: ["4", "7", "11", "18"],
        correct: 0,
        why: "Знаходимо різницю координат: 11 − 7 = 4 одиниці."
      },
      {
        q: "На п’ятій поділці стоїть число 20. Яке число відповідає одній поділці, якщо O має координату 0?",
        a: ["2", "4", "5", "15"],
        correct: 1,
        why: "П’ять однакових кроків дають 20: 20 ÷ 5 = 4 одиниці на крок."
      },
      {
        q: "Одиничний відрізок 2 см. Точка B розташована на відстані 14 см від O. Яка її координата?",
        a: ["7", "12", "14", "28"],
        correct: 0,
        why: "Кількість одиничних відрізків: 14 ÷ 2 = 7. Отже, координата B — 7."
      },
      {
        q: "Точка A(4) і точка B(10). Одиничний відрізок збільшили вдвічі, але координати точок не змінювали. Що станеться з відстанню між A і B у сантиметрах?",
        a: [
          "Зменшиться вдвічі",
          "Не зміниться",
          "Збільшиться вдвічі",
          "Збільшиться на 2 см"
        ],
        correct: 2,
        why: "Різниця координат дорівнює 10 − 4 = 6 одиничних відрізків. Якщо довжина кожного відрізка подвоїлася, фізична відстань також подвоїться."
      }
    ]
  };

  const state = {
    concept: "ray",
    level: "easy",
    questionIndex: 0,
    correct: 0,
    answered: false,
    completed: false,
    claimed: false,
    stars: 0
  };

  const format = n =>
    new Intl.NumberFormat("uk-UA", {
      maximumFractionDigits: 2
    }).format(n);

  function setStatus(message, kind = "neutral") {
    const box = $("#modelStatus");
    box.replaceChildren();

    const dot = document.createElement("span");
    dot.className = "status-dot";

    if (kind === "good") {
      dot.style.background = "var(--green, #2eaa78)";
    }

    if (kind === "bad") {
      dot.style.background = "var(--red, #d85d68)";
    }

    const text = document.createElement("span");
    text.textContent = message;

    box.append(dot, text);
  }

  function renderRay(selected = null) {
    const unit = Number($("#unitInput").value);
    const ticks = $("#coordinateTicks");

    ticks.replaceChildren();

    for (let i = 0; i <= 10; i++) {
      const tick = document.createElement("span");

      tick.className =
        "ray-tick" +
        (i === 0 ? " origin" : "") +
        (selected === i ? " selected" : "");

      tick.textContent = String(i * unit);
      tick.setAttribute(
        "aria-label",
        `Поділка ${i}, координата ${i * unit}`
      );

      ticks.append(tick);
    }

    $("#rayBadge").textContent = `Крок = ${unit}`;

    $("#coordinateRay").setAttribute(
      "aria-label",
      `Координатний промінь з кроком ${unit}, числа від 0 до ${10 * unit}`
    );

    const point = $("#coordinatePoint");

    if (selected !== null) {
      point.hidden = false;
      point.style.left = `${selected * 10}%`;
      point.textContent = `A(${selected * unit})`;
    } else {
      point.hidden = true;
    }
  }

  function calculateCoordinate() {
    const unit = Number($("#unitInput").value);
    const tick = Number($("#tickInput").value);

    if (!Number.isInteger(tick) || tick < 1 || tick > 10) {
      setStatus("Введи номер поділки від 1 до 10.", "bad");
      $("#tickInput").focus();
      return false;
    }

    const value = unit * tick;

    renderRay(tick);

    $("#resultCaption").textContent =
      `Координата точки A: ${tick} × ${unit} =`;

    $("#modelResult").textContent = format(value);

    setStatus(
      `Правильно: ${tick} поділок × ${unit} одиниць = ${value}. Точка A має координату ${value}.`,
      "good"
    );

    return true;
  }

  function selectConcept(key) {
    if (!concepts[key]) return;

    state.concept = key;

    $$(".concept-card").forEach(b => {
      const active = b.dataset.concept === key;

      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });

    const c = concepts[key];

    $("#labTitle").textContent = c.title;
    $("#labDescription").textContent = c.description;

    const note = $("#conceptNote").lastElementChild;
    note.replaceChildren();

    const strong = document.createElement("strong");
    strong.textContent = "Пам’ятай: ";

    note.append(strong, document.createTextNode(c.note));

    setStatus(c.status);

    if (key === "origin") {
      $("#unitInput").value = "1";
      $("#tickInput").value = "1";
    } else if (key === "unit") {
      $("#unitInput").value = "2";
      $("#tickInput").value = "4";
    } else if (key === "coordinate") {
      $("#unitInput").value = "1";
      $("#tickInput").value = "6";
    } else {
      $("#unitInput").value = "1";
      $("#tickInput").value = "4";
    }

    calculateCoordinate();
  }

  function resetModel() {
    $("#unitInput").value = "1";
    $("#tickInput").value = "4";

    calculateCoordinate();

    setStatus(
      "Модель скинуто. Спробуй змінити крок і знайти нову координату."
    );
  }

  function chooseLevel(level) {
    if (!questions[level]) return;

    state.level = level;

    $$(".level-card").forEach(b => {
      const active = b.dataset.level === level;

      b.classList.toggle("is-selected", active);
      b.setAttribute("aria-pressed", String(active));
    });

    $("#quizLevelLabel").textContent = levelNames[level];

    startQuiz();
  }

  function startQuiz() {
    state.questionIndex = 0;
    state.correct = 0;
    state.answered = false;
    state.completed = false;
    state.claimed = false;

    $("#quizActive").hidden = false;
    $("#quizResult").hidden = true;

    $("#claimReward").disabled = false;
    $("#claimReward").textContent = "Отримати зірочки ✦";

    $("#rewardNote").textContent =
      "Зірочки нараховуються один раз за завершену спробу.";

    renderQuestion();
  }

  function renderQuestion() {
    const set = questions[state.level];
    const q = set[state.questionIndex];

    state.answered = false;

    $("#questionCounter").textContent =
      `Запитання ${state.questionIndex + 1} із ${set.length}`;

    $("#correctCounter").textContent = String(state.correct);

    $("#questionNumber").textContent =
      String(state.questionIndex + 1).padStart(2, "0");

    $("#questionText").textContent = q.q;

    const progress = Math.round(
      (state.questionIndex / set.length) * 100
    );

    $("#progressFill").style.width = `${progress}%`;

    $("#progressTrack").setAttribute(
      "aria-valuenow",
      String(progress)
    );

    const feedback = $("#feedbackBox");

    feedback.hidden = true;
    feedback.className = "feedback-box";

    $("#nextQuestion").disabled = true;

    $("#nextQuestion").textContent =
      state.questionIndex === set.length - 1
        ? "Побачити результат →"
        : "Наступне →";

    const list = $("#answerList");

    list.replaceChildren();

    q.a.forEach((answer, index) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "answer-option";

      button.setAttribute(
        "aria-label",
        `Варіант ${String.fromCharCode(65 + index)}: ${answer}`
      );

      const letter = document.createElement("span");
      letter.className = "answer-letter";
      letter.textContent = String.fromCharCode(65 + index);

      const text = document.createElement("span");
      text.textContent = answer;

      button.append(letter, text);

      button.addEventListener("click", () =>
        answerQuestion(index, button)
      );

      list.append(button);
    });
  }

  function answerQuestion(index, chosen) {
    if (state.answered || state.completed) return;

    state.answered = true;

    const q = questions[state.level][state.questionIndex];
    const correct = index === q.correct;

    if (correct) {
      state.correct++;
    }

    $$("#answerList button").forEach((button, i) => {
      button.disabled = true;

      if (i === q.correct) {
        button.classList.add("is-correct");
      }

      if (i === index && !correct) {
        button.classList.add("is-wrong");
      }
    });

    const feedback = $("#feedbackBox");

    feedback.hidden = false;
    feedback.className = `feedback-box ${correct ? "good" : "bad"}`;

    const heading = document.createElement("strong");

    heading.textContent = correct
      ? "Саме так! "
      : "Спробуй запам’ятати. ";

    feedback.replaceChildren(
      heading,
      document.createTextNode(q.why)
    );

    $("#correctCounter").textContent = String(state.correct);

    $("#nextQuestion").disabled = false;

    const progress = Math.round(
      ((state.questionIndex + 1) /
        questions[state.level].length) *
        100
    );

    $("#progressFill").style.width = `${progress}%`;

    $("#progressTrack").setAttribute(
      "aria-valuenow",
      String(progress)
    );
  }

  function showResult() {
    if (!state.answered || state.completed) return;

    state.completed = true;

    $("#quizActive").hidden = true;
    $("#quizResult").hidden = false;

    const total = questions[state.level].length;
    const pct = Math.round((state.correct / total) * 100);

    $("#finalCorrect").textContent = `${state.correct}/${total}`;
    $("#finalPercent").textContent = `${pct}%`;
    $("#earnedStars").textContent = `+${rewards[state.level]}`;

    $("#resultTitle").textContent =
      pct === 100
        ? "Безпомилково!"
        : pct >= 75
          ? "Чудова робота!"
          : pct >= 50
            ? "Добрий поступ!"
            : "Є куди зростати!";

    $("#resultMessage").textContent =
      pct >= 75
        ? "Ти добре орієнтуєшся на координатному промені. Продовжуй у тому ж дусі!"
        : "Переглянь шпаргалку та пояснення до відповідей, а тоді спробуй ще раз.";

    $("#claimReward").disabled = false;

    $("#rewardNote").textContent =
      "Зірочки нараховуються один раз за завершену спробу.";

    $("#quizResult").scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  function claimReward() {
    if (!state.completed || state.claimed) return;

    state.claimed = true;

    const reward = rewards[state.level];

    state.stars += reward;

    $("#starBalance").textContent =
      `${state.stars} зірочок`;

    $("#claimReward").disabled = true;
    $("#claimReward").textContent = "Зірочки отримано ✓";

    $("#rewardNote").textContent =
      `+${reward} зірочок додано до балансу цього уроку. Разом: ${state.stars}.`;
  }

  $$(".concept-card").forEach(b =>
    b.addEventListener("click", () =>
      selectConcept(b.dataset.concept)
    )
  );

  $$(".level-card").forEach(b =>
    b.addEventListener("click", () =>
      chooseLevel(b.dataset.level)
    )
  );

  $("#calculateCoordinate").addEventListener(
    "click",
    calculateCoordinate
  );

  $("#resetCalculation").addEventListener(
    "click",
    resetModel
  );

  $("#resetModel").addEventListener(
    "click",
    resetModel
  );

  $("#unitInput").addEventListener("change", () => {
    renderRay();

    setStatus(
      "Крок змінено. Натисни «Позначити точку», щоб обчислити координату."
    );
  });

  $("#tickInput").addEventListener("keydown", e => {
    if (e.key === "Enter") {
      calculateCoordinate();
    }
  });

  $$("[data-tick]").forEach(b =>
    b.addEventListener("click", () => {
      $("#tickInput").value = b.dataset.tick;
      calculateCoordinate();
    })
  );

  $("#nextQuestion").addEventListener("click", () => {
    if (!state.answered || state.completed) return;

    if (state.questionIndex < questions[state.level].length - 1) {
      state.questionIndex++;
      renderQuestion();
    } else {
      showResult();
    }
  });

  $("#claimReward").addEventListener("click", claimReward);

  $("#retryQuiz").addEventListener("click", startQuiz);

  renderRay();
  calculateCoordinate();
  selectConcept("ray");
  startQuiz();
})();
