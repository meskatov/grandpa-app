// ===== ЗВЁЗДЫ =====
(function(){
    const c = document.getElementById('stars-container');
    for(let i=0;i<100;i++){
        const s = document.createElement('div'); s.classList.add('star');
        s.style.left = Math.random()*100+'%';
        s.style.top = Math.random()*100+'%';
        const sz = 1+Math.random()*2;
        s.style.width = sz+'px'; s.style.height = sz+'px';
        s.style.animationDuration = (1.5+Math.random()*4)+'s';
        s.style.animationDelay = Math.random()*3+'s';
        c.appendChild(s);
    }
})();

// ===== ДАННЫЕ ЭТАПОВ =====
const stages = [
    { id:'screen-childhood', num:'01', img:'images/childhood.jpg', title:'С чего всё начиналось...', text:'Маленький Володя. Крошечные ладошки, которые тянулись к маме. Первые шаги по скрипучему полу старого дома. Запах бабушкиных пирогов по выходным. Двор, где каждый куст был тайной, а каждая лужа — океаном.' },
    { id:'screen-school', num:'02', img:'images/school.jpg', title:'Школьные годы', text:'Белый фартук, букет гладиолусов, первый звонок. Ты сидел за партой и рисовал самолётики. Учительница говорила: «Володя, ты способный». А ты старался. По-своему. Друзья, первые пятёрки и двойки, первые победы.' },
    { id:'screen-youth', num:'03', img:'images/youth.jpg', title:'Время, когда всё возможно', text:'Юность — это ветер в голове и огонь в сердце. Ты мечтал о великом. Строил планы, влюблялся, ошибался и снова вставал. Ночами сидел у костра, пел под гитару и верил — всё получится.' },
    { id:'screen-army', num:'04', img:'images/army.jpg', title:'Честь имею', text:'Повестка. Проводы. Мамины слёзы. Ты уходил мальчишкой, а вернулся мужчиной. Армия научила главному: держать слово, стоять за своих и не сдаваться.' },
    { id:'screen-friend', num:'05', img:'images/friend.jpg', title:'Братья навсегда', text:'Есть друзья, а есть — боевые товарищи. Твой друг — из вторых. Вы прошли через такое, что другим и не снилось. Делили хлеб, прикрывали спину, смеялись до слёз.' },
    { id:'screen-parents', num:'06', img:'images/parents.jpg', title:'Мама Галя и папа', text:'Два человека, без которых тебя бы не было. Мама — твой ангел-хранитель. Папа — первый герой. Он научил тебя быть мужчиной. Они отдали тебе всё.' },
    { id:'screen-daughter', num:'07', img:'images/daughter.jpg', title:'Твоя принцесса — Наташа', text:'Когда она родилась, ты впервые заплакал от счастья. Крошечный свёрток в больших руках. Первые шаги, первый класс. Ты провожал её в школу, а потом — под венец. Для тебя она навсегда малышка.' },
    { id:'screen-son', num:'08', img:'images/son.jpg', title:'Наследник — Игорь', text:'Сын. Твоя гордость. Твоё продолжение. Ты учил его забивать гвозди, водить машину, быть честным. Ты передал ему всё, что знал. И теперь он — твоя опора.' },
    { id:'screen-pearl-wedding', num:'🦪', img:'images/pearl-wedding.jpg', title:'30 лет вместе — Жемчужная свадьба', text:'Тридцать лет рука об руку с Александрой. Жемчуг рождается из песчинки, становясь драгоценностью. Так и ваш брак: год за годом вы создали нечто бесценное.' },
    { id:'screen-family', num:'09', img:'images/family.jpg', title:'Александра, Наташа, Игорь — твой мир', text:'Ты построил дом. Не из кирпича — из любви. Александра всегда рядом. Наташа и Игорь — твоя гордость. Это и есть счастье.' }
];

let currentStage = 0;
const totalStages = stages.length;

// ===== СОЗДАЁМ ЭКРАНЫ ЭТАПОВ =====
const container = document.getElementById('stages-container');
stages.forEach((st, idx) => {
    const sec = document.createElement('section');
    sec.classList.add('screen'); sec.id = st.id;
    sec.innerHTML = `
        <div class="screen-content stage-content">
            <button class="circle-back-btn nav-back" data-back="${idx === 0 ? 'screen-greeting' : stages[idx-1].id}">&#10094;</button>
            <div class="stage-badge">${st.num}</div>
            <div class="stage-photo-wrap">
                <img src="${st.img}" alt="${st.title}">
                <div class="photo-inner-frame"></div>
            </div>
            <h3 class="stage-title">${st.title}</h3>
            <p class="stage-text">${st.text}</p>
            <div class="dots-indicator">${stages.map((_,i) => `<span class="dot${i===idx?' active':''}${i<idx?' passed':''}"></span>`).join('')}</div>
            <div class="stage-nav">
                <button class="arrow-btn nav-back" data-back="${idx === 0 ? 'screen-greeting' : stages[idx-1].id}">&#10094;</button>
                <span class="stage-counter">${idx+1} / ${totalStages}</span>
                <button class="arrow-btn ${idx === totalStages-1 ? 'next-btn' : 'next-btn'}" data-next="${idx === totalStages-1 ? 'screen-video1' : stages[idx+1].id}">&#10095;</button>
            </div>
        </div>
    `;
    container.appendChild(sec);
});

// ===== ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ =====
function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) { target.classList.add('active'); target.scrollTop = 0; }
}

