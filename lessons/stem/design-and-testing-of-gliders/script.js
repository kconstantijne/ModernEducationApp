
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const concepts = {
    lift: {
      title: "Підйомна сила",
      description: "Під час руху повітря взаємодіє з крилом і може створювати силу, спрямовану вгору. Форма крила та кут його положення впливають на результат.",
      note: "Підйомна сила допомагає планеру довше залишатися в повітрі, але сама по собі не гарантує найдовший політ.",
      status: "Досліди, як ширина крил і кут впливають на прогноз польоту."
    },
    drag: {
      title: "Опір повітря",
      description: "Повітря протидіє руху планера. Форма, площа поверхні, швидкість і якість згинів можуть змінювати цей опір.",
      note: "Опір повітря спрямований проти руху. Важливо шукати баланс, а не просто робити крила якомога більшими.",
      status: "У реальному досліді порівнюй схожі моделі та спостерігай за дальністю польоту."
    },
    balance: {
      title: "Баланс і центр мас",
      description: "Розподіл маси впливає на те, як планер тримає напрям. Надто легкий або надто важкий ніс може зробити політ нестійким.",
      note: "Змінюй носову вагу поступово. Після кожної зміни перевіряй, чи летить планер рівніше.",
      status: "Змінюй носову вагу малими кроками й стеж за показником стійкості."
    },
    design: {
      title: "Конструкція планера",
      description: "Розмах крил, їхня симетрія, згини та форма носа впливають на політ. Якісна модель має бути рівною та збалансованою.",
      note: "Найкращий дизайн визначають випробування: спершу сформулюй гіпотезу, потім зміни один параметр і порівняй результати.",
      status: "Вибери параметр, запусти модель і порівняй результат із попереднім запуском."
    }
  };

  const rewardByLevel = { easy: 10, medium: 15, hard: 20 };
  const levelNames = { easy: "Простий рівень", medium: "Середній рівень", hard: "Складний рівень" };

  const questions = {
    easy: [
      { q: "Яка сила допомагає планеру триматися в повітрі?", a: ["Сила тертя об землю", "Підйомна сила", "Сила магніту", "Електрична сила"], correct: 1, why: "Підйомна сила може бути спрямована вгору й допомагає крилу підтримувати політ." },
      { q: "Що зазвичай робить опір повітря з рухом планера?", a: ["Протидіє руху", "Завжди прискорює його", "Вимикає тяжіння", "Змінює папір на легший"], correct: 0, why: "Опір повітря діє проти руху тіла крізь повітря." },
      { q: "Яка частина паперового планера створює важливу взаємодію з повітрям?", a: ["Лише назва на папері", "Тільки колір", "Крила", "Тінь планера"], correct: 2, why: "Крила взаємодіють із повітрям і впливають на підйомну силу та стійкість." },
      { q: "Як найкраще порівняти два варіанти планера?", a: ["Змінити все одразу", "Запускати один лише вниз", "Не записувати результати", "Змінити один параметр і порівняти польоти"], correct: 3, why: "Якщо змінювати один параметр за раз, легше зрозуміти, що саме вплинуло на результат." }
    ],
    medium: [
      { q: "Планер щоразу різко задирає ніс і втрачає стійкість. Що варто зробити спершу?", a: ["Зім’яти крила", "Перевірити баланс і змінити носову вагу малим кроком", "Запускати із заплющеними очима", "Зробити папір мокрим"], correct: 1, why: "Баланс і положення центра мас впливають на стійкість. Зміни роблять поступово й перевіряють повторним запуском." },
      { q: "Чому важливо, щоб ліве й праве крило були приблизно симетричними?", a: ["Щоб планер мав більше кольорів", "Щоб він став невидимим", "Щоб зменшити небажане відхилення вбік", "Щоб повітря зникло"], correct: 2, why: "Симетричні крила допомагають планеру летіти рівніше й не завалюватися через різницю форми." },
      { q: "Під час тесту учень змінив і ширину крил, і силу запуску. Чому складно зробити висновок?", a: ["Не можна використовувати крила", "Змінилася пора року", "Планери не можна випробовувати", "Невідомо, який із двох параметрів вплинув на результат"], correct: 3, why: "Для чесного порівняння потрібно змінювати один параметр, зберігаючи інші однаковими." },
      { q: "Що є гіпотезою для експерименту з планером?", a: ["Припущення, яке можна перевірити дослідом", "Готова відповідь без перевірки", "Назва інструмента", "Випадковий малюнок"], correct: 0, why: "Гіпотеза — це обґрунтоване припущення, яке можна перевірити спостереженням або експериментом." },
      { q: "Який запис найкраще допоможе порівняти випробування?", a: ["«Летів нормально» без деталей", "Параметри моделі, умови запуску та виміряна дальність", "Лише колір планера", "Тільки ім’я автора"], correct: 1, why: "Запис параметрів і результатів допомагає порівнювати спроби та робити висновки на основі даних." },
      { q: "Чому надто різкий або крутий запуск може погіршити політ?", a: ["Бо планер перестає бути паперовим", "Бо він обов’язково стає важчим", "Бо напрям і швидкість можуть зробити політ нестійким", "Бо підйомна сила зникає назавжди"], correct: 2, why: "Невдалий кут або різкий кидок може спричинити втрату стійкості. Плавний контрольований запуск полегшує порівняння." }
    ],
    hard: [
      { q: "У трьох тестах змінювали лише розмах крил: 12 см, 16 см і 20 см. Сила запуску та папір були однаковими. Що цей план допомагає перевірити?", a: ["Чи впливає розмах крил на результат", "Чи змінюється колір паперу", "Чи різні учні мають різні імена", "Чи існує сила тяжіння"], correct: 0, why: "Оскільки інші умови збережено, можна порівняти, як саме розмах крил пов’язаний із результатом цих тестів." },
      { q: "Планер A пролетів 6 м, B — 8 м, C — 7 м. Який висновок коректний?", a: ["B завжди найкращий у будь-яких умовах", "A не має крил", "C не можна було запускати", "У цьому випробуванні найбільшу дальність показав B"], correct: 3, why: "Дані підтверджують лише результат конкретного випробування. Для загального висновку потрібні повторні запуски в однакових умовах." },
      { q: "Після додавання великої ваги до носа планер почав швидко опускатися. Яке пояснення найдоречніше?", a: ["Папір забув форму", "Зміна балансу могла зробити політ крутішим і менш стійким", "Повітря стало твердим", "Крила перестали взаємодіяти з повітрям"], correct: 1, why: "Додаткова маса змінює баланс і рух планера. Варто повернутися до попереднього стану та тестувати менші зміни." },
      { q: "Два планери мають однаковий розмах крил, але один летить убік. Яку перевірку варто виконати першою?", a: ["Зважити хмару", "Змінити одразу всі згини", "Перевірити симетрію крил і хвостової частини", "Прикрасити його наліпками"], correct: 2, why: "Асиметричні згини або крила можуть спричинити поворот. Спершу перевіряють геометрію моделі." },
      { q: "Яка послідовність найкраще описує інженерний цикл?", a: ["Висновок → випадковий запуск → забути дані", "Змінити все → вгадати причину", "Вибрати колір → отримати точний прогноз", "Гіпотеза → контрольований тест → запис результату → вдосконалення"], correct: 3, why: "Інженерний цикл поєднує планування, перевірку, аналіз результатів і наступне вдосконалення конструкції." },
      { q: "Учень хоче дізнатися, чи впливає кут крил на дальність. Що потрібно залишити незмінним?", a: ["Папір, розмах крил і спосіб запуску", "Усі параметри, крім кута, що перевіряється", "Тільки колір стола", "Нічого — інакше це не експеримент"], correct: 1, why: "Щоб ізолювати вплив кута, решту важливих умов треба зберегти однаковими." },
      { q: "Модель прогнозує 9 м, але справжній планер пролетів 6 м. Що робити досліднику?", a: ["Приховати результат", "Оголосити, що вимірювання неможливі", "Записати фактичний результат і перевірити умови та припущення моделі", "Змінити число в записі на 9"], correct: 2, why: "Модель спрощує реальність. Різниця між прогнозом і вимірюванням — привід перевірити умови та вдосконалити модель." },
      { q: "Яке правило безпеки найважливіше під час запуску паперових планерів у класі?", a: ["Цілитися в людей", "Запускати біля обличчя", "Бігти з ножицями", "Обрати вільний напрям, не цілитися в людей і слухати вчителя"], correct: 3, why: "Планери запускають лише у вільному напрямі, подалі від облич та людей. Якщо використовуються ножиці, працюють обережно й за правилами вчителя." }
    ]
  };

  const state = { concept: "lift", level: "easy", questionIndex: 0, correct: 0, answered: false, completed: false, claimed: false, stars: 0, lastDistance: null };
  const numberFormat = new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 1 });
  const fmt = value => numberFormat.format(Number(value));

  function setStatus(message, kind = "neutral") {
    const box = $("#modelStatus");
    box.replaceChildren();
    const dot = document.createElement("span");
    dot.className = "status-dot";
    if (kind === "good") dot.style.background = "var(--green, #36a879)";
    if (kind === "bad") dot.style.background = "var(--red, #d85b6a)";
    const text = document.createElement("span");
    text.textContent = message;
    box.append(dot, text);
  }

  function getFlightEstimate() {
    const wing = Number($("#wingInput").value);
    const weight = Number($("#weightInput").value);
    const angle = Number($("#angleInput").value);
    const launch = Number($("#launchInput").value);
    const wingFactor = wing / 16;
    const launchFactor = launch / 6;
    const anglePenalty = Math.abs(angle - 6) / 10;
    const weightPenalty = Math.abs(weight - 2) * 0.09;
    const distance = Math.max(1, 8.4 * wingFactor * launchFactor * (1 - anglePenalty * 0.24) * (1 - weightPenalty));
    const stability = Math.max(20, Math.min(98, Math.round(100 - Math.abs(weight - 2) * 13 - Math.abs(angle - 6) * 2.1 - Math.abs(wing - 16) * 0.8)));
    return { distance, stability, wing, weight, angle, launch };
  }

  function updateControlLabels() {
    $("#wingValue").textContent = `${$("#wingInput").value} см`;
    $("#weightValue").textContent = `${$("#weightInput").value} умовних одиниць`;
    $("#angleValue").textContent = `${$("#angleInput").value}°`;
    $("#launchValue").textContent = `${$("#launchInput").value}/10`;
  }

  function renderFlight(animate = false) {
    updateControlLabels();
    const data = getFlightEstimate();
    const ratio = Math.max(0.12, Math.min(1, data.distance / 18));
    const endX = 90 + ratio * 450;
    const endY = 172 - data.stability * 0.95;
    const control = Math.max(24, endY - 55);
    $("#flightPath").setAttribute("d", `M35 180 Q${Math.round(endX * 0.48)} ${Math.round(control)} ${Math.round(endX)} ${Math.round(endY)}`);
    $("#planeMarker").style.left = `${Math.min(91, 6 + ratio * 78)}%`;
    $("#planeMarker").style.top = `${Math.max(16, Math.min(65, 76 - data.stability * 0.45))}%`;
    $("#endLabel").style.left = `${Math.min(88, 8 + ratio * 78)}%`;
    $("#distanceValue").textContent = `${fmt(data.distance)} м`;
    $("#modelResult").textContent = `${fmt(data.distance)} м`;
    $("#resultCaption").textContent = `Оціночна дальність · стійкість ${data.stability}%`;
    $("#flightBadge").textContent = animate ? "Політ завершено" : "Готовий до запуску";
    $("#flightScene").classList.toggle("is-launched", animate);
    return data;
  }

  function launchGlider() {
    const data = renderFlight(true);
    state.lastDistance = data.distance;
    let note = "Політ змодельовано. Запиши результат і зміни лише один параметр для наступного тесту.";
    if (data.stability < 55) note = "Модель прогнозує нестійкий політ. Спробуй наблизити баланс до середнього значення або зменшити кут.";
    else if (data.distance >= 11) note = "За параметрами моделі очікується довший політ. Перевір гіпотезу на реальному паперовому планері.";
    setStatus(`${note} Прогнозована дальність: ${fmt(data.distance)} м. Це спрощена навчальна оцінка, не фізичне вимірювання.`, "good");
  }

  function resetModel() {
    $("#wingInput").value = "16";
    $("#weightInput").value = "2";
    $("#angleInput").value = "8";
    $("#launchInput").value = "6";
    renderFlight(false);
    setStatus("Модель повернуто до базових параметрів. Зміни один параметр і запусти планер.");
  }

  function selectConcept(key) {
    if (!concepts[key]) return;
    state.concept = key;
    $$(".concept-card").forEach(button => {
      const active = button.dataset.concept === key;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const concept = concepts[key];
    $("#labTitle").textContent = concept.title;
    $("#labDescription").textContent = concept.description;
    const note = $("#conceptNote").lastElementChild;
    note.replaceChildren();
    const strong = document.createElement("strong");
    strong.textContent = "Пам’ятай: ";
    note.append(strong, document.createTextNode(concept.note));
    setStatus(concept.status);
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
    $("#claimReward").textContent = "Отримати зірочки ✦";
    $("#rewardNote").textContent = "Зірочки нараховуються один раз за завершену спробу.";
    renderQuestion();
  }

  function renderQuestion() {
    const set = questions[state.level];
    const question = set[state.questionIndex];
    state.answered = false;
    $("#questionCounter").textContent = `Запитання ${state.questionIndex + 1} із ${set.length}`;
    $("#correctCounter").textContent = String(state.correct);
    $("#questionNumber").textContent = String(state.questionIndex + 1).padStart(2, "0");
    $("#questionText").textContent = question.q;
    $("#progressFill").style.width = `${Math.round(state.questionIndex / set.length * 100)}%`;
    $("#progressTrack").setAttribute("aria-valuenow", String(Math.round(state.questionIndex / set.length * 100)));
    $("#feedbackBox").hidden = true;
    $("#feedbackBox").className = "feedback-box";
    $("#nextQuestion").disabled = true;
    $("#nextQuestion").innerHTML = state.questionIndex === set.length - 1 ? "Побачити результат <span aria-hidden=\"true\">→</span>" : "Наступне <span aria-hidden=\"true\">→</span>";
    const list = $("#answerList");
    list.replaceChildren();
    question.a.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-option";
      button.setAttribute("aria-label", `Варіант ${String.fromCharCode(65 + index)}: ${answer}`);
      const letter = document.createElement("span");
      letter.className = "answer-letter";
      letter.textContent = String.fromCharCode(65 + index);
      const text = document.createElement("span");
      text.textContent = answer;
      button.append(letter, text);
      button.addEventListener("click", () => answerQuestion(index));
      list.append(button);
    });
  }

  function answerQuestion(index) {
    if (state.answered || state.completed) return;
    const question = questions[state.level][state.questionIndex];
    if (!Number.isInteger(index) || index < 0 || index >= question.a.length) return;
    state.answered = true;
    const correct = index === question.correct;
    if (correct) state.correct++;
    $$("#answerList button").forEach((button, i) => {
      button.disabled = true;
      if (i === question.correct) button.classList.add("is-correct");
      if (i === index && !correct) button.classList.add("is-wrong");
    });
    $("#correctCounter").textContent = String(state.correct);
    const feedback = $("#feedbackBox");
    feedback.hidden = false;
    feedback.className = `feedback-box ${correct ? "good" : "bad"}`;
    const heading = document.createElement("strong");
    heading.textContent = correct ? "Правильно! " : "Пояснення: ";
    feedback.replaceChildren(heading, document.createTextNode(question.why));
    $("#nextQuestion").disabled = false;
    const progress = Math.round((state.questionIndex + 1) / questions[state.level].length * 100);
    $("#progressFill").style.width = `${progress}%`;
    $("#progressTrack").setAttribute("aria-valuenow", String(progress));
  }

  function showResult() {
    if (!state.answered || state.completed) return;
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
      $("#resultMessage").textContent = "Ти мислиш як справжній інженер: розумієш сили, баланс і принцип контрольованого експерименту.";
    } else if (percent >= 75) {
      $("#resultTitle").textContent = "Чудова робота!";
      $("#resultMessage").textContent = "Ти добре засвоїв основи аеродинаміки. Переглянь пояснення до відповідей і спробуй ще один експеримент.";
    } else if (percent >= 50) {
      $("#resultTitle").textContent = "Гарний початок!";
      $("#resultMessage").textContent = "Повтори шпаргалку про підйомну силу, опір повітря та баланс планера, а потім спробуй знову.";
    } else {
      $("#resultTitle").textContent = "Час для нового досліду!";
      $("#resultMessage").textContent = "Повернися до карток понять і моделі планера. Крок за кроком ти зможеш пояснити результати.";
    }
    $("#claimReward").disabled = false;
    $("#claimReward").textContent = "Отримати зірочки ✦";
    $("#rewardNote").textContent = "Зірочки нараховуються один раз за завершену спробу.";
    $("#quizResult").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function claimReward() {
    if (!state.completed || state.claimed) return;
    state.claimed = true;
    const reward = rewardByLevel[state.level];
    state.stars += reward;
    $("#starBalance").textContent = `${state.stars} зірочок`;
    $("#claimReward").disabled = true;
    $("#claimReward").textContent = "Зірочки отримано ✓";
    $("#rewardNote").textContent = `+${reward} зірочок додано до балансу цього уроку. Разом: ${state.stars}.`;
  }

  $$(".concept-card").forEach(button => button.addEventListener("click", () => selectConcept(button.dataset.concept)));
  $$(".level-card").forEach(button => button.addEventListener("click", () => chooseLevel(button.dataset.level)));
  ["wingInput", "weightInput", "angleInput", "launchInput"].forEach(id => $(`#${id}`).addEventListener("input", () => { renderFlight(false); setStatus("Параметр змінено. Натисни «Запустити планер», щоб зафіксувати прогноз."); }));
  $("#launchGlider").addEventListener("click", launchGlider);
  $("#resetCalculation").addEventListener("click", resetModel);
  $("#resetModel").addEventListener("click", resetModel);
  $("#nextQuestion").addEventListener("click", () => {
    if (!state.answered || state.completed) return;
    if (state.questionIndex < questions[state.level].length - 1) { state.questionIndex++; renderQuestion(); }
    else showResult();
  });
  $("#claimReward").addEventListener("click", claimReward);
  $("#retryQuiz").addEventListener("click", startQuiz);

  renderFlight(false);
  selectConcept("lift");
  startQuiz();
})();
