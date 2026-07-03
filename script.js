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

const grandchildrenPhotos = ['grandchild1.jpg','grandchild2.jpg','grandchild3.jpg','grandchild4.jpg'];

const stages = [
    { id:'screen-childhood', num:'01', img:'images/childhood.jpg', title:'С чего всё начиналось...', text:'Папа Георгий брал гармонь — и дом наполнялся музыкой. Маленький Володя слушал, затаив дыхание. Первые шаги по скрипучему полу, запах бабушкиных пирогов. Двор, где каждый куст был тайной. Ты смотрел на мир широко открытыми глазами.' },
    { id:'screen-friend', num:'02', img:'images/friend.jpg', title:'Братья навсегда', text:'Есть друзья, а есть — братья детства. Твой друг — из вторых. Вы вместе росли, вместе познавали мир, вместе попадали в передряги. Делили хлеб, прикрывали спину, смеялись до слёз. Такая дружба — на вес золота.' },
    { id:'screen-school', num:'03', img:'images/school.jpg', title:'Школьные годы', text:'Ты сидел за партой и рисовал самолётики. Учительница говорила: «Володя, ты способный». А ты старался. По-своему. Друзья, первые пятёрки и двойки, первые победы.' },
    { id:'screen-youth', num:'04', img:'images/youth.jpg', title:'Время, когда всё возможно', text:'Юность — это ветер в голове и огонь в сердце. Ты мечтал о великом. Строил планы, влюблялся, ошибался и снова вставал. Ночами сидел у костра, пел под гитару и верил — всё получится.' },
    { id:'screen-army', num:'05', img:'images/army.jpg', title:'Честь имею', text:'Повестка. Проводы. Мамины слёзы. Ты уходил мальчишкой, а вернулся мужчиной. Армия научила главному: держать слово, стоять за своих и не сдаваться.' },
    { id:'screen-college', num:'06', img:'images/college.jpg', title:'Техникум', text:'Новый этап. Новые знания. Новые друзья. Ты выбрал профессию, которая стала делом всей жизни. Лекции, практика, первые серьёзные успехи. Техникум закалил характер и дал путёвку в жизнь.' },
    { id:'screen-love', num:'💕', img:'images/love.jpg', title:'С любимой свела судьба', text:'Ты встретил Александру — и всё встало на свои места. Судьба свела вас не случайно. Её глаза, её улыбка, её голос. Ты понял: вот она — та самая. С этого момента вы шли по жизни вместе. И до сих пор идёте.' },
    { id:'screen-daughter', num:'07', img:'images/daughter.jpg', title:'Твоя принцесса — Наташа', text:'Он оторвал календарный листочек, смял его и бросил. А потом — ой! Это же день рождения его дочери! Он взял листочек, расправил его и повесил обратно. Когда она родилась, ты впервые заплакал от счастья. Крошечный свёрток в больших руках. Для тебя она навсегда малышка.' },
    { id:'screen-son', num:'08', img:'images/son.jpg', title:'Наследник — Игорь', text:'Сын. Твоя гордость. Твое продолжение. Ты сразу не поверил, что у тебя родился сын, но это случилось. У тебя появился сын. Ты учил его забивать гвозди, водить машину, быть честным. Теперь он — твоя опора.' },
    { id:'screen-fishing', num:'🎣', img:'images/fishing.jpg', title:'Рыбалка — это страсть', text:'Тишина. Удочка в руках. Поплавок замер на воде. Для кого-то рыбалка — просто хобби. А для тебя, Владимир, это целый мир. Ты сходишь по ней с ума. Каждый клёв — как праздник. Каждая щука — трофей. Река — твоё место силы.' },
    { id:'screen-wedding-daughter', num:'💒', img:'images/wedding-daughter.jpg', title:'Свадьба Наташи', text:'Ты вёл её под руку — свою маленькую принцессу — и передавал в надёжные руки. Белое платье, счастливые глаза, слёзы радости. Твоя девочка стала женой. А ты стоял и понимал: жизнь продолжается. И это — прекрасно.' },
    { id:'screen-wedding-son', num:'💒', img:'images/wedding-son.jpg', title:'Свадьба Игоря', text:'Твой сын стал мужчиной. Стоял перед алтарём — такой же серьёзный и решительный, как ты когда-то. Ты смотрел на него с гордостью. Ещё одна глава. Ещё одно продолжение рода.' },
    { id:'screen-grandchildren', num:'👶', img:'', title:'Внуки — твоя радость', text:'Маленькие ручки, которые тянутся к дедушке. Смех, который наполняет дом. Ты смотришь на них и видишь будущее. В каждом из них — частичка тебя. Внуки — это награда за всё.', isMultiPhoto: true },
    { id:'screen-relatives', num:'13', img:'images/relatives.jpg', title:'Родные', text:'Мама Галя, папа Георгий — и ты. Один дом, один стол, одна семья. Вместе делили радости и горести. Кровные узы — самые крепкие. Это твой корень, твоя основа.' },
    { id:'screen-cousin', num:'14', img:'images/cousin.jpg', title:'Закодычные родственники', text:'Двоюродный брат — это не просто родня. Это друг, с которым ты делил детство, секреты и приключения. Кровь одна, дух один. Вы — закодычные. И эта связь на всю жизнь.' },
    { id:'screen-pearl-wedding', num:'15', img:'images/pearl-wedding.jpg', title:'Вместе навсегда', text:'Тридцать лет рука об руку с Александрой. Жемчуг рождается из песчинки, становясь драгоценностью. Так и ваш брак: год за годом вы создали нечто бесценное. Вместе — навсегда.' },
    { id:'screen-family', num:'16', img:'images/family.jpg', title:'Александра, Наташа, Игорь — твой мир', text:'Ты построил дом. Не из кирпича — из любви. Александра всегда рядом. Наташа и Игорь — твоя гордость. Внуки — твоя радость. А рыбалка — твоя отдушина. Это и есть счастье.' }
];

