const initialState={bookmarks: getSavedBookMarks(), addModalPresent: false};

const bookmarkReducer=(state=initialState, action) => {
    switch (action.type) {
        case 'SET_ADD_MODAL_PRESENT':
            return {...state, addModalPresent: action.present};
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