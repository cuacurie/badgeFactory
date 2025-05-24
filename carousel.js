import { iconPaths } from './icons.js';
import { generateBadge } from './badgeGenerator.js';
import { announce } from './utils.js';

export const ribbonOptions = [
  'rect', 'rounded', 'concave', 'pointed', 'chevron',
  'rect-outline', 'rounded-outline', 'concave-outline', 'pointed-outline', 'chevron-outline'
];

export const shieldOptions = [
  'diamond', 'decorative', 'decorative-concave', 'decorative-scallop',
  'diamond-outline', 'decorative-outline', 'decorative-concave-outline', 'decorative-scallop-outline'
];

export function renderCarousel(options, current, type) {
  const idx = options.indexOf(current);
  let html = `<div class="carousel-items" style="display:inline-block;overflow-x:auto;white-space:nowrap;width:280px;vertical-align:middle;padding:4px;" role="listbox" aria-label="${type} options" tabindex="-1">`;
  for (let i = 0; i < options.length; i++) {
    let preview = type==='shield' ? getShieldPreviewSVG(options[i], i===idx) : getRibbonPreviewSVG(options[i], i===idx);
    let itemClass = `carousel-item${i===idx?' selected':''}${type==='ribbon'?' ribbon':''}`;
    let itemLabel = options[i].replace(/-/g, ' ').replace(/outline$/, 'outline style');
    html += `<span class="${itemClass}" data-idx="${i}" id="${type}-carousel-item-${i}" style="display:inline-block;" role="option" aria-selected="${i===idx}" aria-label="${itemLabel}" tabindex="-1">`;
    html += preview;
    html += '</span>';
  }
  html += `</div>`;
  return html;
}

export function getShieldPreviewSVG(shield, selected=false) {
  let shieldColor = selected ? '#555' : '#bbb';
  let shieldStroke = '', shieldStrokeWidth = '';
  if (shield.endsWith('-outline')) {
    shieldStroke = ' stroke="#f0f0f0"';
    if (shield.startsWith('diamond')) {
      shieldStrokeWidth = ' stroke-width="4.5"';
    } else {
      shieldStrokeWidth = ' stroke-width="3"';
    }
  }
  if (shield.startsWith('diamond')) {
    const cx = 18, cy = 18;
    const w = 148 * 36/200, h = 36;
    const halfW = w/2, halfH = h/2;
    const points = [
      `${cx},${cy-halfH}`,
      `${cx+halfW},${cy-9}`,
      `${cx},${cy+halfH}`,
      `${cx-halfW},${cy-9}`
    ].join(' ');
    return `<svg width="36" height="36"><polygon points="${points}" fill="${shieldColor}"${shieldStroke}${shieldStrokeWidth}/></svg>`;
  }
  if (shield.startsWith('decorative') && !shield.startsWith('decorative-scallop') && !shield.startsWith('decorative-concave')) {
    const scale = 36/22;
    return `<svg width="36" height="36"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="${shieldColor}"${shieldStroke}${shieldStrokeWidth} transform="translate(18,18) scale(${scale}) translate(-12,-12)"/></svg>`;
  }
  if (shield.startsWith('decorative-concave')) {
    const scale = 36/22;
    return `<svg width="36" height="36"><path d="M12 1 Q10.2 5 3 8 v3 c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V8 Q13.8 5 12 1z" fill="${shieldColor}"${shieldStroke}${shieldStrokeWidth} transform="translate(18,18) scale(${scale}) translate(-12,-12)"/></svg>`;
  }
  if (shield.startsWith('decorative-scallop')) {
    const scale = 36/24;
    return `<svg width="36" height="36"><ellipse cx="12" cy="12" rx="9" ry="12" fill="${shieldColor}"${shieldStroke}${shieldStrokeWidth} transform="translate(18,18) scale(${scale}) translate(-12,-12)"/></svg>`;
  }
  return '';
}

