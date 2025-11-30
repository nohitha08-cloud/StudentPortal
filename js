const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

const KEY_USERS = 'cp_users_roles_v4';
const KEY_COURSES = 'cp_courses_roles_v4';
const KEY_SUBS = 'cp_subs_roles_v4';
const CURRENT_USER_KEY = 'cp_current_user_v4'; 
const AUTO_RESET_ON_EXIT = false; 

function load(key){
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}
function save(key, val){ localStorage.setItem(key, JSON.stringify(val)); }
function resetAll(){ localStorage.removeItem(KEY_USERS); localStorage.removeItem(KEY_COURSES); localStorage.removeItem(KEY_SUBS); localStorage.removeItem(CURRENT_USER_KEY); location.reload(); }


function showToast(message, ms = 3000){
  const root = qs('#toast-root');
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = message;
  root.appendChild(t);
 
  requestAnimationFrame(()=> t.classList.add('show'));
  setTimeout(()=> {
    t.classList.remove('show');
    setTimeout(()=> t.remove(), 260);
  }, ms);
}

function seedIfEmpty(){
  if(load(KEY_USERS).length === 0){
    const users = [
      
      { id: 1001, name: 'Dr. Maya Rao', email: 'instructor@example.com', password: 'instructor', role: 'educator', bio:'Senior Lecturer, Web & Systems' },
      { id: 1002, name: 'Dr. Rajesh Kumar', email: 'rajesh@example.com', password: 'instructor2', role: 'educator', bio:'Assistant Professor, Databases & AI' },
     
      { id: 2001, name: 'Amit Sharma', email: 'amit@student.com', password: 'student123', role: 'student', bio:'Year 2 — CS' },
      { id: 2002, name: 'Nisha Verma', email: 'nisha@student.com', password: 'student123', role: 'student', bio:'Year 3 — CS' },
      { id: 2003, name: 'Raj Singh', email: 'raj@student.com', password: 'student123', role: 'student', bio:'Year 1 — IT' },
      { id: 2004, name: 'Priya Kapoor', email: 'priya@student.com', password: 'student123', role: 'student', bio:'Year 2 — CS' },
      { id: 2005, name: 'Sneha Patel', email: 'sneha@student.com', password: 'student123', role: 'student', bio:'Year 3 — SE' },
      { id: 2006, name: 'Vikram Das', email: 'vikram@student.com', password: 'student123', role: 'student', bio:'Year 1 — CS' },
      { id: 2007, name: 'Zara Khan', email: 'zara@student.com', password: 'student123', role: 'student', bio:'Year 3 — CS' }
    ];
    save(KEY_USERS, users);
  }

  if(load(KEY_COURSES).length === 0){
    
    const courses = [
      {
        id: 5001,
        title: 'Intro to Web Development',
        subject: 'Web Development',
        desc: 'Build practical web pages with HTML, CSS & JavaScript.',
        materials: 'Week1: HTML basics\nWeek2: Semantic HTML\nWeek3: CSS layouts\nWeek4: JS interactivity\nProject: Personal portfolio',
        creatorId: 1001, creatorName: 'Dr. Maya Rao',
        students: [2001,2002,2003,2004],
        assignments:[
          { id: 7001, title: 'HTML Structure', desc: 'Create a semantic multi-section page with accessible elements' },
          { id: 7002, title: 'Responsive CSS', desc: 'Create a responsive layout using Grid and Flexbox' },
          { id: 7004, title: 'Interactive JS', desc: 'Add DOM interactions: modal, tabs, and form validation' }
        ]
      },
      {
        id: 5002,
        title: 'Data Structures — Basics',
        subject: 'Data Structures',
        desc: 'Understand arrays, linked lists, stacks and queues with implementations.',
        materials: 'Slides, exercises and labs',
        creatorId: 1001, creatorName: 'Dr. Maya Rao',
        students: [2002,2005,2006],
        assignments:[
          { id: 7003, title: 'Linked List Ops', desc: 'Implement insert, delete and traversal operations' },
          { id: 7005, title: 'Stack & Queue', desc: 'Use arrays to implement stack and queue; analyze complexity' }
        ]
      },
      {
        id: 5003,
        title: 'Introduction to Databases',
        subject: 'Databases',
        desc: 'Relational database concepts, SQL basics and small projects.',
        materials: 'ER modeling, SQL queries, migrations',
        creatorId: 1002, creatorName: 'Dr. Rajesh Kumar',
        students: [2001,2004,2005,2007],
        assignments:[
          { id: 7006, title: 'ER Diagram', desc: 'Design ER diagram for a library system' },
          { id: 7007, title: 'SQL Queries', desc: 'Write SQL queries for sample DB and optimize joins' }
        ]
      }
    ];
    save(KEY_COURSES, courses);
  }

  if(load(KEY_SUBS).length === 0){
    const fileData = 'data:text/plain;base64,' + btoa('Sample solution content.');
    const subs = [
      { id: 9001, courseId:5001, assignId:7001, studentId:2001, studentName:'Amit Sharma', text:'HTML structure ready', fileName:'home.zip', fileData, grade:'92', feedback:'Great structure.' , ts: Date.now() - 5*24*3600*1000 },
      { id: 9002, courseId:5001, assignId:7002, studentId:2002, studentName:'Nisha Verma', text:'Responsive layout', fileName:null, fileData:null, grade:null, feedback:null , ts: Date.now() - 3*24*3600*1000 },
      { id: 9003, courseId:5002, assignId:7003, studentId:2005, studentName:'Sneha Patel', text:'Linked list implementation', fileName:'linkedlist.java', fileData, grade:'85', feedback:'Works but edge cases missing', ts: Date.now() - 4*24*3600*1000 },
      { id: 9004, courseId:5003, assignId:7006, studentId:2007, studentName:'Zara Khan', text:'ER diagram attached', fileName:'er.pdf', fileData, grade:null, feedback:null, ts: Date.now() - 2*24*3600*1000 },
      { id: 9005, courseId:5001, assignId:7004, studentId:2003, studentName:'Raj Singh', text:'JS interactions implemented', fileName:'script.js', fileData, grade:'78', feedback:'Minor bugs', ts: Date.now() - 6*24*3600*1000 }
    ];
    save(KEY_SUBS, subs);
  }
}


