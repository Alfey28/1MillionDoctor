document.addEventListener("DOMContentLoaded", function () {
    // استخراج القيم من الـ URL
    const params = new URLSearchParams(window.location.search);
    const selectedSpecialty = params.get("specialty");
    const selectedProcedure = params.get("procedure");

    // التحقق من وجود القيم
    if (!selectedSpecialty || !selectedProcedure) {
        alert("لم يتم اختيار تخصص أو عملية صحيحة!");
        window.location.href = "index.html"; // إعادة التوجيه للصفحة الرئيسية إذا لم يكن هناك بيانات
        return;
    }

    // تحميل البيانات من specialties.json
    fetch("js/specialties.json")
    .then(response => response.json())
    .then(data => {
        let specialtyData = data.find(s => s.id === selectedSpecialty);

        if (specialtyData) {
            let specialtyNameElement = document.getElementById("specialty-name");
            let procedureTitleElement = document.getElementById("procedure-title");
            let procedureDescriptionElement = document.getElementById("procedure-description");
            let procedureDetailsElement = document.getElementById("procedure-details");

            if (!specialtyNameElement || !procedureTitleElement || !procedureDescriptionElement || !procedureDetailsElement) {
                console.error("خطأ: تأكد من أن جميع العناصر موجودة في HTML");
                return;
            }

            specialtyNameElement.textContent = specialtyData.name;

            let procedureData = specialtyData.procedures.find(p => p.title === selectedProcedure);
            if (procedureData) {
                procedureTitleElement.innerHTML = `<span class="bold">${procedureData.title}</span>`;
                procedureDescriptionElement.innerHTML = `<span class="bold red">📌 الوصف:</span> ${procedureData.description}`;

                let procedureDetails = `
                    <p><span class="bold">🔹 السبب:</span></p>
                    <ul>
                        ${procedureData.reson1 ? `<li>${procedureData.reson1}</li>` : ""}
                        ${procedureData.reson2 ? `<li>${procedureData.reson2}</li>` : ""}
                        ${procedureData.reson3 ? `<li>${procedureData.reson3}</li>` : ""}
                    </ul>

                    <p><span class="bold">🔹 طريقة الجراحة:</span></p>
                    <ul>
                        ${procedureData.surgery1 ? `<li>${procedureData.surgery1}</li>` : ""}
                        ${procedureData.surgery2 ? `<li>${procedureData.surgery2}</li>` : ""}
                        ${procedureData.surgery3 ? `<li>${procedureData.surgery3}</li>` : ""}
                    </ul>

                    <p><span class="bold">🔹 التعافي:</span></p>
                    <ul>
                        ${procedureData.health1 ? `<li>${procedureData.health1}</li>` : ""}
                        ${procedureData.health2 ? `<li>${procedureData.health2}</li>` : ""}
                    </ul>
                `;

                procedureDetailsElement.innerHTML = procedureDetails;
            } else {
                procedureTitleElement.textContent = "لم يتم العثور على العملية";
                procedureDescriptionElement.textContent = "";
                procedureDetailsElement.innerHTML = "";
            }
        } else {
            document.getElementById("specialty-name").textContent = "تخصص غير معروف";
        }
    })
    .catch(error => console.error("خطأ في تحميل البيانات:", error));


});
