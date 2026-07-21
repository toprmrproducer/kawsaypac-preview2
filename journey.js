(() => {
  'use strict';
  const hero=document.querySelector('.journey-scroll');
  if(!hero)return;
  const sticky=hero.querySelector('.journey-sticky');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile=matchMedia('(max-width: 720px)').matches;
  if(reduce||mobile||!window.gsap||!window.ScrollTrigger){hero.classList.add('journey-static');return}

  gsap.registerPlugin(ScrollTrigger);
  const q=s=>hero.querySelector(s);
  const brand=q('.journey-brand');
  const summit=q('.journey-summit'),sky=q('.journey-sky'),peak=q('.journey-peak');
  const landscape=q('.journey-landscape'),landscapeMaster=q('.journey-landscape-master');
  const ridgeWide=q('.journey-ridge-wide'),ridgeLeft=q('.journey-ridge-left'),ridgeRight=q('.journey-ridge-right');
  const mountain=q('.journey-mountain'),river=q('.journey-river'),clouds=q('.journey-clouds'),mist=q('.journey-mist');
  const jungle=q('.journey-jungle'),jungleMaster=q('.journey-jungle-master');
  const canopy=q('.journey-canopy'),philodendron=q('.journey-philodendron'),bromeliads=q('.journey-bromeliads'),orchid=q('.journey-orchid');
  const forestFrame=q('.journey-forest-frame');
  const summitBeat=q('.journey-beat-forest'),waterBeat=q('.journey-beat-water'),finalCopy=q('.journey-final'),progress=q('.journey-progress span');
  const finalPieces=finalCopy.querySelectorAll('.eyebrow,h2,p,.hero-actions,.journey-trust');

  // GPU-lock every animated layer for the whole scrub (prevents translateZ strip flicker).
  const allLayers=[summit,sky,peak,landscape,landscapeMaster,ridgeWide,ridgeLeft,ridgeRight,mountain,river,clouds,mist,jungle,jungleMaster,canopy,philodendron,bromeliads,orchid,forestFrame,brand,summitBeat,waterBeat,finalCopy];
  gsap.set(allLayers,{force3D:true,willChange:'transform,opacity'});

  /* ============ REVERSED JOURNEY: Cotopaxi summit -> valley -> living forest ============ */
  gsap.set([summitBeat,waterBeat,finalCopy],{autoAlpha:0,y:32});
  gsap.set(finalPieces,{autoAlpha:0,y:16});
  // Opening state: we are AT the peak. Sky full, peak close and large.
  gsap.set(summit,{opacity:1});
  gsap.set(sky,{scale:1.12,yPercent:2});
  gsap.set(peak,{scale:1.55,yPercent:14,transformOrigin:'50% 78%'});
  // Valley waits below, hidden.
  gsap.set(landscape,{opacity:0,scale:1.1});
  gsap.set(landscapeMaster,{scale:1.16,yPercent:4});
  gsap.set([ridgeWide,ridgeLeft,ridgeRight],{yPercent:34,autoAlpha:0});
  gsap.set(mountain,{xPercent:-50,yPercent:38,autoAlpha:0,scale:.92});
  gsap.set(river,{yPercent:52,autoAlpha:0,scale:.88});
  gsap.set(clouds,{xPercent:-7,autoAlpha:0});
  gsap.set(mist,{xPercent:6,autoAlpha:0});
  // Jungle waits dispersed off-frame: sprites assemble at the end (never a flat zoom-out).
  gsap.set(jungle,{opacity:0});
  gsap.set(jungleMaster,{opacity:0,scale:1.26});
  gsap.set(forestFrame,{yPercent:10,scale:1.5,autoAlpha:0});
  gsap.set(canopy,{xPercent:36,yPercent:22,scale:1.34,autoAlpha:0});
  gsap.set(philodendron,{xPercent:-36,yPercent:-20,scale:1.32,autoAlpha:0});
  gsap.set(bromeliads,{yPercent:-42,scale:1.3,autoAlpha:0});
  gsap.set(orchid,{xPercent:-27,yPercent:30,scale:1.14,autoAlpha:0});
  gsap.set(progress,{scaleY:0,transformOrigin:'top'});

  const tl=gsap.timeline({defaults:{ease:'none',force3D:true},scrollTrigger:{trigger:hero,start:'top top',end:()=>`+=${Math.round(innerHeight*4.15)}`,pin:sticky,scrub:.85,anticipatePin:1,invalidateOnRefresh:true}});
  tl.to(progress,{scaleY:1,duration:100},0)

    /* Phase A (0-26): at the summit. Peak recedes as the camera starts sinking. */
    .to(brand,{autoAlpha:0,y:-24,duration:6},8)
    .to(peak,{scale:1.0,yPercent:2,duration:22,ease:'power1.inOut'},4)
    .to(sky,{scale:1.04,yPercent:0,duration:22,ease:'power1.inOut'},4)
    .to(summitBeat,{autoAlpha:1,y:0,duration:4,ease:'power2.out'},12)
    .to(summitBeat,{autoAlpha:1,duration:8},16)
    .to(summitBeat,{autoAlpha:0,y:-22,duration:4},24)

    /* Phase B (26-55): descend. Valley assembles beneath; the close peak dissolves into the wide scene. */
    .to(landscape,{opacity:1,scale:1.035,duration:16,ease:'power2.inOut'},26)
    .to(peak,{scale:.62,yPercent:-16,autoAlpha:0,duration:16,ease:'power2.inOut'},27)
    .to(sky,{autoAlpha:0,duration:12,ease:'power1.inOut'},30)
    .to([ridgeWide,ridgeLeft,ridgeRight],{yPercent:0,autoAlpha:.62,duration:18,ease:'power2.out'},28)
    .to(mountain,{yPercent:0,autoAlpha:.84,scale:1,duration:20,ease:'power2.out'},29)
    .to(river,{yPercent:0,autoAlpha:.72,scale:1,duration:19,ease:'power2.out'},31)
    .to(clouds,{xPercent:0,autoAlpha:.52,duration:15,ease:'power1.out'},32)
    .to(mist,{xPercent:-4,autoAlpha:.4,duration:14,ease:'power1.inOut'},34)
    .to(landscape,{scale:1,duration:14,ease:'power2.inOut'},40)
    .to(landscapeMaster,{scale:1.02,yPercent:0,duration:20,ease:'power1.inOut'},36)
    .to(waterBeat,{autoAlpha:1,y:0,duration:4,ease:'power2.out'},38)
    .to(waterBeat,{autoAlpha:1,duration:10},42)
    .to(waterBeat,{autoAlpha:0,y:-22,duration:4},52)

    /* Phase C (55-100): the forest ASSEMBLES around us, sprite by sprite. */
    .to(jungle,{opacity:1,duration:8},54)
    .to(landscape,{opacity:0,scale:1.06,duration:14,ease:'power2.inOut'},58)
    .to(jungleMaster,{opacity:1,scale:1.06,duration:18,ease:'power2.inOut'},56)
    .to(forestFrame,{yPercent:0,scale:1.12,autoAlpha:1,duration:18,ease:'power2.out'},58)
    .to(canopy,{xPercent:11,yPercent:8,scale:1.1,autoAlpha:1,duration:18,ease:'power2.out'},59)
    .to(philodendron,{xPercent:-11,yPercent:-5,scale:1.08,autoAlpha:1,duration:18,ease:'power2.out'},60)
    .to(bromeliads,{yPercent:-12,scale:1.08,autoAlpha:1,duration:17,ease:'power2.out'},61)
    .to(orchid,{xPercent:-8,yPercent:10,scale:1.12,autoAlpha:1,duration:16,ease:'power2.out'},62)
    .to(jungleMaster,{scale:1.0,yPercent:0,duration:16,ease:'power1.inOut'},74)
    .to([canopy,philodendron,bromeliads,orchid,forestFrame],{scale:'-=.03',duration:16,ease:'power1.inOut'},74)
    .to(finalCopy,{autoAlpha:1,y:0,duration:7,ease:'power2.out'},72)
    .to(finalPieces,{autoAlpha:1,y:0,stagger:.5,duration:4.5,ease:'power2.out'},72)
    .to(finalCopy,{autoAlpha:1,duration:20},80);

  if(matchMedia('(hover: hover) and (pointer: fine)').matches){
    sticky.addEventListener('pointermove',event=>{
      const x=(event.clientX/innerWidth-.5)*2,y=(event.clientY/innerHeight-.5)*2;
      gsap.to(finalCopy,{x:x*5,y:y*3,duration:.8,force3D:true,overwrite:'auto'});
    },{passive:true});
  }
})();
