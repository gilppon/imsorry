import {useEffect,useRef,useState,useSyncExternalStore} from 'react';
import {ArrowLeft,Pause,Play,RotateCcw,Settings,Target,Volume2,VolumeX,ScanLine,MoveDown,Heart,ChevronRight} from 'lucide-react';
import {engine} from '../game/engine';
import {stages,type Stage} from '../game/core';
import {useProfile} from '../game/store';
import {useI18n, getLocalizedStage} from '../game/i18n';

import ManagerKim from './ManagerKim';
import PixiStage from './PixiStage';

export default function Game({stage,practice,onExit,onOptions,onNext}:{stage:Stage;practice:boolean;onExit:()=>void;onOptions:()=>void;onNext:(s:Stage)=>void}){
  const {t,lang}=useI18n();
  const localizedStage=getLocalizedStage(stage,lang);
  const s=useSyncExternalStore(engine.subscribe,engine.getSnapshot);
  const options=useProfile(p=>p.options);
  const setOption=useProfile(p=>p.setOption);
  const [debug,setDebug]=useState(false);
  const drag=useRef<{y:number;angle:number;swiped:boolean}|null>(null);
  const event=localizedStage.events[s.eventIndex];
  const target=event?.targetAngle??45;
  const total=localizedStage.events[localizedStage.events.length-1].beat+2;

  // Apolo-style 4-lane definition
  const LANES = [
    {
      lane: 0,
      angle: 45,
      keyChar: (options.keys[0] || 'a').toLowerCase(),
      keyDisplay: (options.keys[0] || 'a').toUpperCase(),
      label: '45°',
      name: t.howto.poses?.polite || '정중한 사과',
      color: '#38bdf8',
      glow: 'rgba(56, 189, 248, 0.55)',
    },
    {
      lane: 1,
      angle: 90,
      keyChar: (options.keys[1] || 's').toLowerCase(),
      keyDisplay: (options.keys[1] || 's').toUpperCase(),
      label: '90°',
      name: t.howto.poses?.deep || '극한 사죄',
      color: '#c084fc',
      glow: 'rgba(192, 132, 252, 0.55)',
    },
    {
      lane: 2,
      angle: 120,
      keyChar: (options.keys[2] || 'd').toLowerCase(),
      keyDisplay: (options.keys[2] || 'd').toUpperCase(),
      label: '120°',
      name: t.howto.poses?.extreme || '초극한 사죄',
      color: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.55)',
    },
    {
      lane: 3,
      angle: 'dogeza' as const,
      keyChar: ' ',
      keyDisplay: 'SPACE',
      label: 'DOGEZA',
      name: t.game.dogeza || '최종 사죄',
      color: '#fb7185',
      glow: 'rgba(251, 113, 133, 0.65)',
    },
  ];

  const getLaneIndex = (targetAngle: number | 'dogeza') => {
    if (targetAngle === 'dogeza') return 3;
    if (targetAngle === 120) return 2;
    if (targetAngle === 90) return 1;
    return 0;
  };

  const [pressedLanes, setPressedLanes] = useState<number[]>([]);
  const [sparks, setSparks] = useState<{ id: number; lane: number; tx: string; ty: string; color: string }[]>([]);
  const [popups, setPopups] = useState<{ id: number; lane: number; grade: string; color: string }[]>([]);
  const sparkId = useRef(0);
  const popupId = useRef(0);
  const lastJudgedRef = useRef(s.judged);

  useEffect(() => {
    if (s.judged > lastJudgedRef.current) {
      lastJudgedRef.current = s.judged;
      const prevEvent = localizedStage.events[Math.max(0, s.eventIndex - 1)];
      const laneIdx = getLaneIndex(prevEvent?.targetAngle ?? target);
      const isPerfect = s.grade === 'PERFECT';
      const isGreat = s.grade === 'GREAT';
      const isGood = s.grade === 'GOOD';
      const isMiss = s.grade === 'MISS' || s.grade.includes('사과');
      const color = isPerfect ? '#fde047' : isGreat ? '#38bdf8' : isGood ? '#34d399' : '#f87171';

      const pid = popupId.current++;
      setPopups(prev => [...prev, { id: pid, lane: laneIdx, grade: s.grade, color }]);
      setTimeout(() => setPopups(prev => prev.filter(p => p.id !== pid)), 750);

      if (!isMiss) {
        const count = isPerfect ? 10 : isGreat ? 6 : 4;
        const newSparks: { id: number; lane: number; tx: string; ty: string; color: string }[] = [];
        for (let i = 0; i < count; i++) {
          const tx = (Math.random() - 0.5) * 110 + 'px';
          const ty = (Math.random() - 0.5) * 70 - 15 + 'px';
          newSparks.push({ id: sparkId.current++, lane: laneIdx, tx, ty, color });
        }
        setSparks(prev => [...prev.slice(-30), ...newSparks]);
      }
    }
  }, [s.judged, s.grade, target, localizedStage.events, s.eventIndex]);

  useEffect(() => {
    const visibility = () => { if (document.hidden) engine.pause(); };
    const blur = () => engine.pause();
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('blur', blur);

    const down = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).matches('input,textarea,select') || e.repeat) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        if (engine.state.status === 'playing') engine.pause();
        else if (engine.state.status === 'paused') void engine.resume();
        return;
      }
      if (engine.state.status !== 'playing') return;
      const keys = useProfile.getState().options.keys;
      const i = keys.indexOf(e.key.toLowerCase());
      if (i >= 0) {
        e.preventDefault();
        setPressedLanes(prev => [...new Set([...prev, i])]);
        engine.setAngle([45, 90, 120][i]);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setPressedLanes(prev => [...new Set([...prev, 3])]);
        engine.down();
      }
      if (e.code === 'Space') {
        e.preventDefault();
        setPressedLanes(prev => [...new Set([...prev, 3])]);
        if (useProfile.getState().options.assist) engine.submit();
        else if (engine.state.dogeza) engine.submit();
        else if (engine.state.angle > 0) engine.submit();
      }
    };

    const up = (e: KeyboardEvent) => {
      if (engine.state.status !== 'playing') return;
      const keys = useProfile.getState().options.keys;
      const i = keys.indexOf(e.key.toLowerCase());
      if (i >= 0) {
        setPressedLanes(prev => prev.filter(l => l !== i));
        engine.submit();
        if (!engine.state.holding) engine.setAngle(0);
      }
      if (e.key === 'ArrowDown') {
        setPressedLanes(prev => prev.filter(l => l !== 3));
      }
      if (e.code === 'Space') {
        setPressedLanes(prev => prev.filter(l => l !== 3));
        if (e.code === 'Space' && engine.state.dogeza && !useProfile.getState().options.assist) engine.submit();
        else if (e.code === 'Space' && engine.state.holding) engine.setAngle(0);
      }
    };

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('blur', blur);
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  const handleLanePress = (laneIdx: number) => {
    if (engine.state.status !== 'playing') return;
    setPressedLanes(prev => [...new Set([...prev, laneIdx])]);
    if (laneIdx === 0) engine.setAngle(45);
    else if (laneIdx === 1) engine.setAngle(90);
    else if (laneIdx === 2) engine.setAngle(120);
    else if (laneIdx === 3) {
      if (options.assist) engine.submit();
      else {
        engine.down();
        engine.down();
      }
    }
  };

  const handleLaneRelease = (laneIdx: number) => {
    if (engine.state.status !== 'playing') return;
    setPressedLanes(prev => prev.filter(l => l !== laneIdx));
    if (laneIdx < 3) {
      engine.submit();
      if (!engine.state.holding) engine.setAngle(0);
    } else if (laneIdx === 3) {
      if (engine.state.dogeza && !options.assist) engine.submit();
      else if (engine.state.holding) engine.setAngle(0);
    }
  };

  const leave = () => { engine.stop(); onExit(); };

  // Vertical highway parameters
  const laneHeight = 220;
  const hitLineY = 175;
  const LEAD_BEATS = 4.0;
  const beatPhase = (s.beat % 1 + 1) % 1;
  const hitPulse = 0.4 + (1 - beatPhase) * 0.5;
  const progressPercent = Math.min(100, Math.max(0, Math.round((s.beat / total) * 100)));

  return (
    <section className="game-page">
      <div className="game-page-heading">
        <button className="text-button" onClick={() => { engine.pause(); }}>
          <ArrowLeft size={17} /> {t.common.backToLobby}
        </button>
        <span>{practice ? t.common.practiceNotice : `CHAPTER ${String(stage.chapter).padStart(2, '0')} / STAGE ${stage.id}`}</span>
        <button className="icon-button" aria-label={t.common.pause} onClick={() => engine.pause()}>
          <Pause size={19} />
        </button>
      </div>

      <div className="game-board">
        <div className="game-hud">
          <div className="trust-panel">
            <span><Heart size={14} /> {t.game.trustLabel}</span>
            <strong>{s.trust}<small>%</small></strong>
            <div className="trust-track"><i style={{ width: `${s.trust}%` }} /></div>
          </div>
          <div className="question-panel">
            <span className="question-label">
              <i /> {event?.isFakeCue ? t.game.fakeCueWarning : t.game.reporterAsking} <span>{t.game.questionNumber} {String(s.eventIndex + 1).padStart(2, '0')}</span>
            </span>
            <p style={{ fontSize: options.subtitleSize }}>{event?.question || t.game.finishNotice}</p>
            {event?.holdBeats && <small>{t.game.holdInstruction(event.holdBeats)}</small>}
          </div>
          <div className="score-panel">
            <span>{t.game.score}</span>
            <strong>{String(s.score).padStart(6, '0')}</strong>
            <small><b>{s.combo}</b> {t.game.combo}</small>
          </div>
        </div>

        <div
          className={`play-scene ${options.mirror ? 'mirrored' : ''}`}
          style={{ backgroundImage: `url(/images/${stage.backgroundId}.jpg)` }}
          onPointerDown={e => {
            if (s.status !== 'playing') return;
            e.currentTarget.setPointerCapture(e.pointerId);
            drag.current = { y: e.clientY, angle: s.angle, swiped: false };
          }}
          onPointerMove={e => {
            if (!drag.current) return;
            const dy = e.clientY - drag.current.y;
            if (target === 'dogeza') {
              if (dy > 70 && !drag.current.swiped) {
                drag.current.swiped = true;
                engine.down();
              }
              return;
            }
            engine.setAngle(drag.current.angle + dy * .65);
          }}
          onPointerUp={() => {
            if (!drag.current) return;
            drag.current = null;
            if (target === 'dogeza' && !engine.state.dogeza) return;
            engine.submit();
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
        >
          <PixiStage background={stage.backgroundId} />
          <div className="scene-label">
            <span className="live-dot" /> LIVE <b>{localizedStage.title}</b>
          </div>
          <div className="scene-tools">
            <button className={debug ? 'active' : ''} aria-label="자세 디버거 표시 전환" onPointerDown={e => e.stopPropagation()} onClick={() => setDebug(!debug)}>
              <ScanLine size={17} /> {debug ? 'DEBUG ON' : 'DEBUG'}
            </button>
            <button aria-label={options.volume ? '소리 끄기' : '소리 켜기'} onPointerDown={e => e.stopPropagation()} onClick={() => setOption('volume', options.volume ? 0 : .5)}>
              {options.volume ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>
          <div className="character-layer">
            <ManagerKim angle={typeof target === 'number' ? target : 0} dogeza={target === 'dogeza'} ghost />
            <ManagerKim angle={s.angle} dogeza={s.dogeza} target={typeof target === 'number' ? target : 125} debug={debug} />
          </div>
          <div className={`judgement ${s.grade === 'MISS' || s.grade === '성급한 사과' ? 'miss' : ''}`} key={`${s.judged}-${s.grade}`}>
            <span>{s.grade === 'PERFECT' ? '✦ ' : s.grade === 'MISS' ? '× ' : ''}{s.grade}</span>
            {s.judged > 0 && <small>{s.error > 0 ? '+' : ''}{Math.round(s.error)} ms</small>}
          </div>
          {s.combo >= 20 && <div className="miracle">{t.game.miracle}</div>}
          <div className="angle-readout" style={{ top: '64px', bottom: 'auto', left: '18px', zIndex: 15 }}>
            <small>CURRENT ANGLE</small>
            <strong>{s.dogeza ? t.game.dogeza : `${Math.round(s.angle)}°`}</strong>
            <span>{t.game.currentPose}</span>
          </div>
          <div className="target-readout" style={{ top: '64px', bottom: 'auto', right: '18px', zIndex: 15 }}>
            <small><Target size={13} /> TARGET ANGLE</small>
            <strong>{target === 'dogeza' ? t.game.dogeza : `${target}°`}</strong>
            <span>{event?.isFakeCue ? t.game.doNotBow : event?.holdBeats ? t.game.holdInstruction(event.holdBeats) : t.game.bowOnLastBeat}</span>
          </div>
          {s.countdown > 0 && s.status === 'playing' && (
            <div className="countdown-overlay">
              <small>{t.game.countdownBreath}</small>
              <strong>{s.countdown}</strong>
              <span>{t.game.countdownBow}</span>
            </div>
          )}

          {/* Apolo Style: Vertical Rhythm Highway (Transparent Glass Overlay) */}
          <div className="vertical-rhythm-highway">
          <div className="vertical-highway-header">
            <div className="header-item">
              <span>BPM</span>
              <strong>{stage.bpm}</strong>
            </div>
            <div className="header-item" style={{ flex: 1, justifyContent: 'center' }}>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>{progressPercent}%</span>
            </div>
            <div className="header-item">
              <span style={{ color: '#38bdf8' }}>{t.game.hitLineLabel}</span>
              {s.combo >= 2 && <strong style={{ color: '#f59e0b' }}>{s.combo} COMBO</strong>}
            </div>
          </div>

          <div className="vertical-lanes-area" style={{ height: `${laneHeight}px` }}>
            {LANES.map(l => {
              const isPressed = pressedLanes.includes(l.lane);
              return (
                <div
                  key={l.lane}
                  className="vertical-lane-col"
                  style={{
                    left: `${l.lane * 25}%`,
                    width: '25%',
                    background: isPressed
                      ? `linear-gradient(180deg, transparent 20%, ${l.glow} 100%)`
                      : 'linear-gradient(180deg, rgba(255,255,255,0.02), transparent 85%)',
                    opacity: isPressed ? 0.45 : 1,
                  }}
                />
              );
            })}

            {/* Falling Notes */}
            {stage.events.map((e, i) => {
              const laneIdx = getLaneIndex(e.targetAngle);
              const laneConfig = LANES[laneIdx];
              const diff = e.beat - s.beat;
              if (diff > LEAD_BEATS + 0.4 || diff < -1.0) return null;

              const isJudged = i < s.eventIndex;
              const isHolding = s.holding && i === s.eventIndex;

              let y = hitLineY - (diff / LEAD_BEATS) * hitLineY;
              let tailTop = 0;
              let tailH = 0;

              if (e.holdBeats) {
                if (isHolding) {
                  y = hitLineY;
                  const remaining = Math.max(0, (e.beat + e.holdBeats) - s.beat);
                  tailH = (remaining / LEAD_BEATS) * hitLineY;
                  tailTop = hitLineY - tailH;
                } else {
                  tailH = (e.holdBeats / LEAD_BEATS) * hitLineY;
                  tailTop = y - tailH;
                }
              }

              const isFake = e.isFakeCue;
              const label = isFake ? '?' : e.targetAngle === 'dogeza' ? (t.game.dogeza || '도게자') : `${e.targetAngle}°`;
              const bgColor = isJudged ? 'rgba(51, 65, 85, 0.45)' : isFake ? 'rgba(220, 38, 38, 0.85)' : laneConfig.color + 'dd';
              const textColor = isJudged ? '#94a3b8' : isFake ? '#ffffff' : '#090d16';
              const glow = isJudged ? 'none' : isFake ? '0 0 16px rgba(220,38,38,0.7)' : `0 0 18px ${laneConfig.glow}`;

              return (
                <div
                  key={e.id}
                  className="vertical-note-container"
                  style={{
                    left: `${laneIdx * 25 + 12.5}%`,
                    top: `${y}px`,
                    opacity: isJudged ? 0.3 : 1,
                  }}
                >
                  {e.holdBeats && !isFake && (
                    <div
                      className="vertical-note-tail"
                      style={{
                        top: `${tailTop - y}px`,
                        height: `${Math.max(4, tailH)}px`,
                        width: '28px',
                        background: `linear-gradient(180deg, ${laneConfig.color}99, ${laneConfig.glow})`,
                        boxShadow: `0 0 12px ${laneConfig.glow}`,
                      }}
                    />
                  )}
                  <div
                    className="vertical-note-bar"
                    style={{
                      width: '74px',
                      height: '34px',
                      backgroundColor: bgColor,
                      color: textColor,
                      boxShadow: glow,
                    }}
                  >
                    {label}
                  </div>
                </div>
              );
            })}

            {/* Hit Line */}
            <div
              className="vertical-hit-line"
              style={{
                top: `${hitLineY}px`,
                background: `rgba(255,255,255,${hitPulse.toFixed(2)})`,
                boxShadow: `0 0 16px rgba(255,255,255,${(hitPulse * 0.9).toFixed(2)})`,
              }}
            />

            {/* Judgment Popups */}
            {popups.map(p => (
              <div
                key={p.id}
                className="animate-popup"
                style={{
                  position: 'absolute',
                  left: `${p.lane * 25 + 12.5}%`,
                  top: `${hitLineY - 32}px`,
                  color: p.color,
                  fontSize: '22px',
                  fontWeight: 900,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  textShadow: '0 2px 10px rgba(0,0,0,0.95)',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {p.grade}
              </div>
            ))}

            {/* Sparks */}
            {sparks.map(sp => (
              <div
                key={sp.id}
                className="hit-spark"
                style={{
                  left: `${sp.lane * 25 + 12.5}%`,
                  top: `${hitLineY}px`,
                  width: '12px',
                  height: '12px',
                  backgroundColor: sp.color,
                  boxShadow: `0 0 10px ${sp.color}`,
                  ['--tx' as any]: sp.tx,
                  ['--ty' as any]: sp.ty,
                }}
              />
            ))}
          </div>

          {/* Key Buttons */}
          <div className="vertical-key-buttons">
            {LANES.map(l => {
              const isPressed = pressedLanes.includes(l.lane);
              return (
                <button
                  key={l.lane}
                  type="button"
                  className={`vertical-key-btn ${isPressed ? 'pressed' : ''}`}
                  style={{
                    boxShadow: isPressed ? `inset 0 0 20px ${l.glow}` : undefined,
                  }}
                  onPointerDown={e => {
                    e.preventDefault();
                    handleLanePress(l.lane);
                  }}
                  onPointerUp={e => {
                    e.preventDefault();
                    handleLaneRelease(l.lane);
                  }}
                  onPointerLeave={() => {
                    handleLaneRelease(l.lane);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <kbd
                      style={{
                        backgroundColor: isPressed ? '#ffffff' : '#1e293b',
                        color: isPressed ? '#0f172a' : l.color,
                        borderColor: isPressed ? '#ffffff' : 'rgba(255,255,255,0.2)',
                      }}
                    >
                      {l.keyDisplay}
                    </kbd>
                    <span className="btn-label" style={{ color: l.color }}>
                      {l.label}
                    </span>
                  </div>
                  <span className="btn-sub">{l.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>

      <div className="game-footnote">
        <span><MoveDown size={15} /> {t.game.touchGuide}</span>
        <span>판정 오차 ±45ms · 각도 ±4° <b>{t.game.fairApology}</b></span>
      </div>

      {(s.status === 'paused' || s.status === 'result') && (
        <div className="modal-shade">
          <div className={`paper-modal result-modal ${s.status === 'result' ? 'result-paper' : ''}`} role="dialog" aria-modal="true" aria-label={s.status === 'paused' ? t.common.pause : t.game.resultEyebrow}>
            <span className="eyebrow">{s.status === 'paused' ? t.game.pausedEyebrow : t.game.resultEyebrow}</span>
            <h2>{s.status === 'paused' ? t.game.pausedTitle : s.trust > 0 ? t.game.survivedTitle : t.game.panicTitle}</h2>
            {s.status === 'result' ? (
              <>
                <div className="result-stamp">{s.trust > 0 ? t.game.survivedStamp : t.game.panicStamp}</div>
                <p>{s.trust > 0 ? t.game.survivedDesc : t.game.panicDesc}</p>
                <div className="result-stats">
                  <div><span>{t.game.finalScore}</span><strong>{s.score.toLocaleString()}</strong></div>
                  <div><span>{t.game.maxCombo}</span><strong>{s.maxCombo}</strong></div>
                  <div><span>{t.game.accuracy}</span><strong>{Math.round(s.accuracy / Math.max(1, s.judged) * 100)}%</strong></div>
                </div>
                <span className="muted">{options.assist ? t.game.assistModeNotice : t.game.normalModeNotice} · {t.game.savedNotice}</span>
              </>
            ) : (
              <p>{t.game.pausedDesc.split('\n').map((line, idx) => <span key={idx}>{line}<br /></span>)}</p>
            )}
            <div className="modal-action-stack">
              {s.status === 'paused' ? (
                <button className="red-button" onClick={() => void engine.resume()}>
                  <Play size={18} /> {t.common.resume}
                </button>
              ) : s.trust > 0 && Number(stage.id) < 30 && (
                <button className="red-button" onClick={() => onNext(stages[Number(stage.id)])}>
                  {t.common.nextStage} <ChevronRight size={19} />
                </button>
              )}
              <button className="outline-button" onClick={() => void engine.start(stage, practice)}>
                <RotateCcw size={17} /> {t.common.retry}
              </button>
              {s.status === 'paused' && (
                <button className="outline-button" onClick={onOptions}>
                  <Settings size={17} /> {t.common.options}
                </button>
              )}
              <button className="text-button" onClick={leave}>
                <ArrowLeft size={16} /> {t.common.backToLobby}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

