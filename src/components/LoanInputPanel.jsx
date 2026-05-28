import React from 'react';
import { Box, Typography, Slider, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from '../i18n/LanguageContext';

const CompactInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: 42,
    backgroundColor: '#FAF8F5',
    transition: 'all 0.15s ease',
    '& input': {
      textAlign: 'right',
      fontSize: '1rem',
      padding: '10px 12px',
      fontWeight: 600,
      fontFamily: '"Fraunces", "Noto Serif SC", serif',
      fontVariantNumeric: 'tabular-nums lining-nums',
      color: '#1C1917',
    },
    '&:hover fieldset': {
      borderColor: '#0D7377',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0D7377',
      borderWidth: '2px !important',
    },
  },
}));

/**
 * Loan Input Panel — Clean Minimal Style
 *
 * Label → Input (right-aligned numbers) → Slider → Optional presets
 */
export default function LoanInputPanel({
  labelKey,
  value,
  onChange,
  min,
  max,
  step,
  unitKey,
  helperTextKey,
  sliderStep,
  decimalPlaces = 0,
  showPresets = false,
}) {
  const { t } = useTranslation();

  const handleSliderChange = (event, newValue) => onChange(newValue);

  const handleInputChange = (event) => {
    const raw = event.target.value;
    if (raw === '' || raw === '-') return;
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) onChange(Math.min(max, Math.max(min, parsed)));
  };

  const handleBlur = () => {
    const formatted = parseFloat(value.toFixed(decimalPlaces));
    onChange(Math.min(max, Math.max(min, formatted)));
  };

  return (
    <Box>
      {/* Label + helper in one line */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {t(labelKey)}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.muted' }}>
          {t(helperTextKey)}
        </Typography>
      </Box>

      {/* Number input */}
      <CompactInput
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        size="small"
        fullWidth
        inputProps={{ min, max, step, inputMode: 'decimal' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography variant="body2" sx={{ color: 'text.muted', fontWeight: 400, fontSize: '0.82rem' }}>
                {t(unitKey)}
              </Typography>
            </InputAdornment>
          ),
        }}
      />

      {/* Slider */}
      <Slider
        value={value}
        onChange={handleSliderChange}
        min={min}
        max={max}
        step={sliderStep}
        size="small"
        sx={{ mt: 2, mb: showPresets ? 0.8 : 0 }}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => `${v} ${t(unitKey)}`}
      />

      {/* Quick presets for loan amount */}
      {showPresets && (
        <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap' }}>
          {[50, 100, 200, 300, 500].map((preset) => (
            <Typography
              key={preset}
              onClick={() => onChange(preset)}
              sx={{
                px: 1.3,
                py: 0.35,
                borderRadius: 1.5,
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 500,
                bgcolor: value === preset ? '#0D7377' : 'transparent',
                color: value === preset ? '#FFF' : 'text.muted',
                border: '1px solid',
                borderColor: value === preset ? '#0D7377' : 'divider',
                transition: 'all 0.15s ease',
                '&:hover': {
                  bgcolor: value === preset ? '#095A5D' : '#EDF5F4',
                  borderColor: value === preset ? '#095A5D' : '#0D7377',
                  color: value === preset ? '#FFF' : '#0D7377',
                },
                userSelect: 'none',
              }}
            >
              {t('input.presetWan', { value: preset })}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
