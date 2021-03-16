import { createStore} from "redux";
import bookmarkReducer from './BookmarkReducer';
const bookmarkStore=() => {
    return createStore(bookmarkReducer);
};
export default bookmarkStore;