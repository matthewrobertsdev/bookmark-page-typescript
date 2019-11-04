import React from 'react';
import './app.css';
import BookmarkGrid from './BookmarkGrid';
import ToolBar from './ToolBar';
import ReactModal from 'react-modal';
import {setAddModalPresent} from './Actions'
import { connect } from 'react-redux';
 
const mapStateToProps = (state) => { return {addModalPresent: state.addModalPresent} };
const mapDispatchToProps = (dispatch) => {
 return { setAddModalPresent: (present) => { dispatch(setAddModalPresent(present)); }} };
 ReactModal.setAppElement('#root');
class UnconnectedApp extends React.Component {
 
  render(){ return (<div><ToolBar/>
      <ReactModal className="action-modal" isOpen={this.props.addModalPresent} ><h1 className='modal-text-size'>Add Bookmark:</h1>
      <label className='modal-text-size'>Name:</label><br></br><input className='modal-small-input'/><br></br>
      <label className='modal-text-size'>URL:</label><br></br><input className='modal-input' type='url'/><br></br>
      <button className="link-button action-button" onClick={()=>this.props.setAddModalPresent(false)}>Add</button>
      <button className="link-button action-button" onClick={()=>this.props.setAddModalPresent(false)}>Cancel</button>
      </ReactModal><br></br><br></br><br></br><br></br>
      <h1 className='text-on-background'>Bookmarks</h1>
      <br></br><BookmarkGrid/><br></br><br></br><br></br></div>
  );};
}
const App = connect(mapStateToProps, mapDispatchToProps)(UnconnectedApp)
export default App;