function newCaptcha(){ const a = Math.floor(Math.random()*9)+1; const b = Math.floor(Math.random()*9)+1; return { q: `${a} + ${b} = ?`, ans: a+b }; }
let captcha = newCaptcha();
function renderCaptcha(){ captcha = newCaptcha(); qs('#captcha-question').textContent = captcha.q; qs('#captcha-answer').value=''; }


const authTitle = qs('#auth-title');
const nameGroup = qs('#name-group');
const roleGroup = qs('#role-group');
const submitBtn = qs('#submit-btn');
const toggleBtn = qs('#toggle-btn');
let mode = 'login'; 

function setMode(m){
  mode = m;
  if(mode === 'signup'){
    authTitle.textContent = 'Create account';
    nameGroup.style.display = 'block';
    roleGroup.style.display = 'block';
    submitBtn.textContent = 'Create account';
    toggleBtn.textContent = 'Back to login';
    qs('#password').autocomplete = 'new-password';
  } else {
    authTitle.textContent = 'Login';
    nameGroup.style.display = 'none';
    roleGroup.style.display = 'none';
    submitBtn.textContent = 'Login';
    toggleBtn.textContent = 'Create account';
    qs('#password').autocomplete = 'current-password';
  }
  renderCaptcha();
}
toggleBtn.addEventListener('click', ()=> setMode(mode==='login' ? 'signup' : 'login'));

qs('#auth-form').addEventListener('submit', e=>{
  e.preventDefault();
  const email = qs('#email').value.trim().toLowerCase();
  const pwd = qs('#password').value;
  const answer = qs('#captcha-answer').value.trim();
  if(Number(answer) !== captcha.ans){ alert('Captcha incorrect'); renderCaptcha(); return; }
  const users = load(KEY_USERS);
  if(mode === 'signup'){
    const name = qs('#name').value.trim();
    const role = qs('#role').value;
    if(!name || !email || !pwd){ alert('Please fill all fields.'); return; }
    if(users.find(u=>u.email === email)){ alert('Email already registered.'); return; }
    const u = { id: Date.now(), name, email, password: pwd, role, bio:'' };
    users.push(u); save(KEY_USERS, users);
    
    window.currentUser = u;
    localStorage.setItem(CURRENT_USER_KEY, String(u.id));
    openPortalForRole(u.role);
    return;
  } else {
    const me = users.find(u => u.email === email && u.password === pwd);
    if(!me){ alert('Invalid credentials'); return; }
    window.currentUser = me;
    localStorage.setItem(CURRENT_USER_KEY, String(me.id)); 
    openPortalForRole(me.role);
    return;
  }
});


