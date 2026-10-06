# Spotify Miniplayer – hide Premium upsell

A userscript for the Spotify web player (open.spotify.com) in Chrome. It hides the
**"You discovered a Premium feature – make the Miniplayer even smaller"** popup that
appears when you shrink the miniplayer (Document Picture-in-Picture window) below ~300px.

Spotify doesn't enforce a minimum size; the popup is the only thing in the way.

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) in Chrome.
   On recent Chrome versions, also open `chrome://extensions` → Tampermonkey → **Details** and enable **Allow User Scripts**.
2. Open the raw script and Tampermonkey will offer to install it:
   https://raw.githubusercontent.com/MosheWelcher/spotify-miniplayer-no-upsell/main/spotify-miniplayer-no-upsell.user.js
3. Reload open.spotify.com, open the miniplayer, and resize it as small as you like.

## How it works

When the miniplayer opens (`documentPictureInPicture` `enter` event), the script watches the
PiP document and hides the popup's container. Spotify gives the popup no stable class or
test id, so it is matched by its English text. If Spotify changes the wording or you use
another language, edit `MARKERS` at the top of the script.