export function getRibbonPreviewSVG(ribbon, selected=false) {
  let ribbonColor = selected ? '#555' : '#bbb';
  let ribbonStroke = '', ribbonStrokeWidth = '';
  if (ribbon.endsWith('-outline')) {
    ribbonStroke = ' stroke="white"';
    ribbonStrokeWidth = ' stroke-width="2"';
  }
  if (ribbon.startsWith('rect')) {
    return `<svg width="36" height="16"><rect x="2" y="2" width="32" height="12" rx="${ribbon.startsWith('rounded')?6:0}" fill="${ribbonColor}"${ribbonStroke}${ribbonStrokeWidth}/></svg>`;
  } else if (ribbon.startsWith('rounded')) {
    return `<svg width="36" height="16"><rect x="2" y="2" width="32" height="12" rx="6" fill="${ribbonColor}"${ribbonStroke}${ribbonStrokeWidth}/></svg>`;
  } else if (ribbon.startsWith('concave')) {
    return `<svg width="36" height="16"><path d="M2,2 Q6,14 2,14 H34 Q30,14 34,2 Z" fill="${ribbonColor}"${ribbonStroke}${ribbonStrokeWidth}/></svg>`;
  } else if (ribbon.startsWith('pointed')) {
    return `<svg width="36" height="16"><path d="M2,8 L6,2 H30 L34,8 L30,14 H6 Z" fill="${ribbonColor}"${ribbonStroke}${ribbonStrokeWidth}/></svg>`;
  } else if (ribbon.startsWith('chevron')) {
    return `<svg width="36" height="16"><path d="M2,2 L10,8 L2,14 H34 L26,8 L34,2 Z" fill="${ribbonColor}"${ribbonStroke}${ribbonStrokeWidth}/></svg>`;
  }
  return '';
}

export function scrollToItem(container, itemId) {
  const item = document.getElementById(itemId);
  if (item) {
    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    let targetScroll = container.scrollLeft;
    if (itemRect.right > containerRect.right) {
      const scrollAmount = (itemRect.right - containerRect.right) + 20;
      targetScroll += scrollAmount;
    } else if (itemRect.left < containerRect.left) {
      const scrollAmount = (containerRect.left - itemRect.left) + 20;
      targetScroll -= scrollAmount;
    }
    targetScroll = Math.max(0, Math.min(targetScroll, container.scrollWidth - container.clientWidth));
    container.offsetHeight;
    requestAnimationFrame(() => {
      container.style.scrollBehavior = 'auto';
      container.scrollLeft = targetScroll;
      requestAnimationFrame(() => {
        const actualScroll = container.scrollLeft;
        if (Math.abs(actualScroll - targetScroll) > 1) {
          container.scrollTo({ left: targetScroll, behavior: 'auto' });
        }
      });
    });
  }
}

export function enableLoopScrolling(container) {
  if (!container || container._loopAttached) return;
  container._loopAttached = true;
  let prev = container.scrollLeft;
  container.addEventListener('scroll', function() {
    const max = container.scrollWidth - container.clientWidth;
    if (max <= 0) return;
    if (container.scrollLeft <= 0 && prev > 0) {
      container.scrollLeft = max - 1;
    } else if (container.scrollLeft >= max && prev < max) {
      container.scrollLeft = 1;
    }
    prev = container.scrollLeft;
  });
}

