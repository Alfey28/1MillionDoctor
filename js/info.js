// دالة لحساب مؤشر كتلة الجسم
document.getElementById('bmi-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    
    if (isNaN(weight) || isNaN(height) || height <= 0) {
        alert("الرجاء إدخال قيم صحيحة للوزن والطول.");
        return;
    }

    const bmi = weight / (height * height);
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    const bmiMessage = document.getElementById('bmi-message');

    bmiValue.innerText = `مؤشر كتلة الجسم: ${bmi.toFixed(2)}`;

    // تصنيف BMI
    if (bmi < 18.5) {
        bmiCategory.innerText = "الوزن تحت الطبيعي.";
        bmiMessage.innerText = "يجب عليك زيادة وزنك. حاول تناول وجبات غنية بالعناصر الغذائية. الاهتمام بالصحة مهم جدًا. قد تحتاج لاستشارة طبيب أو مختص للتأكد من صحتك. احرص على تناول البروتينات والدهون الصحية.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiCategory.innerText = "الوزن طبيعي.";
        bmiMessage.innerText = "أنت في الوزن المثالي! حاول الحفاظ على نمط حياة صحي ومتوازن للحفاظ على صحتك. أكمل الرياضة المنتظمة للحفاظ على لياقتك البدنية. تناول طعام متوازن يضمن لك استمرارية الوزن المثالي.";
    } else if (bmi >= 25 && bmi < 29.9) {
        bmiCategory.innerText = "زيادة في الوزن.";
        bmiMessage.innerText = "وزنك جيد، لكن قد لا يكون مثالي. ممارسة الرياضة والتمارين بشكل منتظم قد تساعد في تحسين لياقتك. احرص على تقليل تناول السكريات والمأكولات الدسمة. إذا استمرت الزيادة، قد يكون من الأفضل استشارة مختص.";
    } else {
        bmiCategory.innerText = "سمنة.";
        bmiMessage.innerText = "يجب أن تهتم بصحتك وتعمل على تقليل الوزن. حاول اتباع نظام غذائي صحي مع ممارسة الرياضة. من المهم أن تبدأ بخطوات صغيرة لتحسين صحتك مثل المشي اليومي. قد تحتاج إلى مساعدة طبيب مختص في التغذية أو الرياضة.";
    }
    
});



// دالة لتحميل البيانات من ملف JSON
async function loadContent() {
    try {
        // تحميل مقالات
        const articlesResponse = await fetch('js/articels.json');
        const articles = await articlesResponse.json();
        
        // تحديد المقال الحالي بناءً على تاريخ اليوم
        const currentArticleIndex = new Date().getDate() % articles.length;
        const article = articles[currentArticleIndex];

        // عرض المقالات في HTML
        document.getElementById('article-title').innerText = article.title;
        document.getElementById('article-answer').innerText = article.answer;

        // عرض الصور
        const articleImagesContainer = document.getElementById('article-images');
        articleImagesContainer.innerHTML = ""; // تفريغ المحتوى السابق

        if (article.images && article.images.length > 0) {
            article.images.forEach(image => {
                const img = document.createElement('img');
                img.src = image;
                img.alt = article.title;
                
                // إضافة CSS لتوحيد مقاس الصور
                img.style.width = "250px"; // عرض الصورة
                img.style.height = "180px"; // ارتفاع الصورة
                img.style.objectFit = "cover"; // لضبط الصورة داخل المساحة المحددة بشكل جيد

                articleImagesContainer.appendChild(img);
            });
        }

        // تحميل النصائح
        const tipsResponse = await fetch('js/daily-tips.json');
        const tips = await tipsResponse.json();
        
        // تحديد النصيحة اليومية بناءً على تاريخ اليوم
        const currentTipIndex = new Date().getDate() % tips.length;
        const tip = tips[currentTipIndex];

        // عرض النصيحة في HTML
        if (tip && tip.tip) {
            document.getElementById('daily-tip').innerText = tip.tip;
        }

    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// كود موسوعة الامراض
let diseases = [];
let currentIndex = 0;
const itemsPerPage = 3;

async function loadDiseases() {
    try {
        const response = await fetch('js/diseases.json');
        diseases = await response.json();
        updateSlider();
    } catch (error) {
        console.error("Error loading diseases:", error);
    }
}

function updateSlider() {
    const list = document.getElementById('diseases-list');
    list.innerHTML = "";

    for (let i = currentIndex; i < currentIndex + itemsPerPage; i++) {
        if (i >= diseases.length) break;
        const disease = diseases[i];
        const li = document.createElement('li');
        li.innerHTML = `<h4 style= "color:#024791;">${disease.title}</h4>
                        <p class="hidden-answer">${disease.answer}</p>`;
        list.appendChild(li);
    }
}

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= itemsPerPage;
        updateSlider();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentIndex + itemsPerPage < diseases.length) {
        currentIndex += itemsPerPage;
        updateSlider();
    }
});

// استدعاء الدوال عند تحميل الصفحة
window.onload = () => {
    loadContent();
    loadDiseases();
};
