import React from 'react';
import './app.css';
import ReactModal from 'react-modal';
import {setAddMode, addBookmark} from './Actions'
import { connect } from 'react-redux';
import LinkModel from './LinkModel';
const mapStateToProps = (state) => { return {addMode: state.addMode} };
const mapDispatchToProps = (dispatch) => {
 return { setAddMode: (present) => { dispatch(setAddMode(present)); },
  addBookmark: (bookmark) => { dispatch(addBookmark(bookmark)); }}};
 ReactModal.setAppElement('#root');
class UnconnectedAddModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {name: '', URL: ''};
    
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleNameChange(event) {
        this.setState({name: event.target.value});
      }
    
      handleURLChange(event) {
        this.setState({URL: event.target.value});
      }
    
      handleSubmit() {
        if (this.state.name!==''&&this.state.URL!==''){
            this.props.setAddMode(false);
            this.props.addBookmark(new LinkModel(this.state.name, this.state.URL));
        } else {
        }
      }

      render(){ return (<div>
        {this.clearStateIfHidden()}
        <ReactModal className="action-modal" isOpen={this.props.addMode} ><h1 className='modal-text-size'>Add Bookmark:</h1>
        <label className='modal-text-size'>Name:</label>
        <br></br><input className='modal-small-input' value={this.state.name} onChange={this.handleNameChange}/><br></br>
        <label className='modal-text-size'>URL:</label>
        <br></br><input className='modal-input' type='url' value={this.state.URL} onChange={this.handleURLChange}/><br></br>
        <button className="link-button action-button" onClick={()=>this.handleSubmit()}>Add</button>
        <button className="link-button action-button" onClick={()=>this.props.setAddMode(false)}>Cancel</button>
        </ReactModal></div>
    );};

    clearStateIfHidden(){
      if(!this.props.addMode&&this.state.name!=''&&this.state.URL!=''){
        this.setState({name: '', URL: ''});
      }
    }
}
const AddModal = connect(mapStateToProps, mapDispatchToProps)(UnconnectedAddModal)
export default AddModal