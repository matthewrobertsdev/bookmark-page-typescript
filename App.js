import React from 'react';
import './app.css';
import BookmarkGrid from './BookmarkGrid';
import ToolBar from './ToolBar';
import EntryModal from './EntryModal';
import MoreModal from './MoreModal';
import { connect } from 'react-redux';
 
const mapStateToProps = (state) => { return {bookmarks: state.bookmarks} };
class UnconnectedApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchText: '', searchEngine: this.getInitialSearchEngine()}
    this.handleSearchEngineChange = this.handleSearchEngineChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleKeyDown=this.handleKeyDown.bind(this)
  }
  
  handleSearchChange(event) {
    this.setState({searchText: event.target.value});
  }

  handleSearchEngineChange(event) {
    this.setState({searchEngine: event.target.value});
    localStorage.setItem("searchEngine", event.target.value)
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleSearch(event)
    }
  }

  handleSearch(event) {
    switch (this.state.searchEngine) {
      case 'google':
        window.open('https://www.google.com/search?q='+this.state.searchText, "_self");
        break;
      case 'duckduckgo':
        window.open('https://www.duckduckgo.com/?q='+this.state.searchText+'&t=h_&ia=web', "_self");
        break;
      case 'bing':
        window.open('https://www.bing.com/search?q='+this.state.searchText, "_self");
        break;
      default:
        console.log("Invalid Search Engine")
    }
    event.preventDefault();
  }
 
  render(){ return (<div><ToolBar/><EntryModal/><MoreModal/>
      <br></br><br></br><br></br><br></br><br></br>
      <div className='center'>
        <select name="searchEngine" id="searchEngine" 
        className='search-select' value={this.state.searchEngine} 
        onChange={this.handleSearchEngineChange}>
          <option value="google">Google</option>
          <option value="duckduckgo">Duck Duck Go</option>
          <option value="bing">Bing</option>
        </select >
        <span className='spacer'></span>
        <input class='search-input' tabIndex="1" value={this.state.searchText} 
        onChange={this.handleSearchChange} onKeyDown={this.handleKeyDown}></input>
        <span className='spacer'></span>
        <button tabIndex='2' onClick={this.handleSearch} className='search-button'>Search</button></div>
      <h1 className='text-on-background'>Bookmarks</h1>
      <br></br>{this.getBookmarkContent()}<br></br><br></br><br></br></div>
  );};

  getBookmarkContent(){
    if (this.props.bookmarks!=null&&this.props.bookmarks.length>0){
      return <BookmarkGrid/>
    } else {
      return <h1 className='text-on-background'>Tap or click the "Add" button to add a bookmark</h1>
    }
  }

  getInitialSearchEngine(){
    const searchEngine=localStorage.getItem("searchEngine")
    if (searchEngine==="google" || searchEngine==="duckduckgo" || searchEngine==="bing"){
      return searchEngine
    } else {
      return "google"
    }
  }

  
}
const App = connect(mapStateToProps, null)(UnconnectedApp)

export default App;