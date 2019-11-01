import React from 'react';
import './app.css';
import { GridContextProvider, GridDropZone, GridItem, swap } from "react-grid-dnd";

function BookmarkGrid() {

    const [items, setItems] = React.useState([1, 2, 3, 4, 5, 6, 7, 8]); // supply your own state

    // target id will only be set if dragging from one dropzone to another.
    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
        const nextState = swap(items, sourceIndex, targetIndex);
        setItems(nextState);
    }

    return (<GridContextProvider onChange={onChange} style={{ cursor: 'default' }}>
        <GridDropZone id="items" boxesPerRow={2} rowHeight={40}
            style={{ height: "400px", width: '100%', cursor: 'default', textAlign: 'center' }}
            /*disableDrag={true} disableDrop={true}*/ >
            {items.map(item => (<GridItem key={item}>
                <a style={{
                    height: "50%", display: 'inline-block', touchAction: 'none',
                    cursor: 'default', textAlign: 'center', borderRadius: '10px',
                    padding: '3px 11px'
                }}
                    className='link-button'>
                    {item}
                </a> </GridItem>))}
        </GridDropZone>
    </GridContextProvider>);

}

export default BookmarkGrid;