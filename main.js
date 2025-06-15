const { Actor } = require('apify');

Actor.main(async () => {
    const input = await Actor.getInput();
    const {
        searchStringsArray,
        latitude,
        longitude,
        radius,
        maxCrawledPlaces,
    } = input;

    if (!searchStringsArray || searchStringsArray.length === 0) {
        throw new Error('Suchbegriff(e) fehlen.');
    }

    for (const query of searchStringsArray) {
        console.log(`▶️ Suche: "${query}" im Umkreis von ${radius} km um ${latitude}, ${longitude}`);
        
        // Hier kommt später echtes Scraping rein – aktuell nur Dummy-Daten
        await Actor.pushData({
            query,
            latitude,
            longitude,
            radius,
            maxCrawledPlaces,
            dummy: true,
        });
    }

    console.log('✅ Dummy-Scraping abgeschlossen');
});
