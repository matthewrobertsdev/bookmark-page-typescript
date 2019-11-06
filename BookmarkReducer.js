const initialState={bookmarks: getSavedBookMarks(), addMode: false, rearrangeMode: false};

const bookmarkReducer=(state=initialState, action) => {
    switch (action.type) {
        case 'SET_ADD_MODE':
            return {...state, addMode: action.present, rearrangeMode: false};
        case 'SET_BOOKMARKS':
            return {...state, bookmarks: action.bookmarks}
        case 'ADD_BOOKMARKS':
            let newBookmarks=state.bookmarks.slice(0)
            newBookmarks.unshift(action.bookmark)
            return {...state, bookmarks: newBookmarks}
        case 'SET_REARRANGE_MODE':
            return {...state, rearrangeMode: action.on, addMode: false}
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