import './App.css';
import React from 'react';

import { SearchResults } from '../SearchResults/SearchResults';
import { SearchBar } from '../SearchBar/SearchBar'
import { Playlist } from '../Playlist/Playlist'

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      searchResults: [{name: 'track1', artist: 'artist1', album: 'album1', id: '1'}]
    }
  }
  render(){
   return( <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
        <SearchBar />
    <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults}/>
        <Playlist />
    </div>
  </div>
</div>
   )
  }
}

export default App;
