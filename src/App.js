import React, { Component } from 'react';
import './App.css';

/*https://erhajet-better-playlists.herokuapp.com/*/

let defaultStyle = {
  color: '#f2f2f2'
}

let dummyData = {
  user: {
    name: 'Rhesa',
    playlists: [
      {
        name: 'Found Some Stuff',
        songs: [{name: 'Hello', duration: 2048},
                {name: 'Crushcrushcrush', duration: 3000},
                {name: 'Yellow', duration: 3219},
                {name: 'Stand Up', duration: 1234}]
      },
      {
        name: 'Discover Weekly',
        songs: [{name: 'Aha!', duration: 2222},
                {name: 'Live for It', duration: 1456},
                {name: 'California', duration: 860}]
      },
      {
        name: 'Jazz It Up',
        songs: [{name: 'Favorite Things', duration: 1235},
                {name: 'Love Burn', duration: 2690},
                {name: 'Shofukan', duration: 3980}]
      },
      {
        name: 'Not Mine',
        songs: [{name: '24K Magic', duration: 2987},
                {name: 'Perfect', duration: 3001},
                {name: 'Sugar', duration: 2450}]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{this.props.playlists && this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class MinuteCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{Math.floor(totalDuration/60)} minutes</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img/>
        <input type="text" onKeyUp={event =>
          this.props.onTextChange(event.target.value)}/>
        Filter
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
      <div style={{...defaultStyle, width: "25%", display: 'inline-block'}}>
        <img/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  // Setting initial state. Using constructor()
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }

  componentDidMount() {
    {/*NOTE: Research more about arrow functions, and React Rendering*/}
    setTimeout(() => {
      this.setState({serverData: dummyData});
    }, 1000);
  }

  render() {
    let playlistToRender = this.state.serverData.user ?
      this.state.serverData.user.playlists
      .filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase())
    ) : []
    
    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>
            {/*It has to do with the rendering
              Renders if there's a user for the 1st render
              Checks for the name in the 2nd render

              Because the serverData state is empty for the 1st time,
              it needed to render the dummyData 1st into the state (?) */}

            {/*this.state.serverData.user &&*/}
            {this.state.serverData.user.name}'s Playlists
          </h1>

          <PlaylistCounter playlists=
            {playlistToRender}/>

          <MinuteCounter playlists=
            {playlistToRender}/>

          <Filter onTextChange=
            {text => this.setState({filterString: text})}/>

          {/*Dynamic filters and Generate playlist component*/}
          {playlistToRender.map(playlist =>
            <Playlist playlist={playlist} />
          )}

          {/*
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          */}
        </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
