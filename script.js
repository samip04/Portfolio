let currentPhotoEffect='normal',
    profilePhoto=document.getElementById('profilePhoto'),
    photoBox=document.querySelector('.photo-box'),
    contactForm=document.getElementById('contactForm'),
    sections=document.querySelectorAll('.section'),
    reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// PHOTO EFFECT
function applyPhotoEffect(e){
    currentPhotoEffect=e;profilePhoto.style.filter='none';photoBox.style.boxShadow='';photoBox.style.borderColor='var(--neon-blue)';
    if(e==='normal')photoBox.style.boxShadow='0 0 50px var(--neon-blue),0 0 100px rgba(0,243,255,.5)';
    else if(e==='neon'){profilePhoto.style.filter='brightness(1.2) contrast(1.1) saturate(1.3)';photoBox.style.boxShadow='0 0 70px var(--neon-pink),0 0 140px rgba(255,0,255,.6),0 0 200px rgba(0,243,255,.3)';photoBox.style.borderColor='var(--neon-pink)';}
    else if(e==='grayscale'){profilePhoto.style.filter='grayscale(100%) brightness(1.1)';photoBox.style.boxShadow='0 0 40px var(--neon-green),0 0 80px rgba(0,255,157,.5)';photoBox.style.borderColor='var(--neon-green)';}
}

// AUTO CYCLE (every 3 seconds)
function autoCycleEffects(){const arr=['normal','neon','grayscale'],i=(arr.indexOf(currentPhotoEffect)+1)%3;applyPhotoEffect(arr[i]);}
let autoCycleInterval=setInterval(autoCycleEffects,3000);

// TYPEWRITER
(function typeWriter(){const t=document.querySelector('.hero h1'),txt=t.textContent;t.textContent='';let i=0;(function type(){if(i<txt.length){t.textContent+=txt[i++];setTimeout(type,100);}})();})();

// ROTATING ROLE
const roleEl=document.querySelector('.hero h2');
if(roleEl){
    const roles=['Frontend Developer','Graphics Designer'];let r=0;
    setInterval(()=>{
        roleEl.style.opacity='0';
        setTimeout(()=>{r=(r+1)%roles.length;roleEl.textContent=roles[r];roleEl.style.opacity='1';},400);
    },3500);
}

// SCROLL ANIMATIONS
const observer=new IntersectionObserver(e=>{e.forEach(ent=>{ent.isIntersecting&&ent.target.classList.add('visible');})},{threshold:.1,rootMargin:'0px 0px -50px 0px'});
sections.forEach(s=>observer.observe(s));

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));t&&window.scrollTo({top:t.offsetTop-80,behavior:'smooth'});}));

// MOBILE MENU
const menuToggle=document.getElementById('menuToggle'),navLinks=document.getElementById('navLinks');
menuToggle&&menuToggle.addEventListener('click',()=>navLinks.classList.toggle('open'));
navLinks&&navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

// ACTIVE NAV LINK ON SCROLL
const spyIds=['home','skills','projects','cv','contact'];
function updateActiveLink(){
    let current='home';
    spyIds.forEach(id=>{const el=document.getElementById(id);if(el&&el.offsetTop-120<=window.scrollY)current=id;});
    document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
}
window.addEventListener('scroll',updateActiveLink);updateActiveLink();

// BACK TO TOP
const backToTop=document.getElementById('backToTop');
if(backToTop){
    window.addEventListener('scroll',()=>backToTop.classList.toggle('show',window.scrollY>400));
    backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}

// CV TABS
const cvTabs=document.querySelectorAll('.cv-tab'),cvPanels=document.querySelectorAll('.cv-panel');
cvTabs.forEach(tab=>tab.addEventListener('click',()=>{
    cvTabs.forEach(t=>t.classList.remove('active'));
    cvPanels.forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
}));

// CV STATS COUNT-UP
const statNums=document.querySelectorAll('.cv-stat-num');
function setStatsFinal(){statNums.forEach(n=>n.textContent=n.dataset.count);}
const statsBox=document.querySelector('.cv-stats');
if(statsBox){
    const statsObserver=new IntersectionObserver(entries=>{
        entries.forEach(ent=>{
            if(!ent.isIntersecting)return;
            statNums.forEach(n=>{
                const target=parseInt(n.dataset.count),steps=20;let step=0;
                const timer=setInterval(()=>{step++;n.textContent=Math.round(target*step/steps);if(step>=steps)clearInterval(timer);},60);
            });
            statsObserver.disconnect();
        });
    },{threshold:.5});
    statsObserver.observe(statsBox);
}

