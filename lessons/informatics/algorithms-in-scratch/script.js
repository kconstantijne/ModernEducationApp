(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const concepts = {
    algorithm: {
      title: "Алгоритм: крок за кроком",
      description: "Алгоритм — це скінченна послідовність зрозумілих команд, яка допомагає досягти результату.",
      note: "Порядок команд має значення. Якщо поміняти команди місцями, результат може змінитися.",
      status: "Додай команди та запусти програму."
    },
    executor: {
      title: "Виконавець і його команди",
      description: "Виконавець — це той, хто виконує алгоритм. Він має розуміти команди й уміти їх виконувати.",
      note: "Виконавець діє за командами алгоритму, а не вгадує, що мав на увазі автор.",
      status: "Спробуй дати виконавцю точні команди руху."
    },
    command: {
      title: "Команда: одна конкретна дія",
      description: "Команда повідомляє виконавцю, яку дію потрібно виконати. Зрозумілі команди допомагають уникнути помилок.",
      note: "Команди мають бути точними: «перейди на одну клітинку праворуч» зрозуміліше, ніж «рухайся туди».",
      status: "Склади точну послідовність команд."
    },
    scratch: {
      title: "Алгоритми у Scratch",
      description: "У Scratch програма складається з кольорових блоків. З'єднані блоки утворюють послідовність дій для спрайта.",
      note: "Зазвичай виконання стартує з подієвого блока, наприклад «коли натиснуто зелений прапорець».",
      status: "Побудуй програму, як із блоків Scratch."
    }
  };

  const levelNames = { easy: "Простий рівень", medium: "Середній рівень", hard: "Складний рівень" };
  const rewardByLevel = { easy: 10, medium: 15, hard: 20 };
  const questions = {
    easy: [
      { q: "Що таке алгоритм?", a: ["Послідовність команд для досягнення мети", "Будь-який малюнок на екрані", "Назва комп’ютерної миші", "Випадковий набір символів"], correct: 0, why: "Алгоритм — це впорядкована послідовність зрозумілих команд, що приводить до результату." },
      { q: "Хто або що може бути виконавцем алгоритму?", a: ["Лише людина", "Людина, робот або комп’ютерна програма", "Тільки клавіатура", "Лише автор підручника"], correct: 1, why: "Виконавцем може бути людина, пристрій або програма, які здатні виконати задані команди." },
      { q: "Що в Scratch називають спрайтом?", a: ["Файл із паролем", "Кольоровий блок", "Об’єкт або персонаж, яким можна керувати", "Назву папки"], correct: 2, why: "Спрайт — це об’єкт на сцені Scratch, наприклад кіт, якому можна задати програму." },
      { q: "Що може статися, якщо поміняти команди алгоритму місцями?", a: ["Нічого ніколи не зміниться", "Комп’ютер завжди вимкнеться", "Команди зникнуть", "Результат може змінитися"], correct: 3, why: "Послідовність важлива: спочатку виконана дія може впливати на наступні дії." }
    ],
    medium: [
      { q: "Яка послідовність найкраще описує приготування чаю?", a: ["Налити воду → закип’ятити → залити чай", "Залити чай → знайти чашку → закип’ятити воду", "Випити чай → налити воду → закип’ятити", "Поставити чашку → випити → додати воду"], correct: 0, why: "Спочатку готують гарячу воду, а потім заливають нею чай. Порядок дій має бути логічним." },
      { q: "Для чого у Scratch потрібен блок «коли натиснуто зелений прапорець»?", a: ["Щоб змінити колір монітора", "Щоб запустити послідовність команд", "Щоб видалити спрайт", "Щоб вимкнути звук комп’ютера"], correct: 1, why: "Це подієвий блок, який запускає програму після натискання зеленого прапорця." },
      { q: "Кіт має перейти на 2 клітинки праворуч, а потім на 1 вниз. Скільки команд руху потрібно?", a: ["Одну", "Три обов’язково", "Дві", "Чотири"], correct: 2, why: "Достатньо двох команд: рух праворуч на дві клітинки та рух униз на одну." },
      { q: "Яка властивість алгоритму означає, що він має завершитися за певну кількість кроків?", a: ["Яскравість", "Гучність", "Випадковість", "Скінченність"], correct: 3, why: "Скінченність означає, що алгоритм завершується після скінченної кількості кроків." },
      { q: "У програмі спочатку стоїть «перемістити на 10 кроків», а потім «повернути на 90°». Що виконає спрайт?", a: ["Спочатку переміститься, потім повернеться", "Спочатку повернеться, потім переміститься", "Видалить сцену", "Не зможе виконати жодної команди"], correct: 0, why: "Блоки, з’єднані в послідовність, зазвичай виконуються згори вниз." },
      { q: "Що варто зробити, якщо алгоритм не приводить до мети?", a: ["Натискати кнопки навмання", "Перевірити порядок команд і знайти помилку", "Завжди починати все на іншому комп’ютері", "Видалити всі файли"], correct: 1, why: "Налагодження — це перевірка програми та виправлення помилок у командах або їхньому порядку." }
    ],
    hard: [
      { q: "Виконавець стоїть у клітинці (1,1), де перша координата — стовпець. Команди: праворуч, вниз, праворуч. У якій клітинці він опиниться?", a: ["(1,3)", "(2,2)", "(3,2)", "(3,1)"], correct: 2, why: "Праворуч змінює стовпець: (2,1), вниз змінює рядок: (2,2), праворуч: (3,2)." },
      { q: "У програмі є команда «повторити 4 рази: перемістити на 10 кроків». Який результат?", a: ["Спрайт рухається на 10 кроків загалом", "Спрайт виконує рух 4 рази, загалом на 40 кроків", "Спрайт повертається 4 рази", "Команда виконується лише один раз"], correct: 1, why: "Цикл повторює вкладену команду чотири рази. 4 × 10 = 40 кроків руху." },
      { q: "Алгоритм: праворуч, праворуч, вниз, ліворуч. Яка команда зайва, якщо потрібно пройти лише на одну клітинку праворуч і одну вниз?", a: ["Друга команда «праворуч»", "Команда «вниз»", "Перша команда «праворуч»", "Команда «ліворуч» не є зайвою"], correct: 0, why: "Щоб пройти одну клітинку праворуч і одну вниз, достатньо команд «праворуч» та «вниз». Друга команда праворуч зайва." },
      { q: "Чому блоки Scratch мають з’єднуватися у правильній послідовності?", a: ["Так програма займає більше місця", "Щоб блоки мали однаковий колір", "Бо порядок виконання впливає на результат", "Щоб приховати спрайт"], correct: 2, why: "Послідовність визначає, які дії виконаються першими та як вони вплинуть на подальший рух." },
      { q: "Який приклад найкраще демонструє розгалуження?", a: ["Завжди зробити 5 кроків", "Виконати команди зверху вниз", "Повторити дію 3 рази", "Якщо йде дощ — узяти парасольку, інакше — не брати"], correct: 3, why: "Розгалуження обирає дію залежно від умови: якщо умова істинна — один варіант, інакше — інший." },
      { q: "У Scratch спрайт не рухається після натискання прапорця. Що найкраще перевірити спочатку?", a: ["Чи є блок запуску та з’єднані з ним команди руху", "Чи змінився фон робочого столу", "Чи підключені навушники", "Чи відкрита інша вкладка браузера"], correct: 0, why: "Перевір, чи є блок події запуску та чи приєднані до нього команди, які має виконати спрайт." },
      { q: "Яка характеристика команди важлива, щоб виконавець не мусив здогадуватися?", a: ["Вона має бути довгою", "Вона має бути точною та зрозумілою", "Вона має містити багато знаків оклику", "Вона має бути написана лише великими літерами"], correct: 1, why: "Точність і зрозумілість допомагають виконавцю однозначно виконати вказівку." },
      { q: "Програма щоразу повторює ті самі 3 команди руху 6 разів. Яка конструкція допоможе зробити її коротшою?", a: ["Видалення всіх команд", "Блок зміни тла", "Цикл повторення", "Блок зупинки всіх звуків"], correct: 2, why: "Цикл дає змогу повторити набір команд без дублювання однакових блоків багато разів." }
    ]
  };

  const state = {
    concept: "algorithm", level: "easy", program: [], player: { x: 0, y: 0 },
    questionIndex: 0, correct: 0, answered: false, selectedAnswer: null,
    completed: false, claimed: false, stars: 0, runToken: 0
  };

  const start = { x: 0, y: 0 }, goal = { x: 4, y: 4 }, wall = { x: 2, y: 2 };
  const directions = {
    right: { dx: 1, dy: 0, label: "Праворуч", arrow: "→" },
    down: { dx: 0, dy: 1, label: "Униз", arrow: "↓" },
    left: { dx: -1, dy: 0, label: "Ліворуч", arrow: "←" },
    up: { dx: 0, dy: -1, label: "Угору", arrow: "↑" }
  };

  function spriteSvg() {
    return '<svg class="sprite" viewBox="0 0 100 100" aria-hidden="true"><path d="M22 34 17 13 39 25Q50 20 61 25L83 13 78 35Q86 46 82 63Q77 82 50 84Q23 82 18 63Q14 46 22 34Z" fill="#f6a65e" stroke="#bd6a37" stroke-width="3"/><path d="M28 36 25 23 40 31M72 36 75 23 60 31" fill="#ffd0a2"/><ellipse cx="37" cy="49" rx="5" ry="7" fill="#34365f"/><ellipse cx="63" cy="49" rx="5" ry="7" fill="#34365f"/><path d="M45 60Q50 65 55 60M50 57 46 54 54 54Z" fill="#bd6a37"/></svg>';
  }

  function renderGrid() {
    const grid = $("#gameGrid");
    grid.replaceChildren();
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const cell = document.createElement("div");
        cell.className = "grid-cell";
        if (x === start.x && y === start.y) cell.classList.add("start-cell");
        if (x === goal.x && y === goal.y) cell.classList.add("goal-cell");
        if (x === wall.x && y === wall.y) cell.classList.add("wall-cell");
        if (x === state.player.x && y === state.player.y) cell.classList.add("player-cell");
        if (x === state.player.x && y === state.player.y) {
          cell.innerHTML = spriteSvg();
          cell.setAttribute("aria-label", "Персонаж");
        } else if (x === goal.x && y === goal.y) {
          cell.textContent = "★";
          cell.setAttribute("aria-label", "Мета");
        } else if (x === wall.x && y === wall.y) {
          cell.textContent = "▧";
          cell.setAttribute("aria-label", "Перешкода");
        } else {
          cell.setAttribute("aria-label", `Клітинка ${x + 1}, ${y + 1}`);
        }
        if (x === start.x && y === start.y) {
          const label = document.createElement("span");
          label.className = "cell-label";
          label.textContent = "СТАРТ";
          cell.append(label);
        }
        grid.append(cell);
      }
    }
  }

  function renderProgram() {
    const list = $("#programList");
    list.replaceChildren();
    $("#commandCount").textContent = `${state.program.length} ${pluralize(state.program.length, "команда", "команди", "команд")}`;
    if (!state.program.length) {
      const empty = document.createElement("li");
      empty.className = "program-empty";
      empty.textContent = "Тут з'являться твої команди";
      list.append(empty);
      return;
    }
    state.program.forEach((key, index) => {
      const item = document.createElement("li");
      item.className = "program-item";
      const number = document.createElement("span");
      number.className = "step-index";
      number.textContent = String(index + 1);
      const text = document.createElement("span");
      text.className = "step-text";
      text.textContent = `${directions[key].arrow} ${directions[key].label}`;
      const remove = document.createElement("button");
      remove.className = "remove-command";
      remove.type = "button";
      remove.textContent = "×";
      remove.setAttribute("aria-label", `Видалити команду ${index + 1}: ${directions[key].label}`);
      remove.addEventListener("click", () => {
        state.runToken++;
        state.program.splice(index, 1);
        resetPlayer("Команду видалено. Можеш продовжити редагування.");
        renderProgram();
      });
      item.append(number, text, remove);
      list.append(item);
    });
  }

  function pluralize(n, one, few, many) {
    const n10 = n % 10, n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return one;
    if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return few;
    return many;
  }

  function setStatus(message, kind = "neutral") {
    const status = $("#modelStatus");
    status.replaceChildren();
    const dot = document.createElement("span");
    dot.className = "status-dot";
    if (kind === "good") dot.style.background = "var(--green)";
    if (kind === "bad") dot.style.background = "var(--red)";
    const text = document.createElement("span");
    text.textContent = message;
    status.append(dot, text);
  }

  function resetPlayer(message = "Поле скинуто. Додай команди та запусти програму.") {
    state.player = { ...start };
    renderGrid();
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
    $("#conceptNote").lastElementChild.innerHTML = "";
    const strong = document.createElement("strong");
    strong.textContent = "Пам’ятай: ";
    $("#conceptNote").lastElementChild.append(strong, document.createTextNode(concepts[key].note));
    setStatus(concepts[key].status);
  }

  async function runProgram() {
    state.runToken++;
    const token = state.runToken;
    state.player = { ...start };
    renderGrid();
    if (!state.program.length) {
      setStatus("Спочатку додай хоча б одну команду.", "bad");
      return;
    }
    setStatus("Програма запущена…");
    for (let i = 0; i < state.program.length; i++) {
      if (token !== state.runToken) return;
      await new Promise(resolve => setTimeout(resolve, 360));
      if (token !== state.runToken) return;
      const command = directions[state.program[i]];
      const next = { x: state.player.x + command.dx, y: state.player.y + command.dy };
      if (next.x < 0 || next.x > 4 || next.y < 0 || next.y > 4) {
        setStatus(`Команда ${i + 1}: персонаж вийшов за межі поля. Відредагуй програму.`, "bad");
        return;
      }
      if (next.x === wall.x && next.y === wall.y) {
        setStatus(`Команда ${i + 1}: на шляху перешкода. Спробуй інший маршрут.`, "bad");
        return;
      }
      state.player = next;
      renderGrid();
      if (state.player.x === goal.x && state.player.y === goal.y) {
        if (i === state.program.length - 1) {
          setStatus("Мета досягнута! Алгоритм спрацював правильно. ✦", "good");
        } else {
          setStatus("Мети досягнуто, але в програмі є зайві команди після фінішу.", "bad");
        }
        return;
      }
    }
    setStatus("Програма завершилася, але мети не досягнуто. Зміни порядок або додай команди.", "bad");
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
    state.selectedAnswer = null;
    state.completed = false;
    state.claimed = false;
    $("#quizActive").hidden = false;
    $("#quizResult").hidden = true;
    $("#rewardNote").textContent = "Зірочки нараховуються один раз за завершену спробу.";
    renderQuestion();
  }

  function renderQuestion() {
    const set = questions[state.level];
    const question = set[state.questionIndex];
    state.answered = false;
    state.selectedAnswer = null;
    $("#questionCounter").textContent = `Запитання ${state.questionIndex + 1} із ${set.length}`;
    $("#correctCounter").textContent = String(state.correct);
    $("#questionNumber").textContent = String(state.questionIndex + 1).padStart(2, "0");
    $("#questionText").textContent = question.q;
    $("#progressFill").style.width = `${((state.questionIndex + 1) / set.length) * 100}%`;
    $("#feedbackBox").hidden = true;
    $("#feedbackBox").className = "feedback-box";
    $("#nextQuestion").disabled = true;
    $("#nextQuestion").innerHTML = state.questionIndex === set.length - 1 ? 'Побачити результат <span aria-hidden="true">→</span>' : 'Наступне <span aria-hidden="true">→</span>';
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
    state.answered = true;
    state.selectedAnswer = index;
    const question = questions[state.level][state.questionIndex];
    const buttons = $$(".answer-option");
    buttons.forEach((button, i) => {
      button.disabled = true;
      if (i === question.correct) button.classList.add("is-correct");
      if (i === index && index !== question.correct) button.classList.add("is-wrong");
    });
    const isCorrect = index === question.correct;
    if (isCorrect) state.correct++;
    $("#correctCounter").textContent = String(state.correct);
    const feedback = $("#feedbackBox");
    feedback.hidden = false;
    feedback.className = `feedback-box ${isCorrect ? "good" : "bad"}`;
    const title = document.createElement("strong");
    title.textContent = isCorrect ? "Правильно! " : "Не зовсім. ";
    feedback.replaceChildren(title, document.createTextNode(question.why));
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
      $("#resultMessage").textContent = "Ти чудово розумієш алгоритми та готовий до нових програмних викликів.";
    } else if (percent >= 70) {
      $("#resultTitle").textContent = "Чудова робота!";
      $("#resultMessage").textContent = "Ти добре засвоїв матеріал. Переглянь пояснення до помилок і закріпи результат.";
    } else if (percent >= 40) {
      $("#resultTitle").textContent = "Гарний початок!";
      $("#resultMessage").textContent = "Ти вже маєш основу. Повтори шпаргалку й спробуй тест ще раз.";
    } else {
      $("#resultTitle").textContent = "Час потренуватися!";
      $("#resultMessage").textContent = "Кожна спроба навчає. Повернися до понять і пройди тест ще раз — у тебе вийде.";
    }
    $("#claimReward").disabled = false;
    $("#claimReward").innerHTML = 'Отримати зірочки <span aria-hidden="true">✦</span>';
    $("#rewardNote").textContent = "Зірочки нараховуються один раз за завершену спробу.";
  
    // Єдине нарахування комп’юшок: результат обробляється після відображення підсумку.
    Promise.resolve().then(() => {
      const scorePercent = typeof percent !== 'undefined' ? percent : (typeof pct !== 'undefined' ? pct : 0);
      const rewardResult = window.LearningGamification?.awardTestResult("algorithms-in-scratch", scorePercent, state.level);
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
    $("#starBalance").textContent = String(state.stars);
    $("#claimReward").disabled = true;
    $("#claimReward").textContent = "Зірочки отримано ✓";
    $("#rewardNote").textContent = `+${reward} зірочок додано до локального балансу цього уроку.`;
  }

  $$(".concept-card").forEach(button => button.addEventListener("click", () => selectConcept(button.dataset.concept)));
  $$(".command-button").forEach(button => button.addEventListener("click", () => {
    if (state.program.length >= 12) {
      setStatus("До програми можна додати не більше 12 команд.", "bad");
      return;
    }
    state.runToken++;
    state.program.push(button.dataset.command);
    renderProgram();
    resetPlayer("Команду додано. Коли будеш готовий — запускай програму.");
  }));
  $("#clearProgram").addEventListener("click", () => {
    state.runToken++;
    state.program = [];
    renderProgram();
    resetPlayer("Програму очищено. Почни складати алгоритм знову.");
  });
  $("#runProgram").addEventListener("click", runProgram);
  $("#resetModel").addEventListener("click", () => {
    state.runToken++;
    state.program = [];
    renderProgram();
    resetPlayer();
    setStatus("Модель скинуто до початкового стану.");
  });
  $$(".level-card").forEach(button => button.addEventListener("click", () => chooseLevel(button.dataset.level)));
  $("#nextQuestion").addEventListener("click", () => {
    if (!state.answered) return;
    if (state.questionIndex < questions[state.level].length - 1) {
      state.questionIndex++;
      renderQuestion();
    } else {
      showResult();
    }
  });
  $("#claimReward").addEventListener("click", claimReward);
  $("#retryQuiz").addEventListener("click", startQuiz);

  renderGrid();
  renderProgram();
  selectConcept("algorithm");
  startQuiz();
})();