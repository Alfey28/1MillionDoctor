// استخراج الـ ID و الـ Source من الـ URL
const urlParams = new URLSearchParams(window.location.search);
const doctorId = urlParams.get("id");
const source = urlParams.get("source") || "doctors"; // الافتراضي يكون doctors.json

// دالة لعرض بيانات الدكتور
function displayDoctorData(doctor) {
    if (doctor) {
        document.getElementById("doctor-image").src = doctor.image;
        document.getElementById("doctor-name").textContent = doctor.name;
        document.getElementById("clinic-address").textContent = doctor.clinic_address;
        document.getElementById("clinic-address").href = `https://www.google.com/maps/search/?q=${encodeURIComponent(doctor.clinic_address)}`;
        document.getElementById("doctor-phone").textContent = doctor.phone;
        document.getElementById("doctor-phone").href = `tel:${doctor.phone}`;
        document.getElementById("doctor-bio").textContent = doctor.bio;
        document.getElementById("doctor-experience").textContent = doctor.experience.join(", ");
        document.getElementById("doctor-services").textContent = doctor.services.join(", ");
        document.getElementById("doctor-email").textContent = doctor.contact.email;
        document.getElementById("doctor-facebook").href = doctor.contact.social.facebook;
        document.getElementById("doctor-whatsapp").href = `https://wa.me/${doctor.phone}`;
    } else {
        document.getElementById("doctor-info").innerHTML = "<p>لا توجد بيانات لهذا الدكتور.</p>";
    }
}

// تحديد مصدر البيانات
const dataFile = source === "specialties" ? "./js/specialties.json" : "./js/doctors.json";

// جلب البيانات من الملف الصحيح
fetch(dataFile)
    .then(response => response.json())
    .then(data => {
        let doctor;
        if (source === "specialties") {
            let allDoctors = [];
            data.forEach(specialty => allDoctors = allDoctors.concat(specialty.doctors));
            doctor = allDoctors.find(d => d.id == doctorId);
        } else {
            doctor = data.find(d => d.id == doctorId);
        }
        displayDoctorData(doctor);
    })
    .catch(error => console.error("حدث خطأ أثناء تحميل البيانات:", error));
