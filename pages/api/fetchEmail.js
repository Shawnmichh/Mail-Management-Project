import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://stash.anupamkris.me/static/uploads/99c5890c-56bf-4560-841a-03422a0b1ad5.json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      validateStatus: (status) => status === 200,
    });

    if (!Array.isArray(response.data)) {
      console.error('Invalid data format:', response.data);
      return res.status(500).json({ error: "Invalid data format from external API" });
    }


    res.status(200).json(response.data);

  } catch (error) {
    console.error("Error fetching emails:", error.message);
    res.status(500).json({ 
      error: "Failed to fetch emails from external API",
      message: error.message
    });
  }
}