const { Actor } = require("apify");
const { GoogleMapsScraper } = require("google-maps-scraper");

Actor.main(async () => {
    const input = await Actor.getInput();

    const {
        searchStringsArray,
        locationQuery,
        latitude,
        longitude,
        radius,
        maxCrawledPlaces,
        language = "en",
        searchMatching = "all",
        website = "allPlaces",
        skipClosedPlaces = true,
        scrapePlaceDetailPage = true,
        scrapeContacts = true,
        reviewsSort = "newest",
        scrapeReviewsPersonalData = true
    } = input;

    const scraper = new GoogleMapsScraper();

    await scraper.initialize();

    const results = await scraper.run({
        searchStringsArray,
        locationQuery: locationQuery || null,
        lat: latitude || null,
        lng: longitude || null,
        radiusKm: radius,
        maxCrawledPlaces,
        language,
        searchMatching,
        website,
        skipClosedPlaces,
        scrapePlaceDetailPage,
        scrapeContacts,
        reviewsSort,
        scrapeReviewsPersonalData
    });

    for (const result of results) {
        await Actor.pushData(result);
    }

    console.log("✅ Scraping complete!");
});
