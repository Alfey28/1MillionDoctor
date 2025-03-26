 // استدعاء البيانات من ملف JSON
 fetch('js/pharmacies.json')
 .then(response => response.json())
 .then(data => {
   const pharmacyList = document.getElementById('pharmacy-list');

   data.forEach((pharmacy, index) => {
     const pharmacyDiv = document.createElement('div');
     pharmacyDiv.classList.add('pharmacy');

     pharmacyDiv.innerHTML = `
       <h2>${pharmacy["اسم الصيدلية"]}</h2>
       <img src="${pharmacy["صور"][0]}" alt="${pharmacy["اسم الصيدلية"]} - صورة">
     `;

     // إضافة حدث عند الضغط على الصيدلية لفتح صفحة التفاصيل
     pharmacyDiv.addEventListener('click', () => {
       // حفظ البيانات الخاصة بالصيدلية في الـ localStorage
       localStorage.setItem('selectedPharmacy', JSON.stringify(pharmacy));
       // الانتقال إلى صفحة التفاصيل
       window.location.href = "onepharmacy.html";
     });

     pharmacyList.appendChild(pharmacyDiv);
   });
 })
 .catch(error => console.error('Error loading JSON:', error));