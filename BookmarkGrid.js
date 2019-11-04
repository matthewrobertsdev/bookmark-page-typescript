import React from 'react';
import './app.css';
import { GridContextProvider, GridDropZone, GridItem, swap } from "react-grid-dnd";
import { connect } from 'react-redux';
import {setBookmarks} from './Actions'


const mapStateToProps = (state) => { return {bookmarks: state.bookmarks} };
const mapDispatchToProps = (dispatch) => {return { setBookmarks: (bookmarks) => { dispatch(setBookmarks(bookmarks)); }} };
class UnconnectedBookmarkGrid extends React.Component{

    constructor(props){
        super(props);
        this.changeIndices=this.changeIndices.bind(this);
    }

    // target id will only be set if dragging from one dropzone to another.
    changeIndices(sourceId, sourceIndex, targetIndex, targetId) {
        console.log('here')
        const nextState = swap(this.props.bookmarks, sourceIndex, targetIndex);
        console.log(nextState)
        //setItems(nextState);
        this.props.setBookmarks(nextState);
    }

    render(){
    return (<GridContextProvider onChange={this.changeIndices} style={{ cursor: 'default', marginLeft: '0px', marginRight: '0px'}}>
        <GridDropZone id="items" boxesPerRow={1} rowHeight={40}
            style={{ height: '800px', width: '80%', touchAction: 'none', cursor: 'default', 
            textAlign: 'center', marginLeft: '10%', marginRight: '10%'}}
            /*disableDrag={true} disableDrop={true}*/ className='bookmark-grid'>

            {this.props.bookmarks.map(item => (<GridItem key={item}>
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

}
const BookmarkGrid = connect(mapStateToProps, mapDispatchToProps)(UnconnectedBookmarkGrid)
export default BookmarkGrid;