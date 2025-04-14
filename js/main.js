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
    const clinicSelect = document.getElementById("clinic-select");
    const daySelect = document.getElementById("daySelect");
    const timeSelect = document.getElementById("timeSelect");
    const priceContainer = document.getElementById("priceContainer");
    const doctorPrice = document.getElementById("doctorPrice");
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("error-message");
    const bookingForm = document.getElementById("bookingForm");

    let specialtiesData = [];

    async function fetchSpecialties() {
        try {
            const response = await fetch("js/specialties.json");
            specialtiesData = await response.json();
            populateSpecialties();
        } catch (error) {
            console.error("فشل تحميل بيانات التخصصات:", error);
        }
    }

    function populateSpecialties() {
        specialtiesSelect.innerHTML = "<option selected disabled>اختر التخصص </option>";
        specialtiesData.forEach((specialty) => {
            const option = document.createElement("option");
            option.value = specialty.id;
            option.textContent = specialty.name;
            specialtiesSelect.appendChild(option);
        });
    }

    specialtiesSelect.addEventListener("change", function () {
        const selectedSpecialty = specialtiesData.find((s) => s.id === this.value);
        updateDoctorsList(selectedSpecialty);
    });

    function updateDoctorsList(selectedSpecialty) {
        doctorsSelect.innerHTML = "<option selected disabled>اختر الطبيب </option>";
        clinicSelect.innerHTML = "<option selected disabled>اختر العيادة </option>";
        daySelect.innerHTML = "<option selected disabled>اختر اليوم </option>";
        timeSelect.innerHTML = "<option selected disabled>اختر الوقت </option>";
        priceContainer.style.display = "none";

        if (selectedSpecialty && selectedSpecialty.doctors) {
            selectedSpecialty.doctors.forEach((doctor) => {
                const option = document.createElement("option");
                option.value = doctor.id;
                option.textContent = doctor.name;
                option.dataset.doctor = JSON.stringify(doctor);
                doctorsSelect.appendChild(option);
            });
        }
    }

    doctorsSelect.addEventListener("change", function () {
        const selectedDoctorOption = doctorsSelect.options[doctorsSelect.selectedIndex];
        const doctor = JSON.parse(selectedDoctorOption.dataset.doctor);

        populateClinics(doctor);
        doctorPrice.textContent = `${doctor.price} جنيه`;
        priceContainer.style.display = "flex";
    });

    function populateClinics(doctor) {
        clinicSelect.innerHTML = '<option selected disabled>اختر العيادة</option>';
        daySelect.innerHTML = '<option selected disabled>اختر اليوم</option>';
        timeSelect.innerHTML = '<option selected disabled>اختر الوقت</option>';

        const clinics = [
            doctor.clinic1?.clinic_address1,
            doctor.clinic2?.clinic_address2
        ].filter(Boolean);

        clinics.forEach(clinicAddress => {
            const option = document.createElement('option');
            option.value = clinicAddress;
            option.textContent = clinicAddress;
            clinicSelect.appendChild(option);
        });

        clinicSelect.addEventListener('change', function () {
            const selectedClinic = clinicSelect.value;

            let availableDays = [];
            let availableTimes = [];

            if (selectedClinic === doctor.clinic1?.clinic_address1) {
                availableDays = doctor.clinic1?.availableDays || [];
                availableTimes = doctor.clinic1?.availableTimes || [];
            } else if (selectedClinic === doctor.clinic2?.clinic_address2) {
                availableDays = doctor.clinic2?.availableDays || [];
                availableTimes = doctor.clinic2?.availableTimes || [];
            }

            daySelect.innerHTML = '<option selected disabled>اختر اليوم</option>';
            timeSelect.innerHTML = '<option selected disabled>اختر الوقت</option>';

            availableDays.forEach(day => {
                const daysWithDates = getNextDates(day);
                daysWithDates.forEach(dayWithDate => {
                    const option = document.createElement('option');
                    option.value = dayWithDate.date;
                    option.textContent = `${dayWithDate.day} - ${dayWithDate.date}`;
                    daySelect.appendChild(option);
                });
            });

            daySelect.addEventListener('change', function () {
                timeSelect.innerHTML = '<option selected disabled>اختر الوقت</option>';
                availableTimes.forEach(time => {
                    const option = document.createElement('option');
                    option.value = time;
                    option.textContent = time;
                    timeSelect.appendChild(option);
                });
            });
        });
    }

    function getNextDates(dayName) {
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
        let currentDay = today.getDay();
        let targetDay = daysOfWeek[dayName];

        let difference = targetDay - currentDay;
        if (difference < 0) difference += 7;

        const firstDate = new Date();
        firstDate.setDate(today.getDate() + difference);

        const secondDate = new Date(firstDate);
        secondDate.setDate(firstDate.getDate() + 7);

        return [
            { day: dayName, date: firstDate.toLocaleDateString("ar-EG") },
            { day: dayName, date: secondDate.toLocaleDateString("ar-EG") }
        ];
    }

    // التحقق من صحة رقم الهاتف
    if (phoneError) {
        phoneInput.addEventListener("input", function () {
            const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
            if (!phoneRegex.test(phoneInput.value)) {
                phoneError.style.display = "block";
                phoneInput.style.borderColor = "red";
                phoneInput.style.backgroundColor = "#f8d7da";
                phoneInput.style.color = "red";
            } else {
                phoneError.style.display = "none";
                phoneInput.style.borderColor = "";
                phoneInput.style.backgroundColor = "";
                phoneInput.style.color = "";
            }
        });
    }

    function formatTime(time) {
        return time;
    }

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const fields = bookingForm.querySelectorAll("input, select");
        let hasError = false;
    
        fields.forEach(field => {
            if ((field.tagName === "SELECT" && field.selectedIndex === 0) || !field.value.trim()) {
                field.style.backgroundColor = "#f8d7da";  // تلوين الخلفية باللون الأحمر
                field.style.borderColor = "red";           // تلوين الحدود باللون الأحمر
                hasError = true;
            } else {
                field.style.backgroundColor = "";         // إعادة الخلفية للطبيعي
                field.style.borderColor = "";             // إعادة الحدود للطبيعي
            }
        });
    
        if (hasError) {
            return;  // وقف الإرسال لو كان فيه أخطاء
        }
    
        // باقي الكود بعد التحقق من الحقول
        const nameInput = document.getElementById("name");
        const phoneInput = document.getElementById("phone");
        const specialtiesSelect = document.getElementById("specialty-input");
        const doctorsSelect = document.getElementById("doctor");
        const clinicSelect = document.getElementById("clinic-select");
        const daySelect = document.getElementById("daySelect"); // تأكد من استخدام ID الصحيح
        const timeSelect = document.getElementById("timeSelect"); // تأكد من استخدام ID الصحيح
        const doctorPriceValue = document.getElementById("doctorPrice").textContent || "غير محدد";
    
        const selectedDoctorOption = doctorsSelect.options[doctorsSelect.selectedIndex];
        let doctorContact = selectedDoctorOption ? JSON.parse(selectedDoctorOption.dataset.doctor).whatsapp || JSON.parse(selectedDoctorOption.dataset.doctor).phone : '';
    
        // تأكد من اختيار اليوم
        const selectedDayText = daySelect.value ? daySelect.options[daySelect.selectedIndex].text : "غير محدد";
        
        // تأكد من اختيار الوقت
        const selectedTimeText = timeSelect.value || "غير محدد";
    
        const message = `
        👤 الاسم: ${nameInput.value.trim()}
        📞 رقم الهاتف: ${phoneInput.value.trim()}
        🏥 العيادة: ${clinicSelect.value}
        📅 اليوم: ${selectedDayText}
        🕓 الوقت: ${selectedTimeText}
        🩺 التخصص: ${specialtiesSelect.options[specialtiesSelect.selectedIndex].text}
        👨‍⚕️ الطبيب: ${doctorsSelect.options[doctorsSelect.selectedIndex].text}
        💰 سعر الكشف: ${doctorPriceValue}
        `;
    
        if (doctorContact && !doctorContact.startsWith("+")) {
            doctorContact = "+20" + doctorContact;
        }
    
        if (!doctorContact) {
            alert("لم يتم العثور على رقم الطبيب! يرجى التحقق من الرقم.");
            return;
        }
    
        const whatsappLink = `https://wa.me/${doctorContact}?text=${encodeURIComponent(message.trim())}`;
        window.open(whatsappLink, "_blank");
    });
    
    
    

    
    

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
                                <p class="address-color">${doctor.clinic_address1}</p>
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
    




