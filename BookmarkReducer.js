const initialState={bookmarks: getSavedBookMarks()};

const bookmarkReducer=(state=initialState, action) => {


}

function getSavedBookMarks(){
    if (localStorage.getItem('savedBookmarks')!=null){
        return localStorage.getItem('savedBookmarks')
    } else {
        return [];
    } 
}

export default bookmarkReducer