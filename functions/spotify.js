import fetch from 'node-fetch';

exports.handler = async (event, context) => {
  const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
  const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
  const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

  const auth = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");

  const tokenEndpoint = `https://accounts.spotify.com/api/token`;
  const URL = process.env.SITE_URL;

  const options = {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=refresh_token&refresh_token=${SPOTIFY_REFRESH_TOKEN}&redirect_uri=${encodeURI(
      URL,
      +"/.netlify/functions/callback"
    )}`,
  };

  const accessToken = await fetch(tokenEndpoint, options)
  .then((res) => res.json())
  .then((json) => {
    return json.access_token;
  })
  .catch((err) => {
    console.err(err);
  });

  const kamratpoddenShowId = '6WNxFIg7SPVFYcf3sZJt9K'
  const playerEndpoint = `https://api.spotify.com/v1/shows/${kamratpoddenShowId}/episodes`;

  return fetch(`${playerEndpoint}?limit=3`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then(json => {
      return {
        statusCode: 200,
        body: JSON.stringify(json.items),
      };
    });
}