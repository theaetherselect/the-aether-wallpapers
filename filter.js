/* ============================================
   AETHER FILTER — Smooth Version
   Fast + No Lag + Quality Filter
   ============================================ */

(function() {
'use strict';

console.log('FILTER: Loading...');

/* ============================================
   WORD LISTS (Set for fast lookup)
   ============================================ */
var humanWords = [
  'person','people','man','woman','girl','boy','child',
  'face','portrait of','human','model','baby','family',
  'wedding','selfie','group','crowd','skin','hand',
  'leg','body','tattoo','couple','kiss','arm','eye'
];

var stockWords = [
  'business','office','meeting','team','corporate',
  'laptop','desk','work','professional','employee',
  'stock','commercial','suit','tie','handshake'
];

/* Fast lookup Set */
var humanSet = new Set(humanWords);
var stockSet = new Set(stockWords);

/* ============================================
   QUICK CHECK FUNCTIONS (Fast)
   ============================================ */
function hasBadWord(alt) {
  /* Split alt into words once */
  var words = alt.split(/[\s,.\-_]+/);
  
  /* Fast loop */
  for (var i = 0; i < words.length; i++) {
    if (humanSet.has(words[i]) || stockSet.has(words[i])) {
      return true;
    }
  }
  return false;
}

/* ============================================
   RESOLUTION TAG (Fast)
   ============================================ */
function getResTag(w, h) {
  var max = w > h ? w : h;
  if (max >= 3840) return '4K';
  if (max >= 2560) return '2K';
  if (max >= 1920) return 'FHD';
  if (max >= 1280) return 'HD';
  return null;
}

/* ============================================
   APPLY FILTER
   ============================================ */
function applyFilter() {
  
  console.log('FILTER: Applying...');

  /* ============================================
     11 CATEGORIES
     ============================================ */
  var newCats = [
    {id:'featured', n:'Featured', i:'featured', q:'beautiful stunning wallpaper aesthetic'},
    {id:'amoled', n:'AMOLED', i:'dark', q:'amoled black dark wallpaper'},
    {id:'countries', n:'Countries', i:'nature', q:'norway switzerland nature wallpaper'},
    {id:'aesthetic', n:'Aesthetic', i:'aesthetic', q:'aesthetic wallpaper vibes'},
    {id:'minimal', n:'Minimal', i:'minimal', q:'minimal clean wallpaper'},
    {id:'galaxy', n:'Galaxy', i:'space', q:'galaxy nebula space wallpaper'},
    {id:'nature', n:'Nature', i:'nature', q:'nature mountain landscape wallpaper'},
    {id:'anime', n:'Anime', i:'featured', q:'anime aesthetic wallpaper'},
    {id:'pastel', n:'Pastel', i:'pastel', q:'pastel soft color wallpaper'},
    {id:'cyberpunk', n:'Cyberpunk', i:'neon', q:'cyberpunk neon futuristic wallpaper'},
    {id:'abstract', n:'Abstract', i:'abstract', q:'abstract art wallpaper'}
  ];

  /* Update categories */
  if (window.CATS && Array.isArray(window.CATS)) {
    window.CATS.length = 0;
    for (var c = 0; c < newCats.length; c++) {
      window.CATS.push(newCats[c]);
    }
    console.log('FILTER: ' + newCats.length + ' categories set');
  }

  /* ============================================
     OVERRIDE renderGrid — Fast + Smooth
     ============================================ */
  var originalRenderGrid = window.A.renderGrid;

  if (originalRenderGrid) {
    window.A.renderGrid = function(list) {

      /* ============================================
         FAST FILTER — Single loop
         ============================================ */
      var filtered = [];
      var len = list.length;

      for (var i = 0; i < len; i++) {
        var w = list[i];
        var alt = (w.alt || '').toLowerCase();

        /* Fast human/stock check */
        if (hasBadWord(alt)) continue;

        /* Update tag — fast */
        var catName = w.tag ? w.tag.split(' · ')[0] : 'Wallpaper';
        var resTag = getResTag(w.w, w.h);
        w.tag = resTag ? (catName + ' · ' + resTag) : catName;

        filtered.push(w);
      }

      console.log('FILTER: ' + filtered.length + '/' + list.length + ' shown');

      /* Call original render */
      return originalRenderGrid.call(window.A, filtered);
    };

    console.log('FILTER: renderGrid ready');
  }

  console.log('%c AETHER FILTER ACTIVE', 'color:#7c3aed;font-weight:900;font-size:16px;');
}

/* ============================================
   WAIT FOR APP (Optimized)
   ============================================ */
var attempts = 0;
var maxAttempts = 50; /* 5 seconds */

var checkApp = setInterval(function() {
  attempts++;

  if (window.A && window.A.renderGrid) {
    clearInterval(checkApp);
    applyFilter();
    return;
  }

  if (attempts >= maxAttempts) {
    clearInterval(checkApp);
    console.warn('FILTER: App not found after 5s');
  }
}, 100);

/* Also check on DOM ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    if (window.A && window.A.renderGrid && !window.A._filterApplied) {
      window.A._filterApplied = true;
      applyFilter();
    }
  });
}

})();
