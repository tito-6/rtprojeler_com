// src/api/blogs/[slug].js
export default function handler(req, res) {
  const { slug } = req.query; // Extract slug from query parameters

  if (!slug) {
    return res.status(400).json({ message: "Slug is required" });
  }

  // Simulated blog data
  const blogPosts = {
    "future-of-ai": {
      title: "The Future of AI in Technology",
      body: "<p>This blog post explores the advancements and implications of AI...</p>",
    },
    "digital-marketing-2024": {
      title: "Digital Marketing in 2024",
      body: "<p>Emerging trends and strategies in digital marketing...</p>",
    },
    "5g-networks-impact": {
      title: "5G Networks and Their Impact",
      body: "<p>What the global rollout of 5G means for consumers...</p>",
    },
    "cybersecurity-trends-2024": {
      title: "Cybersecurity Trends for 2024",
      body: "<p>An overview of the latest cybersecurity threats and defense strategies...</p>",
    },
    "web-development-best-practices": {
      title: "Web Development Best Practices",
      body: "<p>Best practices to follow when developing modern websites...</p>",
    },
  };

  const blogContent = blogPosts[slug];

  if (blogContent) {
    res.status(200).json(blogContent);
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
}
