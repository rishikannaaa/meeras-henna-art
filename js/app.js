// ─── CONFIGURATION ──────────────────────────────────────────
// ⚠️ Replace with your actual Razorpay Key ID from dashboard.razorpay.com
const RAZORPAY_KEY_ID = 'rzp_live_SQNJLwH90fjdRG';

const WHATSAPP_NUMBER = '919514301061';

// ─── DEFAULT CLASS DATA ─────────────────────────────────────
const DEFAULT_CLASSES = [
  {
    id: 1,
    name: 'Advance Class (Indian & Arabic)',
    fee: 199,
    chapters: [
      { title: 'Chapter 1 – Basics & Control', lessons: ['Holding Henna','Pressing Control','Needed Things','Placing Hand (Opposite Member)','Heavy Press & Light Press'] },
      { title: 'Chapter 2 – Lines & Foundations', lessons: ['All Types of Lines','Types of Base Flowers','How to Draw Paisley','Correcting Methods'] },
      { title: 'Chapter 3 – Elements & Shading', lessons: ['Types of Petals','Types of Shadings','Types of Leaves','Types of Cap Filling'] },
      { title: 'Chapter 4 – Fillings & Designs', lessons: ['Fillings','Do\'s and Don\'ts','Main Designs'] },
      { title: 'Chapter 5 – Advanced Fillings', lessons: ['Negative Fillings','Arabic Henna Veins','Filler Elements'] },
      { title: 'Chapter 6 – Floral & Borders', lessons: ['Different Types of Henna Flowers','Different Finger Designs','Henna Borders'] },
      { title: 'Chapter 7 – Decorative Designs', lessons: ['Beautiful Henna Veins','Floral Designs','Floral Bunches – Part 1','Floral Bunches – Part 2'] },
      { title: 'Chapter 8 – Tips & Corrections', lessons: ['Tips & Tricks – Part 1','Negative Filling – Part 2'] },
      { title: 'Chapter 9 – Patterns & Shapes', lessons: ['Patterns of Big Leaves','Types of Shapes','Floral Bunches – Part 2'] },
      { title: 'Chapter 10 – Advanced Art', lessons: ['3D Designs','Mandala Art – Part 1','Mandala Art – Part 2','Revision & Full Practice'] }
    ]
  },
  {
    id: 2,
    name: 'Advance Class (Five Country Designs – Batch 6)',
    fee: 365,
    chapters: [
      { title: 'Chapter 1 – Foundations', lessons: ['Holding Henna','Pressing Control','Use of Fingers','Needed Things','Heavy Press and Light Press','Hand Measurements','Introduction to Different Country Designs','Placing Hand Opposite Member'] },
      { title: 'Chapter 2 – Lines & Basics', lessons: ['Lines – Part 1','Lines – Part 2','Types of Base Flowers','Do\'s and Don\'ts','Paisley Outlines','Paisley Fillings','Correcting Methods'] },
      { title: 'Chapter 3 – Petals & Shading', lessons: ['Types of Petals','Shadings','Petal Shadings','Types of Leaves','Types of Cap Fillings'] },
      { title: 'Chapter 4 – Veins & Fillings', lessons: ['Different Henna Veins','Variety of Fillings','Henna Borders – Part 1','Types of Henna Flowers','Negative Fillings – Part 1'] },
      { title: 'Chapter 5 – Moroccan & Finger Designs', lessons: ['Different Finger Designs','Element Formation','Henna Mixology Class','Henna Mixology Homework','Moroccan Basic Designs','Moroccan Secondary Designs'] },
      { title: 'Chapter 6 – Advanced Techniques', lessons: ['Negative Fillings – Part 2','Henna Tutorials','Mountain Pattern','Henna Borders – Part 2','Arabic 3D Veins'] },
      { title: 'Chapter 7 – Floral Designs', lessons: ['Basic Floral Designs','Tips and Tricks – Part 1','Pointing Designs','Grand Look Patterns','Floral Bunches – Part 1'] },
      { title: 'Chapter 8 – Mandala & 3D', lessons: ['Big Leaf Pattern','Negative Fillings – Part 3','3D Flowers','Mandala – Part 1','Floral Bunches – Part 2'] },
      { title: 'Chapter 9 – Decorative Designs', lessons: ['Joint Elements','Feather Fillings','Calligraphy','Floral Leaves','Party Designs'] },
      { title: 'Chapter 10 – Bridal Techniques', lessons: ['3D Grids','Design Fillings','Bridal Henna Techniques','Mandala Finger Matching'] },
      { title: 'Chapter 11 – Professional Skills', lessons: ['Mandala Finger Matching','Different Country Startup Designs','Rate Fixing','Dealing with Customers','Mandala Art – Part 2','Name Editing','Formation of Designs'] },
      { title: 'Chapter 12 – Practice & Evaluation', lessons: ['Practice Portions','Arabic Bridal Homework','Indian Bridal Homework','Test 1','Test 2','Revision'] }
    ]
  }
];

