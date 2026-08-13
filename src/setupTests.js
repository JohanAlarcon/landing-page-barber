// jest-dom añade matchers para hacer aserciones sobre el DOM.
// https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

/*
 * jsdom no implementa estas APIs del navegador, y tanto MUI (useMediaQuery)
 * como framer-motion (whileInView / layout) las necesitan para renderizar.
 */

if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

class MockObserver {
  observe() {}

  unobserve() {}

  disconnect() {}

  takeRecords() {
    return [];
  }
}

if (!window.IntersectionObserver) {
  window.IntersectionObserver = MockObserver;
  global.IntersectionObserver = MockObserver;
}

if (!window.ResizeObserver) {
  window.ResizeObserver = MockObserver;
  global.ResizeObserver = MockObserver;
}

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}
