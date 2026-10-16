(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const concepts = {
    reservoir: { title: "Резервуар: запас води", description: "Резервуар зберігає воду, яка поступово надходить до ґрунту через ґніт. Коли запас закінчується, систему потрібно поповнити.", note: "Резервуар не створює воду — перевіряй його рівень і доливай воду за потреби.", status: "Поспостерігай, як рівень резервуара впливає на полив." },
    wick: { title: "Ґніт: водний місточок", description: "Пористий шнур або смужка тканини з'єднує воду в резервуарі з ґрунтом. Вода може рухатися між волокнами завдяки капілярним явищам.", note: "Ґніт має торкатися води з одного боку, а іншого — ґрунту. Сухий або перерваний ґніт може погіршити подачу води.", status: "Зміни силу ґнота й порівняй результат моделі." },
    soil: { title: "Вологість ґрунту", description: "Вологість показує, скільки води міститься в ґрунті. Рослинам потрібна вода, але надмірний полив теж може зашкодити корінню.", note: "Мета — підтримувати достатню вологість, а не заливати ґрунт без зупинки.", status: "Порівняй початкову вологість і результат після поливу." },
    capillary: { title: "Капілярність: рух води", description: "У вузьких проміжках між волокнами ґнота вода може просуватися далі. Це один із фізичних принципів, який використовують у простих системах автополиву.", note: "Реальний результат залежить від матеріалу, довжини ґнота, висоти резервуара, ґрунту й умов довкілля.", status: "Перевір, як зміна сили ґнота впливає на модельований перенос води." }
  };
  const levelNames = { easy: "Простий рівень", medium: "Середній рівень", hard: "Складний рівень" };
  const rewardByLevel = { easy: 10, medium: 15, hard: 20 };
  const questions = {
    easy: [
      { q: "Для чого потрібен резервуар у мінісистемі автополиву?", a: ["Щоб вимірювати висоту рослини", "Щоб зберігати запас води", "Щоб нагрівати ґрунт", "Щоб утворювати добриво"], correct: 1, why: "Резервуар — це ємність із запасом води, звідки вона поступово надходить до рослини." },
      { q: "Яка деталь може переносити воду з резервуара до ґрунту?", a: ["Пластикова етикетка", "Сухе каміння", "Ґніт із пористого шнура", "Кришка горщика"], correct: 2, why: "Пористі волокна ґнота допомагають воді рухатися від резервуара до ґрунту." },
      { q: "Що означає вологість ґрунту?", a: ["Кількість води, що міститься в ґрунті", "Розмір горщика", "Колір листя", "Температура повітря"], correct: 0, why: "Вологість описує вміст води в ґрунті й допомагає оцінити, чи потрібен полив." },
      { q: "Що станеться, якщо резервуар повністю спорожніє?", a: ["Рослина почне виробляти воду", "Ґніт стане довшим", "Ґрунт завжди буде мокрим", "Подача води поступово припиниться"], correct: 3, why: "Система може переносити лише ту воду, яка є в резервуарі. Його потрібно поповнити." }
    ],
    medium: [
      { q: "У резервуарі є вода, але ґніт не торкається її поверхні. Який результат найімовірніший?", a: ["Вода миттєво заповнить горщик", "Перенесення води ґнотом буде порушене", "Ґніт самостійно виросте", "Рівень води збільшиться"], correct: 1, why: "Для перенесення води ґніт має контактувати з водою. Якщо контакт втрачено, шлях переривається." },
      { q: "Чому для системи часто обирають пористий бавовняний шнур?", a: ["Він перетворює воду на повітря", "Він не потребує контакту з водою", "Вода може рухатися між його волокнами", "Він вимірює кислотність ґрунту"], correct: 2, why: "Проміжки між волокнами допомагають воді просуватися по ґноту завдяки капілярним явищам." },
      { q: "Ґрунт уже дуже вологий. Яка дія найрозумніша під час налаштування системи?", a: ["Не збільшувати полив без потреби й спостерігати", "Додати якомога більше води", "Вилити воду на листя", "Зробити резервуар бездонним"], correct: 0, why: "Рослинам потрібна вода, але надлишок може погіршити доступ повітря до коріння. Полив налаштовують за потребою." },
      { q: "Яке спостереження допоможе оцінити роботу автополиву?", a: ["Колір стіни кімнати", "Кількість книжок поруч", "Гучність музики", "Зміна вологості ґрунту та рівня води"], correct: 3, why: "Ці два показники показують, чи витрачається вода та чи змінюється вологість ґрунту." },
      { q: "Як можна перевірити, чи впливає тип ґнота на полив?", a: ["Змінити одночасно всі умови", "Порівняти різні ґноти за однакових інших умов", "Не спостерігати за результатом", "Використати порожній резервуар"], correct: 1, why: "Щоб зрозуміти вплив одного чинника, змінюй його, а інші умови намагайся залишити однаковими." },
      { q: "Чому мінісистема автополиву може допомогти економити воду?", a: ["Вона робить воду нескінченною", "Вона не використовує воду", "Вода може надходити поступово, а не одразу великою порцією", "Вона замінює ґрунт"], correct: 2, why: "Поступова подача може зменшити зайве разове зволоження, якщо система правильно підібрана й перевіряється." }
    ],
    hard: [
      { q: "Після досліду ґрунт майже не зволожився, хоча в резервуарі є вода. Що варто перевірити насамперед?", a: ["Чи торкається ґніт води й ґрунту та чи підходить його матеріал", "Чи має горщик яскраву наліпку", "Чи достатньо великий напис на резервуарі", "Чи стоїть поруч олівець"], correct: 0, why: "Насамперед перевіряють безперервність контакту ґнота з водою та ґрунтом, а також його здатність переносити воду." },
      { q: "Учень хоче з'ясувати, чи впливає довжина ґнота на швидкість поливу. Як організувати чесний дослід?", a: ["Змінювати довжину, тип ґрунту й рівень води одночасно", "Використати різні рослини без вимірювань", "Зробити один дослід і вгадати результат", "Змінювати лише довжину ґнота, зберігаючи інші умови однаковими"], correct: 3, why: "Контрольоване дослідження змінює один чинник за раз, щоб було легше визначити його вплив." },
      { q: "Резервуар має 60% води. За один модельний цикл система використовує 15% початкової повної місткості. Скільки залишиться після одного циклу?", a: ["75%", "45%", "15%", "60%"], correct: 1, why: "Віднімаємо витрату від наявного рівня: 60% − 15% = 45%. Це умовні дані навчальної задачі." },
      { q: "Який висновок найточніше описує обмеження системи з ґнотом?", a: ["Вона працює однаково в будь-яких умовах", "Вона ніколи не потребує перевірки", "Швидкість подачі залежить від ґнота, висоти, ґрунту та інших умов", "Вона може поливати без води"], correct: 2, why: "Реальна робота залежить від кількох чинників, тому систему потрібно випробувати й підлаштувати до рослини." },
      { q: "У ґрунті постійно стоїть вода, а рослина виглядає млявою. Яке рішення найбільш обґрунтоване?", a: ["Перевірити дренаж і зменшити подачу води", "Збільшити подачу вдвічі", "Закрити всі отвори горщика назавжди", "Долити воду до краю"], correct: 0, why: "Перезволоження може шкодити корінню. Варто перевірити дренаж і зменшити полив, а не додавати воду автоматично." },
      { q: "Чому модель у браузері не може точно передбачити полив кожної реальної рослини?", a: ["У рослин немає потреби у воді", "Усі ґноти однакові", "Вода не рухається в матеріалах", "Модель спрощує реальні умови й не враховує всі властивості рослини та середовища"], correct: 3, why: "Навчальна модель показує принцип, але реальний результат залежить від матеріалів, виду рослини, температури, вологості й інших умов." },
      { q: "Який дизайн найкраще відповідає принципу ощадного використання ресурсів?", a: ["Завжди подавати максимальну кількість води", "Вимірювати вологість і налаштовувати подачу за потребою", "Не перевіряти резервуар", "Поливати навіть коли ґрунт мокрий"], correct: 1, why: "Екоінженерний підхід враховує потребу рослини та допомагає уникати непотрібних витрат води." },
      { q: "Після зміни ґнота вода надходить швидше. Який наступний крок дослідника найкращий?", a: ["Одразу оголосити, що цей ґніт ідеальний для всіх рослин", "Припинити будь-які спостереження", "Повторити вимірювання й перевірити, чи не перезволожується ґрунт", "Викинути резервуар"], correct: 2, why: "Потрібно повторити дослід, оцінити сталість результату й перевірити, чи відповідає швидкість подачі потребам рослини." }
    ]
  };

  const state = { concept: "reservoir", level: "easy", moisture: 35, wick: 2, reservoir: 80, cycles: 0, stars: 0, questionIndex: 0, correct: 0, answered: false, completed: false, claimed: false, runToken: 0 };
  const wickLabels = { 1: "Повільна", 2: "Середня", 3: "Швидка" };
  const $id = id => document.getElementById(id);
  function setStatus(message, kind = "neutral") {
    const status = $id("modelStatus"); if (!status) return;
    status.replaceChildren(); const dot = document.createElement("span"); dot.className = "status-dot";
    if (kind === "good") dot.style.background = "var(--green)"; if (kind === "bad") dot.style.background = "var(--red)";
    const text = document.createElement("span"); text.textContent = message; status.append(dot, text);
  }
  function renderModel() {
    $id("tankWater").style.height = `${state.reservoir}%`; $id("waterLevelLabel").textContent = `Води: ${state.reservoir}%`;
    $id("reservoirValue").textContent = `${state.reservoir}%`; $id("moistureValue").textContent = `${state.moisture}%`;
    $id("wickValue").textContent = wickLabels[state.wick]; $id("waterCycleCount").textContent = `${state.cycles} ${state.cycles === 1 ? "цикл" : state.cycles >= 2 && state.cycles <= 4 ? "цикли" : "циклів"}`;
    $id("soilMoisture").style.height = `${state.moisture}%`; $id("soilMoisture").style.background = state.moisture > 75 ? "rgba(55,142,192,.85)" : "rgba(75,175,220,.65)";
    $id("soilFace").textContent = state.moisture > 75 ? "● ● ● ●" : state.moisture > 40 ? "● ● ●" : "● ●";
    $id("wickLine").style.opacity = state.reservoir === 0 ? ".35" : String(.55 + state.wick * .15);
    $id("waterStageBadge").textContent = state.reservoir === 0 ? "Резервуар порожній" : `Ґніт: ${wickLabels[state.wick].toLowerCase()}`;
  }
  function selectConcept(key) {
    if (!concepts[key]) return; state.concept = key;
    $$(".concept-card").forEach(button => { const active = button.dataset.concept === key; button.classList.toggle("is-active", active); button.setAttribute("aria-pressed", String(active)); });
    $id("labTitle").textContent = concepts[key].title; $id("labDescription").textContent = concepts[key].description;
    const note = $id("conceptNote").querySelector("p"); note.replaceChildren(); const strong = document.createElement("strong"); strong.textContent = "Пам’ятай: "; note.append(strong, document.createTextNode(concepts[key].note)); setStatus(concepts[key].status);
  }
  function syncControls() { $id("initialMoisture").value = state.moisture; $id("wickStrength").value = state.wick; $id("reservoirLevel").value = state.reservoir; renderModel(); }
  function runWatering() {
    state.runToken++; if (state.reservoir <= 0) { setStatus("Резервуар порожній. Долий воду перед запуском.", "bad"); return; }
    const starting = state.moisture; const gain = Math.min(100 - state.moisture, Math.round(state.wick * 8 + Math.max(0, 45 - state.moisture) / 5));
    const used = Math.min(state.reservoir, Math.max(5, state.wick * 5)); state.moisture = Math.min(100, state.moisture + gain); state.reservoir -= used; state.cycles++; syncControls();
    if (state.moisture >= 85) setStatus(`Вологість зросла з ${starting}% до ${state.moisture}%. Увага: перевір, чи ґрунт не надто мокрий.`, "bad");
    else if (state.moisture > starting) setStatus(`Полив завершено: вологість зросла з ${starting}% до ${state.moisture}%, резервуар — ${state.reservoir}%.`, "good");
    else setStatus("Вологість уже максимальна в цій моделі. Спостерігай і не додавай зайву воду.");
  }
  function resetModel() { state.runToken++; state.moisture = 35; state.wick = 2; state.reservoir = 80; state.cycles = 0; syncControls(); setStatus("Модель скинуто. Зміни параметри й запусти полив."); }
  function chooseLevel(level) {
    if (!questions[level]) return; state.level = level;
    $$(".level-card").forEach(button => { const active = button.dataset.level === level; button.classList.toggle("is-selected", active); button.setAttribute("aria-pressed", String(active)); });
    $id("quizLevelLabel").textContent = levelNames[level]; startQuiz();
  }
  function startQuiz() { state.questionIndex = 0; state.correct = 0; state.answered = false; state.completed = false; state.claimed = false; $id("quizActive").hidden = false; $id("quizResult").hidden = true; $id("rewardNote").textContent = "Зірочки нараховуються один раз за завершену спробу."; renderQuestion(); }
  function renderQuestion() {
    const set = questions[state.level], question = set[state.questionIndex]; state.answered = false;
    $id("questionCounter").textContent = `Запитання ${state.questionIndex + 1} із ${set.length}`; $id("correctCounter").textContent = String(state.correct); $id("questionNumber").textContent = String(state.questionIndex + 1).padStart(2, "0"); $id("questionText").textContent = question.q; $id("progressFill").style.width = `${((state.questionIndex + 1) / set.length) * 100}%`;
    const feedback = $id("feedbackBox"); feedback.hidden = true; feedback.className = "feedback-box"; $id("nextQuestion").disabled = true; $id("nextQuestion").innerHTML = state.questionIndex === set.length - 1 ? 'Побачити результат <span aria-hidden="true">→</span>' : 'Наступне <span aria-hidden="true">→</span>';
    const list = $id("answerList"); list.replaceChildren(); question.a.forEach((answer, index) => { const button = document.createElement("button"); button.type = "button"; button.className = "answer-option"; const letter = document.createElement("span"); letter.className = "answer-letter"; letter.textContent = String.fromCharCode(65 + index); const text = document.createElement("span"); text.textContent = answer; button.append(letter, text); button.addEventListener("click", () => selectAnswer(index)); list.append(button); });
  }
  function selectAnswer(index) {
    if (state.answered) return; state.answered = true; const question = questions[state.level][state.questionIndex]; const buttons = $$(".answer-option");
    buttons.forEach((button, i) => { button.disabled = true; if (i === question.correct) button.classList.add("is-correct"); if (i === index && index !== question.correct) button.classList.add("is-wrong"); });
    const isCorrect = index === question.correct; if (isCorrect) state.correct++; $id("correctCounter").textContent = String(state.correct);
    const feedback = $id("feedbackBox"); feedback.hidden = false; feedback.className = `feedback-box ${isCorrect ? "good" : "bad"}`; const title = document.createElement("strong"); title.textContent = isCorrect ? "Правильно! " : "Спробуй розібратися. "; feedback.replaceChildren(title, document.createTextNode(question.why)); $id("nextQuestion").disabled = false;
  }
  function showResult() {
    state.completed = true; $id("quizActive").hidden = true; $id("quizResult").hidden = false; const total = questions[state.level].length; const percent = Math.round(state.correct / total * 100);
$id("finalCorrect").textContent = `${state.correct}/${total}`; $id("finalPercent").textContent = `${percent}%`; $id("earnedStars").textContent = `+${rewardByLevel[state.level]}`;
    if (percent === 100) { $id("resultTitle").textContent = "Безпомилково! 🌟"; $id("resultMessage").textContent = "Ти чудово розумієш принципи мінісистеми автополиву й мислиш як екоінженер."; }
    else if (percent >= 70) { $id("resultTitle").textContent = "Чудова робота!"; $id("resultMessage").textContent = "Ти добре засвоїв матеріал. Переглянь пояснення до помилок і продовжуй дослідження."; }
    else if (percent >= 40) { $id("resultTitle").textContent = "Гарний початок!"; $id("resultMessage").textContent = "Ти вже розумієш основи. Повтори шпаргалку та спробуй ще раз."; }
    else { $id("resultTitle").textContent = "Час для нового досліду!"; $id("resultMessage").textContent = "Повернися до понять, досліди модель і спробуй тест ще раз — кожна спроба допомагає."; }
    $id("claimReward").disabled = false; $id("claimReward").innerHTML = 'Отримати зірочки <span aria-hidden="true">✦</span>'; $id("rewardNote").textContent = "Зірочки нараховуються один раз за завершену спробу.";
  
    // Єдине нарахування комп’юшок: результат обробляється після відображення підсумку.
    Promise.resolve().then(() => {
      const scorePercent = typeof percent !== 'undefined' ? percent : (typeof pct !== 'undefined' ? pct : 0);
      const rewardResult = window.LearningGamification?.awardTestResult("automatic-plant-watering-system", scorePercent, state.level);
      const claimButton = document.getElementById('claimReward');
      if (claimButton) claimButton.hidden = true;
      const starLabel = document.getElementById('earnedStars');
      if (starLabel) starLabel.textContent = rewardResult?.passed ? `🪙 ${rewardResult.coinsAwarded} комп’юшок` : 'Потрібно 70% для винагороди';
      const note = document.getElementById('rewardNote');
      if (note) note.textContent = rewardResult?.message || 'Комп’юшки нараховуються автоматично після тесту.';
    });
}
function claimReward() { if (!state.completed || state.claimed) return; state.claimed = true; const reward = rewardByLevel[state.level]; state.stars += reward; $id("claimReward").disabled = true; $id("claimReward").textContent = "Зірочки отримано ✓"; $id("rewardNote").textContent = `+${reward} зірочок додано до балансу цього уроку. Разом отримано: ${state.stars}.`; }

  $$(".concept-card").forEach(button => button.addEventListener("click", () => selectConcept(button.dataset.concept)));
  $id("initialMoisture").addEventListener("input", event => { state.moisture = Number(event.currentTarget.value); renderModel(); setStatus("Початкову вологість змінено. Запусти полив, щоб побачити результат."); });
  $id("wickStrength").addEventListener("input", event => { state.wick = Number(event.currentTarget.value); renderModel(); setStatus(`Силу ґнота змінено: ${wickLabels[state.wick].toLowerCase()}.`); });
  $id("reservoirLevel").addEventListener("input", event => { state.reservoir = Number(event.currentTarget.value); renderModel(); setStatus("Рівень води змінено. Перевір, чи вистачить запасу для поливу."); });
  $id("runProgram").addEventListener("click", runWatering); $id("resetModel").addEventListener("click", resetModel); $id("resetModelTop").addEventListener("click", resetModel);
  $id("drySoil").addEventListener("click", () => { state.moisture = Math.max(0, state.moisture - 20); syncControls(); setStatus("Змодельовано висихання: вологість зменшилася на 20 відсоткових пунктів. Спробуй знову запустити полив."); });
  $$(".level-card").forEach(button => button.addEventListener("click", () => chooseLevel(button.dataset.level)));
  $id("nextQuestion").addEventListener("click", () => { if (!state.answered) return; if (state.questionIndex < questions[state.level].length - 1) { state.questionIndex++; renderQuestion(); } else showResult(); });
  $id("claimReward").addEventListener("click", claimReward); $id("retryQuiz").addEventListener("click", startQuiz);
  selectConcept("reservoir"); renderModel(); startQuiz();
})();