// DOWNLOAD CV (PRINT / SAVE AS PDF)
const originalTitle=document.title;
window.addEventListener('beforeprint',()=>{document.title='Samip Sapkota Portfolio';setStatsFinal();});
window.addEventListener('afterprint',()=>{document.title=originalTitle;});
const downloadCV=document.getElementById('downloadCV');
downloadCV&&downloadCV.addEventListener('click',()=>{showNotification('Choose "Save as PDF" in the print window 📄');setTimeout(()=>window.print(),600);});

// CLICK TO COPY (EMAIL)
document.querySelectorAll('[data-copy]').forEach(el=>el.addEventListener('click',()=>{
    const text=el.dataset.copy;
    if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(()=>showNotification('Copied: '+text,'success')).catch(()=>showNotification('Could not copy','error'));
    }else{showNotification('Copy not supported in this browser','error');}
}));

// LIVE LOCAL TIME (KATHMANDU)
const localTimeEl=document.getElementById('localTime');
if(localTimeEl){
    function updateLocalTime(){
        try{localTimeEl.textContent=new Date().toLocaleTimeString('en-US',{timeZone:'Asia/Kathmandu',hour:'2-digit',minute:'2-digit',second:'2-digit'});}
        catch(err){localTimeEl.textContent='--:--:--';}
    }
    updateLocalTime();setInterval(updateLocalTime,1000);
}

// CONTACT FORM (OPENS EMAIL APP WITH MESSAGE READY) + COUNTER
if(contactForm)contactForm.addEventListener('submit',e=>{e.preventDefault();
    const n=contactForm.querySelector('input[type="text"]').value.trim(),
          em=contactForm.querySelector('input[type="email"]').value.trim(),
          m=(contactForm.querySelector('textarea')?.value||'').trim();
    if(!n||!em||!m)return showNotification('Please fill all fields!','error');
    const subject=encodeURIComponent('Portfolio message from '+n);
    const body=encodeURIComponent(m+'\n\nFrom: '+n+' ('+em+')');
    showNotification('✨ Opening your email app to send the message ✨','success');
    window.location.href='mailto:samipaaa63@gmail.com?subject='+subject+'&body='+body;
    contactForm.reset();
    document.getElementById('nameCounter')&&(document.getElementById('nameCounter').textContent='0/50');
    document.getElementById('msgCounter')&&(document.getElementById('msgCounter').textContent='0/500');
});

['nameInput','messageInput'].forEach(id=>{const el=document.getElementById(id),c=document.getElementById(id==='nameInput'?'nameCounter':'msgCounter');el&&c&&el.addEventListener('input',()=>{c.textContent=`${el.value.length}/${id==='nameInput'?50:500}`;c.style.color=el.value.length>=(id==='nameInput'?50:500)?'#ff00ff':'rgba(255,255,255,.5)';});});

// NOTIFICATION
function showNotification(msg,type='info'){
    document.querySelector('.notification')?.remove();
    const n=document.createElement('div');n.className='notification';n.textContent=msg;
    if(type==='success')n.style.cssText='background:rgba(0,255,157,.1);border:1px solid var(--neon-green);box-shadow:0 0 20px var(--neon-green);';
    else if(type==='error')n.style.cssText='background:rgba(255,85,85,.1);border:1px solid #ff5555;box-shadow:0 0 20px #ff5555;';
    document.body.appendChild(n);setTimeout(()=>{n.style.opacity='1';n.style.transform='translateY(0)';},10);setTimeout(()=>{n.style.opacity='0';n.style.transform='translateY(-20px)';setTimeout(()=>n.remove(),300);},3000);
}

