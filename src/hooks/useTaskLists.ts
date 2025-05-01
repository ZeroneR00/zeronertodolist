"use client"

import { useState } from 'react';
import { TaskListType, TaskType } from '../types/taskTypes';
import { v4 as uuidv4 } from 'uuid';


export function useTasksLists(initialTasks: TaskListType[] = []) {

  const [taskLists, setTaskLists] = useState<TaskListType[]>(initialTasks);
  const [currentListId, setCurrentListId] = useState<string | null>(null);


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

  const filter = ( id: string, currentStatus: boolean ) => {
    
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
    updateName
  };

}
