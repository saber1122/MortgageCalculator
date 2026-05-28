import React, { useState, useMemo } from 'react';
import {
  Box, Typography, TextField,
  ToggleButtonGroup, ToggleButton,
  Grid, Divider,
} from '@mui/material';
import { calculatePrepayment } from '../utils/calculator';
import { useTranslation } from '../i18n/LanguageContext';

/**
 * Prepayment Calculator — Clean Editorial Style
 *
 * Simple input row → result cards.
 * Green accent for savings (positive emotion).
 */
export default function PrepaymentCalc({
  principal,
  annualRate,
  loanYears,
  paymentMethod,
  currentSchedule,
}) {
  const { t } = useTranslation();

  const [prepayAmountWan, setPrepayAmountWan] = useState(10);
  const [prepayMonth, setPrepayMonth] = useState(36);
  const [mode, setMode] = useState('reduce-payment');

  const prepayAmount = prepayAmountWan * 10000;
  const totalMonths = loanYears * 12;
  const remainingAtMonth = currentSchedule[prepayMonth - 1]?.remaining || principal;
  const isValidAmount = prepayAmount >= 0 && prepayAmount <= remainingAtMonth;
  const isValidMonth = prepayMonth >= 1 && prepayMonth <= totalMonths;

  const result = useMemo(() => {
    if (!isValidAmount || !isValidMonth || prepayAmount <= 0) return null;
    return calculatePrepayment(
      principal, annualRate, loanYears, paymentMethod,
      prepayAmount, prepayMonth, mode
    );
  }, [principal, annualRate, loanYears, paymentMethod, prepayAmount, prepayMonth, mode,
      isValidAmount, isValidMonth]);

  const handleAmountChange = (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val >= 0) setPrepayAmountWan(Math.min(val, remainingAtMonth / 10000));
    else if (e.target.value === '') setPrepayAmountWan(0);
  };

  const handleMonthChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) setPrepayMonth(Math.min(val, totalMonths));
    else if (e.target.value === '') setPrepayMonth(1);
  };

  const fmt = (val) => val.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Box>
      <Grid container spacing={2.5} alignItems="flex-end">
        {/* Amount input */}
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>
            {t('prepay.amountLabel')}
          </Typography>
          <TextField
            value={prepayAmountWan}
            onChange={handleAmountChange}
            size="small"
            fullWidth
            type="number"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#FAF8F5',
                '& input': {
                  fontFamily: '"Fraunces", "Noto Serif SC", serif',
                  fontVariantNumeric: 'tabular-nums lining-nums',
                  fontWeight: 600,
                },
              },
            }}
            inputProps={{ min: 0, step: 1 }}
            InputProps={{
              endAdornment: (
                <Typography variant="body2" sx={{ color: 'text.muted', fontSize: '0.82rem' }}>
                  {t('prepay.amountUnit')}
                </Typography>
              ),
            }}
            error={!isValidAmount}
            helperText={
              !isValidAmount
                ? t('prepay.amountExceeds')
                : t('prepay.remainingPrincipal', { val: fmt(remainingAtMonth) })
            }
          />
        </Grid>

        {/* Month input */}
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>
            {t('prepay.monthLabel')}
          </Typography>
          <TextField
            value={prepayMonth}
            onChange={handleMonthChange}
            size="small"
            fullWidth
            type="number"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#FAF8F5',
                '& input': {
                  fontFamily: '"Fraunces", "Noto Serif SC", serif',
                  fontVariantNumeric: 'tabular-nums lining-nums',
                  fontWeight: 600,
                },
              },
            }}
            inputProps={{ min: 1, max: totalMonths, step: 1 }}
            InputProps={{
              endAdornment: (
                <Typography variant="body2" sx={{ color: 'text.muted', fontSize: '0.82rem' }}>
                  {t('prepay.monthUnit')}
                </Typography>
              ),
            }}
            error={!isValidMonth}
            helperText={
              !isValidMonth
                ? t('prepay.monthExceeds')
                : t('prepay.monthRange', { total: totalMonths })
            }
          />
        </Grid>

        {/* Mode toggle */}
        <Grid item xs={12} sm={4}>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(e, m) => m !== null && setMode(m)}
            size="small"
            fullWidth
          >
            <ToggleButton value="reduce-payment" sx={{ py: 1.1 }}>
              {t('prepay.reducePayment')}
              <Typography variant="caption" display="block" fontSize="0.65rem">
                {t('prepay.keepTerm')}
              </Typography>
            </ToggleButton>
            <ToggleButton value="reduce-term" sx={{ py: 1.1 }}>
              {t('prepay.reduceTerm')}
              <Typography variant="caption" display="block" fontSize="0.65rem">
                {t('prepay.keepPayment')}
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>

      {/* Result */}
      {result && (
        <Box sx={{ mt: 3.5 }}>
          <Divider sx={{ borderColor: '#E7E5E4', mb: 2.5 }} />

          {/* Savings highlight */}
          <Box sx={{
            bgcolor: '#ECFDF5',
            borderRadius: 2,
            p: 2,
            textAlign: 'center',
            mb: 2.5,
          }}>
            <Typography variant="body2" sx={{ color: '#059669', fontWeight: 700 }} className="numeral-tabular">
              {t('prepay.savedInterestTip', { val: fmt(result.savedInterest) })}
            </Typography>
          </Box>

          {/* Metrics grid */}
          <Grid container spacing={1.5}>
            {[
              { label: t('prepay.newPrincipal'), value: result.newPrincipal, color: '#78716C' },
              { label: t('prepay.newPayment'), value: result.newMonthlyPayment, color: '#0D7377' },
              { label: t('prepay.savedInterest'), value: result.savedInterest, color: '#059669' },
              {
                label: mode === 'reduce-term' ? t('prepay.newTerm') : t('prepay.remainingTerm'),
                valueText: mode === 'reduce-term'
                  ? `${result.newTerm?.toFixed?.(1)} ${t('common.year')}`
                  : `${((loanYears * 12 - prepayMonth) / 12).toFixed(1)} ${t('common.year')}`,
                color: '#78716C',
                isText: true,
              },
            ].map((item, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <Box sx={{
                  textAlign: 'center',
                  p: 1.8,
                  bgcolor: '#FAF8F5',
                  borderRadius: 2,
                  border: '1px solid #E7E5E4',
                }}>
                  <Typography variant="caption" sx={{ color: 'text.muted', fontWeight: 500, fontSize: '0.72rem' }}>
                    {item.label}
                  </Typography>
                  <Typography
                    variant="h6"
                    className="numeral-tabular"
                    sx={{
                      fontWeight: 700,
                      color: item.color,
                      mt: 0.3,
                      fontSize: { xs: '1rem', md: '1.15rem' },
                      fontFamily: item.isText ? undefined : '"Fraunces", "Noto Serif SC", serif',
                    }}
                  >
                    {item.isText ? item.valueText : `¥${fmt(item.value)}`}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Empty hint */}
      {!result && prepayAmount > 0 && (
        <Typography variant="body2" color="text.muted" sx={{ mt: 2.5, textAlign: 'center', fontSize: '0.85rem' }}>
          {t('prepay.hint')}
        </Typography>
      )}
    </Box>
  );
}
