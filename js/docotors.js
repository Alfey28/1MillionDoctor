const urlParams = new URLSearchParams(window.location.search),
    doctorId = urlParams.get("id"),
    source = urlParams.get("source") || "doctors";

function displayDoctorData(doctor) {

    if (doctor) {
        // استخراج بيانات WhatsApp وتمريرها لدالة sendToWhatsApp
        const doctorWhatsapp = doctor.whatsapp;

        if (doctor.image) document.getElementById("doctor-image").src = doctor.image;
        if (doctor.name) document.getElementById("doctor-name").textContent = doctor.name;
        
        if (doctor.clinic1 && doctor.clinic1.clinic_address1) {
            // إذا كانت العيادة موجودة في ملف specialties.json
            document.getElementById("clinic-address1").textContent = doctor.clinic1.clinic_address1;
            document.getElementById("clinic-address1").href = doctor.location || `https://www.google.com/maps/search/?q=${encodeURIComponent(doctor.clinic1.clinic_address1)}`;
        } else if (doctor.clinic_address1) {
            // إذا كانت العيادة موجودة في ملف doctors.json
            document.getElementById("clinic-address1").textContent = doctor.clinic_address1;
            document.getElementById("clinic-address1").href = doctor.location || `https://www.google.com/maps/search/?q=${encodeURIComponent(doctor.clinic_address1)}`;
        }


        if (doctor.clinic2 && doctor.clinic2.clinic_address2) {
            // إذا كانت العيادة الثانية موجودة في ملف specialties.json
            document.getElementById("clinic-address2").textContent = doctor.clinic2.clinic_address2;
            document.getElementById("icon-location").classList.remove("d-none"); // إظهار أيقونة الموقع
            document.getElementById("clinic-address2").href = doctor.location || `https://www.google.com/maps/search/?q=${encodeURIComponent(doctor.clinic2.clinic_address2)}`;
        } else if (doctor.clinic_address2) {
            // إذا كانت العيادة موجودة في ملف doctors.json
            document.getElementById("clinic-address2").textContent = doctor.clinic_address2;
            document.getElementById("icon-location").classList.remove("d-none"); // إظهار أيقونة الموقع
            document.getElementById("clinic-address2").href = doctor.location || `https://www.google.com/maps/search/?q=${encodeURIComponent(doctor.clinic_address2)}`;
        }
        

        let hasSocialLinks = false;

        if (doctor.contact && doctor.contact.social) {
            if (doctor.contact.social.twitter) {
                document.getElementById("doctor-twitter").href = doctor.contact.social.twitter;
                document.getElementById("doctor-twitter").style.display = "inline-block";
                hasSocialLinks = true;
            }

            if (doctor.contact.social.facebook) {
                document.getElementById("doctor-facebook").href = doctor.contact.social.facebook;
                document.getElementById("doctor-facebook").style.display = "inline-block";
                hasSocialLinks = true;
            }

            if (doctor.contact?.social?.instagram) {
                document.getElementById("doctor-instagram").href = doctor.contact.social.instagram;
                document.getElementById("doctor-instagram").style.display = "inline-block";
                hasSocialLinks = true;
            }
        }

        if (doctor.whatsapp) {
            document.getElementById("doctor-whatsapp").href = `https://wa.me/${doctor.whatsapp}`;
            document.getElementById("doctor-whatsapp").style.display = "inline-block";
            hasSocialLinks = true;
        }

        if (hasSocialLinks) {
            document.getElementById("social-container").style.display = "block";
        }

        if (doctor.phone) {
            document.getElementById("doctor-phone").textContent = doctor.phone;
            document.getElementById("doctor-phone").href = `tel:${doctor.phone}`;
        }

        if (doctor.specialty) {
            document.getElementById("doctor-specialty").textContent = doctor.specialty;
            document.getElementById("specialty-container").style.display = "block";
        }

        if (doctor.bio) {
            document.getElementById("doctor-bio").textContent = doctor.bio;
            document.getElementById("bio-container").style.display = "block";
        }

        if (doctor.experience) {
            document.getElementById("doctor-experience").textContent = doctor.experience.join(", ");
            document.getElementById("experience-container").style.display = "block";
        }

        if (doctor.services) {
            document.getElementById("doctor-services").textContent = doctor.services.join(", ");
            document.getElementById("services-container").style.display = "block";
        }

        if (doctor.contact && doctor.contact.email) {
            document.getElementById("doctor-email").textContent = doctor.contact.email;
            document.getElementById("email-container").style.display = "block";
        }

        // ✅ تفاصيل العيادة
        if (doctor.clinicDetails) {
            document.getElementById("clinic-details").textContent = doctor.clinicDetails;
            document.getElementById("clinic-details-container").style.display = "block";
        }

        

        // ✅ صور قبل وبعد
        if (doctor.beforeAfterImages && doctor.beforeAfterImages.length > 0) {
            const container = document.getElementById("before-after-images");
            container.innerHTML = "";

            doctor.beforeAfterImages.forEach((image) => {
                const imageWrapper = document.createElement("div");
                imageWrapper.classList.add("image-with-caption");

                const img = document.createElement("img");
                img.src = image.src;
                img.alt = "Before and After";
                img.classList.add("clinic-image");

                const caption = document.createElement("p");
                caption.textContent = image.caption || ""; // لو مفيش كابشن ممكن تسيبه فاضي
                caption.classList.add("image-caption");

                imageWrapper.appendChild(img);
                imageWrapper.appendChild(caption);
                container.appendChild(imageWrapper);
            });

            document.getElementById("before-after-container").style.display = "block";
        }


        // ✅ صور الأجهزة
        if (doctor.equipmentImages && doctor.equipmentImages.length > 0) {
            const container = document.getElementById("equipment-images");
            container.innerHTML = "";

            doctor.equipmentImages.forEach((image) => {
                const imageWrapper = document.createElement("div");
                imageWrapper.classList.add("image-with-caption");

                const img = document.createElement("img");
                img.src = image.src;
                img.alt = "Equipment";
                img.classList.add("clinic-image");

                const caption = document.createElement("p");
                caption.textContent = image.caption || "";
                caption.classList.add("image-caption");

                imageWrapper.appendChild(img);
                imageWrapper.appendChild(caption);
                container.appendChild(imageWrapper);
            });

            document.getElementById("equipment-container").style.display = "block";
        }

        // التحقق من وجود رابط WhatsApp بعد تحميل البيانات
        if (doctorWhatsapp) {
            document.getElementById("doctor-whatsapp").href = `https://wa.me/${doctorWhatsapp}`;
            document.getElementById("doctor-whatsapp").style.display = "inline-block";
            hasSocialLinks = true;
        }

    } else {
        document.getElementById("doctor-info").innerHTML = "<p>لا توجد بيانات لهذا الدكتور.</p>";
    }
}

