# PR PANIC: 스테이지별 배경 이미지 생성 프롬프트 가이드 (27종)

> **프로젝트**: 공식 사과 시뮬레이터: PR PANIC  
> **규격**: 16:9 가로 와이드 (1100x480 이상, 권장: 1920x1080 또는 1280x720)  
> **스타일**: 빈티지 신문 풍자 만평 (Vintage Satirical Newspaper Editorial Cartoon) + 하프톤 도트 + 양피지 질감  
> **저장 위치**: `public/images/<파일명>.jpg`

---

## ⚠️ 프롬프트 생성 시 핵심 주의사항 (Hard Rule)

1. **중앙 무대 비우기 (Empty Central Podium)**:  
   게임 내에서 김부장 본체(`ManagerKim.tsx`)가 실시간으로 각도(45°/90°/120°/도게자)를 취하며 무대 중앙에 올라갑니다.  
   **따라서 배경 이미지 중앙에는 빈 나무 단상과 스탠드 마이크만 있어야 하며, 중앙에 사람이 서 있으면 절대 안 됩니다.**
2. **좌우 기자단 배치**:  
   플래시 카메라, 붐 마이크, 수첩을 든 분노/당황한 표정의 기자들이 좌우에서 둘러싸고 있는 구도여야 합니다.
3. **화풍 일관성**:  
   기존 `lobby.jpg`, `factory.jpg`, `press-room.jpg`와 동일한 펜화 잉크 스케치 + 수채/과슈 채색 + 레트로 도트 톤앤매너 유지.

---

## 🎨 공통 스타일 접두사 (Base Style Prefix)

```text
Vintage satirical newspaper editorial cartoon, comic strip art style with subtle halftone screen dots and aged sepia paper texture. Expressive sketchy ink pen outlines, watercolor and gouache wash coloring. A chaotic, satirical corporate apology press conference. In the center, an empty wooden speaker podium with multiple microphones standing on a low wooden stage platform (IMPORTANT: THE CENTRAL PODIUM MUST BE EMPTY, NO MAIN CHARACTER ON STAGE, empty stage left open for character overlay). On both left and right sides, a dense crowd of frantic, aggressive, sweating reporters with flashbulb cameras, boom microphones pointing inwards, note pads, and shouting expressions.
```

## 🚫 공통 네거티브 프롬프트 (Negative Prompt)

```text
person on central podium, character standing on stage, realistic photo, 3D CGI render, clean vector art, glossy, blurry, cropped podium, modern minimalism, deformed hands
```

---

## 📋 스테이지 04~30 전체 프롬프트 목록 (27종)

### [Chapter 1] 사내 위기

#### STAGE 04. 좁은 엘리베이터 인터뷰
- **권장 파일명**: `elevator.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. A chaotic apology press conference inside a cramped, claustrophobic stainless steel corporate elevator. Elevator doors are forced wide open, with an empty small wooden podium and microphones in the center. An intense crowd of sweating reporters jammed tightly inside and outside the elevator, shoving boom mics and flashing cameras into the tight elevator cabin. Elevator buttons and flashing floor indicator visible overhead. No person standing on the central podium. --ar 16:9
```

#### STAGE 05. 편의점 주차장 긴급회견
- **권장 파일명**: `convenience-store.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. A chaotic nighttime emergency press conference in an asphalt convenience store parking lot. Glowing neon "24H MART" store signage in the background. In the center, an empty wooden speaker podium with tangled microphone cables on wet asphalt. Shivering reporters wearing trench coats holding hot canned coffees, umbrellas, boom mics, and camera flashes under yellow streetlights. Wet puddles and police barricade tape fluttering. No person on the central podium. --ar 16:9
```

---

### [Chapter 2] 대외 위기

#### STAGE 06. 호텔 연회장
- **권장 파일명**: `hotel-ballroom.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. A chaotic corporate crisis press conference inside a tacky luxury hotel grand banquet ballroom. Massive crystal chandelier hanging overhead, heavy red velvet drapes in the background, banquet round tables with half-eaten catering food. In the center, an empty ornate wooden speaker podium on a low red-carpeted riser with microphones. Angry reporters in formal suits with loose ties and flashing press cameras crowding around the velvet ropes. No person on stage. --ar 16:9
```

