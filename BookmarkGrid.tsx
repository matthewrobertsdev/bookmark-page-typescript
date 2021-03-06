import React from 'react';
import './app.css';
import { GridContextProvider, GridDropZone, GridItem, swap } from "react-grid-dnd";
import { connect } from 'react-redux';
import {
    setBookmarks, toggleCheckedState, setMode, setUpdatingIndex, setUpdatingName,
    setUpdatingURL
} from './Actions'
import { saveBookmarks } from './BookmarkReducer';
import LinkModel from './LinkModel';
interface State {
  bookmarks: LinkModel[],
  mode: string,
  checkedArray: boolean[],
  numColumns: number
}
interface Props {
  bookmarks: LinkModel[],
  setBookmarks: (nextState: LinkModel[])=>void,
  mode: string,
  setMode: (mode: string)=>void,
  checkedArray: boolean[],
  toggleCheckedState: (index: number)=>void,
  setUpdatingIndex: (index: number)=>void,
  setUpdatingName: (updatingName: string)=>void
  setUpdatingURL: (updatingURL: string)=>void
}
const mapStateToProps = (state: State) => {
    return {
        bookmarks: state.bookmarks, mode: state.mode,
        checkedArray: state.checkedArray
    }
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        setBookmarks: (bookmarks: LinkModel[]) => { dispatch(setBookmarks(bookmarks)); },
        toggleCheckedState: (index: number) => { dispatch(toggleCheckedState(index)); },
        setMode: (mode: string) => { dispatch(setMode(mode)); },
        setUpdatingIndex: (index: number) => { dispatch(setUpdatingIndex(index)) },
        setUpdatingName: (name: string) => { dispatch(setUpdatingName(name)); },
        setUpdatingURL: (URL: string) => { dispatch(setUpdatingURL(URL)) }
    }
};
class UnconnectedBookmarkGrid extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.changeIndices = this.changeIndices.bind(this);
        this.state={...this.state, numColumns: Math.floor(window.innerWidth/400)+1};
        this.resizeFunction=this.resizeFunction.bind(this);
        window.addEventListener('resize', this.resizeFunction);
    }

    resizeFunction(){
        let numColumns=Math.floor(window.innerWidth/400)+1
        if(this.state.numColumns!==numColumns){
            this.setState({numColumns: numColumns});
        }
    }

    // target id will only be set if dragging from one dropzone to another.
    changeIndices(sourceId: string, sourceIndex: number, targetIndex: number, targetId?: string) {
        const nextState = swap(this.props.bookmarks, sourceIndex, targetIndex);
        this.props.setBookmarks(nextState);
        saveBookmarks(nextState);
    }

    render() {
        return (<GridContextProvider onChange={this.changeIndices}>
            <GridDropZone id="items" boxesPerRow={this.state.numColumns} rowHeight={40}
                style={{
                    height: this.getHeightString(), width: '80%', touchAction: this.getTouchActionString(), cursor: 'default',
                    textAlign: 'center', marginLeft: '10%', marginRight: '10%'
                }}
                disableDrag={!this.isRearrangeMode()} disableDrop={!this.isRearrangeMode()} className='bookmark-grid'>
                {this.getBookmarkGrid()}
            </GridDropZone>
        </GridContextProvider>);
    }

    getBookmarkGrid() {
        return this.props.bookmarks.map((item: LinkModel, index: number) => {
            if (this.props.mode === 'rearrange') {
                return <GridItem key={index}>
                    <label style={this.getGridItemStyleObject('none', 'default')}
                        className='link-button'>
                        {item.name}
                    </label> </GridItem>
            } else if (this.props.mode === 'edit' || this.props.mode === 'update') {
                return <GridItem key={index}>
                    <label style={this.getGridItemStyleObject('none', 'default')}
                        className='link-button' onClick={() => { this.updateBookmark(index, item) }}>
                        {item.name}
                    </label> </GridItem>

            } else {
                return <GridItem key={index}>
                    {this.addForDelete(index)}
                    <a href={item.URL} style={this.getGridItemStyleObject('default', 'pointer')}
                        className='link-button'>
                        {item.name}
                    </a> </GridItem>
            }
        })
    }

    getHeightString() {
        let effectiveLength=0;
        if (this.props.bookmarks.length%this.state.numColumns!==0){
            effectiveLength=this.props.bookmarks.length+
            (this.state.numColumns-this.props.bookmarks.length%this.state.numColumns);
        } else {
            effectiveLength=this.props.bookmarks.length;
        }
        return (effectiveLength * (40/this.state.numColumns)).toString() + 'px';
    }

    getTouchActionString() {
        return this.isRearrangeMode() ? 'none' : 'default';
    }

    getCursorString() {
        return this.isRearrangeMode() ? 'default' : 'pointer';
    }

    isRearrangeMode() {
        return this.props.mode === 'rearrange'
    }

    addForDelete(index: number) {
        if (this.props.mode === 'delete') {
            return <input type='checkbox' checked={this.props.checkedArray[index]}
                onChange={() => this.props.toggleCheckedState(index)} className='delete-check-box'></input>
        }
    }

    updateBookmark(index: number, bookmark: LinkModel) {
        this.props.setMode('update');
        this.props.setUpdatingIndex(index);
        this.props.setUpdatingName(bookmark.name);
        this.props.setUpdatingURL(bookmark.URL);
    }

    getGridItemStyleObject(touchAction: string, pointer: string){
        return {
            height: "50%", display: 'inline-block', touchAction: touchAction,
            cursor: pointer, borderRadius: '10px', padding: '3px 11px', marginTop: '8px'
        }
    }

}
const BookmarkGrid = connect(mapStateToProps, mapDispatchToProps)(UnconnectedBookmarkGrid)
export default BookmarkGrid;

//style={{ cursor: 'default', marginLeft: '0px', marginRight: '0px' }}