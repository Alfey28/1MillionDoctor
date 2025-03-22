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
                document.getElementById("specialty-name").textContent = specialtyData.name;

                let procedureData = specialtyData.procedures.find(p => p.title === selectedProcedure);
                if (procedureData) {
                    document.getElementById("procedure-title").textContent = procedureData.title;
                    document.getElementById("procedure-description").textContent = procedureData.description;
                } else {
                    document.getElementById("procedure-title").textContent = "لم يتم العثور على العملية";
                    document.getElementById("procedure-description").textContent = "";
                }
            } else {
                document.getElementById("specialty-name").textContent = "تخصص غير معروف";
            }
        })
        .catch(error => console.error("خطأ في تحميل البيانات:", error));
});
