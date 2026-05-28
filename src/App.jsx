import React, { useState, useEffect, useCallback } from 'react';
import {
  Container, Box, Typography,
  Grid, Divider,
} from '@mui/material';
import { useTranslation } from './i18n/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import MonthlyPayment from './components/MonthlyPayment';
import LoanInputPanel from './components/LoanInputPanel';
import PaymentChart from './components/PaymentChart';
import AmortizationTable from './components/AmortizationTable';
import PrepaymentCalc from './components/PrepaymentCalc';
import { calculate } from './utils/calculator';

/**
 * App — Editorial Warm Layout
 *
 * Structure (top → bottom):
 *   1. Thin header bar: title + language switch
 *   2. Hero: large serif number (the monthly payment)
 *   3. Input parameters: clean row of inputs + method toggle
 *   4. Summary strip: 4 compact metrics in a row
 *   5. Analysis: chart + table side by side
 *   6. Prepayment calculator
 *   7. Footer: minimal
 */
export default function App() {
  const { t } = useTranslation();

  // -------- 输入状态 --------
  const [loanAmountWan, setLoanAmountWan] = useState(100);
  const [annualRate, setAnnualRate] = useState(4.2);
  const [loanYears, setLoanYears] = useState(30);
  const [paymentMethod, setPaymentMethod] = useState('equal-installment');

  // -------- 计算结果 --------
  const [result, setResult] = useState(null);

  const principal = loanAmountWan * 10000;

  const doCalculate = useCallback(() => {
    if (principal <= 0 || annualRate < 0 || loanYears <= 0) {
      setResult(null);
      return;
    }
    const res = calculate(principal, annualRate, loanYears, paymentMethod);
    setResult(res);
  }, [principal, annualRate, loanYears, paymentMethod]);

  useEffect(() => { doCalculate(); }, [doCalculate]);

  const handleMethodChange = (event, newMethod) => {
    if (newMethod !== null) setPaymentMethod(newMethod);
  };

  /** Format number for display */
  const fmt = (val) => val.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* ===== Language Switcher ===== */}
      <LanguageSwitcher />

      {/* ===== Header Bar ===== */}
      <Box sx={{
        pt: 5, pb: 1, px: 2,
        textAlign: 'center',
      }}>
        <Typography
          variant="overline"
          sx={{
            display: 'block',
            letterSpacing: '0.15em',
            color: 'text.secondary',
            fontWeight: 500,
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            mb: 0.5,
          }}
        >
          Mortgage Calculator · 房贷計算機 · ローン計算
        </Typography>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontFamily: '"Fraunces", "Noto Serif SC", Georgia, serif',
            fontSize: { xs: '1.8rem', md: '2.4rem' },
            fontWeight: 900,
            color: 'text.primary',
            letterSpacing: '-0.02em',
          }}
        >
          房贷计算器
        </Typography>
      </Box>

      {/* ===== Hero: Big Number ===== */}
      <Container maxWidth="md" sx={{ mt: 1, mb: 4 }}>
        <MonthlyPayment
          monthlyPayment={result?.monthlyPayment || 0}
          firstMonthPayment={result?.firstMonthPayment || 0}
          lastMonthPayment={result?.lastMonthPayment}
          paymentMethod={paymentMethod}
        />
      </Container>

      {/* ===== Parameters Section ===== */}
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <Box className="animate-fade-up" sx={{
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          p: { xs: 2.5, md: 4 },
        }}>
          {/* Section label */}
          <Typography
            variant="overline"
            sx={{
              display: 'block',
              letterSpacing: '0.12em',
              color: 'text.secondary',
              fontWeight: 600,
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              mb: 3,
            }}
          >
            {t('panel.title')}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <LoanInputPanel
                labelKey="input.loanAmountLabel"
                value={loanAmountWan}
                onChange={setLoanAmountWan}
                min={1} max={5000} step={1}
                unitKey="input.loanAmountUnit"
                helperTextKey="input.loanAmountHelper"
                sliderStep={1}
                showPresets
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <LoanInputPanel
                labelKey="input.rateLabel"
                value={annualRate}
                onChange={setAnnualRate}
                min={1} max={20} step={0.01}
                unitKey="input.rateUnit"
                helperTextKey="input.rateHelper"
                sliderStep={0.01}
                decimalPlaces={2}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <LoanInputPanel
                labelKey="input.termLabel"
                value={loanYears}
                onChange={setLoanYears}
                min={1} max={30} step={1}
                unitKey="input.termUnit"
                helperTextKey="input.termHelper"
                sliderStep={1}
                decimalPlaces={0}
              />
            </Grid>
          </Grid>

          {/* Method toggle */}
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography
              variant="caption"
              component="label"
              sx={{ display: 'block', mb: 1.5, color: 'text.secondary', fontWeight: 500 }}
            >
              {t('method.label')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
              {/* Custom toggle buttons inline */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                {['equal-installment', 'equal-principal'].map((m) => (
                  <Box
                    key={m}
                    onClick={() => setPaymentMethod(m)}
                    sx={{
                      px: 2.5, py: 1,
                      borderRadius: 2,
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      border: '1px solid',
                      borderColor: paymentMethod === m ? 'primary.main' : 'divider',
                      backgroundColor: paymentMethod === m ? 'primary.main' : 'transparent',
                      color: paymentMethod === m ? '#FFF' : 'text.secondary',
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        backgroundColor: paymentMethod === m ? 'primary.dark' : '#EDF5F4',
                        borderColor: paymentMethod === m ? 'primary.dark' : 'primary.main',
                      },
                      userSelect: 'none',
                    }}
                  >
                    {t(m === 'equal-installment' ? 'method.equalInstallment' : 'method.equalPrincipal')}
                  </Box>
                ))}
              </Box>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', fontSize: '0.82rem', ml: 'auto' }}
              >
                {paymentMethod === 'equal-installment'
                  ? t('method.installmentDesc')
                  : t('method.principalDesc')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* ===== Summary Strip ===== */}
      {result && (
        <Container maxWidth="md" sx={{ mb: 4 }} className="animate-fade-up animate-delay-1">
          <Grid container spacing={1.5}>
            {[
              { label: t('summary.totalInterest'), value: fmt(result.totalInterest), accent: '#E8A87C' },
              { label: t('summary.totalPayment'), value: fmt(result.totalPayment), accent: '#0D7377' },
              { label: t('summary.principal'), value: fmt(principal), accent: 'text.primary' },
              { label: t('summary.periods'), value: String(loanYears * 12), accent: 'text.primary', suffix: ` ${t('summary.periodUnit')}` },
            ].map((item, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <Box sx={{
                  textAlign: 'center',
                  py: 2,
                  px: 1,
                  borderRadius: 2,
                  bgcolor: i === 0 ? '#FEF7F3' : i === 1 ? '#EDF5F4' : 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.02em' }}>
                    {item.label}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: '"Fraunces", "Noto Serif SC", serif',
                      fontWeight: 700,
                      color: item.accent,
                      mt: 0.5,
                      fontSize: { xs: '1.1rem', md: '1.35rem' },
                    }}
                    className="numeral-tabular numeral-transition"
                  >
                    {item.value}{item.suffix || ''}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* ===== Analysis: Chart + Table ===== */}
      {result && (
        <Container maxWidth="md" sx={{ mb: 4 }} className="animate-fade-up animate-delay-2">
          <Box sx={{
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            p: { xs: 2.5, md: 4 },
          }}>
            <Typography
              variant="overline"
              sx={{
                display: 'block',
                letterSpacing: '0.12em',
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                mb: 3,
              }}
            >
              {t('analysis.title')}
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={5}>
                <PaymentChart totalPrincipal={principal} totalInterest={result.totalInterest} />
              </Grid>
              <Grid item xs={12} md={7}>
                <AmortizationTable schedule={result.schedule} paymentMethod={paymentMethod} />
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}

      {/* ===== Prepayment ===== */}
      <Container maxWidth="md" sx={{ mb: 5 }} className="animate-fade-up animate-delay-3">
        <Box sx={{
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          p: { xs: 2.5, md: 4 },
        }}>
          <Typography
            variant="overline"
            sx={{
              display: 'block',
              letterSpacing: '0.12em',
              color: 'text.secondary',
              fontWeight: 600,
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              mb: 3,
            }}
          >
            {t('prepay.title')}
          </Typography>
          <PrepaymentCalc
            principal={principal}
            annualRate={annualRate}
            loanYears={loanYears}
            paymentMethod={paymentMethod}
            currentSchedule={result?.schedule || []}
          />
        </Box>
      </Container>

      {/* ===== Footer ===== */}
      <Box component="footer" sx={{
        textAlign: 'center',
        py: 4,
        px: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}>
        <Typography variant="caption" sx={{ color: 'text.muted', lineHeight: 2, display: 'block' }}>
          {t('footer.text')}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.muted' }}>
          {t('footer.disclaimer')}
        </Typography>
      </Box>
    </Box>
  );
}
