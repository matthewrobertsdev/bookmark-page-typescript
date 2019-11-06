
export const setMode = (mode) => ({ type: 'SET_MODE', mode });

export const setBookmarks = (bookmarks) => ({ type: 'SET_BOOKMARKS', bookmarks });

export const addBookmark = (bookmark) => ({ type: 'ADD_BOOKMARKS', bookmark });

export const setUncheckedArray = (array) => ({ type: 'CREATE_UNCHECKED_ARRAY', array });

export const toggleCheckedState = (index) => ({ type: 'TOGGLED_CHECKED_STATE', index });

export const deleteChecked = () => ({ type: 'DELETE_CHECKED'});