import React from 'react';
import './app.css';
import ReactModal from 'react-modal';
import {setMode} from './Actions'
import { connect } from 'react-redux';
import LinkModel from './LinkModel';

const mapStateToProps = (state) => { return {mode: state.mode, bookmarks: state.bookmarks}};
const mapDispatchToProps = (dispatch) => {
 return { setMode: (mode) => { dispatch(setMode(mode)); },}}
 ReactModal.setAppElement('#root');
class UnconnectedMoreModal extends React.Component{

      render(){ return (<div>
        <ReactModal className="action-modal" isOpen={this.props.mode==='more'} >
          <h1 className='modal-text-size-2'>More</h1>
        <button href='' id='downloadButton' className='link-button action-button' onClick={()=>this.handleSaveClick()}>Download as Text File</button>
        <br></br>
        <button className='link-button action-button' onClick={()=>this.handleLoadMoreClick()}>
        <input id='loadMoreButton' type="file"/>Load More</button>
        <br></br>
        <button className='link-button action-button' onClick={()=>this.handleLoadAndReplaceClick()}>
        <input id='loadAndReplaceButton' type="file"/>Load and Replace</button>
        <br></br>
        <button className='link-button action-button' onClick={()=>this.props.setMode('none')}>Done</button>
        <a id='downloadLink' style={{display: 'none'}}></a>
        </ReactModal></div>
    );};

    handleSaveClick(){
      let downloadLink=document.getElementById('downloadLink')
      let file = new Blob([this.getTextToSave()], {type: 'text/plain'});
      downloadLink.download='bookmarks.txt';
      downloadLink.href=URL.createObjectURL(file);
      downloadLink.click();
    }

    getTextToSave(){
      var text='';
      for (let i=0; i<this.props.bookmarks.length; i++){
          text+=this.props.bookmarks[i].name+'        '+this.props.bookmarks[i].URL+'\n\n';
      }
      return text;
    }

    handleLoadMoreClick(){
      document.getElementById('loadMoreButton').click();
    }

    handleLoadAndReplaceClick(){
      document.getElementById('loadAndReplaceButton').click();
    }

}
const MoreModal = connect(mapStateToProps, mapDispatchToProps)(UnconnectedMoreModal)
export default MoreModal