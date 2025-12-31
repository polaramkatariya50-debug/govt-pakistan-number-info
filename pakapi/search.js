export default function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Only GET method allowed"
    });
  }

  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      error: "Query parameter missing"
    });
  }

  if (!/^\d{10,13}$/.test(query)) {
    return res.status(400).json({
      success: false,
      error: "Invalid number or CNIC"
    });
  }

  // 🔒 DEMO DATA (Safe)
  const results = [
    {
      n: query.length === 10 ? query : "03001234567",
      name: "@VNI0X",
      cnic: query.length === 13 ? query : "0000000000000",
      address: "MADE BY @VNI0X)"
    }
  ];

  return res.status(200).json({
    success: true,
    count: results.length,
    results
  });
}
