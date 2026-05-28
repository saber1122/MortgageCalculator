import React, { createContext, useContext, useState, useCallback } from 'react';
import translations from './translations';

const LanguageContext = createContext(null);

/** 支持的语言列表 */
export const LANGUAGES = [
  { code: 'zh-CN', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
];

/**
 * 翻译函数
 * - 静态字符串：t('key') → 直接返回翻译
 * - 模板字符串（函数值）：t('key', { val: 100 }) → 调用函数返回结果
 */
function buildT(lang) {
  const dict = translations[lang] || translations['zh-CN'];
  return (key, params) => {
    const val = dict[key];
    if (!val) return key;
    if (typeof val === 'function') return val(params);
    // 字符串模板替换：{key} → params.key
    if (params && typeof val === 'string') {
      return val.replace(/\{(\w+)\}/g, (_, k) =>
        params[k] !== undefined ? params[k] : `{${k}}`
      );
    }
    return val;
  };
}

/**
 * 语言提供者 — 包裹整个应用
 * 提供：lang（当前语言）, setLang（切换语言）, t（翻译函数）
 */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    // 优先从 localStorage 读取，否则默认中文
    try {
      const saved = localStorage.getItem('mortgage-lang');
      if (saved && translations[saved]) return saved;
    } catch (_) {
      // localStorage 可能不可用
    }
    return 'zh-CN';
  });

  const t = useCallback(buildT(lang), [lang]);

  const handleSetLang = useCallback((newLang) => {
    if (translations[newLang]) {
      setLang(newLang);
      try {
        localStorage.setItem('mortgage-lang', newLang);
      } catch (_) {}
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook：获取翻译上下文
 * 用法：const { t, lang, setLang } = useTranslation();
 */
export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useTranslation must be used within LanguageProvider');
  }
  return ctx;
}

export default LanguageContext;
