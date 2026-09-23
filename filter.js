/* ============================================
   AETHER FILTER v2.0 — Best Quality
   Fast + Smooth + Category Exclusive
   ============================================ */

(function() {
'use strict';

console.log('FILTER: Started');

/* ============================================
   11 CATEGORIES
   ============================================ */
var AETHER_CATS = [
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
var humanWords = [
  'person','people','man','woman','girl','boy','child',
  'face','portrait','human','model','baby','family',
  'wedding','selfie','group','crowd','skin','hand',
  'leg','body','tattoo','couple','kiss','arm','eye',
  'smile','hair','dress','sitting','standing','walking'
];

var stockWords = [
  'business','office','meeting','team','corporate',
  'laptop','desk','work','professional','employee',
  'stock','commercial','suit','tie','handshake'
];

var humanSet = {};
var stockSet = {};
humanWords.forEach(function(w){ humanSet[w] = 1; });
stockWords.forEach(function(w){ stockSet[w] = 1; });

/* ============================================
   FAST CHECK
   ============================================ */
function isBad(alt) {
  if (!alt) return false;
  alt = alt.toLowerCase();
  var words = alt.split(/[^a-z]+/);
  for (var i = 0; i < words.length; i++) {
    if (words[i] && (humanSet[words[i]] || stockSet[words[i]])) {
      return true;
    }
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
   APPLY FILTER
   ============================================ */
function applyFilter() {

  console.log('FILTER: App found');

  /* Override categories */
  if (window.CATS && Array.isArray(window.CATS)) {
    window.CATS.length = 0;
    for (var i = 0; i < AETHER_CATS.length; i++) {
      window.CATS.push(AETHER_CATS[i]);
    }
    console.log('FILTER: ' + AETHER_CATS.length + ' categories set');
  }

  /* Override renderGrid */
  var originalRenderGrid = window.A.renderGrid;

  if (originalRenderGrid) {

    window.A.renderGrid = function(list) {

      var filtered = [];
      var len = list.length;

      for (var i = 0; i < len; i++) {

        var w = list[i];
        var alt = (w.alt || '');

        /* Skip bad words */
        if (isBad(alt)) continue;

        /* Update tag */
        var parts = w.tag ? w.tag.split(' · ') : ['Wallpaper'];
        var catName = parts[0] || 'Wallpaper';
        var resTag = getResTag(w.w, w.h);
        w.tag = resTag ? (catName + ' · ' + resTag) : catName;

        filtered.push(w);
      }

      console.log('FILTER: ' + filtered.length + '/' + len + ' wallpapers');

      return originalRenderGrid.call(window.A, filtered);
    };

    console.log('FILTER: renderGrid ready');
  }

  /* Override renderCats to use new categories */
  var originalRenderCats = window.A.renderCats;
  if (originalRenderCats) {
    window.A.renderCats = function() {
      var c = document.getElementById('categories');
      if (!c) return;

      var html = '';
      for (var i = 0; i < AETHER_CATS.length; i++) {
        var x = AETHER_CATS[i];
        html += '<button class="cc" data-cat="' + x.id + '" onclick="A.setCat(\'' + x.id + '\')">';
        html += '<span>' + x.n + '</span>';
        html += '</button>';
      }
      c.innerHTML = html;
      console.log('FILTER: categories rendered');
    };
  }

  console.log('%c AETHER FILTER ACTIVE', 'color:#7c3aed;font-weight:900;font-size:16px;');
}

/* ============================================
   WAIT FOR APP
   ============================================ */
var tries = 0;
var timer = setInterval(function() {
  tries++;

  if (window.A && window.A.renderGrid && window.A.renderCats) {
    clearInterval(timer);
    applyFilter();
  } else if (tries > 100) {
    clearInterval(timer);
    console.warn('FILTER: App not found after 10s');
  }
}, 100);

})();
