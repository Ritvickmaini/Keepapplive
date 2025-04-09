const puppeteer = require("puppeteer");

const urls = [
  "https://b2bgrowthexpo-webscraper.streamlit.app",
  "https://b2bgrowthexpo-websitechecker-uk.streamlit.app/"
];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  for (const url of urls) {
    try {
      console.log(`🌐 Visiting ${url}...`);
      await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

      await autoScroll(page);
      console.log(`✅ Done scrolling ${url}`);
    } catch (err) {
      console.error(`❌ Error visiting ${url}:`, err.message);
    }
  }

  await browser.close();
})();

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}
