export function scrollToTop() {
  try {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  } catch (error) {
    // fallback for older browsers
    window.scrollTo(0, 0);
  }
}
