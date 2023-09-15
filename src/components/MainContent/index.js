import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addData, setSendSuccess } from '../../reducers/todoReducer';

import * as actions  from '../../actions/todoActions';

// import { nanoid } from 'nanoid'; //for pure FE wihtout API use.
import { TextField, Button } from '@mui/material';

import TodoList from '../TodoList';

import styles from  './mainContent.module.scss';
import commonStyles from '../common/common.module.scss';
import { nanoid } from 'nanoid';

const MainContent = () =>  {
  const dispatch = useDispatch();
  const { sendSuccess } = useSelector((state) => {
    return state.TodoReducer;
  });

  const [showEdit, setShowEdit] = useState(false);
  const [showError, setShowError] = useState(false);
  const [todoContent, setTodoContent] = useState('');
  const [todoTitle, setTodoTitle] = useState('');
  const [processing, setProcessing] = useState(false);

  /** the effection for making the success message disapear and reset 
   * the application state 
   */
  useEffect(() => {
    if(sendSuccess){
      setTimeout(() => {
        dispatch(setSendSuccess(false));
        //TODO: Reset the component state combined into one function later
        setTodoTitle('');
        setTodoContent('');
        setShowEdit(false);
      }, 1500);
    }
  }, [dispatch, sendSuccess]);

  const addTodoEditArea = e => {
    setShowEdit(true);
  }

  const handleAddTodo = e => {
    /** only check if the content is not empty/ title is additional */
    if(todoContent){
      /** For calling API  */
      // actions.createTodoAction(dispatch, {
      //   id: nanoid(), 
      //   title: todoTitle, 
      //   content: todoContent
      // });
      /** 
       * for pure FE test without API support can directly 
       * use the dispatch to update the store.
       */
      const sendData = {
        id: nanoid(),
        title: todoTitle,
        content: todoContent,
      }
      dispatch(addData(sendData));
    }else{
      setShowError(true);
    }
  }
  const handleCancel = e => {
    //TODO: RESet the component state combined into one function later
    setTodoContent('');
    setTodoTitle('');
    setShowEdit(false);
  }

  const renderError = () => {
    <div className={styles.errorMessage}>
      Something went wrong!
    </div>
  }
  const renderSuccess = () => {
    return (
      <div className={commonStyles.successMessage}>Success!</div>
    );
  }
  const renderEditArea = () =>{
    return (
      <section className={styles.editContainer}>
        {showError && renderError()}
        {sendSuccess && renderSuccess()}
        
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          margin="normal"
          fullWidth
          onChange={e => {
            setTodoTitle(e.target.value);
          }}
        />
        <TextField
          required={true}
          id="filled-textarea"
          label="What To Do"
          placeholder="Input todo item"
          multiline
          fullWidth
          variant="standard"
          onChange={event => {
            setTodoContent(event.target.value);
          }}
        />
        <div className={styles.btnArea}>
          <Button 
            variant="contained"
            onClick={handleAddTodo}
          >
            Send
          </Button>
          <Button 
            variant="outlined"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </section>
    );
  }
  return (
    <div className={styles.container}>
      <section className={styles["title--section"]}>
        <h2>TODO List</h2>
        <span 
          className={`${styles.addIcon} material-symbols-outlined ${sendSuccess && styles.blockClick }`}
          onClick={addTodoEditArea}
        >
          add
        </span>
      </section>
      {
        showEdit && renderEditArea()
      }
      <TodoList />
    </div>
  );
}

export default MainContent;