import React from 'react';
import EditableSpan from './EditableSpan';
import { useTheme } from '@/lib/ThemeContext';

interface TaskProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onTextChange?: (id: string, newText: string) => void;
}

const Task: React.FC<TaskProps> = ({
  id,
  text,
  completed,
  onToggle,
  onDelete,
  onTextChange
}) => {
  const { theme } = useTheme();

  // Обработчик изменения текста задачи
  const handleTextChange = (newText: string) => {
    if (onTextChange) {
      onTextChange(id, newText);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 mb-2 rounded-lg shadow transition-colors duration-200"
         style={{ backgroundColor: theme.todoList.itemBackground }}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          className="w-4 h-4 mr-3 cursor-pointer"
          style={{ accentColor: theme.accent.primary }}
        />
        <span className={`text-lg transition-colors duration-200 ${completed ? 'line-through' : ''}`}
              style={{ color: completed ? theme.text.tertiary : theme.text.primary }}>
          <EditableSpan
            name={text}
            onChange={handleTextChange}
          />
        </span>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="px-3 py-1 text-sm rounded transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: theme.accent.error,
          color: theme.text.white,
        }}
      >
        Удалить
      </button>
    </div>
  );
};

export default Task; 