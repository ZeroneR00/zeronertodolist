"use client"

import { useEffect, useState } from 'react';
import { TaskListType, TaskType } from '../types/taskTypes';
import { v4 as uuidv4 } from 'uuid';

// Ключ для хранения в localStorage
const STORAGE_KEY = 'todo-lists-data';


export function useTasksLists(initialTasks: TaskListType[] = []) {

    // Функция для загрузки данных из localStorage
    const loadFromStorage = (): TaskListType[] => {
      // Проверка доступности localStorage (выполняется только на клиенте)
      if (typeof window !== 'undefined') {
        // Попытка получить данные из localStorage
        const savedData = localStorage.getItem(STORAGE_KEY);
        console.log(savedData + 'первое')
        // Если данные найдены, парсим их из строки JSON и возвращаем
        if (savedData) {
          try {
            return JSON.parse(savedData);
          } catch (error) {
            console.error('Ошибка при загрузке данных из localStorage:', error);
          }
        }
        console.log(savedData + 'второе')
      }
      
      // Возвращаем начальные задачи, если ничего не найдено в localStorage
      return initialTasks;
    };

  const [taskLists, setTaskLists] = useState<TaskListType[]>(loadFromStorage());
  const [currentListId, setCurrentListId] = useState<string | null>(null);

  // Эффект для сохранения в localStorage при изменении taskLists
  useEffect(() => {
    // Убедимся, что мы выполняем это только на клиенте
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(taskLists));
    }
  }, [taskLists]); // Зависимость от taskLists, эффект выполнится при изменении списков

  //   // Создание новой темы/списка задач
  const addTaskList = (name: string) => {
    const newList: TaskListType = {
      id: uuidv4(),
      name,
      tasks: []
    };
    setTaskLists([...taskLists, newList]);
    return newList;
  };

  // Добавление задачи в конкретный список
  const addTaskToList = (listId: string, taskText: string) => {
    const newTask: TaskType = {
      id: uuidv4(),
      text: taskText,
      completed: false
    }
    setTaskLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? { ...list, tasks: [...list.tasks, newTask] }
          : list
      )
    )
  }

  // Обновить название списка задач
  const updateName = (listId: string, newName: string) => {
    setTaskLists(prevLists => 
      prevLists.map(list => 
        list.id === listId ? { ...list, name: newName } : list
      )
    );
  };


  const toggleTask = (listId: string, taskId: string) => {
    setTaskLists(prevLists => prevLists.map(list => list.id === listId
      ? {
        ...list, tasks: list.tasks.map(task => task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
        )
      }
    : list))
  }

  const deleteTask = (listId :string, taskId: string) => {
    setTaskLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? {
            ...list,
            tasks: list.tasks.filter(task => task.id !== taskId)
          }
          : list
      )
    );
  }

  const deleteTaskList = (id :string) => {
    setTaskLists(prevLists => prevLists.filter(list => list.id !== id));
  }

   // Обновление текста задачи
   const updateTaskText = (listId: string, taskId: string, newText: string) => {
    setTaskLists(prevLists => prevLists.map(list => list.id === listId
      ? {
        ...list, tasks: list.tasks.map(task => task.id === taskId
          ? { ...task, text: newText }
          : task
        )
      }
    : list));
  }
  


  return {
    taskLists,
    currentListId,
    setCurrentListId,
    addTaskList,
    addTaskToList,
    toggleTask,
    deleteTask,
    deleteTaskList,
    updateName,
    updateTaskText
  };

}
