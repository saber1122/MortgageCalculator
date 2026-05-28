import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useTranslation, LANGUAGES } from '../i18n/LanguageContext';

/**
 * Language Switcher — Minimal Warm Style
 *
 * Compact flag pills in the top-right corner.
 * No heavy dropdown — inline toggle for 3 languages.
 */
export default function LanguageSwitcher() {
  const { lang, setLang, t } = useTranslation();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 14,
        right: 16,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 0.3,
        bgcolor: '#FFFFFF',
        borderRadius: '20px',
        px: 1.2,
        py: 0.4,
        border: '1px solid #E7E5E4',
        boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
      }}
    >
      {LANGUAGES.map((l) => (
        <IconButton
          key={l.code}
          onClick={() => setLang(l.code)}
          size="small"
          title={t(`lang.${l.code === 'zh-CN' ? 'zh' : l.code}`)}
          sx={{
            width: 34,
            height: 34,
            fontSize: '1rem',
            borderRadius: '50%',
            bgcolor: lang === l.code ? '#EDF5F4' : 'transparent',
            color: lang === l.code ? '#0D7377' : '#A8A29E',
            transition: 'all 0.15s ease',
            '&:hover': {
              bgcolor: lang === l.code ? '#DCEFEF' : '#F5F3F0',
              color: lang === l.code ? '#095A5D' : '#78716C',
            },
            border: lang === l.code ? '1.5px solid #0D7377' : '1.5px solid transparent',
          }}
        >
          {l.flag}
        </IconButton>
      ))}
    </Box>
  );
}
