import { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editValue, setEditValue] = useState("");
  const [editingId, setEditingId] = useState(null);

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.text);
  };
  const saveEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editValue } : todo
    ));
    setEditingId(null);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false,
      }]);
      setInputValue("");
    }
  };
  return (
    <div className="App">
      <h1>To Do Liste</h1>
      <div className='add-L'>
        <input type='text' placeholder='add item ...'
          value={inputValue} onChange={(event) => {
            setInputValue(event.target.value)
          }}
        />
        <button onClick={addTodo}>ADD</button>
      </div>
      <div className='todos-list'>
        {todos.map(todo => (
          <div key={todo.id} className='todo-item'>
            {editingId === todo.id ? (
              <>
                <input type='text' value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => saveEdit(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <div className="todo-ac">
                  <button className='delete-btn'
                    onClick={() => deleteTodo(todo.id)}>Delete</button>
                  <button className='edit-btn'
                    onClick={() => startEditing(todo)}>Edit</button>
                </div>
              </>
            )}

          </div>
        ))}
      </div>


    </div>
  );
}

export default App;
