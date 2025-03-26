document.addEventListener("DOMContentLoaded",function(){let e=document.getElementById("register-type"),t=document.getElementById("form-content");function l(){let l=e.value;t.innerHTML=`
    <form id="register-form">
        <p id="error-message" style="color: red; display: none; font-weight: bold;">⚠️ يرجى ملء جميع البيانات قبل التسجيل!</p>

        <div class="form-group-reg">
            <label for="name">👤 ${"doctor"===l?"الاسم":"اسم الصيدلية"}:</label>
            <input type="text" id="name" required>
        </div>

        ${"doctor"===l?`
        <div class="form-group-reg">
            <label for="specialty">🏥 التخصص:</label>
            <input type="text" id="specialty" required>
        </div>`:""}

        <div class="form-group-reg">
            <label for="address">📍 العنوان:</label>
            <input type="text" id="address" required>
        </div>

        <div class="form-group-reg">
            <label for="phone">📞 رقم التليفون:</label>
            <input type="tel" id="phone" maxlength="11" required>
            <small id="phone-error" style="color: red; display: none;">⚠️ رقم الهاتف غير صحيح</small>
        </div>

        <button type="submit" id="submit-btn">${"doctor"===l?"تسجيل طبيب":"تسجيل صيدلية"}</button>
    </form>
`,function t(){let l=document.getElementById("register-form"),r=document.getElementById("phone"),o=document.getElementById("phone-error"),n=document.getElementById("error-message"),d=document.getElementById("submit-btn");e.addEventListener("change",function(){d.textContent="doctor"===e.value?"تسجيل طبيب":"تسجيل صيدلية"}),l&&l.addEventListener("submit",function(t){var d;t.preventDefault();let a=!0,s=l.querySelectorAll("input[type='text'], input[type='tel']");if(s.forEach(e=>{""===e.value.trim()?(e.style.backgroundColor="#ffdddd",e.style.borderColor="red",a=!1):(e.style.backgroundColor="",e.style.borderColor="")}),(d=r.value,/^(010|011|012|015)\d{8}$/.test(d))?(o.style.display="none",r.style.backgroundColor="",r.style.borderColor=""):(o.style.display="block",r.style.backgroundColor="#ffdddd",r.style.borderColor="red",a=!1),a)n.style.display="none",function t(){let l=document.getElementById("name").value,r=document.getElementById("phone").value,o=document.getElementById("address").value,n=e.value,d="doctor"===n?document.getElementById("specialty").value:null,a="\uD83C\uDF1F *اهلا حابب انضم ليكم على موقع 1MILLIONDOCTOR* \uD83C\uDF1F\n\n";a+=`🔹 *نوع الحساب:* ${"doctor"===n?"\uD83D\uDC68‍⚕️ طبيب":"\uD83C\uDFEA صيدلية"}
`,a+=`👤 *الاسم:* ${l}
`,d&&(a+=`🏥 *التخصص:* ${d}
`),a+=`📍 *العنوان:* ${o}
`,a+=`📞 *رقم الهاتف:* ${r}
`;let s=encodeURIComponent(a),i=`https://wa.me/201201233396?text=${s}`;window.open(i,"_blank")}();else{n.style.display="block";return}})}()}e.addEventListener("change",l),l()});