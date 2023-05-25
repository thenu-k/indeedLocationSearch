// create the listing
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // remove existing listings
    browser.contextMenus.removeAll();
    // refresh the menu
    browser.contextMenus.refresh();
    if (request.createContextMenu) {
        // replace white space with a dash
        const companyLocation = request.companyLocation.replace(/\s/g, '-');
        const companyAll = request.companyName.replace(/\s/g, '-') + '-' + companyLocation ;
        browser.contextMenus.create({
            id: `location-${companyLocation}`,
            title: "Search Location",
            contexts: ["all"],
        });
        browser.contextMenus.create({
            id: `all-${companyAll}`,
            title: 'Search Company and Location',
            contexts: ["all"]
        });
        // refresh the menu
        browser.contextMenus.refresh();
    }
});

// adding the event listener. this has to be outside the on message listener or its going to get called every time the message is sent
browser.contextMenus.onClicked.addListener(function add(info, tab) {
    const id = info.menuItemId;
    if (id.includes('location-')) {
        const location = id.split('location-')[1];
        const locationNoDashes = location.replace(/-/g, '+');
        // open new tab with the search
        browser.tabs.create({
            url: `https://www.google.com/maps/search/?api=1&query=${locationNoDashes}`
        });
    } else if (id.includes('all-')) {
        const all = id.split('all-')[1];
        const allNoDashes = all.replace(/-/g, '+');
        browser.tabs.create({
            url: `https://www.google.com/maps/search/?api=1&query=${allNoDashes}`
        });
    }
    // remove existing listings
    browser.contextMenus.removeAll();
    // refresh the menu
    browser.contextMenus.refresh();
});


// delete the listing
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.deleteContextMenu) {
        browser.contextMenus.removeAll();
        // refresh the menu
        browser.contextMenus.refresh();
    }
});