import { useEffect, useState } from 'react';
import getDataFromLocalStorage from 'Utils/GetDataFromLocalStorage';
import saveDataToLocalStorage from 'Utils/SaveDataToLocalStorage';
import dateFormat from 'Utils/Date';
import {
  DUE_DATE_RANGE,
  IMPORTANCE,
  STATUS,
  STATUS_TYPE,
  TASK_NAME,
  TODOS,
  IMPORTANCE_TYPE_NUMBER
} from 'Constants';

export type Itodo = {
  id: number;
  taskName: string;
  isComplete: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  dueDateRange: Date[];
  importance: string;
};

let initialTodos: Itodo[] = [];

const useTodoItems = () => {
  const [todoItems, setTodoItems] = useState(initialTodos);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveDataToLocalStorage(TODOS, todoItems);
  }, [todoItems]);

  const loadData = () => {
    const data = getDataFromLocalStorage(TODOS);
    initialTodos = data === null ? [] : data;
    setTodoItems(initialTodos);
  };

  const handleTodoItems = (newTodoItems: Itodo[]) => {
    setTodoItems(newTodoItems);
  };

  const todoItemsStateEdit = (
    id: number,
    element: string,
    content: string | number | string[]
  ) => {
    const editedData = todoItems.map((item) =>
      item.id === id ? { ...item, [element]: content } : item
    );
    setTodoItems(editedData);
  };

  const deleteTodo = (id: number) => {
    const leftData = todoItems.filter((item) => item.id !== id);
    setTodoItems(leftData);
  };

  const addTodo = ({ todo }: { todo: Itodo }) => {
    setTodoItems((prev) => [todo, ...prev]);
  };

  const editTaskName = (id: number, newTaskName: string) => {
    if (newTaskName.length > 0) todoItemsStateEdit(id, TASK_NAME, newTaskName);
  };

  const editStatus = (id: number) => {
    const currentTodo = todoItems.find(
      (item: Itodo) => item.id === id
    ) as Itodo;
    const currentStatus: string = currentTodo.status;
    const status: { [key: string]: string } = {
      [FINISHED]: NOT_START,
      [NOT_START]: ON_GOING,
      [ON_GOING]: FINISHED
    };
    const updateStatus = status[currentStatus] || '';
    todoItemsStateEdit(id, STATUS, updateStatus);
  };

  const editImportance = (id: number) => {
    const currentTodo = todoItems.find(
      (item: Itodo) => item.id === id
    ) as Itodo;
    const currentImportance: string = currentTodo.importance;
    const importance: { [key: string]: string } = {
      [HIGH]: MEDIUM,
      [MEDIUM]: LOW,
      [LOW]: HIGH
    };
    const updateImportance = importance[currentImportance] || '';
    todoItemsStateEdit(id, IMPORTANCE, updateImportance);
  };

  const editDueDateRange = (id: number, value: Date[] | null) => {
    if (value !== null) {
      const [startDate, endDate] = value;

      const parsedDueDateRange = [
        dateFormat({ targetDate: new Date(startDate) }),
        dateFormat({ targetDate: new Date(endDate) })
      ];
      todoItemsStateEdit(id, DUE_DATE_RANGE, parsedDueDateRange);
    }
  };

  return {
    todoItems,
    setTodoItems,
    addTodo,
    deleteTodo,
    editTaskName,
    editStatus,
    editImportance,
    editDueDateRange,
    handleTodoItems
  };
};

export default useTodoItems;
const { NOT_START, ON_GOING, FINISHED } = STATUS_TYPE;
const { HIGH, MEDIUM, LOW } = IMPORTANCE_TYPE_NUMBER;
