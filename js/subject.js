// Каталог спільний із головною сторінкою: нові уроки додаються в js/app.js.
document.addEventListener("DOMContentLoaded", async()=>{
 const subject=document.body.dataset.subject;
 const search=document.getElementById("searchInput");
 const grid=document.getElementById("lessonGrid");
 const completedKey="learning-lab-completed";
 let completed=[];try{completed=JSON.parse(localStorage.getItem(completedKey)||"[]")}catch(_){}
 const lessons=[
 {id:"point-line-ray",title:"Точка, пряма та промінь",subject:"Математика",category:"math",description:"Досліджуй геометричні фігури та навчися розрізняти їхні властивості.",tag:"ГЕОМЕТРІЯ",duration:"10–15 хв",url:"../lessons/math/point-line-ray/index.html",visual:"geometry"},
 {id:"coordinate-ray",title:"Координатний промінь",subject:"Математика",category:"math",description:"Розміщуй числа на промені та відкривай, як працюють координати.",tag:"ЧИСЛА",duration:"10 хв",url:"../lessons/math/coordinate-ray/index.html",visual:"numberline"},
 {id:"algorithms",title:"Алгоритми та виконавці",subject:"Інформатика",category:"informatics",description:"Складай послідовності команд і допомагай виконавцю досягти мети.",tag:"АЛГОРИТМИ",duration:"10–15 хв",url:"../lessons/informatics/algorithms/index.html",visual:"code"}
 ].filter(l=>l.category===subject);
 const art={geometry:"",numberline:"",code:""};
 function render(q=""){const filtered=lessons.filter(l=>(l.title+" "+l.description+" "+l.tag).toLocaleLowerCase("uk").includes(q.toLocaleLowerCase("uk")));grid.innerHTML=filtered.map(l=>`<a class="lesson-card" href="${l.url}"><div class="lesson-visual ${l.visual}">${art[l.visual]}</div><span class="lesson-tag">${l.tag}</span><h3>${l.title}</h3><p>${l.description}</p><div class="lesson-card-bottom"><span>${l.duration}</span><span class="${completed.includes(l.id)?"lesson-status":"lesson-open"}">${completed.includes(l.id)?"✓ Пройдено":"Почати урок →"}</span></div></a>`).join("");document.getElementById("lessonCount").textContent=`${filtered.length} уроки`;document.getElementById("emptyState").classList.toggle("hidden",filtered.length>0)}
 render();search?.addEventListener("input",e=>render(e.target.value));
 const sidebar=document.getElementById("sidebar"),scrim=document.getElementById("mobileScrim");document.getElementById("mobileMenu")?.addEventListener("click",()=>{sidebar.classList.toggle("open");scrim.classList.toggle("show")});scrim?.addEventListener("click",()=>{sidebar.classList.remove("open");scrim.classList.remove("show")});
});