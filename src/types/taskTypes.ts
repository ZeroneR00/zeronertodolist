export type TaskListType = {
  id: string;
  name: string;
  tasks: TaskType[];
};

export type TaskType = {
  id: string;
  text: string;
  completed: boolean;
};

export type FilterType = 'all' | 'active' | 'completed';


//   export interface TodoItem {
//     id: number;
//     text: string;
//     completed: boolean;
// }
export interface TodoListProps {
  tasks: TaskType[];
  listId: string;
  onAddTask: (text: string) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}