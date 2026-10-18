(() => {
  "use strict";

  const conceptData = {
    slide: {
      title: "Слайд",
      description: "Слайд — це окрема сторінка презентації. Кілька слайдів разом розповідають історію або пояснюють тему.",
      heading: "Світ навколо нас",
      subheading: "Цікаві факти, які варто знати",
      hint: "Кожен слайд — одна частина твоєї розповіді."
    },
    text: {
      title: "Текст",
      description: "Текст допомагає пояснити головну думку. Використовуй короткі речення, зрозумілі заголовки та читабельний шрифт.",
      heading: "Три цікаві факти",
      subheading: "Коротко, зрозуміло, по суті",
      hint: "Заголовок має підказувати, про що цей слайд."
    },
    image: {
      title: "Зображення",
      description: "Фото, малюнки та схеми роблять пояснення наочним. Обирай зображення, яке справді стосується теми.",
      heading: "Побачити й зрозуміти",
      subheading: "Ілюстрація доповнює головну думку",
      hint: "Добре підібрана ілюстрація підтримує зміст, а не відволікає."
    },
    design: {
      title: "Дизайн",
      description: "Дизайн об’єднує кольори, шрифти та розташування елементів. Єдиний стиль допомагає аудиторії зосередитися на змісті.",
      heading: "Усе в одному стилі",
      subheading: "Кольори та елементи гармонійно поєднані",
      hint: "Використовуй послідовні кольори й оформлення на всіх слайдах."
    }
  };

  const slideSamples = [
    {heading: "Світ навколо нас", subheading: "Цікаві факти, які варто знати", kicker: "МОЯ ПРЕЗЕНТАЦІЯ"},
    {heading: "Три цікаві факти", subheading: "Коротко, зрозуміло, по суті", kicker: "ДІЗНАЙСЯ БІЛЬШЕ"},
    {heading: "Бережімо природу", subheading: "Маленькі кроки мають значення", kicker: "ДІЙМО РАЗОМ"}
  ];

  const questionSets = {
    easy: [
      {q:"Що таке комп’ютерна презентація?",a:["Набір слайдів для подання інформації","Комп’ютерна гра","Список файлів у папці","Програма для малювання лише ліній"],correct:0,why:"Презентація — це послідовність слайдів, за допомогою яких подають інформацію."},
      {q:"Як називається одна сторінка презентації?",a:["Аркуш паперу","Слайд","Папка","Команда"],correct:1,why:"Окрема сторінка електронної презентації називається слайдом."},
      {q:"Що найкраще додати до слайда про тварин?",a:["Довгий текст без абзаців","Багато випадкових кольорів","Доречне фото тварини","Десять різних шрифтів"],correct:2,why:"Доречне зображення допомагає краще зрозуміти тему слайда."},
      {q:"Яким має бути текст на слайді?",a:["Дуже дрібним","Повністю скопійованою книжковою сторінкою","Без заголовка й абзаців","Коротким і читабельним"],correct:3,why:"Короткий текст і читабельний шрифт дають змогу швидко зрозуміти головну думку."}
    ],
    medium: [
      {q:"Ти готуєш презентацію про планети. Яка послідовність слайдів найзрозуміліша?",a:["Випадкові факти без порядку","Титульний слайд, планети, підсумок","Усі факти на першому слайді","Спочатку підсумок, потім випадкові картинки"],correct:1,why:"Послідовність із початком, основною частиною та підсумком допомагає слухачам стежити за розповіддю."},
      {q:"На слайді важко читати текст через колір. Що варто зробити?",a:["Зробити текст ще меншим","Додати ще кілька кольорів","Збільшити контраст тексту й тла","Приховати заголовок"],correct:2,why:"Достатній контраст між текстом і фоном покращує читабельність."},
      {q:"Яке зображення найкраще підійде до слайда про кругообіг води?",a:["Схема випаровування, хмар і опадів","Фото клавіатури","Випадковий смайлик","Картинка, яку не видно через текст"],correct:0,why:"Схема прямо пояснює процес і пов’язана з темою слайда."},
      {q:"Навіщо використовують заголовки слайдів?",a:["Щоб заповнити вільне місце","Щоб зробити всі слова великими","Щоб замінити всі зображення","Щоб показати головну тему слайда"],correct:3,why:"Заголовок одразу повідомляє, про що йтиметься на слайді."},
      {q:"У презентації кожен слайд має інші шрифти й кольори. Як покращити дизайн?",a:["Додати ще більше стилів","Використати узгоджені кольори та шрифти","Прибрати всі відступи","Зробити весь текст курсивом"],correct:1,why:"Послідовний стиль робить презентацію охайною та допомагає зосередитися на змісті."},
      {q:"Що важливо зробити перед показом презентації?",a:["Видалити титульний слайд","Додати якомога більше анімацій","Переглянути слайди й перевірити помилки","Зробити всі зображення однаковими"],correct:2,why:"Попередній перегляд допомагає знайти помилки, незручне розташування елементів і проблеми читабельності."}
    ],
    hard: [
      {q:"На слайді про безпеку в інтернеті 120 слів і маленька картинка. Яке покращення найдоречніше?",a:["Збільшити кількість тексту","Зробити всі слова жирними","Зменшити заголовок до кількох пікселів","Залишити головні правила короткими тезами й додати зрозумілу ілюстрацію"],correct:3,why:"Стислий текст і доречна ілюстрація допомагають аудиторії швидко побачити головне."},
      {q:"Тло слайда світло-жовте, а текст — білий. Що зробити насамперед?",a:["Змінити колір тексту або тла для кращого контрасту","Додати рухомий фон","Зробити текст тоншим","Розмістити текст поверх візерунка"],correct:0,why:"Насамперед слід забезпечити контраст, щоб текст було легко читати."},
      {q:"Ти показуєш результати опитування класу. Який спосіб подання допоможе порівняти відповіді?",a:["Абзац без чисел","Декоративний фон","Проста діаграма з підписами","Випадкова фотографія"],correct:2,why:"Діаграма допомагає швидко порівняти кількості, якщо дані мають чіткі підписи."},
      {q:"Чому не варто додавати перехідний ефект до кожного об’єкта?",a:["Бо презентація не може мати кольорів","Бо надмірні ефекти відволікають від змісту","Бо заголовки завжди заборонені","Бо зображення не можна використовувати"],correct:1,why:"Анімація має допомагати поясненню. Надлишок ефектів відволікає аудиторію."},
      {q:"У двох слайдах однаковий заголовок, але різні теми. Як краще вчинити?",a:["Залишити обидва без змін","Прибрати весь текст","Додати третій однаковий заголовок","Зробити заголовки точними й відповідними до змісту"],correct:3,why:"Змістовні заголовки допомагають аудиторії орієнтуватися в презентації."},
      {q:"На слайді є фото з дрібним підписом, який перекривається зображенням. Що найкраще зробити?",a:["Пересунути або змінити розмір елементів, щоб підпис читався","Залишити як є","Додати ще один підпис поверх першого","Зробити підпис такого самого кольору, як фон"],correct:0,why:"Елементи мають бути розміщені так, щоб не перекривати один одного й залишатися читабельними."},
      {q:"Який план найкраще підійде для короткої навчальної презентації?",a:["Тільки яскраві картинки без пояснень","Усі нотатки доповідача на одному слайді","Тема, кілька впорядкованих основних думок, висновок","Випадкові слайди без спільної теми"],correct:2,why:"Чітка структура допомагає передати тему, пояснити основні думки та завершити розповідь."},
      {q:"Після створення презентації ти помітив, що на одному слайді шрифт не такий, як на інших. Що найкраще зробити?",a:["Змінити всі слайди випадково","Узгодити шрифт із загальним стилем і переглянути результат","Додати тінь до кожного слова","Видалити всі заголовки"],correct:1,why:"Єдиний стиль робить презентацію послідовною. Після виправлення варто переглянути слайди ще раз."}
    ]
  };

  const $ = (selector) => document.querySelector(selector);
  const conceptGrid = $("#concept-grid");
  const modelTitle = $("#model-title");
  const modelDescription = $("#model-description");
  const slideCanvas = $("#slide-canvas");
  const canvasHeading = $("#canvas-heading");
  const canvasSubheading = $("#canvas-subheading");
  const stageHint = $("#stage-hint");
  const layoutSelect = $("#layout-select");
  const themeSelect = $("#theme-select");
  const showGuides = $("#show-guides");
  const prevSlide = $("#prev-slide");
  const nextSlide = $("#next-slide");
  const progressDots = [...document.querySelectorAll(".progress-dot")];
  const levelButtons = [...document.querySelectorAll(".level-card")];
  const quizActive = $("#quiz-active");
  const quizResult = $("#quiz-result");
  const questionText = $("#question-text");
  const answerList = $("#answer-list");
  const answerFeedback = $("#answer-feedback");
  const nextQuestion = $("#next-question");

  let activeConcept = "slide";
  let slideIndex = 0;
  let activeLevel = "easy";
  let questionIndex = 0;
  let correctCount = 0;
  let answered = false;
  let finished = false;

  function renderConcept(key) {
    const data = conceptData[key];
    if (!data) return;
    activeConcept = key;
    conceptGrid.querySelectorAll("[data-concept]").forEach((button) => {
      const selected = button.dataset.concept === key;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    modelTitle.textContent = data.title;
    modelDescription.textContent = data.description;
    stageHint.textContent = data.hint;
    renderSlide();
  }

  function renderSlide() {
    const sample = slideSamples[slideIndex];
    canvasHeading.textContent = activeConcept === "slide" ? sample.heading : conceptData[activeConcept].heading;
    canvasSubheading.textContent = activeConcept === "slide" ? sample.subheading : conceptData[activeConcept].subheading;
    $(".canvas-kicker").textContent = sample.kicker;
    slideCanvas.classList.remove("layout-title", "layout-text", "layout-image", "theme-violet", "theme-ocean", "theme-sunset");
    slideCanvas.classList.add(`layout-${layoutSelect.value}`, `theme-${themeSelect.value}`);
    slideCanvas.classList.toggle("guides-hidden", !showGuides.checked);
    $("#slide-counter").textContent = `Слайд ${slideIndex + 1} з ${slideSamples.length}`;
    progressDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === slideIndex);
      dot.setAttribute("aria-current", index === slideIndex ? "step" : "false");
    });
    prevSlide.disabled = slideIndex === 0;
    nextSlide.disabled = slideIndex === slideSamples.length - 1;
  }

  function resetModel() {
    slideIndex = 0;
    layoutSelect.value = "title";
    themeSelect.value = "violet";
    showGuides.checked = true;
    renderConcept("slide");
    renderSlide();
  }

  function renderQuestion() {
    const questions = questionSets[activeLevel];
    const question = questions[questionIndex];
    answered = false;
    finished = false;
    quizActive.hidden = false;
    quizResult.hidden = true;
    questionText.textContent = question.q;
    $("#question-counter").textContent = `Запитання ${questionIndex + 1} з ${questions.length}`;
    $("#progress-percent").textContent = `${Math.round(questionIndex / questions.length * 100)}%`;
    $("#quiz-progress-fill").style.width = `${questionIndex / questions.length * 100}%`;
    $("#score-label").textContent = `Правильних: ${correctCount}`;
    $("#quiz-note").textContent = "Обери одну відповідь";
    answerFeedback.hidden = true;
    answerFeedback.textContent = "";
    answerFeedback.className = "answer-feedback";
    answerList.replaceChildren();
    const letters = ["А", "Б", "В", "Г"];
    question.a.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-option";
      const letter = document.createElement("span");
      letter.className = "answer-letter";
      letter.textContent = letters[index];
      const text = document.createElement("span");
      text.textContent = answer;
      button.append(letter, text);
      button.addEventListener("click", () => selectAnswer(index));
      answerList.append(button);
    });
    nextQuestion.disabled = true;
    nextQuestion.innerHTML = questionIndex === questions.length - 1 ? 'Побачити результат <span aria-hidden="true">→</span>' : 'Наступне запитання <span aria-hidden="true">→</span>';
  }

  function selectAnswer(selectedIndex) {
    if (answered || finished) return;
    const question = questionSets[activeLevel][questionIndex];
    answered = true;
    const buttons = [...answerList.querySelectorAll("button")];
    buttons.forEach((button, index) => {
      button.disabled = true;
      if (index === question.correct) button.classList.add("correct");
      if (index === selectedIndex && index !== question.correct) button.classList.add("incorrect");
    });
    const isCorrect = selectedIndex === question.correct;
    if (isCorrect) correctCount += 1;
    $("#score-label").textContent = `Правильних: ${correctCount}`;
    answerFeedback.hidden = false;
    answerFeedback.classList.add(isCorrect ? "good" : "bad");
    answerFeedback.textContent = `${isCorrect ? "Правильно!" : "Не зовсім."} ${question.why}`;
    $("#quiz-note").textContent = isCorrect ? "Чудово! Продовжуй." : "Запам’ятай пояснення й рухайся далі.";
    $("#progress-percent").textContent = `${Math.round((questionIndex + 1) / questionSets[activeLevel].length * 100)}%`;
    $("#quiz-progress-fill").style.width = `${(questionIndex + 1) / questionSets[activeLevel].length * 100}%`;
    nextQuestion.disabled = false;
  }

  function showResult() {
    finished = true;
    quizActive.hidden = true;
    quizResult.hidden = false;
    const total = questionSets[activeLevel].length;
    const percent = Math.round(correctCount / total * 100);
$("#result-score").textContent = `${correctCount}/${total}`;
    $("#result-percent").textContent = `${percent}%`;
    if (percent >= 85) {
      $("#result-illustration").textContent = "🎉";
      $("#result-title").textContent = "Чудова робота!";
      $("#result-message").textContent = "Ти добре розумієш, як створювати зрозумілі й охайні презентації. Продовжуй творити!";
    } else if (percent >= 60) {
      $("#result-illustration").textContent = "🌟";
      $("#result-title").textContent = "Гарний результат!";
      $("#result-message").textContent = "Ти вже знаєш основи. Переглянь шпаргалку й спробуй ще раз, щоб закріпити знання.";
    } else {
      $("#result-illustration").textContent = "🌱";
      $("#result-title").textContent = "Усе починається з практики!";
      $("#result-message").textContent = "Повтори основні правила та повернися до тесту. Кожна спроба допомагає навчитися нового.";
    }
    $("#progress-percent").textContent = "100%";
    $("#quiz-progress-fill").style.width = "100%";
  
    // Єдине нарахування комп’юшок: результат обробляється після відображення підсумку.
    Promise.resolve().then(async () => {
      const scorePercent = typeof percent !== 'undefined' ? percent : (typeof pct !== 'undefined' ? pct : 0);
      const rewardResult = await window.LearningGamification?.awardTestResult("computer-presentations", scorePercent, activeLevel);
      const claimButton = document.getElementById('claimReward');
      if (claimButton) claimButton.hidden = true;
      const starLabel = document.getElementById('earnedStars');
      if (starLabel) starLabel.textContent = rewardResult?.passed ? `🪙 ${rewardResult.coinsAwarded} комп’юшок` : 'Потрібно 70% для винагороди';
      const note = document.getElementById('rewardNote');
      if (note) note.textContent = rewardResult?.message || 'Комп’юшки нараховуються автоматично після тесту.';
    });
}
function advanceQuestion() {
    if (!answered || finished) return;
    if (questionIndex >= questionSets[activeLevel].length - 1) {
      showResult();
      return;
    }
    questionIndex += 1;
    renderQuestion();
  }

  function startQuiz(level = activeLevel) {
    activeLevel = level;
    questionIndex = 0;
    correctCount = 0;
    answered = false;
    finished = false;
    levelButtons.forEach((button) => {
      const selected = button.dataset.level === level;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    renderQuestion();
  }

  conceptGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-concept]");
    if (button) renderConcept(button.dataset.concept);
  });
  layoutSelect.addEventListener("change", renderSlide);
  themeSelect.addEventListener("change", renderSlide);
  showGuides.addEventListener("change", renderSlide);
  $("#reset-model").addEventListener("click", resetModel);
  prevSlide.addEventListener("click", () => { if (slideIndex > 0) { slideIndex -= 1; renderSlide(); } });
  nextSlide.addEventListener("click", () => { if (slideIndex < slideSamples.length - 1) { slideIndex += 1; renderSlide(); } });
  progressDots.forEach((dot) => dot.addEventListener("click", () => {
    const nextIndex = Number(dot.dataset.slide);
    if (Number.isInteger(nextIndex) && nextIndex >= 0 && nextIndex < slideSamples.length) {
      slideIndex = nextIndex;
      renderSlide();
    }
  }));
  levelButtons.forEach((button) => button.addEventListener("click", () => startQuiz(button.dataset.level)));
  nextQuestion.addEventListener("click", advanceQuestion);
  $("#restart-quiz").addEventListener("click", () => startQuiz(activeLevel));

  renderConcept(activeConcept);
  startQuiz("easy");
})();