const ADMIN_CREDENTIALS = { email: 'admin@meerahenna.com', password: 'Meera@2024' };

// ─── STORAGE HELPERS ────────────────────────────────────────
function getClasses() {
  const stored = localStorage.getItem('mh_classes');
  return stored ? JSON.parse(stored) : DEFAULT_CLASSES;
}
function saveClasses(c) { localStorage.setItem('mh_classes', JSON.stringify(c)); }
function getRegistrations() {
  const stored = localStorage.getItem('mh_registrations');
  return stored ? JSON.parse(stored) : [];
}
function saveRegistrations(r) { localStorage.setItem('mh_registrations', JSON.stringify(r)); }

// ─── TOAST ──────────────────────────────────────────────────
function showToast(msg, type = '') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = 'toast ' + type;
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => toast.classList.remove('show'), 3200);
}

// ─── NAVIGATION ─────────────────────────────────────────────
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');
  const link = document.querySelector(`.nav-link[data-page="${pageId}"]`);
  if (link) link.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigate(pageId) {
  if (pageId === 'payment') {
    if (!localStorage.getItem('mh_registration')) {
      showToast('Please register for a class first.', 'error');
      return;
    }
    loadPaymentPage();
  }
  if (pageId === 'registration') {
    if (!localStorage.getItem('mh_selected_class')) {
      showToast('Please select a class first.', 'error');
      return;
    }
    loadRegistrationPage();
  }
  showPage(pageId);
}

// ─── CLASSES PAGE ────────────────────────────────────────────
function buildClassesPage() {
  const classes = getClasses();
  const grid = document.getElementById('classes-grid');
  if (!grid) return;
  grid.innerHTML = '';

  classes.forEach(cls => {
    const card = document.createElement('div');
    card.className = 'class-card';
    card.dataset.id = cls.id;

    const chaptersHTML = cls.chapters.map(ch => `
      <div class="chapter-group">
        <div class="chapter-title">${ch.title}</div>
        <ul class="chapter-lessons">
          ${ch.lessons.map(l => `<li>${l}</li>`).join('')}
        </ul>
      </div>`).join('');

    card.innerHTML = `
      <div class="class-card-header" onclick="toggleClass(this)">
        <div>
          <h3>${cls.name}</h3>
          <div style="color:rgba(255,255,255,0.65);font-size:0.8rem;margin-top:4px;">${cls.chapters.length} Chapters</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
          <span class="class-badge">₹${cls.fee}/mo</span>
          <span class="expand-icon">▼</span>
        </div>
      </div>
      <div class="chapters-panel">
        <div class="chapters-scroll">${chaptersHTML}</div>
      </div>
      <div class="class-card-footer">
        <div class="price-tag">
          <span class="price-label">Monthly Fee</span>
          <span class="price-value">₹${cls.fee}</span>
        </div>
        <button class="btn-register" onclick="registerForClass(${cls.id})">Register Now</button>
      </div>`;
    grid.appendChild(card);
  });
}

