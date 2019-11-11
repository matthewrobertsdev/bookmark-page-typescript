import React from 'react';
import './app.css';
import ReactModal from 'react-modal';
import {setMode, appendBookmarks, setBookmarks} from './Actions'
import { connect } from 'react-redux';
import LinkModel from './LinkModel';

const mapStateToProps = (state) => { return {mode: state.mode, bookmarks: state.bookmarks}};
const mapDispatchToProps = (dispatch) => {
 return { setMode: (mode) => { dispatch(setMode(mode)); },
 appendBookmarks: (bookmarks) => { dispatch(appendBookmarks(bookmarks)); },
 setBookmarks: (bookmarks) => { dispatch(setBookmarks(bookmarks)); }}}
 ReactModal.setAppElement('#root');
class UnconnectedMoreModal extends React.Component{

      constructor(props){
        super(props)
        this.getBookmarks=this.getBookmarks.bind(this);
      }

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

    handleFileChosen(append, props){
      let reader = new FileReader();
      let file=null;
      if(append){
        file = document.getElementById('loadMoreButton').files[0];
      } else {
        file = document.getElementById('loadAndReplaceButton').files[0];
      }
      reader.addEventListener("loadend", function() {
        let bookmarks=JSON.parse(reader.result);
        console.log(bookmarks)
        if(append){
          props.appendBookmarks(bookmarks);
        } else {
          props.setBookmarks(bookmarks);
        }
        /*let stringArray=reader.result.split(',')
        if ((stringArray.length-1)%2!==0){
          throw Error("Odd number of boomark components");
        }
        
        let links=[]
        let link=new LinkModel('','');
        for(let i=0; i<stringArray.length; i++){
          if(i%2===0){
            link.URL=stringArray[i];
            links.push(link)
          } else {
            link=new LinkModel('','');
            link.name=stringArray[i];
          }
        }
        */
      });
      reader.readAsText(file);
    }

    handleSaveClick(){
      let downloadLink=document.getElementById('downloadLink')
      let file = new Blob([this.getTextToSave()], {type: 'text/plain'});
      downloadLink.download='bookmarks.txt';
      downloadLink.href=URL.createObjectURL(file);
      downloadLink.click();
    }

    getTextToSave(){
      return JSON.stringify(this.props.bookmarks);
      /*
      var text='';
      for (let i=0; i<this.props.bookmarks.length; i++){
          text+=this.props.bookmarks[i].name+','+this.props.bookmarks[i].URL+',';
      }
      return text;
      */
    }

    getBookmarks(text){
        let stringArray=text.split('\s+')
        for(let i=0; i<stringArray.length; i++){
          console.log(stringArray[i])
        }
    }

    handleLoadMoreClick(){
      document.getElementById('loadMoreButton').addEventListener('change', ()=>this.handleFileChosen(true, this.props));
      document.getElementById('loadMoreButton').click();
    }

    handleLoadAndReplaceClick(){
      document.getElementById('loadAndReplaceButton').addEventListener('change', ()=>this.handleFileChosen(false, this.props));
      document.getElementById('loadAndReplaceButton').click();
    }

}
const MoreModal = connect(mapStateToProps, mapDispatchToProps)(UnconnectedMoreModal)
export default MoreModal