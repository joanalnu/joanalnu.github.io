// Minimalist Research Portfolio Script

document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScroll();
    setupMobileExpandableItems();
    setupWavesBackground();
});

function setupSmoothScroll() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Update URL without scrolling
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            }
        });
    });
}

function setupMobileExpandableItems() {
    // Check if device supports touch
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    if (isTouchDevice) {
        // Add click handlers for expandable items on touch devices
        const expandableItems = document.querySelectorAll('.research-item, .publication-item, .education-item, .recognition-item, .activity-item, .update-item');
        
        expandableItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Don't toggle if clicking on a link
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                    return;
                }
                
                // Toggle expanded state
                this.classList.toggle('expanded');
            });
            
            // Add visual indicator that item is tappable
            item.style.cursor = 'pointer';
        });
    }
}

function setupWavesBackground() {
    const header = document.querySelector('header');
    if (!header) {
        return;
    }

    const canvas = document.createElement('canvas');
    canvas.id = 'waves-background';
    header.prepend(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }

    const config = {
        lineColor: getWaveLineColor(),
        waveSpeedX: 0.012,
        waveSpeedY: 0.008,
        waveAmpX: 22,
        waveAmpY: 18,
        flowAmp: 12,
        strainAmp: 22,
        fluidAmp: 18,
        swirlAmp: 26,
        xGap: 10,
        yGap: 26,
        rippleRadius: 240
    };

    let width = 0;
    let height = 0;
    let time = 0;
    const mouse = {
        x: 0,
        y: 0,
        tx: 0,
        ty: 0,
        vx: 0,
        vy: 0,
        active: false
    };

    const handleResize = () => {
        const dpr = Math.max(window.devicePixelRatio || 1, 1);
        const rect = header.getBoundingClientRect();
        width = Math.max(rect.width, 0);
        height = Math.max(rect.height, 0);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleColorSchemeChange = () => {
        config.lineColor = getWaveLineColor();
    };

    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (colorScheme?.addEventListener) {
        colorScheme.addEventListener('change', handleColorSchemeChange);
    } else if (colorScheme?.addListener) {
        colorScheme.addListener(handleColorSchemeChange);
    }

    window.addEventListener('resize', handleResize, { passive: true });
    if (window.ResizeObserver) {
        const observer = new ResizeObserver(handleResize);
        observer.observe(header);
    }
    handleResize();

    header.addEventListener('pointermove', (event) => {
        const rect = header.getBoundingClientRect();
        mouse.tx = event.clientX - rect.left;
        mouse.ty = event.clientY - rect.top;
        mouse.active = true;
    });

    header.addEventListener('pointerleave', () => {
        mouse.active = false;
    });

    const draw = () => {
        const prevX = mouse.x;
        const prevY = mouse.y;
        mouse.x += (mouse.tx - mouse.x) * 0.1;
        mouse.y += (mouse.ty - mouse.y) * 0.1;
        mouse.vx = mouse.x - prevX;
        mouse.vy = mouse.y - prevY;

        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 1;
        ctx.strokeStyle = config.lineColor;

        for (let y = -config.yGap; y <= height + config.yGap; y += config.yGap) {
            ctx.beginPath();
            for (let x = -config.xGap; x <= width + config.xGap; x += config.xGap) {
                const driftX = Math.sin(x * config.waveSpeedX + time * 0.9 + y * 0.02) * config.waveAmpX;
                const driftY = Math.cos(y * config.waveSpeedY - time * 0.6 + x * 0.004) * config.waveAmpY;
                const flow = Math.sin((x + y) * 0.006 + time * 0.8) * config.flowAmp;
                const fluid = (Math.sin(x * 0.008 + time * 0.7) + Math.cos(y * 0.01 - time * 0.55)) * config.fluidAmp;
                const chirp = 0.014 + 0.006 * Math.sin(time * 0.18);
                const sourceAX = width * 0.32;
                const sourceAY = height * 0.35;
                const sourceBX = width * 0.68;
                const sourceBY = height * 0.62;
                const distA = Math.hypot(x - sourceAX, y - sourceAY);
                const distB = Math.hypot(x - sourceBX, y - sourceBY);
                const strainA = Math.sin(distA * chirp - time * 2.6);
                const strainB = Math.sin(distB * (chirp * 1.1) - time * 2.3 + 1.2);
                const attenuation = 1 / (1 + 0.002 * distA + 0.002 * distB);
                const strain = (strainA + strainB) * config.strainAmp * attenuation;
                let yPos = y + driftX + driftY + flow + fluid + strain;

                if (mouse.active) {
                    const dx = x - mouse.x;
                    const dy = yPos - mouse.y;
                    const dist2 = dx * dx + dy * dy;
                    const radius2 = config.rippleRadius * config.rippleRadius;
                    if (dist2 < radius2) {
                        const falloff = 1 - dist2 / radius2;
                        const ripple = Math.sin(dist2 * 0.00085 - time * 3.1) * 14;
                        const swirl = (-dx * 0.08 + dy * 0.06) * config.swirlAmp * 0.015;
                        yPos += (mouse.vy * 22 + ripple + dy * 0.06 + swirl) * falloff;
                    }
                }
                if (x === -config.xGap) {
                    ctx.moveTo(x, yPos);
                } else {
                    ctx.lineTo(x, yPos);
                }
            }
            ctx.stroke();
        }

        time += 0.018;
        requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
}

function getWaveLineColor() {
    const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--wave-line-color')
        .trim();
    return value || 'rgba(139, 69, 19, 0.18)';
}