function toggleClass(header) {
  header.closest('.class-card').classList.toggle('open');
}

function registerForClass(classId) {
  const cls = getClasses().find(c => c.id === classId);
  if (!cls) return;
  localStorage.setItem('mh_selected_class', JSON.stringify({ id: cls.id, name: cls.name, fee: cls.fee }));
  navigate('registration');
}

// ─── REGISTRATION ────────────────────────────────────────────
function loadRegistrationPage() {
  const cls = JSON.parse(localStorage.getItem('mh_selected_class') || '{}');
  const banner = document.getElementById('selected-class-banner');
  if (banner && cls.name) {
    banner.querySelector('.class-n').textContent = cls.name;
    banner.querySelector('.class-fee').textContent = 'Monthly Fee: ₹' + cls.fee;
  }
}

function submitRegistration(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const batch = document.getElementById('reg-batch').value.trim();
  const month = document.getElementById('reg-month').value.trim();
  const whatsapp = document.getElementById('reg-whatsapp').value.trim();
  if (!name || !batch || !month || !whatsapp) { showToast('Please fill in all fields.', 'error'); return; }

  const cls = JSON.parse(localStorage.getItem('mh_selected_class') || '{}');
  const regData = { name, batch, month, whatsapp, className: cls.name, fee: cls.fee, date: new Date().toISOString() };
  localStorage.setItem('mh_registration', JSON.stringify(regData));
  showToast('Registration saved! Proceed to payment.', 'success');
  setTimeout(() => navigate('payment'), 800);
}

// ─── PAYMENT PAGE ────────────────────────────────────────────
function loadPaymentPage() {
  const reg = JSON.parse(localStorage.getItem('mh_registration') || '{}');
  if (!reg.name) return;

  document.getElementById('pay-name').textContent = reg.name;
  document.getElementById('pay-batch').textContent = reg.batch;
  document.getElementById('pay-class').textContent = reg.className;
  document.getElementById('pay-amount').textContent = '₹' + reg.fee;
  document.getElementById('pay-whatsapp').textContent = reg.whatsapp;
  document.getElementById('rz-display-amount').textContent = '₹' + reg.fee;

  // Reset to payment state (hide success card)
  const rzCard = document.getElementById('razorpay-card');
  const successCard = document.getElementById('payment-success-card');
  if (rzCard) rzCard.style.display = 'block';
  if (successCard) successCard.style.display = 'none';
}

// ─── RAZORPAY INTEGRATION ────────────────────────────────────
function openRazorpay() {
  const reg = JSON.parse(localStorage.getItem('mh_registration') || '{}');
  if (!reg.name) { showToast('Registration data missing. Please register again.', 'error'); return; }

  // Amount in paise (₹1 = 100 paise)
  const amountPaise = reg.fee * 100;

  const options = {
    key: RAZORPAY_KEY_ID,
    amount: amountPaise,
    currency: 'INR',
    name: "Meera's Henna Art",
    description: reg.className,
    image: 'https://i.imgur.com/n5tjHFD.png', // optional logo URL

    // Pre-fill student details
    prefill: {
      name: reg.name,
      contact: reg.whatsapp,
      email: '' // optional — you can add an email field to registration form
    },

    // Theme matching henna brand
    theme: {
      color: '#C4682A'
    },

    notes: {
      batch_number: reg.batch,
      payment_month: reg.month,
      class_name: reg.className,
      whatsapp: reg.whatsapp
    },

    // ── SUCCESS HANDLER ──
    handler: function(response) {
      // response.razorpay_payment_id is available here
      onPaymentSuccess(response.razorpay_payment_id);
    },

    // ── MODAL CLOSE (user dismissed without paying) ──
    modal: {
      ondismiss: function() {
        showToast('Payment cancelled. Try again when ready.', '');
      }
    }
  };

  const rzp = new Razorpay(options);

  // Failure handler
  rzp.on('payment.failed', function(response) {
    console.error('Payment failed:', response.error);
    showToast('Payment failed: ' + response.error.description, 'error');
  });

  rzp.open();
}

