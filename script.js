


<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9889817899844523"
     crossorigin="anonymous"></script>

       

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NBGSM7V7DH"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NBGSM7V7DH');
</script>
const profilePhoto=document.getElementById('profilePhoto'),
      photoCard=document.getElementById('photoCard'),
      photoStage=document.getElementById('photoStage'),
      contactForm=document.getElementById('contactForm'),
      reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      canHover=window.matchMedia&&window.matchMedia('(hover: hover)').matches;

// ---------- TOAST NOTIFICATION ----------
function showNotification(msg,type='info'){
    document.querySelector('.toast')?.remove();
    const t=document.createElement('div');t.className='toast '+type;t.textContent=msg;
    document.body.appendChild(t);
    setTimeout(()=>{t.style.opacity='1';t.style.transform='translate(-50%,0)';},10);
    setTimeout(()=>{t.style.opacity='0';t.style.transform='translate(-50%,20px)';setTimeout(()=>t.remove(),300);},3200);
}

// ---------- PHOTO LOOK AUTO-SWITCH (every 3 seconds) ----------
let look=0;
setInterval(()=>{
    look=(look+1)%3;
    photoCard.classList.remove('look-0','look-1','look-2');
    photoCard.classList.add('look-'+look);
},3000);

// ---------- 3D TILT ON THE PHOTO ----------
if(photoStage&&canHover&&!reduceMotion){
    photoStage.addEventListener('mousemove',e=>{
        const r=photoStage.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
        photoCard.style.transform=`rotateX(${(.5-py)*18}deg) rotateY(${(px-.5)*22}deg)`;
    });
    photoStage.addEventListener('mouseleave',()=>{photoCard.style.transform='';});
}

// ---------- 3D TILT ON CARDS ----------
if(canHover&&!reduceMotion){
    document.querySelectorAll('[data-tilt]').forEach(el=>{
        el.addEventListener('mousemove',e=>{
            const r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
            el.style.transform=`perspective(900px) rotateX(${(.5-py)*12}deg) rotateY(${(px-.5)*14}deg) translateZ(8px)`;
            el.style.setProperty('--mx',(px*100)+'%');
            el.style.setProperty('--my',(py*100)+'%');
        });
        el.addEventListener('mouseleave',()=>{el.style.transform='';});
    });
}

// ---------- BACKGROUND PARALLAX ----------
const blobs=document.getElementById('bgBlobs');
if(blobs&&canHover&&!reduceMotion){
    document.addEventListener('mousemove',e=>{
        const dx=(e.clientX/window.innerWidth-.5)*40,dy=(e.clientY/window.innerHeight-.5)*40;
        blobs.style.transform=`translate(${dx}px,${dy}px)`;
    });
}

// ---------- TYPEWRITER NAME ----------
(function typeWriter(){const t=document.querySelector('.hero h1'),txt=t.textContent;t.textContent='';let i=0;(function type(){if(i<txt.length){t.textContent+=txt[i++];setTimeout(type,100);}})();})();

// ---------- ROTATING ROLE ----------
const roleEl=document.querySelector('.hero h2');
if(roleEl){
    const roles=['Frontend Developer','Graphics Designer'];let r=0;
    setInterval(()=>{
        roleEl.style.opacity='0';
        setTimeout(()=>{r=(r+1)%roles.length;roleEl.textContent=roles[r];roleEl.style.opacity='1';},400);
    },3500);
}

// ---------- SCROLL REVEAL ----------
const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(ent=>{ent.isIntersecting&&ent.target.classList.add('in');});
},{threshold:.1,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal').forEach(s=>revealObserver.observe(s));

// ---------- SMOOTH SCROLL (ALSO THE SAMIP LOGO -> HOME) ----------
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
    e.preventDefault();
    const t=document.querySelector(a.getAttribute('href'));
    t&&window.scrollTo({top:t.offsetTop-80,behavior:'smooth'});
}));

// ---------- MOBILE MENU ----------
const menuToggle=document.getElementById('menuToggle'),navLinks=document.getElementById('navLinks');
menuToggle&&menuToggle.addEventListener('click',()=>navLinks.classList.toggle('open'));
navLinks&&navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

// ---------- ACTIVE NAV LINK ----------
const spyIds=['home','about','skills','projects','cv','contact'];
function updateActiveLink(){
    let current='home';
    spyIds.forEach(id=>{const el=document.getElementById(id);if(el&&el.offsetTop-140<=window.scrollY)current=id;});
    document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
}