const dataFile = source === "specialties" ? "./js/specialties.json" : "./js/doctors.json";

fetch(dataFile)
    .then((response) => response.json())
    .then((data) => {
        let doctor;
        if (source === "specialties") {
            let allDoctors = [];
            data.forEach((specialty) => {
                allDoctors = allDoctors.concat(specialty.doctors);
            });
            doctor = allDoctors.find((d) => d.id == doctorId);
        } else {
            doctor = data.find((d) => d.id == doctorId);
        }
        displayDoctorData(doctor);
    })
    .catch((error) => console.error("حدث خطأ أثناء تحميل البيانات:", error));

    // // // // // // // // // // // //كود فورم الحجز // // // // // // // // // // // // // // 
    
    
    function loadDoctorClinics() {
    const doctorId = new URLSearchParams(window.location.search).get('id');
    
    if (!doctorId) {
        console.error('لم يتم تحديد الطبيب في الـ URL.');
        return;
    }
    
    fetch('./js/specialties.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`فشل تحميل البيانات: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('البيانات تم تحميلها بنجاح:', data);
    
            let doctor = null;
    
            // البحث عن الطبيب باستخدام doctorId في جميع التخصصات
            for (let specialty of data) {
                doctor = specialty.doctors.find(d => d.id == doctorId);
                if (doctor) break; // إذا تم العثور على الطبيب، يتم الخروج من الحلقة
            }
    
            if (doctor) {
                // استدعاء دالة لملء قائمة العيادات
                populateClinics(doctor);
            } else {
                console.error("لم يتم العثور على الطبيب في التخصصات.");
            }
        })
        .catch(error => {
            console.error('خطأ أثناء تحميل البيانات:', error);
        });
}