#### STAGE 07. 주주총회 무대
- **권장 파일명**: `shareholders-meeting.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. An angry corporate annual shareholders' meeting auditorium in total uproar. Huge corporate banner overhead showing a disastrously plunging red line graph. In the center, an empty wooden podium with standing microphones on an elevated wooden stage. Furious middle-aged shareholders on both sides waving stock certificates, shaking fists, and shouting, alongside frantic journalists taking photos. Security guards struggling with crowd ropes. Empty central podium. --ar 16:9
```

#### STAGE 08. TV 뉴스 생방송
- **권장 파일명**: `tv-studio.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. A live TV news broadcast studio during a breaking crisis. Huge overhead studio stage lights, swinging camera cranes, and large monitors flashing "BREAKING CRISIS: LIVE". In the center, an empty sleek wooden speaker podium with multiple branded broadcast microphones ready on stage. TV cameramen with bulky broadcast cameras, floor directors waving cue cards in panic, and journalists crowding the sides. No person standing on the central podium. --ar 16:9
```

#### STAGE 09. 야외 축제 무대
- **권장 파일명**: `festival-stage.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. An outdoor apology press conference on a makeshift festival wooden stage in a messy park. Popping colorful party balloons and carnival banners in the background. In the center, an empty wooden podium with microphones. Confused carnival crowd and aggressive journalists in mud-splattered boots crowding around the stage with heavy camera lenses and directional microphones. No person on stage. --ar 16:9
```

#### STAGE 10. 음식 박람회
- **권장 파일명**: `food-expo.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. A chaotic press conference inside a massive convention hall food expo. Sizzling cooking booths, corporate chef mascot cutouts, steam and smoke in the background. In the center, an empty wooden podium adorned with tangled microphone cables. Food critic reporters wearing aprons, holding clipboards, giant ladles, and camera flashes surrounding the presentation stage. Empty central podium. --ar 16:9
```

---

### [Chapter 3] 시스템 오류

#### STAGE 11. 서버실 정전 회견
- **권장 파일명**: `server-room.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. A dark, chaotic corporate data center server room during a major power blackout. Server racks spewing comic black smoke and electrical sparks, glowing red emergency strobe lights, tangled ethernet cables on the raised floor. In the center, an empty wooden speaker podium illuminated by a single emergency lamp with standing microphones. Panicked tech reporters holding glowing laptops and flashing DSLR cameras. No person on the podium. --ar 16:9
```

#### STAGE 12. 로봇 공장
- **권장 파일명**: `robot-factory.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. An industrial automated robot manufacturing plant in utter chaos. Malfunctioning robotic arms flailing wildly, throwing sparks and gears, yellow hazard stripes on walls, stopped conveyor belts. In the center, an empty wooden podium on a metal diamond-plate platform with microphones. Reporters wearing yellow hardhats over their suits, aiming boom microphones and camera flashbulbs through smoke. Empty central podium. --ar 16:9
```

#### STAGE 13. 지하철 광고 촬영장
- **권장 파일명**: `subway-platform.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. A crowded underground subway train platform press conference. Glaring train headlights approaching on the tracks, tiled subway walls with peeling billboard advertisements. In the center, an empty wooden podium with standing microphones on the platform. Commuters and aggressive reporters pressing against the safety line, holding notepads and camera flashes. No person on stage. --ar 16:9
```

#### STAGE 14. 초대형 물류창고
- **권장 파일명**: `warehouse.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. A colossal e-commerce fulfillment warehouse with towering metal racks stacked high with millions of cardboard shipping boxes. Forklifts stopped haphazardly, blinking red barcode scanner beams. In the center, an empty wooden podium on a wooden pallet platform with microphones. Reporters clutching crumpled delivery slips, pointing camera lenses and boom mics inward. Empty central podium. --ar 16:9
```

#### STAGE 15. 유령처럼 조용한 사무실
- **권장 파일명**: `ghost-office.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. An eerie, deserted open-plan corporate office late at night. Withered office plants, loose paper flying across cubicles, pale moonlight streaming through horizontal window blinds. In the center, an empty wooden podium under a lone buzzing fluorescent light with microphones. Journalists creeping out from behind office cubicles and photocopiers with audio recorders and flashbulbs. Empty central podium. --ar 16:9
```

