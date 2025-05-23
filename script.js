    const colors = ['#2196f3'];
    let baseColor = colors[0];
    let activeCarousel = null; // Track the active carousel
    let currentSelection = null; // Last clicked carousel item element
    let currentCarouselContainer = null; // Parent container of the last clicked item
// Load a small set of icons immediately so the page remains responsive
let iconPaths = {
  "emoji_events": "M19,5h -2V3H7v2H5C3.9,5,3,5.9,3,7v1c0,2.55,1.92,4.63,4.39,4.94c0.63,1.5,1.98,2.63,3.61,2.96V19H7v2h10v -2h -4v -3.1c1.63 -0.33,2.98 -1.46,3.61 -2.96C19.08,12.63,21,10.55,21,8V7C21,5.9,20.1,5,19,5z M5,8V7h2v3.82C5.84,10.4,5,9.3,5,8z M12,14c -1.65,0 -3-1.35 -3-3V5h6v6C15,12.65,13.65,14,12,14z M19,8c0,1.3 -0.84,2.4 -2,2.82V7h2V8z",
  "catching_pokemon": "M14.5,12c0,1.38  -1.12,2.5  -2.5,2.5c  -1.38,0  -2.5  -1.12  -2.5  -2.5s1.12  -2.5,2.5  -2.5C13.38,9.5,14.5,10.62,14.5,12z M22,12 c0,5.52  -4.48,10  -10,10C6.48,22,2,17.52,2,12S6.48,2,12,2C17.52,2,22,6.48,22,12z M20,12h  -4c0  -2.21  -1.79  -4-4  -4c  -2.21,0  -4,1.79  -4,4H4 c0,4.41,3.59,8,8,8C16.41,20,20,16.41,20,12z",
  "workspace_premium": "M9.68,13.69L12,11.93l2.31,1.76l  -0.88  -2.85L15.75,9h-2.84L12,6.19L11.09,9H8.25l2.31,1.84L9.68,13.69z M20,10 c0  -4.42  -3.58  -8-8-8s-8,3.58  -8,8c0,2.03,0.76,3.87,2,5.28V23l6  -2l6,2v  -7.72C19.24,13.87,20,12.03,20,10z M12,4c3.31,0,6,2.69,6,6 s-2.69,6  -6,6s-6  -2.69  -6-6S8.69,4,12,4z M12,19l  -4,1.02v  -3.1C9.18,17.6,10.54,18,12,18s2.82  -0.4,4  -1.08v3.1L12,19z",
  "smoke_free": "M20.5 13H22v3h  -1.5zM18 13h1.5v3H18zm  -1 0h  -2.34L17 15.34zm  -2.5  -4.35h1.53c1.05 0 1.97.74 1.97 2.05V12h1.5v  -1.64c0  -1.81  -1.6  -3.16  -3.47  -3.16H14.5c  -1.02 0  -1.85-.98  -1.85  -2s.83  -1.75 1.85  -1.75v  -1.5c  -1.85 0  -3.35 1.5  -3.35 3.35s1.5 3.35 3.35 3.35zm4.35  -3.92c.62-.61 1  -1.45 1  -2.38h  -1.5c0 1.02-.83 1.85  -1.85 1.85v1.5c2.24 0 4 1.83 4 4.07V12H22v -2.24c0  -2.22  -1.28  -4.14  -3.15  -5.03zM3.41 4.59L2 6l7 7H2v3h10l7 7 1.41-1.41z",
  "verified": "M23,11.99l -2.44 -2.79l0.34 -3.69l -3.61 -0.82L15.4,1.5L12,2.96L8.6,1.5L6.71,4.69L3.1,5.5L3.44,9.2L1,11.99l2.44,2.79 l -0.34,3.7l3.61,0.82L8.6,22.5l3.4 -1.47l3.4,1.46l1.89 -3.19l3.61 -0.82l -0.34 -3.69L23,11.99z M19.05,13.47l -0.56,0.65l0.08,0.85 l0.18,1.95l -1.9,0.43l -0.84,0.19l -0.44,0.74l -0.99,1.68l -1.78 -0.77L12,18.85l -0.79,0.34l -1.78,0.77l -0.99 -1.67l -0.44 -0.74 l -0.84-0.19l -1.9 -0.43l0.18 -1.96l0.08 -0.85l -0.56 -0.65l -1.29 -1.47l1.29 -1.48l0.56 -0.65L5.43,9.01L5.25,7.07l1.9 -0.43l0.84 -0.19 l0.44 -0.74l0.99 -1.68l1.78,0.77L12,5.14l0.79 -0.34l1.78 -0.77l0.99,1.68l0.44,0.74l0.84,0.19l1.9,0.43l -0.18,1.95l -0.08,0.85 l0.56,0.65l1.29,1.47L19.05,13.47z M10.09,13.75L7.77,11.42L6.29,12.91L10.09,16.72L17.43,9.36L15.95,7.87z",
  "military_tech": "M17,10.43V2H7v8.43c0,0.35,0.18,0.68,0.49,0.86l4.18,2.51l -0.99,2.34l -3.41,0.29l2.59,2.24L9.07,22L12,20.23L14.93,22 l -0.78 -3.33l2.59 -2.24l -3.41 -0.29l -0.99 -2.34l4.18 -2.51C16.82,11.11,17,10.79,17,10.43z M11,11.07l-2-1.2V4h2V11.07z M15,9.87 l -2,1.2V4h2V9.87z",
  "science": "M13,11.33L18,18H6l5 -6.67V6h2 M15.96,4H8.04C7.62,4,7.39,4.48,7.65,4.81L9,6.5v4.17L3.2,18.4C2.71,19.06,3.18,20,4,20h16 c0.82,0,1.29 -0.94,0.8 -1.6L15,10.67V6.5l1.35 -1.69C16.61,4.48,16.38,4,15.96,4L15.96,4z"
};

