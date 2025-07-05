// Temporary fix to ensure scrolling works
if (typeof window \!== 'undefined') {
  // Clear any stuck navigation state
  localStorage.removeItem('navigation-menu-open');
  localStorage.removeItem('website-menu-state');
  
  // Force body to be scrollable
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.height = '';
  
  // Remove any classes that might prevent scrolling
  document.body.classList.remove('mobile-menu-open');
  document.documentElement.style.overflow = '';
}
EOF < /dev/null