// ---------- SCROLL PROGRESS, NAV, BACK-TO-TOP ----------
const progressBar=document.getElementById('scrollProgress'),nav=document.querySelector('.nav'),backToTop=document.getElementById('backToTop');
window.addEventListener('scroll',()=>{
    const s=document.documentElement;
    progressBar.style.width=(s.scrollTop/(s.scrollHeight-s.clientHeight)*100)+'%';
    nav.style.padding=window.scrollY>100?'.7rem 5%':'1rem 5%';
    nav.style.boxShadow=window.scrollY>100?'0 8px 30px rgba(29,27,46,.12)':'none';
    backToTop.classList.toggle('show',window.scrollY>400);
    updateActiveLink();
});
updateActiveLink();
backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// ---------- 3D PROJECT CAROUSEL ----------
const ring=document.getElementById('ring');
if(ring){
    const slides=[...ring.children],n=slides.length,step=360/n,dotsBox=document.getElementById('carDots'),carousel=document.getElementById('carousel');
    let cur=0,R=0,timer=null,dragged=false,startX=0,down=false;
    const frontIndex=()=>((cur%n)+n)%n;
    slides.forEach((s,i)=>{
        const d=document.createElement('button');d.className='car-dot';d.setAttribute('aria-label','Project '+(i+1));
        d.addEventListener('click',()=>{go(i);restart();});dotsBox.appendChild(d);
    });
    const dots=[...dotsBox.children];
    function update(){
        ring.style.transform=`translateZ(${-R}px) rotateY(${-cur*step}deg)`;
        const f=frontIndex();
        slides.forEach((s,i)=>s.classList.toggle('front',i===f));
        dots.forEach((d,i)=>d.classList.toggle('active',i===f));
    }
    function layout(){
        const w=ring.offsetWidth;
        R=Math.round((w/2)/Math.tan(Math.PI/n))+Math.max(110,w*.55);
        slides.forEach((s,i)=>{s.style.transform=`rotateY(${i*step}deg) translateZ(${R}px)`;});
        update();
    }
    function move(d){cur+=d;update();}
    function go(i){let diff=((i-cur)%n+n)%n;if(diff>n/2)diff-=n;cur+=diff;update();}
    function restart(){clearInterval(timer);if(!reduceMotion)timer=setInterval(()=>move(1),4500);}
    document.getElementById('carPrev').addEventListener('click',()=>{move(-1);restart();});
    document.getElementById('carNext').addEventListener('click',()=>{move(1);restart();});
    slides.forEach((s,i)=>s.addEventListener('click',e=>{
        if(dragged){e.preventDefault();return;}
        if(i!==frontIndex()){e.preventDefault();go(i);restart();}
    }));
    carousel.addEventListener('pointerdown',e=>{down=true;startX=e.clientX;dragged=false;});
    window.addEventListener('pointerup',e=>{
        if(!down)return;down=false;
        const dx=e.clientX-startX;
        if(Math.abs(dx)>40){dragged=true;move(dx<0?1:-1);restart();setTimeout(()=>{dragged=false;},80);}
    });
    carousel.addEventListener('mouseenter',()=>clearInterval(timer));
    carousel.addEventListener('mouseleave',restart);
    window.addEventListener('resize',layout);
    layout();restart();
}

// ---------- CV TABS ----------
const cvTabs=document.querySelectorAll('.cv-tab'),cvPanels=document.querySelectorAll('.cv-panel');
cvTabs.forEach(tab=>tab.addEventListener('click',()=>{
    cvTabs.forEach(t=>t.classList.remove('active'));
    cvPanels.forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
}));

// ---------- CV STATS COUNT-UP ----------
const statNums=document.querySelectorAll('.cv-stat-num');
function setStatsFinal(){statNums.forEach(n=>n.textContent=n.dataset.count);}
const statsBox=document.querySelector('.cv-stats');
if(statsBox){
    const statsObserver=new IntersectionObserver(entries=>{
        entries.forEach(ent=>{
            if(!ent.isIntersecting)return;
            statNums.forEach(n=>{
                const target=parseInt(n.dataset.count),steps=20;let stp=0;
                const timer=setInterval(()=>{stp++;n.textContent=Math.round(target*stp/steps);if(stp>=steps)clearInterval(timer);},60);
            });
            statsObserver.disconnect();
        });
    },{threshold:.5});
    statsObserver.observe(statsBox);
}

// ---------- DOWNLOAD CV (PRINT / SAVE AS PDF) ----------
const originalTitle=document.title;
window.addEventListener('beforeprint',()=>{document.title='Samip Sapkota Portfolio';setStatsFinal();});
window.addEventListener('afterprint',()=>{document.title=originalTitle;});
const downloadCV=document.getElementById('downloadCV');
downloadCV&&downloadCV.addEventListener('click',()=>{showNotification('Choose "Save as PDF" in the print window 📄');setTimeout(()=>window.print(),600);});

