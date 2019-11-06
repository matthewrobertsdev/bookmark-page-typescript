import React from 'react';
import './app.css';
import { GridContextProvider, GridDropZone, GridItem, swap } from "react-grid-dnd";
import { connect } from 'react-redux';
import {setBookmarks} from './Actions'


const mapStateToProps = (state) => { return {bookmarks: state.bookmarks, rearrangeMode: state.rearrangeMode} };
const mapDispatchToProps = (dispatch) => {return { setBookmarks: (bookmarks) => { dispatch(setBookmarks(bookmarks)); }} };
class UnconnectedBookmarkGrid extends React.Component{

    constructor(props){
        super(props);
        this.changeIndices=this.changeIndices.bind(this);
    }

    // target id will only be set if dragging from one dropzone to another.
    changeIndices(sourceId, sourceIndex, targetIndex, targetId) {
        const nextState = swap(this.props.bookmarks, sourceIndex, targetIndex);
        this.props.setBookmarks(nextState);
    }

    render(){
    return (<GridContextProvider onChange={this.changeIndices} style={{ cursor: 'default', marginLeft: '0px', marginRight: '0px'}}>
        <GridDropZone id="items" boxesPerRow={1} rowHeight={40}
            style={{ height: this.getHeightString(), width: '80%', touchAction: this.getTouchActionString(), cursor: 'default', 
            textAlign: 'center', marginLeft: '10%', marginRight: '10%'}}
            disableDrag={!this.props.rearrangeMode} disableDrop={!this.props.rearrangeMode} className='bookmark-grid'>
            {this.getBookmarkGrid()}
        </GridDropZone>
    </GridContextProvider>);
    }

    getBookmarkGrid(){
        if (this.props.rearrangeMode){
            return this.props.bookmarks.map((item, index)=>{return <GridItem key={index}>
                <label style={{
                    height: "50%", display: 'inline-block', touchAction: 'none',
                    cursor: 'default', textAlign: 'center', borderRadius: '10px',
                    padding: '3px 11px', marginTop: '8px'
                }}
                    className='link-button'>
                    {item.name}
                </label> </GridItem>})
        } else {
            return this.props.bookmarks.map((item, index)=>{return <GridItem key={index}>
                <a href={item.URL} style={{
                    height: "50%", display: 'inline-block', touchAction: 'default',
                    cursor: 'pointer', textAlign: 'center', borderRadius: '10px',
                    padding: '3px 11px', marginTop: '8px'
                }}
                    className='link-button'>
                    {item.name}
                </a> </GridItem>})
        }
    }

    getHeightString(){
        return (this.props.bookmarks.length*40).toString()+'px';
    }

    getTouchActionString(){
        return this.props.rearrangeMode ? 'none' : 'default';
    }

    getCursorString(){
        return this.props.rearrangeMode ? 'default' : 'pointer';
    }

}
const BookmarkGrid = connect(mapStateToProps, mapDispatchToProps)(UnconnectedBookmarkGrid)
export default BookmarkGrid;