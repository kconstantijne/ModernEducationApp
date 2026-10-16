
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const concepts = {
    point: {
      title: "Точка: познач місце на площині",
      description: "Точка показує точне місце. Вона не має довжини, ширини чи площі. У геометрії точки позначають великими латинськими літерами.",
      note: "Точка позначає місце, але не має вимірюваних розмірів.",
      status: "Точка не має кінців або довжини — це позначене місце."
    },
    line: {
      title: "Пряма: продовжується в обидва боки",
      description: "Пряма не має початку й кінця. На кресленні її частину показують лінією зі стрілками на обох кінцях.",
      note: "Через дві різні точки можна провести лише одну пряму.",
      status: "У прямої дві стрілки: вона нескінченно продовжується в обидва боки."
    },
    ray: {
      title: "Промінь: один початок і один напрям",
      description: "Промінь починається в певній точці та нескінченно продовжується в одному напрямі. Перша літера його назви позначає початок.",
      note: "Промінь AB починається в точці A та проходить через B.",
      status: "У променя одна початкова точка та стрілка лише з одного боку."
    },
    segment: {
      title: "Відрізок: частина прямої між кінцями",
      description: "Відрізок обмежений двома кінцевими точками. На відміну від прямої й променя, його довжину можна виміряти.",
      note: "Відрізок AB має кінці A і B та певну скінченну довжину.",
      status: "У відрізка два кінці й немає стрілок."
    }
  };

  const levelNames = {
    easy: "Простий рівень",
    medium: "Середній рівень",
    hard: "Складний рівень"
  };

  const rewardByLevel = { easy: 10, medium: 15, hard: 20 };

  const questions = {
    easy: [
      {
        q: "Що позначає геометрична точка?",
        a: ["Довжину предмета", "Точне місце", "Напрям руху", "Відстань між двома місцями"],
        correct: 1,
        why: "Точка позначає місце й не має довжини, ширини або товщини."
      },
      {
        q: "Скільки кінців має пряма?",
        a: ["Жодного", "Один", "Два", "Чотири"],
        correct: 0,
        why: "Пряма нескінченно продовжується в обидва боки, тому не має кінців."
      },
      {
        q: "Який об’єкт має початок, але нескінченно триває в одному напрямі?",
        a: ["Відрізок", "Кут", "Промінь", "Точка"],
        correct: 2,
        why: "Промінь має одну початкову точку й продовжується в одному напрямі без кінця."
      },
      {
        q: "Який геометричний об’єкт можна виміряти лінійкою?",
        a: ["Точку", "Пряму", "Промінь", "Відрізок"],
        correct: 3,
        why: "Відрізок має два кінці й скінченну довжину, яку можна виміряти."
      }
    ],

    medium: [
      {
        q: "Як позначають точки на геометричному рисунку?",
        a: ["Великими латинськими літерами", "Лише цифрами", "Малими грецькими літерами", "Лише словами українською"],
        correct: 0,
        why: "У шкільній геометрії точки зазвичай позначають великими латинськими літерами: A, B, C, M."
      },
      {
        q: "Що означає назва «промінь AB»?",
        a: ["Промінь починається в B", "A і B — кінці відрізка", "Промінь починається в A і проходить через B", "Пряма має кінці A та B"],
        correct: 2,
        why: "У назві променя перша літера позначає його початок, а друга — точку, через яку він проходить."
      },
      {
        q: "Який знак на рисунку показує, що пряма продовжується в обидва боки?",
        a: ["Дві точки без лінії", "Стрілки на обох кінцях лінії", "Коло навколо літери", "Одна стрілка та одна точка"],
        correct: 1,
        why: "Стрілки на обох кінцях умовно показують, що пряма не має кінців."
      },
      {
        q: "Скільки кінців має відрізок MN?",
        a: ["Один", "Жодного", "Три", "Два: M і N"],
        correct: 3,
        why: "Відрізок обмежений двома кінцевими точками, які в цьому випадку названі M та N."
      },
      {
        q: "Яке твердження про промінь правильне?",
        a: ["Він має початок і нескінченний кінець", "Він має два кінці", "Він не має початку", "Він завжди має довжину 1 см"],
        correct: 0,
        why: "Промінь має початкову точку, але не має кінця в напрямі продовження."
      },
      {
        q: "Які об’єкти можна провести через дві різні точки A і B?",
        a: ["Лише промінь AB", "Лише відрізок AB", "Пряму AB та відрізок AB; можна також задати промінь AB", "Жодного геометричного об’єкта"],
        correct: 2,
        why: "Дві різні точки визначають пряму й відрізок між ними; якщо обрати A початком, можна назвати промінь AB."
      }
    ],

    hard: [
      {
        q: "Точка A лежить ліворуч від точки B на одній прямій. Чим відрізняються промені AB і BA?",
        a: ["Нічим, це той самий промінь", "Вони мають різні початки й протилежні напрями", "Промінь AB має два кінці", "Промінь BA не має початку"],
        correct: 1,
        why: "Промінь AB починається в A, а BA — у B. Їхні початки різні, тому це різні промені."
      },
      {
        q: "Учень намалював лінію зі стрілкою лише праворуч і назвав її прямою. Що треба виправити?",
        a: ["Додати другу стрілку ліворуч", "Прибрати лінію", "Поставити три кінцеві точки", "Зробити лінію хвилястою"],
        correct: 0,
        why: "Пряму позначають стрілками з обох боків. Одна стрілка й початкова точка відповідають зображенню променя."
      },
      {
        q: "Яке твердження завжди правильне для відрізка AB?",
        a: ["Він нескінченний", "Він має одну початкову точку й стрілку", "Він має кінці A та B і скінченну довжину", "Він не містить точок"],
        correct: 2,
        why: "Відрізок обмежений двома кінцями та складається з точок між ними разом із кінцями."
      },
      {
        q: "Точка C лежить між A і B на одному відрізку. Яка рівність довжин правильна?",
        a: ["AC = AB + CB", "AB = AC + CB", "CB = AB + AC", "AB = AC − CB завжди"],
        correct: 1,
        why: "Якщо C лежить між A та B, то весь відрізок AB складається з частин AC і CB: AB = AC + CB."
      },
      {
        q: "Скільки прямих можна провести через дві різні точки?",
        a: ["Одну", "Дві", "Безліч", "Жодної"],
        correct: 0,
        why: "Через будь-які дві різні точки проходить рівно одна пряма."
      },
      {
        q: "На рисунку позначено точку M, від якої лінія йде праворуч зі стрілкою. Як називається об’єкт?",
        a: ["Відрізок", "Пряма", "Кут", "Промінь із початком M"],
        correct: 3,
        why: "Позначена точка є початком, а стрілка показує нескінченне продовження в одному напрямі."
      },
      {
        q: "Яке порівняння правильне?",
        a: ["Пряма має два кінці, а відрізок — жодного", "Промінь і відрізок завжди однакові", "Відрізок має скінченну довжину, а пряма нескінченна", "Точка — це дуже короткий відрізок"],
        correct: 2,
        why: "Відрізок має два кінці та вимірювану довжину. Пряма нескінченно продовжується в обидва боки."
      },
      {
        q: "На одній прямій лежать точки A, B і C, причому B між A та C. Якщо AB = 4 см, BC = 3 см, то AC дорівнює…",
        a: ["1 см", "7 см", "12 см", "4 см"],
        correct: 1,
        why: "Оскільки B лежить між A і C, AC = AB + BC = 4 + 3 = 7 см."
      }
    ]
  };

  const state = {
    concept: "point",
    level: "easy",
    questionIndex: 0,
    correct: 0,
    answered: false,
    completed: false,
    claimed: false,
    stars: 0
  };

  function setStatus(message, kind = "neutral") {
    const status = $("#modelStatus");
    status.replaceChildren();

    const dot = document.createElement("span");
    dot.className = "status-dot";

    if (kind === "good") dot.style.background = "var(--green, #36a879)";
    if (kind === "bad") dot.style.background = "var(--red, #d85b6a)";

    const text = document.createElement("span");
    text.textContent = message;
    status.append(dot, text);
  }

  function renderConstruction(message = "Побудову оновлено. Досліди кількість кінців і напрям.") {
    const type = $("#objectType").value;
    const pct = Number($("#positionInput").value);
    const angle = Number($("#directionInput").value);
    const label = $("#labelType").value;

    $("#positionOutput").textContent = `${pct}%`;
    $("#directionOutput").textContent = `${angle}°`;

    const badge = {
      point: `Точка ${label}`,
      line: `Пряма ${label}B`,
      ray: `Промінь ${label}B`,
      segment: `Відрізок ${label}B`
    };

    $("#objectBadge").textContent = badge[type];

    const drawing = $("#constructionDrawing");
    drawing.replaceChildren();

    const ns = "http://www.w3.org/2000/svg";

    const make = (tag, attrs, content) => {
      const el = document.createElementNS(ns, tag);

      Object.entries(attrs || {}).forEach(([k, v]) => {
        el.setAttribute(k, String(v));
      });

      if (content !== undefined) el.textContent = content;
      return el;
    };

    const x = 55 + (pct - 15) / 60 * 150;
    const y = 120;
    const radians = angle * Math.PI / 180;
    const dx = Math.cos(radians);
    const dy = Math.sin(radians);

    const A = { x, y };
    const left = { x: x - 105 * dx, y: y - 105 * dy };
    const right = { x: x + 125 * dx, y: y + 125 * dy };

    const lineAttrs = {
      class: type === "ray" ? "geom-ray" : "geom-line",
      fill: "none"
    };

    if (type === "line") {
      drawing.append(make("line", {
        ...lineAttrs,
        x1: left.x,
        y1: left.y,
        x2: right.x,
        y2: right.y,
        "marker-start": "url(#arrowStart)",
        "marker-end": "url(#arrowEnd)"
      }));

      drawing.append(make("circle", {
        class: "geom-point",
        cx: A.x,
        cy: A.y,
        r: 5
      }));

      drawing.append(make("text", {
        class: "geom-label",
        x: A.x + 10,
        y: A.y - 12
      }, label));

      drawing.append(make("text", {
        x: left.x + 5,
        y: left.y - 10
      }, "←"));

      drawing.append(make("text", {
        x: right.x - 10,
        y: right.y - 10
      }, "→"));

    } else if (type === "ray") {
      drawing.append(make("line", {
        ...lineAttrs,
        x1: A.x,
        y1: A.y,
        x2: right.x,
        y2: right.y,
        "marker-end": "url(#arrowEnd)"
      }));

      drawing.append(make("circle", {
        class: "geom-point",
        cx: A.x,
        cy: A.y,
        r: 6
      }));

      drawing.append(make("text", {
        class: "geom-label",
        x: A.x - 15,
        y: A.y - 12
      }, label));

      drawing.append(make("text", {
        x: right.x - 8,
        y: right.y - 10
      }, "→"));

      drawing.append(make("circle", {
        cx: x + 48 * dx,
        cy: y + 48 * dy,
        r: 4,
        fill: "#f2b944"
      }));

      drawing.append(make("text", {
        class: "geom-label",
        x: x + 48 * dx + 7,
        y: y + 48 * dy - 7
      }, "B"));

    } else if (type === "segment") {
      const p1 = { x: x - 90 * dx, y: y - 90 * dy };
      const p2 = { x: x + 90 * dx, y: y + 90 * dy };

      drawing.append(make("line", {
        ...lineAttrs,
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y
      }));

      drawing.append(make("circle", {
        class: "geom-point",
        cx: p1.x,
        cy: p1.y,
        r: 6
      }));

      drawing.append(make("circle", {
        class: "geom-point",
        cx: p2.x,
        cy: p2.y,
        r: 6
      }));

      drawing.append(make("text", {
        class: "geom-label",
        x: p1.x - 14,
        y: p1.y - 12
      }, label));

      drawing.append(make("text", {
        class: "geom-label",
        x: p2.x + 7,
        y: p2.y - 10
      }, "B"));

    } else {
      drawing.append(make("circle", {
        class: "geom-point",
        cx: A.x,
        cy: A.y,
        r: 7
      }));

      drawing.append(make("text", {
        class: "geom-label",
        x: A.x + 12,
        y: A.y - 12
      }, label));

      drawing.append(make("text", {
        x: A.x + 13,
        y: A.y + 23
      }, "точка на площині"));
    }

    $("#constructionSvg").setAttribute(
      "aria-label",
      badge[type] + (
        type === "point"
          ? ", позначене місце на площині"
          : type === "line"
            ? ", стрілки з обох кінців"
            : type === "ray"
              ? ", одна початкова точка та стрілка"
              : ", два кінці без стрілок"
      )
    );

    setStatus(message);
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

    note.append(strong, document.createTextNode(concepts[key].note));

    $("#objectType").value = key;
    renderConstruction(concepts[key].status);
  }

  function resetModel() {
    $("#objectType").value = "point";
    $("#positionInput").value = "30";
    $("#directionInput").value = "0";
    $("#labelType").value = "A";

    renderConstruction("Модель скинуто. Обери об’єкт і досліджуй його властивості.");
  }

  function checkConstruction() {
    const type = $("#objectType").value;

    const messages = {
      point: "Правильно: точка позначає місце й не має розмірів.",
      line: "Правильно: пряма нескінченно продовжується в обидва боки — тому має дві стрілки.",
      ray: "Правильно: промінь має одну початкову точку та продовжується в одному напрямі.",
      segment: "Правильно: відрізок має два кінці, а його довжину можна виміряти."
    };

    setStatus(messages[type], "good");
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
    $("#rewardNote").textContent = "Зірочки нараховуються один раз за завершену спробу.";
    $("#claimReward").disabled = false;

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

    $("#progressFill").style.width =
      `${((state.questionIndex + 1) / set.length) * 100}%`;

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
      button.addEventListener("click", () => selectAnswer(index));
      list.append(button);
    });
  }

  function selectAnswer(index) {
    if (state.answered) return;

    const question = questions[state.level][state.questionIndex];

    if (index < 0 || index >= question.a.length) return;

    state.answered = true;

    const buttons = $$(".answer-option");

    buttons.forEach((button, i) => {
      button.disabled = true;

      if (i === question.correct) {
        button.classList.add("is-correct");
      }

      if (i === index && index !== question.correct) {
        button.classList.add("is-wrong");
      }
    });

    const isCorrect = index === question.correct;

    if (isCorrect) state.correct++;

    $("#correctCounter").textContent = String(state.correct);

    const feedback = $("#feedbackBox");
    feedback.hidden = false;
    feedback.className = `feedback-box ${isCorrect ? "good" : "bad"}`;

    const title = document.createElement("strong");
    title.textContent = isCorrect ? "Правильно! " : "Розберімося. ";

    feedback.replaceChildren(title, document.createTextNode(question.why));

    $("#nextQuestion").disabled = false;
  }

  function showResult() {
    state.completed = true;

    $("#quizActive").hidden = true;
    $("#quizResult").hidden = false;

    const total = questions[state.level].length;
    const percent = Math.round(state.correct / total * 100);

    $("#finalCorrect").textContent = `${state.correct}/${total}`;
    $("#finalPercent").textContent = `${percent}%`;
    $("#earnedStars").textContent = `+${rewardByLevel[state.level]}`;

    if (percent === 100) {
      $("#resultTitle").textContent = "Безпомилково! ⭐";
      $("#resultMessage").textContent =
        "Ти чудово розрізняєш точку, пряму, промінь і відрізок та знаєш їхні властивості.";
    } else if (percent >= 70) {
      $("#resultTitle").textContent = "Чудова робота!";
      $("#resultMessage").textContent =
        "Ти добре засвоїв матеріал. Переглянь пояснення й закріпи результат.";
    } else if (percent >= 40) {
      $("#resultTitle").textContent = "Гарний початок!";
      $("#resultMessage").textContent =
        "Повтори, скільки кінців має кожен об’єкт, і спробуй ще раз.";
    } else {
      $("#resultTitle").textContent = "Час потренуватися!";
      $("#resultMessage").textContent =
        "Повернися до карток понять і шпаргалки. Кожна спроба допомагає навчитися.";
    }

    $("#claimReward").disabled = false;
    $("#claimReward").textContent = "Отримати зірочки ✦";
    $("#rewardNote").textContent = "Зірочки нараховуються один раз за завершену спробу.";
  }

  function claimReward() {
    if (!state.completed || state.claimed) return;

    state.claimed = true;

    const reward = rewardByLevel[state.level];
    state.stars += reward;

    $("#starBalance").textContent = String(state.stars);
    $("#claimReward").disabled = true;
    $("#claimReward").textContent = "Зірочки отримано ✓";
    $("#rewardNote").textContent =
      `+${reward} зірочок додано до балансу цього уроку.`;
  }

  // Картки геометричних понять
  $$(".concept-card").forEach(button => {
    button.addEventListener("click", () => {
      selectConcept(button.dataset.concept);
    });
  });

  // Зміна типу геометричного об'єкта
  $("#objectType").addEventListener("change", () => {
    const type = $("#objectType").value;

    if (concepts[type]) {
      selectConcept(type);
    } else {
      renderConstruction();
    }
  });

  // Інтерактивні параметри побудови
  ["#positionInput", "#directionInput", "#labelType"].forEach(selector => {
    $(selector).addEventListener("input", () => renderConstruction());
  });

  $("#checkConstruction").addEventListener("click", checkConstruction);
  $("#resetConstruction").addEventListener("click", resetModel);
  $("#resetModel").addEventListener("click", resetModel);

  // Вибір рівня складності
  $$(".level-card").forEach(button => {
    button.addEventListener("click", () => {
      chooseLevel(button.dataset.level);
    });
  });

  // Перехід між запитаннями
  $("#nextQuestion").addEventListener("click", () => {
    if (!state.answered) return;

    if (state.questionIndex < questions[state.level].length - 1) {
      state.questionIndex++;
      renderQuestion();
    } else {
      showResult();
    }
  });

  // Нагороди та повторна спроба
  $("#claimReward").addEventListener("click", claimReward);
  $("#retryQuiz").addEventListener("click", startQuiz);

  // Початковий стан уроку
  renderConstruction();
  selectConcept("point");
  startQuiz();
})();
