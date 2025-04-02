// تحميل البيانات من ملف JSON
fetch('js/pharmacies.json')
  .then(response => response.json())  // تحويل البيانات إلى JSON
  .then(pharmaciesData => {
    const pharmacyListElement = document.getElementById("pharmacy-list");

    pharmaciesData.forEach(pharmacy => {
      // إنشاء div جديد لكل صيدلية
      const pharmacyDiv = document.createElement("div");
      pharmacyDiv.classList.add("pharmacy-item");

      // إضافة اسم الصيدلية
      const pharmacyName = document.createElement("h2");
      pharmacyName.textContent = pharmacy["اسم الصيدلية"];
      pharmacyDiv.appendChild(pharmacyName);

      // إضافة معلومات الصيدلية (رقم الخط الساخن، الفرع، الهاتف، الموقع)
      const infoDiv = document.createElement("div");
      infoDiv.classList.add("pharmacy-info");

      const hotline = document.createElement("p");
      hotline.textContent = `رقم الخط الساخن: ${pharmacy["رقم الخط الساخن"]}`;
      infoDiv.appendChild(hotline);

      const branch = document.createElement("p");
      branch.textContent = `الفرع: ${pharmacy["الفرع"]}`;
      infoDiv.appendChild(branch);

      const phoneNumber = document.createElement("p");
      phoneNumber.textContent = `رقم الهاتف: ${pharmacy["رقم الهاتف"]}`;
      infoDiv.appendChild(phoneNumber);

      const locationLink = document.createElement("a");
      locationLink.href = pharmacy["موقع"];
      locationLink.textContent = "عرض الموقع على الخريطة";
      locationLink.target = "_blank";
      infoDiv.appendChild(locationLink);

      pharmacyDiv.appendChild(infoDiv);

      // إضافة الصور
      const imagesDiv = document.createElement("div");
      imagesDiv.classList.add("pharmacy-images");

      pharmacy["صور"].forEach(imageUrl => {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = pharmacy["اسم الصيدلية"];
        img.classList.add("pharmacy-image");
        imagesDiv.appendChild(img);
      });

      pharmacyDiv.appendChild(imagesDiv);

      // إضافة الـ div إلى قائمة الصيدليات
      pharmacyListElement.appendChild(pharmacyDiv);
    });
  })
  .catch(error => console.error('Error loading pharmacies data:', error));
