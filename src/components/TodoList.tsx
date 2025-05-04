"use client"

import React, { useState } from 'react';
import Task from './Task';
import { FilterType, TodoListProps } from '../types/taskTypes';

interface ExtendedTodoListProps extends TodoListProps {
  onUpdateTaskText?: (taskId: string, newText: string) => void;
}

const TodoList: React.FC<ExtendedTodoListProps> = ({ 
  tasks, 
  listId, 
  onAddTask, 
  onToggleTask, 
  onDeleteTask,
  onUpdateTaskText 
}) => {
  const [inputText, setInputText] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onAddTask(inputText.trim());
      setInputText('');
    }
  };

  const [filter, setFilter] = useState<FilterType>('all');

  // Фильтрация задач в зависимости от выбранного фильтра
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

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
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
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
          <p className="text-center py-4 text-gray-500">
            {filter === 'all' 
              ? 'Задач пока нет' 
              : filter === 'completed' 
                ? 'Нет выполненных задач' 
                : 'Нет активных задач'}
          </p>
        )}
      </div>

       {/* Добавляем панель фильтров */}
       <div className="flex justify-center space-x-2 mt-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            filter === 'all'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Все
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            filter === 'active'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Активные
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            filter === 'completed'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Выполненные
        </button>
      </div>

      {/* Счетчик задач */}
      <div className="mt-3 text-center text-sm text-gray-500">
        Всего: {tasks.length} | 
        Выполнено: {tasks.filter(task => task.completed).length} | 
        Осталось: {tasks.filter(task => !task.completed).length}
      </div>
    </div>
    
  );
};

export default TodoList;
