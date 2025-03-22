// الحصول على id من URL
const urlParams = new URLSearchParams(window.location.search);
const doctorId = urlParams.get("id");

// جلب بيانات الأطباء من ملف JSON
fetch("./js/doctors.json")
    .then(response => response.json())
    .then(doctors => {
        const doctor = doctors.find(d => d.id == doctorId);
        if (doctor) {
            document.getElementById("doctor-image").src = doctor.image;
            document.getElementById("doctor-name").textContent = doctor.name;
            
            // ربط العنوان بخريطة جوجل
            let clinicAddress = document.getElementById("clinic-address");
            clinicAddress.textContent = doctor.clinic_address;
            clinicAddress.href = `https://www.google.com/maps/search/?q=${encodeURIComponent(doctor.clinic_address)}`;

            // ربط الهاتف بالاتصال
            let phoneElement = document.getElementById("doctor-phone");
            phoneElement.textContent = doctor.phone;
            phoneElement.href = `tel:${doctor.phone}`;

            document.getElementById("doctor-bio").textContent = doctor.bio;
            document.getElementById("doctor-experience").textContent = doctor.experience.join(", ");
            document.getElementById("doctor-services").textContent = doctor.services.join(", ");
            document.getElementById("doctor-email").textContent = doctor.contact.email;
            document.getElementById("doctor-facebook").href = doctor.contact.social.facebook;

            // ربط الواتساب برقم الهاتف
            document.getElementById("doctor-whatsapp").href = `https://wa.me/${doctor.phone}`;
        } else {
            document.getElementById("doctor-info").innerHTML = "<p>لا توجد بيانات لهذا الدكتور.</p>";
        }
    })
    .catch(error => console.error("حدث خطأ أثناء تحميل البيانات:", error));