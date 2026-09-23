/* ============================================
   THE AETHER WALLPAPERS — Ads Loader
   Balanced ads — best earning + clean UX
   ============================================ */

(function() {
'use strict';

/* ============================================
   1. POPUNDER — Adsterra
   ============================================ */
(function() {
var s = document.createElement('script');
s.src = 'https://pl31472208.profitableratecpmnetwork.com/ca/47/c7/ca47c76f9beea26720e6209174e0a947.js';
s.async = true;
s.setAttribute('data-cfasync', 'false');
document.head.appendChild(s);
})();

/* ============================================
   2. SOCIAL BAR — Adsterra
   ============================================ */
(function() {
var s = document.createElement('script');
s.src = 'https://pl31472209.profitableratecpmnetwork.com/f3/a8/7b/f3a87b261c064722a7494454d4feec1d.js';
s.async = true;
s.setAttribute('data-cfasync', 'false');
document.head.appendChild(s);
})();

/* ============================================
   3. BANNER CODES
   ============================================ */

/* Top Banner — 320×50 */
var AD_TOP = '<script type="text/javascript">atOptions={"key":"3975b34e0711a736129dd4dd27f0584e","format":"iframe","height":50,"width":320,"params":{}};<\/script><script type="text/javascript" src="https://www.highrevenueformat.com/3975b34e0711a736129dd4dd27f0584e/invoke.js"><\/script>';

/* Middle Banner — 300×250 */
var AD_MIDDLE = '<script type="text/javascript">atOptions={"key":"f7a7c3a714d99385169013b0dec763f7","format":"iframe","height":250,"width":300,"params":{}};<\/script><script type="text/javascript" src="https://www.highrevenueformat.com/f7a7c3a714d99385169013b0dec763f7/invoke.js"><\/script>';

/* Bottom Banner — 728×90 */
var AD_BOTTOM = '<script type="text/javascript">atOptions={"key":"00d77ef15a41abcc98874aae42b070b4","format":"iframe","height":90,"width":728,"params":{}};<\/script><script type="text/javascript" src="https://www.highrevenueformat.com/00d77ef15a41abcc98874aae42b070b4/invoke.js"><\/script>';

/* ============================================
   4. AUTO-INJECT top + bottom ads
   ============================================ */
function injectAds() {
var top = document.getElementById('ad-top');
var bot = document.getElementById('ad-bottom');

if (top) {
top.innerHTML = AD_TOP;
top.classList.add('has-code');
}

if (bot) {
bot.innerHTML = AD_BOTTOM;
bot.classList.add('has-code');
}

document.body.classList.add('ads-on', 'has-ad-code');
}

if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', injectAds);
} else {
injectAds();
}

/* ============================================
   5. MIDDLE AD — Har 15 cards ke baad
   ============================================
   Balanced: 20 cards load hote hain per page.
   Har 15 ke baad ad = per load 1-2 ads.
   User ko disturb nahi karega.
   ============================================ */
window.AETHER_ADS = {
enabled: true,
afterCard: function(index, card, fragment) {

/* Har 15 wallpapers ke baad middle ad */
if ((index + 1) % 15 === 0) {

var ad = document.createElement('div');
ad.className = 'ads-mid has-code';
ad.style.gridColumn = '1/-1';
ad.innerHTML = AD_MIDDLE;
fragment.appendChild(ad);

}

}
};

})();
