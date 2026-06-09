console.debug('[FL Assorted Cats] Installing bridge listener.');

window.addEventListener('FL_AC_injected', (event) => {
    console.log('[FL Assorted Cats] Request for settings received!');

    chrome.storage.local.get(['settings'], (result) => {
        if (chrome.runtime.lastError) {
            console.error('[FL Assorted Cats] Could not load settings from DB, falling back to defaults.');
        } else {
            console.debug("[FL Assorted Cats] Sending back saved settings...");
            window.postMessage({
                action: 'FL_AC_settings',
                settings: result.settings
            }, "https://www.fallenlondon.com");
        }
    });
}, false);