import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import Dexie, {type Table} from 'dexie';
import { detectLanguage, type Language } from './i18n/types';
export interface Options {volume:number;latency:number;reducedMotion:boolean;reducedFlash:boolean;particles:boolean;visualBeat:boolean;audioBeat:boolean;assist:boolean;snap:boolean;highContrast:boolean;mirror:boolean;subtitleSize:number;keys:string[];language:Language;}
export const db=new Dexie('pr-panic');db.version(1).stores({records:'id'});
interface RecordEntry{id:string;score:number;combo:number;assist:boolean;}
const records=db.table('records') as Table<RecordEntry>;
interface Profile {options:Options;best:Record<string,number>;cleared:string[];collection:number[];setOption:<K extends keyof Options>(key:K,value:Options[K])=>void;saveResult:(id:string,score:number,combo:number,win:boolean)=>void;collect:(id:number)=>void;}
export const useProfile=create<Profile>()(persist((set,get)=>({options:{volume:0.5,latency:0,reducedMotion:typeof matchMedia!=='undefined'&&matchMedia('(prefers-reduced-motion: reduce)').matches,reducedFlash:true,particles:true,visualBeat:true,audioBeat:true,assist:false,snap:true,highContrast:false,mirror:false,subtitleSize:18,keys:['a','s','d'],language:detectLanguage()},best:{},cleared:[],collection:[],setOption:(key,value)=>set(s=>({options:{...s.options,[key]:value}})),saveResult:(id,score,combo,win)=>{const key=id+(get().options.assist?'-assist':'');set(s=>({best:{...s.best,[key]:Math.max(s.best[key]||0,score)},cleared:win?[...new Set([...s.cleared,id])]:s.cleared}));records.put({id:key,score:get().best[key],combo,assist:get().options.assist}).catch(()=>{});},collect:(id)=>set(s=>({collection:[...new Set([...s.collection,id])]}))}),{name:'pr-panic-profile-v1'}));
