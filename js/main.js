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


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
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

    //   اكواد form الحجز صفحة index  //
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("bookingForm");
        const errorMessage = document.getElementById("error-message");
        const fields = form.querySelectorAll("input, select"); // جلب جميع الحقول
    
        // إزالة الخطأ بمجرد أن يبدأ المستخدم في إدخال بيانات
        fields.forEach(field => {
            field.addEventListener("input", function () {
                if (field.value.trim()) {
                    field.classList.remove("error");
                }
            });
    
            // معالجة الحقول التي تعتمد على التحديد مثل الـ select
            field.addEventListener("change", function () {
                if (field.value.trim()) {
                    field.classList.remove("error");
                }
            });
        });
    
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // منع الإرسال الافتراضي
    
            let isValid = true;
    
            fields.forEach(field => {
                if (!field.value.trim()) { // التحقق إذا كان الحقل فارغًا
                    isValid = false;
                    field.classList.add("error"); // إضافة كلاس لتلوين الحقل بالأحمر
                } else {
                    field.classList.remove("error"); // إزالة اللون الأحمر إذا تم ملء الحقل
                }
            });
    
            if (!isValid) {
                setTimeout(() => errorMessage.style.display = "none", 3000);
            } else {
                errorMessage.style.display = "none";
                sendToWhatsApp(); // تابع الإرسال إلى واتساب إذا كانت البيانات صحيحة
            }
        });
    });
    
    
    
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("bookingForm");
        const phoneInput = document.getElementById("phone");
        const phoneError = document.getElementById("phoneError");
        const errorMessage = document.getElementById("error-message");
        const dateInput = document.getElementById("dateInput");
        const dayOfWeekSpan = document.getElementById("dayOfWeek");
        const timeInput = document.getElementById("timeInput");
        const timePeriodSpan = document.getElementById("timePeriod");
    
        // التحقق من رقم الهاتف
        phoneInput.addEventListener("input", function () {
            const phoneRegex = /^(010|011|012|015)\d{8}$/;
            if (!phoneRegex.test(phoneInput.value)) {
                phoneError.style.display = "block";
            } else {
                phoneError.style.display = "none";
            }
        });
    
        // إظهار يوم الأسبوع بجانب التاريخ
        dateInput.addEventListener("input", function () {
            const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
            const dateValue = new Date(dateInput.value);
            if (!isNaN(dateValue)) {
                dayOfWeekSpan.innerText = days[dateValue.getDay()];
            } else {
                dayOfWeekSpan.innerText = "";
            }
        });
    
        // إضافة صباحًا أو مساءً بجانب الوقت
        timeInput.addEventListener("input", function () {
            const timeValue = timeInput.value;
            if (timeValue) {
                const hours = parseInt(timeValue.split(":")[0]);
                timePeriodSpan.innerText = hours < 12 ? "صباحًا" : "مساءً";
            } else {
                timePeriodSpan.innerText = "";
            }
        });
    
        // التحقق من جميع البيانات قبل الإرسال
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // منع الإرسال الافتراضي للفورم
    
            if (!form.checkValidity() || phoneError.style.display === "block") {
                errorMessage.style.display = "block";
                setTimeout(() => errorMessage.style.display = "none", 3000);
            } else {
                errorMessage.style.display = "none";
                sendToWhatsApp(); // استدعاء وظيفة الإرسال لواتساب بعد التحقق
            }
        });
    });
    
    /***************************************************************** */

    //   ارسال حجز البيانات عبر الواتساب صفحة index  //
    function sendToWhatsApp() {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var phone = document.getElementById("phone").value;
        var date = document.getElementById("dateInput").value;
        var doctorSelect = document.getElementById("doctor");
        var doctor = doctorSelect.options[doctorSelect.selectedIndex].text; // ✅ جلب اسم الطبيب
        var time = document.getElementById("timeInput").value;
        var dayOfWeek = document.getElementById("dayOfWeek").innerText;
        var period = document.getElementById("timePeriod").innerText;
    
        if (!name || !age || !phone || !date || !doctor || !time) {
            alert("يرجى ملء جميع الحقول قبل الحجز.");
            return;
        }
    
        var whatsappNumber = "201201233396";
    
        var message = `مرحبا، أود حجز موعد:
    👤 الاسم: ${name}
    📅 العمر: ${age} سنة
    📞 الهاتف: ${phone}
    📆 اليوم: ${date} - (${dayOfWeek}) 
    🩺 الطبيب: ${doctor}
    ⏰ الوقت: ${time} ${period}`;
    
        var whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
        window.open(whatsappUrl, "_blank");
    }
    
    


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
    
    
    
    
    
    
    
    
