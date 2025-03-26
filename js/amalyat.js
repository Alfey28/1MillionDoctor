document.addEventListener("DOMContentLoaded",function(){let e=new URLSearchParams(window.location.search),t=e.get("specialty"),n=e.get("procedure");if(!t||!n){alert("لم يتم اختيار تخصص أو عملية صحيحة!"),window.location.href="index.html";return}fetch("js/specialties.json").then(e=>e.json()).then(e=>{let l=e.find(e=>e.id===t);if(l){let r=document.getElementById("specialty-name"),s=document.getElementById("procedure-title"),i=document.getElementById("procedure-description"),a=document.getElementById("procedure-details");if(!r||!s||!i||!a){console.error("خطأ: تأكد من أن جميع العناصر موجودة في HTML");return}r.textContent=l.name;let o=l.procedures.find(e=>e.title===n);if(o){s.innerHTML=`<span class="bold">${o.title}</span>`,i.innerHTML=`<span class="bold red">📌 الوصف:</span> ${o.description}`;let d=`
                    <p><span class="bold">🔹 السبب:</span></p>
                    <ul>
                        ${o.reson1?`<li>${o.reson1}</li>`:""}
                        ${o.reson2?`<li>${o.reson2}</li>`:""}
                        ${o.reson3?`<li>${o.reson3}</li>`:""}
                    </ul>

                    <p><span class="bold">🔹 طريقة الجراحة:</span></p>
                    <ul>
                        ${o.surgery1?`<li>${o.surgery1}</li>`:""}
                        ${o.surgery2?`<li>${o.surgery2}</li>`:""}
                        ${o.surgery3?`<li>${o.surgery3}</li>`:""}
                    </ul>

                    <p><span class="bold">🔹 التعافي:</span></p>
                    <ul>
                        ${o.health1?`<li>${o.health1}</li>`:""}
                        ${o.health2?`<li>${o.health2}</li>`:""}
                    </ul>
                `;a.innerHTML=d}else s.textContent="لم يتم العثور على العملية",i.textContent="",a.innerHTML=""}else document.getElementById("specialty-name").textContent="تخصص غير معروف"}).catch(e=>console.error("خطأ في تحميل البيانات:",e))});