import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from '../i18n/LanguageContext';

/**
 * Hero Number — Editorial Style
 *
 * The monthly payment is THE design moment.
 * Large Fraunces serif number, minimal decoration,
 * warm cream background, teal accent.
 */
export default function MonthlyPayment({
  monthlyPayment,
  firstMonthPayment,
  lastMonthPayment,
  paymentMethod,
}) {
  const { t } = useTranslation();
  const isEqualInstallment = paymentMethod === 'equal-installment';
  const displayPayment = isEqualInstallment ? monthlyPayment : firstMonthPayment;

  const formatted = displayPayment.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const parts = formatted.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] || '00';

  return (
    <Box sx={{ textAlign: 'center' }}>
      {/* Label */}
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          fontSize: '0.85rem',
          mb: 1.5,
          letterSpacing: '0.03em',
        }}
      >
        {t('hero.title')}
      </Typography>

      {!isEqualInstallment && (
        <Typography
          variant="caption"
          sx={{
            color: 'text.muted',
            display: 'block',
            mb: 1,
            fontSize: '0.78rem',
          }}
        >
          {t('hero.equalPrincipalNote')}
        </Typography>
      )}

      {/* Big Serif Number */}
      <Box sx={{ display: 'inline-flex', alignItems: 'baseline', gap: 4 }}>
        {/* Currency symbol — small, positioned as superscript-ish */}
        <Typography
          component="span"
          sx={{
            fontFamily: '"Fraunces", "Noto Serif SC", serif',
            fontSize: { xs: '1.6rem', md: '2rem' },
            fontWeight: 400,
            color: 'text.secondary',
            alignSelf: 'flex-start',
            mt: { xs: 0.5, md: 0.8 },
          }}
        >
          ¥
        </Typography>

        {/* Integer part — MASSIVE */}
        <Typography
          component="span"
          className="numeral-tabular"
          sx={{
            fontFamily: '"Fraunces", "Noto Serif SC", serif',
            fontSize: {
              xs: 'clamp(2.8rem, 10vw, 5rem)',
              md: 'clamp(3.5rem, 8vw, 6.5rem)',
            },
            fontWeight: 900,
            lineHeight: 1,
            color: 'text.primary',
            letterSpacing: '-0.02em',
          }}
        >
          {integerPart}
        </Typography>

        {/* Decimal — smaller, lighter weight */}
        <Typography
          component="span"
          className="numeral-tabular"
          sx={{
            fontFamily: '"Fraunces", "Noto Serif SC", serif',
            fontSize: { xs: '1.3rem', md: '1.9rem' },
            fontWeight: 300,
            color: 'text.secondary',
            alignSelf: 'flex-start',
            mt: { xs: 0.3, md: 0.6 },
          }}
        >
          .{decimalPart}
        </Typography>
      </Box>

      {/* Per-month label */}
      <Typography
        variant="body2"
        sx={{
          color: 'text.muted',
          mt: 2,
          fontWeight: 500,
          fontSize: '0.88rem',
        }}
      >
        {t('hero.perMonth')}
      </Typography>

      {/* Equal principal range */}
      {!isEqualInstallment && lastMonthPayment !== undefined && lastMonthPayment > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', fontFamily: '"DM Sans", sans-serif' }}
          >
            <Box component="span" sx={{ fontWeight: 700 }} className="numeral-tabular">
              {t('hero.firstMonth')} ¥{firstMonthPayment.toLocaleString('zh-CN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Box>
            {' '}
            <span style={{ color: '#E7E5E4' }}>→</span>
            {' '}
            <Box component="span" sx={{ fontWeight: 700 }} className="numeral-tabular">
              ¥{lastMonthPayment.toLocaleString('zh-CN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Box>
            {' '}
            {t('hero.lastMonth')}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.muted', mt: 0.5, display: 'block' }}>
            {t('hero.monthlyDecrease')}{((firstMonthPayment - lastMonthPayment) / 11).toFixed(2)}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
