document.addEventListener("DOMContentLoaded", function () {
    const registerType = document.getElementById("register-type");
    const formContent = document.getElementById("form-content");

    function updateForm() {
        const type = registerType.value;

        formContent.innerHTML = `
            <form id="register-form">
                <p id="error-message" style="color: red; display: none; font-weight: bold;">⚠️ يرجى ملء جميع البيانات قبل التسجيل!</p>

                <div class="form-group-reg">
                    <label for="name">👤 ${type === "doctor" ? "الاسم" : "اسم الصيدلية"}:</label>
                    <input type="text" id="name" required>
                </div>

                ${type === "doctor" ? `
                <div class="form-group-reg">
                    <label for="specialty">🏥 التخصص:</label>
                    <input type="text" id="specialty" required>
                </div>` : ""}

                <div class="form-group-reg">
                    <label for="address">📍 العنوان:</label>
                    <input type="text" id="address" required>
                </div>

                <div class="form-group-reg">
                    <label for="phone">📞 رقم التليفون:</label>
                    <input type="tel" id="phone" maxlength="11" required>
                    <small id="phone-error" style="color: red; display: none;">⚠️ رقم الهاتف غير صحيح</small>
                </div>

                <button type="submit" id="submit-btn">${type === "doctor" ? "تسجيل طبيب" : "تسجيل صيدلية"}</button>
            </form>
        `;

        attachEventListeners();
    }

    function attachEventListeners() {
        const form = document.getElementById("register-form");
        const phoneInput = document.getElementById("phone");
        const phoneError = document.getElementById("phone-error");
        const errorMessage = document.getElementById("error-message");
        const submitBtn = document.getElementById("submit-btn");

        registerType.addEventListener("change", function () {
            submitBtn.textContent = registerType.value === "doctor" ? "تسجيل طبيب" : "تسجيل صيدلية";
        });

        if (form) {
            form.addEventListener("submit", function (event) {
                event.preventDefault();

                let isValid = true;
                const inputs = form.querySelectorAll("input[type='text'], input[type='tel']");

                inputs.forEach(input => {
                    if (input.value.trim() === "") {
                        input.style.backgroundColor = "#ffdddd";
                        input.style.borderColor = "red";
                        isValid = false;
                    } else {
                        input.style.backgroundColor = "";
                        input.style.borderColor = "";
                    }
                });

                if (!validatePhone(phoneInput.value)) {
                    phoneError.style.display = "block";
                    phoneInput.style.backgroundColor = "#ffdddd";
                    phoneInput.style.borderColor = "red";
                    isValid = false;
                } else {
                    phoneError.style.display = "none";
                    phoneInput.style.backgroundColor = "";
                    phoneInput.style.borderColor = "";
                }

                if (!isValid) {
                    errorMessage.style.display = "block";
                    return;
                } else {
                    errorMessage.style.display = "none";
                    sendToWhatsApp();
                }
            });
        }
    }

    function validatePhone(phone) {
        return /^(010|011|012|015)\d{8}$/.test(phone);
    }

    function sendToWhatsApp() {
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        const type = registerType.value;
        const specialty = type === "doctor" ? document.getElementById("specialty").value : null;
        const accountType = type === "doctor" ? "👨‍⚕️ طبيب" : "🏪 صيدلية";

        let message = "🌟 *اهلا حابب انضم ليكم على موقع 1MILLIONDOCTOR* 🌟\n\n";

        message += `🔹 *نوع الحساب:* ${accountType}\n`;
        message += `👤 *الاسم:* ${name}\n`;
        if (specialty) message += `🏥 *التخصص:* ${specialty}\n`;
        message += `📍 *العنوان:* ${address}\n`;
        message += `📞 *رقم الهاتف:* ${phone}\n`;

        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = "201201233396"; // رقم المستلم
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappURL, "_blank");
    }

    registerType.addEventListener("change", updateForm);
    updateForm();
});