// Load additional icon chunks asynchronously and merge them
async function loadIconChunk(file) {
    const res = await fetch(file);
    const data = await res.json();
    Object.assign(iconPaths, data);
    if (window.carouselsInitialized) {
        window.carouselsInitialized = false;
        updateCarousels();
    }
}



    function adjustColor(col, amt) {
        let num = parseInt(col.slice(1),16);
        let r = Math.min(255, Math.max(0, (num >> 16) + amt));
        let g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
        let b = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
        return '#' + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
    }

    // Store badge text in a variable now that the input is removed
    let badgeTextValue = 'Badge Name';
    // Store the currently selected icon

    function generateBadge() {
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

            // Build the SVG content in memory first
            let svgContent = '';

            // Render the shield
            let shieldStroke = '';
            let shieldStrokeWidth = '';
            if (shield.endsWith('-outline')) {
                shieldStroke = ' stroke="#f0f0f0"'; // Changed to a lighter grey
                // Increase stroke width for outline styles
                if (shield.startsWith('diamond')) {
                    shieldStrokeWidth = ' stroke-width="7.5"';
                } else {
                    shieldStrokeWidth = ' stroke-width="3"';
                }
            }
            if (shield === 'diamond' || shield === 'diamond-outline') {
                const cx = 150, cy = 150;
                const w = 184, h = 244;  // Increased from 148x200 to 184x244 (16px buffer from edges)
                const halfW = w/2, halfH = h/2;
                const points = [
                    `${cx},${cy-halfH}`,
                    `${cx+halfW},${cy-9}`,
                    `${cx},${cy+halfH}`,
                    `${cx-halfW},${cy-9}`
                ].join(' ');
                svgContent += `<polygon id="badgeShieldSvg" points="${points}" fill="${shieldColor}"${shieldStroke}${shieldStrokeWidth} />`;
            } else if (shield.startsWith('decorative') && !shield.startsWith('decorative-scallop') && !shield.startsWith('decorative-concave')) {
                const decorativeScale = 244 / 22;  // Increased from 200/22 to 244/22
                svgContent += `<path id="badgeShieldSvg" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="${shieldColor}"${shieldStroke}${shieldStrokeWidth} transform="translate(150, 150) scale(${decorativeScale}) translate(-12, -12)" />`;
            } else if (shield.startsWith('decorative-concave')) {
                const decorativeScale = 244 / 22;  // Increased from 200/22 to 244/22
                svgContent += `<path id="badgeShieldSvg" d="M12 1 Q10.2 5 3 8 v3 c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V8 Q13.8 5 12 1z" fill="${shieldColor}"${shieldStroke}${shieldStrokeWidth} transform="translate(150, 150) scale(${decorativeScale}) translate(-12, -12)" />`;
            } else if (shield.startsWith('decorative-scallop')) {
                const decorativeScale = 244 / 24;  // Increased from 200/24 to 244/24
                svgContent += `<ellipse id="badgeShieldSvg" cx="12" cy="12" rx="9" ry="12" fill="${shieldColor}"${shieldStroke}${shieldStrokeWidth} transform="translate(150, 150) scale(${decorativeScale}) translate(-12, -12)" />`;
            }

            // Render the ribbon
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

            // Render the icon
            if (iconPaths[icon]) {
                svgContent += `<path id="badgeIconSvg" d="${iconPaths[icon]}" fill="white" transform="translate(150, 136) scale(4.8) translate(-12, -12)" />`;
            }

            // Add badge text
            svgContent += `<text id="badgeTextSvg" pointer-events="all" x="150" y="216" text-anchor="middle" fill="white" font-size="16px" font-weight="bold" font-family="Arial, Helvetica, sans-serif" style="cursor:pointer;" title="Click to edit badge name" tabindex="0" role="textbox" aria-label="Enter badge name here" aria-multiline="false">${text}</text>`;

            // Update the SVG in one operation
            const svg = document.getElementById('badgeSvg');
            if (!svg) {
                throw new Error('Badge preview element not found');
            }
            svg.innerHTML = svgContent;

            // Add keyboard event listener for the text element
            const textElem = document.getElementById('badgeTextSvg');
            if (textElem) {
                textElem.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        showTextInput();
                    }
                });
            }
        } catch (err) {
            showError('Failed to generate badge: ' + err.message);
        }
    }

    // Overlay input for direct SVG text editing
    function showTextInput() {
        const svg = document.getElementById('badgeSvg');
        const textElem = document.getElementById('badgeTextSvg');
        if (!textElem) return;
        const pt = svg.createSVGPoint();
        pt.x = 150; pt.y = 216;
        const ctm = svg.getScreenCTM();
        const transformed = pt.matrixTransform(ctm);
        // Remove any existing input
        const oldInput = document.getElementById('svgTextInput');
        if (oldInput) oldInput.remove();
        // Create input
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'svgTextInput';
        input.value = badgeTextValue;
        input.style.position = 'fixed';
        input.style.left = (transformed.x - 82.5) + 'px'; // 165/2 = 82.5
        input.style.top = (transformed.y - 26) + 'px';   // was -28, now 2px lower
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
        // On blur or Enter, update badge text and remove input
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

    // Delegate click to badge text in SVG
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'badgeTextSvg') {
            showTextInput();
        }
    });

    async function downloadPNG() {
        try {
            const svg = document.getElementById('badgeSvg');
            if (!svg) {
                throw new Error('Badge preview not found');
            }

            const svgStr = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgStr], {type: 'image/svg+xml;charset=utf-8'});
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
         //   showError('Failed to save badge: ' + err.message);
        }
    }

    // Remove setColor and hex input logic, just use color input
