import { createSlice } from '@reduxjs/toolkit';

/** 
 * NOTE: For intital local testing for pure frontend 
 *       No need to wait API ready.
 * Todo data structure like: 
 * {
 *   contnet: {string},
 *   title: {string},
 *   id: {string: UUID},
 * }
 */
const initialState = {
  currentData: [],
  sendSuccess: false,
  sendEditSuccess: false,
};
export const toDoDataSlice = createSlice({
  name: 'toDoDataSlice',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.currentData.push( action.payload);
      state.sendSuccess = true;
    },
    editData: (state, action) => {
      const editItem = action.payload;
      state.currentData.forEach(item => {
        if(item.id === editItem.id){
          item.title = editItem.title;
          item.content = editItem.content;
        };
        state.sendEditSuccess = true;
      });
    },
    fetchAllTodos: (state, action) => {
      state.currentData = action.payload;
    },
    deleteItem: (state, action) => {
      const checkIditem = item => item.id === action.payload.id;
      const index = state.currentData.findIndex(checkIditem);
      state.currentData.splice(index, 1);
    },
    setSendSuccess: (state, action) => {
      state.sendSuccess = action.payload;
    },
    setEditSuccess: (state, action) => {
      state.sendEditSuccess = action.payload;
    }
  },
});

export const {
  addData,
  editData,
  fetchAllTodos,
  deleteItem,
  setSendSuccess,
  setEditSuccess,
} = toDoDataSlice.actions;
export default toDoDataSlice.reducer;