const sc = document.getElementById('stages-container');
stages.forEach((st, idx) => {
    const prevId = idx === 0 ? 'screen-greeting' : stages[idx-1].id;
    const nextId = idx === stages.length-1 ? 'screen-video' : stages[idx+1].id;
    const sec = document.createElement('section');
    sec.classList.add('screen'); sec.id = st.id;

    let photoHTML = '';
    if (st.isMultiPhoto) {
        // Фото внуков — несколько прямоугольных фото
        photoHTML = '<div class="multi-photos-container">';
        grandchildrenPhotos.forEach(photo => {
            photoHTML += `
                <div class="stage-photo-wrap multi-photo">
                    <img src="images/grandchildren/${photo}" alt="Внук">
                    <div class="photo-inner-frame"></div>
                </div>
            `;
        });
        photoHTML += '</div>';
    } else {
        photoHTML = `<div class="stage-photo-wrap"><img src="${st.img}" alt="${st.title}"><div class="photo-inner-frame"></div></div>`;
    }

    sec.innerHTML = `
        <div class="screen-content stage-content">
            <button class="circle-back-btn nav-back" data-back="${prevId}">&#10094;</button>
            <div class="stage-badge">${st.num}</div>
            ${photoHTML}
            <h3 class="stage-title">${st.title}</h3>
            <p class="stage-text">${st.text}</p>
            <div class="progress-lines">
                <div class="progress-line ${idx >= 0 ? 'filled' : ''}"></div>
                <div class="progress-line ${idx >= 6 ? 'filled' : ''}"></div>
                <div class="progress-line ${idx >= 12 ? 'filled' : ''}"></div>
            </div>
            <div class="stage-nav">
                <button class="arrow-btn nav-back" data-back="${prevId}">&#10094;</button>
                <span class="stage-counter">${idx+1} / ${stages.length}</span>
                <button class="arrow-btn next-btn" data-next="${nextId}">&#10095;</button>
            </div>
        </div>
    `;
    sc.appendChild(sec);
});

function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const t = document.getElementById(id);
    if (t) { t.classList.add('active'); t.scrollTop = 0; }
}

document.addEventListener('click', function(e) {
    const back = e.target.closest('.nav-back');
    if (back) { const id = back.getAttribute('data-back'); if (id) switchScreen(id); return; }
    const next = e.target.closest('.next-btn');
    if (next) { const id = next.getAttribute('data-next'); if (id) { switchScreen(id); if (id==='screen-final') { buildTree(); createLeaves(); } } return; }
});