// ---------- CLICK TO COPY (EMAIL) ----------
document.querySelectorAll('[data-copy]').forEach(el=>el.addEventListener('click',()=>{
    const text=el.dataset.copy;
    if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(()=>showNotification('Copied: '+text,'success')).catch(()=>showNotification('Could not copy','error'));
    }else{showNotification('Copy not supported in this browser','error');}
}));

// ---------- LIVE LOCAL TIME (KATHMANDU) ----------
const localTimeEl=document.getElementById('localTime');
if(localTimeEl){
    const updateLocalTime=()=>{
        try{localTimeEl.textContent=new Date().toLocaleTimeString('en-US',{timeZone:'Asia/Kathmandu',hour:'2-digit',minute:'2-digit',second:'2-digit'});}
        catch(err){localTimeEl.textContent='--:--:--';}
    };
    updateLocalTime();setInterval(updateLocalTime,1000);
}

// ---------- TIME GREETING ----------
function updateGreeting(){
    const g=document.getElementById('timeGreeting');
    if(!g)return;
    const h=new Date().getHours();let t='';
    if(h<12)t='🌅 Good Morning';else if(h<17)t='☀️ Good Afternoon';else if(h<20)t='🌤️ Good Evening';else t='🌙 Good Night';
    g.textContent=t;
}
updateGreeting();setInterval(updateGreeting,3600000);

// ---------- CONTACT FORM (DELIVERED TO YOUR EMAIL VIA FORMSUBMIT) ----------
// After activating, you can replace this with the random alias FormSubmit gives you
const RECEIVER_EMAIL='samipaaa63@gmail.com';
['nameInput','messageInput'].forEach(id=>{
    const el=document.getElementById(id),c=document.getElementById(id==='nameInput'?'nameCounter':'msgCounter'),max=id==='nameInput'?50:500;
    el&&c&&el.addEventListener('input',()=>{c.textContent=`${el.value.length}/${max}`;c.style.color=el.value.length>=max?'#ff6b57':'';});
});

if(contactForm){
    const sendBtn=document.getElementById('sendBtn');
    contactForm.addEventListener('submit',async e=>{
        e.preventDefault();
        const name=document.getElementById('nameInput').value.trim(),
              email=document.getElementById('emailInput').value.trim(),
              message=document.getElementById('messageInput').value.trim(),
              honey=document.getElementById('honeyInput').value;
        if(!name||!email||!message)return showNotification('Please fill all fields!','error');
        if(honey)return; // bots fill the hidden field

        const label=sendBtn.textContent;
        sendBtn.disabled=true;sendBtn.textContent='SENDING...';
        try{
            const res=await fetch('https://formsubmit.co/ajax/'+RECEIVER_EMAIL,{
                method:'POST',
                headers:{'Content-Type':'application/json','Accept':'application/json'},
                body:JSON.stringify({name,email,message,_subject:'New portfolio message from '+name,_template:'table',_captcha:'false'})
            });
            const data=await res.json().catch(()=>({}));
            if(res.ok&&(data.success===true||data.success==='true')){
                showNotification('✨ Message sent! I will reply soon. ✨','success');
                contactForm.reset();
                document.getElementById('nameCounter').textContent='0/50';
                document.getElementById('msgCounter').textContent='0/500';
            }else{
                console.warn('FormSubmit response:',data);
                throw new Error('Not delivered');
            }
        }catch(err){
            showNotification('Could not send. Please try again or WhatsApp me.','error');
        }finally{
            sendBtn.disabled=false;sendBtn.textContent=label;
        }
    });
}

