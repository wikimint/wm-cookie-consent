export function wm_loadAllowedScripts() {

    const consent = document.cookie.includes("cookie_consent=accepted");
  
    if (!consent) return;
  
    document
      .querySelectorAll('script[type="text/plain"][data-src]')
      .forEach(el => {
  
        const s = document.createElement("script");
  
        s.src = el.dataset.src;
  
        if (el.dataset.async) s.async = true;
  
        document.head.appendChild(s);
  
      });
  
  }