import axios from "axios";
import xml2js from "xml2js";

export default async function handler(req, res) {
  const { locale = "tr" } = req.query;
  const apiUrl = `https://news.google.com/rss/search?q=real+estate+turkey+istanbul+bahcesehir&hl+sylvana=${locale}&gl=TR&ceid=TR:${locale.toUpperCase()}`;

  try {
    const response = await axios.get(apiUrl, { responseType: "text" });
    console.log("Raw RSS feed data:", response.data);

    // Parse the XML response
    xml2js.parseString(response.data, { trim: true }, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        return res.status(500).json({ error: "Error parsing news feed" });
      }

      const items = result?.rss?.channel?.[0]?.item;
      if (!items || !Array.isArray(items)) {
        console.warn("No news items found in the RSS feed");
        return res.status(200).json([]); // Return an empty array if no news items are found
      }

      const newsItems = items.slice(0, 10).map((item) => ({
        title: item.title[0],
        link: item.link[0],
        description: item.description ? item.description[0] : "",
        image: item["media:content"] ? item["media:content"][0].$.url : "",
      }));

      res.status(200).json(newsItems);
    });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: "Error fetching news from the source" });
  }
}
