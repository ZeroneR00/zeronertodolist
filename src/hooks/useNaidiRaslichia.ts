// useTaskLists.ts - улучшенная версия
"use client"
import { useState } from 'react';
import { TaskListType, TaskType } from '../types/taskTypes';


export function useTasksLists(initialLists: TaskListType[] = []) {
  const [taskLists, setTaskLists] = useState<TaskListType[]>(initialLists);


 
  // Добавление нового списка задач
  const addTaskList = (name: string) => {
    const newList: TaskListType = {
      id: Date.now().toString(),
      name,
      tasks: []
    };
    setTaskLists([...taskLists, newList]);
    return newList;
  };


  // Добавление задачи в конкретный список
  const addTaskToList = (listId: string, taskText: string) => {
    const newTask: TaskType = {
      id: Date.now().toString(),
      text: taskText,
      completed: false
    };
    setTaskLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? { ...list, tasks: [...list.tasks, newTask] }
          : list
      )
    );
  };
  // Переключение статуса задачи (выполнена/не выполнена)
  const toggleTask = (listId: string, taskId: string) => {
    setTaskLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? {
            ...list,
            tasks: list.tasks.map(task =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
            )
          }
          : list
      )
    );
  };
  // Удаление задачи из списка
  const deleteTask = (listId: string, taskId: string) => {
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
  };
  // Удаление списка задач
  const deleteTaskList = (id: string) => {
    setTaskLists(prevLists => prevLists.filter(list => list.id !== id));
  };
  return {
    taskLists,
    addTaskList,
    addTaskToList,
    toggleTask,
    deleteTask,
    deleteTaskList
  };
}