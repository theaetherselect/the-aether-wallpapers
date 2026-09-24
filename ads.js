/* ============================================
   THE AETHER WALLPAPERS — Ads Loader
   Full Working Code
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
   2. POPUNDER — 1 time per visitor
   After 10 wallpaper clicks
   ============================================ */
var wallpaperClicks = 0;
var popunderLoaded = false;

try {
if (sessionStorage.getItem('popunder_shown') === '1') {
popunderLoaded = true;
console.log('ADS: Popunder already shown');
}
} catch(e) {}

document.addEventListener('click', function(e) {
var card = e.target.closest('.wc');
if (!card) return;

wallpaperClicks++;
console.log('ADS: Wallpaper ' + wallpaperClicks + '/10');

if (wallpaperClicks >= 10 && !popunderLoaded) {
popunderLoaded = true;

try { sessionStorage.setItem('popunder_shown', '1'); } catch(e) {}

var s = document.createElement('script');
s.src = 'https://pl31472208.profitableratecpmnetwork.com/ca/47/c7/ca47c76f9beea26720e6209174e0a947.js';
s.async = true;
s.setAttribute('data-cfasync', 'false');
document.head.appendChild(s);

console.log('ADS: Popunder loaded');
}
}, { passive: true });

/* ============================================
   3. BANNER CODES — All Sizes
   ============================================ */

/* 160×300 */
var AD_160x300 = '<script type="text/javascript">atOptions={"key":"625443c37853ba37a89d304dfb59a3f9","format":"iframe","height":300,"width":160,"params":{}};<\/script><script type="text/javascript" src="https://www.highrevenueformat.com/625443c37853ba37a89d304dfb59a3f9/invoke.js"><\/script>';

/* 160×600 */
var AD_160x600 = '<script type="text/javascript">atOptions={"key":"7222306aa6d728ec1c80c6058a1d559e","format":"iframe","height":600,"width":160,"params":{}};<\/script><script type="text/javascript" src="https://www.highrevenueformat.com/7222306aa6d728ec1c80c6058a1d559e/invoke.js"><\/script>';

/* 300×250 — HIGHEST CPM */
var AD_300x250 = '<script type="text/javascript">atOptions={"key":"f7a7c3a714d99385169013b0dec763f7","format":"iframe","height":250,"width":300,"params":{}};<\/script><script type="text/javascript" src="https://www.highrevenueformat.com/f7a7c3a714d99385169013b0dec763f7/invoke.js"><\/script>';

/* 320×50 — TOP BANNER (Sahi code) */
var AD_320x50 = '<script type="text/javascript">atOptions={"key":"3975b34e0711a736129dd4dd27f0584e","format":"iframe","height":50,"width":320,"params":{}};<\/script><script type="text/javascript" src="https://www.highrevenueformat.com/3975b34e0711a736129dd4dd27f0584e/invoke.js"><\/script>';

/* 468×60 */
var AD_468x60 = '<script type="text/javascript">atOptions={"key":"86ae40dfb2f685f735f9277c111d4e89","format":"iframe","height":60,"width":468,"params":{}};<\/script><script type="text/javascript" src="https://www.highrevenueformat.com/86ae40dfb2f685f735f9277c111d4e89/invoke.js"><\/script>';

/* 728×90 — BOTTOM BANNER */
var AD_728x90 = '<script type="text/javascript">atOptions={"key":"00d77ef15a41abcc98874aae42b070b4","format":"iframe","height":90,"width":728,"params":{}};<\/script><script type="text/javascript" src="https://www.highrevenueformat.com/00d77ef15a41abcc98874aae42b070b4/invoke.js"><\/script>';

/* ============================================
   4. INJECT TOP + BOTTOM ADS
   ============================================ */
function injectAds() {

/* TOP AD — 320×50 */
var top = document.getElementById('ad-top');
if (top) {
top.innerHTML = AD_320x50;
top.classList.add('has-code');
top.style.display = 'flex';
console.log('ADS: Top banner 320×50');
}

/* BOTTOM AD — 728×90 */
var bot = document.getElementById('ad-bottom');
if (bot) {
bot.innerHTML = AD_728x90;
bot.classList.add('has-code');
bot.style.display = 'flex';
console.log('ADS: Bottom banner 728×90');
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
   300×250 (Highest CPM)
   ============================================ */
window.AETHER_ADS = {
enabled: true,
afterCard: function(index, card, fragment) {

if ((index + 1) % 10 === 0) {

var ad = document.createElement('div');
ad.className = 'ads-mid has-code';
ad.style.gridColumn = '1/-1';
ad.style.display = 'flex';
ad.innerHTML = AD_300x250;
fragment.appendChild(ad);

console.log('ADS: Middle banner at ' + (index + 1));
}

}
};

console.log('ADS: Ready');
})();
