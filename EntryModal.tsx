import React from 'react';
import './app.css';
import ReactModal from 'react-modal';
import {setMode, addBookmark, setUpdatingName, setUpdatingURL, updateBookmark, BookmarkUpdateInfo} from './Actions'
import { connect } from 'react-redux';
import LinkModel from './LinkModel';
interface State {
  mode: string,
  updatingName: string,
  index: number,
  updatingURL: string,
  updateBookmark: LinkModel,
  bookmarks: LinkModel[]
}
interface Props {
  mode: string,
  setMode: (mode: string) => void,
  updatingName: string,
  setUpdatingName: (name: string) => void,
  updatingURL: string,
  setUpdatingURL: (name: string) => void,
  addBookmark: (bookmark: LinkModel) => void,
  index: number,
  updateBookmark: (index: number, bookmark: LinkModel) => void
}
const mapStateToProps = (state: State) => { return {mode: state.mode,
  updatingURL: state.updatingURL, updatingName: state.updatingName, index: state.index,
  updateBookmark: state.updateBookmark, bookmarks: state.bookmarks}};
const mapDispatchToProps = (dispatch: any) => {
 return { setMode: (mode: string) => { dispatch(setMode(mode)); },
  addBookmark: (bookmark: LinkModel) => { dispatch(addBookmark(bookmark)); },
  setUpdatingName:(name: string)=>{dispatch(setUpdatingName(name)); },
  setUpdatingURL:(URL: string)=>{dispatch(setUpdatingURL(URL)); },
  updateBookmark:(index: number, bookmark: LinkModel)=>{dispatch(updateBookmark(new BookmarkUpdateInfo(index, bookmark))); }}}
 ReactModal.setAppElement('#root');
class UnconnectedEntryModal extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props);
    
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
          this.props.setUpdatingName(event.target.value);
      }

      clearUpdatingBookmark(){
        this.props.setUpdatingName('');
        this.props.setUpdatingURL('');
      }
    
      handleURLChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.setUpdatingURL(event.target.value)
      }
    
      handleSubmit() {
        if (this.props.updatingName!==''&&this.props.updatingURL!==''){
            if(this.props.mode==='add'){
              this.props.addBookmark(new LinkModel(this.props.updatingName, this.props.updatingURL));
              this.props.setMode('none');
            } else if (this.props.mode==='update'){
              this.props.updateBookmark(this.props.index, new LinkModel(this.props.updatingName, this.props.updatingURL));
              this.props.setMode('edit');
            }
            this.clearUpdatingBookmark();
        } else {
        }
      }

      handleCancel(){
        if(this.props.mode==='add'){
          this.props.setMode('none')
        } else if((this.props.mode==='update')){
          this.props.setMode('edit');
        }
        this.clearUpdatingBookmark();
      }

      render(){ return (<div>
        <ReactModal className="action-modal" isOpen={this.props.mode==='add'||this.props.mode==='update'} >
          <h1 className='modal-text-size'>{this.getTitleString()}</h1>
        <label className='modal-text-size'>Name:</label>
        <br></br><input className='modal-small-input' value={this.props.updatingName} onChange={this.handleNameChange}/><br></br>
        <label className='modal-text-size'>URL:</label>
        <br></br><input className='modal-input' type='url' value={this.props.updatingURL} onChange={this.handleURLChange}/><br></br>
        <button className="link-button action-button" onClick={()=>this.handleSubmit()}>{this.getSubmitString()}</button>
        <button className="link-button action-button" onClick={()=>this.handleCancel()}>Cancel</button>
        </ReactModal></div>
    );};

    getTitleString(){
      if (this.props.mode==='add'){
        return 'Add Bookmark:'
      } else if (this.props.mode==='update'){
        return 'Update Bookmark:'
      }
    }

    getSubmitString(){
      if (this.props.mode==='add'){
        return 'Add'
      } else if (this.props.mode==='update'){
        return 'Update'
      }
    }

}
const EntryModal = connect(mapStateToProps, mapDispatchToProps)(UnconnectedEntryModal)
export default EntryModal