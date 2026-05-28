import React, { useState, useMemo } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TablePagination,
  Paper, Chip,
} from '@mui/material';
import { useTranslation } from '../i18n/LanguageContext';

const ROWS_PER_PAGE_OPTIONS = [12, 24, 48, 120];
const DEFAULT_ROWS_PER_PAGE = 12;

/**
 * Amortization Schedule — Print-Style Table
 *
 * Clean rows, no heavy borders, subtle hover.
 * Tabular numbers for alignment.
 */
export default function AmortizationTable({ schedule, paymentMethod }) {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const visibleRows = useMemo(() => {
    return schedule.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [schedule, page, rowsPerPage]);

  const fmt = (val) => val.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Box>
      {/* Header row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2" sx={{
          color: 'text.secondary',
          fontWeight: 600,
          fontSize: '0.85rem',
          letterSpacing: '0.02em',
        }}>
          {t('table.title')}
        </Typography>
        <Chip
          label={paymentMethod === 'equal-installment' ? t('method.equalInstallment') : t('method.equalPrincipal')}
          size="small"
          sx={{
            bgcolor: paymentMethod === 'equal-installment' ? '#EDF5F4' : '#FEF7F3',
            color: paymentMethod === 'equal-installment' ? '#0D7377' : '#C2703D',
            fontWeight: 600,
            fontSize: '0.73rem',
            height: 24,
          }}
        />
      </Box>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          maxHeight: 420,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          border: '1px solid #E7E5E4',
          borderRadius: 2,
        }}
      >
        <Table size="small" stickyHeader sx={{ minWidth: 400 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t('table.colPeriod')}</TableCell>
              <TableCell align="right">{t('table.colPayment')}</TableCell>
              <TableCell align="right">{t('table.colPrincipal')}</TableCell>
              <TableCell align="right">{t('table.colInterest')}</TableCell>
              <TableCell align="right">{t('table.colRemaining')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Typography variant="body2" color="text.muted">
                    {t('table.noData')}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              visibleRows.map((row) => (
                <TableRow
                  key={row.month}
                  hover
                  sx={{
                    '&:nth-of-type(odd)': { bgcolor: '#FAF8F5' },
                    '&:last-child td': { borderBottom: 'none' },
                    transition: 'background-color 0.1s ease',
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" className="numeral-tabular" sx={{ fontWeight: 600, fontSize: '0.82rem' }}>
                      {t('table.periodPrefix')} {row.month} {t('table.periodSuffix')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" className="numeral-tabular" sx={{ fontFamily: '"DM Sans", sans-serif' }}>
                      {fmt(row.payment)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" className="numeral-tabular" sx={{ color: '#0D7377', fontWeight: 500 }}>
                      {fmt(row.principal)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" className="numeral-tabular" sx={{ color: '#C2703D', fontWeight: 500 }}>
                      {fmt(row.interest)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      className="numeral-tabular"
                      sx={{ color: row.remaining < 100 ? '#C2703D' : 'text.muted' }}
                    >
                      {fmt(row.remaining)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={schedule.length}
        page={page}
        onPageChange={(_, np) => setPage(np)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        labelRowsPerPage={t('common.perPage')}
        labelDisplayedRows={({ from, to, count }) =>
          t('table.displayedRows', { from, to, count })
        }
        sx={{
          mt: 1.5,
          '.MuiTablePagination-selectIcon': { color: 'text.muted' },
        }}
      />
    </Box>
  );
}