qs('#demo-btn').addEventListener('click', ()=>{
  const users = load(KEY_USERS);
  if(users.length === 0) seedIfEmpty();
  const demo = load(KEY_USERS)[0];
  qs('#email').value = demo.email;
  qs('#password').value = demo.password;
});


const portal = qs('#portal');
const navEducator = qs('#nav-educator');
const navStudent = qs('#nav-student');

function resetViews(){
  qsa('.view').forEach(v => v.style.display = 'none');
}

function openPortalForRole(role){
  qs('#user-name').textContent = window.currentUser.name;
  qs('#user-role').textContent = window.currentUser.role.toUpperCase();
  portal.classList.remove('hidden');
  qs('#auth').classList.add('hidden');

  navEducator.style.display = role === 'educator' ? 'block' : 'none';
  navStudent.style.display = role === 'student' ? 'block' : 'none';

  
  if(role==='educator'){
    setActiveNav(navEducator.querySelector('[data-view="edu-assignments"]'));
    showView('edu-assignments');
  } else {
    setActiveNav(navStudent.querySelector('[data-view="stu-assignments"]'));
    showView('stu-assignments');
  }

  qs('#profile-name-edu').textContent = window.currentUser.name;
  qs('#profile-email-edu').textContent = window.currentUser.email;
  qs('#profile-bio-edu').textContent = window.currentUser.bio || '';
  qs('#profile-name-stu').textContent = window.currentUser.name;
  qs('#profile-email-stu').textContent = window.currentUser.email;
  qs('#profile-bio-stu').textContent = window.currentUser.bio || '';
  renderAll();
}

function setActiveNav(link){
  qsa('.nav a').forEach(a=>a.classList.remove('active'));
  if(link) link.classList.add('active');
}

qsa('.nav a').forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    const view = a.dataset.view;
    setActiveNav(a);
    showView(view);
  });
  a.addEventListener('keydown', ev => { if(ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); a.click(); }});
});

function showView(viewId){
  resetViews();
  const el = qs('#' + viewId);
  if(el){ el.style.display = 'block'; qs('#page-title').textContent = el.querySelector('h2') ? el.querySelector('h2').textContent : 'Portal'; }
  if(viewId.startsWith('edu-')) renderEducatorViews();
  if(viewId.startsWith('stu-')) renderStudentViews();
}


const modalRoot = qs('#modal-root');

function openModal({ title, width = 880, contentCallback }){
  const backdrop = document.createElement('div'); backdrop.className = 'modal-backdrop';
  const card = document.createElement('div'); card.className = 'modal-card';
  if(width) card.style.maxWidth = width + 'px';
  const header = document.createElement('div'); header.className = 'modal-header';
  const h = document.createElement('h3'); h.textContent = title || '';
  const closeBtn = document.createElement('button'); closeBtn.className = 'btn ghost'; closeBtn.textContent = 'Close';
  closeBtn.addEventListener('click', ()=> backdrop.remove());
  header.appendChild(h); header.appendChild(closeBtn);
  card.appendChild(header);

  const content = document.createElement('div');
  content.className = 'modal-content';
  card.appendChild(content);

  if(typeof contentCallback === 'function'){
    contentCallback(content, backdrop);
  }

  backdrop.appendChild(card);
  backdrop.addEventListener('click', (e)=> { if(e.target === backdrop) backdrop.remove(); });
  modalRoot.appendChild(backdrop);
  card.setAttribute('tabindex','-1');
  card.focus();
  return { backdrop, card, content };
}