// ---------- IMAGE FALLBACK ----------
profilePhoto&&(profilePhoto.onerror=()=>{profilePhoto.src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&h=500&fit=crop';showNotification('Profile image not found. Using placeholder.','error');});

// ---------- CONFETTI ON PHOTO CLICK ----------
const photoFrame=document.querySelector('.photo-frame');
photoFrame&&photoFrame.addEventListener('click',e=>{
    showNotification('🎉 Thanks for visiting!','success');
    if(reduceMotion)return;
    const colors=['#5b5bd6','#ff6b57','#27b996','#ffc24b','#e0559f'];
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

// ---------- THEME TOGGLE (DARK DEFAULT, REMEMBERS CHOICE) ----------
const themeToggle=document.getElementById('themeToggle');
function syncThemeIcon(){
    const dark=document.documentElement.classList.contains('dark');
    themeToggle.innerHTML=dark?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#12131b':'#f3eee7');
}
syncThemeIcon();
themeToggle.addEventListener('click',()=>{
    const dark=document.documentElement.classList.toggle('dark');
    try{localStorage.setItem('theme-v2',dark?'dark':'light');}catch(err){}
    syncThemeIcon();
    showNotification(dark?'Dark mode activated!':'Light mode activated!');
});

// ---------- LIVE GITHUB STATS ----------
fetch('https://api.github.com/users/samip04')
    .then(r=>r.ok?r.json():Promise.reject())
    .then(d=>{
        document.getElementById('ghRepos').textContent=d.public_repos;
        document.getElementById('ghFollowers').textContent=d.followers;
        document.getElementById('ghStats').hidden=false;
    })
    .catch(()=>{});

// ---------- COMMAND PALETTE (Ctrl+K) ----------
const palette=document.getElementById('palette'),pInput=document.getElementById('paletteInput'),pList=document.getElementById('paletteList'),paletteBtn=document.getElementById('paletteBtn');
const goTo=id=>()=>{const t=document.getElementById(id);t&&window.scrollTo({top:t.offsetTop-80,behavior:'smooth'});};
const commands=[
    {label:'Go to Home',icon:'fas fa-house',run:goTo('home')},
    {label:'Go to About',icon:'fas fa-user',run:goTo('about')},
    {label:'Go to Skills',icon:'fas fa-code',run:goTo('skills')},
    {label:'Go to Projects',icon:'fas fa-folder-open',run:goTo('projects')},
    {label:'Go to CV',icon:'fas fa-file-lines',run:goTo('cv')},
    {label:'Go to Contact',icon:'fas fa-envelope',run:goTo('contact')},
    {label:'Download CV (PDF)',icon:'fas fa-download',run:()=>downloadCV.click()},
    {label:'Open Gesture Control Camera',icon:'fas fa-hand',run:()=>window.open('https://samip04.github.io/GestureCam-Pro-/','_blank')},
    {label:'Open Weather App',icon:'fas fa-cloud-sun',run:()=>window.open('https://samip04.github.io/Weather-App/','_blank')},
    {label:'Open GitHub',icon:'fab fa-github',run:()=>window.open('https://github.com/samip04','_blank')},
    {label:'Copy my email',icon:'fas fa-copy',run:()=>document.querySelector('[data-copy]').click()},
    {label:'Toggle dark / light theme',icon:'fas fa-circle-half-stroke',run:()=>themeToggle.click()}
];
let sel=0,shown=commands;
function renderPalette(){
    const q=pInput.value.trim().toLowerCase();
    shown=commands.filter(c=>c.label.toLowerCase().includes(q));
    if(sel>=shown.length)sel=0;
    pList.innerHTML=shown.length?shown.map((c,i)=>`<li data-i="${i}" class="${i===sel?'sel':''}"><i class="${c.icon}"></i>${c.label}</li>`).join(''):'<li>No results</li>';
}
function openPalette(){palette.hidden=false;pInput.value='';sel=0;renderPalette();pInput.focus();}
function closePalette(){palette.hidden=true;}
function runCommand(i){const c=shown[i];if(!c)return;closePalette();setTimeout(c.run,50);}
pInput.addEventListener('input',()=>{sel=0;renderPalette();});
pList.addEventListener('click',e=>{const li=e.target.closest('li[data-i]');li&&runCommand(+li.dataset.i);});
palette.addEventListener('click',e=>{if(e.target===palette)closePalette();});
pInput.addEventListener('keydown',e=>{
    const n=Math.max(shown.length,1);
    if(e.key==='ArrowDown'){e.preventDefault();sel=(sel+1)%n;renderPalette();}
    else if(e.key==='ArrowUp'){e.preventDefault();sel=(sel-1+n)%n;renderPalette();}
    else if(e.key==='Enter'){e.preventDefault();runCommand(sel);}
    else if(e.key==='Escape')closePalette();
});
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();palette.hidden?openPalette():closePalette();}});
paletteBtn.addEventListener('click',openPalette);

// ---------- FOOTER YEAR ----------
const yearEl=document.getElementById('year');yearEl&&(yearEl.textContent=new Date().getFullYear());

// ---------- INIT ----------
window.addEventListener('load',()=>{
    const pre=document.getElementById('preloader');
    pre&&setTimeout(()=>{pre.classList.add('hide');setTimeout(()=>pre.remove(),600);},900);
    setTimeout(()=>showNotification('✨ Welcome to my portfolio! ✨','success'),1600);
});
