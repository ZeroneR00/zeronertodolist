"use client"

import React, { useState } from 'react';
import Task from './Task';
import { FilterType, TodoListProps } from '../types/taskTypes';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useTheme } from '@/lib/ThemeContext';

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
  const { theme } = useTheme();

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
      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="no-underline hover:no-underline focus:no-underline">
              <span
                className="px-4 py-2 rounded transition-all duration-200 text-decoration-none no-underline hover:no-underline focus:no-underline hover:opacity-90 hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: theme.accent.primary,
                  color: theme.text.white,
                  display: 'inline-block',
                  userSelect: 'none',
                }}
              >
                Добавить таску
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <form onSubmit={handleAddTask} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Добавить новую задачу..."
                    className="flex-1 p-2 border rounded focus:outline-none transition-colors duration-200"
                    style={{
                      backgroundColor: theme.background.primary,
                      color: theme.text.primary,
                      borderColor: theme.todoList.border
                    }}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: theme.accent.primary,
                      color: theme.text.white,
                    }}
                  >
                    Добавить
                  </button>
                </div>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

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
          <p className="text-center py-4 transition-colors duration-200"
             style={{ color: theme.text.secondary }}>
            {filter === 'all'
              ? 'Задач пока нет'
              : filter === 'completed'
                ? 'Нет выполненных задач'
                : 'Нет активных задач'}
          </p>
        )}
      </div>

      {/* Панель фильтров */}
      <div className="flex justify-center space-x-2 mt-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-sm rounded transition-all duration-200 hover:scale-105 active:scale-95`}
          style={{
            backgroundColor: filter === 'all' ? theme.accent.primary : 'transparent',
            color: filter === 'all' ? theme.text.white : theme.text.primary,
            border: filter === 'all' ? 'none' : `1px solid ${theme.todoList.border}`,
          }}
        >
          Все
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1 text-sm rounded transition-all duration-200 hover:scale-105 active:scale-95`}
          style={{
            backgroundColor: filter === 'active' ? theme.accent.primary : 'transparent',
            color: filter === 'active' ? theme.text.white : theme.text.primary,
            border: filter === 'active' ? 'none' : `1px solid ${theme.todoList.border}`,
          }}
        >
          Активные
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 text-sm rounded transition-all duration-200 hover:scale-105 active:scale-95`}
          style={{
            backgroundColor: filter === 'completed' ? theme.accent.primary : 'transparent',
            color: filter === 'completed' ? theme.text.white : theme.text.primary,
            border: filter === 'completed' ? 'none' : `1px solid ${theme.todoList.border}`,
          }}
        >
          Выполненные
        </button>
      </div>

      {/* Счетчик задач */}
      <div className="mt-3 text-center text-sm transition-colors duration-200"
           style={{ color: theme.text.secondary }}>
        Всего: {tasks.length} |
        Выполнено: {tasks.filter(task => task.completed).length} |
        Осталось: {tasks.filter(task => !task.completed).length}
      </div>
    </div>
  );
};

export default TodoList;
