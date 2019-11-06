const initialState = { bookmarks: getSavedBookMarks(), mode: 'none', checkedArray: [], numChecked: 0};

const bookmarkReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MODE':
            return { ...state, mode: action.mode };
        case 'SET_BOOKMARKS':
            return { ...state, bookmarks: action.bookmarks }
        case 'ADD_BOOKMARKS':
            let newBookmarks = state.bookmarks.slice(0);
            newBookmarks.unshift(action.bookmark);
            saveBookmarks(newBookmarks);
            return { ...state, bookmarks: newBookmarks }
        case 'CREATE_UNCHECKED_ARRAY':
            return { ...state, checkedArray: action.array }
        case 'TOGGLED_CHECKED_STATE':
            let newCheckedState=state.checkedArray.slice(0);
            newCheckedState[action.index]=!newCheckedState[action.index]
            let numChecked=0;
            for (let i=0; i<newCheckedState.length; i++){
                if (newCheckedState[i]){
                    numChecked+=1;
                }
            }
            return { ...state, checkedArray: newCheckedState, numChecked: numChecked}
        case 'DELETE_CHECKED':
            let keptBookmarks=[];
            for (let i=0; i<state.bookmarks; i++){
                if (!state.checkedArray[i]){
                    keptBookmarks.push(state.bookmarks[i])
                }
            }
            saveBookmarks(keptBookmarks);
            return { ...state, bookmarks: keptBookmarks, numChecked: 0}
        default:
            return state;
    }

}

function saveBookmarks(bookmarks){
    localStorage.setItem('savedBookmarks', JSON.stringify(bookmarks))
}

function getSavedBookMarks() {
    if (localStorage.getItem('savedBookmarks') != null) {
        return JSON.parse(localStorage.getItem('savedBookmarks'));
    } else {
        return [];
    }
}

export default bookmarkReducer