// ===== КНОПКИ НАЗАД (все) =====
document.addEventListener('click', function(e) {
    const backBtn = e.target.closest('.nav-back');
    if (backBtn) {
        const backId = backBtn.getAttribute('data-back');
        if (backId) switchScreen(backId);
        return;
    }
    const nextBtn = e.target.closest('.next-btn');
    if (nextBtn) {
        const nextId = nextBtn.getAttribute('data-next');
        if (nextId) {
            switchScreen(nextId);
            if (nextId === 'screen-final') setTimeout(createLeaves, 400);
        }
        return;
    }
});

// ===== АКТИВАЦИЯ =====
document.getElementById('btn-activate').addEventListener('click', () => {
    switchScreen('screen-greeting');
    createParticles();
    setTimeout(() => {
        const b = document.getElementById('btn-continue');
        b.style.opacity = '1'; b.style.transform = 'translateY(0)';
    }, 5500);
});
document.getElementById('btn-continue').addEventListener('click', () => switchScreen('screen-childhood'));

// ===== ЧАСТИЦЫ =====
function createParticles() {
    const c = document.getElementById('particles'); c.innerHTML = '';
    for(let i=0;i<45;i++){
        const p = document.createElement('div'); p.classList.add('particle');
        p.style.left = Math.random()*100+'%';
        p.style.top = (100+Math.random()*40)+'%';
        p.style.setProperty('--drift', (Math.random()-.5)*220+'px');
        const s = 2+Math.random()*5;
        p.style.width = s+'px'; p.style.height = s+'px';
        p.style.animationDuration = (3+Math.random()*7)+'s';
        p.style.animationDelay = Math.random()*3+'s';
        p.style.opacity = .3+Math.random()*.7;
        c.appendChild(p);
    }
}

// ===== ВИДЕО =====
function setupVideo(vId, bId, sId, nextScreen) {
    const v = document.getElementById(vId);
    const b = document.getElementById(bId);
    const s = document.getElementById(sId);
    if(!v||!b||!s) return;
    b.style.display = 'none';
    function show(){ b.style.display='inline-block'; b.style.opacity='0'; b.style.transform='translateY(15px)'; requestAnimationFrame(()=>{ b.style.transition='opacity .7s, transform .7s'; b.style.opacity='1'; b.style.transform='translateY(0)'; }); }
    v.addEventListener('ended', show);
    v.addEventListener('timeupdate', ()=>{ if(v.duration>0 && v.currentTime/v.duration>=.95) show(); });
    b.addEventListener('click', ()=>{ v.pause(); switchScreen(nextScreen); if(nextScreen==='screen-final') setTimeout(createLeaves,400); });
    s.addEventListener('click', ()=>{ v.pause(); switchScreen(nextScreen); if(nextScreen==='screen-final') setTimeout(createLeaves,400); });
}
setupVideo('video1','btn-video1','skip-video1','screen-video2');
setupVideo('video2','btn-video2','skip-video2','screen-final');

// ===== ДЕРЕВО ЖИЗНИ =====
function buildTree() {
    const tc = document.getElementById('tree-container');
    if(!tc) return;
    const photos = ['images/childhood.jpg','images/youth.jpg','images/army.jpg','images/pearl-wedding.jpg','images/daughter.jpg','images/son.jpg','images/family.jpg'];
    tc.innerHTML = photos.map((img,i) => {
        if(i===6) return `<div class="tree-photo tree-photo-center"><img src="${img}" alt=""></div>`;
        return `<div class="tree-photo tree-photo-${i}"><img src="${img}" alt=""></div>`;
    }).join('');
}
buildTree();

// ===== ЛИСТЬЯ =====
function createLeaves() {
    const c = document.getElementById('tree-leaves'); if(!c) return; c.innerHTML = '';
    for(let i=0;i<30;i++){
        const l = document.createElement('div'); l.classList.add('leaf');
        l.style.left = (Math.random()*260-10)+'px';
        l.style.top = (-Math.random()*30)+'px';
        l.style.setProperty('--drift', (Math.random()-.5)*150+'px');
        l.style.setProperty('--spin', (Math.random()*720-360)+'deg');
        l.style.animationDuration = (3+Math.random()*5)+'s';
        l.style.animationDelay = Math.random()*4+'s';
        const s = 4+Math.random()*8;
        l.style.width = s+'px'; l.style.height = s+'px';
        c.appendChild(l);
        setInterval(()=>{ l.style.animation='none'; l.offsetHeight; l.style.animation=`lFall ${3+Math.random()*5}s linear forwards`; l.style.animationDelay=Math.random()*2+'s'; }, 7000+Math.random()*5000);
    }
}

// ===== ОБНЯТЬ =====
document.getElementById('btn-hug').addEventListener('click', function(){
    createHearts();
    if(navigator.vibrate) navigator.vibrate([100,50,100,50,200]);
    const o = this.innerHTML;
    this.innerHTML = '<span>🤍 Крепко обнимаю!</span><span class="btn-shine"></span>';
    setTimeout(()=>{ this.innerHTML = o; }, 2500);
});

function createHearts() {
    const c = document.getElementById('hearts-container'); if(!c) return;
    const h = ['🤍','✨','💛','🌟','💝','🕊️'];
    for(let i=0;i<25;i++){
        setTimeout(()=>{
            const el = document.createElement('div'); el.classList.add('heart');
            el.textContent = h[Math.floor(Math.random()*h.length)];
            el.style.left = (15+Math.random()*70)+'%';
            el.style.bottom = '5%';
            el.style.setProperty('--drift', (Math.random()-.5)*220+'px');
            el.style.animationDuration = (2+Math.random()*4)+'s';
            el.style.fontSize = (20+Math.random()*35)+'px';
            c.appendChild(el);
            setTimeout(()=>{ if(el.parentNode) el.remove(); }, 5000);
        }, i*50);
    }
}

// ===== SW =====
if('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{ navigator.serviceWorker.register('service-worker.js'); });
}