function populateClinics(doctor) {
    const clinicSelect = document.getElementById('vertical-clinic');
    const daySelect = document.getElementById('vertical-daySelect');
    const timeSelect = document.getElementById('vertical-timeSelect');

    // التأكد من أن العناصر موجودة في الـ HTML
    if (!clinicSelect || !daySelect || !timeSelect) {
        console.error("العناصر المطلوبة غير موجودة في الـ HTML");
        return;
    }

    // إعادة تعيين العناصر السابقة في القوائم المنسدلة
    clinicSelect.innerHTML = '<option selected disabled> اختر العيادة </option>';
    daySelect.innerHTML = '<option selected disabled> اختر اليوم </option>';
    timeSelect.innerHTML = '<option selected disabled> اختر الوقت </option>';

    // إضافة العيادات إلى القائمة المنسدلة
    const clinics = [
        doctor.clinic1?.clinic_address1, 
        doctor.clinic2?.clinic_address2
    ].filter(Boolean);

    clinics.forEach(clinicAddress => {
        const option = document.createElement('option');
        option.value = clinicAddress; // قيمة العيادة
        option.textContent = clinicAddress; // عرض العنوان فقط
        clinicSelect.appendChild(option);
    });

    // إضافة الأيام والأوقات بناءً على العيادة
    clinicSelect.addEventListener('change', function() {
        const selectedClinic = clinicSelect.value;

        let availableDays = [];
        let availableTimes = [];

        // الحصول على الأيام والأوقات المتاحة بناءً على العيادة
        if (selectedClinic === doctor.clinic1?.clinic_address1) {
            availableDays = doctor.clinic1?.availableDays || [];
            availableTimes = doctor.clinic1?.availableTimes || [];
        } else if (selectedClinic === doctor.clinic2?.clinic_address2) {
            availableDays = doctor.clinic2?.availableDays || [];
            availableTimes = doctor.clinic2?.availableTimes || [];
        }

        // إعادة تعيين الأيام والأوقات عند اختيار العيادة
        daySelect.innerHTML = '<option selected disabled> اختر اليوم </option>';
        timeSelect.innerHTML = '<option selected disabled> اختر الوقت </option>';

        // إضافة الأيام المتاحة مع التاريخ المحلي لمدة أسبوعين (يومين لكل يوم)
        availableDays.forEach(day => {
            const daysWithDates = getNextTwoWeeksDates(day);  // الحصول على يومين مع التواريخ لكل يوم

            daysWithDates.forEach(dayWithDate => {
                const option = document.createElement('option');
                option.value = dayWithDate.date; // استخدام التاريخ بدلاً من اليوم
                option.textContent = `${dayWithDate.day} - ${dayWithDate.date}`; // عرض اليوم مع التاريخ المحلي
                daySelect.appendChild(option);
            });
        });

        // إضافة الأوقات المتاحة عند اختيار اليوم
        daySelect.addEventListener('change', function() {
            const selectedDay = daySelect.value;

            // إعادة تعيين الأوقات عند اختيار اليوم
            timeSelect.innerHTML = '<option selected disabled> اختر الوقت </option>';

            availableTimes.forEach(time => {
                const option = document.createElement('option');
                option.value = time; // قيمة الوقت
                option.textContent = time; // عرض الوقت
                timeSelect.appendChild(option);
            });
        });
    });
}

// دالة للحصول على التواريخ المحلية لمدة أسبوعين (يومين لكل يوم)
// دالة للحصول على التواريخ المحلية لمدة أسبوعين (يومين لكل يوم)
// دالة للحصول على التواريخ المحلية لمدة أسبوعين (يومين لكل يوم)
function getNextTwoWeeksDates(day) {
    const daysOfWeek = {
        "الأحد": 0,
        "الأثنين": 1,
        "الثلاث": 2,
        "الأربع": 3,
        "الخميس": 4,
        "الجمعة": 5,
        "السبت": 6
    };

    const today = new Date();
    let currentDay = today.getDay();  // اليوم الحالي
    let targetDay = daysOfWeek[day];  // اليوم الذي نبحث عنه (من الأيام المحددة)

    let difference = targetDay - currentDay;
    if (difference < 0) {
        difference += 7;  // إذا كان اليوم الذي نبحث عنه في الأسبوع المقبل
    }

    const firstDate = new Date(today);  // إنشاء نسخة جديدة من التاريخ الحالي
    firstDate.setDate(today.getDate() + difference);  // تحديد تاريخ اليوم الأول

    const secondDate = new Date(firstDate);  // إنشاء نسخة جديدة من التاريخ الأول
    secondDate.setDate(firstDate.getDate() + 7);  // تحديد تاريخ اليوم الثاني بعد أسبوع

    // إرجاع اليومين مع التواريخ المحلية
    return [
        { day, date: firstDate.toLocaleDateString("ar-EG") }, // إرسال التاريخ فقط
        { day, date: secondDate.toLocaleDateString("ar-EG") }  // إرسال التاريخ فقط
    ];
}





