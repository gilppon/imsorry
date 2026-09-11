import type { Language, TranslationDictionary } from './types';
import { ko } from './ko';
import { en } from './en';
import { ja } from './ja';
import { useProfile } from '../store';
import type { Stage, ApologyEvent } from '../core';

export * from './types';

export const dictionaries: Record<Language, TranslationDictionary> = {
  ko,
  en,
  ja,
};

export function getTranslation(lang: Language): TranslationDictionary {
  return dictionaries[lang] || dictionaries.ko;
}

export function useI18n() {
  const { options, setOption } = useProfile();
  const lang = options.language || 'ko';
  const t = getTranslation(lang);
  const setLanguage = (newLang: Language) => setOption('language', newLang);

  return {
    lang,
    t,
    setLanguage,
  };
}

/**
 * Given a stage, returns a localized copy with titles and event questions translated.
 */
export function getLocalizedStage(stage: Stage, lang: Language): Stage {
  const dict = getTranslation(lang);
  const localizedTitle = dict.stageTitles[stage.id] || stage.title;

  // Determine which pattern key this stage likely uses from original stages.json
  const patternKey = (stage as unknown as { pattern?: string }).pattern || (
    stage.id === '01' ? 'intro' :
    stage.id === '02' ? 'office' :
    stage.id === '03' ? 'rain' :
    stage.events.length > 0 && stage.events.some(e => e.targetAngle === 'dogeza') ? 'rain' :
    stage.events.length > 0 && stage.events.some(e => e.isFakeCue) ? 'office' : 'intro'
  );

  const patternQuestions = dict.patternQuestions[patternKey] || dict.patternQuestions.intro;

  const localizedEvents: ApologyEvent[] = stage.events.map((ev, idx) => {
    const q = (patternQuestions && patternQuestions[idx]) ? patternQuestions[idx] : ev.question;
    return {
      ...ev,
      question: q,
    };
  });

  return {
    ...stage,
    title: localizedTitle,
    events: localizedEvents,
  };
}

/**
 * Returns localized projectile data [emoji, title, description, flight]
 */
export function getLocalizedProjectile(index: number, baseEmoji: string, lang: Language): [string, string, string, string] {
  const dict = getTranslation(lang);
  const item = dict.projectiles[index];
  if (!item) {
    return [baseEmoji, dict.collection.lockedTitle, dict.collection.lockedDescription, dict.collection.unseenFlight];
  }
  return [baseEmoji, item.title, item.description, item.flight];
}
