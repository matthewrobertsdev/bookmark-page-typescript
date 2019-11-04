const initialState={bookmarks: getSavedBookMarks(), addModalPresent: false};

const bookmarkReducer=(state=initialState, action) => {
    switch (action.type) {
        case 'SET_ADD_MODAL_PRESENT':
            return {...state, addModalPresent: action.present};
        case 'SET_BOOKMARKS':
            return {...state, bookmarks: action.bookmarks}
        default:
            return state;
    }

}

function getSavedBookMarks(){
    if (localStorage.getItem('savedBookmarks')!=null){
        return localStorage.getItem('savedBookmarks')
    } else {
        return [1,2,3,4,5];
    } 
}

export default bookmarkReducer