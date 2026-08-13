import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import theme from './theme';
import site from './config/site';

const renderApp = () =>
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );

test('muestra el titular del hero', () => {
  renderApp();
  expect(screen.getAllByText(new RegExp(site.hero.title, 'i')).length).toBeGreaterThan(0);
});

test('muestra los planes configurados en el .env', () => {
  renderApp();
  site.pricing.plans.forEach((plan) => {
    expect(screen.getAllByText(plan.name).length).toBeGreaterThan(0);
  });
});
