function initDiscover() {
  const visitMessage = document.getElementById('visit-message');
  if (visitMessage) {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);

    if (!lastVisit) {
      visitMessage.textContent = 'Welcome! This is your first visit to our Discover page.';
    } else {
      visitMessage.textContent = `Welcome back! Your last visit was on ${lastVisit}.`;
    }
    localStorage.setItem('lastVisit', formattedDate);
  }

  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => {
    img.src = img.getAttribute('data-src');
    img.removeAttribute('data-src');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDiscover);
} else {
  initDiscover();
}
