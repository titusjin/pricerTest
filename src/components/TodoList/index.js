import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actions  from '../../actions/todoActions';
import { editData, setEditSuccess, deleteItem } from '../../reducers/todoReducer';

import {
  Button,
  Box,
  CircularProgress,
  Divider,
  List, 
  ListItem, 
  ListItemText,
  Modal,
  TextField,
} from '@mui/material';

import styles from  './todoList.module.scss';
import commonStyles from '../common/common.module.scss';

const TodoList = () =>  {
  const dispatch = useDispatch();
  const { currentData, sendEditSuccess } = useSelector((state) => {
    return state.TodoReducer;
  });

  const [openModal, setOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [processing,setProcessing] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleEditError = () => {
    setShowError(true);
    setOpenModal(false);
    setTimeout(() => {
      setShowError(false);
    }, 2000);
  }
  const handleEditSuccess = () => {
    setShowError(false);
    setTimeout(() => {
      setOpenModal(false);
      dispatch(setEditSuccess(false));
    },2000);
  }
  useEffect(() =>{
    setProcessing(false);
    sendEditSuccess
      ? handleEditSuccess()
      : handleEditError()
  }, [dispatch, sendEditSuccess]);

  const triggerEdit = () => {
    setProcessing(true);
    /** For using API */
    // actions.updateTodoAction(currentItem);
    /** For pure FE without API testing */
    dispatch(editData(currentItem));
  }
  const handleClose = () => {
    setOpenModal(false);
    setCurrentItem(null);
  }
  /** one specific sytle setting for box in the modal */
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const renderSuccess = () => {
    return (
      <div className={commonStyles.successMessage}>
        Edit success!
      </div>
    );
  }
  const renderModal = () => {
    return (
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            sendEditSuccess && renderSuccess()
          }
          {
            showError && (
              <div className={commonStyles.errorMessage}>
                Something went worng!
              </div>
            )
          }
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            margin="normal"
            fullWidth
            defaultValue={currentItem.title}
            onChange={event => {
              const item = {...currentItem};
              item.title = event.target.value;
              setCurrentItem(item);
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
            defaultValue={currentItem.content}
            onChange={event => {
              const item = {...currentItem};
              item.content = event.target.value;
              setCurrentItem(item);
            }}
          />
          <div className={styles.btnArea}>
            <Button 
              variant="contained"
              onClick={triggerEdit}
            >
              Send
            </Button>
            <Button 
              variant="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    );
  }

  const handleEdit = item => {
    setCurrentItem(item);
    setOpenModal(true);
  }
  const handleDelete = item => {
    /** For callling API */
    // actions.deleteTodoAction(dispatch,item.id);
    /** onlye for local pure FE without API testing */
    dispatch(deleteItem(item));
  }
  const renderListitems = () => {
    return currentData.map(item => {
      return (
        <div key={item.id}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={item.title}
              secondary={
                <>
                  {`— ${item.content}`}
                </>
              }
            />
            <div className={styles.editBtns}>
              <Button 
                variant="contained"
                onClick={() => {
                  handleEdit(item);
                }
              }>
                Edit
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => {
                  handleDelete(item);
                }
              }>
                Delete
              </Button>
            </div>
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      )
    });
  }
  const renderList = () => {
    return (
      <div className={styles.container}>
        {
          processing && <CircularProgress />
        }
        <List sx={{ width: '100%'}}>
          {renderListitems()}
        </List>

        {
          openModal && renderModal()
        }
      </div>
    );
  }
  return currentData.length > 0 ? renderList() : null;
}

export default TodoList;