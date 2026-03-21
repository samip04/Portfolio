let currentPhotoEffect='normal',
    profilePhoto=document.getElementById('profilePhoto'),
    photoBox=document.querySelector('.photo-box'),
    effectButtons=document.querySelectorAll('.effect-btn'),
    contactForm=document.getElementById('contactForm'),
    sections=document.querySelectorAll('.section');

// PHOTO EFFECT
function applyPhotoEffect(e){
    currentPhotoEffect=e;profilePhoto.style.filter='none';photoBox.style.boxShadow='';photoBox.style.borderColor='var(--neon-blue)';
    if(e==='normal')photoBox.style.boxShadow='0 0 50px var(--neon-blue),0 0 100px rgba(0,243,255,.5)';
    else if(e==='neon'){profilePhoto.style.filter='brightness(1.2) contrast(1.1) saturate(1.3)';photoBox.style.boxShadow='0 0 70px var(--neon-pink),0 0 140px rgba(255,0,255,.6),0 0 200px rgba(0,243,255,.3)';photoBox.style.borderColor='var(--neon-pink)';}
    else if(e==='grayscale'){profilePhoto.style.filter='grayscale(100%) brightness(1.1)';photoBox.style.boxShadow='0 0 40px var(--neon-green),0 0 80px rgba(0,255,157,.5)';photoBox.style.borderColor='var(--neon-green)';}
}

// EFFECT BUTTONS
effectButtons.forEach(b=>b.addEventListener('click',function(){
    effectButtons.forEach(btn=>btn.classList.remove('active'));this.classList.add('active');
    applyPhotoEffect(this.id.replace('Mode','').toLowerCase());
    showNotification(`${this.id.replace('Mode','').toUpperCase()} mode activated!`);
}));

// AUTO CYCLE
let autoCycleInterval=setInterval(()=>{const arr=['normal','neon','grayscale'],i=(arr.indexOf(currentPhotoEffect)+1)%3;document.getElementById(arr[i]+'Mode').click();},10000);

// TYPEWRITER
(function typeWriter(){const t=document.querySelector('.hero h1'),txt=t.textContent;t.textContent='';let i=0;(function type(){if(i<txt.length){t.textContent+=txt[i++];setTimeout(type,100);}})();})();

// SCROLL ANIMATIONS
const observer=new IntersectionObserver(e=>{e.forEach(ent=>{ent.isIntersecting&&ent.target.classList.add('visible');})},{threshold:.1,rootMargin:'0px 0px -50px 0px'});
sections.forEach(s=>observer.observe(s));

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));t&&window.scrollTo({top:t.offsetTop-80,behavior:'smooth'});}));

// CONTACT FORM + COUNTER
if(contactForm)contactForm.addEventListener('submit',e=>{e.preventDefault();
    const n=contactForm.querySelector('input[type="text"]').value,
          em=contactForm.querySelector('input[type="email"]').value,
          m=contactForm.querySelector('textarea')?.value||'';
    if(!n||!em||!m)return showNotification('Please fill all fields!','error');
    showNotification('✨ Message sent successfully! I will contact you soon. ✨','success');
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
document.querySelectorAll('a,button,.btn,.project-card,.skill-item').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('active'));el.addEventListener('mouseleave',()=>cursor.classList.remove('active'));});

// SCROLL PROGRESS
const progressBar=document.createElement('div');progressBar.className='scroll-progress';document.body.appendChild(progressBar);
window.addEventListener('scroll',()=>{const s=document.documentElement;progressBar.style.width=(s.scrollTop/(s.scrollHeight-s.clientHeight)*100)+'%';});

// PARTICLES BACKGROUND
const canvas=document.getElementById('particlesCanvas');if(canvas){const ctx=canvas.getContext('2d');let p=[];function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}resize();window.addEventListener('resize',resize);for(let i=0;i<80;i++){p.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,radius:Math.random()*2+1,dx:(Math.random()-.5)*.5,dy:(Math.random()-.5)*.5,color:`hsl(${Math.random()*60+180},100%,60%)`});}function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);p.forEach(pt=>{pt.x+=pt.dx;pt.y+=pt.dy;if(pt.x<0||pt.x>canvas.width)pt.dx*=-1;if(pt.y<0||pt.y>canvas.height)pt.dy*=-1;ctx.beginPath();ctx.arc(pt.x,pt.y,pt.radius,0,2*Math.PI);ctx.fillStyle=pt.color;ctx.fill();});requestAnimationFrame(animate);}animate();}

// 3D TILT
photoBox&&(photoBox.addEventListener('mousemove',e=>{const r=photoBox.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,cX=r.width/2,cY=r.height/2;photoBox.style.transform=`perspective(1000px) rotateX(${(y-cY)/10}deg) rotateY(${(cX-x)/10}deg)`;}),photoBox.addEventListener('mouseleave',()=>{photoBox.style.transform='perspective(1000px) rotateX(0deg) rotateY(0deg)';}));

// THEME TOGGLE
const themeToggle=document.getElementById('themeToggle');let darkMode=true;
themeToggle&&themeToggle.addEventListener('click',()=>{darkMode=!darkMode;document.body.classList.toggle('light',!darkMode);themeToggle.textContent=darkMode?'🌙':'☀️';showNotification(`${darkMode?'Dark':'Light'} mode activated!`);});

// TIME GREETING
function updateGreeting(){const g=document.getElementById('timeGreeting');if(g){const h=new Date().getHours();let t='';if(h<12)t='🌅 Good Morning';else if(h<17)t='☀️ Good Afternoon';else if(h<20)t='🌤️ Good Evening';else t='🌙 Good Night';g.innerHTML=`${t} 👋`;}}updateGreeting();setInterval(updateGreeting,3600000);

// FLOATING EMOJI
const floatingEmoji=document.getElementById('floatingEmoji');if(floatingEmoji){const emojis=['✨','⭐','🌟','💫','⚡','🔥','💜','💙'];let i=0;floatingEmoji.addEventListener('click',()=>{i=(i+1)%emojis.length;floatingEmoji.textContent=emojis[i];showNotification(`Magic ${emojis[i]} activated!`);});setInterval(()=>{floatingEmoji.style.transform='translateY(-10px) rotate(15deg)';setTimeout(()=>floatingEmoji.style.transform='translateY(0) rotate(0deg)',200);},3000);}

// SHORTCUTS
document.addEventListener('keydown',e=>{if(e.key>='1'&&e.key<='3'){const arr=['normal','neon','grayscale'];document.getElementById(arr[parseInt(e.key)-1]+'Mode').click();}if(e.code==='Space'){e.preventDefault();autoCycleEffects();}if(e.code==='Escape')document.getElementById('normalMode').click();if(e.code==='KeyR'){applyPhotoEffect('normal');showNotification('Reset to normal mode!');}if(e.code==='KeyC'){autoCycleEffects();showNotification('Manual cycle triggered!');}});

// NOTIFICATION STYLE
const notificationStyle=document.createElement('style');notificationStyle.textContent=`.notification{position:fixed;top:20px;right:20px;padding:1rem 2rem;background:rgba(0,243,255,.1);border:1px solid var(--neon-blue);border-radius:10px;color:var(--light);backdrop-filter:blur(10px);transform:translateY(-20px);opacity:0;transition:all .3s ease;z-index:10001;font-weight:500;box-shadow:var(--glow-blue)}`;document.head.appendChild(notificationStyle);

// INIT
window.addEventListener('load',()=>{applyPhotoEffect('normal');setTimeout(()=>showNotification('✨ Welcome to my neon portfolio! ✨','success'),1000);});
