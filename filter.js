/* ============================================
   AETHER FILTER v3.0 — Wait Version
   Chahe kitni der lage, chalega
   ============================================ */

(function() {
'use strict';

console.log('FILTER: Script loaded');

/* ============================================
   11 CATEGORIES
   ============================================ */
var NEW_CATS = [
  {id:'featured', n:'Featured', i:'featured', q:'beautiful stunning wallpaper aesthetic'},
  {id:'amoled', n:'AMOLED', i:'dark', q:'amoled black dark wallpaper'},
  {id:'countries', n:'Countries', i:'nature', q:'norway switzerland iceland nature wallpaper'},
  {id:'aesthetic', n:'Aesthetic', i:'aesthetic', q:'aesthetic wallpaper vibes soft'},
  {id:'minimal', n:'Minimal', i:'minimal', q:'minimal clean wallpaper'},
  {id:'galaxy', n:'Galaxy', i:'space', q:'galaxy nebula space wallpaper'},
  {id:'nature', n:'Nature', i:'nature', q:'nature mountain landscape wallpaper'},
  {id:'anime', n:'Anime', i:'featured', q:'anime aesthetic wallpaper'},
  {id:'pastel', n:'Pastel', i:'pastel', q:'pastel soft color wallpaper'},
  {id:'cyberpunk', n:'Cyberpunk', i:'neon', q:'cyberpunk neon futuristic wallpaper'},
  {id:'abstract', n:'Abstract', i:'abstract', q:'abstract art wallpaper'}
];

/* ============================================
   BAD WORDS
   ============================================ */
var BAD = [
  'person','people','man','woman','girl','boy','child',
  'face','portrait','human','model','baby','family',
  'wedding','selfie','group','crowd','skin','hand',
  'leg','body','tattoo','couple','kiss','arm','eye',
  'smile','hair','dress','sitting','standing','walking',
  'business','office','meeting','team','corporate',
  'laptop','desk','work','professional','employee',
  'stock','commercial','suit','tie','handshake'
];

var BAD_SET = {};
BAD.forEach(function(w) { BAD_SET[w] = 1; });

function isBad(alt) {
  if (!alt) return false;
  var words = alt.toLowerCase().split(/[^a-z]+/);
  for (var i = 0; i < words.length; i++) {
    if (words[i] && BAD_SET[words[i]]) return true;
  }
  return false;
}

function getResTag(w, h) {
  var max = w > h ? w : h;
  if (max >= 3840) return '4K';
  if (max >= 2560) return '2K';
  if (max >= 1920) return 'FHD';
  if (max >= 1280) return 'HD';
  return null;
}

/* ============================================
   APPLY
   ============================================ */
var APPLIED = false;

function applyFilter() {
  if (APPLIED) return;
  if (!window.A || !window.A.renderGrid) return;

  APPLIED = true;
  console.log('FILTER: Applying...');

  /* Categories */
  if (window.CATS && Array.isArray(window.CATS)) {
    window.CATS.length = 0;
    NEW_CATS.forEach(function(c) { window.CATS.push(c); });
    console.log('FILTER: ' + NEW_CATS.length + ' categories');
  }

  /* Override renderGrid */
  var origRender = window.A.renderGrid;
  window.A.renderGrid = function(list) {
    var filtered = [];
    for (var i = 0; i < list.length; i++) {
      var w = list[i];
      var alt = w.alt || '';
      if (isBad(alt)) continue;

      var catName = w.tag ? w.tag.split(' · ')[0] : 'Wallpaper';
      var resTag = getResTag(w.w, w.h);
      w.tag = resTag ? (catName + ' · ' + resTag) : catName;

      filtered.push(w);
    }
    console.log('FILTER: ' + filtered.length + '/' + list.length);
    return origRender.call(window.A, filtered);
  };

  console.log('%c AETHER FILTER ACTIVE', 'color:#7c3aed;font-weight:900;font-size:16px;');
}

/* ============================================
   SMART WAIT — Chahe kitni der lage
   ============================================ */
var attempts = 0;
var maxAttempts = 300; /* 30 seconds */

var timer = setInterval(function() {
  attempts++;
  applyFilter();

  if (APPLIED || attempts >= maxAttempts) {
    clearInterval(timer);
  }
}, 100);

/* Also check on DOM ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(applyFilter, 500);
  });
} else {
  setTimeout(applyFilter, 500);
}

/* Also check on window load */
window.addEventListener('load', function() {
  setTimeout(applyFilter, 1000);
});

})();
