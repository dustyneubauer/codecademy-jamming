import './App.css';
import React from 'react';

import { SearchResults } from '../SearchResults/SearchResults';
import { SearchBar } from '../SearchBar/SearchBar'
import { Playlist } from '../Playlist/Playlist'

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      searchResults: [{name: 'track1', artist: 'artist1', album: 'album1', id: '1'}],
      playlistName: 'playlist1',
      playlistTracks: [{name: 'track2', artist: 'artist2', album: 'album2', id: '2'}, {name: 'track3', artist: 'artist3', album: 'album3', id: '3'}]
    };
    this.addTrack= this.addTrack.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.state.playlistTracks.push(track);
    this.setState({playlistTracks: this.state.playlistTracks});
  }

  render(){
   return( <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
        <SearchBar />
    <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} 
                       onAdd={this.addTrack}/>
        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
    </div>
  </div>
</div>
   )
  }
}

export default App;
