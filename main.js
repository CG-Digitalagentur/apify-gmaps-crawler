const { Actor } = require('apify');
const { GoogleMapsScraper } = require('google-maps-scraper');

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

    const scraper = new GoogleMapsScraper();
    await scraper.initialize();

    const scrapeParams = {
        searchStringsArray,
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
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

    const results = await scraper.run(scrapeParams);

    for (const result of results) {
        await Actor.pushData(result);
    }

    console.log('✅ Scraping abgeschlossen!');
});
