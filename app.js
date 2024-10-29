const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/video', async (req, res) => {
  const videoUrl = req.query.link;
  if (!videoUrl) {
    return res.status(400).send('Please provide a video URL.');
  }

  try {
    // Call the RapidAPI YouTube MP3 Downloader API
    const response = await axios.get(
      `https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/long_video.php`,
      {
        params: { url: videoUrl },
        headers: {
          'x-rapidapi-host': 'youtube-mp3-downloader2.p.rapidapi.com',
          'x-rapidapi-key': process.env.RAPIDAPI_KEY, // Use environment variable for the API key
        },
      }
    );

    // Send only the download link from the response
    res.send(response.data.dlink);
  } catch (error) {
    console.error('Error fetching video:', error.message);
    res.status(500).send('Failed to download video.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
