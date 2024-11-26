export const tooltipInit = (() => {
  document.addEventListener('DOMContentLoaded', () => {
    const tooltip = document.querySelector('.tooltip');
    const input = tooltip.querySelector('input');
    const tooltipText = tooltip.querySelector('.tooltip-text');
  
    // Show tooltip on hover and focus
    ['mouseenter', 'focus'].forEach(event => {
      input.addEventListener(event, () => {
        tooltipText.style.visibility = 'visible';
        tooltipText.style.opacity = '1';
        tooltipText.setAttribute('aria-hidden', 'false');
      });
    });
  
    // Hide tooltip on mouse leave and blur
    ['mouseleave', 'blur'].forEach(event => {
      input.addEventListener(event, () => {
        tooltipText.style.visibility = 'hidden';
        tooltipText.style.opacity = '0';
        tooltipText.setAttribute('aria-hidden', 'true');
      });
    });
  
    // Ensure tooltip can be read by screen readers
    input.addEventListener('keydown', (e) => {
      // Optional: Add keyboard interaction if needed
      if (e.key === 'Enter' || e.key === ' ') {
        // Additional interaction logic if required
      }
    });
  });
})();