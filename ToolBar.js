import React from 'react';
import './app.css';
import {setMode} from './Actions'
import { connect } from 'react-redux';
const mapStateToProps = (state) => { return {mode: state.mode} };
const mapDispatchToProps = (dispatch) => {
    return { setMode: (mode) => { dispatch(setMode(mode)); }} };
class UnconnectedToolBar extends React.Component{

    render(){return (
        <ul className='tool-bar'>
        <li className={'tool-item '+this.getRearrangeButtonColorStyle()}
        onClick={()=>this.toggleRearrangeMode()}>Rearrange</li>
        <li className='tool-item delete-button'>Delete</li>
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
        //return this.props.mode==='delete' ? 'tool-item-selected rearrange-button-selected':'rearrange-button';
    }

    toggleRearrangeMode(){
        if (this.props.mode==='rearrange'){
            this.props.setMode('none')
        } else {
            this.props.setMode('rearrange')
        }
    }

}

const Toolbar = connect(mapStateToProps, mapDispatchToProps)(UnconnectedToolBar)
export default Toolbar;