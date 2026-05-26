'use client';

import { Suspense, lazy, useEffect, useRef } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

export function InteractiveRobotSpline({ scene, className }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const hideWatermark = () => {
      // 1. Target standard anchors inside our container
      if (containerRef.current) {
        const anchors = containerRef.current.getElementsByTagName('a');
        for (const a of anchors) {
          a.style.setProperty('display', 'none', 'important');
          a.style.setProperty('opacity', '0', 'important');
          a.style.setProperty('visibility', 'hidden', 'important');
          a.style.setProperty('pointer-events', 'none', 'important');
        }

        const logoDivs = containerRef.current.querySelectorAll('#logo, [class*="logo"], [class*="watermark"]');
        logoDivs.forEach(div => {
          div.style.setProperty('display', 'none', 'important');
          div.style.setProperty('opacity', '0', 'important');
          div.style.setProperty('visibility', 'hidden', 'important');
          div.style.setProperty('pointer-events', 'none', 'important');
        });
      }

      // 2. Search document-wide for any spline references
      const allAnchors = document.querySelectorAll('a');
      allAnchors.forEach(a => {
        if (a.href && (a.href.includes('spline') || a.href.includes('spline.design') || a.id === 'logo')) {
          a.style.setProperty('display', 'none', 'important');
          a.style.setProperty('opacity', '0', 'important');
          a.style.setProperty('visibility', 'hidden', 'important');
          a.style.setProperty('pointer-events', 'none', 'important');
          
          // Hide parent wrapper element if it is a small watermark card/pill
          const parent = a.parentElement;
          if (parent && parent !== document.body && parent !== containerRef.current) {
            parent.style.setProperty('display', 'none', 'important');
            parent.style.setProperty('opacity', '0', 'important');
            parent.style.setProperty('visibility', 'hidden', 'important');
            parent.style.setProperty('pointer-events', 'none', 'important');
          }
        }
      });

      // 3. Target inside Shadow DOMs of all elements (like spline-viewer)
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        if (el.shadowRoot) {
          const shadowLogo = el.shadowRoot.querySelector('#logo') || 
                             el.shadowRoot.querySelector('a') || 
                             el.shadowRoot.querySelector('[class*="logo"]') ||
                             el.shadowRoot.querySelector('[class*="watermark"]');
          if (shadowLogo) {
            shadowLogo.style.setProperty('display', 'none', 'important');
            shadowLogo.style.setProperty('opacity', '0', 'important');
            shadowLogo.style.setProperty('visibility', 'hidden', 'important');
            shadowLogo.style.setProperty('pointer-events', 'none', 'important');
            
            // Also hide parent if it's the logo container inside shadow DOM
            const shadowParent = shadowLogo.parentElement;
            if (shadowParent) {
              shadowParent.style.setProperty('display', 'none', 'important');
              shadowParent.style.setProperty('opacity', '0', 'important');
              shadowParent.style.setProperty('visibility', 'hidden', 'important');
              shadowParent.style.setProperty('pointer-events', 'none', 'important');
            }
          }
        }
      });
    };

    // Poll periodically to catch the elements once Spline fully initializes
    hideWatermark();
    const interval = setInterval(hideWatermark, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Suspense
        fallback={
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg className="animate-spin" style={{ width: 20, height: 20, color: 'white' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
            </svg>
          </div>
        }
      >
        <Spline
          scene={scene}
          className={className}
          style={{ width: '100%', height: '100%' }}
        />
      </Suspense>
    </div>
  );
}
