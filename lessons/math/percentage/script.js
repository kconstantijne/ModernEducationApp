
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const concepts = {
    percent: {
      title: "Відсоток — одна сота частина",
      description: "Слово «відсоток» означає «одна сота». 1% — це 1/100 цілого, а 100% — уся величина. Знак відсотка — %.",
      note: "Щоб перетворити відсоток на дріб зі знаменником 100, запиши число відсотків у чисельник: 35% = 35/100.",
      status: "Досліди, як змінюється зафарбована частина, коли змінюється відсоток."
    },
    whole: {
      title: "Ціле — це 100%",
      description: "Коли ми розглядаємо всю величину, вона становить 100%. Частина від цілого завжди порівнюється з усією величиною.",
      note: "100% від числа дорівнює самому числу: 100% від 48 — це 48.",
      status: "Порівняй ціле число та його частини у візуальній моделі."
    },
    part: {
      title: "Знаходимо частину від цілого",
      description: "Щоб знайти певний відсоток від числа, поділи число на 100, а результат помнож на кількість відсотків.",
      note: "Наприклад, 20% від 60: 60 ÷ 100 × 20 = 12.",
      status: "Зміни ціле число й відсоток, а потім обчисли частину."
    },
    fraction: {
      title: "Дріб і відсоток",
      description: "Відсотки пов’язані зі звичайними дробами: 50% = 1/2, 25% = 1/4, 75% = 3/4, 10% = 1/10.",
      note: "Для зручних дробів можна швидко знайти частину: 25% від 80 — це чверть, тобто 80 ÷ 4 = 20.",
      status: "Обери 25%, 50% або 75% і простеж, яку частину смуги буде зафарбовано."
    }
  };

  const levelNames = {
    easy: "Простий рівень",
    medium: "Середній рівень",
    hard: "Складний рівень"
  };

  const rewardByLevel = {
    easy: 10,
    medium: 15,
    hard: 20
  };

  const questions = {
    easy: [
      {
        q: "Що означає 1%?",
        a: [
          "Одну десяту частину",
          "Одну соту частину",
          "Одну половину",
          "Усе ціле"
        ],
        correct: 1,
        why: "Відсоток — це одна сота частина цілого. Тому 1% = 1/100."
      },
      {
        q: "Скільки відсотків становить усе ціле?",
        a: [
          "10%",
          "50%",
          "100%",
          "1000%"
        ],
        correct: 2,
        why: "Уся величина, взята повністю, дорівнює 100%."
      },
      {
        q: "Який знак використовують для позначення відсотків?",
        a: [
          "%",
          "#",
          "÷",
          "‰"
        ],
        correct: 0,
        why: "Відсотки позначають знаком %. Наприклад, 25% читають «двадцять п’ять відсотків»."
      },
      {
        q: "Яка частина цілого дорівнює 50%?",
        a: [
          "Усе ціле",
          "Чверть",
          "Одна десята",
          "Половина"
        ],
        correct: 3,
        why: "50% = 50/100 = 1/2, тобто половина цілого."
      }
    ],

    medium: [
      {
        q: "Знайди 10% від 70.",
        a: ["7", "10", "17", "60"],
        correct: 0,
        why: "10% — це одна десята частина. 70 ÷ 10 = 7."
      },
      {
        q: "Знайди 25% від 80.",
        a: ["40", "25", "20", "60"],
        correct: 2,
        why: "25% — це чверть цілого. 80 ÷ 4 = 20."
      },
      {
        q: "У класі 20 учнів. 50% учнів прийшли на гурток. Скільки це учнів?",
        a: ["5", "10", "15", "20"],
        correct: 1,
        why: "50% — це половина. Половина від 20 дорівнює 20 ÷ 2 = 10 учнів."
      },
      {
        q: "Який запис правильно показує, як знайти 30% від 90?",
        a: [
          "90 + 30",
          "90 ÷ 30",
          "90 × 100 ÷ 30",
          "90 ÷ 100 × 30"
        ],
        correct: 3,
        why: "Щоб знайти відсоток від числа, поділи число на 100 і помнож на число відсотків: 90 ÷ 100 × 30 = 27."
      },
      {
        q: "У коробці 40 олівців. 25% — сині. Скільки синіх олівців?",
        a: ["10", "15", "20", "25"],
        correct: 0,
        why: "25% — це чверть. 40 ÷ 4 = 10 синіх олівців."
      },
      {
        q: "Чому дорівнює 100% від 36?",
        a: ["3,6", "18", "36", "100"],
        correct: 2,
        why: "100% — це все число, тому 100% від 36 дорівнює 36."
      }
    ],

    hard: [
      {
        q: "У бібліотеці 120 книжок. 15% з них — казки. Скільки казок у бібліотеці?",
        a: ["12", "18", "20", "30"],
        correct: 1,
        why: "Знаходимо 15% від 120: 120 ÷ 100 × 15 = 1,2 × 15 = 18 книжок."
      },
      {
        q: "У команді 8 дітей, і 6 з них забили гол. Який відсоток дітей забив гол?",
        a: ["25%", "60%", "70%", "75%"],
        correct: 3,
        why: "Частина становить 6 із 8: 6 ÷ 8 = 0,75. 0,75 × 100% = 75%."
      },
      {
        q: "У магазині було 200 зошитів. Продали 25%. Скільки зошитів залишилося?",
        a: ["50", "100", "150", "175"],
        correct: 2,
        why: "25% від 200 — це 50 зошитів. Залишилося 200 − 50 = 150 зошитів."
      },
      {
        q: "12 сторінок — це 20% книжки. Скільки сторінок у книжці?",
        a: ["60", "48", "24", "240"],
        correct: 0,
        why: "Якщо 20% становить 12 сторінок, то 1% = 12 ÷ 20 = 0,6 сторінки, а 100% = 0,6 × 100 = 60 сторінок."
      },
      {
        q: "Учень обчислив 30% від 50 так: 50 ÷ 30 × 100 = 166,6… Що він зробив неправильно?",
        a: [
          "Відсотки не можна обчислювати",
          "Треба додати 30 до 50",
          "Він поміняв порядок обчислення: число треба поділити на 100 і помножити на 30",
          "Правильна відповідь саме така"
        ],
        correct: 2,
        why: "Для знаходження 30% від 50 обчислюємо 50 ÷ 100 × 30 = 15. Запис учня відповідає іншому типу дій і тут не підходить."
      },
      {
        q: "У саду 40 дерев, з них 10 яблунь. Який відсоток дерев становлять яблуні?",
        a: ["10%", "25%", "40%", "75%"],
        correct: 1,
        why: "Знаходимо частку: 10 ÷ 40 = 0,25. Помноживши на 100%, дістаємо 25%."
      },
      {
        q: "Квиток коштував 80 грн. Знижка становить 10%. Яка ціна після знижки?",
        a: ["8 грн", "70 грн", "78 грн", "72 грн"],
        correct: 3,
        why: "10% від 80 грн — це 8 грн. Після знижки: 80 − 8 = 72 грн."
      },
      {
        q: "У баку 60 л води. Використали 40% усієї води. Скільки літрів залишилося?",
        a: ["24 л", "36 л", "40 л", "20 л"],
        correct: 1,
        why: "40% від 60 л = 24 л використали. Залишилося 60 − 24 = 36 л, тобто 60% від початкової кількості."
      }
    ]
  };

  const state = {
    concept: "percent",
    level: "easy",
    questionIndex: 0,
    correct: 0,
    answered: false,
    completed: false,
    claimed: false,
    stars: 0,
    lastCalculation: null
  };

  const numberFormat = new Intl.NumberFormat("uk-UA", {
    maximumFractionDigits: 2
  });

  const formatNumber = value => numberFormat.format(Number(value));

  function setStatus(message, kind = "neutral") {
    const status = $("#modelStatus");
    status.replaceChildren();

    const dot = document.createElement("span");
    dot.className = "status-dot";

    if (kind === "good") {
      dot.style.background = "var(--green, #36a879)";
    }

    if (kind === "bad") {
      dot.style.background = "var(--red, #d85b6a)";
    }

    const text = document.createElement("span");
    text.textContent = message;

    status.append(dot, text);
  }

  function renderBar(percent, whole, result, mode) {
    const safePercent = Math.max(0, Math.min(100, percent));

    $("#percentBarFill").style.width = `${safePercent}%`;
    $("#highlightPercent").textContent = `${formatNumber(safePercent)}%`;
    $("#barBadge").textContent = `${formatNumber(safePercent)}% від цілого`;
    $("#modelResult").textContent = formatNumber(result);

    $("#resultCaption").textContent = mode === "part"
      ? `${formatNumber(percent)}% від ${formatNumber(whole)} дорівнює`
      : `${formatNumber(result)}% від цілого ${formatNumber(whole)}`;

    $("#percentBar").setAttribute(
      "aria-label",
      `Зафарбовано ${formatNumber(safePercent)} відсотків від цілого`
    );
  }

  function calculate({ quiet = false } = {}) {
    const mode = $("#calculationMode").value;
    const whole = Number($("#wholeInput").value);
    const amount = Number($("#percentInput").value);

    if (!Number.isFinite(whole) || whole <= 0 || whole > 10000) {
      setStatus(
        "Введи ціле число від 1 до 10 000 для всієї величини.",
        "bad"
      );
      $("#wholeInput").focus();
      return false;
    }

    if (!Number.isFinite(amount) || amount < 0) {
      setStatus(
        "Введи невід’ємне число для відсотка або частини.",
        "bad"
      );
      $("#percentInput").focus();
      return false;
    }

    let percent;
    let result;

    if (mode === "part") {
      if (amount > 100) {
        setStatus(
          "Кількість відсотків має бути від 0 до 100.",
          "bad"
        );
        $("#percentInput").focus();
        return false;
      }

      percent = amount;
      result = whole / 100 * amount;
    } else {
      if (amount > whole) {
        setStatus(
          "Частина не може бути більшою за ціле в цій моделі. Перевір значення.",
          "bad"
        );
        $("#percentInput").focus();
        return false;
      }

      result = amount / whole * 100;
      percent = result;
    }

    state.lastCalculation = {
      mode,
      whole,
      amount,
      percent,
      result
    };

    renderBar(percent, whole, result, mode);

    if (mode === "part") {
      setStatus(
        `${formatNumber(amount)}% від ${formatNumber(whole)} = ` +
        `${formatNumber(whole)} ÷ 100 × ${formatNumber(amount)} = ` +
        `${formatNumber(result)}.`,
        "good"
      );
    } else {
      setStatus(
        `${formatNumber(amount)} із ${formatNumber(whole)} становить ` +
        `${formatNumber(result)}%: ${formatNumber(amount)} ÷ ` +
        `${formatNumber(whole)} × 100%.`,
        "good"
      );
    }

    if (!quiet) {
      $("#modelResult").animate?.(
        [
          { transform: "scale(.94)", opacity: .65 },
          { transform: "scale(1)", opacity: 1 }
        ],
        { duration: 220, easing: "ease-out" }
      );
    }

    return true;
  }

  function updateMode() {
    const mode = $("#calculationMode").value;

    if (mode === "part") {
      $("#wholeLabel").textContent = "Усе число (100%)";
      $("#percentLabel").textContent = "Відсоток (%)";
      $("#percentInput").max = "100";
      $("#percentInput").value = "25";
      $("#resultCaption").textContent = "25% від 80 дорівнює";
      $("#percentInput").setAttribute(
        "aria-label",
        "Відсоток від цілого числа"
      );
    } else {
      $("#wholeLabel").textContent = "Уся величина (ціле)";
      $("#percentLabel").textContent = "Частина від цілого";
      $("#percentInput").max = "10000";
      $("#percentInput").value = "20";
      $("#resultCaption").textContent = "20 із 80 становить";
      $("#percentInput").setAttribute(
        "aria-label",
        "Частина від цілого числа"
      );
    }

    calculate({ quiet: true });
  }

  function selectConcept(key) {
    if (!concepts[key]) return;

    state.concept = key;

    $$(".concept-card").forEach(button => {
      const active = button.dataset.concept === key;

      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    $("#labTitle").textContent = concepts[key].title;
    $("#labDescription").textContent = concepts[key].description;

    const note = $("#conceptNote").lastElementChild;
    note.replaceChildren();

    const strong = document.createElement("strong");
    strong.textContent = "Пам’ятай: ";

    note.append(
      strong,
      document.createTextNode(concepts[key].note)
    );

    setStatus(concepts[key].status);

    if (key === "whole") {
      $("#calculationMode").value = "part";
      $("#wholeInput").value = "100";
      $("#percentInput").value = "100";

      updateMode();

      $("#wholeInput").value = "100";
      $("#percentInput").value = "100";

      calculate({ quiet: true });
    } else if (key === "part") {
      $("#calculationMode").value = "part";
      $("#wholeInput").value = "60";
      $("#percentInput").value = "20";

      updateMode();

      $("#wholeInput").value = "60";
      $("#percentInput").value = "20";

      calculate({ quiet: true });
    } else if (key === "fraction") {
      $("#calculationMode").value = "part";
      $("#wholeInput").value = "80";
      $("#percentInput").value = "25";

      updateMode();

      $("#wholeInput").value = "80";
      $("#percentInput").value = "25";

      calculate({ quiet: true });
    } else {
      $("#calculationMode").value = "part";
      $("#wholeInput").value = "80";
      $("#percentInput").value = "1";

      updateMode();

      $("#wholeInput").value = "80";
      $("#percentInput").value = "1";

      calculate({ quiet: true });
    }
  }

  function resetModel() {
    $("#calculationMode").value = "part";
    $("#wholeInput").value = "80";
    $("#percentInput").value = "25";

    updateMode();

    $("#wholeInput").value = "80";
    $("#percentInput").value = "25";

    calculate({ quiet: true });

    setStatus(
      "Модель скинуто. Спробуй знайти інший відсоток від числа."
    );
  }

  function chooseLevel(level) {
    if (!questions[level]) return;

    state.level = level;

    $$(".level-card").forEach(button => {
      const active = button.dataset.level === level;

      button.classList.toggle("is-selected", active);
      button.setAttribute("aria-pressed", String(active));
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

    $("#rewardNote").textContent =
      "Зірочки нараховуються один раз за завершену спробу.";

    renderQuestion();
  }

  function renderQuestion() {
    const set = questions[state.level];
    const question = set[state.questionIndex];

    state.answered = false;

    $("#questionCounter").textContent =
      `Запитання ${state.questionIndex + 1} із ${set.length}`;

    $("#correctCounter").textContent = String(state.correct);

    $("#questionNumber").textContent =
      String(state.questionIndex + 1).padStart(2, "0");

    $("#questionText").textContent = question.q;

    const progress = Math.round(
      ((state.questionIndex + 1) / set.length) * 100
    );

    $("#progressFill").style.width = `${progress}%`;
    $("#progressTrack").setAttribute("aria-valuenow", String(progress));

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

    question.a.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-option";

      const letter = document.createElement("span");
      letter.className = "answer-letter";
      letter.textContent = String.fromCharCode(65 + index);

      const text = document.createElement("span");
      text.textContent = answer;

      button.append(letter, text);

      button.addEventListener("click", () => {
        selectAnswer(index);
      });

      list.append(button);
    });
  }

  function selectAnswer(index) {
    if (state.answered || state.completed) return;

    const question = questions[state.level][state.questionIndex];

    if (
      !Number.isInteger(index) ||
      index < 0 ||
      index >= question.a.length
    ) {
      return;
    }

    state.answered = true;

    $$(".answer-option").forEach((button, i) => {
      button.disabled = true;

      if (i === question.correct) {
        button.classList.add("is-correct");
      }

      if (i === index && index !== question.correct) {
        button.classList.add("is-wrong");
      }
    });

    const isCorrect = index === question.correct;

    if (isCorrect) {
      state.correct++;
    }

    $("#correctCounter").textContent = String(state.correct);

    const feedback = $("#feedbackBox");
    feedback.hidden = false;
    feedback.className = `feedback-box ${isCorrect ? "good" : "bad"}`;

    const title = document.createElement("strong");
    title.textContent = isCorrect ? "Правильно! " : "Пояснення: ";

    feedback.replaceChildren(
      title,
      document.createTextNode(question.why)
    );

    $("#nextQuestion").disabled = false;
  }

  function showResult() {
    state.completed = true;

    $("#quizActive").hidden = true;
    $("#quizResult").hidden = false;

    const total = questions[state.level].length;
    const percent = Math.round((state.correct / total) * 100);
$("#finalCorrect").textContent = `${state.correct}/${total}`;
    $("#finalPercent").textContent = `${percent}%`;
    $("#earnedStars").textContent = `+${rewardByLevel[state.level]}`;

    if (percent === 100) {
      $("#resultTitle").textContent = "Безпомилково! ⭐";
      $("#resultMessage").textContent =
        "Ти чудово розумієш відсотки та вмієш застосовувати їх у задачах.";
    } else if (percent >= 70) {
      $("#resultTitle").textContent = "Чудова робота!";
      $("#resultMessage").textContent =
        "Ти добре засвоїв матеріал. Переглянь пояснення до помилок і закріпи результат.";
    } else if (percent >= 40) {
      $("#resultTitle").textContent = "Гарний початок!";
      $("#resultMessage").textContent =
        "Повтори шпаргалку про 1%, 25%, 50% і спосіб знаходження частини від числа.";
    } else {
      $("#resultTitle").textContent = "Час потренуватися!";
      $("#resultMessage").textContent =
        "Повернися до карток понять та інтерактивної моделі. Крок за кроком усе вийде.";
    }

    $("#claimReward").disabled = false;
    $("#claimReward").textContent = "Отримати зірочки ✦";

    $("#rewardNote").textContent =
      "Зірочки нараховуються один раз за завершену спробу.";
  
    // Єдине нарахування комп’юшок: результат обробляється після відображення підсумку.
    Promise.resolve().then(async () => {
      const scorePercent = typeof percent !== 'undefined' ? percent : (typeof pct !== 'undefined' ? pct : 0);
      const rewardResult = await window.LearningGamification?.awardTestResult("percentage", scorePercent, state.level);
      const claimButton = document.getElementById('claimReward');
      if (claimButton) claimButton.hidden = true;
      const starLabel = document.getElementById('earnedStars');
      if (starLabel) starLabel.textContent = rewardResult?.passed ? `🪙 ${rewardResult.coinsAwarded} комп’юшок` : 'Потрібно 70% для винагороди';
      const note = document.getElementById('rewardNote');
      if (note) note.textContent = rewardResult?.message || 'Комп’юшки нараховуються автоматично після тесту.';
    });
}
function claimReward() {
    if (!state.completed || state.claimed) return;

    state.claimed = true;

    const reward = rewardByLevel[state.level];
    state.stars += reward;

    $("#claimReward").disabled = true;
    $("#claimReward").textContent = "Зірочки отримано ✓";

    $("#rewardNote").textContent =
      `+${reward} зірочок додано до балансу цього уроку. Разом: ${state.stars}.`;
  }

  // Картки понять
  $$(".concept-card").forEach(button => {
    button.addEventListener("click", () => {
      selectConcept(button.dataset.concept);
    });
  });

  // Вибір рівня складності
  $$(".level-card").forEach(button => {
    button.addEventListener("click", () => {
      chooseLevel(button.dataset.level);
    });
  });

  // Інтерактивна модель відсотків
  $("#calculationMode").addEventListener("change", updateMode);

  $("#calculatePercent").addEventListener("click", () => {
    calculate();
  });

  $("#resetCalculation").addEventListener("click", resetModel);
  $("#resetModel").addEventListener("click", resetModel);

  $("#wholeInput").addEventListener("keydown", event => {
    if (event.key === "Enter") calculate();
  });

  $("#percentInput").addEventListener("keydown", event => {
    if (event.key === "Enter") calculate();
  });

  $$("[data-preset]").forEach(button => {
    button.addEventListener("click", () => {
      $("#calculationMode").value = "part";

      updateMode();

      $("#percentInput").value = button.dataset.preset;

      calculate();
    });
  });

  // Перехід між тестовими запитаннями
  $("#nextQuestion").addEventListener("click", () => {
    if (!state.answered || state.completed) return;

    if (state.questionIndex < questions[state.level].length - 1) {
      state.questionIndex++;
      renderQuestion();
    } else {
      showResult();
    }
  });

  // Винагорода та повторна спроба
  $("#claimReward").addEventListener("click", claimReward);
  $("#retryQuiz").addEventListener("click", startQuiz);

  // Початковий стан моделі й тесту
  calculate({ quiet: true });
  selectConcept("percent");
  startQuiz();
})();
