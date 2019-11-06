import React from 'react';
import './app.css';
import {setAddMode, setRearrangeMode} from './Actions'
import { connect } from 'react-redux';
const mapStateToProps = (state) => { return {addMode: state.addMode, rearrangeMode: state.rearrangeMode} };
const mapDispatchToProps = (dispatch) => {
    return { setAddMode: (present) => { dispatch(setAddMode(present)); },
     setRearrangeMode: (on) => { dispatch(setRearrangeMode(on)); }} };
class UnconnectedToolBar extends React.Component{

    render(){return (
        <ul className='tool-bar'>
        <li className={'tool-item '+this.getRearrangeButtonColorStyle()}
        onClick={()=>this.props.setRearrangeMode(!this.props.rearrangeMode)}>Rearrange</li>
        <li className='tool-item delete-button'>Delete</li>
        <li className='tool-item edit-button'>Edit</li>
        <li className={'tool-item '+this.getAddButtonColorStyle()} onClick={()=>this.props.setAddMode(true)}>Add</li>
        <li className='tool-item settings-button'>Settings</li>
        </ul>);};

    getAddButtonColorStyle(){
        return this.props.addMode ? 'tool-item-selected add-button-selected':'add-button';
    }

    getRearrangeButtonColorStyle(){
        return this.props.rearrangeMode ? 'tool-item-selected rearrange-button-selected':'rearrange-button';
    }

}

const Toolbar = connect(mapStateToProps, mapDispatchToProps)(UnconnectedToolBar)
export default Toolbar;