---

### [Chapter 4] 극한 출장

#### STAGE 16. 옥상 헬리패드
- **권장 파일명**: `helipad.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. On the dizzying windy rooftop helipad of a corporate glass skyscraper at dusk. Giant painted yellow 'H' on the concrete surface, dramatic city skyline backdrop with swirling mist. In the center, an empty wooden podium with microphones taped securely against the wind. Shivering reporters with windblown hair, flapping neckties, and trench coats bracing against the gale while aiming cameras. No person on the podium. --ar 16:9
```

#### STAGE 17. 폭풍우 속 야외 연단
- **권장 파일명**: `storm-podium.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. A dramatic outdoor apology press conference in a furious torrential rainstorm. Heavy slanted rain pouring down, lightning bolt flashing across dark ominous clouds, puddle splashes. In the center, an empty wooden stage and podium soaked with rain, microphones with wet foam covers. Reporters struggling with inverted inside-out umbrellas, drenched suits, and water-shielded camera flashes. Empty central podium. --ar 16:9
```

#### STAGE 18. 해상 유람선 기자회견
- **권장 파일명**: `cruise-ship.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. On the wooden teak deck of a luxury ocean cruise ship listing in rough stormy seas. Ocean waves spraying white foam over ship railings, life preservers and seagulls squawking. In the center, an empty wooden podium bolted to the wet rolling deck with microphones. Seasick journalists with pale green faces clinging to railings and deck chairs while frantically thrusting microphones forward. No person on stage. --ar 16:9
```

#### STAGE 19. 사막 태양광 기지
- **권장 파일명**: `desert-solar.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. A baking hot press conference in a vast arid desert surrounded by endless rows of reflective solar panel arrays. Intense heat shimmer in the air, cracked dry clay earth, blowing tumbleweeds. In the center, an empty wooden podium with microphones casting a crisp desert shadow under the blazing sun. Sunburned reporters with rolled-up sleeves, straw hats, and sweating brows aiming telephoto lenses and boom mics. Empty central podium. --ar 16:9
```

#### STAGE 20. 눈보라 치는 연구소
- **권장 파일명**: `blizzard-lab.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. Outside an arctic scientific research outpost during a fierce sub-zero blizzard. Snow drifts piling against corrugated metal walls, icicles hanging from radar antennas. In the center, an empty wooden podium covered with a dusting of snow with frosted microphones. Reporters wrapped in bulky down parkas, snow goggles, and fur-lined hoods, holding frostbitten cameras and microphone poles. Empty central podium. --ar 16:9
```

---

### [Chapter 5] 지구 밖 사과

#### STAGE 21. 수중 호텔
- **권장 파일명**: `underwater-hotel.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. Inside an opulent undersea luxury hotel observation lounge. Giant curved acrylic panoramic windows showing deep turquoise ocean water, curious sharks and sea turtles peering inside, aquatic caustics dancing on the carpet. In the center, an empty wooden podium with standing microphones on a low platform. Journalists wearing maritime suits and holding waterproof camera gear and boom mics. No person on the podium. --ar 16:9
```

#### STAGE 22. 화산섬 리조트
- **권장 파일명**: `volcano-resort.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. At a tropical island beach resort with an active erupting volcano in the dramatic background. Huge plumes of dark ash and fiery red lava glowing against a twilight sky, swaying scorched palm trees. In the center, an empty wooden podium on a deck with microphones. Sweating reporters in floral Hawaiian shirts under press vests, holding audio recorders and camera flashbulbs amidst falling ash flakes. Empty central podium. --ar 16:9
```

#### STAGE 23. 달 기지 브리핑룸
- **권장 파일명**: `moon-base.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. Inside a retro-futuristic Lunar moon base briefing dome. A massive panoramic observation window overlooking gray lunar craters and planet Earth hanging in pitch-black starry space. In the center, an empty wooden speaker podium with retro sci-fi microphones on stage. Space-suited reporters with clear bubble helmets worn over business suits, holding futuristic antennae boom mics and cameras. Empty central podium. --ar 16:9
```

