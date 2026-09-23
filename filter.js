/* ============================================
   AETHER FILTER — Quality Filter (FIXED)
   Category Exclusive + Country + AMOLED 2nd
   ============================================ */

(function() {
'use strict';

/* Wait for main app to fully load */
function waitForApp() {
  var attempts = 0;
  var maxAttempts = 100; /* 10 seconds */
  
  var check = setInterval(function() {
    attempts++;
    
    /* Check if main app loaded */
    if (window.A && window.A.load && window.A.setCat) {
      clearInterval(check);
      applyFilter();
      return;
    }
    
    if (attempts >= maxAttempts) {
      clearInterval(check);
      console.warn('AETHER FILTER: Main app not found');
    }
  }, 100);
}

/* Apply filter after app loads */
function applyFilter() {
  
  /* ============================================
     11 CATEGORIES
     ============================================ */
  var newCategories = [
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
  
  /* Override categories */
  if (window.CATS && Array.isArray(window.CATS)) {
    window.CATS.length = 0;
    newCategories.forEach(function(c) {
      window.CATS.push(c);
    });
    console.log('AETHER FILTER: Categories updated');
  }
  
  /* ============================================
     FILTER WORDS
     ============================================ */
  var humanWords = [
    'person','people','man','woman','girl','boy','child',
    'face','portrait of','human','model','baby','family',
    'wedding','selfie','group','crowd','skin','hand',
    'leg','body','tattoo','couple','kiss','arm','eye',
    'smile','hair','dress','sitting','standing','walking'
  ];
  
  var stockWords = [
    'business','office','meeting','team','corporate',
    'laptop','desk','work','professional','employee',
    'stock','commercial','suit','tie','handshake'
  ];
  
  var wallpaperWords = [
    'wallpaper','background','aesthetic','abstract',
    'minimal','gradient','pattern','art','design',
    'colorful','vibrant','beautiful','stunning',
    'sunset','sunrise','night','sky','ocean',
    'forest','mountain','galaxy','space','dark','light'
  ];
  
  var categoryKeywords = {
    'amoled': ['amoled','black','dark','oled','midnight'],
    'aesthetic': ['aesthetic','vibes','soft','dreamy'],
    'minimal': ['minimal','minimalist','clean','simple'],
    'galaxy': ['galaxy','nebula','space','cosmos','stars'],
    'nature': ['nature','mountain','forest','landscape','lake'],
    'anime': ['anime','manga','japanese'],
    'pastel': ['pastel','soft color'],
    'cyberpunk': ['cyberpunk','neon','futuristic'],
    'abstract': ['abstract','geometric','shapes','pattern']
  };
  
  /* ============================================
     HELPER FUNCTIONS
     ============================================ */
  function getResolutionTag(w, h) {
    var maxDim = Math.max(w, h);
    if (maxDim >= 3840) return '4K';
    if (maxDim >= 2560) return '2K';
    if (maxDim >= 1920) return 'FHD';
    if (maxDim >= 1280) return 'HD';
    return null;
  }
  
  function isWallpaperStyle(photo) {
    var alt = (photo.alt || '').toLowerCase();
    var matches = 0;
    wallpaperWords.forEach(function(w) {
      if (alt.indexOf(w) !== -1) matches++;
    });
    if (matches >= 2) return true;
    var ratio = photo.height / photo.width;
    if (ratio >= 1.6) return true;
    return false;
  }
  
  function matchesCategory(photo, catId) {
    var alt = (photo.alt || '').toLowerCase();
    var keywords = categoryKeywords[catId];
    if (!keywords) return true;
    for (var i = 0; i < keywords.length; i++) {
      if (alt.indexOf(keywords[i]) !== -1) return true;
    }
    return false;
  }
  
  function scorePhoto(photo, category) {
    var score = 0;
    var alt = (photo.alt || '').toLowerCase();
    
    if (!isWallpaperStyle(photo)) return 0;
    score += 30;
    
    var ratio = photo.height / photo.width;
    if (ratio >= 1.75 && ratio <= 1.85) score += 20;
    else if (ratio >= 1.65 && ratio <= 1.95) score += 15;
    else if (ratio >= 1.6 && ratio <= 2.1) score += 10;
    else score += 3;
    
    if (photo.avg_color) score += 10;
    if (alt.length > 25) score += 5;
    
    var mp = (photo.width * photo.height) / 1000000;
    if (mp >= 4) score += 15;
    else if (mp >= 2) score += 12;
    else if (mp >= 1.5) score += 8;
    else score += 4;
    
    if (alt.indexOf((category || '').toLowerCase()) !== -1) score += 5;
    if (alt.indexOf('amoled') !== -1 || alt.indexOf('black') !== -1) score += 10;
    if (alt.indexOf('norway') !== -1 || alt.indexOf('switzerland') !== -1) score += 10;
    
    return Math.min(100, Math.round(score));
  }
  
  /* ============================================
     OVERRIDE renderGrid — Smart tags
     ============================================ */
  var originalRenderGrid = window.A.renderGrid;
  if (originalRenderGrid) {
    window.A.renderGrid = function(list) {
      list.forEach(function(w) {
        var catName = w.tag ? w.tag.split(' · ')[0] : 'Wallpaper';
        var resTag = getResolutionTag(w.w, w.h);
        if (resTag) {
          w.tag = catName + ' · ' + resTag;
        } else {
          w.tag = catName;
        }
      });
      return originalRenderGrid.call(window.A, list);
    };
    console.log('AETHER FILTER: renderGrid overridden');
  }
  
  /* ============================================
     OVERRIDE load — Filter photos
     ============================================ */
  var originalLoad = window.A.load;
  if (originalLoad) {
    window.A.load = async function() {
      /* Call original load */
      var result = await originalLoad.apply(window.A, arguments);
      
      /* Wait a bit for photos to load */
      setTimeout(function() {
        var grid = document.getElementById('grid');
        if (!grid) return;
        
        /* Apply strict filter to rendered cards */
        var cards = grid.querySelectorAll('.wc');
        cards.forEach(function(card) {
          var img = card.querySelector('img');
          if (!img) return;
          
          var alt = (img.alt || '').toLowerCase();
          var isHuman = humanWords.some(function(w) { return alt.indexOf(w) !== -1; });
          var isStock = stockWords.some(function(w) { return alt.indexOf(w) !== -1; });
          
          /* Hide cards with humans/stock */
          if (isHuman || isStock) {
            card.style.display = 'none';
          }
        });
      }, 500);
      
      return result;
    };
    console.log('AETHER FILTER: load overridden');
  }
  
  console.log('%c AETHER FILTER LOADED', 'color:#7c3aed;font-weight:900;font-size:16px;');
  console.log('%c Countries 3rd + AMOLED 2nd + Strict Filter', 'color:#ec4899;font-size:12px;');
}

/* Start waiting for app */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', waitForApp);
} else {
  waitForApp();
}

})();
