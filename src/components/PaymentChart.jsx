import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTranslation } from '../i18n/LanguageContext';

const COLORS = {
  principal: '#0D7377',   /* deep teal */
  interest: '#E8A87C',    /* warm peach */
};

function CustomTooltip({ active, payload }) {
  const { t } = useTranslation();
  if (active && payload?.length) {
    const d = payload[0];
    return (
      <Box sx={{
        bgcolor: '#FFF',
        border: '1px solid #E7E5E4',
        borderRadius: 2,
        p: 1.5,
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      }}>
        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.82rem', color: d.payload.fill }}>
          {d.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 700, fontFamily: '"Fraunces", "Noto Serif SC", serif' }}
          className="numeral-tabular"
        >
          ¥ {d.value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Typography>
      </Box>
    );
  }
  return null;
}

function renderLegend({ payload }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 1.5 }}>
      {payload.map((entry, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '3px', bgcolor: entry.color }} />
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.85rem' }}>
            {entry.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

/**
 * Payment Chart — Clean Donut
 *
 * Teal (principal) + Peach (interest).
 * Center text shows total in a clean way.
 * No heavy decorations.
 */
export default function PaymentChart({ totalPrincipal, totalInterest }) {
  const { t } = useTranslation();

  const data = [
    { name: t('chart.principalName'), value: totalPrincipal, fill: COLORS.principal },
    { name: t('chart.interestName'), value: totalInterest, fill: COLORS.interest },
  ];

  const total = totalPrincipal + totalInterest;

  return (
    <Box sx={{ width: '100%', height: 320 }}>
      {/* Title */}
      <Typography variant="subtitle2" sx={{
        color: 'text.muted',
        mb: 2,
        textAlign: 'center',
        fontWeight: 500,
        letterSpacing: '0.02em',
        fontSize: '0.8rem',
      }}>
        {t('chart.ratioTitle')}
      </Typography>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={5}
            dataKey="value"
            strokeWidth={0}
            animationBegin={200}
            animationDuration={800}
          >
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={entry.fill} stroke="#FFFFFF" strokeWidth={3} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>

      {/* Center summary */}
      <Box sx={{
        position: 'relative',
        mt: '-160px',
        mb: '90px',
        textAlign: 'center',
        pointerEvents: 'none',
      }}>
        <Typography variant="caption" sx={{ color: 'text.muted', fontSize: '0.72rem' }}>
          {t('chart.total')}
        </Typography>
        <Typography variant="h6" sx={{
          fontWeight: 700,
          fontFamily: '"Fraunces", "Noto Serif SC", serif',
          color: 'text.primary',
          mt: 0.25,
        }} className="numeral-tabular">
          ¥{(total / 10000).toFixed(2)}{t('chart.wanUnit')}
        </Typography>
      </Box>
    </Box>
  );
}
