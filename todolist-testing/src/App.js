import React, { useState, useEffect } from 'react';
import AddTask from './Components/AddTask';
import Filter from './Components/Filter';
import Task from './Components/Task';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const editTask = (id, newText) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
  });

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <AddTask addTask={addTask} />
      <Filter setFilter={setFilter} />
      <div className="task-list">
        {filteredTasks.map((task) => (
          <Task 
            key={task.id} 
            task={task} 
            toggleTask={toggleTask} 
            deleteTask={deleteTask} 
            editTask={editTask} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
