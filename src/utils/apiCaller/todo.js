import api from '../api';

const TodoAPI = {};

TodoAPI.fetchTodos = params => {
  const url = '/todos';
  return api.fire({
    url,
    method: 'GET',
    params
  });
};

TodoAPI.createTodo = item => {
  const url = `/todos`;
  return api.fire({
    url,
    method: 'POST',
    data: JSON.stringify(item),
  });
};

TodoAPI.udpateTodo = item => {
  const url = `/todos/${item.id}`;
  return api.fire({
    url,
    method: 'PUT',
    data: JSON.stringify(item),
  });
};

TodoAPI.deleteTodo = id => {
  const url = `/todos/${id}`;
  return api.fire({
    url,
    method: 'DELETE',
  });
};

export default TodoAPI;
