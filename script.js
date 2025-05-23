    const colors = ['#2196f3'];
    let baseColor = colors[0];
    let activeCarousel = null; // Track the active carousel
let iconPaths = {};
async function loadIconPaths(){
  const res = await fetch("icon_paths.json");
  iconPaths = await res.json();
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
        input.style.border = '2px solid red';
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
        await loadIconPaths();
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

        // Focus management for carousels
        let focusedCarousel = null;
        updateCarousels();
        const shieldBox = document.getElementById('shieldCarouselBox');
        const ribbonBox = document.getElementById('ribbonCarouselBox');
        const iconBox = document.getElementById('iconCarouselBox');
        
        shieldBox.addEventListener('focus', function() {
            focusedCarousel = 'shield';
            shieldBox.classList.add('focused');
        });
        shieldBox.addEventListener('blur', function() {
            shieldBox.classList.remove('focused');
        });
        ribbonBox.addEventListener('focus', function() {
            focusedCarousel = 'ribbon';
            ribbonBox.classList.add('focused');
        });
        ribbonBox.addEventListener('blur', function() {
            ribbonBox.classList.remove('focused');
        });
        iconBox.addEventListener('focus', function() {
            focusedCarousel = 'icon';
            iconBox.classList.add('focused');
        });
        iconBox.addEventListener('blur', function() {
            iconBox.classList.remove('focused');
        });
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

            // Restore scroll positions
            shieldDiv.scrollLeft = shieldScroll;
            ribbonDiv.scrollLeft = ribbonScroll;
            iconDiv.scrollLeft = iconScroll;

            // Add event listeners
            shieldDiv.querySelectorAll('.carousel-item').forEach(el => {
                el.onclick = () => {
                    const idx = +el.getAttribute('data-idx');
                    window.currentShield = shieldOptions[idx];
                    generateBadge();
                    updateCarouselStates();
                };
            });

            ribbonDiv.querySelectorAll('.carousel-item').forEach(el => {
                el.onclick = () => {
                    const idx = +el.getAttribute('data-idx');
                    window.currentRibbon = ribbonOptions[idx];
                    generateBadge();
                    updateCarouselStates();
                };
            });

            iconDiv.querySelectorAll('.carousel-item').forEach(el => {
                el.onclick = () => {
                    const idx = +el.getAttribute('data-idx');
                    window.currentIcon = iconOptions[idx];
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

    // Focus management for carousels
    let focusedCarousel = null;
    const shieldBox = document.getElementById('shieldCarouselBox');
    const ribbonBox = document.getElementById('ribbonCarouselBox');
    const iconBox = document.getElementById('iconCarouselBox');
    
    // Focus handlers for outer boxes
    shieldBox.addEventListener('focus', function() {
        focusedCarousel = 'shield';
        shieldBox.classList.add('focused');
    });
    shieldBox.addEventListener('blur', function() {
        shieldBox.classList.remove('focused');
    });
    ribbonBox.addEventListener('focus', function() {
        focusedCarousel = 'ribbon';
        ribbonBox.classList.add('focused');
    });
    ribbonBox.addEventListener('blur', function() {
        ribbonBox.classList.remove('focused');
    });
    iconBox.addEventListener('focus', function() {
        focusedCarousel = 'icon';
        iconBox.classList.add('focused');
    });
    iconBox.addEventListener('blur', function() {
        iconBox.classList.remove('focused');
    });
    
    // Keyboard navigation on outer boxes
    shieldBox.addEventListener('keydown', function(e) {
        if (focusedCarousel === 'shield') {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                moveCarousel('shield', -1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                moveCarousel('shield', 1);
            }
        }
    });
    
    ribbonBox.addEventListener('keydown', function(e) {
        if (focusedCarousel === 'ribbon') {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                moveCarousel('ribbon', -1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                moveCarousel('ribbon', 1);
            }
        }
    });

    iconBox.addEventListener('keydown', function(e) {
        if (focusedCarousel === 'icon') {
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
        }
    });

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

    // Update the event handlers to use the state system
document.addEventListener('DOMContentLoaded', async function() {
        if (!Object.keys(iconPaths).length) await loadIconPaths();
        const carousels = document.querySelectorAll('.carousel-box');
        
        // Function to activate a carousel
        function activateCarousel(carousel) {
            carousels.forEach(c => c.classList.remove('focused'));
            carousel.classList.add('focused');
            activeCarousel = carousel;
        }
        
        carousels.forEach(carousel => {
            // Handle carousel container clicks
            carousel.addEventListener('click', function(e) {
                // Only activate if clicking directly on the carousel container
                if (e.target === this) {
                    activateCarousel(this);
                }
            });

            // Handle carousel container keyboard events
            carousel.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    activateCarousel(this);
                }
            });

            // Handle item clicks
            const items = carousel.querySelectorAll('.carousel-item');
            items.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent carousel container click
                    
                    // Remove selected class from all items in this carousel
                    items.forEach(i => i.classList.remove('selected'));
                    // Add selected class to clicked item
                    this.classList.add('selected');
                    
                    // Activate the parent carousel
                    activateCarousel(carousel);
                    
                    // Remove the redundant click trigger
                    // this.click(); // This line was causing the double-trigger
                });
            });
        });

        // Update the keyboard navigation to use the state system
        document.addEventListener('keydown', function(e) {
            if (!activeCarousel) return;

            const items = activeCarousel.querySelectorAll('.carousel-item');
            const selectedItem = activeCarousel.querySelector('.carousel-item.selected');
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                const direction = e.key === 'ArrowLeft' ? -1 : 1;
                const itemsArray = Array.from(items);
                const currentIndex = itemsArray.indexOf(selectedItem);
                const newIndex = (currentIndex + direction + itemsArray.length) % itemsArray.length;
                
                itemsArray[currentIndex].classList.remove('selected');
                itemsArray[newIndex].classList.add('selected');
                itemsArray[newIndex].click();
                
                // Scroll the new item into view
                const container = activeCarousel.querySelector('.carousel-items');
                const newItem = itemsArray[newIndex];
                const containerRect = container.getBoundingClientRect();
                const itemRect = newItem.getBoundingClientRect();
                
                if (itemRect.left < containerRect.left) {
                    container.scrollLeft -= (containerRect.left - itemRect.left);
                } else if (itemRect.right > containerRect.right) {
                    container.scrollLeft += (itemRect.right - containerRect.right);
                }
            }
        });

        // Keep the original focus management code
        let focusedCarousel = null;
        shieldBox.addEventListener('focus', function() {
            focusedCarousel = this;
            this.classList.add('focused');
        });
        shieldBox.addEventListener('blur', function() {
            focusedCarousel = null;
            this.classList.remove('focused');
        });
        ribbonBox.addEventListener('focus', function() {
            focusedCarousel = this;
            this.classList.add('focused');
        });
        ribbonBox.addEventListener('blur', function() {
            focusedCarousel = null;
            this.classList.remove('focused');
        });
        iconBox.addEventListener('focus', function() {
            focusedCarousel = this;
            this.classList.add('focused');
        });
        iconBox.addEventListener('blur', function() {
            focusedCarousel = null;
            this.classList.remove('focused');
        });
    });

