import LinkModel from "./LinkModel";

export class BookmarkUpdateInfo {
  index: number
  bookmark: LinkModel
  constructor(index: number, bookmark: LinkModel) {
    this.index=index
    this.bookmark=bookmark
  }
}

export const setMode = (payload: string) => ({ type: 'SET_MODE', payload });

export const setBookmarks = (payload: LinkModel[]) => ({ type: 'SET_BOOKMARKS', payload });

export const addBookmark = (payload: LinkModel) => ({ type: 'ADD_BOOKMARK', payload });

export const createUncheckedArray = (payload: any) => ({ type: 'CREATE_UNCHECKED_ARRAY', payload});

export const toggleCheckedState = (payload: number) => ({ type: 'TOGGLED_CHECKED_STATE', payload });

export const deleteChecked = (payload: any) => ({ type: 'DELETE_CHECKED', payload});

export const setUpdatingName = (payload: string) => ({ type: 'SET_UPDATING_NAME', payload});

export const setUpdatingURL = (payload: string) => ({ type: 'SET_UPDATING_URL', payload});

export const setUpdatingIndex = (payload: number) => ({ type: 'SET_UPDATING_INDEX', payload});

export const updateBookmark = (payload: BookmarkUpdateInfo) => ({ type: 'UPDATE_BOOKMARK', payload});

export const appendBookmarks = (payload: LinkModel[]) => ({ type: 'APPEND_BOOKMARKS', payload});


