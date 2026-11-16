let students = JSON.parse(localStorage.getItem('students') || '[]');
let teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
let admins = JSON.parse(localStorage.getItem('admins') || '[]');
let salaryPaid = parseInt(localStorage.getItem('salaryPaid') || '0');

function saveAll() {
  localStorage.setItem('students', JSON.stringify(students));
  localStorage.setItem('teachers', JSON.stringify(teachers));
  localStorage.setItem('admins', JSON.stringify(admins));
  localStorage.setItem('salaryPaid', salaryPaid);
  document.getElementById('cStd').innerText = students.length || 1;
  document.getElementById('cTch').innerText = teachers.length;
  document.getElementById('cSal').innerText = salaryPaid;
  render();
}
function show(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }
function login() { let p = prompt('Super Admin PIN Banao / Daalo'); if (p) alert('Login Ho Gaya - Assistant Full Control'); }
function editBranch() { let n = prompt('Branch Ka Naya Naam Likho', document.getElementById('branch').value); if (n) alert('Branch Update: ' + n); }
function pic(input, id) { let r = new FileReader(); r.onload = e => document.getElementById(id).src = e.target.result; r.readAsDataURL(input.files[0]); }
function addStudent() {
  let n = document.getElementById('sName').value; if (!n) return alert('Naam Likho');
  students.push({ name: n, father: document.getElementById('sFather').value, type: document.getElementById('sType').value, pic: document.getElementById('sPic').src });
  saveAll(); alert('Student Save Ho Gaya');
}
function addTeacher() {
  let n = document.getElementById('tName').value; if (!n) return alert('Ustad Naam Likho');
  teachers.push({ name: n, phone: document.getElementById('tPhone').value, type: document.getElementById('tMobileType').value, pin: document.getElementById('tPin').value || '4821' });
  saveAll(); alert('Teacher Save Ho Gaya');
}
function addAdmin() {
  let n = document.getElementById('aName').value; if (!n) return alert('Admin Naam Likho');
  if (admins.length >= 10) return alert('10 Admin Poore Ho Gaye');
  admins.push({ name: n, branch: document.getElementById('aBranch').value, phone: document.getElementById('aPhone').value, pin: document.getElementById('aPin').value });
  saveAll(); alert('Admin Add Ho Gaya');
}
function render() {
  document.getElementById('stdList').innerHTML = students.map(s => `<p>👦 ${s.name} - ${s.type} - Walid: ${s.father}</p>`).join('');
  document.getElementById('tchList').innerHTML = teachers.map(t => `<p>👨‍🏫 ${t.name} - ${t.type} - ${t.phone} - Code: ${t.pin}</p>`).join('');
  document.getElementById('adminList').innerHTML = admins.map(a => `<p>🔐 ${a.name} - ${a.branch} - ${a.phone}</p>`).join('');
}
function resultFields() {
  let t = document.getElementById('rType').value; let h = '';
  if (t === 'Hifz') h = '<input placeholder="Sabak"><input placeholder="Sabqi"><input placeholder="Manzil"><input placeholder="Kitne Paare">';
  if (t === 'Nazra') h = '<input placeholder="Qaida / Nazra Quran / Tajweed"><input placeholder="Konsa Para">';
  if (t === 'Darse Nizami Banat') h = '<select><option>Saal 1 - Sanvia Khasa</option><option>Saal 2 - Sanvia Khasa</option><option>Saal 3 - Aaliya</option><option>Saal 4 - Aaliya</option><option>Saal 5 - Aalmiya</option><option>Saal 6 - Aalmiya / Dora-e-Hadith</option></select><input placeholder="Wifaq Kitab Ka Naam"><input placeholder="Number / Grade">';
  document.getElementById('rFields').innerHTML = h;
}
function makeResult() { document.getElementById('resultOut').innerHTML = '<p>✅ Result Card Tayyar - ' + document.getElementById('rType').value + '</p>'; window.print(); }
function sendSalaryCode() {
  let c = Math.floor(1000 + Math.random() * 9000);
  document.getElementById('salOut').innerHTML = 'Code Bana: <b>' + c + '</b> - Touch wale ko WhatsApp, Button wale ko SMS par bhejo: YES likh kar bhejen - Code ' + c;
  alert('Code: ' + c);
}
function confirmSalary() {
  let n = document.getElementById('salName').value || 'Ustad'; salaryPaid++;
  document.getElementById('salOut').innerHTML = `<b>✅ CONFIRMED</b><br>Sign: ${n} - Confirmed<br>Salary: ${document.getElementById('salAmt').value}<br>Mahina: ${document.getElementById('salMonth').value}<br>Date: ${new Date().toLocaleDateString()}`;
  saveAll();
}
function sendMsg(type) {
  let txt = document.getElementById('complaint').value || 'Ruhani Markaz Kotri - Ghair Hazri / Shikayat';
  if (type === 'whatsapp') window.open('https://wa.me/923003037168?text=' + encodeURIComponent(txt));
  else window.open('sms:03003037168?body=' + encodeURIComponent(txt));
}
function printSalary() { window.print(); }
function clearC(id) { let c = document.getElementById(id); c.getContext('2d').clearRect(0, 0, c.width, c.height); }
['c1', 'c2'].forEach(id => {
  let c = document.getElementById(id); let ctx = c.getContext('2d'); let d = false;
  c.addEventListener('touchstart', e => { d = true; ctx.beginPath(); });
  c.addEventListener('touchmove', e => { if (!d) return; let r = c.getBoundingClientRect(); ctx.lineTo(e.touches[0].clientX - r.left, e.touches[0].clientY - r.top); ctx.stroke(); });
  c.addEventListener('touchend', () => d = false);
  c.addEventListener('mousedown', () => { d = true; ctx.beginPath(); });
  c.addEventListener('mousemove', e => { if (!d) return; let r = c.getBoundingClientRect(); ctx.lineTo(e.clientX - r.left, e.clientY - r.top); ctx.stroke(); });
  c.addEventListener('mouseup', () => d = false);
});
resultFields(); saveAll();