document.getElementById('btn-activate').addEventListener('click', ()=>{
    switchScreen('screen-greeting');
    createParticles();
    setTimeout(()=>{ const b=document.getElementById('btn-continue'); b.style.opacity='1'; b.style.transform='translateY(0)'; }, 5500);
});
document.getElementById('btn-continue').addEventListener('click', ()=>switchScreen('screen-childhood'));

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

// ОДНО ВИДЕО — ИСПРАВЛЕНО
function setupVideo() {
    const v = document.getElementById('greeting-video');
    const b = document.getElementById('btn-video');
    const s = document.getElementById('skip-video');
    if(!v || !b || !s) return;
    b.style.display = 'none';
    function showBtn() {
        b.style.display = 'inline-block';
        b.style.opacity = '0';
        b.style.transform = 'translateY(15px)';
        requestAnimationFrame(()=>{
            b.style.transition = 'opacity .7s, transform .7s';
            b.style.opacity = '1';
            b.style.transform = 'translateY(0)';
        });
    }
    v.addEventListener('ended', showBtn);
    v.addEventListener('timeupdate', ()=>{
        if(v.duration > 0 && v.currentTime / v.duration >= 0.95) showBtn();
    });
    b.addEventListener('click', ()=>{
        v.pause();
        switchScreen('screen-final');
        buildTree();
        createLeaves();
    });
    s.addEventListener('click', ()=>{
        v.pause();
        switchScreen('screen-final');
        buildTree();
        createLeaves();
    });
}
setupVideo();

function buildTree() {
    const tw = document.getElementById('tree-wrapper');
    if(!tw) return;
    tw.innerHTML = `
        <div class="tree-trunk"></div>
        <div class="tree-branch left-1"></div><div class="tree-branch right-1"></div>
        <div class="tree-branch left-2"></div><div class="tree-branch right-2"></div>
        <div class="tree-branch left-3"></div><div class="tree-branch right-3"></div>
        <div class="tree-photo pos1"><img src="images/childhood.jpg" alt=""></div>
        <div class="tree-photo pos2"><img src="images/love.jpg" alt=""></div>
        <div class="tree-photo pos3"><img src="images/fishing.jpg" alt=""></div>
        <div class="tree-photo pos4"><img src="images/cousin.jpg" alt=""></div>
        <div class="tree-photo pos5"><img src="images/grandchildren/${grandchildrenPhotos[0]}" alt=""></div>
        <div class="tree-photo pos6"><img src="images/family.jpg" alt=""></div>
        <div class="tree-photo pos-center"><img src="images/relatives.jpg" alt=""></div>
    `;
}

function createLeaves() {
    const c = document.getElementById('tree-leaves'); if(!c) return; c.innerHTML = '';
    for(let i=0;i<30;i++){
        const l = document.createElement('div'); l.classList.add('leaf');
        l.style.left = (Math.random()*260-10)+'px';
        l.style.top = (-Math.random()*20)+'px';
        l.style.setProperty('--drift', (Math.random()-.5)*100+'px');
        l.style.setProperty('--spin', (Math.random()*360-180)+'deg');
        l.style.animationDuration = (2+Math.random()*4)+'s';
        l.style.animationDelay = Math.random()*2+'s';
        const s = 4+Math.random()*6;
        l.style.width = s+'px'; l.style.height = s+'px';
        c.appendChild(l);
    }
}

document.getElementById('btn-final-continue').addEventListener('click', function() {
    this.style.display = 'none';
    const msg = document.getElementById('egor-message');
    msg.classList.add('show');
    document.getElementById('btn-hug').style.display = 'inline-block';
});

document.getElementById('btn-hug').addEventListener('click', function(){
    createHearts();
    if(navigator.vibrate) navigator.vibrate([100,50,100,50,200]);
    const o = this.innerHTML;
    this.innerHTML = '<span>🤍 Крепко обнимаю!</span><span class="btn-shine"></span>';
    setTimeout(()=>{ this.innerHTML = o; }, 2500);
});

function createHearts() {
    const c = document.getElementById('hearts-container'); if(!c) return;
    const h = ['🤍','✨','💛','🌟','💝','🕊️','🎣'];
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

if('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{ navigator.serviceWorker.register('service-worker.js'); });
}
