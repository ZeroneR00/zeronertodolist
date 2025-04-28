import { useState } from 'react';
import { TaskType } from '../types/taskTypes';

export function useTasks(initialTasks: TaskType[] = []) {

  // Состояние для хранения списка задач
  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);

  // Состояние для хранения текста из поля ввода
  const [inputText, setInputText] = useState('');

   // Добавление новой задачи
   const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      const newTask: TaskType = {
        id: Date.now().toString(),
        text: inputText.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputText(''); // Очищаем поле ввода
    }
  };


// Переключение статуса задачи (выполнена/не выполнена)
  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Удаление задачи
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return {
    tasks,           // Текущий список задач
    inputText,       // Текст из поля ввода
    setInputText,    // Функция для обновления текста в поле ввода
    addTask,         // Функция добавления задачи
    toggleTask,      // Функция переключения статуса задачи
    deleteTask       // Функция удаления задачи
  };
}