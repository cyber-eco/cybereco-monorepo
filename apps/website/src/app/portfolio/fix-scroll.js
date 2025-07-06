// Aggressive fix to ensure scrolling works on portfolio page
if (typeof window !== 'undefined') {
  // Function to force enable scrolling
  const enableScroll = () => {
    // Clear any stuck navigation state - this is critical!
    localStorage.removeItem('navigation-menu-open');
    localStorage.removeItem('website-menu-state');
    localStorage.removeItem('navigation-mobile-menu'); // Another possible key
    
    // Force close any mobile menu by dispatching event
    window.dispatchEvent(new Event('closeMobileMenu'));
    
    // Force body and html to be scrollable with !important
    const bodyStyle = document.body.style;
    bodyStyle.setProperty('overflow', 'visible', 'important');
    bodyStyle.setProperty('overflow-y', 'auto', 'important');
    bodyStyle.setProperty('overflow-x', 'hidden', 'important');
    bodyStyle.setProperty('position', 'static', 'important');
    bodyStyle.setProperty('height', 'auto', 'important');
    bodyStyle.setProperty('touch-action', 'auto', 'important');
    
    const htmlStyle = document.documentElement.style;
    htmlStyle.setProperty('overflow', 'visible', 'important');
    htmlStyle.setProperty('overflow-y', 'auto', 'important');
    htmlStyle.setProperty('position', 'static', 'important');
    htmlStyle.setProperty('height', 'auto', 'important');
    
    // Remove any classes that might prevent scrolling
    document.body.classList.remove('mobile-menu-open');
    document.body.classList.remove('no-scroll');
    document.body.classList.remove('overflow-hidden');
    
    // iOS specific fixes
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      bodyStyle.setProperty('-webkit-overflow-scrolling', 'touch', 'important');
      htmlStyle.setProperty('-webkit-overflow-scrolling', 'touch', 'important');
    }
  };
  
  // Run immediately
  enableScroll();
  
  // Run after DOM is ready
  if (document.readyState !== 'loading') {
    enableScroll();
  } else {
    document.addEventListener('DOMContentLoaded', enableScroll);
  }
  
  // Run after a short delay to override any late-loading styles
  setTimeout(enableScroll, 100);
  setTimeout(enableScroll, 500);
  
  // Monitor for changes that might disable scrolling
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && 
          (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
        const target = mutation.target;
        if (target === document.body || target === document.documentElement) {
          // Check if scrolling was disabled
          const style = window.getComputedStyle(target);
          if (style.overflow === 'hidden' || style.position === 'fixed') {
            console.log('Scroll disabled detected, re-enabling...');
            enableScroll();
          }
        }
      }
    });
  });
  
  // Start observing
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['style', 'class']
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['style', 'class']
  });
  
  // Cleanup function
  window.__cleanupPortfolioScroll = () => {
    observer.disconnect();
  };
}