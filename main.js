const { Actor } = require('apify');
const { GoogleMapsScraper } = require('google-maps-scraper');

Actor.main(async () => {
    const input = await Actor.getInput();

    const {
        searchStringsArray,
        locationQuery,
        latitude,
        longitude,
        radius,
        maxCrawledPlaces,
    } = input;

    // Validierung
    if (!locationQuery && (!latitude || !longitude)) {
        throw new Error('Entweder locationQuery ODER latitude UND longitude müssen gesetzt sein.');
    }

    const scraper = new GoogleMapsScraper();

    await scraper.initialize();

    const scrapeParams = {
        searchStringsArray,
        radiusKm: radius,
        maxCrawledPlaces,
        language: 'en',
        searchMatching: 'all',
        website: 'allPlaces',
        skipClosedPlaces: true,
        scrapePlaceDetailPage: true,
        scrapeContacts: true,
        reviewsSort: 'newest',
        scrapeReviewsPersonalData: true,
    };

    // Standort setzen
    if (locationQuery) {
        scrapeParams.locationQuery = locationQuery;
    } else {
        scrapeParams.lat = parseFloat(latitude);
        scrapeParams.lng = parseFloat(longitude);
    }

    const results = await scraper.run(scrapeParams);

    for (const result of results) {
        await Actor.pushData(result);
    }

    console.log('✅ Scraping abgeschlossen!');
});