#### STAGE 24. 우주선 격납고
- **권장 파일명**: `spaceship-hangar.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. Inside a colossal orbital starship hangar bay. Enormous spacecraft thrusters emitting comic steam, overhead gantry cranes, yellow hazard markings, and blinking warning beacons. In the center, an empty wooden podium on a heavy industrial metal platform with microphones. Sci-fi interstellar journalists carrying tablet scanners, holographic cameras, and sound receivers crowding the perimeter. No person on stage. --ar 16:9
```

#### STAGE 25. 무중력 화상 기자회견
- **권장 파일명**: `zero-gravity.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. Inside a zero-gravity space station laboratory module. Floating ballpoint pens, spiral notebooks, and microphone cables drifting weightlessly in mid-air, padded walls with handrails. In the center, an empty wooden podium tethered down with bungee cords, microphones floating slightly. Reporters strapped into wall foot-loops with floating cameras and notepads, looking disoriented. Empty central podium. --ar 16:9
```

---

### [Chapter 6] 마지막 질문

#### STAGE 26. 전 세계 동시 생중계
- **권장 파일명**: `global-broadcast.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. Inside a dizzying ultra-tech global broadcast master control nexus. Giant video wall displaying hundreds of simultaneous live feeds from news anchors worldwide labeled "LIVE NEW YORK", "LIVE TOKYO", "LIVE LONDON", "LIVE PARIS". In the center, an empty wooden speaker podium lit by blinding stadium floodlights with a dozen microphones. Swarms of international reporters pushing against crowd barriers with flashing telephoto cameras. Empty central podium. --ar 16:9
```

#### STAGE 27. 홀로그램 기자단
- **권장 파일명**: `hologram-press.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. Inside a dark minimalist cyber arena where all the reporters are translucent glowing cyan and magenta digital holograms with scanlines. Holographic floating cameras and microphones hovering in mid-air around the stage, digital particle streams in the background. In the center, a physical rustic empty wooden speaker podium with physical vintage microphones standing alone on a wooden stage. No person on the podium. --ar 16:9
```

#### STAGE 28. AI 앵커 연속 질문
- **권장 파일명**: `ai-anchors.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. An unsettling, satirical AI newsroom press conference. Rows of identical robotic humanoid AI reporters and news anchors with glowing blue optic visors and eerily perfect synthetic smiles. Pulsing audio waveform visualizers across the walls. In the center, an empty wooden podium with standing microphones. All robot journalists uniformly holding identical mechanical microphones pointed directly at the stage. Empty central podium. --ar 16:9
```

#### STAGE 29. 180BPM 사과 마라톤
- **권장 파일명**: `apology-marathon.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. A gigantic sports stadium arena packed with fifty thousand cheering, jeering spectators under roaring stadium floodlights. Giant electronic scoreboard flashing "180 BPM APOLOGY MARATHON: LIVE". In the center of the running track, an empty wooden podium with microphones surrounded by Olympic-style starting blocks. Hundreds of sports photographers and journalists with massive telephoto lenses on the track sidelines. Empty central podium. --ar 16:9
```

#### STAGE 30. 모든 기자가 동시에 질문하는 날
- **권장 파일명**: `apocalypse-press.jpg`
- **프롬프트**:
```text
Vintage satirical newspaper editorial cartoon, halftone dots, sepia paper texture, sketchy ink pen lineart with watercolor wash. The ultimate apocalyptic climax of corporate apology press conferences. The entire sky and ceiling are blacked out by hundreds of overlapping comic speech bubbles and giant question marks. A literal sea of thousands of microphones converging inwards like a giant prickly porcupine. A blinding wall of hundreds of camera flashes erupting in unison, creating an intense heavenly white backlight. In the exact center, a tiny, defiant, empty wooden speaker podium standing on a bare wooden stage. No person on stage. --ar 16:9
```

---

## 🛠️ 이미지 파일 생성 후 적용 방법
1. 생성한 이미지를 위 명시된 파일명(예: `elevator.jpg`, `moon-base.jpg` 등)으로 `e:\astra\ayamare\public\images/` 폴더에 저장합니다.
2. 부장(저)에게 **"이미지 다 넣었으니 stages.json에 연결해라!"** 하고 한마디만 명령해 주시면, 제가 `stages.json`과 `PixiStage.tsx`에 즉시 1:1 자동 매핑 패치를 단행하겠습니다.
