import { iconPaths } from './icons.js';
import { adjustColor, showError } from './utils.js';

export let baseColor = '#2196f3';
let badgeTextValue = 'Badge Name';

export function setBaseColor(color) {
  baseColor = color;
}

export function generateBadge() {
  try {
    const ribbon = window.currentRibbon || 'rounded';
    const shield = window.currentShield || 'decorative';
    const icon = window.currentIcon;
    const text = badgeTextValue;

    if (!icon || !iconPaths[icon]) {
      throw new Error('Invalid icon selected');
    }

    const ribbonColor = adjustColor(baseColor, -30);
    const shieldColor = adjustColor(baseColor, 30);

    let svgContent = '';
    let shieldStroke = '';
    let shieldStrokeWidth = '';
    if (shield.endsWith('-outline')) {
      shieldStroke = ' stroke="#f0f0f0"';
      if (shield.startsWith('diamond')) {
        shieldStrokeWidth = ' stroke-width="7.5"';
      } else {
        shieldStrokeWidth = ' stroke-width="3"';
      }
    }

    if (shield === 'diamond' || shield === 'diamond-outline') {
      const cx = 150, cy = 150;
      const w = 184, h = 244;
      const halfW = w / 2, halfH = h / 2;
      const points = [
        `${cx},${cy - halfH}`,
        `${cx + halfW},${cy - 9}`,
        `${cx},${cy + halfH}`,
        `${cx - halfW},${cy - 9}`
      ].join(' ');
      svgContent += `<polygon id="badgeShieldSvg" points="${points}" fill="${shieldColor}"${shieldStroke}${shieldStrokeWidth} />`;
    } else if (shield.startsWith('decorative') && !shield.startsWith('decorative-scallop') && !shield.startsWith('decorative-concave')) {
      const decorativeScale = 244 / 22;
      svgContent += `<path id="badgeShieldSvg" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="${shieldColor}"${shieldStroke}${shieldStrokeWidth} transform="translate(150, 150) scale(${decorativeScale}) translate(-12, -12)" />`;
    } else if (shield.startsWith('decorative-concave')) {
      const decorativeScale = 244 / 22;
      svgContent += `<path id="badgeShieldSvg" d="M12 1 Q10.2 5 3 8 v3 c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V8 Q13.8 5 12 1z" fill="${shieldColor}"${shieldStroke}${shieldStrokeWidth} transform="translate(150, 150) scale(${decorativeScale}) translate(-12, -12)" />`;
    } else if (shield.startsWith('decorative-scallop')) {
      const decorativeScale = 244 / 24;
      svgContent += `<ellipse id="badgeShieldSvg" cx="12" cy="12" rx="9" ry="12" fill="${shieldColor}"${shieldStroke}${shieldStrokeWidth} transform="translate(150, 150) scale(${decorativeScale}) translate(-12, -12)" />`;
    }

    let ribbonStroke = '';
    let ribbonStrokeWidth = '';
    if (ribbon.endsWith('-outline')) {
      ribbonStrokeWidth = ' stroke-width="2"';
      ribbonStroke = ' stroke="white"';
    }
    if (ribbon === 'rect' || ribbon === 'rect-outline') {
      svgContent += `<rect id="badgeRibbonSvg" x="50" y="190" width="200" height="40" fill="${ribbonColor}"${ribbonStroke}${ribbonStrokeWidth} />`;
    } else if (ribbon === 'rounded' || ribbon === 'rounded-outline') {
      svgContent += `<rect id="badgeRibbonSvg" x="50" y="190" width="200" height="40" rx="20" fill="${ribbonColor}"${ribbonStroke}${ribbonStrokeWidth} />`;
    } else if (ribbon === 'concave' || ribbon === 'concave-outline') {
      svgContent += `<path id="badgeRibbonSvg" d="M50,190 Q60,210 50,230 H250 Q240,210 250,190 Z" fill="${ribbonColor}"${ribbonStroke}${ribbonStrokeWidth} />`;
    } else if (ribbon === 'pointed' || ribbon === 'pointed-outline') {
      svgContent += `<path id="badgeRibbonSvg" d="M50,210 L60,190 H240 L250,210 L240,230 H60 Z" fill="${ribbonColor}"${ribbonStroke}${ribbonStrokeWidth} />`;
    } else if (ribbon === 'chevron' || ribbon === 'chevron-outline') {
      svgContent += `<path id="badgeRibbonSvg" d="M50,190 L70,210 L50,230 H250 L230,210 L250,190 Z" fill="${ribbonColor}"${ribbonStroke}${ribbonStrokeWidth} />`;
    }

    if (iconPaths[icon]) {
      svgContent += `<path id="badgeIconSvg" d="${iconPaths[icon]}" fill="white" transform="translate(150, 136) scale(4.8) translate(-12, -12)" />`;
    }

    // Text element will be created via DOM to avoid injecting unescaped HTML

    const svg = document.getElementById('badgeSvg');
    if (!svg) {
      throw new Error('Badge preview element not found');
    }
    svg.innerHTML = svgContent;

    const textElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElem.id = 'badgeTextSvg';
    textElem.setAttribute('pointer-events', 'all');
    textElem.setAttribute('x', '150');
    textElem.setAttribute('y', '216');
    textElem.setAttribute('text-anchor', 'middle');
    textElem.setAttribute('fill', 'white');
    textElem.setAttribute('font-size', '16px');
    textElem.setAttribute('font-weight', 'bold');
    textElem.setAttribute('font-family', 'Arial, Helvetica, sans-serif');
    textElem.setAttribute('style', 'cursor:pointer;');
    textElem.setAttribute('title', 'Click to edit badge name');
    textElem.setAttribute('tabindex', '0');
    textElem.setAttribute('role', 'textbox');
    textElem.setAttribute('aria-label', 'Enter badge name here');
    textElem.setAttribute('aria-multiline', 'false');
    textElem.textContent = text;
    svg.appendChild(textElem);

    textElem.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showTextInput();
      }
    });
  } catch (err) {
    showError('Failed to generate badge: ' + err.message);
  }
}