// استدعاء دالة تحميل البيانات عند تحميل الصفحة
window.onload = loadDoctorClinics;


    
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// دالة للتحقق من صحة البيانات
// دالة للتحقق من صحة البيانات
// دالة للتحقق من صحة البيانات
function validateForm() {
    // الحصول على الحقول
    var name = document.getElementById('vertical-name');
    var phone = document.getElementById('vertical-phone');
    var clinic = document.getElementById('vertical-clinic');
    var day = document.getElementById('vertical-daySelect');
    var time = document.getElementById('vertical-timeSelect');
    var errorMessage = document.getElementById('vertical-error-message');

    // إخفاء رسالة الخطأ في البداية
    errorMessage.style.display = 'none';

    // إزالة اللون الأحمر من جميع الحقول
    [name, phone, clinic, day, time].forEach(function(field) {
        field.style.backgroundColor = ''; // إزالة اللون الأحمر عند الكتابة
    });

    // التحقق من الحقول الفارغة أو غير المختارة
    var allFieldsValid = true; // متغير لتتبع إذا كانت جميع الحقول مكتملة

    if (!name.value) {
        name.style.backgroundColor = '#fccbcb';
        allFieldsValid = false;
    }
    if (!phone.value) {
        phone.style.backgroundColor = '#fccbcb';
        allFieldsValid = false;
    }
    if (!clinic.value || clinic.selectedIndex === 0) {  // تحقق إذا كانت العيادة غير مختارة
        clinic.style.backgroundColor = '#fccbcb';
        allFieldsValid = false;
    }
    if (!day.value || day.selectedIndex === 0) {  // تحقق إذا كان اليوم غير مختار
        day.style.backgroundColor = '#fccbcb';
        allFieldsValid = false;
    }
    if (!time.value || time.selectedIndex === 0) {  // تحقق إذا كان الوقت غير مختار
        time.style.backgroundColor = '#fccbcb';
        allFieldsValid = false;
    }

    // إذا كانت هناك حقل غير مكتمل، عرض رسالة خطأ
    if (!allFieldsValid) {
        errorMessage.innerText = 'من فضلك، أكمل جميع الحقول.';
        errorMessage.style.display = 'block';
        return false;  // لا يتم إرسال النموذج
    }

    // التحقق من رقم الهاتف
    var phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    if (!phoneRegex.test(phone.value)) {
        errorMessage.innerText = 'رقم الهاتف غير صحيح. يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015 ويكون مكون من 11 رقم.';
        errorMessage.style.display = 'block';
        phone.style.backgroundColor = 'red';  // تغيير اللون الأحمر للحقل
        return false;  // لا يتم إرسال النموذج
    }

    // الحصول على رقم الـ WhatsApp من بيانات الطبيب
    var doctorWhatsapp = document.getElementById('doctor-whatsapp') ? document.getElementById('doctor-whatsapp').href.split('/').pop() : '';

    // إذا كانت جميع الحقول صحيحة، إرسال البيانات عبر WhatsApp
    sendToWhatsApp(name.value, phone.value, clinic.value, day.value, time.value, doctorWhatsapp);
    return false; // منع إرسال النموذج بشكل تقليدي
}


// دالة لإرسال البيانات عبر WhatsApp
function sendToWhatsApp(name, phone, clinic, day, time, doctorWhatsapp) {
    var message = `
✨ *كشف جديد* ✨

👤 *الاسم:* ${name}
📞 *رقم الهاتف:* ${phone}
🏥 *العيادة:* ${clinic}
📅 *اليوم:* ${day}
🕒 *الوقت:* ${time}
`;

    // إضافة كود البلد مصر (20) إلى رقم الهاتف
    var fullPhone = '+20' + doctorWhatsapp; // دمج كود البلد مع الرقم المحلي

    // استخدام رقم WhatsApp المعطى من بيانات الطبيب مع رقم الهاتف
    var whatsappLink = `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

// إضافة الحدث عند إرسال النموذج
document.getElementById('vertical-bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // منع إرسال النموذج بشكل تقليدي
    validateForm(); // التحقق من صحة البيانات
});







    
    
    