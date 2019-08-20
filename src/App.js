import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { ResiftProvider } from 'resift';
import dataService from './dataService';
import ResiftRentals from 'components/ResiftRentals';

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Source Sans Pro', sans-serif",
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#f00',
    },
    secondary: {
      main: '#fff',
    },
  },
});

function App() {
  return (
    <ResiftProvider dataService={dataService}>
      <ThemeProvider theme={theme}>
        <ResiftRentals />
      </ThemeProvider>
    </ResiftProvider>
  );
}

export default App;
