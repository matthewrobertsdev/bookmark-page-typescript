import React from 'react';
import './app.css';
import BookmarkGrid from './BookmarkGrid';
import ToolBar from './ToolBar';
 
function Example() {
 
  return (
    <div>
      <ToolBar/>
      <br></br><br></br><br></br><br></br>
      <h1 className='text-on-background'>Bookmarks</h1>
      <br></br>
      <BookmarkGrid/>
    </div>
  );
}

export default Example;
