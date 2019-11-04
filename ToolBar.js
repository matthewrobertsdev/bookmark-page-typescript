import React from 'react';
import './app.css';
import {setAddModalPresent} from './Actions'
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
    return { setAddModalPresent: (present) => { dispatch(setAddModalPresent(present)); }} };
class UnconnectedToolBar extends React.Component{

    render(){return (
        <ul className='tool-bar'>
        <li className='tool-item rearrange-button'>Rearrange</li>
        <li className='tool-item delete-button'>Delete</li>
        <li className='tool-item edit-button'>Edit</li>
        <li className='tool-item add-button' onClick={()=>this.props.setAddModalPresent(true)}>Add</li>
        <li className='tool-item settings-button'>Settings</li>
        </ul>);};

}

const Toolbar = connect(null, mapDispatchToProps)(UnconnectedToolBar)
export default Toolbar;