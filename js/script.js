document.addEventListener("DOMContentLoaded", function () {
    // جلب بيانات التخصصات من ملف JSON
    const urlParams = new URLSearchParams(window.location.search);
    const specialtyId = urlParams.get("id");

    fetch("./js/specialties.json")
        .then(response => response.json())
        .then(data => {
            const specialty = data.find(s => s.id === specialtyId);
            if (specialty) {
                // تحديث معلومات التخصص
                document.getElementById("specialty-name").textContent = specialty.name;
                document.getElementById("specialty-description").textContent = specialty.description;
                document.getElementById("specialty-image").src = specialty.image;

                // تحديث قائمة العمليات
                const proceduresList = document.getElementById("procedures-list");
                specialty.procedures.forEach(procedure => {
                    let li = document.createElement("li");
                    li.textContent = procedure;
                    proceduresList.appendChild(li);
                });

                // تحديث قائمة الأطباء
                const doctorsList = document.getElementById("doctors-list");
                specialty.doctors.forEach(doctor => {
                    let doctorDiv = document.createElement("div");
                    doctorDiv.classList.add("doctor-card");

                    doctorDiv.innerHTML = `
                        <img src="${doctor.image}" alt="د. ${doctor.name}">
                        <h3>${doctor.name}</h3>
                        <p>${doctor.address}</p>
                        <p>📞 <a href="tel:${doctor.phone}">${doctor.phone}</a></p>
                    `;

                    doctorsList.appendChild(doctorDiv);
                });

            } else {
                document.body.innerHTML = "<h2>التخصص غير موجود</h2>";
            }
        })
        .catch(error => console.error("حدث خطأ أثناء تحميل البيانات:", error));
});
