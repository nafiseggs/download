const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000; // Or any port you prefer

// Endpoint to download YouTube video as MP3
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
          'x-rapidapi-key': 'f15a34ae8emsh6cc35cda357f7d7p195362jsn8e196b76a1a7', // Replace with your key
        },
      }
    );

    // Extract the download link
    const downloadLink = response.data.dlink;

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
