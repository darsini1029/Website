// Navigation and Footer Update Script
const pages = [
    'programming.html',
    'web-development.html', 
    'frontend.html',
    'backend.html',
    'database.html',
    'devops.html',
    'mobile.html'
];

// This script shows the pattern for updating all pages
// Each page needs:
// 1. Updated navigation with nav-controls div
// 2. Updated footer with real social links
// 3. Updated external links in cards

console.log('Navigation structure needed:');
console.log(`
<div class="nav-controls">
    <button class="theme-toggle">🌙 Theme</button>
    <div class="mobile-menu">
        <span>☰</span>
    </div>
</div>
`);

console.log('Footer structure needed:');
console.log(`
<div class="social-links">
    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">🐙</a>
    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">💼</a>
    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">🐦</a>
    <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">📺</a>
</div>
`);
