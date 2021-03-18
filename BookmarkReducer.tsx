import LinkModel from "./LinkModel";
interface Action{
  type: string,
  payload: any
}
const initialState = { bookmarks: getSavedBookmarks(), mode: 'none', checkedArray: [] as boolean[], numChecked: 0,
updateingBookmark: null, needsPassBookmark: false, updatingURL: '', updatingName: '', updatingIndex: null};

const bookmarkReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'SET_UPDATING_NAME':
                return { ...state, updatingName: action.payload}
        case 'SET_UPDATING_URL':
                return { ...state, updatingURL: action.payload}
        case 'SET_MODE':
            return { ...state, mode: action.payload };
        case 'SET_BOOKMARKS':
            var validatedBookmarks=validateBookmarks(action.payload);
            saveBookmarks(validatedBookmarks);
            return { ...state, bookmarks: validatedBookmarks }
        case 'ADD_BOOKMARK':
          console.log("hello")
            let newBookmarks=[]
            if (state.bookmarks!==null){
                newBookmarks = state.bookmarks.slice(0);
                newBookmarks.unshift(action.payload);
                console.log(newBookmarks)
            } else {
                newBookmarks=[action.payload]
            }
            saveBookmarks(newBookmarks);
            return { ...state, bookmarks: newBookmarks }
        case 'CREATE_UNCHECKED_ARRAY':
            let checkedArray = []
            for (let i = 0; i < state.bookmarks.length; i++) {
                checkedArray.push(false)
            }
            return { ...state, checkedArray: checkedArray, numChecked: 0}
        case 'TOGGLED_CHECKED_STATE':
            let newCheckedState = state.checkedArray.slice(0);
            newCheckedState[action.payload] = !newCheckedState[action.payload]
            let numChecked = 0;
            for (let i = 0; i < newCheckedState.length; i++) {
                if (newCheckedState[i]) {
                    numChecked += 1;
                }
            }
            return { ...state, checkedArray: newCheckedState, numChecked: numChecked }
        case 'DELETE_CHECKED':
            let keptBookmarks = [];
            for (let i = 0; i < state.bookmarks.length; i++) {
                if (!state.checkedArray[i]) {
                    keptBookmarks.push(state.bookmarks[i])
                }
            }
            saveBookmarks(keptBookmarks);
            return { ...state, bookmarks: keptBookmarks, numChecked: 0 }
        case 'SET_UPDATING_INDEX':
                return {...state, index: action.payload}
        case 'UPDATE_BOOKMARK':
                let updatedBookmarks=state.bookmarks
                updatedBookmarks[action.payload.index]=action.payload.bookmark
                saveBookmarks(updatedBookmarks);
                return { ...state, bookmarks: updatedBookmarks}
        case 'APPEND_BOOKMARKS':
                let withAppend=state.bookmarks.concat(validateBookmarks(action.payload));
                saveBookmarks(withAppend);
                return { ...state, bookmarks: withAppend}
        default:
            return state;
    }

}

export const validateBookmarks=function validateBookmarks(bookmarks: LinkModel[]){
    var validatedBookmarks=[];
    for(let i=0; i<bookmarks.length; i++){
        if (bookmarks[i].name&&bookmarks[i].name!==null&&bookmarks[i].name!==undefined&&bookmarks[i].name!==''
        &&bookmarks[i].URL&&bookmarks[i].URL!==null&&bookmarks[i].URL!==undefined&&bookmarks[i].URL!==''){
            validatedBookmarks.push(bookmarks[i]);
        }
    }
    return validatedBookmarks;
}

export const saveBookmarks=function saveBookmarks(bookmarks: LinkModel[]) {
    localStorage.setItem('savedBookmarks', JSON.stringify(bookmarks))
}

function getSavedBookmarks() {
    if (localStorage.getItem('savedBookmarks') !== null&&localStorage.getItem('savedBookmarks')!==undefined) {
        try{
          let savedBookmarks=localStorage.getItem('savedBookmarks')
          if (savedBookmarks==null) {
            savedBookmarks=""
          }
            return JSON.parse(savedBookmarks);
        } catch(e){
            return [];
        }
    } else {
        return [];
    }
}

export default bookmarkReducer