const puppeteer = require('puppeteer');

const urls = [
  'https://b2bgrowthexpo-webscraper.streamlit.app',
  'https://b2bgrowthexpo-websitechecker-uk.streamlit.app',
];

(async () => {
  try {
    console.log(`🕒 Script started at: ${new Date().toLocaleString()}`);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });

    const page = await browser.newPage();

    for (const url of urls) {
      console.log(`🌐 Visiting ${url}`);
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });

      console.log(`✅ Done scrolling ${url}`);
    }

    await browser.close();

    console.log(`🏁 Script finished at: ${new Date().toLocaleString()}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
})();
