const clientID = '5798d62e06134ef09bccada28de9faae'

const URI = 'http://localhost:3000/'

let userToken;

const Spotify = {
    getAccessToken() {
        if (userToken){
            return userToken;
        }

        let accessToken = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessToken && expiresInMatch){
            userToken = accessToken[1];
            const expiresIn = Number(expiresInMatch[1]);

            //clears the parameters allowing the method to grab a new access token when the other token expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${URI}`
        
            window.location = accessUrl;
        }
    },

    search(searchTerm){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${accessToken}`, 
        {headers: 
            {Authorization: `Bearer ${accessToken}`}
        })
        .then(response => {return response.json()})
        .then(jsonResponse => {
            if (!jsonResponse.tracks){
                return []
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri

            }));
        });
    },

    savePlaylist(playlistName, trackUris){
        if (!playlistName || !trackUris){
            return; 
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => response.json())
        .then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: playlistName})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,{
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                });
            })
        })
    }

};

export default Spotify;