document.addEventListener('DOMContentLoaded', async function() {
        window.currentIcon = window.currentIcon || Object.keys(iconPaths)[0];
        document.getElementById('customColor').addEventListener('input', function() {
            baseColor = this.value;
            generateBadge();
            // Announce color change
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
        // Load remaining icon sets in the background
        (async () => {
            const chunks = [
                'icon_paths_part1.json',
                'icon_paths_part2.json',
                'icon_paths_part3.json',
                'icon_paths_part4.json'
            ];
            for (const chunk of chunks) {
                await loadIconChunk(chunk);
            }
        })();

        const shieldBox = document.getElementById('shieldCarouselBox');
        const ribbonBox = document.getElementById('ribbonCarouselBox');
        const iconBox = document.getElementById('iconCarouselBox');

        function setActiveCarousel(type) {
            activeCarousel = type;
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


    // Add new ribbon options to the carousel
    const ribbonOptions = [
        'rect', 'rounded', 'concave', 'pointed', 'chevron',
        'rect-outline', 'rounded-outline', 'concave-outline', 'pointed-outline', 'chevron-outline'
    ];
    window.currentRibbon = window.currentRibbon || 'rounded';

    // Add new shield options to the carousel
    const shieldOptions = [
        'diamond', 'decorative', 'decorative-concave', 'decorative-scallop',
        'diamond-outline', 'decorative-outline', 'decorative-concave-outline', 'decorative-scallop-outline'
    ];
    window.currentShield = window.currentShield || 'decorative';


    // Carousel rendering and logic
    function renderCarousel(options, current, type) {
        // type: 'shield' or 'ribbon'
        const visibleCount = 5;
        const idx = options.indexOf(current);
        // Render all items in a scrollable row

        let html = `<div class="carousel-items" style="display:inline-block;overflow-x:auto;white-space:nowrap;width:280px;vertical-align:middle;padding:4px;" role="listbox" aria-label="${type} options" tabindex="-1">`;
        for (let i = 0; i < options.length; i++) {
            let preview = type==='shield' ? getShieldPreviewSVG(options[i], i===idx) : getRibbonPreviewSVG(options[i], i===idx);
            let itemClass = `carousel-item${i===idx?' selected':''}${type==='ribbon'?' ribbon':''}`;
            let itemLabel = type === 'shield' ? 
                options[i].replace(/-/g, ' ').replace(/outline$/, 'outline style') :
                options[i].replace(/-/g, ' ').replace(/outline$/, 'outline style');
            html += `<span class="${itemClass}" data-idx="${i}" id="${type}-carousel-item-${i}" style="display:inline-block;" role="option" aria-selected="${i===idx}" aria-label="${itemLabel}" tabindex="-1">`;
            html += preview;
            html += '</span>';
        }
        html += `</div>`;
        return html;
    }

    function getShieldPreviewSVG(shield, selected = false) {
        // Consistent thumbnail: 36x36 SVG, no background, no border
        let shieldColor = selected ? '#555' : '#bbb';
        let shieldStroke = '', shieldStrokeWidth = '';
        if (shield.endsWith('-outline')) {
            shieldStroke = ' stroke="#f0f0f0"'; // Changed to a lighter grey
            // Increase stroke width for outline styles
            if (shield.startsWith('diamond')) {
                shieldStrokeWidth = ' stroke-width="4.5"';
            } else {
                shieldStrokeWidth = ' stroke-width="3"';
            }
        }
        // Diamond: polygon, scaled to fit 36x36
        if (shield.startsWith('diamond')) {
            // Main badge: 148x200, center (150,150)
            // Thumbnail: 36x36, center (18,18)
            // Scale: 36/200 = 0.18
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
        // Decorative: path, scale to 36px height
        if (shield.startsWith('decorative') && !shield.startsWith('decorative-scallop') && !shield.startsWith('decorative-concave')) {
            // Path height is 22 units, scale to 36px
            const scale = 36/22;
            return `<svg width="36" height="36"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="${shieldColor}"${shieldStroke}${shieldStrokeWidth} transform="translate(18,18) scale(${scale}) translate(-12,-12)"/></svg>`;
        }
        // Decorative-concave: path, scale to 36px height
        if (shield.startsWith('decorative-concave')) {
            // Path height is 22 units, scale to 36px
            const scale = 36/22;
            return `<svg width="36" height="36"><path d="M12 1 Q10.2 5 3 8 v3 c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V8 Q13.8 5 12 1z" fill="${shieldColor}"${shieldStroke}${shieldStrokeWidth} transform="translate(18,18) scale(${scale}) translate(-12,-12)"/></svg>`;
        }
        // Decorative-scallop: ellipse, scale to 36px height
        if (shield.startsWith('decorative-scallop')) {
            // Ellipse height is 24 units, scale to 36px
            const scale = 36/24;
            return `<svg width="36" height="36"><ellipse cx="12" cy="12" rx="9" ry="12" fill="${shieldColor}"${shieldStroke}${shieldStrokeWidth} transform="translate(18,18) scale(${scale}) translate(-12,-12)"/></svg>`;
        }
        return '';
    }
    function getRibbonPreviewSVG(ribbon, selected = false) {
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

    // Add this new function before updateCarousels
    function scrollToItem(container, itemId) {
        const item = document.getElementById(itemId);
        if (item) {
            const containerRect = container.getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();
            
            let targetScroll = container.scrollLeft;
            
            if (itemRect.right > containerRect.right) {
                const scrollAmount = (itemRect.right - containerRect.right) + 20;
                targetScroll += scrollAmount;
            }
            else if (itemRect.left < containerRect.left) {
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
                        container.scrollTo({
                            left: targetScroll,
                            behavior: 'auto'
                        });
                    }
                });
            });
        }
    }

    // Enable looping scroll behaviour for a carousel container
    function enableLoopScrolling(container) {
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

    function updateCarouselStates() {
        const shieldDiv = document.getElementById('shieldCarousel');
        const ribbonDiv = document.getElementById('ribbonCarousel');
        const iconDiv = document.getElementById('iconCarousel');
        const iconOptions = Object.keys(iconPaths);
        const shieldIdx = shieldOptions.indexOf(window.currentShield);
        const ribbonIdx = ribbonOptions.indexOf(window.currentRibbon);
        const iconIdx = iconOptions.indexOf(window.currentIcon);

        // Update visual states only
        shieldDiv.querySelectorAll('.carousel-item').forEach((el, i) => {
            const isSelected = i === shieldIdx;
            el.classList.toggle('selected', isSelected);
            const svg = el.querySelector('svg');
            if (svg) {
                const path = svg.querySelector('path, polygon, ellipse');
                if (path) {
                    path.setAttribute('fill', isSelected ? '#555' : '#bbb');
                }
            }
        });

        ribbonDiv.querySelectorAll('.carousel-item').forEach((el, i) => {
            const isSelected = i === ribbonIdx;
            el.classList.toggle('selected', isSelected);
            const svg = el.querySelector('svg');
            if (svg) {
                const path = svg.querySelector('path, rect');
                if (path) {
                    path.setAttribute('fill', isSelected ? '#555' : '#bbb');
                }
            }
        });

        iconDiv.querySelectorAll('.carousel-item').forEach((el, i) => {
            const isSelected = i === iconIdx;
            el.classList.toggle('selected', isSelected);
            const svg = el.querySelector('svg');
            if (svg) {
                const path = svg.querySelector('path');
                if (path) {
                    path.setAttribute('fill', isSelected ? '#555' : '#bbb');
                }
            }
        });
    }

    function updateCarousels() {
        // Batch DOM reads
        const shieldDiv = document.getElementById('shieldCarousel');
        const ribbonDiv = document.getElementById('ribbonCarousel');
        const iconDiv = document.getElementById('iconCarousel');
        const iconOptions = Object.keys(iconPaths);
        const currentIcon = window.currentIcon;
        const shieldIdx = shieldOptions.indexOf(window.currentShield);
        const ribbonIdx = ribbonOptions.indexOf(window.currentRibbon);
        const iconIdx = iconOptions.indexOf(currentIcon);

        // Only update carousel contents if they haven't been initialized
        if (!window.carouselsInitialized) {
            // Store current scroll positions
            const shieldScroll = shieldDiv.scrollLeft;
            const ribbonScroll = ribbonDiv.scrollLeft;
            const iconScroll = iconDiv.scrollLeft;

            // Update carousel contents
            shieldDiv.innerHTML = renderCarousel(shieldOptions, window.currentShield, 'shield');
            ribbonDiv.innerHTML = renderCarousel(ribbonOptions, window.currentRibbon, 'ribbon');
            iconDiv.innerHTML = renderIconCarousel(iconOptions, currentIcon);

            // Attach looping scroll behaviour
            enableLoopScrolling(shieldDiv.querySelector('.carousel-items'));
            enableLoopScrolling(ribbonDiv.querySelector('.carousel-items'));
            enableLoopScrolling(iconDiv.querySelector('.carousel-items'));

            // Restore scroll positions
            shieldDiv.scrollLeft = shieldScroll;
            ribbonDiv.scrollLeft = ribbonScroll;
            iconDiv.scrollLeft = iconScroll;

            // Add event listeners
            shieldDiv.querySelectorAll('.carousel-item').forEach(el => {
                el.onclick = () => {
                    const idx = +el.getAttribute('data-idx');
                    window.currentShield = shieldOptions[idx];
                    currentSelection = el;
                    currentCarouselContainer = shieldDiv;
                    generateBadge();
                    updateCarouselStates();
                };
            });

            ribbonDiv.querySelectorAll('.carousel-item').forEach(el => {
                el.onclick = () => {
                    const idx = +el.getAttribute('data-idx');
                    window.currentRibbon = ribbonOptions[idx];
                    currentSelection = el;
                    currentCarouselContainer = ribbonDiv;
                    generateBadge();
                    updateCarouselStates();
                };
            });

            iconDiv.querySelectorAll('.carousel-item').forEach(el => {
                el.onclick = () => {
                    const idx = +el.getAttribute('data-idx');
                    window.currentIcon = iconOptions[idx];
                    currentSelection = el;
                    currentCarouselContainer = iconDiv;
                    generateBadge();
                    updateCarouselStates();
                };
            });

            // Center the selected items only on initial load
            setTimeout(() => {
                centerSelectedItem(shieldDiv, `shield-carousel-item-${shieldIdx}`);
                centerSelectedItem(ribbonDiv, `ribbon-carousel-item-${ribbonIdx}`);
                centerSelectedItem(iconDiv, `icon-carousel-item-${iconIdx}`);
                window.carouselsInitialized = true;
            }, 50);
        } else {
            updateCarouselStates();
        }

        // Set tabindex for all carousel items
        shieldDiv.querySelectorAll('.carousel-item').forEach(el => el.tabIndex = -1);
        ribbonDiv.querySelectorAll('.carousel-item').forEach(el => el.tabIndex = -1);
        iconDiv.querySelectorAll('.carousel-item').forEach(el => el.tabIndex = -1);
        iconDiv.tabIndex = -1;  // Set iconCarousel to non-focusable
    }

    // Initialize carousels
    updateCarousels();

    function moveCarousel(type, dir) {
        if (type === 'shield') {
            const currentIdx = shieldOptions.indexOf(window.currentShield);
            const newIdx = (currentIdx + dir + shieldOptions.length) % shieldOptions.length;
            if (newIdx !== currentIdx) {  // Only update if we're actually changing
                window.currentShield = shieldOptions[newIdx];
                generateBadge();
                updateCarouselStates();
                requestAnimationFrame(() => {
                    const container = document.querySelector('#shieldCarousel .carousel-items');
                    scrollToItem(container, `shield-carousel-item-${newIdx}`);
                });
            }
        } else if (type === 'ribbon') {
            const currentIdx = ribbonOptions.indexOf(window.currentRibbon);
            const newIdx = (currentIdx + dir + ribbonOptions.length) % ribbonOptions.length;
            if (newIdx !== currentIdx) {  // Only update if we're actually changing
                window.currentRibbon = ribbonOptions[newIdx];
                generateBadge();
                updateCarouselStates();
                requestAnimationFrame(() => {
                    const container = document.querySelector('#ribbonCarousel .carousel-items');
                    scrollToItem(container, `ribbon-carousel-item-${newIdx}`);
                });
            }
        }
    }

    // Add arrowPaths for carousel arrows

    function renderIconCarousel(iconOptions, currentIcon) {
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

    // Center the selected items
    const centerSelectedItem = (container, itemId) => {
        const item = document.getElementById(itemId);
        if (item) {
            const scrollWidth = container.scrollWidth;
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
                            container.scrollTo({
                                left: scrollLeft,
                                behavior: 'auto'
                            });
                        }
                    });
                });
            }
        }
    };


