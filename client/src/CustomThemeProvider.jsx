import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from 'prop-types';

function CustomThemeProvider(props) {
  const { children, themeLight } = props;

  const theme = createTheme({
    palette: {
      mode: themeLight ? 'light' : 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

CustomThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  themeLight: PropTypes.bool.isRequired,
};

export default CustomThemeProvider;