qs('#create-course-btn')?.addEventListener('click', ()=>{
  const title = qs('#create-title').value.trim();
  const subject = qs('#create-subject').value.trim() || 'General';
  const desc = qs('#create-desc').value.trim();
  const materials = qs('#create-materials').value.trim();
  if(!title){ alert('Title required'); return; }
  const courses = load(KEY_COURSES);
  courses.push({ id: Date.now(), title, subject, desc, materials, creatorId: window.currentUser.id, creatorName: window.currentUser.name, students:[], assignments:[] });
  save(KEY_COURSES, courses);
  qs('#create-title').value = qs('#create-desc').value = qs('#create-materials').value = qs('#create-subject').value = '';
  alert('Course created');
  renderAll();
});
qs('#clear-create')?.addEventListener('click', ()=> { qs('#create-title').value = qs('#create-desc').value = qs('#create-materials').value = qs('#create-subject').value = ''; });

function renderEduCourses(){}
function openManageCourseModal(courseId){
  const course = load(KEY_COURSES).find(c => c.id === courseId);
  if(!course) return alert('Course not found');
  openModal({
    title: `Manage — ${course.title}`,
    width: 920,
    contentCallback: (container, backdrop) => {
      const cols = document.createElement('div'); cols.className = 'modal-columns';
      const left = document.createElement('div');
      left.innerHTML = `<div><strong>${escapeHtml(course.title)}</strong> <span class="subject-pill">${escapeHtml(course.subject||'')}</span><div class="meta">by ${escapeHtml(course.creatorName)}</div><p style="white-space:pre-wrap">${escapeHtml(course.materials || course.desc)}</p><h4>Assignments</h4></div>`;
      const assignList = document.createElement('div');
      (course.assignments || []).forEach(a => {
        const node = document.createElement('div'); node.className = 'card'; node.style.margin='8px 0'; node.style.padding='10px';
        node.innerHTML = `<strong>${escapeHtml(a.title)}</strong><div class="small">${escapeHtml(a.desc)}</div>`;
        const viewSubs = document.createElement('button'); viewSubs.className='btn'; viewSubs.textContent='View Submissions';
        viewSubs.addEventListener('click', ()=> openAssignmentSubmissionsModal(course.id, a.id));
        node.appendChild(viewSubs);
        assignList.appendChild(node);
      });
      left.appendChild(assignList);

      const right = document.createElement('div'); right.className = 'modal-right';
      const addBtn = document.createElement('button'); addBtn.className='btn primary'; addBtn.textContent='Add Assignment';
      addBtn.addEventListener('click', ()=>{
        const t = prompt('Assignment title'); if(!t) return;
        const d = prompt('Assignment description') || '';
        const cs = load(KEY_COURSES); const c = cs.find(x => x.id === courseId);
        c.assignments = c.assignments || []; c.assignments.push({ id: Date.now(), title: t, desc: d });
        save(KEY_COURSES, cs);
        alert('Assignment added');
        backdrop.remove();
        renderAll();
      });
      right.appendChild(addBtn);
      right.appendChild(document.createElement('hr'));
      const studTitle = document.createElement('h4'); studTitle.textContent = 'Enrolled Students';
      right.appendChild(studTitle);
      const sl = document.createElement('div');
      (course.students || []).forEach(sid => {
        const user = load(KEY_USERS).find(u => u.id === sid);
        if(!user) return;
        const node = document.createElement('div'); node.className='item'; node.innerHTML = `<div><strong>${escapeHtml(user.name)}</strong><div class="meta">${escapeHtml(user.email)}</div></div>`;
        sl.appendChild(node);
      });
      right.appendChild(sl);

      cols.appendChild(left); cols.appendChild(right);
      container.appendChild(cols);
    }
  });
}

