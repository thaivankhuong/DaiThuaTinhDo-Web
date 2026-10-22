const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const KV='../kinh-vo-luong-tho/';
(function(){if(localStorage.kvlt_dark=='1')document.documentElement.classList.add('dark');
const here=location.pathname.split('/').filter(Boolean).pop();
const N=[['../','🏠 Trang chủ'],['../kinh-vo-luong-tho/','📖 Kinh VLT'],['../tra-cuu/','🔎 Tra cứu'],['../hoan-canh/','🧭 Hoàn cảnh'],['../nghe/','🎧 Nghe'],['../lo-trinh/','🌱 30 ngày'],['../tung-kinh/','🪷 Tụng kinh'],['../mot-cau/','🌅 Một câu'],['../hoi-dap/','❓ Hỏi đáp'],['../niem-phat/','🙏 Niệm Phật'],['../so-tay/','📒 Sổ tay'],['../lich-giang/','📅 Lịch giảng']];
document.body.insertAdjacentHTML('afterbegin',`<header><a class="br" href="../">🪷 Đại Thừa Tịnh Độ</a><nav>${N.map(([h,t])=>`<a href="${h}" class="${h.includes('/'+here+'/')?'on':''}">${t}</a>`).join('')}</nav><button id="dk">🌙</button></header><div class="toast" id="toast"></div>`);
$('#dk').onclick=()=>localStorage.kvlt_dark=+document.documentElement.classList.toggle('dark');})();
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),1800)}
const Notes={all(){try{return JSON.parse(localStorage.kvlt_notes||'{}')}catch(e){return{}}},save(o){localStorage.kvlt_notes=JSON.stringify(o)},
 has(id){return!!this.all()[id]},toggle(id,item){const o=this.all();if(o[id]){delete o[id];this.save(o);toast('Đã bỏ khỏi sổ tay');return false}o[id]={...item,note:'',at:new Date().toISOString()};this.save(o);toast('Đã lưu vào sổ tay 📒');return true},
 set(id,k,v){const o=this.all();if(o[id]){o[id][k]=v;this.save(o)}}};
function markBtn(id,item){const on=Notes.has(id);return `<button data-mk="${esc(id)}" data-it="${esc(JSON.stringify(item))}">${on?'★ Đã lưu':'☆ Lưu sổ tay'}</button>`}
document.addEventListener('click',e=>{const b=e.target.closest('[data-mk]');if(!b)return;const on=Notes.toggle(b.dataset.mk,JSON.parse(b.dataset.it));b.textContent=on?'★ Đã lưu':'☆ Lưu sổ tay'});
