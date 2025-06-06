document.addEventListener("DOMContentLoaded", function () {
    let e = new URLSearchParams(window.location.search),
        t = e.get("id");
    fetch("./js/specialties.json")
        .then((e) => e.json())
        .then((e) => {
            let d = e.find((e) => e.id === t);
            if (d) {
                document.getElementById("operation-name").innerHTML = `عمليات ال` + d.name;
                let i = document.getElementById("procedures-list");
                d.procedures.forEach((e, t) => {
                    let n = document.createElement("div");
                    n.classList.add("procedure-card");
                    let r = `<div class="procedure-content w-75 mb-5">
    <h3 class="text-color">${e.title}</h3>`;
                    if (
                        (Object.keys(e).forEach((t) => {
                            if ("title" !== t) {
                                let d = "";
                                ["description", "reson", "surgery", "health"].includes(t) && (d = "special-text"), (r += `<p class="${d}">${e[t]}</p>`);
                            }
                        }),
                        (r += "</div>"),
                        (n.innerHTML = r),
                        i.appendChild(n),
                        t < d.procedures.length - 1)
                    ) {
                        let s = document.createElement("hr");
                        s.classList.add("procedure-divider"), i.appendChild(s);
                    }
                });
                let n = document.getElementById("doctors-list");
                d.doctors.forEach((e) => {
                    let t = document.createElement("div");
                    t.classList.add("doctor-card"),
                        (t.innerHTML = `
                            <img src="${e.image}" alt="د. ${e.name}">
                            <h3>${e.name}</h3>
                            <p>${e.clinic_address}</p>
                            <p>📞 <a href="tel:${e.phone}">${e.phone}</a></p>
                            `),
                        t.addEventListener("click", () => {
                            window.location.href = `doctors.html?id=${e.id}&source=specialties`;
                        }),
                        n.appendChild(t);
                });
            } else document.body.innerHTML = "<h2>التخصص غير موجود</h2>";
        })
        .catch((e) => console.error("حدث خطأ أثناء تحميل البيانات:", e));
});