export function updateCarouselStates() {
  const shieldDiv = document.getElementById('shieldCarousel');
  const ribbonDiv = document.getElementById('ribbonCarousel');
  const iconDiv = document.getElementById('iconCarousel');
  const iconOptions = Object.keys(iconPaths);
  const shieldIdx = shieldOptions.indexOf(window.currentShield);
  const ribbonIdx = ribbonOptions.indexOf(window.currentRibbon);
  const iconIdx = iconOptions.indexOf(window.currentIcon);

  shieldDiv.querySelectorAll('.carousel-item').forEach((el, i) => {
    const isSelected = i === shieldIdx;
    el.classList.toggle('selected', isSelected);
    const path = el.querySelector('path, polygon, ellipse');
    if (path) {
      path.setAttribute('fill', isSelected ? '#555' : '#bbb');
    }
  });

  ribbonDiv.querySelectorAll('.carousel-item').forEach((el, i) => {
    const isSelected = i === ribbonIdx;
    el.classList.toggle('selected', isSelected);
    const path = el.querySelector('path, rect');
    if (path) {
      path.setAttribute('fill', isSelected ? '#555' : '#bbb');
    }
  });

  iconDiv.querySelectorAll('.carousel-item').forEach((el, i) => {
    const isSelected = i === iconIdx;
    el.classList.toggle('selected', isSelected);
    const path = el.querySelector('path');
    if (path) {
      path.setAttribute('fill', isSelected ? '#555' : '#bbb');
    }
  });
}

export function updateCarousels() {
  const shieldDiv = document.getElementById('shieldCarousel');
  const ribbonDiv = document.getElementById('ribbonCarousel');
  const iconDiv = document.getElementById('iconCarousel');
  const iconOptions = Object.keys(iconPaths);
  const currentIcon = window.currentIcon;
  const shieldIdx = shieldOptions.indexOf(window.currentShield);
  const ribbonIdx = ribbonOptions.indexOf(window.currentRibbon);
  const iconIdx = iconOptions.indexOf(currentIcon);

  if (!window.carouselsInitialized) {
    const shieldScroll = shieldDiv.scrollLeft;
    const ribbonScroll = ribbonDiv.scrollLeft;
    const iconScroll = iconDiv.scrollLeft;
    shieldDiv.innerHTML = renderCarousel(shieldOptions, window.currentShield, 'shield');
    ribbonDiv.innerHTML = renderCarousel(ribbonOptions, window.currentRibbon, 'ribbon');
    iconDiv.innerHTML = renderIconCarousel(iconOptions, currentIcon);
    enableLoopScrolling(shieldDiv.querySelector('.carousel-items'));
    enableLoopScrolling(ribbonDiv.querySelector('.carousel-items'));
    enableLoopScrolling(iconDiv.querySelector('.carousel-items'));
    shieldDiv.scrollLeft = shieldScroll;
    ribbonDiv.scrollLeft = ribbonScroll;
    iconDiv.scrollLeft = iconScroll;
    shieldDiv.querySelectorAll('.carousel-item').forEach(el => {
      el.onclick = () => {
        const idx = +el.getAttribute('data-idx');
        window.currentShield = shieldOptions[idx];
        generateBadge();
        updateCarouselStates();
        announce(`Shield changed to ${window.currentShield.replace(/-/g, ' ')}`);
      };
    });
    ribbonDiv.querySelectorAll('.carousel-item').forEach(el => {
      el.onclick = () => {
        const idx = +el.getAttribute('data-idx');
        window.currentRibbon = ribbonOptions[idx];
        generateBadge();
        updateCarouselStates();
        announce(`Ribbon changed to ${window.currentRibbon.replace(/-/g, ' ')}`);
      };
    });
    iconDiv.querySelectorAll('.carousel-item').forEach(el => {
      el.onclick = () => {
        const idx = +el.getAttribute('data-idx');
        window.currentIcon = iconOptions[idx];
        generateBadge();
        updateCarouselStates();
        announce(`Icon changed to ${window.currentIcon.replace(/_/g, ' ')}`);
      };
    });
    setTimeout(() => {
      centerSelectedItem(shieldDiv, `shield-carousel-item-${shieldIdx}`);
      centerSelectedItem(ribbonDiv, `ribbon-carousel-item-${ribbonIdx}`);
      centerSelectedItem(iconDiv, `icon-carousel-item-${iconIdx}`);
      window.carouselsInitialized = true;
    }, 50);
  } else {
    updateCarouselStates();
  }
  shieldDiv.querySelectorAll('.carousel-item').forEach(el => el.tabIndex = -1);
  ribbonDiv.querySelectorAll('.carousel-item').forEach(el => el.tabIndex = -1);
  iconDiv.querySelectorAll('.carousel-item').forEach(el => el.tabIndex = -1);
  iconDiv.tabIndex = -1;
}

