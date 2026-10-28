// Kept free of React imports so the server layout can inline it (see lib/perf.ts).

export const LITE_KEY = "mbb-lite";

/** Inline <head> script: decides lite mode before the page paints. */
export const LITE_SCRIPT = `(function(){try{var d=document.documentElement,n=navigator,c=n.hardwareConcurrency||8,m=n.deviceMemory||8,s=n.connection&&n.connection.saveData;if(localStorage.getItem("${LITE_KEY}")==="1"||c<=4||m<=4||s||matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("lite")}catch(e){}})()`;
