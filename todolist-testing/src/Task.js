import React, { useState } from 'react';
import "./App.css"
function Task({ task, toggleTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    editTask(task.id, newText);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setNewText(task.text);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => toggleTask(task.id)} 
      />
      {isEditing ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="text" 
            value={newText} 
            onChange={(e) => setNewText(e.target.value)} 
            style={{ flex: 1, marginRight: '10px' }} 
          />
          <button className="save-btn" onClick={handleSaveClick}>Save</button>
          <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <span>{task.text}</span>
      )}
      <div>
        {!isEditing && (
          <>
            <button className="edit-btn" onClick={handleEditClick}>Edit</button>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Task;
