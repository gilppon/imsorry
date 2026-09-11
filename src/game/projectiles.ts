export type Point={x:number;y:number};
export abstract class FlightPath{constructor(public from:Point,public to:Point){}protected lerp(t:number):Point{return {x:this.from.x+(this.to.x-this.from.x)*t,y:this.from.y+(this.to.y-this.from.y)*t};}abstract at(progress:number):Point;}
export class BallisticArc extends FlightPath{at(t:number){const p=this.lerp(t);p.y-=Math.sin(t*Math.PI)*150;return p;}}
export class StraightFast extends FlightPath{at(t:number){return this.lerp(1-(1-t)**2);}}
export class Flutter extends FlightPath{at(t:number){const p=this.lerp(t);p.x+=Math.sin(t*Math.PI*7)*22*(1-t);p.y+=Math.sin(t*Math.PI*5)*32*(1-t);return p;}}
export class Boomerang extends FlightPath{at(t:number){const p=this.lerp(t);p.x+=Math.sin(t*Math.PI)*210;p.y-=Math.sin(t*Math.PI*2)*65;return p;}}
export class Bounce extends FlightPath{at(t:number){const p=this.lerp(t);p.y-=Math.abs(Math.sin(t*Math.PI*3))*75*(1-t);return p;}}
export class Splash extends FlightPath{at(t:number){const p=this.lerp(t);p.y-=Math.sin(t*Math.PI)*95;return p;}}
export class StickyScreen extends FlightPath{at(t:number){const p=this.lerp(t*t);p.y-=Math.sin(t*Math.PI)*45;return p;}}
export class ComicHoming extends FlightPath{at(t:number){const p=this.lerp(t);p.x+=Math.sin(t*Math.PI*4)*45*(1-t);p.y-=Math.sin(t*Math.PI)*120;return p;}}
export const flightPaths={BallisticArc,StraightFast,Flutter,Boomerang,Bounce,Splash,StickyScreen,ComicHoming};
