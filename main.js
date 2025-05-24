import { iconPaths, loadIconChunk } from './icons.js';
import { setBaseColor, generateBadge, showTextInput, downloadPNG } from './badgeGenerator.js';
import { updateCarousels, updateCarouselStates, moveCarousel, scrollToItem } from "./carousel.js";

window.downloadPNG = downloadPNG;

document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'badgeTextSvg') {
    showTextInput();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  window.currentIcon = window.currentIcon || Object.keys(iconPaths)[0];
  const colorInput = document.getElementById('customColor');
  colorInput.addEventListener('input', function() {
    setBaseColor(this.value);
    generateBadge();
    const colorName = this.value;
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-9999px';
    announcement.textContent = `Color changed to ${colorName}`;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  });

  updateCarousels();

  (async () => {
    const chunks = [
      'icon_paths_part1.json',
      'icon_paths_part2.json',
      'icon_paths_part3.json',
      'icon_paths_part4.json'
    ];
    for (const chunk of chunks) {
      await loadIconChunk(chunk);
      updateCarousels();
    }
  })();

  const shieldBox = document.getElementById('shieldCarouselBox');
  const ribbonBox = document.getElementById('ribbonCarouselBox');
  const iconBox = document.getElementById('iconCarouselBox');

  function setActiveCarousel(type) {
    shieldBox.classList.toggle('focused', type === 'shield');
    ribbonBox.classList.toggle('focused', type === 'ribbon');
    iconBox.classList.toggle('focused', type === 'icon');
  }

  shieldBox.addEventListener('focus', () => setActiveCarousel('shield'));
  ribbonBox.addEventListener('focus', () => setActiveCarousel('ribbon'));
  iconBox.addEventListener('focus', () => setActiveCarousel('icon'));

  shieldBox.addEventListener('click', () => setActiveCarousel('shield'));
  ribbonBox.addEventListener('click', () => setActiveCarousel('ribbon'));
  iconBox.addEventListener('click', () => setActiveCarousel('icon'));

  shieldBox.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      moveCarousel('shield', -1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      moveCarousel('shield', 1);
    }
    if (e.key === 'Tab') {
      setActiveCarousel(null);
    }
  });

  ribbonBox.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      moveCarousel('ribbon', -1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      moveCarousel('ribbon', 1);
    }
    if (e.key === 'Tab') {
      setActiveCarousel(null);
    }
  });

  iconBox.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const iconOptions = Object.keys(iconPaths);
      let idx = iconOptions.indexOf(window.currentIcon);
      if (e.key === 'ArrowLeft') idx = (idx - 1 + iconOptions.length) % iconOptions.length;
      if (e.key === 'ArrowRight') idx = (idx + 1) % iconOptions.length;
      window.currentIcon = iconOptions[idx];
      generateBadge();
      updateCarouselStates();
      requestAnimationFrame(() => {
        const container = document.querySelector('#iconCarousel .carousel-items');
        scrollToItem(container, `icon-carousel-item-${idx}`);
      });
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      setActiveCarousel(null);
    }
  });

  function outsideCarousels(el) {
    return !shieldBox.contains(el) && !ribbonBox.contains(el) && !iconBox.contains(el);
  }

  document.addEventListener('click', function(e) {
    if (outsideCarousels(e.target)) {
      setActiveCarousel(null);
    }
  });

  document.addEventListener('focusin', function(e) {
    if (outsideCarousels(e.target)) {
      setActiveCarousel(null);
    }
  });

  window.addEventListener('blur', () => setActiveCarousel(null));
  generateBadge();
});
