import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { Button } from "./Button";

const spotifyApi = new SpotifyWebApi();
const clientID = "4e4c1cbe73394cf7a63cddf4738cec60"; 
const redirectUri = "http://localhost:3000/pronadji-prijatelja"; 
const scopes = ["user-read-playback-state", "user-modify-playback-state"];

function SpotifySong() {
  const [accessToken, setAccessToken] = useState(null);
  const [currentTrackUri, setCurrentTrackUri] = useState(null);

  useEffect(() => {
    
    const getAccessTokenFromUrl = () => {
      const hash = window.location.hash
        .substring(1)
        .split("&")
        .reduce(function (initial, item) {
          if (item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});
      window.location.hash = "";
      return hash.access_token;
    };

    
    const tokenFromUrl = getAccessTokenFromUrl();
    if (tokenFromUrl) {
      setAccessToken(tokenFromUrl);
    }
  }, []);

  useEffect(() => {
    
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      
      if (currentTrackUri) {
        spotifyApi.play({ uris: [currentTrackUri] })
          .then(() => console.log("Pesma je uspešno pokrenuta!"))
          .catch((error) => console.error("Greška pri puštanju pesme:", error));
      }
    }
  }, [accessToken, currentTrackUri]);

  const handlePlaySong = () => {
    
    if (!accessToken) {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join(
        "%20"
      )}&response_type=token&show_dialog=true`;
    } else {
      
      const trackUri = "spotify:track:0X1sqQ652p1sceKM2nJlIJ"; 
      setCurrentTrackUri(trackUri);
    }
  };

  return (
    <div>
      <h1>Vasa motivacija za trcanje</h1>
      {accessToken ? (
        <button onClick={handlePlaySong}>Pusti pesmu</button>
      ) : (
        <div>
          <p>Da biste pustili pesmu, kliknite na dugme ispod:</p>
          <Button onClick={handlePlaySong}>Autorizujte i pustite pesmu</Button>
        </div>
      )}
    </div>
  );
}

export default SpotifySong;

