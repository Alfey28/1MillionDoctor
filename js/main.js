(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    let lastScrollTop = 0;
$(window).scroll(function () {
    let scrollTop = $(this).scrollTop();

    if (scrollTop > lastScrollTop && scrollTop > 300) {
        // عند التمرير لأسفل يخفي الـ Navbar
        $('.sticky-top').css('top', '-100px');
    } else {
        // عند التمرير لأعلى يظهر الـ Navbar
        $('.sticky-top').css('top', '0px').addClass('shadow-sm');
    }

    lastScrollTop = scrollTop;
});

    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 100, 'linear'); // سرعة أعلى وحركة سلسة
        return false;
    });
    


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: false,
        animateOut: 'fadeOutLeft',
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    
})(jQuery);

/***************************************************************** ***/

//  سلايدر الاطباء في صصفحة index   // 
document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".mySwiper", {
    slidesPerView: 6, // عدد الدكاترة الافتراضي على الشاشات الكبيرة
    spaceBetween: 20, // المسافة بين العناصر
    loop: true, // تشغيل اللوب
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 2000, // تأخير بين الانتقالات (3 ثواني)
        disableOnInteraction: false, // لا يتم تعطيل التشغيل التلقائي عند التفاعل
    },
    breakpoints: {
        0: {
            slidesPerView: 3 // موبايل
        },
        768: {
            slidesPerView: 4 // تابلت
        },
        1024: {
            slidesPerView: 6 // شاشات كبيرة وما فوق
        }
    }
        });
    });

