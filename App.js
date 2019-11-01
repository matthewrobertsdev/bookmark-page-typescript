import React from 'react';
import './app.css';
import BookmarkGrid from './BookmarkGrid';
 
function Example() {
 
  return (
    <div>
      <ul className='tool-bar'>
      <li className='tool-item rearrange-button'>Rearrange</li>
      <li className='tool-item delete-button'>Delete</li>
      <li className='tool-item edit-button'>Edit</li>
      <li className='tool-item add-button'>Add</li>
      <li className='tool-item settings-button'>Settings</li>
      </ul>
      <br></br><br></br><br></br><br></br>
      <h1 className='text-on-background'>Bookmarks</h1>
      <br></br>
      <BookmarkGrid/>
    </div>
  );
}

export default Example;
