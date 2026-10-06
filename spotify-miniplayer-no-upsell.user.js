// ==UserScript==
// @name         Spotify Miniplayer - hide Premium upsell
// @namespace    MosheWelcher
// @author       MosheWelcher
// @version      1.1
// @description  Hides the "You discovered a Premium feature" popup when the Spotify web miniplayer (Document PiP) is made small.
// @match        https://open.spotify.com/*
// @run-at       document-start
// @grant        none
// @license      GPL-3.0-or-later
// @homepageURL  https://github.com/MosheWelcher/spotify-miniplayer-no-upsell
// @supportURL   https://github.com/MosheWelcher/spotify-miniplayer-no-upsell/issues
// @updateURL    https://raw.githubusercontent.com/MosheWelcher/spotify-miniplayer-no-upsell/main/spotify-miniplayer-no-upsell.user.js
// @downloadURL  https://raw.githubusercontent.com/MosheWelcher/spotify-miniplayer-no-upsell/main/spotify-miniplayer-no-upsell.user.js
// ==/UserScript==

(() => {
  // Upsell text; Spotify gives the popup no stable class or test id, so match on text.
  const MARKERS = ['You discovered a Premium feature', 'make the Miniplayer even smaller'];

  function hideUpsell(doc) {
    const win = doc.defaultView;
    for (const span of doc.querySelectorAll('span')) {
      if (!MARKERS.some(m => span.textContent.includes(m))) continue;
      // The popup is the nearest absolutely positioned ancestor.
      let el = span;
      while (el && el !== doc.body && win.getComputedStyle(el).position !== 'absolute') el = el.parentElement;
      if (el && el !== doc.body) el.style.setProperty('display', 'none', 'important');
    }
  }

  function patch(pipWin) {
    const doc = pipWin.document;
    hideUpsell(doc);
    new pipWin.MutationObserver(() => hideUpsell(doc))
      .observe(doc.body, { childList: true, subtree: true, characterData: true });
  }

  function init() {
    const dpip = window.documentPictureInPicture;
    if (!dpip) return;
    dpip.addEventListener('enter', e => patch(e.window));
    if (dpip.window) patch(dpip.window);
  }

  init();
})();
