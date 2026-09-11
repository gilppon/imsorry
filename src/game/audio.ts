export class AudioClock {
 context:AudioContext|null=null;gain:GainNode|null=null;nodes=new Set<OscillatorNode>();
 async activate(){if(!this.context){this.context=new AudioContext();this.gain=this.context.createGain();this.gain.connect(this.context.destination);}if(this.context.state==='suspended')await this.context.resume();return this.context;}
 get now(){return this.context?.currentTime??0;}
 volume(value:number){if(this.gain)this.gain.gain.value=value;}
 tone(time:number,freq:number,duration=.08,volume=.12,type:OscillatorType='sine'){if(!this.context||!this.gain)return;const osc=this.context.createOscillator(),env=this.context.createGain();osc.type=type;osc.frequency.setValueAtTime(freq,time);env.gain.setValueAtTime(0,time);env.gain.linearRampToValueAtTime(volume,time+.006);env.gain.exponentialRampToValueAtTime(.001,time+duration);osc.connect(env);env.connect(this.gain);osc.start(time);osc.stop(time+duration+.01);this.nodes.add(osc);osc.onended=()=>{this.nodes.delete(osc);osc.disconnect();env.disconnect();};}
 beat(time:number,index:number,metronome:boolean){if(metronome)this.tone(time,index%8===0?1100:750,.035,index%2===0?.12:.035,'triangle');if(index%2===0){const bass=[110,110,146.83,130.81,110,164.81,146.83,130.81][Math.floor(index/2)%8];this.tone(time,bass,.19,.17,'triangle');this.tone(time,55,.08,.14);}if(index%4===2)this.tone(time,220,.035,.06,'sawtooth');if(index%2===1)this.tone(time,[440,523.25,587.33,659.25][Math.floor(index/4)%4],.10,.045,'triangle');}
 stopSounds(){this.nodes.forEach(n=>{try{n.stop();}catch{}});this.nodes.clear();}
}
export const audio=new AudioClock();
