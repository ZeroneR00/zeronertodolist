import { TaskType } from '@/types/taskTypes';
import React from 'react';

interface TaskProps extends TaskType {
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({ id, text, completed, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          className="w-4 h-4 mr-3 cursor-pointer"
        />
        <span className={`text-lg ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {text}
        </span>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
      >
        Удалить
      </button>
    </div>
  );
};


export default Task; 