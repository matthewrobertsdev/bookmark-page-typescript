import React from 'react';
import './app.css';

function Toolbar() {

    return (
        <ul className='tool-bar'>
        <li className='tool-item rearrange-button'>Rearrange</li>
        <li className='tool-item delete-button'>Delete</li>
        <li className='tool-item edit-button'>Edit</li>
        <li className='tool-item add-button'>Add</li>
        <li className='tool-item settings-button'>Settings</li>
        </ul>);

}

export default Toolbar;