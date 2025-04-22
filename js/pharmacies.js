// تحميل البيانات من ملف JSON
fetch('js/pharmacies.json')
  .then(response => response.json())
  .then(pharmaciesData => {
    const pharmacyListElement = document.getElementById("pharmacy-list");

    pharmaciesData.forEach((pharmacy, index) => {
      // إعطاء id لكل صيدلية (يبدأ من 1)
      pharmacy.id = index + 1;

      const pharmacyDiv = document.createElement("div");
      pharmacyDiv.classList.add("pharmacy-item");

      // اضغط على الصيدلية => خزّن بياناتها وانتقل
      pharmacyDiv.addEventListener("click", () => {
        localStorage.setItem("selectedPharmacy", JSON.stringify(pharmacy));
        window.location.href = "onephar.html";
      });

      if (pharmacy["اسم الصيدلية"]) {
        const pharmacyName = document.createElement("h2");
        pharmacyName.textContent = pharmacy["اسم الصيدلية"];
        pharmacyDiv.appendChild(pharmacyName);
      }

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("pharmacy-info");

      if (pharmacy["الفرع"]) {
        const branch = document.createElement("p");
        branch.textContent = `الفرع: ${pharmacy["الفرع"]}`;
        infoDiv.appendChild(branch);
      }

      pharmacyDiv.appendChild(infoDiv);
      pharmacyListElement.appendChild(pharmacyDiv);
    });
  })
  .catch(error => console.error('Error loading pharmacies data:', error));

