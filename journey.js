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
  const landscape=q('.journey-landscape'),landscapeMaster=q('.journey-landscape-master');
  const ridgeWide=q('.journey-ridge-wide'),ridgeLeft=q('.journey-ridge-left'),ridgeRight=q('.journey-ridge-right');
  const mountain=q('.journey-mountain'),river=q('.journey-river'),clouds=q('.journey-clouds'),mist=q('.journey-mist');
  const jungle=q('.journey-jungle'),jungleMaster=q('.journey-jungle-master');
  const canopy=q('.journey-canopy'),philodendron=q('.journey-philodendron'),bromeliads=q('.journey-bromeliads'),orchid=q('.journey-orchid');
  const forestFrame=q('.journey-forest-frame');
  const summitBeat=q('.journey-beat-forest'),waterBeat=q('.journey-beat-water'),finalCopy=q('.journey-final'),progress=q('.journey-progress span');
  const finalPieces=finalCopy.querySelectorAll('.eyebrow,h2,p,.hero-actions,.journey-trust');

  // GPU-lock every animated layer for the whole scrub (prevents translateZ strip flicker).
  const allLayers=[landscape,landscapeMaster,ridgeWide,ridgeLeft,ridgeRight,mountain,river,clouds,mist,jungle,jungleMaster,canopy,philodendron,bromeliads,orchid,forestFrame,brand,summitBeat,waterBeat,finalCopy];
  gsap.set(allLayers,{force3D:true,willChange:'transform,opacity'});

  /* ============ REVERSED JOURNEY: Cotopaxi summit -> valley -> living forest ============ */
  gsap.set([summitBeat,waterBeat,finalCopy],{autoAlpha:0,y:32});
  gsap.set(finalPieces,{autoAlpha:0,y:16});
  // Opening state: we are AT the peak. Sky full, peak close and large.
  // Sequence 1 opening: ONE scene, zoomed onto the volcano. No overlays, no second mountain.
  gsap.set(landscape,{opacity:1,scale:1});
  gsap.set(landscapeMaster,{scale:1.6,yPercent:16,transformOrigin:'50% 26%'});
  gsap.set([ridgeWide,ridgeLeft,ridgeRight,mountain],{autoAlpha:0});
  gsap.set(river,{yPercent:0,autoAlpha:0,scale:1});
  gsap.set(clouds,{xPercent:-4,autoAlpha:.35});
  gsap.set(mist,{xPercent:4,autoAlpha:.3});
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

    /* Sequence 1 (0-55): zoomed on the mountain, slow continuous pull-back. Nothing else. */
    .to(brand,{autoAlpha:0,y:-24,duration:6},8)
    .to(landscapeMaster,{scale:1.0,yPercent:0,duration:52,ease:'power1.inOut'},2)
    .to(river,{autoAlpha:.5,duration:14,ease:'power1.out'},20)
    .to(clouds,{xPercent:2,autoAlpha:.45,duration:30,ease:'power1.inOut'},10)
    .to(mist,{xPercent:-4,autoAlpha:.35,duration:30,ease:'power1.inOut'},10)
    .to(summitBeat,{autoAlpha:1,y:0,duration:4,ease:'power2.out'},10)
    .to(summitBeat,{autoAlpha:1,duration:10},14)
    .to(summitBeat,{autoAlpha:0,y:-22,duration:4},26)
    .to(waterBeat,{autoAlpha:1,y:0,duration:4,ease:'power2.out'},36)
    .to(waterBeat,{autoAlpha:1,duration:10},40)
    .to(waterBeat,{autoAlpha:0,y:-22,duration:4},50)

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