function openAssignmentSubmissionsModal(courseId, assignId){
  const course = load(KEY_COURSES).find(c => c.id === courseId);
  const assign = (course && course.assignments||[]).find(a => a.id === assignId);
  const subs = load(KEY_SUBS).filter(s => s.courseId === courseId && s.assignId === assignId);
  openModal({
    title: `${assign ? assign.title : 'Assignment'} — Submissions`,
    width: 920,
    contentCallback: (container, backdrop) => {
      const left = document.createElement('div');
      left.innerHTML = `<div><strong>${escapeHtml(assign ? assign.title : 'Assignment')}</strong><div class="meta">${escapeHtml(assign ? assign.desc : '')}</div></div>`;
      const timeline = document.createElement('div'); timeline.style.marginTop='12px';
      if(subs.length === 0) timeline.innerHTML = '<div class="small">No submissions yet.</div>';
      subs.forEach(s => {
        const ev = document.createElement('div'); ev.className = 'card'; ev.style.margin = '10px 0'; ev.style.padding = '10px';
        ev.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><div><strong>${escapeHtml(s.studentName)}</strong><div class="meta">${s.ts ? new Date(s.ts).toLocaleString() : ''}</div></div><div>${s.grade === null ? '<span class="meta">Pending</span>' : '<span class="meta">Grade: '+escapeHtml(s.grade)+'</span>'}</div></div><div style="margin-top:8px" class="small">${escapeHtml(s.text)}</div>`;
        if(s.fileName){
          const a = document.createElement('a'); a.href = s.fileData; a.download = s.fileName; a.textContent = 'Download ' + s.fileName; a.style.display='block'; a.style.marginTop='8px';
          ev.appendChild(a);
        }
        const controls = document.createElement('div'); controls.style.marginTop='8px';
        const gradeBtn = document.createElement('button'); gradeBtn.className='btn warn'; gradeBtn.textContent='Grade';
        gradeBtn.addEventListener('click', ()=>{
          const g = prompt('Enter numeric grade (0-100)', s.grade || '');
          if(g === null) return;
          s.grade = g; s.feedback = prompt('Feedback (optional)', s.feedback || '') || s.feedback;
          const all = load(KEY_SUBS).map(ss => ss.id === s.id ? s : ss); save(KEY_SUBS, all); alert('Saved'); backdrop.remove(); renderAll();
        });
        controls.appendChild(gradeBtn);
        ev.appendChild(controls);
        timeline.appendChild(ev);
      });
      container.appendChild(left);
      container.appendChild(timeline);
    }
  });
}

function openCourseModalForStudent(courseId){
  const c = load(KEY_COURSES).find(x => x.id === courseId);
  if(!c) return alert('Course not found');
  openModal({
    title: `${c.title} — Course`,
    width: 880,
    contentCallback: (container, backdrop) => {
      const cols = document.createElement('div'); cols.className = 'modal-columns';
      const left = document.createElement('div');
      left.innerHTML = `<div><strong>${escapeHtml(c.title)}</strong> <span class="subject-pill">${escapeHtml(c.subject||'')}</span><div class="meta">by ${escapeHtml(c.creatorName)}</div><p style="white-space:pre-wrap">${escapeHtml(c.materials || c.desc)}</p></div>`;
      const assignArea = document.createElement('div');
      assignArea.innerHTML = `<h4 style="margin-top:12px">Assignments</h4>`;
      (c.assignments || []).forEach(a => {
        const node = document.createElement('div'); node.className = 'card'; node.style.margin='8px 0'; node.style.padding='10px';
        node.innerHTML = `<strong>${escapeHtml(a.title)}</strong><div class="meta">${escapeHtml(a.desc)}</div>`;
        const submitBtn = document.createElement('button'); submitBtn.className='btn primary'; submitBtn.textContent='Submit';
        submitBtn.addEventListener('click', ()=> openStudentSubmitModal(c.id, a.id, a.title));
        const viewBtn = document.createElement('button'); viewBtn.className='btn ghost'; viewBtn.textContent='View Status';
        viewBtn.addEventListener('click', ()=> {
          const subs = load(KEY_SUBS).filter(s => s.courseId === c.id && s.assignId === a.id && s.studentId === window.currentUser.id);
          if(subs.length === 0) return alert('No submission yet');
          const s = subs[subs.length-1];
          alert('Grade: ' + (s.grade || '—') + '\nFeedback: ' + (s.feedback || '—'));
        });
        node.appendChild(submitBtn); node.appendChild(viewBtn);
        assignArea.appendChild(node);
      });
      left.appendChild(assignArea);

      const right = document.createElement('div'); right.className = 'modal-right';
      right.innerHTML = '<h4>Quick Info</h4>';
      const enrolled = (c.students || []).includes(window.currentUser.id);
      const enrollBtn = document.createElement('button'); enrollBtn.className = enrolled ? 'btn' : 'btn primary';
      enrollBtn.textContent = enrolled ? 'Enrolled' : 'Enroll';
      if(!enrolled){
        enrollBtn.addEventListener('click', ()=> {
          c.students = c.students || []; c.students.push(window.currentUser.id);
          const all = load(KEY_COURSES).map(cc => cc.id === c.id ? c : cc); save(KEY_COURSES, all);
          alert('Enrolled');
          backdrop.remove();
          renderAll();
        });
      }
      right.appendChild(enrollBtn);

      cols.appendChild(left); cols.appendChild(right);
      container.appendChild(cols);
    }
  });
}

function openStudentSubmitModal(courseId, assignId, title){
  openModal({
    title: `Submit — ${title}`,
    width: 720,
    contentCallback: (container, backdrop) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `<label class="small">Notes / Text</label>`;
      const ta = document.createElement('textarea'); ta.style.width='100%';
      const fileLabel = document.createElement('label'); fileLabel.className='small'; fileLabel.textContent = 'Attach file (optional)';
      const fileInput = document.createElement('input'); fileInput.type='file';
      const actions = document.createElement('div'); actions.style.marginTop='12px'; actions.style.display='flex'; actions.style.gap='8px';
      const submit = document.createElement('button'); submit.className='btn primary'; submit.textContent='Submit';
      const cancel = document.createElement('button'); cancel.className='btn ghost'; cancel.textContent='Cancel';
      actions.appendChild(submit); actions.appendChild(cancel);
      wrapper.appendChild(ta); wrapper.appendChild(fileLabel); wrapper.appendChild(fileInput); wrapper.appendChild(actions);
      container.appendChild(wrapper);

      cancel.addEventListener('click', ()=> backdrop.remove());
      submit.addEventListener('click', ()=>{
        const text = ta.value.trim() || '(no text)';
        const file = fileInput.files[0];
        if(file){
          const reader = new FileReader();
          reader.onload = function(evt){
            const data = evt.target.result;
            saveSubmission(courseId, assignId, text, file.name, data);
            alert('Submitted with file');
            backdrop.remove(); renderAll();
          };
          reader.readAsDataURL(file);
        } else {
          saveSubmission(courseId, assignId, text, null, null);
          alert('Submitted');
          backdrop.remove(); renderAll();
        }
      });
    }
  });
}

function saveSubmission(courseId, assignId, text, fileName, fileData){
  const subs = load(KEY_SUBS);
  subs.push({ id: Date.now(), courseId, assignId, studentId: window.currentUser.id, studentName: window.currentUser.name, text, fileName: fileName || null, fileData: fileData || null, grade: null, feedback: null, ts: Date.now() });
  save(KEY_SUBS, subs);
}


function renderEducatorViews(){
  renderEduCourses();
  renderEduAssignments();
  renderEduStudents();
}

function renderStudentViews(){
  renderStudentCatalog();
  renderStudentCourses();
  renderStudentAssignments();
}

function renderAll(){
 
  const myCourses = load(KEY_COURSES).filter(c => c.creatorId === window.currentUser.id);
  qs('#stat-edu-courses').textContent = myCourses.length;
  const studSet = new Set(); myCourses.forEach(c => (c.students || []).forEach(s => studSet.add(s)));
  qs('#stat-edu-students').textContent = studSet.size;
  const pending = load(KEY_SUBS).filter(s => s.grade === null && myCourses.some(c => c.id === s.courseId));
  qs('#stat-edu-pending').textContent = pending.length;

  
  const activity = qs('#edu-activity'); activity.innerHTML = '';
  load(KEY_SUBS).slice(-8).reverse().forEach(s => {
    const row = document.createElement('div'); row.className='item'; row.innerHTML = `<div><strong>${escapeHtml(s.studentName)}</strong><div class="meta">Submitted for assignment ${s.assignId} (course ${s.courseId})</div></div>`; activity.appendChild(row);
  });

  
  const enrolled = load(KEY_COURSES).filter(c => (c.students || []).includes(window.currentUser.id));
  qs('#stat-stu-enrolled').textContent = enrolled.length;
  const openAssigns = []; enrolled.forEach(c => (c.assignments || []).forEach(a => openAssigns.push({c,a})));
  qs('#stat-stu-open').textContent = openAssigns.length;
  const mySubs = load(KEY_SUBS).filter(s => s.studentId === window.currentUser.id && s.grade !== null).map(s => Number(s.grade));
  const avg = mySubs.length ? Math.round(mySubs.reduce((a,b)=>a+b,0)/mySubs.length) : null;
  qs('#stat-stu-grade').textContent = avg === null ? '—' : avg + '%';

  renderEduCourses(); renderEduAssignments(); renderEduStudents();
  renderStudentCatalog(); renderStudentCourses(); renderStudentAssignments();
}


function renderEduCourses(){
  const list = qs('#edu-courses-list'); list.innerHTML = '';
  const courses = load(KEY_COURSES).filter(c => c.creatorId === window.currentUser.id);
  if(courses.length === 0) list.innerHTML = '<div class="small">You have not created any courses yet.</div>';
  courses.forEach(c => {
    const item = document.createElement('div'); item.className = 'item';
    item.innerHTML = `<div><strong>${escapeHtml(c.title)}</strong> <span class="subject-pill">${escapeHtml(c.subject||'')}</span><div class="meta">${escapeHtml(c.desc)}</div></div>`;
    const right = document.createElement('div');
    const manage = document.createElement('button'); manage.className='btn'; manage.textContent='Manage';
    manage.addEventListener('click', ()=> openManageCourseModal(c.id));
    right.appendChild(manage);
    item.appendChild(right);
    list.appendChild(item);
  });
}

function renderEduAssignments(){
  const list = qs('#edu-assign-list'); list.innerHTML = '';
  const courses = load(KEY_COURSES).filter(c => c.creatorId === window.currentUser.id);
  const assigns = [];
  courses.forEach(c => (c.assignments || []).forEach(a => assigns.push({ course:c, assign:a })));
  if(assigns.length === 0) list.innerHTML = '<div class="small">No assignments created.</div>';
  assigns.forEach(obj => {
    const item = document.createElement('div'); item.className='item';
    item.innerHTML = `<div><strong>${escapeHtml(obj.assign.title)}</strong><div class="meta">${escapeHtml(obj.course.title)} — ${escapeHtml(obj.course.subject||'')}</div></div>`;
    const view = document.createElement('button'); view.className='btn'; view.textContent='View Submissions';
    view.addEventListener('click', ()=> openAssignmentSubmissionsModal(obj.course.id, obj.assign.id));
    item.appendChild(view); list.appendChild(item);
  });
}

function renderEduStudents(){
  const list = qs('#edu-students-list'); list.innerHTML = '';
  const courses = load(KEY_COURSES).filter(c => c.creatorId === window.currentUser.id);
  const studentIds = new Set();
  courses.forEach(c => (c.students || []).forEach(s => studentIds.add(s)));
  const students = load(KEY_USERS).filter(u => studentIds.has(u.id));
  if(students.length === 0) list.innerHTML = '<div class="small">No students enrolled yet.</div>';
  students.forEach(s => {
    const item = document.createElement('div'); item.className = 'item';
    item.innerHTML = `<div><strong>${escapeHtml(s.name)}</strong><div class="meta">${escapeHtml(s.email)}</div></div>`;
    list.appendChild(item);
  });
}


function renderStudentCatalog(){
  const list = qs('#catalog-list'); list.innerHTML = '';
  const courses = load(KEY_COURSES);
  courses.forEach(c => {
    const enrolled = (c.students || []).includes(window.currentUser.id);
    const item = document.createElement('div'); item.className = 'item';
    item.innerHTML = `<div><strong>${escapeHtml(c.title)}</strong> <span class="subject-pill">${escapeHtml(c.subject||'')}</span><div class="meta">by ${escapeHtml(c.creatorName)}</div><div class="small">${escapeHtml(c.desc)}</div></div>`;
    const right = document.createElement('div');
    if(enrolled){
      const openBtn = document.createElement('button'); openBtn.className='btn'; openBtn.textContent='Open';
      openBtn.addEventListener('click', ()=> openCourseModalForStudent(c.id));
      right.appendChild(openBtn);
    } else {
      const enrollBtn = document.createElement('button'); enrollBtn.className='btn primary'; enrollBtn.textContent='Enroll';
      enrollBtn.addEventListener('click', ()=> {
        if(!c.students) c.students = [];
        if(c.students.includes(window.currentUser.id)) return alert('Already enrolled');
        c.students.push(window.currentUser.id);
        const all = load(KEY_COURSES).map(cc => cc.id === c.id ? c : cc);
        save(KEY_COURSES, all); alert('Enrolled in ' + c.title); renderAll();
      });
      right.appendChild(enrollBtn);
    }
    item.appendChild(right); list.appendChild(item);
  });
}

function renderStudentCourses(){
  const list = qs('#stu-courses-list'); list.innerHTML = '';
  const courses = load(KEY_COURSES).filter(c => (c.students || []).includes(window.currentUser.id));
  if(courses.length === 0) list.innerHTML = '<div class="small">You are not enrolled in any courses yet. Browse catalog to enroll.</div>';
  courses.forEach(c => {
    const item = document.createElement('div'); item.className = 'item';
    item.innerHTML = `<div><strong>${escapeHtml(c.title)}</strong> <span class="subject-pill">${escapeHtml(c.subject||'')}</span><div class="meta">${escapeHtml(c.desc)}</div></div>`;
    const openBtn = document.createElement('button'); openBtn.className='btn'; openBtn.textContent='Open';
    openBtn.addEventListener('click', ()=> openCourseModalForStudent(c.id));
    item.appendChild(openBtn); list.appendChild(item);
  });
}

function renderStudentAssignments(){
  const list = qs('#stu-assign-list'); list.innerHTML = '';
  const courses = load(KEY_COURSES).filter(c => (c.students || []).includes(window.currentUser.id));
  const assigns = [];
  courses.forEach(c => (c.assignments || []).forEach(a => assigns.push({ course:c, assign:a })));
  if(assigns.length === 0) list.innerHTML = '<div class="small">No assignments available.</div>';
  assigns.forEach(obj => {
    const item = document.createElement('div'); item.className='item';
    item.innerHTML = `<div><strong>${escapeHtml(obj.assign.title)}</strong><div class="meta">${escapeHtml(obj.course.title)} — ${escapeHtml(obj.course.subject||'')}</div></div>`;
    const right = document.createElement('div');
    const submit = document.createElement('button'); submit.className='btn primary'; submit.textContent='Submit';
    submit.addEventListener('click', ()=> openStudentSubmitModal(obj.course.id, obj.assign.id, obj.assign.title));
    const view = document.createElement('button'); view.className='btn ghost'; view.textContent='View Grade';
    view.addEventListener('click', ()=> {
      const subs = load(KEY_SUBS).filter(s => s.courseId === obj.course.id && s.assignId === obj.assign.id && s.studentId === window.currentUser.id);
      if(subs.length === 0) return alert('No submission yet.');
      const s = subs[subs.length-1];
      alert('Grade: ' + (s.grade || '—') + '\nFeedback: ' + (s.feedback || '—'));
    });
    right.appendChild(submit); right.appendChild(view);
    item.appendChild(right);
    list.appendChild(item);
  });
}

function escapeHtml(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

qs('#logout-btn').addEventListener('click', ()=>{
  if(confirm('Logout?')){ window.currentUser = null; portal.classList.add('hidden'); qs('#auth').classList.remove('hidden'); setMode('login'); localStorage.removeItem(CURRENT_USER_KEY); }
});
qs('#reset-btn').addEventListener('click', ()=> { if(confirm('Reset data?')) resetAll(); });


function restoreSession(){
  const idStr = localStorage.getItem(CURRENT_USER_KEY);
  if(!idStr) return false;
  const id = Number(idStr);
  const user = load(KEY_USERS).find(u => u.id === id);
  if(user){ window.currentUser = user; openPortalForRole(user.role); 
    showToast(`Welcome back, ${user.name}`, 3000);
    return true;
  }
  return false;
}


seedIfEmpty();
renderCaptcha();
setMode('login'); 


if(!restoreSession()){
  
  if(load(KEY_USERS).length === 0) seedIfEmpty();
} 


window._cp = {
  load, save, resetAll, seedIfEmpty, users: () => load(KEY_USERS), courses: () => load(KEY_COURSES), subs: () => load(KEY_SUBS)
};
