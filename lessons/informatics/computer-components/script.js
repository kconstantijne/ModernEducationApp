(() => {
  "use strict";

  const concepts = {
    system: {
      title: "Системний блок",
      intro: "Усередині системного блока розташовані компоненти, які виконують обчислення та керують роботою комп’ютера.",
      fact: "Процесор виконує команди програм, а оперативна пам’ять тимчасово зберігає дані, з якими працює комп’ютер.",
      caption: "Процесор, оперативна пам’ять і накопичувач виконують різні завдання всередині комп’ютера.",
      controls: "system"
    },
    input: {
      title: "Пристрої введення",
      intro: "Пристрої введення передають комп’ютеру дані та команди — текст, рух курсора, звук або зображення.",
      fact: "Клавіатура вводить текст, миша керує вказівником, а мікрофон передає звук.",
      caption: "Спробуй натиснути кнопку, щоб побачити, як команда від користувача потрапляє до комп’ютера.",
      controls: "input"
    },
    output: {
      title: "Пристрої виведення",
      intro: "Пристрої виведення показують або відтворюють інформацію, яку комп’ютер опрацював.",
      fact: "Монітор показує зображення, колонки відтворюють звук, а принтер друкує на папері.",
      caption: "Один комп’ютер може передавати результат у різних формах: зображенням, звуком або друком.",
      controls: "output"
    },
    storage: {
      title: "Пристрої зберігання",
      intro: "Накопичувачі допомагають зберігати документи, фотографії, програми та інші файли навіть після вимкнення комп’ютера.",
      fact: "SSD зазвичай швидко читає дані, а флешнакопичувач зручно переносити між пристроями.",
      caption: "Збережені файли можна відкрити пізніше — вони не зникають після вимкнення живлення.",
      controls: "storage"
    },
    network: {
      title: "Мережеві пристрої",
      intro: "Мережеві пристрої допомагають комп’ютерам обмінюватися даними та під’єднуватися до локальної мережі й інтернету.",
      fact: "Wi‑Fi роутер передає дані між домашніми пристроями та мережею провайдера.",
      caption: "Дані можуть пройти через кілька пристроїв, перш ніж досягнуть іншого комп’ютера.",
      controls: "network"
    }
  };

  const questionBank = {
    easy: [
      {q:"Який пристрій найчастіше використовують для введення тексту?",a:["Монітор","Клавіатуру","Колонки","Принтер"],correct:1,why:"Клавіатура дає змогу вводити літери, цифри та команди."},
      {q:"Що показує зображення та текст із комп’ютера?",a:["Монітор","Мікрофон","Миша","Флешнакопичувач"],correct:0,why:"Монітор належить до пристроїв виведення: він показує візуальну інформацію."},
      {q:"Який компонент виконує команди програм?",a:["Процесор","Колонки","Вебкамера","Принтер"],correct:0,why:"Процесор виконує інструкції програм і опрацьовує дані."},
      {q:"Де зручно зберігати файл, щоб відкрити його завтра?",a:["Лише на екрані","У колонках","На накопичувачі","На клавіатурі"],correct:2,why:"Накопичувач, наприклад SSD або флешка, зберігає файли для подальшого використання."}
    ],
    medium: [
      {q:"Ти хочеш записати голосове повідомлення. Який пристрій потрібен для введення звуку?",a:["Колонки","Мікрофон","Монітор","Принтер"],correct:1,why:"Мікрофон передає звук до комп’ютера, тому це пристрій введення."},
      {q:"Комп’ютер показав готовий малюнок на екрані. Який пристрій вивів результат?",a:["Миша","Процесор","Монітор","SSD"],correct:2,why:"Монітор виводить зображення, яке створила або опрацювала програма."},
      {q:"Який компонент тимчасово зберігає дані програм під час роботи?",a:["Оперативна пам’ять","Принтер","Клавіатура","Роутер"],correct:0,why:"Оперативна пам’ять (RAM) зберігає дані, потрібні програмам зараз; після вимкнення її вміст зазвичай втрачається."},
      {q:"Ти хочеш перенести презентацію на інший комп’ютер. Що найзручніше використати?",a:["Монітор","Флешнакопичувач","Мікрофон","Вебкамеру"],correct:1,why:"Флешнакопичувач зберігає файл і дає змогу перенести його на інший пристрій."},
      {q:"Яка пара складається лише з пристроїв введення?",a:["Клавіатура й миша","Монітор і колонки","Принтер і монітор","Колонки й мікрофон"],correct:0,why:"Клавіатура та миша передають комп’ютеру команди користувача."},
      {q:"Який пристрій допомагає кільком домашнім пристроям під’єднатися до Wi‑Fi?",a:["Сканер","Роутер","Процесор","SSD"],correct:1,why:"Wi‑Fi роутер забезпечує бездротове з’єднання пристроїв із мережею."}
    ],
    hard: [
      {q:"Під час відеодзвінка ти говориш, чуєш співрозмовника й бачиш його. Які пристрої потрібні для введення та виведення звуку?",a:["Колонки для введення, мікрофон для виведення","Мікрофон для введення, колонки для виведення","Монітор для введення, SSD для виведення","Клавіатура для звуку в обох напрямках"],correct:1,why:"Мікрофон передає твій голос до комп’ютера (введення), а колонки відтворюють голос співрозмовника (виведення)."},
      {q:"Комп’ютер вимкнули, а документ залишився на SSD. Чому?",a:["SSD зберігає дані без постійного живлення","SSD є різновидом оперативної пам’яті","Монітор запам’ятав документ","Процесор продовжує працювати без живлення"],correct:0,why:"SSD — це накопичувач для довготривалого зберігання даних; він зберігає файли після вимкнення комп’ютера."},
      {q:"Програма повільно перемикається між багатьма відкритими вкладками. Який ресурс може бути важливим, якщо одночасно відкрито забагато програм?",a:["Оперативна пам’ять","Колір монітора","Кількість клавіш","Гучність колонок"],correct:0,why:"Багато відкритих програм потребують оперативної пам’яті. Коли її не вистачає, робота комп’ютера може сповільнюватися."},
      {q:"Визнач правильний ланцюжок для друку тексту.",a:["Принтер → клавіатура → процесор","Клавіатура → опрацювання комп’ютером → принтер","Монітор → мікрофон → SSD","Колонки → процесор → миша"],correct:1,why:"Текст вводять клавіатурою, комп’ютер його опрацьовує, а принтер виводить результат на папір."},
      {q:"Яке твердження про системний блок є найточнішим?",a:["У ньому завжди містяться монітор і клавіатура","Це корпус із головними внутрішніми компонентами комп’ютера","Він потрібен лише для зберігання фотографій","Він є пристроєм введення"],correct:1,why:"У настільного ПК системний блок — корпус, у якому розміщено основні внутрішні компоненти. Монітор і клавіатура — окремі периферійні пристрої."},
      {q:"Фотографію сканують, а потім дивляться на екрані. Яка пара правильно описує пристрої?",a:["Сканер — введення, монітор — виведення","Сканер — виведення, монітор — введення","Обидва — накопичувачі","Обидва — пристрої опрацювання"],correct:0,why:"Сканер передає зображення в комп’ютер (введення), а монітор показує його (виведення)."},
      {q:"Комп’ютер не може відкрити сайт, хоча монітор і клавіатура працюють. Який компонент варто перевірити для мережевого з’єднання?",a:["Роутер або мережеве підключення","Принтер","Клавішу пробілу","Гучність колонок"],correct:0,why:"Для доступу до сайту потрібне мережеве з’єднання; перевір роутер, Wi‑Fi або кабель."},
      {q:"Яке порівняння оперативної пам’яті й SSD правильне?",a:["Обидва завжди стирають файли після вимкнення","RAM тимчасово зберігає дані для роботи, SSD зберігає файли надовго","SSD виконує всі команди замість процесора","RAM — це пристрій виведення"],correct:1,why:"Оперативна пам’ять потрібна для поточної роботи програм, а SSD зберігає файли й після вимкнення комп’ютера."}
    ]
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const state = { concept: "system", level: "easy", questions: [], index: 0, score: 0, answered: false, selected: null, finished: false, modelDefaults: { detail: 2, labels: true, demoStep: 0 } };

  const titleEl = $("#model-title");
  const introEl = $("#model-intro");
  const factEl = $("#model-fact");
  const captionEl = $("#stage-caption");
  const svgEl = $("#model-svg");
  const controlsEl = $("#model-controls-content");
  const initialSystemSvg = svgEl.innerHTML;

  function setActiveConcept(key) {
    if (!concepts[key]) return;
    state.concept = key;
    $$(".concept-card").forEach(card => {
      const active = card.dataset.concept === key;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-pressed", String(active));
    });
    renderModel();
  }

  function renderModel() {
    const item = concepts[state.concept];
    titleEl.textContent = item.title;
    introEl.textContent = item.intro;
    factEl.textContent = item.fact;
    captionEl.textContent = item.caption;
    const detail = Number($("#detail-level")?.value || state.modelDefaults.detail);
    const labels = $("#show-labels")?.checked ?? state.modelDefaults.labels;
    $("#detail-output").textContent = String(detail);
    if (state.concept === "system") {
      svgEl.setAttribute("aria-label", "Модель системного блока та його компонентів");
      svgEl.innerHTML = initialSystemSvg;
      const nodes = $$("rect, circle, path, text", svgEl);
      if (detail === 1) nodes.forEach(node => { if (node.tagName.toLowerCase() === "text") node.style.opacity = ".35"; });
      if (!labels) $$("text", svgEl).forEach(node => node.style.opacity = "0");
      captionEl.textContent = detail === 1 ? "Загальний вигляд системного блока." : detail === 2 ? item.caption : "Усередині: процесор виконує команди, оперативна пам’ять зберігає поточні дані, а накопичувач зберігає файли.";
      return;
    }
    const labelOpacity = labels ? 1 : 0;
    const size = detail === 3 ? 1.08 : detail === 1 ? .88 : 1;
    const drawings = {
      input: `<g transform="translate(0 0) scale(${size})"><rect x="65" y="82" width="178" height="105" rx="13" fill="#e0f4ee" stroke="#69b7a7" stroke-width="3"/><g stroke="#79c0b2" stroke-width="4" stroke-linecap="round"><path d="M82 102h142M82 119h142M82 136h142M82 153h142M97 169h112"/></g><path d="M300 88v86m-19-19 19 19 19-19" fill="none" stroke="#7287df" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><rect x="270" y="184" width="60" height="26" rx="13" fill="#e6eaff" stroke="#8b9be5" stroke-width="2"/><path d="M300 184v-18" stroke="#8b9be5" stroke-width="3"/></g><text x="154" y="220" text-anchor="middle" font-size="15" fill="#526b9b" font-weight="700" opacity="${labelOpacity}">Клавіатура</text><text x="300" y="239" text-anchor="middle" font-size="15" fill="#526b9b" font-weight="700" opacity="${labelOpacity}">Миша</text>`,
      output: `<g transform="translate(0 0) scale(${size})"><rect x="90" y="44" width="236" height="145" rx="13" fill="#fff" stroke="#a393dc" stroke-width="4"/><rect x="103" y="57" width="210" height="119" rx="7" fill="#e9e2ff"/><circle cx="208" cy="115" r="32" fill="#c5b7f2"/><path d="M180 122c15-27 40-30 59-4" fill="none" stroke="#8c78d4" stroke-width="9" stroke-linecap="round"/><path d="M208 190v28m-38 9h76" stroke="#a393dc" stroke-width="7" stroke-linecap="round"/><rect x="354" y="120" width="66" height="90" rx="8" fill="#f8f3ff" stroke="#a393dc" stroke-width="3"/><path d="M365 143h44m-44 10h44" stroke="#c2b4eb" stroke-width="4" stroke-linecap="round"/><rect x="361" y="177" width="52" height="23" rx="3" fill="#fff" stroke="#d4caef"/></g><text x="208" y="252" text-anchor="middle" font-size="15" fill="#665a9e" font-weight="700" opacity="${labelOpacity}">Монітор</text><text x="387" y="233" text-anchor="middle" font-size="14" fill="#665a9e" font-weight="700" opacity="${labelOpacity}">Принтер</text>`,
      storage: `<g transform="translate(0 0) scale(${size})"><rect x="85" y="56" width="155" height="174" rx="18" fill="#fff0e2" stroke="#dfa16c" stroke-width="3"/><rect x="104" y="76" width="117" height="96" rx="10" fill="#f7d0ad"/><circle cx="162" cy="124" r="27" fill="#fff0e2" stroke="#dfa16c" stroke-width="3"/><circle cx="162" cy="124" r="7" fill="#dfa16c"/><path d="M107 192h112" stroke="#dfa16c" stroke-width="4" stroke-linecap="round"/><rect x="302" y="94" width="72" height="125" rx="13" fill="#f3f5ff" stroke="#8799df" stroke-width="3"/><rect x="319" y="77" width="38" height="33" rx="5" fill="#8799df"/><path d="M338 110v30" stroke="#8799df" stroke-width="4"/><circle cx="338" cy="195" r="5" fill="#8799df"/></g><text x="162" y="258" text-anchor="middle" font-size="15" fill="#946a42" font-weight="700" opacity="${labelOpacity}">SSD</text><text x="338" y="245" text-anchor="middle" font-size="15" fill="#5f70b7" font-weight="700" opacity="${labelOpacity}">Флешка</text>`,
      network: `<g><circle cx="260" cy="65" r="27" fill="#e7ecff" stroke="#8295e5" stroke-width="3"/><path d="M247 65h26m-13-13v26" stroke="#8295e5" stroke-width="3" stroke-linecap="round"/><path d="M260 92v44M260 136 125 190M260 136l135 54" stroke="#91a0e8" stroke-width="4" stroke-dasharray="7 7" fill="none"/><rect x="205" y="137" width="110" height="70" rx="12" fill="#fff" stroke="#91a0e8" stroke-width="3"/><path d="M225 158q35-27 70 0M235 170q25-18 50 0" fill="none" stroke="#91a0e8" stroke-width="4" stroke-linecap="round"/><circle cx="260" cy="183" r="4" fill="#61b99f"/><rect x="67" y="183" width="112" height="68" rx="10" fill="#e4f5ef" stroke="#72bba9" stroke-width="3"/><rect x="81" y="195" width="84" height="43" rx="5" fill="#b9e5d8"/><rect x="341" y="183" width="112" height="68" rx="10" fill="#f0eaff" stroke="#a18cda" stroke-width="3"/><rect x="355" y="195" width="84" height="43" rx="5" fill="#d4c7f4"/></g><text x="260" y="229" text-anchor="middle" font-size="13" fill="#6074bd" font-weight="700" opacity="${labelOpacity}">Роутер</text><text x="123" y="271" text-anchor="middle" font-size="14" fill="#498f7d" font-weight="700" opacity="${labelOpacity}">Ноутбук</text><text x="397" y="271" text-anchor="middle" font-size="14" fill="#806db7" font-weight="700" opacity="${labelOpacity}">Планшет</text>`,
    };
    if (state.concept === "input") {
      svgEl.setAttribute("aria-label", "Модель пристроїв введення: клавіатура та миша");
      svgEl.innerHTML = `<defs><marker id="arrowhead" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7287df"/></marker></defs>${drawings.input}<path d="M340 60h85" stroke="#7287df" stroke-width="3" marker-end="url(#arrowhead)"/><text x="382" y="48" text-anchor="middle" font-size="12" fill="#7287df" font-weight="700" opacity="${labelOpacity}">Команда</text>`;
    } else if (state.concept === "output") {
      svgEl.setAttribute("aria-label", "Модель пристроїв виведення: монітор та принтер");
      svgEl.innerHTML = drawings.output;
    } else if (state.concept === "storage") {
      svgEl.setAttribute("aria-label", "Модель пристроїв зберігання: SSD та флешнакопичувач");
      svgEl.innerHTML = drawings.storage;
    } else {
      svgEl.setAttribute("aria-label", "Модель мережі з роутером, ноутбуком і планшетом");
      svgEl.innerHTML = drawings.network;
    }
    captionEl.textContent = detail === 1 ? "Огляд основних пристроїв цієї групи." : item.caption;
  }

  function resetModel() {
    state.modelDefaults = { detail: 2, labels: true, demoStep: 0 };
    $("#detail-level").value = "2";
    $("#show-labels").checked = true;
    renderModel();
  }

  function selectLevel(level) {
    if (!questionBank[level]) return;
    state.level = level;
    $$(".level-card").forEach(button => {
      const active = button.dataset.level === level;
      button.classList.toggle("is-selected", active);
      button.setAttribute("aria-pressed", String(active));
    });
    startQuiz();
  }

  function startQuiz() {
    state.questions = questionBank[state.level].map(question => ({...question, a:[...question.a]}));
    state.index = 0;
    state.score = 0;
    state.answered = false;
    state.selected = null;
    state.finished = false;
    $("#question-view").hidden = false;
    $("#result-view").hidden = true;
    $("#score-count").textContent = "0";
    renderQuestion();
  }

  function renderQuestion() {
    const question = state.questions[state.index];
    state.answered = false;
    state.selected = null;
    $("#question-counter").textContent = `Запитання ${state.index + 1} із ${state.questions.length}`;
    $("#question-text").textContent = question.q;
    $("#answer-feedback").hidden = true;
    $("#answer-feedback").className = "feedback";
    $("#next-question").disabled = true;
    $("#next-question").innerHTML = state.index === state.questions.length - 1 ? 'Побачити результат <span aria-hidden="true">→</span>' : 'Наступне запитання <span aria-hidden="true">→</span>';
    const progress = Math.round((state.index / state.questions.length) * 100);
    $("#progress-fill").style.width = `${progress}%`;
    $("#quiz-progress").setAttribute("aria-valuenow", String(progress));
    const letters = ["А","Б","В","Г"];
    const list = $("#answer-list");
    list.replaceChildren();
    question.a.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-option";
      button.dataset.answer = String(index);
      const letter = document.createElement("span");
      letter.className = "answer-letter";
      letter.textContent = letters[index];
      const text = document.createElement("span");
      text.className = "answer-text";
      text.textContent = answer;
      button.append(letter, text);
      button.addEventListener("click", () => chooseAnswer(index));
      list.append(button);
    });
  }

  function chooseAnswer(index) {
    if (state.answered || state.finished) return;
    const question = state.questions[state.index];
    state.answered = true;
    state.selected = index;
    const correct = index === question.correct;
    if (correct) state.score += 1;
    $("#score-count").textContent = String(state.score);
    $$(".answer-option").forEach((button, i) => {
      button.disabled = true;
      if (i === question.correct) button.classList.add("is-correct");
      if (i === index && !correct) button.classList.add("is-wrong");
    });
    const feedback = $("#answer-feedback");
    feedback.hidden = false;
    feedback.className = `feedback ${correct ? "correct" : "incorrect"}`;
    const title = document.createElement("strong");
    title.textContent = correct ? "Правильно! Чудова робота." : "Ще трохи практики — і все вийде.";
    const explanation = document.createElement("span");
    explanation.textContent = question.why;
    feedback.replaceChildren(title, explanation);
    $("#next-question").disabled = false;
    const progress = Math.round(((state.index + 1) / state.questions.length) * 100);
    $("#progress-fill").style.width = `${progress}%`;
    $("#quiz-progress").setAttribute("aria-valuenow", String(progress));
  }

  function finishQuiz() {
    state.finished = true;
    $("#question-view").hidden = true;
    $("#result-view").hidden = false;
    const total = state.questions.length;
    const percent = Math.round((state.score / total) * 100);
    $("#final-score").textContent = `${state.score}/${total}`;
    $("#final-percent").textContent = `${percent}%`;
    let title = "Гарний старт!";
    let copy = "Переглянь шпаргалку та спробуй ще раз — ти поступово закріпиш усі поняття.";
    let symbol = "↻";
    if (percent >= 90) {
      title = "Блискучий результат!";
      copy = "Ти чудово розрізняєш складові комп’ютера та розумієш, для чого вони потрібні. Так тримати!";
      symbol = "✦";
    } else if (percent >= 70) {
      title = "Чудова робота!";
      copy = "Ти добре засвоїв основи. Повтори кілька понять зі шпаргалки, щоб упевнено відповідати на складніші запитання.";
      symbol = "✓";
    } else if (percent >= 40) {
      title = "Уже є прогрес!";
      copy = "Ти впізнаєш частину пристроїв. Повернися до карток понять, досліди модель і спробуй ще раз.";
      symbol = "★";
    }
    $("#result-title").textContent = title;
    $("#result-copy").textContent = copy;
    $("#result-symbol").textContent = symbol;
    $("#question-counter").textContent = "Тест завершено";
    $("#progress-fill").style.width = "100%";
    $("#quiz-progress").setAttribute("aria-valuenow", "100");
    $("#result-view").focus?.();
  }

  $("#concept-grid").addEventListener("click", event => {
    const card = event.target.closest("[data-concept]");
    if (card) setActiveConcept(card.dataset.concept);
  });
  $("#detail-level").addEventListener("input", renderModel);
  $("#show-labels").addEventListener("change", renderModel);
  $("#reset-model").addEventListener("click", resetModel);
  $$(".level-card").forEach(button => button.addEventListener("click", () => selectLevel(button.dataset.level)));
  $("#next-question").addEventListener("click", () => {
    if (!state.answered) return;
    if (state.index < state.questions.length - 1) {
      state.index += 1;
      renderQuestion();
    } else {
      finishQuiz();
    }
  });
  $("#retry-quiz").addEventListener("click", startQuiz);

  // Initialize every interactive area from the same state.
  renderModel();
  startQuiz();
})();
