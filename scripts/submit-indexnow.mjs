// scripts/submit-indexnow.mjs
// Submit all site URLs to Bing & IndexNow search engines
import https from "node:https";

const HOST = "thesofahub.co.uk";
const KEY = "b7f29e1a84c24385a8163f538e12d4a0";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Fetch sitemap.xml to get full URL list
async function getUrls() {
  try {
    const res = await fetch(`https://${HOST}/sitemap.xml`);
    if (!res.ok) {
      console.warn("Could not fetch remote sitemap, using core fallback URLs.");
      return [
        `https://${HOST}`,
        `https://${HOST}/shop/all`,
        `https://${HOST}/shop/corner-sofas`,
        `https://${HOST}/shop/3-2-sofa-sets`,
        `https://${HOST}/shop/chesterfield-sofas`,
        `https://${HOST}/products/atalian-sofa`,
        `https://${HOST}/products/verona-sofa`,
        `https://${HOST}/products/dino-sofa`,
        `https://${HOST}/products/lily-sofa`,
        `https://${HOST}/products/olympia-sofa`,
        `https://${HOST}/products/ashton-sofa`,
        `https://${HOST}/products/harrison-sofa`,
        `https://${HOST}/delivery`,
        `https://${HOST}/about`,
        `https://${HOST}/contact`,
      ];
    }
    const text = await res.text();
    const matches = [...text.matchAll(/<loc>(.*?)<\/loc>/g)];
    return matches.map((m) => m[1]);
  } catch (err) {
    console.warn("Fetch failed, using standard list:", err.message);
    return [`https://${HOST}`];
  }
}

async function submitIndexNow() {
  const urlList = await getUrls();
  console.log(`Submitting ${urlList.length} URLs to IndexNow (Bing)...`);

  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  });

  const options = {
    hostname: "api.indexnow.org",
    port: 443,
    path: "/IndexNow",
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": Buffer.byteLength(payload),
    },
  };

  const req = https.request(options, (res) => {
    console.log(`IndexNow Response Status: ${res.statusCode} ${res.statusMessage}`);
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log("✅ Successfully submitted URLs to IndexNow! Search engines are now indexing your pages.");
    } else {
      console.log("Response body:");
      res.pipe(process.stdout);
    }
  });

  req.on("error", (e) => {
    console.error("IndexNow submission error:", e);
  });

  req.write(payload);
  req.end();
}

submitIndexNow();
