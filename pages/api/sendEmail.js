export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { subject, to, body } = req.body;

    if (!subject || !to || !body) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("Simulated email:", { subject, to, body });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
}
