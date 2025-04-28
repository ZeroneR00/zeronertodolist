"use client"

import { useState } from 'react';
import { TaskListType, TaskType } from '../types/taskTypes';

export function useTasksLists(initialTasks: TaskListType[] = []) {

  const [taskLists, setTaskLists] = useState<TaskListType[]>(initialTasks);
  const [currentListId, setCurrentListId] = useState<string | null>(null);


  //   // Создание новой темы/списка задач
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
    }
    setTaskLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? { ...list, tasks: [...list.tasks, newTask] }
          : list
      )
    )
  }

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


  return {
    taskLists,
    currentListId,
    setCurrentListId,
    addTaskList,
    addTaskToList,
    toggleTask,
    deleteTask,
    deleteTaskList
  };

}
