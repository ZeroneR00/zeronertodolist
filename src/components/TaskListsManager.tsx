// TaskListsManager.tsx
"use client"

import React, { useState } from 'react';
import { useTasksLists } from '@/hooks/useTaskLists';
import TodoList from './TodoList';
import EditableSpan from './EditableSpan';


const defaultInitialLists = [
  {
    id: "1",
    name: "Работа",
    tasks: [
      {
        id: '1',
        text: 'Разобраться с TypeScript',
        completed: false
      },
      {
        id: '2',
        text: 'Сделать этот долбанный TodoList по красоте',
        completed: false
      }
    ]
  },
  {
    id: "2",
    name: "Личное",
    tasks: [
      {
        id: '1',
        text: 'оборвать плющ с яблони',
        completed: false
      },
      {
        id: '2',
        text: 'оборвать плющ с яблони',
        completed: false
      }
    ]
  }
];

const TaskListsManager: React.FC = () => {
  // const [initialLists] = useState([
  //   {
  //     id: "1",
  //     name: "Работа",
  //     tasks: [
  //       {
  //         id: '1',
  //         text: 'Разобраться с TypeScript',
  //         completed: false
  //       },
  //       {
  //         id: '2',
  //         text: 'Сделать этот долбанный TodoList по красоте',
  //         completed: false
  //       }
  //     ]
  //   },
  //   {
  //     id: "2",
  //     name: "Личное",
  //     tasks: [
  //       {
  //         id: '1',
  //         text: 'оборвать плющ с яблони',
  //         completed: false
  //       },
  //       {
  //         id: '2',
  //         text: 'оборвать плющ с яблони',
  //         completed: false
  //       }
  //     ]
  //   }
  // ]);

  const {
    taskLists,
    addTaskList,
    addTaskToList,
    toggleTask,
    deleteTask,
    deleteTaskList,
    updateName,
    updateTaskText
  } = useTasksLists(defaultInitialLists);

  const [newListName, setNewListName] = useState('');

  const handleAddTheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListName.trim()) {
      addTaskList(newListName.trim());
      setNewListName('');
    } else {
      addTaskList("Новая тема");
    }
  }

  // // Обработчик изменения имени списка
  // const handleListNameChange = (listId: string, newName: string) => {
  //   updateName(listId, newName);
  // };

  return (
    <div className=" max-w-2xl mx-auto p-6 ">
      <h1 className="text-black text-4xl font-bold text-center mb-8">Менеджер списков задач</h1>

      <form onSubmit={handleAddTheme} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Название новой темы..."
            className="text-black flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Добавить тему
          </button>
        </div>
      </form>

      <div className="space-y-12">
        {taskLists.map(list => (
          <div key={list.id} className="bg-gray-50 p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">

              <h2 className="text-black text-2xl font-bold">
                <EditableSpan
                  name={list.name}
                  onChange={(newName) => updateName(list.id, newName)} /></h2>
              <button
                onClick={() => deleteTaskList(list.id)}
                className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
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
          <div className="text-center p-10 text-gray-500 bg-gray-50 rounded-lg">
            Нет списков задач. Создайте новую тему.
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskListsManager;