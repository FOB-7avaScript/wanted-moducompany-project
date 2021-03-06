import styled from '@emotion/styled';
import DragNDrop from 'Components/DragNDrop';
import { Itodo } from 'hooks/useTodoItems';
import { DragProvider } from 'store/drag';
import TodoItem from './TodoItem';

const TodoItemDiv = styled.div`
  width: 100%;
  padding: 10px;
`;

interface TodoItemProps {
  todoItems: Itodo[];
  handleTodoItems: (newTodoItems: Itodo[]) => void;
  enableDrag: boolean;
  deleteTodo: (id: number) => void;
  editTaskName: (id: number, newTaskName: string) => void;
  editStatus: (id: number) => void;
  editImportance: (id: number) => void;
  editDueDateRange: (id: number, value: Date[] | null) => void;
}

function TodoList({
  todoItems,
  handleTodoItems,
  enableDrag,
  deleteTodo,
  editTaskName,
  editStatus,
  editImportance,
  editDueDateRange
}: TodoItemProps) {
  return (
    <DragProvider>
      <TodoItemDiv>
        {todoItems.map((todo, index, array) =>
          enableDrag ? (
            <DragNDrop
              key={todo.id}
              itemArray={array}
              itemIndex={index}
              updateItemArray={handleTodoItems}
            >
              <TodoItem
                data={todo}
                deleteTodo={deleteTodo}
                editTaskName={editTaskName}
                editStatus={editStatus}
                editImportance={editImportance}
                editDueDateRange={editDueDateRange}
              />
            </DragNDrop>
          ) : (
            <TodoItem
              key={todo.id}
              data={todo}
              deleteTodo={deleteTodo}
              editTaskName={editTaskName}
              editStatus={editStatus}
              editImportance={editImportance}
              editDueDateRange={editDueDateRange}
            />
          )
        )}
      </TodoItemDiv>
    </DragProvider>
  );
}

export default TodoList;
