import TodoAPI from '../utils/apiCaller/todo';
import {fetchAllTodos, addData } from '../reducers/todoReducer';

export const fetchTodosAction = async dispatch => {
  // TODO: 
  // dispatch({
  //   type: PROFILE_DATA_ISLOADING,
  //   payload: true,
  // });
  await TodoAPI
    .fetchTodos() 
    .then(res => {
      const { data } = res.data;
      dispatch(fetchAllTodos(data));
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      // TODO stop loading indicator
      // dispatch({
      //   type: PROFILE_DATA_ISLOADING,
      //   payload: false,
      // });
    });
};

export const createTodoAction = async (dispatch, item) => {
  // dispatch({
  //   type: PROFILE_DATA_ISLOADING,
  //   payload: true,
  // });
  await TodoAPI
    .createTodo(item) 
    .then(res => {
      const { data } = res.data;
      dispatch(addData(data.todo));
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      // TODO stop loading indicator
      // dispatch({
      //   type: PROFILE_DATA_ISLOADING,
      //   payload: false,
      // });
    });
}

export const deleteTodoAction = async (dispatch, id) => {
  // dispatch({
  //   type: PROFILE_DATA_ISLOADING,
  //   payload: true,
  // });
  await TodoAPI
    .deleteTodo(id)
    .then(res => {
      // const returnMsg = res.data.message;
      console.info('Delete success');
    })
    .catch(err => {
      // TODO: make more error handling for indicatte the user
      console.error(err);
    })
    .finally(() => {
      // TODO stop loading indicator
      // dispatch({
      //   type: PROFILE_DATA_ISLOADING,
      //   payload: false,
      // });
    });
}

export const updateTodoAction = async (dispatch, item) => {
  // dispatch({
  //   type: PROFILE_DATA_ISLOADING,
  //   payload: true,
  // });
  await TodoAPI
    .udpateTodo(item)
    .then(res => {
      // const returnMsg = res.data.message;
      console.info('Update success');
    })
    .catch(err => {
      // TODO: make more error handling for indicatte the user
      console.error(err);
    })
    .finally(() => {
      // TODO stop loading indicator
      // dispatch({
      //   type: PROFILE_DATA_ISLOADING,
      //   payload: false,
      // });
    });
}