const initialState={bookmarks: getSavedBookMarks(), mode: 'none'};

const bookmarkReducer=(state=initialState, action) => {
    switch (action.type) {
        case 'SET_MODE':
            return {...state, mode: action.mode};
        case 'SET_BOOKMARKS':
            return {...state, bookmarks: action.bookmarks}
        case 'ADD_BOOKMARKS':
            let newBookmarks=state.bookmarks.slice(0)
            newBookmarks.unshift(action.bookmark)
            return {...state, bookmarks: newBookmarks}
        default:
            return state;
    }

}

function getSavedBookMarks(){
    if (localStorage.getItem('savedBookmarks')!=null){
        return localStorage.getItem('savedBookmarks')
    } else {
        return [];
    } 
}

export default bookmarkReducer