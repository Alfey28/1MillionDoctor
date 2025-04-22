document.addEventListener("DOMContentLoaded", function() {
    const pharmacy = JSON.parse(localStorage.getItem("selectedPharmacy"));
  
    if (!pharmacy) {
      document.body.innerHTML = "<p>لا توجد بيانات لعرضها</p>";
      return;
    }
  
    const container = document.getElementById("pharmacy-details");
  
    const name = document.createElement("h2");
    name.textContent = pharmacy["اسم الصيدلية"];
    container.appendChild(name);
  
    if (pharmacy["الدكتور"]) {
      const doctor = document.createElement("h4");
      doctor.textContent = pharmacy["الدكتور"];
      container.appendChild(doctor);
    }
  
    const info = document.createElement("div");
  
    if (pharmacy["الفرع"]) {
        const branch = document.createElement("h6");
        branch.textContent = `الفرع: ${pharmacy["الفرع"]}`;
        container.appendChild(branch);
    }

    if (pharmacy["العنوان"]) {
        const address = document.createElement("p");
        address.textContent = `العنوان: ${pharmacy["العنوان"]}`;
        info.appendChild(address);
    }
      
    if (pharmacy["رقم الخط الساخن"]) {
        const hotline = document.createElement("p");
        hotline.textContent = `الخط الساخن: ${pharmacy["رقم الخط الساخن"]}`;
        info.appendChild(hotline);
    }
      
    if (pharmacy["رقم الهاتف"]) {
        const phone = document.createElement("p");
        phone.textContent = `رقم الهاتف: ${pharmacy["رقم الهاتف"]}`;
        info.appendChild(phone);
    }
      
    if (pharmacy["موقع"]) {
        const locationP = document.createElement("p");
        const locationLink = document.createElement("a");
        locationLink.href = pharmacy["موقع"];
        locationLink.target = "_blank";
        locationLink.textContent = "عرض الموقع على الخريطة";
        locationP.appendChild(locationLink);
        info.appendChild(locationP);
    }
  
    container.appendChild(info);

    if (pharmacy["صور"] && Array.isArray(pharmacy["صور"])) {
        const imagesDiv = document.createElement("div");
        let currentIndex = 0;
      
        pharmacy["صور"].forEach((src, index) => {
          const img = document.createElement("img");
          img.src = src;
          img.classList.add("pharmacy-image");
          img.addEventListener("click", () => {
            openLightbox(index);
          });
          imagesDiv.appendChild(img);
        });
      
        container.appendChild(imagesDiv);
      
        // إنشاء lightbox
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");
        const closeBtn = document.querySelector(".close");
        const prevBtn = document.getElementById("prev-btn");
        const nextBtn = document.getElementById("next-btn");
      
        function openLightbox(index) {
          currentIndex = index;
          lightboxImg.src = pharmacy["صور"][currentIndex];
          lightbox.style.display = "flex";
        }
      
        function closeLightbox() {
          lightbox.style.display = "none";
        }
      
        function showNext() {
          currentIndex = (currentIndex + 1) % pharmacy["صور"].length;
          lightboxImg.src = pharmacy["صور"][currentIndex];
        }
      
        function showPrev() {
          currentIndex = (currentIndex - 1 + pharmacy["صور"].length) % pharmacy["صور"].length;
          lightboxImg.src = pharmacy["صور"][currentIndex];
        }
      
        // إغلاق عند الضغط خارج الصورة
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
            closeLightbox();
            }
        });

        closeBtn.addEventListener("click", closeLightbox);
        nextBtn.addEventListener("click", showNext);
        prevBtn.addEventListener("click", showPrev);
    }

    // document.getElementById("prescription-form").addEventListener("submit", function (e) {
    //     e.preventDefault();
      
    //     const imageInput = document.getElementById("prescription-image");
    //     const medName = document.getElementById("medicine-name").value.trim();
    //     let pharmacyWhatsapp = pharmacy["whatsapp"]?.replace(/\s+/g, "") || "";  // استخدم رقم الواتساب المحلي من JSON
    //     const errorMessage = document.getElementById("error-message");

    //     // إضافة كود البلد المصري +20 إذا كان الرقم محليًا
    //     if (pharmacyWhatsapp && !pharmacyWhatsapp.startsWith("+20")) {
    //         pharmacyWhatsapp = "+20" + pharmacyWhatsapp;
    //     }

    //     // تحقق من أن العميل دخل اسم الدواء أو رفع صورة الروشتة
    //     if (!medName && imageInput.files.length === 0) {
    //       errorMessage.textContent = "يرجى إدخال اسم الدواء أو رفع صورة الروشتة.";
    //       errorMessage.style.display = "block";  // عرض التنبيه
    //       return;  // لا يمكن إرسال الطلب إلا في حال إدخال أحدهم
    //     } else {
    //       errorMessage.style.display = "none";  // إخفاء التنبيه إذا كان صحيح
    //     }
      
    //     let message = `مرحبًا، أود إرسال طلب للصيدلية:`;
      
    //     if (medName) {
    //       message += `\n📝 اسم الدواء: ${medName}`;
    //     }
      
    //     if (imageInput.files.length > 0) {
    //       message += `\n📸 قمت بإرفاق صورة للروشتة، برجاء الاطلاع عليها بعد فتح المحادثة.`;
    //     }
    //     // إرسال الرسالة عبر واتساب باستخدام رقم الواتساب المحلي من ملف JSON
    //     const whatsappURL = `https://wa.me/${pharmacyWhatsapp}?text=${encodeURIComponent(message)}`;
    //     window.open(whatsappURL, "_blank");
    // });
});
