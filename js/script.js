document.addEventListener("DOMContentLoaded",function(){let e=new URLSearchParams(window.location.search),t=e.get("id");fetch("./js/specialties.json").then(e=>e.json()).then(e=>{let n=e.find(e=>e.id===t);if(n){document.getElementById("specialty-name").textContent=n.name,document.getElementById("specialty-description").textContent=n.description,document.getElementById("specialty-image").src=n.image;let d=document.getElementById("procedures-list");n.procedures.forEach(e=>{let t=document.createElement("li");t.textContent=e,d.appendChild(t)});let a=document.getElementById("doctors-list");n.doctors.forEach(e=>{let t=document.createElement("div");t.classList.add("doctor-card"),t.innerHTML=`
    <img src="${e.image}" alt="د. ${e.name}">
    <h3>${e.name}</h3>
    <p>${e.address}</p>
    <p>📞 <a href="tel:${e.phone}">${e.phone}</a></p>
`,a.appendChild(t)})}else document.body.innerHTML="<h2>التخصص غير موجود</h2>"}).catch(e=>console.error("حدث خطأ أثناء تحميل البيانات:",e))});