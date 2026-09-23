/* ============================================
   AETHER FILTER — Quality Filter
   Category Exclusive + Country Boost + AMOLED 2nd
   ============================================ */

(function() {
'use strict';

window.AETHER_FILTER = {

  /* ============================================
     11 CATEGORIES — Countries 3rd, AMOLED 2nd
     ============================================ */
  categories: [
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
  ],

  /* 11 Countries */
  countries: [
    {id:'norway', n:'Norway', q:'norway fjord aurora wallpaper'},
    {id:'switzerland', n:'Switzerland', q:'switzerland alps lake wallpaper'},
    {id:'iceland', n:'Iceland', q:'iceland glacier waterfall wallpaper'},
    {id:'alaska', n:'Alaska', q:'alaska snow mountain wallpaper'},
    {id:'canada', n:'Canada', q:'canada lake mountain wallpaper'},
    {id:'japan', n:'Japan', q:'japan cherry blossom wallpaper'},
    {id:'maldives', n:'Maldives', q:'maldives tropical beach wallpaper'},
    {id:'bali', n:'Bali', q:'bali tropical paradise wallpaper'},
    {id:'santorini', n:'Santorini', q:'santorini greece white blue wallpaper'},
    {id:'newzealand', n:'New Zealand', q:'new zealand landscape wallpaper'},
    {id:'patagonia', n:'Patagonia', q:'patagonia mountain glacier wallpaper'}
  ],

  ULTRA_COUNT: 10,
  TOP_COUNT: 50,
  MIN_SCORE: 90,

  globalSeen: new Set(),

  categoryKeywords: {
    'amoled': ['amoled','black','dark','oled','midnight','pure black'],
    'aesthetic': ['aesthetic','vibes','soft','dreamy','beautiful'],
    'minimal': ['minimal','minimalist','clean','simple'],
    'galaxy': ['galaxy','nebula','space','cosmos','stars','milky'],
    'nature': ['nature','mountain','forest','landscape','lake','valley','waterfall'],
    'anime': ['anime','manga','japanese'],
    'pastel': ['pastel','soft color','pastel pink','pastel blue'],
    'cyberpunk': ['cyberpunk','neon','futuristic','sci-fi','sci fi'],
    'abstract': ['abstract','geometric','shapes','pattern'],
    'norway': ['norway','fjord','aurora','northern lights'],
    'switzerland': ['switzerland','alps','swiss','lake geneva'],
    'iceland': ['iceland','glacier','waterfall','volcano'],
    'alaska': ['alaska','snow','arctic','aurora'],
    'canada': ['canada','banff','lake','rocky'],
    'japan': ['japan','cherry','blossom','sakura','tokyo'],
    'maldives': ['maldives','tropical','beach','ocean'],
    'bali': ['bali','tropical','paradise','indonesia'],
    'santorini': ['santorini','greece','white','blue'],
    'newzealand': ['new zealand','landscape','hobbit'],
    'patagonia': ['patagonia','mountain','glacier','chile']
  },

  humanWords: [
    'person','people','man','woman','girl','boy','child',
    'face','portrait of','human','model','baby','family',
    'wedding','selfie','group','crowd','skin','hand',
    'leg','body','tattoo','couple','kiss','arm','eye',
    'smile','hair','dress','sitting','standing','walking',
    'foot','head','finger','neck','chest','shoulder'
  ],

  stockWords: [
    'business','office','meeting','team','corporate',
    'laptop','desk','work','professional','employee',
    'stock','commercial','suit','tie','handshake',
    'sign','text','logo','brand','product'
  ],

  wallpaperWords: [
    'wallpaper','background','aesthetic','abstract',
    'minimal','gradient','pattern','art','design',
    'colorful','vibrant','beautiful','stunning',
    'sunset','sunrise','night','sky','ocean',
    'forest','mountain','galaxy','space','dark','light'
  ],

  getResolutionTag: function(width, height) {
    const maxDim = Math.max(width, height);
    if (maxDim >= 3840) return '4K';
    if (maxDim >= 2560) return '2K';
    if (maxDim >= 1920) return 'FHD';
    if (maxDim >= 1280) return 'HD';
    return null;
  },

  isWallpaperStyle: function(photo) {
    const alt = (photo.alt || '').toLowerCase();
    let matches = 0;
    
    this.wallpaperWords.forEach(w => {
      if (alt.includes(w)) matches++;
    });
    
    if (matches >= 2) return true;
    
    const ratio = photo.height / photo.width;
    if (ratio >= 1.6) return true;
    
    return false;
  },

  matchesCategory: function(photo, categoryId) {
    const alt = (photo.alt || '').toLowerCase();
    const keywords = this.categoryKeywords[categoryId];
    
    if (!keywords) return true;
    
    return keywords.some(kw => alt.includes(kw));
  },

  score: function(photo, category) {
    let score = 0;
    const alt = (photo.alt || '').toLowerCase();

    if (this.isWallpaperStyle(photo)) score += 30;
    else return 0;

    const ratio = photo.height / photo.width;
    if (ratio >= 1.75 && ratio <= 1.85) score += 20;
    else if (ratio >= 1.65 && ratio <= 1.95) score += 15;
    else if (ratio >= 1.6 && ratio <= 2.1) score += 10;
    else score += 3;

    if (photo.avg_color) score += 10;
    if (alt.length > 25) score += 5;

    const mp = (photo.width * photo.height) / 1000000;
    if (mp >= 4) score += 15;
    else if (mp >= 2) score += 12;
    else if (mp >= 1.5) score += 8;
    else score += 4;

    if (alt.includes((category || '').toLowerCase())) score += 5;

    if (alt.includes('amoled') || alt.includes('black') || alt.includes('dark')) score += 10;

    if (alt.includes('norway') || alt.includes('switzerland') || alt.includes('iceland')) score += 10;

    return Math.min(100, Math.round(score));
  },

  getTag: function(categoryName, photo) {
    const resTag = this.getResolutionTag(photo.width, photo.height);
    if (resTag) return categoryName + ' · ' + resTag;
    return categoryName;
  },

  filter: function(photos, categoryId) {
    const allBad = this.humanWords.concat(this.stockWords);
    const isFeatured = categoryId === 'featured';
    const isCountries = categoryId === 'countries';
    const self = this;

    const filtered = photos.filter(p => {
      if (self.globalSeen.has(p.id)) return false;
      
      if (p.height <= p.width) return false;
      if (p.width < 1080) return false;
      if (p.width * p.height < 2000000) return false;
      
      const alt = (p.alt || '').toLowerCase();
      if (allBad.some(w => alt.includes(w))) return false;
      if (!self.isWallpaperStyle(p)) return false;
      
      if (!isFeatured && !isCountries && !self.matchesCategory(p, categoryId)) return false;
      
      const score = self.score(p, categoryId);
      if (score < self.MIN_SCORE) return false;
      
      self.globalSeen.add(p.id);
      
      return true;
    });

    filtered.sort((a, b) => self.score(b, categoryId) - self.score(a, categoryId));

    return filtered;
  },

  resetSeen: function() {
    this.globalSeen.clear();
  },

  init: function() {
    var checkApp = setInterval(function() {
      if (window.A && window.A.load) {
        clearInterval(checkApp);
        AETHER_FILTER.applyOverride();
      }
    }, 100);

    setTimeout(function() {
      clearInterval(checkApp);
    }, 5000);
  },

  applyOverride: function() {
    if (window.CATS && Array.isArray(window.CATS)) {
      window.CATS.length = 0;
      AETHER_FILTER.categories.forEach(function(c) {
        window.CATS.push(c);
      });
    }

    var originalSetCat = window.A.setCat;
    if (originalSetCat) {
      window.A.setCat = function(id) {
        AETHER_FILTER.resetSeen();
        return originalSetCat.call(window.A, id);
      };
    }

    var originalRenderGrid = window.A.renderGrid;
    if (originalRenderGrid) {
      window.A.renderGrid = function(list) {
        list.forEach(function(w) {
          var catName = w.tag ? w.tag.split(' · ')[0] : 'Wallpaper';
          w.tag = AETHER_FILTER.getTag(catName, {
            width: w.w,
            height: w.h,
            alt: w.alt,
            avg_color: w.avg_color
          });
        });
        originalRenderGrid.call(window.A, list);
      };
    }

    console.log('%c AETHER FILTER LOADED', 'color:#7c3aed;font-weight:900;font-size:14px;');
    console.log('%c Countries 3rd + AMOLED 2nd', 'color:#ec4899;font-size:12px;');
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', AETHER_FILTER.init);
} else {
  AETHER_FILTER.init();
}

})();