// IMAGE FALLBACK
profilePhoto&&(profilePhoto.onerror=()=>{profilePhoto.src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&h=500&fit=crop';showNotification('Profile image not found. Using placeholder.','error');});

// HOVER EFFECTS
document.querySelectorAll('.project-card').forEach(c=>{c.addEventListener('mouseenter',()=>c.style.transform='translateY(-15px) scale(1.02)');c.addEventListener('mouseleave',()=>c.style.transform='translateY(-10px) scale(1)');});
document.querySelectorAll('.skill-item').forEach(s=>{s.addEventListener('mouseenter',()=>s.style.transform='translateY(-10px) rotate(3deg)');s.addEventListener('mouseleave',()=>s.style.transform='translateY(-5px) rotate(0)');});
document.querySelectorAll('.btn').forEach(b=>b.addEventListener('click',()=>{b.style.transform='scale(0.95)';setTimeout(()=>b.style.transform='',200);}))

// NAV SCROLL
const nav=document.querySelector('.nav');window.addEventListener('scroll',()=>{if(window.scrollY>100){nav.style.padding='0.8rem 5%';nav.style.background='rgba(10,10,10,.98)';nav.style.boxShadow='0 5px 30px rgba(0,243,255,.15)';}else{nav.style.padding='1.2rem 5%';nav.style.background='rgba(10,10,10,.95)';nav.style.boxShadow='none';}})

// CURSOR
const cursor=document.createElement('div');cursor.className='cursor';document.body.appendChild(cursor);
document.addEventListener('mousemove',e=>{cursor.style.left=e.clientX-10+'px';cursor.style.top=e.clientY-10+'px';});
document.querySelectorAll('a,button,.btn,.project-card,.skill-item,.contact-item').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('active'));el.addEventListener('mouseleave',()=>cursor.classList.remove('active'));});

// NEON CURSOR TRAIL
if(!reduceMotion){
    let lastTrail=0,trailFlip=false;
    document.addEventListener('mousemove',e=>{
        const now=Date.now();if(now-lastTrail<40)return;lastTrail=now;
        const d=document.createElement('div');d.className='trail-dot';
        trailFlip=!trailFlip;
        const color=trailFlip?'#00f3ff':'#ff00ff';
        d.style.cssText=`left:${e.clientX-4}px;top:${e.clientY-4}px;background:${color};box-shadow:0 0 10px ${color}`;
        document.body.appendChild(d);setTimeout(()=>d.remove(),700);
    });
}

// CONFETTI ON PHOTO CLICK
photoBox&&photoBox.addEventListener('click',e=>{
    showNotification('🎉 Thanks for visiting!','success');
    if(reduceMotion)return;
    const colors=['#00f3ff','#ff00ff','#00ff9d','#ffd700','#ffffff'];
    for(let i=0;i<40;i++){
        const c=document.createElement('div');c.className='confetti-piece';
        c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';c.style.background=colors[i%colors.length];
        document.body.appendChild(c);
        const dx=(Math.random()-.5)*400,dy=Math.random()*-250-50,rot=Math.random()*720;
        const anim=c.animate([
            {transform:'translate(0,0) rotate(0deg)',opacity:1},
            {transform:`translate(${dx}px,${dy}px) rotate(${rot/2}deg)`,opacity:1,offset:.5},
            {transform:`translate(${dx*1.2}px,${dy+450}px) rotate(${rot}deg)`,opacity:0}
        ],{duration:1400+Math.random()*600,easing:'ease-out'});
        anim.onfinish=()=>c.remove();
    }
});

// SCROLL PROGRESS
const progressBar=document.createElement('div');progressBar.className='scroll-progress';document.body.appendChild(progressBar);
window.addEventListener('scroll',()=>{const s=document.documentElement;progressBar.style.width=(s.scrollTop/(s.scrollHeight-s.clientHeight)*100)+'%';});

// PARTICLES BACKGROUND
const canvas=document.getElementById('particlesCanvas');if(canvas){const ctx=canvas.getContext('2d');let p=[];function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}resize();window.addEventListener('resize',resize);for(let i=0;i<80;i++){p.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,radius:Math.random()*2+1,dx:(Math.random()-.5)*.5,dy:(Math.random()-.5)*.5,color:`hsl(${Math.random()*60+180},100%,60%)`});}function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);p.forEach(pt=>{pt.x+=pt.dx;pt.y+=pt.dy;if(pt.x<0||pt.x>canvas.width)pt.dx*=-1;if(pt.y<0||pt.y>canvas.height)pt.dy*=-1;ctx.beginPath();ctx.arc(pt.x,pt.y,pt.radius,0,2*Math.PI);ctx.fillStyle=pt.color;ctx.fill();});requestAnimationFrame(animate);}animate();}

