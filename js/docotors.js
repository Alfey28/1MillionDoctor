const urlParams = new URLSearchParams(window.location.search),
    doctorId = urlParams.get("id"),
    source = urlParams.get("source") || "doctors";

function displayDoctorData(doctor) {
    if (doctor) {
        if (doctor.image) document.getElementById("doctor-image").src = doctor.image;
        if (doctor.name) document.getElementById("doctor-name").textContent = doctor.name;
        
        if (doctor.clinic_address) {
            document.getElementById("clinic-address").textContent = doctor.clinic_address;
            document.getElementById("clinic-address").href = doctor.location || `https://www.google.com/maps/search/?q=${encodeURIComponent(doctor.clinic_address)}`;
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
            }
            
        }

        if (doctor.whatsapp) {
            document.getElementById("doctor-whatsapp").href = `https://wa.me/${doctor.whatsapp}`;
            document.getElementById("doctor-whatsapp").style.display = "inline-block";
            hasSocialLinks = true;
        }

        // إظهار القسم كله لو فيه على الأقل رابط واحد متاح
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

        if (doctor.contact && doctor.contact.social && doctor.contact.social.facebook) {
            document.getElementById("doctor-facebook").href = doctor.contact.social.facebook;
        }

        if (doctor.whatsapp) {
            document.getElementById("doctor-whatsapp").href = `https://wa.me/${doctor.whatsapp}`;
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
