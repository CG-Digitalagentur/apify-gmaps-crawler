const Apify = require('apify');

Apify.main(async () => {
    const input = await Apify.getInput();

    const {
        searchStringsArray,
        latitude,
        longitude,
        radiusKm,
        maxCrawledPlaces,
        language,
        searchMatching,
        website,
        skipClosedPlaces,
        scrapePlaceDetailPage,
        scrapeContacts,
        reviewsSort,
        scrapeReviewsPersonalData
    } = input;

    console.log('Scraping gestartet mit folgenden Parametern:');
    console.log({ searchStringsArray, latitude, longitude, radiusKm, maxCrawledPlaces });

    // Hier kannst du z. B. deinen Scraper mit diesen Parametern aufrufen
    // Beispiel nur als Platzhalter:
    for (const query of searchStringsArray) {
        console.log(`→ Suche nach: "${query}" bei ${latitude}, ${longitude}`);
        // Hier folgt später echte Scraping-Logik (z. B. Puppeteer, API etc.)
    }

    // Beispiel-Ausgabe
    await Apify.setValue('OUTPUT', {
        message: 'Scraping erfolgreich ausgeführt.',
        totalQueries: searchStringsArray.length,
        exampleQuery: searchStringsArray[0],
        maxCrawledPlaces
    });
});