// 3D TILT
photoBox&&(photoBox.addEventListener('mousemove',e=>{const r=photoBox.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,cX=r.width/2,cY=r.height/2;photoBox.style.transform=`perspective(1000px) rotateX(${(y-cY)/10}deg) rotateY(${(cX-x)/10}deg)`;}),photoBox.addEventListener('mouseleave',()=>{photoBox.style.transform='perspective(1000px) rotateX(0deg) rotateY(0deg)';}));

// THEME TOGGLE (REMEMBERS YOUR CHOICE)
const themeToggle=document.getElementById('themeToggle');let darkMode=true;
function applyTheme(){document.body.classList.toggle('light',!darkMode);themeToggle&&(themeToggle.textContent=darkMode?'🌙':'☀️');}
try{if(localStorage.getItem('theme')==='light'){darkMode=false;applyTheme();}}catch(err){}
themeToggle&&themeToggle.addEventListener('click',()=>{
    darkMode=!darkMode;applyTheme();
    try{localStorage.setItem('theme',darkMode?'dark':'light');}catch(err){}
    showNotification(`${darkMode?'Dark':'Light'} mode activated!`);
});

// TIME GREETING
function updateGreeting(){const g=document.getElementById('timeGreeting');if(g){const h=new Date().getHours();let t='';if(h<12)t='🌅 Good Morning';else if(h<17)t='☀️ Good Afternoon';else if(h<20)t='🌤️ Good Evening';else t='🌙 Good Night';g.innerHTML=`${t} 👋`;}}updateGreeting();setInterval(updateGreeting,3600000);

// FLOATING EMOJI
const floatingEmoji=document.getElementById('floatingEmoji');if(floatingEmoji){const emojis=['✨','⭐','🌟','💫','⚡','🔥','💜','💙'];let i=0;floatingEmoji.addEventListener('click',()=>{i=(i+1)%emojis.length;floatingEmoji.textContent=emojis[i];showNotification(`Magic ${emojis[i]} activated!`);});setInterval(()=>{floatingEmoji.style.transform='translateY(-10px) rotate(15deg)';setTimeout(()=>floatingEmoji.style.transform='translateY(0) rotate(0deg)',200);},3000);}

// SHORTCUTS (IGNORED WHILE TYPING IN FORM FIELDS)
document.addEventListener('keydown',e=>{
    const tag=(e.target.tagName||'').toUpperCase();
    if(tag==='INPUT'||tag==='TEXTAREA')return;
    if(e.key>='1'&&e.key<='3'){const arr=['normal','neon','grayscale'],names=['NORMAL','NEON','GRAY'],k=parseInt(e.key)-1;applyPhotoEffect(arr[k]);showNotification(`${names[k]} mode activated!`);}
    if(e.code==='Space'){e.preventDefault();autoCycleEffects();}
    if(e.code==='Escape')applyPhotoEffect('normal');
    if(e.code==='KeyR'){applyPhotoEffect('normal');showNotification('Reset to normal mode!');}
    if(e.code==='KeyC'){autoCycleEffects();showNotification('Manual cycle triggered!');}
});

// FOOTER YEAR
const yearEl=document.getElementById('year');yearEl&&(yearEl.textContent=new Date().getFullYear());

// NOTIFICATION STYLE
const notificationStyle=document.createElement('style');notificationStyle.textContent=`.notification{position:fixed;top:20px;right:20px;padding:1rem 2rem;background:rgba(0,243,255,.1);border:1px solid var(--neon-blue);border-radius:10px;color:var(--light);backdrop-filter:blur(10px);transform:translateY(-20px);opacity:0;transition:all .3s ease;z-index:20001;font-weight:500;box-shadow:var(--glow-blue)}`;document.head.appendChild(notificationStyle);

// INIT
window.addEventListener('load',()=>{
    applyPhotoEffect('normal');
    const pre=document.getElementById('preloader');
    pre&&setTimeout(()=>{pre.classList.add('hide');setTimeout(()=>pre.remove(),600);},900);
    setTimeout(()=>showNotification('✨ Welcome to my portfolio! ✨','success'),1600);
});
