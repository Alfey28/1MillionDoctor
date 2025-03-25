document.addEventListener("DOMContentLoaded", function () {
    // استخراج معرف التخصص من الرابط
    const urlParams = new URLSearchParams(window.location.search);
    const specialtyId = urlParams.get("id");

    fetch("./js/specialties.json")
        .then(response => response.json())
        .then(data => {
            const specialty = data.find(s => s.id === specialtyId);

            if (specialty) {
                // تحديث معلومات التخصص
                document.getElementById("specialty-name").textContent = specialty.name;

                // تحديث قائمة العمليات
                const proceduresList = document.getElementById("procedures-list");
                specialty.procedures.forEach(procedure => {
                    let procedureItem = document.createElement("div");
                    procedureItem.classList.add("procedure-card");

                    procedureItem.innerHTML = `
                        <div class="procedure-content w-75 mb-5">
                            <h3 class="text-color">${procedure.title}</h3>
                            <p>${procedure.description}</p>
                        </div>
                    `;

                    proceduresList.appendChild(procedureItem);
                });

                // تحديث قائمة الأطباء
                // تحديث قائمة الأطباء
                // تحديث قائمة الأطباء
                const doctorsList = document.getElementById("doctors-list");

                specialty.doctors.forEach(doctor => {
                    let doctorDiv = document.createElement("div");
                    doctorDiv.classList.add("doctor-card");

                    doctorDiv.innerHTML = `
                        <img src="${doctor.image}" alt="د. ${doctor.name}">
                        <h3>${doctor.name}</h3>
                        <p>${doctor.clinic_address}</p>
                        <p>📞 <a href="tel:${doctor.phone}">${doctor.phone}</a></p>
                    `;

                    // عند الضغط على الدكتور، انتقل لصفحة doctors.html مع تمرير اسم التخصص والـ ID في الـ URL
                    doctorDiv.addEventListener("click", () => {
                        window.location.href = `doctors.html?id=${doctor.id}&source=specialties`;
                    });

                    doctorsList.appendChild(doctorDiv);
                });






            } else {
                document.body.innerHTML = "<h2>التخصص غير موجود</h2>";
            }
        })
        .catch(error => console.error("حدث خطأ أثناء تحميل البيانات:", error));
});

