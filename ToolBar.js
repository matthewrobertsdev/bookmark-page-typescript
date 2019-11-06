import React from 'react';
import './app.css';
import {setMode, setUncheckedArray, deleteChecked} from './Actions'
import { connect } from 'react-redux';
const mapStateToProps = (state) => { return {mode: state.mode, bookmarks: state.bookmarks,
numChecked: state.numChecked} };
const mapDispatchToProps = (dispatch) => {
    return { setMode: (mode) => { dispatch(setMode(mode)); },
    setUncheckedArray: (array) => { dispatch(setUncheckedArray(array)); },
    deleteChecked: () => { dispatch(deleteChecked());} }};
class UnconnectedToolBar extends React.Component{

    render(){return (
        <ul className='tool-bar'>
        <li className={'tool-item '+this.getRearrangeButtonColorStyle()}
        onClick={()=>this.toggleRearrangeMode()}>Rearrange</li>
        <li className={'tool-item '+this.getDeleteButtonColorStyle()}
        onClick={()=>this.handleDeleteClick()}>{this.getDeleteString()}</li>
        {this.addCancelButton()}
        <li className='tool-item edit-button'>Edit</li>
        <li className={'tool-item '+this.getAddButtonColorStyle()} onClick={()=>this.props.setMode('add')}>Add</li>
        <li className='tool-item settings-button'>Settings</li>
        </ul>);};

    getAddButtonColorStyle(){
        return this.props.mode==='add' ? 'tool-item-selected add-button-selected':'add-button';
    }

    getRearrangeButtonColorStyle(){
        return this.props.mode==='rearrange' ? 'tool-item-selected rearrange-button-selected':'rearrange-button';
    }

    getDeleteButtonColorStyle(){
        return this.props.mode==='delete' ? 'tool-item-selected delete-button-selected':'delete-button';
    }

    toggleRearrangeMode(){
        if (this.props.mode==='rearrange'){
            this.props.setMode('none')
        } else {
            this.props.setMode('rearrange')
        }
    }

    addCancelButton(){
        if (this.props.mode==='delete'){
            return <li className='tool-item cancel-button' onClick={()=>{this.props.setMode('none')}}>Cancel</li>
        }
    }

    handleDeleteClick(){
        if(this.props.mode!=='delete'){
            this.props.setUncheckedArray(this.createUncheckedArray());
            this.props.setMode('delete');
        } else {
            if(this.props.numChecked>0){
                this.props.deleteChecked();
            }
            this.props.setMode('none');
        }
    }

    createUncheckedArray(){
        let checkedArray=[]
        for(let i=0; i<this.props.bookmarks.length; i++){
            checkedArray.push(false)
        }
        return checkedArray;
    }

    getDeleteString(){
        if (this.props.numChecked===0){
            return 'Delete';
        } else {
            return 'Delete ('+this.props.numChecked.toString()+')'
        }
    }

}

const Toolbar = connect(mapStateToProps, mapDispatchToProps)(UnconnectedToolBar)
export default Toolbar;