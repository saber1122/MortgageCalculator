import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LanguageProvider } from './i18n/LanguageContext';
import App from './App';
import './index.css';

/**
 * Editorial Warm Theme — Light, warm cream base,
 * deep teal accent, serif display font for numbers.
 * The opposite of generic dark-blue AI dashboards.
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0D7377',       /* deep teal */
      light: '#14989C',
      dark: '#095A5D',
    },
    secondary: {
      main: '#78716C',       /* warm gray */
      light: '#A8A29E',
      dark: '#57534E',
    },
    background: {
      default: '#FAF8F5',     /* warm cream */
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1C1917',     /* warm near-black */
      secondary: '#78716C',   /* warm gray */
      muted: '#A8A29E',       /* light warm gray */
    },
    divider: '#E7E5E4',
  },
  typography: {
    fontFamily: '"DM Sans", "Noto Sans SC", "Noto Sans JP", system-ui, sans-serif',
    h1: { fontFamily: '"Fraunces", "Noto Serif SC", Georgia, serif', fontWeight: 900 },
    h2: { fontFamily: '"Fraunces", "Noto Serif SC", Georgia, serif', fontWeight: 700 },
    h3: {
      fontFamily: '"Fraunces", "Noto Serif SC", Georgia, serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    body2: { color: '#78716C' },
    caption: { color: '#A8A29E', fontSize: '0.8rem' },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FAF8F5',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          border: '1px solid #E7E5E4',
          borderRadius: 12,
          boxShadow: 'none',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#0D7377',
          height: 4,
          padding: '12px 0',
        },
        thumb: {
          width: 20,
          height: 20,
          backgroundColor: '#FFFFFF',
          border: '2.5px solid #0D7377',
          boxShadow: '0 1px 4px rgba(13,115,119,0.2)',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(13,115,119,0.3)',
          },
          '&.Mui-active': {
            boxShadow: '0 2px 8px rgba(13,115,119,0.3)',
          },
        },
        track: {
          height: 4,
          borderRadius: 2,
        },
        rail: {
          height: 4,
          borderRadius: 2,
          backgroundColor: '#E7E5E4',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#FAF8F5',
            '& fieldset': {
              borderColor: '#D6D3D1',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: '#0D7377',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0D7377',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#78716C',
            '&.Mui-focused': { color: '#0D7377' },
          },
          '& input::placeholder': {
            color: '#A8A29E',
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: '#78716C',
          border: '1px solid #D6D3D1',
          borderRadius: 8,
          padding: '8px 20px',
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&.Mui-selected': {
            color: '#FFFFFF',
            backgroundColor: '#0D7377',
            borderColor: '#0D7377',
            '&:hover': {
              backgroundColor: '#095A5D',
            },
          },
          '&:hover:not(.Mui-selected)': {
            backgroundColor: '#EDF5F4',
            borderColor: '#0D7377',
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          gap: 8,
          '& .MuiToggleButtonGroup-grouped': {
            margin: 0,
            borderRadius: 8,
            border: '1px solid #D6D3D1',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: 'transparent',
            color: '#78716C',
            fontWeight: 600,
            fontSize: '0.72rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            borderBottom: '2px solid #0D7377',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: '#F5F3F0',
          paddingTop: 14,
          paddingBottom: 14,
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: { color: '#78716C' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '0.75rem',
          letterSpacing: '0.02em',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#0D7377',
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
