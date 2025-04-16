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
if (pharmacy["اسم الصيدلية"]) {
  const pharmacyName = document.createElement("h2");
  pharmacyName.textContent = pharmacy["اسم الصيدلية"];
  pharmacyDiv.appendChild(pharmacyName);
}

if (pharmacy["الدكتور"]) {
  const doctorName = document.createElement("h6");
  doctorName.textContent = pharmacy["الدكتور"];
  pharmacyDiv.appendChild(doctorName);
}

// إضافة معلومات الصيدلية
const infoDiv = document.createElement("div");
infoDiv.classList.add("pharmacy-info");

if (pharmacy["الفرع"]) {
  const branch = document.createElement("p");
  branch.textContent = `الفرع: ${pharmacy["الفرع"]}`;
  infoDiv.appendChild(branch);
}

if (pharmacy["العنوان"]) {
  const address = document.createElement("p");
  address.textContent = `العنوان: ${pharmacy["العنوان"]}`;
  infoDiv.appendChild(address);
}

if (pharmacy["رقم الخط الساخن"]) {
  const hotline = document.createElement("p");
  hotline.textContent = `رقم الخط الساخن: ${pharmacy["رقم الخط الساخن"]}`;
  infoDiv.appendChild(hotline);
}

if (pharmacy["رقم الهاتف"]) {
  const phoneNumber = document.createElement("p");
  phoneNumber.textContent = `رقم الهاتف: ${pharmacy["رقم الهاتف"]}`;
  infoDiv.appendChild(phoneNumber);
}

if (pharmacy["موقع"]) {
  const locationLink = document.createElement("a");
  locationLink.href = pharmacy["موقع"];
  locationLink.textContent = "عرض الموقع على الخريطة";
  locationLink.target = "_blank";
  infoDiv.appendChild(locationLink);
}

pharmacyDiv.appendChild(infoDiv);

// إضافة الصور
if (pharmacy["صور"] && Array.isArray(pharmacy["صور"])) {
  const imagesDiv = document.createElement("div");
  imagesDiv.classList.add("pharmacy-images");

  pharmacy["صور"].forEach(imageUrl => {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = pharmacy["اسم الصيدلية"] || "صورة الصيدلية";
    img.classList.add("pharmacy-image");
    imagesDiv.appendChild(img);
  });

  pharmacyDiv.appendChild(imagesDiv);
}


      // إضافة الـ div إلى قائمة الصيدليات
      pharmacyListElement.appendChild(pharmacyDiv);
    });
  })
  .catch(error => console.error('Error loading pharmacies data:', error));
