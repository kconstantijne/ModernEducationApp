(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const concepts = {
    ray: { title:'Координатний промінь', description:'Пересувай точку та дивись, як змінюється її координата.', insight:n=>`Точка A має координату ${n}: від початку O потрібно відкласти ${n} ${n===1?'одиничний відрізок':'одиничні відрізки'}.`, footer:'Початок променя має координату 0, а числа зростають зліва направо.' },
    unit: { title:'Одиничний відрізок', description:'Зміни довжину одиничного відрізка та порівняй відстані на рисунку.', insight:n=>`Одиничний відрізок задає масштаб. Координата A залишається ${n}, навіть якщо масштаб змінюється.`, footer:'Зміна довжини одиничного відрізка змінює рисунок, але не координати точок.' },
    coordinates: { title:'Координати точок', description:'Координата — це число, яке визначає положення точки на промені.', insight:n=>`Запис A(${n}) означає, що точка A віддалена від O на ${n} одиничних відрізків.`, footer:'Координату точки записують у дужках після назви точки: A(4).' },
    compare: { title:'Порівняння чисел', description:'Пересувай точку та спостерігай: чим правіше вона розташована, тим більше її координата.', insight:n=>n<5?`A(${n}) розташована лівіше від точки з координатою 5, тому ${n} < 5.`:n===5?'A(5) збігається з точкою, що має координату 5.':`A(${n}) розташована правіше від точки з координатою 5, тому ${n} > 5.`, footer:'На координатному промені менше число розташоване лівіше, а більше — правіше.' }
  };
  const questionBank = {
    easy: [
      {q:'Яка координата у початку координатного променя?',a:['0','1','10','100'],correct:0,why:'Початок координатного променя позначають числом 0.'},
      {q:'Що потрібно позначити на координатному промені, крім початку?',a:['Лише колір','Одиничний відрізок і напрямок','Коло','Кут'],correct:1,why:'Координатний промінь має початок, одиничний відрізок і напрямок.'},
      {q:'Яка координата точки, якщо від O відкладено 3 одиничні відрізки?',a:['1','2','3','4'],correct:2,why:'Кожен одиничний відрізок додає одну одиницю: три відрізки — координата 3.'},
      {q:'У якому напрямку зростають числа на координатному промені?',a:['Зліва направо','Справа наліво','Вгору','Числа не зростають'],correct:0,why:'На звичайному зображенні координатного променя числа зростають зліва направо.'}
    ],
    medium: [
      {q:'Точка B має координату 6. Скільки одиничних відрізків від O до B?',a:['5','6','7','12'],correct:1,why:'Координата 6 означає, що від початку відкладено 6 одиничних відрізків.'},
      {q:'Яка точка розташована правіше на координатному промені?',a:['A(2)','B(7)','Вони в одному місці','Визначити неможливо'],correct:1,why:'Координата 7 більша за 2, тому B(7) розташована правіше.'},
      {q:'Точка C(4) і точка D(9). На скільки одиниць відрізняються їхні координати?',a:['3','4','5','13'],correct:2,why:'Різниця координат: 9 − 4 = 5 одиниць.'},
      {q:'Який запис правильно позначає точку M з координатою 8?',a:['8(M)','M=8°','M(8)','(M)8'],correct:2,why:'Назву точки записують перед координатою в дужках: M(8).'},
      {q:'Як зміниться координата точки, якщо одиничний відрізок на малюнку зробити довшим, але точку не перенумеровувати?',a:['Обов’язково збільшиться','Обов’язково зменшиться','Не зміниться','Стане нулем'],correct:2,why:'Масштаб зображення може змінитися, але числова координата точки залишається тією самою.'},
      {q:'Яке твердження правильне?',a:['3 > 8','5 < 2','4 < 6','9 < 1'],correct:2,why:'На координатному промені 4 розташоване лівіше за 6, отже 4 < 6.'}
    ],
    hard: [
      {q:'Точка A має координату 3, а B — координату 11. Яка відстань між ними в одиничних відрізках?',a:['8','11','14','33'],correct:0,why:'Відстань між точками на промені дорівнює різниці координат: 11 − 3 = 8.'},
      {q:'Точка K(5) розташована на 4 одиниці лівіше від точки L. Яка координата L?',a:['1','4','9','20'],correct:2,why:'Праворуч координати збільшуються: 5 + 4 = 9.'},
      {q:'Між точками A(2) і B(10) позначили точку C посередині. Яка координата C?',a:['4','6','8','12'],correct:1,why:'Середина має координату, рівновіддалену від 2 і 10: (2 + 10) ÷ 2 = 6.'},
      {q:'Точка P має координату 7. Точка Q на 3 одиниці лівіше за P. Знайди координату Q.',a:['3','4','10','21'],correct:1,why:'Рух ліворуч означає віднімання: 7 − 3 = 4.'},
      {q:'Які точки розташовані в порядку зліва направо?',a:['C(8), A(2), B(5)','B(5), A(2), C(8)','A(2), B(5), C(8)','A(5), B(8), C(2)'],correct:2,why:'Координати зростають зліва направо: 2, потім 5, потім 8.'},
      {q:'Одиничний відрізок дорівнює 2 см. Яка відстань від O до точки A(6)?',a:['3 см','6 см','8 см','12 см'],correct:3,why:'Шість одиничних відрізків по 2 см: 6 × 2 = 12 см.'},
      {q:'Точка X(4) і точка Y(12). Яка координата точки Z, що є серединою XY?',a:['6','8','10','16'],correct:1,why:'Середина відрізка має координату (4 + 12) ÷ 2 = 8.'},
      {q:'Точка A(9) на 5 одиниць правіше за точку B. Яка координата B?',a:['4','5','14','45'],correct:0,why:'Якщо A правіше за B на 5 одиниць, то координата B дорівнює 9 − 5 = 4.'}
    ]
  };
  const levelNames = {easy:'Простий рівень',medium:'Середній рівень',hard:'Складний рівень'};
  const state = {concept:'ray', coordinate:4, unit:40, level:'medium', index:0, score:0, answered:false};
  const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
  function renderModel() {
    const n=state.coordinate, unit=state.unit, origin=92, y=126, maxX=origin+10*unit;
    $('#rayLine').setAttribute('x1',origin); $('#rayLine').setAttribute('x2',Math.min(514,maxX));
    const markerX=origin+n*unit;
    $('#pointMarker').setAttribute('cx',markerX); $('#pointLabel').setAttribute('x',markerX); $('#pointLabel').textContent=`A(${n})`;
    $('#unitSegment').setAttribute('x1',origin); $('#unitSegment').setAttribute('x2',origin+unit);
    $('#unitLabel').setAttribute('x',(origin+origin+unit)/2); $('#unitLabel').textContent='1 од.';
    const ticks=$('#ticks'), labels=$('#numberLabels'); ticks.replaceChildren(); labels.replaceChildren();
    for(let i=0;i<=10;i++){
      const x=origin+i*unit; if(x>512) continue;
      const tick=document.createElementNS('http://www.w3.org/2000/svg','line'); tick.setAttribute('x1',x);tick.setAttribute('x2',x);tick.setAttribute('y1',i===0?112:117);tick.setAttribute('y2',i===0?140:135);tick.setAttribute('class',i===0?'coordinate-tick origin-tick':'coordinate-tick');ticks.append(tick);
      const label=document.createElementNS('http://www.w3.org/2000/svg','text');label.setAttribute('x',x);label.setAttribute('y',160);label.setAttribute('text-anchor','middle');label.setAttribute('class','coordinate-number');label.textContent=String(i);labels.append(label);
    }
    const desc=`Координатний промінь від 0 до 10. Точка A має координату ${n}.`;
    $('#raySvgDesc').textContent=desc;setText('coordinateValue',n);setText('coordinateOutput',String(n));setText('unitOutput',`${unit} px`);setText('coordinateMeaning',`A розташована на ${n} ${n===1?'одиницю':'одиниць'} від O`);
    const info=concepts[state.concept];setText('modelHeading',info.title);setText('modelDescription',info.description);setText('modelInsight',info.insight(n));setText('modelFooterNote',info.footer);
    $('#coordinateSlider').value=n;$('#unitSlider').value=unit;
  }
  function selectConcept(key){state.concept=key;$$('[data-concept]').forEach(btn=>{const active=btn.dataset.concept===key;btn.classList.toggle('is-active',active);btn.setAttribute('aria-pressed',String(active));});renderModel();}
  function currentQuestions(){return questionBank[state.level];}
  function renderQuestion(){const qs=currentQuestions(),q=qs[state.index];state.answered=false;setText('quizLevelLabel',levelNames[state.level]);setText('questionCounter',`Запитання ${state.index+1} із ${qs.length}`);setText('questionText',q.q);setText('quizScore',state.score);$('#quizProgress').setAttribute('aria-valuemax',qs.length);$('#quizProgress').setAttribute('aria-valuenow',state.index);$('#quizProgressFill').style.width=`${state.index/qs.length*100}%`;const list=$('#answerList');list.replaceChildren();q.a.forEach((answer,index)=>{const label=document.createElement('label');label.className='answer-option';const input=document.createElement('input');input.type='radio';input.name='answer';input.value=String(index);input.setAttribute('aria-label',answer);const text=document.createElement('span');text.className='answer-text';text.textContent=answer;const letter=document.createElement('span');letter.className='answer-letter';letter.textContent=String.fromCharCode(65+index);label.append(letter,input,text);list.append(label);});$('#quizFeedback').hidden=true;$('#quizFeedback').textContent='';$('#checkAnswer').hidden=false;$('#checkAnswer').disabled=false;$('#nextQuestion').hidden=true;$('#answerFieldset').disabled=false;$('#quizPanel').hidden=false;$('#resultPanel').hidden=true;}
  function checkAnswer(event){event.preventDefault();if(state.answered)return;const chosen=$('input[name="answer"]:checked');if(!chosen){setText('quizFeedback','Спочатку обери один варіант відповіді.');$('#quizFeedback').className='quiz-feedback is-wrong';$('#quizFeedback').hidden=false;return;}state.answered=true;const q=currentQuestions()[state.index],picked=Number(chosen.value),correct=picked===q.correct;if(correct)state.score++;$$('input[name="answer"]').forEach(input=>{input.disabled=true;const label=input.closest('.answer-option');if(Number(input.value)===q.correct)label.classList.add('is-correct');if(Number(input.value)===picked&&!correct)label.classList.add('is-wrong');});setText('quizScore',state.score);setText('quizFeedback',`${correct?'Правильно!':'Не зовсім.'} ${q.why}`);$('#quizFeedback').className=`quiz-feedback ${correct?'is-correct':'is-wrong'}`;$('#quizFeedback').hidden=false;$('#checkAnswer').hidden=true;$('#nextQuestion').hidden=false;$('#nextQuestion').focus();setText('questionCounter',`Запитання ${state.index+1} із ${currentQuestions().length}`);}
  function showResult(){const total=currentQuestions().length,pct=Math.round(state.score/total*100);$('#quizPanel').hidden=true;$('#resultPanel').hidden=false;setText('finalScore',`${state.score}/${total}`);setText('finalPercent',`${pct}%`);setText('resultTitle',pct===100?'Ідеальний результат!':pct>=70?'Чудова робота!':pct>=40?'Гарний початок!':'Спробуй ще раз!');setText('resultMessage',pct>=80?'Ти добре орієнтуєшся на координатному промені. Продовжуй у тому ж дусі!':pct>=50?'Основи вже знайомі. Переглянь шпаргалку й закріпи кілька правил.':'Повернися до інтерактивної моделі, досліди приклади й повтори тест.');$('#quizProgress').setAttribute('aria-valuenow',total);$('#quizProgressFill').style.width='100%';$('#resultPanel').scrollIntoView({behavior:'smooth',block:'center'});}
  function nextQuestion(){if(!state.answered)return;state.index++;if(state.index>=currentQuestions().length)showResult();else renderQuestion();}
  function startQuiz(level=state.level){state.level=level;state.index=0;state.score=0;state.answered=false;$$('[data-level]').forEach(btn=>{const active=btn.dataset.level===level;btn.classList.toggle('is-active',active);btn.setAttribute('aria-pressed',String(active));});renderQuestion();}
  $('#coordinateSlider').addEventListener('input',e=>{state.coordinate=Number(e.target.value);renderModel();});$('#unitSlider').addEventListener('input',e=>{state.unit=Number(e.target.value);renderModel();});$$('[data-coordinate]').forEach(btn=>btn.addEventListener('click',()=>{state.coordinate=Number(btn.dataset.coordinate);renderModel();}));$$('[data-concept]').forEach(btn=>btn.addEventListener('click',()=>selectConcept(btn.dataset.concept)));
  $('#resetModel').addEventListener('click',()=>{state.coordinate=4;state.unit=40;selectConcept('ray');});$('#quizForm').addEventListener('submit',checkAnswer);$('#nextQuestion').addEventListener('click',nextQuestion);$('#retryQuiz').addEventListener('click',()=>startQuiz(state.level));$$('[data-level]').forEach(btn=>btn.addEventListener('click',()=>startQuiz(btn.dataset.level)));
  renderModel();startQuiz('medium');
})();