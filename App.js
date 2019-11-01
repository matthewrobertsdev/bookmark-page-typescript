import React from 'react';
import './app.css';

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap
} from "react-grid-dnd";
 
function Example() {
  const [items, setItems] = React.useState([1, 2, 3, 4, 5, 6, 7, 8]); // supply your own state
 
  // target id will only be set if dragging from one dropzone to another.
  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
  }
  
 
  return (
    <div>
      <h1 className='text-on-background'>Bookmarks</h1>
      <ul className='tool-bar'>
      <li className='tool-item rearrange-button'>Rearrange</li>
      <li className='tool-item delete-button'>Delete</li>
      <li className='tool-item edit-button'>Edit</li>
      <li className='tool-item add-button'>Add</li>
      <li className='tool-item settings-button'>Settings</li>
      </ul>
    <GridContextProvider onChange={onChange} style={{cursor: 'default'}}>
      <br></br><br></br><br></br><br></br><br></br>
      <GridDropZone
        id="items"
        boxesPerRow={2}
        rowHeight={40}
        style={{ height: "400px", width: '100%', cursor: 'default', textAlign: 'center'}}
        //disableDrag={true} //disableDrop={true}
      >
        {items.map(item => (
          <GridItem key={item}>
            <a 
              style={{
                height: "50%",
                display: 'inline-block',
                touchAction: 'none',
                cursor: 'default',
                textAlign: 'center',
                borderRadius: '10px',
                padding: '3px 11px'
              }}
              className='link-button'
            >
              {item}
            </a>
          </GridItem>
        ))}
      </GridDropZone>
    </GridContextProvider>
    </div>
  );
}

export default Example;