function onPaymentSuccess(paymentId) {
  const reg = JSON.parse(localStorage.getItem('mh_registration') || '{}');

  // Save payment ID to registration record
  reg.paymentId = paymentId;
  reg.paymentStatus = 'pending';
  reg.paidAt = new Date().toISOString();
  localStorage.setItem('mh_registration', JSON.stringify(reg));

  // Save to registrations list
  const regs = getRegistrations();
  reg.id = Date.now();
  regs.push(reg);
  saveRegistrations(regs);

  // Show success card
  document.getElementById('razorpay-card').style.display = 'none';
  const successCard = document.getElementById('payment-success-card');
  successCard.style.display = 'block';

  // Populate success details
  document.getElementById('success-details').innerHTML = `
    <span>🪪 <strong>Payment ID:</strong> ${paymentId}</span>
    <span>👤 <strong>Name:</strong> ${reg.name}</span>
    <span>📚 <strong>Class:</strong> ${reg.className}</span>
    <span>💰 <strong>Amount:</strong> ₹${reg.fee}</span>
    <span>📦 <strong>Batch:</strong> ${reg.batch}</span>
  `;

  // Scroll to success card
  successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  showToast('Payment successful! 🎉', 'success');
}

// ─── WHATSAPP CONFIRMATION ───────────────────────────────────
function sendWhatsApp() {
  const reg = JSON.parse(localStorage.getItem('mh_registration') || '{}');
  const paymentId = reg.paymentId || 'N/A';

  const msg =
    `🌿 *Meera's Henna Art – Payment Confirmation*\n\n` +
    `*Name:* ${reg.name}\n` +
    `*Class:* ${reg.className}\n` +
    `*Amount Paid:* ₹${reg.fee}\n` +
    `*Batch Number:* ${reg.batch}\n` +
    `*Payment Month:* ${reg.month}\n` +
    `*WhatsApp Number:* ${reg.whatsapp}\n` +
    `*Razorpay Payment ID:* ${paymentId}\n\n` +
    `I have completed the payment. Please verify and confirm my enrollment. 🙏`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
  showToast('WhatsApp opened!', 'success');
}

// ─── ADMIN ───────────────────────────────────────────────────
function adminLogin(e) {
  e.preventDefault();
  const email = document.getElementById('admin-email').value.trim();
  const password = document.getElementById('admin-password').value.trim();
  const errEl = document.getElementById('login-error');
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem('mh_admin_auth', '1');
    errEl.style.display = 'none';
    showToast('Welcome back, Admin!', 'success');
    setTimeout(() => { window.location.href = 'admin-dashboard.html'; }, 600);
  } else {
    errEl.style.display = 'block';
    errEl.textContent = 'Invalid email or password.';
  }
}

function checkAdminAuth() {
  if (!localStorage.getItem('mh_admin_auth')) window.location.href = 'admin-login.html';
}

function adminLogout() {
  localStorage.removeItem('mh_admin_auth');
  window.location.href = 'admin-login.html';
}

function showAdminSection(sectionId) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
  document.getElementById('section-' + sectionId).classList.add('active');
  document.querySelector(`.sidebar-item[data-section="${sectionId}"]`).classList.add('active');
  const titles = { overview: 'Dashboard Overview', classes: 'Classes Management', students: 'Student Registrations' };
  document.getElementById('admin-page-title').textContent = titles[sectionId] || 'Dashboard';
  if (sectionId === 'overview') loadOverview();
  if (sectionId === 'classes') loadAdminClasses();
  if (sectionId === 'students') loadStudentsTable();
  closeSidebar();
}