export function showTextInput() {
  const svg = document.getElementById('badgeSvg');
  const textElem = document.getElementById('badgeTextSvg');
  if (!textElem) return;
  const pt = svg.createSVGPoint();
  pt.x = 150; pt.y = 216;
  const ctm = svg.getScreenCTM();
  const transformed = pt.matrixTransform(ctm);
  const oldInput = document.getElementById('svgTextInput');
  if (oldInput) oldInput.remove();
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'svgTextInput';
  input.value = badgeTextValue;
  input.style.position = 'fixed';
  input.style.left = (transformed.x - 82.5) + 'px';
  input.style.top = (transformed.y - 26) + 'px';
  input.style.width = '165px';
  input.style.fontSize = '16px';
  input.style.fontWeight = 'bold';
  input.style.fontFamily = 'Arial, Helvetica, sans-serif';
  input.style.color = 'black';
  input.style.background = 'white';
  input.style.border = '2px solid white';
  input.style.borderRadius = '4px';
  input.style.padding = '2px 8px';
  input.style.zIndex = 10000;
  input.style.textAlign = 'center';
  input.style.outline = 'none';
  document.body.appendChild(input);
  input.focus();
  input.select();
  let removed = false;
  function finishEdit() {
    if (removed) return;
    removed = true;
    badgeTextValue = input.value;
    generateBadge();
    if (input.parentNode) input.remove();
  }
  input.addEventListener('blur', finishEdit);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      finishEdit();
    } else if (e.key === 'Escape') {
      if (!removed && input.parentNode) input.remove();
      removed = true;
    }
  });
}

export async function downloadPNG() {
  try {
    const svg = document.getElementById('badgeSvg');
    if (!svg) {
      throw new Error('Badge preview not found');
    }

    const svgStr = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = function() {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 256;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Could not get canvas context');
        }
        ctx.drawImage(img, 0, 0, 256, 256);
        canvas.toBlob(function(blob) {
          if (!blob) {
            throw new Error('Failed to create image blob');
          }
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'badge.png';
          link.click();
          URL.revokeObjectURL(link.href);
        }, 'image/png');
        URL.revokeObjectURL(url);
      } catch (err) {
        showError('Failed to create badge image: ' + err.message);
      }
    };
    img.onerror = function() {
      showError('Failed to load badge preview');
      URL.revokeObjectURL(url);
    };
    img.src = url;
  } catch (err) {
    // showError('Failed to save badge: ' + err.message);
  }
}
