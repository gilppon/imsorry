import {useId} from 'react';
function Body(){return <g stroke="#282722" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
 <path d="M-30 3L-40-71Q-38-99-12-104L22-104Q44-83 41-52L30 4Z" fill="#343f4c"/>
 <path d="M-12-105L2-53 20-104" fill="#eee6cf"/><path d="M-20-106L-25-76-12-72-20-58 0-35 10-84M22-102L33-78 22-70 30-59 0-35" fill="#43505a"/>
 <path d="M0-99L9-94 4-84 12-45 3-35-5-47 0-83-5-94Z" fill="#a24333"/>
 <path d="M10-8L27-12 34 10 10 7" fill="#eae1c5"/><path d="M-29-49L-33-23-3-16 2-29-18-37-12-67" fill="#3e4854"/>
 <path d="M-3-29Q12-38 18-28L21-19 10-12-3-16Z" fill="#c7ae7e"/>
 <path d="M30-67L43-35 26-20 18-30 29-42 20-61" fill="#343f4c"/>
 <path d="M8-28L20-69" stroke="#222827" strokeWidth="8"/><ellipse cx="21" cy="-74" rx="10" ry="14" fill="#515b58" transform="rotate(17 21 -74)"/><path d="M14-78L27-74M13-73L26-69" stroke="#a5a58b" strokeWidth="2"/>
 <path d="M-2-15Q-25 25 26 43Q53 61 4 82" fill="none" strokeWidth="2"/>
 <path d="M-26-66L-8-66-8-43-28-44Z" fill="#d1c9ad" strokeWidth="2"/><path d="M-18-71L-18-63" stroke="#77745a"/>
 <path d="M-12-103L-13-127 16-127 19-103" fill="#b59a71"/>
 <path d="M-53-188Q-54-211-25-221Q5-230 31-215L43-194 40-167 54-152Q58-143 41-140L41-115Q29-95 6-102L-11-99Q-31-102-34-122L-43-141Q-59-146-56-162L-51-173Z" fill="#cbb58c"/>
 <path d="M-50-170Q-60-193-45-207L-29-225-14-220-1-229 13-216 28-220 42-199 35-185 17-190 5-208-14-199-25-197-27-178-36-169-37-150-47-154Z" fill="#353732"/>
 <path d="M-24-208Q-8-217 10-208" fill="none" stroke="#a39371" strokeWidth="5"/>
 <path d="M-45-156Q-55-168-56-153Q-55-140-43-141" fill="#cbb58c"/>
 <path d="M-11-166Q-1-172 9-164M19-166L32-170" strokeWidth="3" fill="none"/>
 <path d="M-15-156Q-6-151 6-156M19-156Q29-151 36-158" stroke="#9a8668" strokeWidth="6" fill="none"/>
 <ellipse cx="-3" cy="-159" rx="10" ry="7" fill="#ebe4ce" strokeWidth="2"/><ellipse cx="27" cy="-161" rx="9" ry="7" fill="#ebe4ce" strokeWidth="2"/>
 <circle cx="1" cy="-158" r="2.5" fill="#282722" stroke="none"/><circle cx="30" cy="-160" r="2.5" fill="#282722" stroke="none"/>
 <path d="M20-154L18-141 32-139" fill="none" stroke="#8d7259" strokeWidth="2"/><ellipse cx="34" cy="-142" rx="9" ry="6" fill="#b57861" stroke="none"/>
 <path d="M2-127Q15-132 28-124" fill="none"/><path d="M5-117L21-115M-25-143L-21-128" fill="none" stroke="#ad956f" strokeWidth="2"/>
 <path d="M-63-184Q-77-165-65-160Q-55-159-63-184ZM50-189Q43-171 53-173Q59-176 50-189Z" fill="#70ada7" stroke="#376f6f" strokeWidth="1.5"/>
 </g>}
export default function ManagerKim({angle=0,dogeza=false,debug=false,target=45,ghost=false}:{angle?:number;dogeza?:boolean;debug?:boolean;target?:number;ghost?:boolean}){const id=useId();return <svg className={'manager-kim '+(ghost?'ghost-kim':'')} viewBox="0 0 600 450" role="img" aria-label={`김부장 ${dogeza?'도게자':`${Math.round(angle)}도 사과`} 자세`}>
 <defs><filter id={id}><feTurbulence type="fractalNoise" baseFrequency=".5" numOctaves="2" result="noise"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".08"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter></defs>
 <ellipse cx="284" cy="392" rx={dogeza?112:76} ry="11" fill="#302d24" opacity=".2"/>
 <g transform={`translate(260 ${dogeza?344:291})`} filter={`url(${id})`}>
 {dogeza?<g stroke="#282722" strokeWidth="4"><path d="M-30-5L-73 25-8 38 34 19 24-4" fill="#303d49"/><path d="M-71 23L-97 16-102 30-73 38-55 35" fill="#282c29"/></g>:<g stroke="#282722" strokeWidth="4" strokeLinejoin="round"><path d="M-29-1L-30 43-26 80-5 83 1 38 8 83 29 83 35 36 28-1" fill="#303d49"/><path d="M-25 78L-25 91-6 91-5 78" fill="#98876a"/><path d="M9 79L10 92 29 92 28 79" fill="#547b77"/><path d="M-26 88L-38 97Q-36 105-3 102L-4 88ZM10 89L9 102Q51 107 50 99L29 90Z" fill="#252b2c"/><path d="M-19 25L-12 32M17 49L26 53" stroke="#687071" strokeWidth="2"/></g>}
 <g transform={`rotate(${dogeza?108:angle})`}><Body/></g>
 {debug&&<g fill="none" strokeWidth="2"><path d="M0 30V-250" stroke="#db4e3e" strokeDasharray="7 5"/><path d="M0 0V-230" transform={`rotate(${dogeza?108:angle})`} stroke="#3ce0cb"/><path d="M0 0V-220" transform={`rotate(${target})`} stroke="#efc447" strokeDasharray="5 5"/><circle r="9" fill="#df4634" stroke="#fff"/><rect x="-60" y="-230" width="118" height="135" transform={`rotate(${angle})`} stroke="#66dcba" strokeDasharray="5 4"/><text x="-145" y="-230" fill="#fff" stroke="none" fontSize="16">골반 기준 {Math.round(angle)}° / 목표 {target}° ±4°</text></g>}
 </g></svg>}
