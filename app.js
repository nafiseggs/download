const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000; // Or any port you prefer

// Endpoint to download YouTube video as MP3
app.get('/video', async (req, res) => {
  const videoId = req.query.id;
  if (!videoId) {
    return res.status(400).send('Please provide a video ID.');
  }

  try {
    // Call the updated RapidAPI YouTube MP3 Downloader API
    const response = await axios.get(
      `https://youtube-mp36.p.rapidapi.com/dl`,
      {
        params: { id: videoId },
        headers: {
          'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com',
          'x-rapidapi-key': 'df5adca759msh361dac7924c6d3ep1a755cjsnb41f753bb38d', // Replace with your key
        },
      }
    );

    // Extract the download link
    const downloadLink = response.data.link;

    // Redirect to the download link
    res.redirect(downloadLink);
  } catch (error) {
    console.error('Error fetching video:', error.message);
    res.status(500).send('Failed to download video.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
