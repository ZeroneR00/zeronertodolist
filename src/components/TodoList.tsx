"use client"

import React, { useState } from 'react';
import Task from './Task';
import { TodoListProps } from '../types/taskTypes';


const TodoList: React.FC<TodoListProps> = ({ 
  tasks, 
  listId, 
  onAddTask, 
  onToggleTask, 
  onDeleteTask 
}) => {
  const [inputText, setInputText] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onAddTask(inputText.trim());
      setInputText('');
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Добавить новую задачу..."
            className="text-black flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Добавить
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              text={task.text}
              completed={task.completed}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))
        ) : (
          <p className="text-center py-4 text-gray-500">Задач пока нет</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
