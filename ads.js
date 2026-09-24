/* ============================================
   THE AETHER WALLPAPERS — Ads Loader
   Smart Trigger — Only on Wallpaper Clicks
   ============================================ */

(function() {
'use strict';

console.log('ADS: Loading...');

/* ============================================
   1. SOCIAL BAR — Floating (auto)
   ============================================ */
(function() {
var s = document.createElement('script');
s.src = 'https://pl31472209.profitableratecpmnetwork.com/f3/a8/7b/f3a87b261c064722a7494454d4feec1d.js';
s.async = true;
s.setAttribute('data-cfasync', 'false');
document.head.appendChild(s);
console.log('ADS: Social Bar loaded');
})();

/* ============================================
   2. POPUNDER — Only on Wallpaper Card Clicks
   ============================================ */
var wallpaperClicks = 0;
var popunderLoaded = false;

document.addEventListener('click', function(e) {

/* Check if clicked on wallpaper card */
var card = e.target.closest('.wc');

/* If NOT clicked on wallpaper — return */
if (!card) return;

wallpaperClicks++;
console.log('ADS: Wallpaper opened ' + wallpaperClicks + '/5');

/* After 5 wallpaper opens */
if (wallpaperClicks >= 5 && !popunderLoaded) {
popunderLoaded = true;

var s = document.createElement('script');
s.src = 'https://pl31472208.profitableratecpmnetwork.com/ca/47/c7/ca47c76f9beea26720e6209174e0a947.js';
s.async = true;
s.setAttribute('data-cfasync', 'false');
document.head.appendChild(s);

console.log('ADS: Popunder loaded after 5 wallpapers');
}
}, { passive: true });

/* ============================================
   3. BANNER CODES
   ============================================ */

/* TOP BANNER — 320×50 */
var AD_TOP = '<script type="text/javascript">atOptions={"key":"3975b34e0711a736129dd4dd27f0584e","format":"iframe","height":50,"width":320,"params":{}};<\/script><script type="text/javascript" src="https://www.highrevenueformat.com/3975b34e0711a736129dd4dd27f0584e/invoke.js"><\/script>';

/* MIDDLE BANNER — 300×250 (Highest CPM) */
var AD_MIDDLE = '<script type="text/javascript">atOptions={"key":"f7a7c3a714d99385169013b0dec763f7","format":"iframe","height":250,"width":300,"params":{}};<\/script><script type="text/javascript" src="https://www.highrevenueformat.com/f7a7c3a714d99385169013b0dec763f7/invoke.js"><\/script>';

/* BOTTOM BANNER — 728×90 */
var AD_BOTTOM = '<script type="text/javascript">atOptions={"key":"00d77ef15a41abcc98874aae42b070b4","format":"iframe","height":90,"width":728,"params":{}};<\/script><script type="text/javascript" src="https://www.highrevenueformat.com/00d77ef15a41abcc98874aae42b070b4/invoke.js"><\/script>';

/* ============================================
   4. INJECT TOP + BOTTOM
   ============================================ */
function injectAds() {

var top = document.getElementById('ad-top');
if (top) {
top.innerHTML = AD_TOP;
top.classList.add('has-code');
top.style.display = 'flex';
console.log('ADS: Top banner');
}

var bot = document.getElementById('ad-bottom');
if (bot) {
bot.innerHTML = AD_BOTTOM;
bot.classList.add('has-code');
bot.style.display = 'flex';
console.log('ADS: Bottom banner');
}

document.body.classList.add('ads-on', 'has-ad-code');
}

if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', injectAds);
} else {
injectAds();
}

/* ============================================
   5. MIDDLE AD — Har 10 wallpapers ke baad
   ============================================ */
window.AETHER_ADS = {
enabled: true,
afterCard: function(index, card, fragment) {

if ((index + 1) % 10 === 0) {

var ad = document.createElement('div');
ad.className = 'ads-mid has-code';
ad.style.gridColumn = '1/-1';
ad.style.display = 'flex';
ad.innerHTML = AD_MIDDLE;
fragment.appendChild(ad);

console.log('ADS: Middle banner at ' + (index + 1));
}

}
};

console.log('ADS: Ready');
})();
