function showForm() {
  document.getElementById('formSection').classList.remove('hidden');
}

let availableVolunteers = [];

function loadSkills() {
  const type = document.getElementById('type').value;
  const skills = {
    'تعليم': ["الشرح والتبسيط", "إدارة الوقت", "التحفيز والتشجيع", "القدرة على التواصل", "التخطيط والتنظيم", "استخدام التقنية", "العمل الجماعي", "الصبر والتفهم"],
    'صحة': ["التوعية الصحية", "الإسعافات الأولية", "قياس المؤشرات الحيوية", "الدعم النفسي", "تنظيم الفعاليات الصحية", "خدمة المرضى والزوار", "اعداد وتوزيع المنشورات", "التواصل الفعال"],
    'برمجة': ["تعليم البرمجة للمبتدئين", "حل المشكلات التقنية", "المساهمة في المشاريع المفتوحة المصدر", "تصميم مواقع تطوعية", "انشاء محتوى تعليمي", "التعاون في هاكاثونات تطوعية", "تطوير تطبيقات خيريه", "دعم المتعلمين الجدد"]
  };
  const container = document.getElementById('skillsContainer');
  container.innerHTML = '';

  if (skills[type]) {
    skills[type].forEach(skill => {
      container.innerHTML += `<label><input type="checkbox" value="${skill}"> ${skill}</label><br>`;
    });
  }
}

function submitVolunteer() {
  const age = parseInt(document.getElementById('age').value);
  const type = document.getElementById('type').value;
  const container = document.getElementById('opportunitiesSection');

  if (age < 20) {
    alert("لا يوجد تطوع للأعمار أقل من 20 سنة.");
    return;
  }

  const opportunities = {
    'تعليم': ["مؤسسة الخير", "مبادرة تطوير", "مؤسسة تعليم", "مبادرة مدارسنا", "مؤسسة مسك", "مبادرة سند", "مؤسسة إشراق", "برنامج أجيالنا", "مؤسسة الكتاب", "منصة تطوع"],
    'صحة': ["مستشفى الملك فيصل التخصصي", "تجمع الرياض الصحي", "جمعية أثر للتطوع الصحي", "مستشفى الملك خالد الجامعي", "الهلال الأحمر السعودي", "مركز الملك سلمان للأبحاث والإعاقة", "جمعية عناية الصحية", "الجمعية السعودية للتثقيف الدوائي", "جمعية رفيدة لصحة المرأة", "الجمعية السعودية لطب الأسرة والمجتمع"],
    'برمجة': ["مبادرة مطور", "مؤسسة سعودي جود", "مؤسسة غوغل السعودية للتدريب", "مبادرة ابتكار", "مؤسسة البرمجة للأطفال", "مبادرة فكرة", "منصة خيرها", "مبادرة هاكاثون السعودية", "مؤسسة أكاديمية طويق", "منصة تطوع"]
  };

  container.innerHTML = `<h2>الفرص المتاحة في مجال ${type}:</h2>`;

  opportunities[type].forEach(place => {
    container.innerHTML += `<div>${place} <button onclick="joinOpportunity('${place}')">انضم الآن</button></div>`;
  });

  container.classList.remove('hidden');
}

function joinOpportunity(place) {
  const message = document.getElementById('thankYouMessage');
  message.innerHTML = `
    <h2>شكرًا لانضمامك لـ ${place}</h2>
    <p>
      أعزائي المتطوعين،<br>
      نشكر لكم جهدكم الرائع وإخلاصكم في العمل التطوعي. إن تفانيكم في خدمة المجتمع يعكس روح العطاء والإيجابية، ويترك أثراً كبيراً في حياتنا جميعاً. أنتم مصدر إلهام لنا ولغيرنا، وبدعمكم نحقق أهدافنا ونبني مستقبلاً أفضل.<br>
      شكراً لكم على كل لحظة بذلتموها، وكل خطوة اتخذتموها نحو التغيير.<br>
      مع خالص تقديرنا،<br>
      [voluntr]
    </p>
  `;
  message.classList.remove('hidden');
}

function addAvailableVolunteer() {
  const name = document.getElementById('name').value.trim();
  const age = parseInt(document.getElementById('age').value);
  const location = document.getElementById('location').value.trim();
  const type = document.getElementById('type').value;

  if (!name || !age || !location || !type) {
    alert("رجاءً أكمل جميع الحقول المطلوبة قبل التسجيل.");
    return;
  }

  if (age < 20) {
    alert("لا يسمح بالتسجيل للمتطوعين أقل من 20 سنة.");
    return;
  }

  const volunteer = { name, age, location, type };
  availableVolunteers.push(volunteer);
  showAvailableVolunteers();
}

function showAvailableVolunteers() {
  const listSection = document.getElementById('availableVolunteersSection');
  const list = document.getElementById('availableVolunteersList');

  list.innerHTML = '';

  availableVolunteers.forEach(volunteer => {
    list.innerHTML += `<li>${volunteer.name} - ${volunteer.age} سنة - ${volunteer.location} - تخصص: ${volunteer.type}</li>`;
  });

  listSection.classList.remove('hidden');
}

function searchVolunteers() {
  const searchType = document.getElementById('searchType').value;
  const results = document.getElementById('searchResults');
  results.innerHTML = '';

  const matchedVolunteers = availableVolunteers.filter(v => v.type === searchType);

  if (matchedVolunteers.length === 0) {
    results.innerHTML = "<p>لا يوجد متطوعين بالتخصص المطلوب حالياً.</p>";
    return;
  }

  matchedVolunteers.forEach(volunteer => {
    results.innerHTML += `
      <div class="opportunity">
        ${volunteer.name} - ${volunteer.age} سنة - ${volunteer.location}<br>
        <button onclick="inviteVolunteer('${volunteer.name}')">دعوة للانضمام</button>
      </div>
    `;
  });
}

function inviteVolunteer(name) {
  alert(`عزيزي المتطوع ${name}، ترغب المؤسسة في وجودك معنا.`);
}
