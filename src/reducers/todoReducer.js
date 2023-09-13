import { createSlice } from '@reduxjs/toolkit';

/** 
 * Todo data structure liie: 
 * {
 *   contnet: {string},
 *   title: {string},
 *   id: {string: UUID},
 * }
 * 
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
    /** payload should conatins the id for the record */
    // reduceData: (state, action) => {
    //   state.currentData = state.currentData.filter(d =>d.id !== action.payload);
    // },
    addData: (state, action) => {
      state.currentData.push( action.payload);
      state.sendSuccess = true;
    },
    editData: (state, action) => {
      const editItem = action.payload;

      console.info('in editData: ', editItem);
      
      state.currentData.forEach(item => {
        if(item.id === editItem.id){
          item.title = editItem.title;
          item.content = editItem.content;
        };
        state.sendEditSuccess = true;
      });
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
  // reduceData,
  addData,
  editData,
  deleteItem,
  setSendSuccess,
  setEditSuccess,
} = toDoDataSlice.actions;
export default toDoDataSlice.reducer;
