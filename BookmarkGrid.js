import React from 'react';
import './app.css';
import { GridContextProvider, GridDropZone, GridItem, swap } from "react-grid-dnd";

function BookmarkGrid() {

    const [items, setItems] = React.useState(getSavedBookMarks()); // supply your own state

    // target id will only be set if dragging from one dropzone to another.
    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
        const nextState = swap(items, sourceIndex, targetIndex);
        setItems(nextState);
    }

    function getSavedBookMarks(){
        if (localStorage.getItem('savedBookmarks')!=null){
            return localStorage.getItem('savedBookmarks')
        } else {
            return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
        } 
    }

    return (<GridContextProvider onChange={onChange} style={{ cursor: 'default', marginLeft: '0px', marginRight: '0px'}}>
        <GridDropZone id="items" boxesPerRow={1} rowHeight={40}
            style={{ height: '800px', width: '80%', touchAction: 'none', cursor: 'default', 
            textAlign: 'center', marginLeft: '10%', marginRight: '10%'}}
            /*disableDrag={true} disableDrop={true}*/ className='bookmark-grid'>

            {items.map(item => (<GridItem key={item}>
                <a style={{
                    height: "50%", display: 'inline-block', touchAction: 'none',
                    cursor: 'default', textAlign: 'center', borderRadius: '10px',
                    padding: '3px 11px', marginTop: '8px'
                }}
                    className='link-button'>
                    {item}
                </a> </GridItem>))}
        </GridDropZone>
    </GridContextProvider>);

}

export default BookmarkGrid;