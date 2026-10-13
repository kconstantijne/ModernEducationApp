const LESSONS = [
  {id:"point-line-ray",title:"Точка, пряма та промінь",subject:"Математика",category:"math",description:"Досліджуй геометричні фігури та навчися розрізняти їхні властивості.",tag:"ГЕОМЕТРІЯ",duration:"10–15 хв",url:"lessons/math/point-line-ray/index.html",visual:"geometry"},
  {id:"coordinate-ray",title:"Координатний промінь",subject:"Математика",category:"math",description:"Розміщуй числа на промені та відкривай, як працюють координати.",tag:"ЧИСЛА",duration:"10 хв",url:"lessons/math/coordinate-ray/index.html",visual:"numberline"},
  {id:"algorithms",title:"Алгоритми та виконавці",subject:"Інформатика",category:"informatics",description:"Складай послідовності команд і допомагай виконавцю досягти мети.",tag:"АЛГОРИТМИ",duration:"10–15 хв",url:"lessons/informatics/algorithms/index.html",visual:"code"}
];
const completedKey = "learning-lab-completed";
function getCompleted(){try{return JSON.parse(localStorage.getItem(completedKey)||"[]")}catch(_){return[]}}
function visualMarkup(type){ return ''; }
function renderLessons(filter=""){
 const grid=document.getElementById("lessonGrid"); if(!grid)return;
 const q=filter.trim().toLocaleLowerCase("uk");
 const list=LESSONS.filter(l=>(l.title+" "+l.subject+" "+l.description+" "+l.tag).toLocaleLowerCase("uk").includes(q));
 const completed=getCompleted();
 grid.innerHTML=list.map(l=>`<a class="lesson-card" href="${l.url}"><div class="lesson-visual ${l.visual}">${visualMarkup(l.visual)}</div><span class="lesson-tag">${l.tag}</span><h3>${l.title}</h3><p>${l.description}</p><div class="lesson-card-bottom"><span>${l.duration}</span><span class="${completed.includes(l.id)?"lesson-status":"lesson-open"}">${completed.includes(l.id)?"✓ Пройдено":"Почати урок →"}</span></div></a>`).join("");
 const count=document.getElementById("lessonCount"); if(count)count.textContent=`${list.length} ${list.length===1?"урок":list.length<5?"уроки":"уроків"}`;
 document.getElementById("emptyState")?.classList.toggle("hidden",list.length!==0);
}
function updateProgress(){
 const done=getCompleted(); const count=document.getElementById("completedCount");
 if(count)count.textContent=done.filter(id=>LESSONS.some(l=>l.id===id)).length;
 const actual=done.filter(id=>LESSONS.some(l=>l.id===id)).length;
 const pct=LESSONS.length?Math.round(actual/LESSONS.length*100):0;
 document.querySelector(".progress-ring")?.style.setProperty("--progress",pct+"%");
 const bar=document.getElementById("progressBar");if(bar)bar.style.width=pct+"%";
 const label=document.getElementById("progressLabel"),detail=document.getElementById("progressDetail");
 if(label)label.textContent=actual===0?"Твоя подорож тільки починається":actual===LESSONS.length?"Усі демонстраційні уроки пройдено!":"Чудовий поступ — продовжуй!";
 if(detail)detail.textContent=`${actual} із ${LESSONS.length} демонстраційних уроків завершено`;
}
document.addEventListener("DOMContentLoaded",()=>{
 renderLessons();updateProgress();
 document.getElementById("searchInput")?.addEventListener("input",e=>renderLessons(e.target.value));
 const sidebar=document.getElementById("sidebar"),scrim=document.getElementById("mobileScrim");
 const close=()=>{sidebar?.classList.remove("open");scrim?.classList.remove("show")};
 document.getElementById("mobileMenu")?.addEventListener("click",()=>{sidebar?.classList.toggle("open");scrim?.classList.toggle("show")});
 scrim?.addEventListener("click",close);
 sidebar?.querySelectorAll("a").forEach(a=>a.addEventListener("click",close));
});