export function moveCarousel(type, dir) {
  if (type === 'shield') {
    const currentIdx = shieldOptions.indexOf(window.currentShield);
    const newIdx = (currentIdx + dir + shieldOptions.length) % shieldOptions.length;
    if (newIdx !== currentIdx) {
      window.currentShield = shieldOptions[newIdx];
      generateBadge();
      updateCarouselStates();
      announce(`Shield changed to ${window.currentShield.replace(/-/g, ' ')}`);
      requestAnimationFrame(() => {
        const container = document.querySelector('#shieldCarousel .carousel-items');
        scrollToItem(container, `shield-carousel-item-${newIdx}`);
      });
    }
  } else if (type === 'ribbon') {
    const currentIdx = ribbonOptions.indexOf(window.currentRibbon);
    const newIdx = (currentIdx + dir + ribbonOptions.length) % ribbonOptions.length;
    if (newIdx !== currentIdx) {
      window.currentRibbon = ribbonOptions[newIdx];
      generateBadge();
      updateCarouselStates();
      announce(`Ribbon changed to ${window.currentRibbon.replace(/-/g, ' ')}`);
      requestAnimationFrame(() => {
        const container = document.querySelector('#ribbonCarousel .carousel-items');
        scrollToItem(container, `ribbon-carousel-item-${newIdx}`);
      });
    }
  }
}

export function renderIconCarousel(iconOptions, currentIcon) {
  const idx = iconOptions.indexOf(currentIcon);
  let html = `<div class="carousel-items" style="display:inline-block;overflow-x:auto;white-space:nowrap;width:280px;vertical-align:middle;padding:4px;" role="listbox" aria-label="Icon options">`;
  iconOptions.forEach((icon, i) => {
    const selected = i === idx;
    const fill = selected ? '#555' : '#bbb';
    const iconLabel = icon.replace(/_/g, ' ');
    html += `<span class="carousel-item${selected ? ' selected' : ''}" data-idx="${i}" id="icon-carousel-item-${i}" style="display:inline-block;margin:0 2px;overflow:visible; border:0px solid transparent;" role="option" aria-selected="${selected}" aria-label="${iconLabel}" tabindex="-1">`;
    if (iconPaths[icon]) {
      html += `<svg width="36" height="36" style="display:block;" aria-hidden="true"><path d="${iconPaths[icon]}" fill="${fill}"/></svg>`;
    } else {
      html += `<svg width="36" height="36" style="display:block;" aria-hidden="true"><rect width="36" height="36" fill="#eee"/></svg>`;
    }
    html += '</span>';
  });
  html += `</div>`;
  return html;
}

export const centerSelectedItem = (container, itemId) => {
  const item = document.getElementById(itemId);
  if (item) {
    const containerWidth = container.clientWidth;
    const itemLeft = item.offsetLeft;
    const itemWidth = item.offsetWidth;
    const scrollLeft = Math.max(0, itemLeft - (containerWidth / 2) + (itemWidth / 2));
    const currentScroll = container.scrollLeft;
    if (Math.abs(currentScroll - scrollLeft) > 1) {
      container.style.scrollBehavior = 'auto';
      container.style.overflowX = 'auto';
      container.offsetHeight;
      requestAnimationFrame(() => {
        container.scrollLeft = scrollLeft;
        requestAnimationFrame(() => {
          const actualScroll = container.scrollLeft;
          if (Math.abs(actualScroll - scrollLeft) > 1) {
            container.scrollTo({ left: scrollLeft, behavior: 'auto' });
          }
        });
      });
    }
  }
};
