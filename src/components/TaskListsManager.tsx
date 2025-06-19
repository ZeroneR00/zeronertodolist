// TaskListsManager.tsx
"use client"

import React, { useState } from 'react';
import { useTasksLists } from '@/hooks/useTaskLists';
import TodoList from './TodoList';
import EditableSpan from './EditableSpan';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Header from './Header';
import { useTheme } from '@/lib/ThemeContext';

const TaskListsManager: React.FC = () => {
  const {
    taskLists,
    addTaskList,
    addTaskToList,
    toggleTask,
    deleteTask,
    deleteTaskList,
    updateName,
    updateTaskText
  } = useTasksLists();

  const [newListName, setNewListName] = useState('');
  const { theme } = useTheme();

  const handleAddTheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListName.trim()) {
      addTaskList(newListName.trim());
      setNewListName('');
    } else {
      addTaskList("Новая тема");
    }
  }

  return (
    <main className={`min-h-screen py-8 pt-0 transition-colors duration-200`}
      style={{ backgroundColor: theme.background.primary }}>
      <Header />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className={`text-4xl font-bold text-center mb-8 transition-colors duration-200`}
          style={{ color: theme.text.primary }}>
          Менеджер списков задач
        </h1>

        <Dialog>
          <div className="flex justify-center mb-5">
            <DialogTrigger asChild>
              <button
                type="button"
                className="px-4 py-2 rounded transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: theme.accent.primary,
                  color: theme.text.white
                }}
              >
                Добавить тему
              </button>
            </DialogTrigger>
          </div>
          <DialogContent className=''
            style={{
              backgroundColor: theme.background.secondary,
              color: theme.text.primary,
              borderColor: theme.todoList.border
            }} >
            <DialogHeader>
              <DialogTitle>Добавить тему</DialogTitle>
              <DialogDescription>
                Введите название новой темы
              </DialogDescription>
              <form onSubmit={handleAddTheme} className="mb-8 flex flex-col">
                <div className="flex gap-2 items-center justify-between p-4 mb-2 rounded-lg shadow transition-colors duration-200"
                  style={{ backgroundColor: theme.background.secondary }}>
                  <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="Название новой темы..."
                    className="flex-1 p-2 border rounded focus:outline-none transition-colors duration-200"
                    style={{
                      backgroundColor: theme.background.primary,
                      color: theme.text.primary,
                      borderColor: theme.todoList.border
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: theme.accent.primary,
                    color: theme.text.white,
                  }}
                >
                  Создать
                </button>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div className="space-y-12">
          {taskLists.map(list => (
            <div key={list.id}
              className="p-6 rounded-lg shadow transition-colors duration-200"
              style={{ backgroundColor: theme.todoList.background }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold transition-colors duration-200"
                  style={{ color: theme.text.primary }}>
                  <EditableSpan
                    name={list.name}
                    onChange={(newName) => updateName(list.id, newName)} />
                </h2>
                <button
                  onClick={() => deleteTaskList(list.id)}
                  className="px-3 py-1 text-sm rounded transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: theme.accent.error,
                    color: theme.text.white,
                  }}
                >
                  Удалить тему
                </button>
              </div>

              <TodoList
                tasks={list.tasks}
                listId={list.id}
                onAddTask={(text) => addTaskToList(list.id, text)}
                onToggleTask={(taskId) => toggleTask(list.id, taskId)}
                onDeleteTask={(taskId) => deleteTask(list.id, taskId)}
                onUpdateTaskText={(taskId, newText) => updateTaskText(list.id, taskId, newText)}
              />
            </div>
          ))}

          {taskLists.length === 0 && (
            <div className="text-center p-10 rounded-lg transition-colors duration-200"
              style={{
                backgroundColor: theme.background.secondary,
                color: theme.text.secondary
              }}>
              Нет списков задач. Создайте новую тему.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default TaskListsManager;