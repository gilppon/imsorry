export type Language = 'ko' | 'en' | 'ja';

export function detectLanguage(): Language {
  if (typeof navigator === 'undefined') return 'ko';
  const raw = (navigator.language || '').toLowerCase();
  if (raw.startsWith('ja')) return 'ja';
  if (raw.startsWith('en')) return 'en';
  if (raw.startsWith('ko')) return 'ko';
  return 'ko';
}

export interface TranslationDictionary {
  common: {
    backToLobby: string;
    pause: string;
    resume: string;
    retry: string;
    nextStage: string;
    options: string;
    close: string;
    loading: string;
    live: string;
    practice: string;
    practiceNotice: string;
  };
  nav: {
    stages: string;
    collection: string;
    options: string;
    howto: string;
    editor: string;
    about: string;
  };
  hero: {
    urgentNews: string;
    urgentHeadline: string;
    onAir: string;
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    startNext: string;
    startFirst: string;
    howToPlay: string;
    keyboard: string;
    mouseTouch: string;
    gamepad: string;
    urgentConference: string;
    characterRole: string;
    characterName: string;
    characterCatchphrase: string;
    fictionBadge: string;
  };
  ticker: {
    badge: string;
    item1Title: string;
    item1Desc: string;
    item2Title: string;
    item2Desc: string;
    end: string;
  };
  bottomStrip: {
    noFightTitle: string;
    noFightDesc: string;
    earphonesTitle: string;
    earphonesDesc: string;
    earphonesButton: string;
    accessTitle: string;
    accessDesc: string;
    accessButton: string;
  };
  daily: {
    sectionIndex: string;
    title: string;
    subtitle: string;
    allStages: string;
    guideTitle: string;
    guideTipBadge: string;
    guideHeading1: string;
    guideHeading2: string;
    guideSubtitle: string;
    guideDescription: string;
    practiceButton: string;
  };
  browse: {
    kicker: string;
    title: string;
    subtitle: string;
    description: string;
    survivalCount: string;
    chapters: string[];
    sampleNotice: string;
    startConference: string;
    clearedBadge: string;
    bestScore: string;
  };
  collection: {
    kicker: string;
    title: string;
    subtitle: string;
    description: string;
    collectedCount: string;
    lockedTitle: string;
    lockedDescription: string;
    unseenFlight: string;
    detailTitleLocked: string;
    detailDescLocked: string;
    detailFlightLocked: string;
    backToConference: string;
    flightTypeLabel: string;
    harmlessProp: string;
  };
  game: {
    trustLabel: string;
    fakeCueWarning: string;
    reporterAsking: string;
    questionNumber: string;
    holdInstruction: (beats: number) => string;
    finishNotice: string;
    score: string;
    combo: string;
    pausedTitle: string;
    pausedEyebrow: string;
    pausedDesc: string;
    resultEyebrow: string;
    survivedTitle: string;
    panicTitle: string;
    survivedStamp: string;
    panicStamp: string;
    survivedDesc: string;
    panicDesc: string;
    finalScore: string;
    maxCombo: string;
    accuracy: string;
    assistModeNotice: string;
    normalModeNotice: string;
    savedNotice: string;
    tapPrompt: string;
    countdownBreath: string;
    countdownBow: string;
    miracle: string;
    currentPose: string;
    doNotBow: string;
    bowOnLastBeat: string;
    hitLineLabel: string;
    touchGuide: string;
    fairApology: string;
    dogeza: string;
    holdConfirm: string;
  };
  options: {
    title: string;
    kicker: string;
    tabs: {
      audio: string;
      access: string;
      input: string;
    };
    audio: {
      masterVolume: string;
      audioBeat: string;
      audioBeatDetail: string;
      visualBeat: string;
      visualBeatDetail: string;
      latencyTitle: string;
      latencyDesc: string;
      calibrateButton: string;
    };
    calibration: {
      guide: string;
      tap: string;
      complete: (ms: number) => string;
      restart: string;
      start: string;
      hint: string;
    };
    access: {
      reducedMotion: string;
      reducedMotionDetail: string;
      reducedFlash: string;
      reducedFlashDetail: string;
      particles: string;
      particlesDetail: string;
      highContrast: string;
      highContrastDetail: string;
      mirror: string;
      mirrorDetail: string;
      subtitleSize: string;
    };
    input: {
      assist: string;
      assistDetail: string;
      snap: string;
      snapDetail: string;
      keyBindings: string;
      pressNewKey: string;
      angleBow: (angle: number) => string;
      inputGuide: string;
    };
    savedNote: string;
  };
  howto: {
    title: string;
    kicker: string;
    poses: {
      ready: string;
      polite: string;
      deep: string;
      extreme: string;
    };
    steps: {
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
      step4Title: string;
      step4Desc: string;
    };
    notice: string;
  };
  about: {
    title: string;
    kicker: string;
    tag: string;
    badgeNote: string;
    headline: string;
    bio: string;
    disclaimer: string;
  };
  credits: {
    title: string;
    tagline1: string;
    tagline2: string;
    gameTitle: string;
    info: string;
    disclaimer: string;
    confirmButton: string;
  };
  editor: {
    title: string;
    kicker: string;
    subtitle: string;
    bpm: string;
    beat: string;
    targetAngle: string;
    question: string;
    defaultQuestion: string;
    addNote: string;
    tapBeat: string;
    dogeza: string;
    beatUnit: string;
    deleteNote: string;
    exportJson: string;
    testPlay: string;
    errors: {
      requireQuestion: string;
      beatInterval: string;
      invalidInput: string;
      exportFail: string;
    };
  };
  projectiles: Record<number, { title: string; description: string; flight: string }>;
  stageTitles: Record<string, string>;
  patternQuestions: Record<string, string[]>;
}
