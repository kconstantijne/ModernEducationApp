const concepts = {
  expression: {
    title: "Числовий вираз",
    description: "Числовий вираз складається з чисел, з'єднаних знаками арифметичних дій (+, -, *, /). Наприклад: 12 + 8.",
    draw: (val) => `
      <text x="350" y="90" fill="currentColor" font-size="28" font-weight="700" text-anchor="middle">${val} + 8</text>
      <text x="350" y="135" fill="var(--blue, #6486e9)" font-size="16" text-anchor="middle">Комбінація чисел та знаків дій</text>
    `
  },
  value: {
    title: "Значення виразу",
    description: "Якщо виконати всі арифметичні дії у числовому виразі, ми отримаємо одне число — значення виразу.",
    draw: (val) => {
      const res = val + 8;
      return `
        <text x="350" y="85" fill="currentColor" font-size="24" font-weight="700" text-anchor="middle">${val} + 8 = ${res}</text>
        <text x="350" y="130" fill="var(--blue, #6486e9)" font-size="16" text-anchor="middle">Значення виразу дорівнює ${res}</text>
      `;
    }
  },
  comparison: {
    title: "Порівняння виразів",
    description: "Щоб порівняти два вирази, спочатку обчисліть значення кожного з них, а потім порівняйте результати (<, >, =).",
    draw: (val) => {
      const leftVal = val + 5;
      const rightVal = 30;
      let sign = "=";
      if (leftVal > rightVal) sign = ">";
      else if (leftVal < rightVal) sign = "<";
      return `
        <text x="350" y="90" fill="currentColor" font-size="26" font-weight="700" text-anchor="middle">(${val} + 5) ${sign} 30</text>
        <text x="350" y="135" fill="var(--blue, #6486e9)" font-size="16" text-anchor="middle">${leftVal} ${sign} ${rightVal} — ${leftVal === rightVal ? 'вирази рівні' : leftVal > rightVal ? 'лівий вираз більший' : 'правий вираз більший'}</text>
      `;
    }
  }
};

let current = "expression", position = 12;
const svg = document.getElementById("geometrySvg"), slider = document.getElementById("positionSlider"), output = document.getElementById("positionOutput");

function draw() {
  const c = concepts[current];
  document.getElementById("modelTitle").textContent = c.title;
  document.getElementById("modelDescription").textContent = c.description;
  output.textContent = position;
  if(svg) {
    svg.innerHTML = `
      <defs>
        <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" opacity=".11"/>
        </pattern>
      </defs>
      <rect width="700" height="210" fill="url(#dots)"/>
      ${c.draw(position)}
    `;
  }
}

document.querySelectorAll("[data-concept]").forEach(btn => btn.addEventListener("click", () => {
  current = btn.dataset.concept;
  document.querySelectorAll("[data-concept]").forEach(b => b.classList.toggle("selected", b === btn));
  draw();
}));

if(slider) {
  slider.addEventListener("input", () => {
    position = Number(slider.value);
    draw();
  });
}

const resetBtn = document.getElementById("resetModel");
if(resetBtn) {
  resetBtn.addEventListener("click", () => {
    position = 12;
    if(slider) slider.value = 12;
    draw();
  });
}

draw();

const questions = [
  {
    q: "Який із наведених записів є числовим виразом?",
    a: ["x + 5", "18 - 4", "a > b"],
    correct: 1,
    why: "Правильно! Числовий вираз складається лише з чисел та знаків дій."
  },
  {
    q: "Чому дорівнює значення виразу 36 : 4 + 7?",
    a: ["12", "16", "18"],
    correct: 1,
    why: "Чудово! Спочатку ділимо 36 на 4 (отримуємо 9), а потім додаємо 7 (9 + 7 = 16)."
  },
  {
    q: "Який знак слід поставити між виразами: (12 + 8) ... (25 - 5)?",
    a: [">", "<", "="],
    correct: 2,
    why: "Вірно! 12 + 8 = 20, а 25 - 5 = 20. Оскільки 20 дорівнює 20, ставимо знак '='."
  }
];

let qi = 0, score = 0, answered = false;

function showQuestion() {
  answered = false;
  const q = questions[qi];
  const counterEl = document.getElementById("quizCounter");
  const qTextEl = document.getElementById("questionText");
  const fbEl = document.getElementById("feedback");
  const nextBtn = document.getElementById("nextQuestion");
  const listEl = document.getElementById("answerList");
  
  if(counterEl) counterEl.textContent = `Запитання ${qi + 1} із ${questions.length}`;
  if(qTextEl) qTextEl.textContent = q.q;
  if(fbEl) {
    fbEl.textContent = "";
    fbEl.className = "feedback";
  }
  if(nextBtn) {
    nextBtn.disabled = true;
    nextBtn.textContent = qi === questions.length - 1 ? "Побачити результат →" : "Наступне запитання →";
  }
  if(listEl) {
    listEl.innerHTML = q.a.map((a, i) => `<button class="answer-option" data-answer="${i}">${a}</button>`).join("");
    document.querySelectorAll("[data-answer]").forEach(b => b.addEventListener("click", () => answer(Number(b.dataset.answer))));
  }
}

function answer(index) {
  if (answered) return;
  answered = true;
  const q = questions[qi], buttons = [...document.querySelectorAll("[data-answer]")];
  buttons.forEach((b, i) => {
    b.disabled = true;
    if (i === q.correct) b.classList.add("correct");
    else if (i === index) b.classList.add("incorrect");
  });
  const good = index === q.correct;
  if (good) score++;
  const fb = document.getElementById("feedback");
  if(fb) {
    fb.textContent = (good ? "✓ Чудово! " : "Не зовсім. ") + q.why;
    fb.classList.add(good ? "good" : "bad");
  }
  const scoreText = document.getElementById("scoreText");
  if(scoreText) scoreText.textContent = `Правильних відповідей: ${score}`;
  const nextBtn = document.getElementById("nextQuestion");
  if(nextBtn) nextBtn.disabled = false;
}

const nextQuestionBtn = document.getElementById("nextQuestion");
if(nextQuestionBtn) {
  nextQuestionBtn.addEventListener("click", () => {
    if (!answered) return;
    if (qi < questions.length - 1) {
      qi++;
      showQuestion();
    } else {
      finish();
    }
  });
}

function finish() {
  const quizSection = document.querySelector(".quiz-section");
  const finishCard = document.getElementById("finishCard");
  const finishText = document.getElementById("finishText");
  
  if(quizSection) quizSection.classList.add("hidden");
  if(finishCard) finishCard.classList.remove("hidden");
  if(finishText) {
    finishText.textContent = `Ти відповів/відповіла правильно на ${score} із ${questions.length} запитань. ${score >= 2 ? "Чудовий результат!" : "Спробуй ще раз, щоб закріпити знання."}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  showQuestion();
  
  const completeLessonBtn = document.getElementById('completeLesson');
  const result = document.getElementById('result');
  
  if(completeLessonBtn) {
    completeLessonBtn.addEventListener('click', () => {
      const maxScore = questions.length;
      const catalog = window.lessonCatalog || [];
      const award = window.LearningGamification?.awardLesson(
        'numerical-expressions', score, maxScore, catalog
      );
      if(result) {
        result.textContent = award?.newCompletion
          ? `Урок завершено! Ти отримав/отримала ${award.coins || 20} комп’юшок.`
          : 'Урок завершено. Базову нагороду за цей урок уже отримано.';
      }
    });
  }
});