function loadOverview() {
  const classes = getClasses();
  const regs = getRegistrations();
  document.getElementById('stat-classes').textContent = classes.length;
  document.getElementById('stat-students').textContent = regs.length;
  const latestEl = document.getElementById('stat-latest');
  latestEl.textContent = regs.length > 0 ? regs[regs.length - 1].name : 'None yet';

  const recentList = document.getElementById('recent-list');
  if (regs.length === 0) {
    recentList.innerHTML = '<div class="empty-state"><span>📋</span>No registrations yet.</div>';
    return;
  }
  recentList.innerHTML = [...regs].reverse().slice(0, 5).map(r => `
    <div class="summary-row">
      <span class="label">${r.name}</span>
      <span class="value">${r.className} · ₹${r.fee}</span>
    </div>`).join('');
}

function loadAdminClasses() {
  const classes = getClasses();
  const container = document.getElementById('admin-classes-list');
  if (classes.length === 0) {
    container.innerHTML = '<div class="empty-state"><span>📚</span>No classes yet. Add one!</div>';
    return;
  }
  container.innerHTML = classes.map(cls => `
    <div class="class-admin-item">
      <div class="class-info">
        <h4>${cls.name}</h4>
        <p>₹${cls.fee}/month · ${cls.chapters.length} chapters</p>
      </div>
      <div class="class-actions">
        <button class="btn-icon" onclick="openEditClass(${cls.id})">✏️</button>
        <button class="btn-icon" onclick="deleteClass(${cls.id})">🗑️</button>
      </div>
    </div>`).join('');
}

let editingClassId = null;
let modalChapters = [];

function openAddClass() {
  editingClassId = null;
  modalChapters = [{ title: '', lessons: [''] }];
  document.getElementById('modal-class-title').textContent = 'Add New Class';
  document.getElementById('modal-class-name').value = '';
  document.getElementById('modal-class-fee').value = '';
  renderModalChapters();
  document.getElementById('class-modal').classList.add('open');
}

function openEditClass(id) {
  const cls = getClasses().find(c => c.id === id);
  if (!cls) return;
  editingClassId = id;
  modalChapters = cls.chapters.map(ch => ({ title: ch.title, lessons: [...ch.lessons] }));
  document.getElementById('modal-class-title').textContent = 'Edit Class';
  document.getElementById('modal-class-name').value = cls.name;
  document.getElementById('modal-class-fee').value = cls.fee;
  renderModalChapters();
  document.getElementById('class-modal').classList.add('open');
}

function renderModalChapters() {
  const container = document.getElementById('modal-chapters');
  container.innerHTML = modalChapters.map((ch, ci) => `
    <div style="background:var(--henna-cream);border-radius:10px;padding:14px;margin-bottom:12px;">
      <div style="display:flex;gap:8px;margin-bottom:10px;align-items:center;">
        <input type="text" placeholder="Chapter title e.g. Chapter 1 – Basics" value="${ch.title}"
          oninput="modalChapters[${ci}].title=this.value"
          style="flex:1;padding:8px 12px;border:1.5px solid rgba(196,104,42,0.2);border-radius:8px;font-family:'DM Sans',sans-serif;font-size:0.88rem;outline:none;background:white;">
        <button class="btn-remove-ch" onclick="removeChapter(${ci})">✕</button>
      </div>
      ${ch.lessons.map((l, li) => `
        <div style="display:flex;gap:8px;margin-bottom:6px;">
          <input type="text" placeholder="Lesson name" value="${l}"
            oninput="modalChapters[${ci}].lessons[${li}]=this.value"
            style="flex:1;padding:7px 12px;border:1.5px solid rgba(196,104,42,0.15);border-radius:8px;font-family:'DM Sans',sans-serif;font-size:0.84rem;outline:none;background:white;">
          <button class="btn-remove-ch" style="background:#FFF;color:#999;" onclick="removeLesson(${ci},${li})">✕</button>
        </div>`).join('')}
      <button class="btn-add-ch" onclick="addLesson(${ci})">+ Add Lesson</button>
    </div>`).join('') +
    `<button class="btn-add-ch" style="width:100%;justify-content:center;" onclick="addChapter()">+ Add Chapter</button>`;
}

