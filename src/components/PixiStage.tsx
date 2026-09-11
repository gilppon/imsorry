import {useEffect,useRef} from 'react';
import {Application,Assets,Sprite,Graphics,Text} from 'pixi.js';
import {engine} from '../game/engine';
import {projectiles,seededRandom} from '../game/core';
import {flightPaths,BallisticArc,type FlightPath} from '../game/projectiles';
import {useProfile} from '../game/store';
let manifest:Promise<void>|null=null;
export default function PixiStage({background}:{background:string}){
 const host=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  let disposed=false,ready=false,destroyed=false;
  const app=new Application(),random=seededRandom(328);let unsubscribe=()=>{};
  const destroy=()=>{if(ready&&!destroyed){destroyed=true;app.destroy(true,{children:true});}};
  (async()=>{
   try{
    await app.init({width:1100,height:480,backgroundAlpha:0,antialias:true,resolution:Math.min(devicePixelRatio,2),autoDensity:true,preference:'webgl'});
    ready=true;if(disposed){destroy();return;}
    host.current?.appendChild(app.canvas);
    if(!manifest)manifest=Assets.init({manifest:{bundles:[{name:'rooms',assets:[{alias:'lobby',src:'/images/lobby.jpg'},{alias:'factory',src:'/images/factory.jpg'}]}]}});
    await manifest;await Assets.loadBundle('rooms');if(disposed)return;
    const bg=new Sprite(Assets.get(background));bg.width=1100;bg.height=550;bg.y=-45;app.stage.addChild(bg);
    app.stage.addChild(new Graphics().rect(0,0,1100,480).fill({color:0x252920,alpha:.22}));
    for(let i=0;i<11;i++){const x=i<5?i*68-10:760+(i-5)*70,y=437+random()*30;app.stage.addChild(new Graphics().ellipse(x,y+35,45,48).fill(0x292b26).circle(x,y-9,21).fill(0x3b3c2d).rect(x+16,y-25,34,23).fill(0x202824).circle(x+25,y-15,10).fill(0x778173));}
    const pool=Array.from({length:60},()=>{const g=new Graphics().circle(0,0,4).fill(0xffffff);g.visible=false;app.stage.addChild(g);return {g,vx:0,vy:0,life:0};});
    const prop=new Text({text:'🥚',style:{fontSize:56}});prop.anchor.set(.5);prop.visible=false;app.stage.addChild(prop);
    const flash=new Graphics().rect(0,0,1100,480).fill(0xfff2b8);flash.alpha=0;app.stage.addChild(flash);
    let flying=0,lastHit=engine.state.hitId,lastJudged=engine.state.judged;let path:FlightPath=new BallisticArc({x:80,y:420},{x:550,y:190});
    const burst=(x:number,y:number,colors:number[],success=false)=>{const o=useProfile.getState().options;if(!o.particles)return;let count=0;for(const p of pool){if(p.life>0)continue;if(count++>=(o.reducedMotion?5:success?18:30))break;p.g.position.set(x,y);p.g.tint=colors[Math.floor(random()*colors.length)];p.g.scale.set(success?.7:1+random());p.vx=(random()-.5)*320;p.vy=-random()*240;p.life=.6+random()*.5;p.g.alpha=1;p.g.visible=true;}};
    unsubscribe=engine.subscribe(()=>{const s=engine.state,o=useProfile.getState().options;if(s.judged!==lastJudged){lastJudged=s.judged;if(s.grade==='PERFECT'){burst(550,180,[0xf6d268,0x87d5ba],true);if(!o.reducedFlash&&!o.reducedMotion)flash.alpha=.28;}}if(s.hitId===lastHit)return;lastHit=s.hitId;const item=projectiles[s.hit];prop.text=item?.[0]||'🥚';const from={x:s.hit%2?1020:80,y:420},to={x:550,y:[150,195,270][s.hit%3]};const Flight=flightPaths[item[3] as keyof typeof flightPaths]||BallisticArc;path=new Flight(from,to);prop.position.set(from.x,from.y);prop.visible=true;prop.scale.set(1);flying=1;});
    app.ticker.add(t=>{if(engine.state.status!=='playing')return;const options=useProfile.getState().options,dt=Math.min(t.deltaMS/1000,.05);flash.alpha=Math.max(0,flash.alpha-dt*2);if(flying>0){flying-=dt*(options.reducedMotion?7:engine.state.hit%18===1?2.6:1.5);const point=path.at(1-Math.max(0,flying));prop.position.set(point.x,point.y);if(!options.reducedMotion)prop.rotation+=dt*(engine.state.hit===2?13:8);if(flying<=0){prop.visible=false;const colors=engine.state.hit===1?[0xd75435,0xebac52]:engine.state.hit===3?[0x75bfc4,0xbde0d7]:engine.state.hit===4?[0x8e5e35,0xbaa078]:engine.state.hit===2?[0xf2ead5,0xe0d7bb]:[0xf1bd44,0xf5eacf];burst(point.x,point.y,colors);}}for(const p of pool){if(p.life<=0)continue;p.life-=dt;if(!options.reducedMotion){p.vy+=460*dt;p.g.x+=p.vx*dt;p.g.y+=p.vy*dt;}p.g.alpha=Math.max(0,p.life);if(p.life<=0||p.g.y>480||p.g.x<0||p.g.x>1100)p.g.visible=false;}});
   }catch(error){if(!disposed)console.warn('WebGL fallback: CSS stage remains available',error);}
  })();
  return()=>{disposed=true;unsubscribe();destroy();};
 },[background]);
 return <div className="pixi-stage" ref={host} aria-hidden="true"/>;
}
