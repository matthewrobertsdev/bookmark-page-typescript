import React from 'react';
import './app.css';
import {setAddModalPresent} from './Actions'
import { connect } from 'react-redux';
const mapStateToProps = (state) => { return {addModalPresent: state.addModalPresent} };
const mapDispatchToProps = (dispatch) => {
    return { setAddModalPresent: (present) => { dispatch(setAddModalPresent(present)); }} };
class UnconnectedToolBar extends React.Component{

    render(){return (
        <ul className='tool-bar'>
        <li className='tool-item rearrange-button'>Rearrange</li>
        <li className='tool-item delete-button'>Delete</li>
        <li className='tool-item edit-button'>Edit</li>
        <li className={'tool-item '+this.getAddButtonColorStyle()} onClick={()=>this.props.setAddModalPresent(true)}>Add</li>
        <li className='tool-item settings-button'>Settings</li>
        </ul>);};

    getAddButtonColorStyle(){
        return this.props.addModalPresent ? 'tool-item-selected add-button-selected':'add-button';
    }

}

const Toolbar = connect(mapStateToProps, mapDispatchToProps)(UnconnectedToolBar)
export default Toolbar;