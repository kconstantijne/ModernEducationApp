import {auth,db} from './firebase-client.js';
import {onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import {collection,getDocs,doc,getDoc,query,where} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';
const $=id=>document.getElementById(id), TOTAL_LESSONS=12;
let rows=[],allowed=false;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const say=(s,err=false)=>{ $('teacherFeedback').textContent=s; $('teacherFeedback').dataset.kind=err?'error':'success'; };
const percent=r=>TOTAL_LESSONS?Math.min(100,Math.round(r.completed/TOTAL_LESSONS*100)):0;
const plural=n=>n===1?'учень':n>=2&&n<=4?'учні':'учнів';
onAuthStateChanged(auth,async user=>{
 if(!user){say('Спочатку увійди у свій акаунт.',true);$('studentRows').innerHTML='<tr><td colspan="7"><a href="login.html">Перейти до входу</a></td></tr>';return;}
 try{const snap=await getDoc(doc(db,'users',user.uid));if(!snap.exists()||String(snap.data().role||'').toLowerCase()!=='teacher'){say('Доступ заборонено: цей акаунт не має ролі вчителя.',true);$('studentRows').innerHTML='<tr><td colspan="7">Немає доступу до журналу.</td></tr>';return;}allowed=true;await load();}
 catch(e){say('Не вдалося перевірити права доступу. Перевір Firebase та Security Rules.',true);console.error(e);}
});
async function load(){
 if(!allowed)return;
 $('refreshStudents').disabled=true;
 try{
  const snap=await getDocs(query(collection(db,'users'),where('role','==','student')));
  const result=await Promise.all(snap.docs.map(async u=>{
   const data=u.data();let progress={};
   try{const p=await getDoc(doc(db,'users',u.id,'privateData','progress'));if(p.exists())progress=p.data().profile||{};}catch(e){console.warn('Progress unavailable for student',u.id,e);}
   const completed=Array.isArray(progress.completed)?new Set(progress.completed).size:0;
   return {id:u.id,name:data.displayName||data.name||'Учень',grade:String(data.grade??'—'),completed,coins:Number(progress.coins)||0,updated:data.updatedAt?.toDate?.().toLocaleString('uk-UA')||'—',email:data.email||'',progress:Math.min(100,Math.round(completed/TOTAL_LESSONS*100))};
  }));
  rows=result.sort((a,b)=>a.name.localeCompare(b.name,'uk'));
  updateStats();populateGrades();render();$('exportCsv').disabled=!rows.length;
  say(`Завантажено профілів: ${rows.length}.`);
 }catch(e){say('Не вдалося завантажити список. Правила Firestore можуть блокувати запит.',true);console.error(e);}
 finally{$('refreshStudents').disabled=false;}
}
function updateStats(){
 const completed=rows.reduce((n,r)=>n+r.completed,0),avg=rows.length?Math.round(rows.reduce((n,r)=>n+r.progress,0)/rows.length):0;
 $('totalStudents').textContent=rows.length;$('totalCompleted').textContent=completed;$('averageProgress').textContent=avg+'%';$('progressHeadline').textContent=avg+'%';$('progressBar').style.width=avg+'%';
 $('progressFootnote').textContent=`У середньому завершено ${avg}% із ${TOTAL_LESSONS} уроків у каталозі. Це поточний знімок прогресу; історія за датами у сховищі не ведеться.`;
}
function populateGrades(){const el=$('gradeFilter'),selected=el.value,grades=[...new Set(rows.map(r=>r.grade).filter(g=>g&&g!=='—'))].sort((a,b)=>a.localeCompare(b,'uk',{numeric:true}));el.innerHTML='<option value="">Усі класи</option>'+grades.map(g=>`<option value="${esc(g)}">${esc(g)}</option>`).join('');if(grades.includes(selected))el.value=selected;}
function filtered(){const term=$('studentSearch').value.trim().toLocaleLowerCase('uk'),grade=$('gradeFilter').value,status=$('progressFilter').value;return rows.filter(r=>(!term||r.name.toLocaleLowerCase('uk').includes(term)||r.email.toLocaleLowerCase('uk').includes(term))&&(!grade||r.grade===grade)&&(!status||(status==='started'&&r.completed>0&&r.progress<100)||(status==='none'&&r.completed===0)||(status==='complete'&&r.progress>=100)));}
function render(){
 const list=filtered();$('visibleCount').textContent=`${list.length} ${plural(list.length)}`;
 $('studentRows').innerHTML=list.length?list.map(r=>`<tr><td><button class="student-name" data-student="${esc(r.id)}">${esc(r.name)}</button></td><td>${esc(r.grade)}</td><td>${r.completed} <span class="muted-inline">/ ${TOTAL_LESSONS}</span></td><td><div class="table-progress"><span>${r.progress}%</span><div class="progress-track"><span style="width:${r.progress}%"></span></div></div></td><td>${r.coins}</td><td>${esc(r.updated)}</td><td><button class="row-detail" data-student="${esc(r.id)}" aria-label="Переглянути ${esc(r.name)}">Перегляд ↗</button></td></tr>`).join(''):'<tr><td colspan="7" class="empty-state">За заданими параметрами учнів не знайдено.</td></tr>';
 $('studentCards').innerHTML=list.map(r=>`<article class="student-mobile-card"><div class="mobile-card-top"><div><strong>${esc(r.name)}</strong><span>Клас ${esc(r.grade)}</span></div><b>${r.progress}%</b></div><div class="progress-track"><span style="width:${r.progress}%"></span></div><div class="mobile-card-meta"><span>${r.completed}/${TOTAL_LESSONS} уроків</span><span>🪙 ${r.coins}</span></div><button class="row-detail" data-student="${esc(r.id)}">Переглянути учня ↗</button></article>`).join('');
}
function openStudent(id){const r=rows.find(x=>x.id===id);if(!r)return;$('detailName').textContent=r.name;$('detailGrade').textContent=`Клас: ${r.grade}`;$('detailCompleted').textContent=`${r.completed} / ${TOTAL_LESSONS}`;$('detailProgress').textContent=r.progress+'%';$('detailPercent').textContent=r.progress+'%';$('detailBar').style.width=r.progress+'%';$('detailCoins').textContent=r.coins;$('detailUpdated').textContent='Останнє оновлення профілю: '+r.updated;const d=$('studentDialog');if(typeof d.showModal==='function')d.showModal();else d.setAttribute('open','');}
document.addEventListener('click',e=>{const btn=e.target.closest('[data-student]');if(btn)openStudent(btn.dataset.student);});
['studentSearch','gradeFilter','progressFilter'].forEach(id=>$(id).addEventListener(id==='studentSearch'?'input':'change',render));
$('refreshStudents').addEventListener('click',load);$('closeStudentDialog').addEventListener('click',()=>$('studentDialog').close());$('studentDialog').addEventListener('click',e=>{if(e.target===$('studentDialog'))$('studentDialog').close();});
$('exportCsv').addEventListener('click',()=>{
 const visible=filtered(),csv=[['Учень','Клас','Завершено уроків','Усього уроків','Прогрес, %','Комп’юшки','Оновлено'],...visible.map(r=>[r.name,r.grade,r.completed,TOTAL_LESSONS,r.progress,r.coins,r.updated])].map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(';')).join('\r\n');
 const url=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='modern-education-progress.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
