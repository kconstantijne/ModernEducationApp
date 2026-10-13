const LESSONS = [
  {id:"point-line-ray",title:"Точка, пряма та промінь",subject:"Математика",category:"math",description:"Досліджуй геометричні фігури та навчися розрізняти їхні властивості.",tag:"ГЕОМЕТРІЯ",duration:"10–15 хв",url:"lessons/math/point-line-ray/index.html",visual:"geometry"},
  {id:"coordinate-ray",title:"Координатний промінь",subject:"Математика",category:"math",description:"Розміщуй числа на промені та відкривай, як працюють координати.",tag:"ЧИСЛА",duration:"10 хв",url:"lessons/math/coordinate-ray/index.html",visual:"numberline"},
  {id:"algorithms",title:"Алгоритми та виконавці",subject:"Інформатика",category:"informatics",description:"Складай послідовності команд і допомагай виконавцю досягти мети.",tag:"АЛГОРИТМИ",duration:"10–15 хв",url:"lessons/informatics/algorithms/index.html",visual:"code"}
];
const completedKey = "learning-lab-completed";
function getCompleted(){try{return JSON.parse(localStorage.getItem(completedKey)||"[]")}catch(_){return[]}}
function visualMarkup(type){
  if(type==="geometry") return `<svg viewBox="0 0 260 115" aria-hidden="true"><defs><linearGradient id="g1"><stop stop-color="#7292ec"/><stop offset="1" stop-color="#9a83e6"/></linearGradient></defs><path d="M28 58H230" stroke="url(#g1)" stroke-width="3" stroke-linecap="round"/><path d="m28 58 10-6v12zM230 58l-10-6v12z" fill="#8295e6"/><circle cx="129" cy="58" r="6" fill="#fff" stroke="#7189e5" stroke-width="3"/><circle cx="70" cy="58" r="4" fill="#9d8be8"/><circle cx="187" cy="58" r="4" fill="#9d8be8"/><text x="129" y="37" text-anchor="middle" font-size="12" fill="#5d6da9" font-weight="700">A</text><path d="M49 86Q130 105 211 86" stroke="#a7b4e9" stroke-width="1.5" fill="none" stroke-dasharray="4 5"/></svg>`;
  if(type==="numberline") return `<svg viewBox="0 0 260 115" aria-hidden="true"><path d="M24 61H236" stroke="#62a99d" stroke-width="3" stroke-linecap="round"/><path d="m236 61-10-6v12z" fill="#62a99d"/><g stroke="#6caaa0" stroke-width="2"><path d="M45 52v18M83 52v18M121 52v18M159 52v18M197 52v18"/></g><g fill="#4b8d83" font-size="11" text-anchor="middle" font-weight="700"><text x="45" y="87">0</text><text x="83" y="87">1</text><text x="121" y="87">2</text><text x="159" y="87">3</text><text x="197" y="87">4</text></g><circle cx="159" cy="61" r="6" fill="#fff" stroke="#62a99d" stroke-width="3"/><path d="M159 49V26" stroke="#62a99d" stroke-dasharray="3 3"/><rect x="143" y="9" width="32" height="20" rx="8" fill="#fff"/><text x="159" y="23" text-anchor="middle" font-size="11" fill="#39877a" font-weight="800">3</text></svg>`;
  return `<svg viewBox="0 0 260 115" aria-hidden="true"><rect x="28" y="18" width="204" height="80" rx="12" fill="#fff" fill-opacity=".48" stroke="#c7b9ef"/><circle cx="44" cy="31" r="3" fill="#e7a2bb"/><circle cx="54" cy="31" r="3" fill="#e7c97f"/><circle cx="64" cy="31" r="3" fill="#91cbbd"/><text x="48" y="61" fill="#8b73d5" font-family="monospace" font-size="23" font-weight="700">&lt;/&gt;</text><path d="M111 48h75M111 60h54M111 72h64" stroke="#a89adf" stroke-width="4" stroke-linecap="round"/><rect x="185" y="66" width="20" height="10" rx="3" fill="#b3a2e9"/></svg>`;
}
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
