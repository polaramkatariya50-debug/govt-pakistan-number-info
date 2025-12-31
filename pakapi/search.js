export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Only POST method allowed"
    });
  }

  let body = req.body;

  // Vercel edge case fix
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const query = body.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      error: "Query missing"
    });
  }

  if (!/^\d{10,13}$/.test(query)) {
    return res.status(400).json({
      success: false,
      error: "Invalid number or CNIC"
    });
  }

  // 🔒 SAFE DEMO DATA
  const results = [
    {
      n: query.length === 10 ? query : "03001234567",
      name: "Demo User",
      cnic: query.length === 13 ? query : "0000000000000",
      address: "Pakistan (Demo Data)"
    }
  ];

  return res.status(200).json({
    success: true,
    count: results.length,
    results
  });
}
