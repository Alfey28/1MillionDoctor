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
fetch('js/specialties.json')
    .then(response => response.json())
    .then(data => {

        // عرض التخصصات في الـ select
        const specialtiesSelect = document.getElementById("specialty-input");
        data.forEach(specialty => {
            const option = document.createElement("option");
            option.value = specialty.id;
            option.textContent = specialty.name;
            specialtiesSelect.appendChild(option);
        });

        // عندما يختار المستخدم تخصصًا
        specialtiesSelect.addEventListener("change", function () {
            const selectedSpecialty = data.find(specialty => specialty.id === this.value);
            
            // عرض الأطباء في الـ select الخاص بالأطباء
            const doctorsSelect = document.getElementById("doctor");
            doctorsSelect.innerHTML = "<option selected disabled>اختر الطبيب</option>"; // إعادة تعيين الأطباء
            selectedSpecialty.doctors.forEach(doctor => {
                const option = document.createElement("option");
                option.value = doctor.id;
                option.textContent = doctor.name;
                doctorsSelect.appendChild(option);
            });

            // إخفاء حاوية السعر قبل اختيار الطبيب
            document.getElementById("priceContainer").style.display = "none"; 

            // إضافة سعر الكشف للطبيب المختار
            doctorsSelect.addEventListener("change", function () {
                const selectedDoctor = selectedSpecialty.doctors.find(doctor => doctor.id === this.value);
                
                // إظهار حاوية السعر بعد اختيار الطبيب
                document.getElementById("priceContainer").style.display = "flex"; 

                // تحديث السعر
                document.getElementById("doctorPriceLabel").style.display = "inline";
                document.getElementById("doctorPrice").style.display = "inline";
                document.getElementById("currency-symbol").style.display = "inline";
                document.getElementById("doctorPrice").textContent = selectedDoctor.price;
            });
        });
    })
    .catch(error => {
        console.error("Error loading JSON:", error);
    });







// // // // // // // // رسالة الخطا لو حجز بدون بيانات // // // // // // // // // // // 
    document.getElementById('bookingForm').addEventListener('submit', function (event) {
        let isValid = true;
        
        // تحقق من الحقول
        const fields = document.querySelectorAll('input[required], select[required]');
        fields.forEach(field => {
            if (field.value.trim() === '') {
                field.style.borderColor = 'red';
                field.style.backgroundColor = '#f8d7da';
                isValid = false;
            } else {
                field.style.borderColor = '';
                field.style.backgroundColor = '';
            }
        });
    
        // إذا كانت الحقول غير مكتملة، منع الإرسال
        if (!isValid) {
            event.preventDefault();
        }
    });

// // // // // // // // // رقم التلفون في فورم الحجز // // // // // // // // // // // 
    document.getElementById('phone').addEventListener('input', function () {
        const phone = document.getElementById('phone').value;
        const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
        
        if (!phoneRegex.test(phone)) {
            document.getElementById('phoneError').style.display = 'block';
            document.getElementById('phoneError').innerText = 'رقم الهاتف خطأ';
            document.getElementById('phone').style.borderColor = 'red';
            document.getElementById('phone').style.backgroundColor = '#f8d7da';
        } else {
            document.getElementById('phoneError').style.display = 'none';
            document.getElementById('phone').style.borderColor = '';
            document.getElementById('phone').style.backgroundColor = '';
        }
    });
    

// // // // // // // // // // // دالة الارسال الى الواتساب // // // // // // //  //  // 

// عند الضغط على زر "أحجز الآن"
// عند الضغط على زر "أحجز الآن"
// عند الضغط على زر "أحجز الآن"
document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault(); // لمنع إرسال النموذج بالطريقة المعتادة

    // جمع البيانات من الحقول
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("dateInput").value;
    let time = document.getElementById("timeInput").value;
    const doctor = document.getElementById("doctor").selectedOptions[0].textContent;
    const specialty = document.getElementById("specialty-input").selectedOptions[0].textContent;
    const doctorPrice = document.getElementById("doctorPrice").textContent || "غير محدد"; // في حالة عدم وجود سعر

    // التحقق من أن جميع الحقول مملوءة
    if (!name || !phone || !date || !time || !doctor || !specialty) {
        return; // لا تفتح رابط WhatsApp إذا كانت الحقول غير مكتملة
    }

    // تحويل الوقت إلى 12 ساعة مع AM/PM
    let hours = parseInt(time.split(":")[0], 10);
    let minutes = time.split(":")[1];
    let period = "صباحاً"; // الإفتراضي سيكون صباحاً

    if (hours >= 12) {
        period = "مساءً";
        if (hours > 12) {
            hours -= 12; // تحويل إلى 12 ساعة
        }
    } else if (hours === 0) {
        hours = 12; // 00:00 يتحول إلى 12:00 صباحاً
    }

    // تنسيق الوقت الجديد
    const formattedTime = `${hours}:${minutes} ${period}`;

    // حساب يوم الأسبوع من التاريخ
    const dateObj = new Date(date);
    const daysOfWeek = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    const dayOfWeek = daysOfWeek[dateObj.getDay()];

    // تنظيم البيانات مع الإيموجي
    const message = `
    👤 الاسم: ${name}
    📞 رقم الهاتف: ${phone}
    📅 اليوم: ${date} (${dayOfWeek})
    🕓 الوقت: ${formattedTime} 
    🩺 التخصص: ${specialty}
    👨‍⚕️ الطبيب: ${doctor}
    💰 سعر الكشف: ${doctorPrice}
    `;

    // إعداد رابط WhatsApp
    const whatsappLink = `https://wa.me/201201233396?text=${encodeURIComponent(message)}`;

    // فتح رابط WhatsApp
    window.open(whatsappLink, "_blank");
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
    
    
    function previewImage(event) {
        const reader = new FileReader();
        reader.onload = function(){
            const img = document.getElementById('preview');
            img.src = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    
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
    