/******************************************************************** */
// لإزالة النصوص داخل الـ input عندما يتم الضغط عليه
// تحميل البيانات من ملف JSON
document.addEventListener("DOMContentLoaded", function () {
    const specialtiesSelect = document.getElementById("specialty-input");
    const doctorsSelect = document.getElementById("doctor");
    const daySelect = document.getElementById("daySelect");
    const timeSelect = document.getElementById("timeSelect");
    const priceContainer = document.getElementById("priceContainer");
    const doctorPrice = document.getElementById("doctorPrice");
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");
    const bookingForm = document.getElementById("bookingForm");

    let specialtiesData = [];

    // تحميل التخصصات والأطباء
    async function fetchSpecialties() {
        try {
            const response = await fetch("js/specialties.json");
            specialtiesData = await response.json();
            console.log("تم تحميل التخصصات بنجاح:", specialtiesData); // طباعة التخصصات
            populateSpecialties();
        } catch (error) {
            console.error("فشل تحميل بيانات التخصصات:", error);
        }
    }

    // تعبئة قائمة التخصصات
    function populateSpecialties() {
        specialtiesSelect.innerHTML = "<option selected disabled>اختر التخصص</option>";
        specialtiesData.forEach((specialty) => {
            const option = document.createElement("option");
            option.value = specialty.id;
            option.textContent = specialty.name;
            specialtiesSelect.appendChild(option);
        });
    }

    // عند اختيار تخصص
    specialtiesSelect.addEventListener("change", function () {
        console.log("تم اختيار التخصص:", this.value); // طباعة التخصص المختار
        const selectedSpecialty = specialtiesData.find((s) => s.id === this.value);
        updateDoctorsList(selectedSpecialty);
    });

    // تحديث قائمة الأطباء بناءً على التخصص
    function updateDoctorsList(selectedSpecialty) {
        doctorsSelect.innerHTML = "<option selected disabled>اختر الطبيب</option>";
        daySelect.innerHTML = "<option selected disabled>اختر اليوم</option>";
        timeSelect.innerHTML = "<option selected disabled>اختر الوقت</option>";
        priceContainer.style.display = "none";

        if (selectedSpecialty && selectedSpecialty.doctors) {
            selectedSpecialty.doctors.forEach((doctor) => {
                const option = document.createElement("option");
                option.value = doctor.id;
                option.textContent = doctor.name;
                option.dataset.days = JSON.stringify(doctor.availableDays);
                option.dataset.times = JSON.stringify(doctor.availableTimes);
                option.dataset.price = doctor.price;
                option.dataset.phone = doctor.phone;
                option.dataset.whatsapp = doctor.whatsapp;
                doctorsSelect.appendChild(option);
            });
        }
    }

    // عند اختيار طبيب
    doctorsSelect.addEventListener("change", function () {
        const selectedDoctor = doctorsSelect.options[doctorsSelect.selectedIndex];
        const availableDays = JSON.parse(selectedDoctor.dataset.days || "[]");
        const price = selectedDoctor.dataset.price;

        console.log("تم اختيار الطبيب:", selectedDoctor.textContent); // طباعة الطبيب المختار
        console.log("الأيام المتاحة:", availableDays); // طباعة الأيام المتاحة

        daySelect.innerHTML = "<option selected disabled>اختر اليوم</option>";
        timeSelect.innerHTML = "<option selected disabled>اختر الوقت</option>";

        availableDays.forEach((day) => {
            const dates = getNextDates(day);
            dates.forEach(date => {
                daySelect.innerHTML += `<option value="${day}">${day} - ${date}</option>`;
            });
        });

        if (price) {
            doctorPrice.textContent = `${price} جنيه`;
            priceContainer.style.display = "flex";
        } else {
            priceContainer.style.display = "none";
        }
    });

    function getNextDates(dayName) {
        const daysOfWeek = {
            "الأحد": 0,
            "الإثنين": 1,
            "الثلاثاء": 2,
            "الأربعاء": 3,
            "الخميس": 4,
            "الجمعة": 5,
            "السبت": 6
        };

        const today = new Date();
        let currentDay = today.getDay();
        let targetDay = daysOfWeek[dayName];

        let difference = targetDay - currentDay;
        if (difference < 0) difference += 7;

        const firstDate = new Date();
        firstDate.setDate(today.getDate() + difference);

        const secondDate = new Date(firstDate);
        secondDate.setDate(firstDate.getDate() + 7);

        return [
            firstDate.toLocaleDateString("ar-EG"),
            secondDate.toLocaleDateString("ar-EG")
        ];
    }

    // عند اختيار يوم
    daySelect.addEventListener("change", function () {
        console.log("تم اختيار اليوم:", this.value); // طباعة اليوم المختار

        const selectedDoctor = doctorsSelect.options[doctorsSelect.selectedIndex];
        const availableTimes = JSON.parse(selectedDoctor.dataset.times || "{}");

        timeSelect.innerHTML = "<option selected disabled>اختر الوقت</option>";

        if (availableTimes[this.value]) {
            availableTimes[this.value].forEach((time) => {
                timeSelect.innerHTML += `<option value="${time}">${time}</option>`;
            });
        }
    });

    // التحقق من رقم الهاتف
    phoneInput.addEventListener("input", function () {
        const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            phoneError.style.display = "block";
            phoneError.textContent = "رقم الهاتف غير صحيح";
            phoneInput.style.borderColor = "red";
            phoneInput.style.backgroundColor = "#f8d7da";
        } else {
            phoneError.style.display = "none";
            phoneInput.style.borderColor = "";
            phoneInput.style.backgroundColor = "";
        }
    });

    // التحقق من صحة الحجز قبل الإرسال
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameInput = document.getElementById("name");
        const phone = phoneInput.value.trim();
        const selectedSpecialty = specialtiesSelect.value;
        const selectedDoctor = doctorsSelect.value;
        const selectedDay = daySelect.value;
        const selectedTime = timeSelect.value;
        const doctorPriceValue = doctorPrice.textContent || "غير محدد";
        const selectedDoctorOption = doctorsSelect.options[doctorsSelect.selectedIndex];
        const doctorContact = selectedDoctorOption ? (selectedDoctorOption.dataset.whatsapp || selectedDoctorOption.dataset.phone) : '';

        let hasError = false;

        // دالة لضبط تنسيق الأخطاء
        function setError(inputElement) {
            inputElement.style.borderColor = "red";
            inputElement.style.backgroundColor = "#f8d7da";
            hasError = true;
        }

        // دالة لإزالة الأخطاء عند التصحيح
        function clearError(inputElement) {
            inputElement.style.borderColor = "";
            inputElement.style.backgroundColor = "";
        }

        // التحقق من كل الحقول النصية
        if (!nameInput.value.trim()) {
            setError(nameInput);
        } else {
            clearError(nameInput);
        }

        if (!phone) {
            setError(phoneInput);
        } else {
            clearError(phoneInput);
        }

        // التحقق من الـ Select (التخصص - الطبيب - اليوم - الوقت)
        if (!selectedSpecialty || selectedSpecialty === "اختر التخصص") {
            setError(specialtiesSelect);
        } else {
            clearError(specialtiesSelect);
        }

        if (!selectedDoctor || selectedDoctor === "اختر الطبيب") {
            setError(doctorsSelect);
        } else {
            clearError(doctorsSelect);
        }

        if (!selectedDay || selectedDay === "اختر اليوم") {
            setError(daySelect);
        } else {
            clearError(daySelect);
        }

        if (!selectedTime || selectedTime === "اختر الوقت") {
            setError(timeSelect);
        } else {
            clearError(timeSelect);
        }

        // إيقاف الإرسال في حالة وجود خطأ
        if (hasError) {
            return;
        }

        const selectedDayText = daySelect.options[daySelect.selectedIndex].text;
        const formattedTime = formatTime(selectedTime);

        const message = `
        👤 الاسم: ${nameInput.value.trim()}
        📞 رقم الهاتف: ${phone}
        📅 اليوم: ${selectedDayText} 
        🕓 الوقت: ${formattedTime} 
        🩺 التخصص: ${specialtiesSelect.options[specialtiesSelect.selectedIndex].text}
        👨‍⚕️ الطبيب: ${doctorsSelect.options[doctorsSelect.selectedIndex].text}
        💰 سعر الكشف: ${doctorPriceValue}
        `;

        const whatsappLink = `https://wa.me/${doctorContact}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, "_blank");
    });

    // تحويل الوقت إلى تنسيق 12 ساعة
    // تحويل الوقت إلى تنسيق 12 ساعة
function formatTime(time) {
    if (!time || typeof time !== "string" || !time.includes(":")) {
        return "غير محدد";  
    }

    let [hours, minutes] = time.split(":").map(Number);

    if (isNaN(hours) || isNaN(minutes)) {
        return "غير محدد";
    }

    let period = "صباحًا";

    // تحويل إلى نظام 12 ساعة
    if (hours >= 12) {
        period = "مساءً";
        if (hours > 12) {
            hours -= 12;
        }
    } else if (hours === 0) {
        hours = 12; // تحويل 00:00 إلى 12 صباحًا
    }

    return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

    
    
    

    // تحميل التخصصات عند فتح الصفحة
    fetchSpecialties();
});
//******************************************************************** */
    //   عرض الاطباء في صفحة index  // 
    fetch("js/doctors.json") // تأكد من المسار الصحيح للملف
    .then(response => response.json())
    .then(doctors => {
        const container = document.getElementById("doctors-container");
        
        doctors.forEach(doctor => {
            const doctorCard = `
                <div class="swiper-slide">
                    <a class="text-decoration" href="doctors.html?id=${doctor.id}">
                        <div class="team-item rounded overflow-hidden" data-id="${doctor.id}">
                            <div class="overflow-hidden">
                                <img width="1000px" class="img-fluid" src="${doctor.image}" alt="${doctor.name}">
                            </div>
                            <div class="team-text text-center p-4">
                                <h5>${doctor.name}</h5>
                                <p class="special-color">${doctor.specialty}</p>
                                <p class="address-color">${doctor.clinic_address}</p>
                            </div>
                        </div>
                    </a>
                </div>
            `;
            container.innerHTML += doctorCard;
        });
    })
    .catch(error => console.error("خطأ أثناء تحميل بيانات الأطباء:", error));


    document.addEventListener("DOMContentLoaded", function () {
        fetch("js/specialties.json")
            .then(response => response.json())
            .then(data => {
                let specialtySelect = document.getElementById("specialty-select");
                let procedureSelect = document.getElementById("procedure-select");
                let showButton = document.getElementById("show-button");
    
                // إضافة التخصصات إلى القائمة
                if (Array.isArray(data)) {
                    data.forEach(specialty => {
                        let option = document.createElement("option");
                        option.value = specialty.id; // تحديد قيمة التخصص بمعرفه
                        option.textContent = specialty.name;
                        specialtySelect.appendChild(option);
                    });
                }
    
                // تحديث العمليات عند اختيار تخصص معين
                specialtySelect.addEventListener("change", function () {
                    let selectedSpecialty = this.value;
                    procedureSelect.innerHTML = "<option value=''>اختر العملية</option>"; // تفريغ القائمة
    
                    let selectedData = data.find(s => s.id === selectedSpecialty);
                    if (selectedData && Array.isArray(selectedData.procedures)) {
                        selectedData.procedures.forEach(procedure => {
                            let option = document.createElement("option");
                            option.value = procedure.title;
                            option.textContent = procedure.title;
                            procedureSelect.appendChild(option);
                        });
                    }
                });
    
                // عند الضغط على الزر، يتم التحقق والانتقال إلى الصفحة
                showButton.addEventListener("click", function () {
                    let selectedSpecialty = specialtySelect.value;
                    let selectedProcedure = procedureSelect.value;
    
                    if (!selectedSpecialty) {
                        alert("يرجى اختيار التخصص أولًا!"); 
                        return;
                    }
    
                    if (!selectedProcedure) {
                        alert("يرجى اختيار العملية!"); 
                        return;
                    }
    
                    // الانتقال إلى الصفحة مع تمرير التخصص والعملية
                    window.location.href = `amalyat.html?specialty=${encodeURIComponent(selectedSpecialty)}&procedure=${encodeURIComponent(selectedProcedure)}`;
                });
            })
            .catch(error => console.error("خطأ في تحميل البيانات:", error));
    });
    
    



    document.addEventListener("DOMContentLoaded", function () {
        const offerText = document.querySelector(".offer-text");
    
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    offerText.classList.add("visible");
                }
            });
        }, { threshold: 0.5 });
    
        observer.observe(offerText);
    });    
    




