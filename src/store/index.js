// import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
// import logger from 'redux-logger';

function generateStore() {
  /**
   * using redux-toolkit to generate store
   * 1. reducer: if only one functoin is provided the function will be the reducer
   *    of the application.Otherwise, need an object to send into combineReducers 
   *    function.
   * 2. middleware parameter: default will adopting redux-thunk. 
   *    But once adding middleware in configure,
   *    will need to add all middleware u would like to use, which means redux-thuhnk
   *    no loger be added automatically.
   * 3. devTools parameter: default will apply composeWithDevtools
   */
  return configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    // enhancers: [reduxBatch],
  });
}

export default generateStore();
