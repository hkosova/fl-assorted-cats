console.debug('[FL Assorted Cats] Installing bridge listener.');

window.addEventListener('FL_AC_injected', (event) => {
    console.log('[FL Assorted Cats] Request for settings received!');

    chrome.storage.local.get(['settings'], (result) => {
        if (chrome.runtime.lastError) {
            console.error('[FL Assorted Cats] Could not load settings from DB, falling back to defaults.');
        } else {
            console.debug('[FL Assorted Cats] Sending back saved settings...');
            window.postMessage({
                action: 'FL_AC_settings',
                settings: result.settings,
            }, 'https://www.fallenlondon.com');
        }
    });
}, false);

window.addEventListener('FL_AC_loadAgents', (event) => {
    console.log('[FL Assorted Cats] Request for agents data received!');

    chrome.storage.local.get(['agents'], (result) => {
        if (chrome.runtime.lastError) {
            console.error('[FL Assorted Cats] Could not load saved agents list from DB. Doing nothing.');
        } else {
            console.debug('[FL Assorted Cats] Sending back saved list of agents...');
            window.postMessage({
                action: 'FL_AC_agents',
                agents: result.agents || [],
            }, 'https://www.fallenlondon.com');
        }
    });
}, false);

window.addEventListener('FL_AC_saveAgents', (event) => {
    console.debug('[FL Assorted Cats] Request to save agents data received!');
    console.debug('Request data: ', event);
    chrome.storage.local.set({
        agents: event.detail.agents,
    }, () => { console.debug('[FL Assorted Cats] Saved list of agents to DB.') });
}, false);