function addChapter() { modalChapters.push({ title: '', lessons: [''] }); renderModalChapters(); }
function removeChapter(ci) { modalChapters.splice(ci, 1); renderModalChapters(); }
function addLesson(ci) { modalChapters[ci].lessons.push(''); renderModalChapters(); }
function removeLesson(ci, li) { modalChapters[ci].lessons.splice(li, 1); renderModalChapters(); }

function saveClassModal() {
  const name = document.getElementById('modal-class-name').value.trim();
  const fee = parseInt(document.getElementById('modal-class-fee').value);
  if (!name || isNaN(fee)) { showToast('Please fill class name and fee.', 'error'); return; }
  const classes = getClasses();
  const chapters = modalChapters.filter(ch => ch.title.trim());
  if (editingClassId) {
    const idx = classes.findIndex(c => c.id === editingClassId);
    if (idx > -1) classes[idx] = { ...classes[idx], name, fee, chapters };
  } else {
    classes.push({ id: Date.now(), name, fee, chapters });
  }
  saveClasses(classes);
  closeModal('class-modal');
  loadAdminClasses();
  showToast(editingClassId ? 'Class updated!' : 'Class added!', 'success');
}

function deleteClass(id) {
  if (!confirm('Delete this class?')) return;
  saveClasses(getClasses().filter(c => c.id !== id));
  loadAdminClasses();
  showToast('Class deleted.', '');
}

function loadStudentsTable() {
  const regs = getRegistrations();
  const tbody = document.getElementById('students-tbody');
  if (regs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--henna-muted);">No registrations yet.</td></tr>`;
    return;
  }
  tbody.innerHTML = regs.map((r, i) => `
    <tr>
      <td><strong>${r.name}</strong></td>
      <td>${r.batch}</td>
      <td>${r.month}</td>
      <td style="max-width:160px;">${r.className}</td>
      <td><strong>₹${r.fee}</strong></td>
      <td>${r.whatsapp}</td>
      <td>
        <span class="badge badge-${r.paymentStatus === 'verified' ? 'verified' : 'pending'}">
          ${r.paymentStatus === 'verified' ? 'Verified' : 'Pending'}
        </span>
      </td>
      <td>
        ${r.paymentStatus !== 'verified' ? `<button class="btn-icon" title="Verify" onclick="verifyPayment(${i})">✅</button>` : ''}
        <button class="btn-icon" title="Delete" onclick="deleteRegistration(${i})">🗑️</button>
      </td>
    </tr>`).join('');
}

function verifyPayment(idx) {
  const regs = getRegistrations();
  regs[idx].paymentStatus = 'verified';
  saveRegistrations(regs);
  loadStudentsTable();
  loadOverview();
  showToast('Payment verified!', 'success');
}

function deleteRegistration(idx) {
  if (!confirm('Delete this registration?')) return;
  const regs = getRegistrations();
  regs.splice(idx, 1);
  saveRegistrations(regs);
  loadStudentsTable();
  loadOverview();
  showToast('Registration deleted.', '');
}

function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function toggleSidebar() {
  document.getElementById('admin-sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('open');
}
function closeSidebar() {
  document.getElementById('admin-sidebar')?.classList.remove('open');
  document.getElementById('sidebar-overlay')?.classList.remove('open');
}

// ─── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('mh_classes')) saveClasses(DEFAULT_CLASSES);

  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.addEventListener('click', () => navigate(link.dataset.page));
  });

  const regForm = document.getElementById('reg-form');
  if (regForm) regForm.addEventListener('submit', submitRegistration);

  if (document.getElementById('classes-grid')) {
    buildClassesPage();
    showPage('home');
    document.querySelector('.nav-link[data-page="home"]')?.classList.add('active');
  }
});
