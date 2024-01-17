import React from "react";
import TodoItems from "./TodoItems";


const TodoList = ({ todos, deleteItem, editTodo, edit, value, setValue, saveEditTodo }) => {
  console.log(todos);
  return (
    <div>
      <ul className="list-container">
        {todos.map((elem) => (
          <TodoItems
          saveEditTodo={saveEditTodo}
          setValue={setValue}
          editTodo={editTodo}
          edit={edit}
          value={value}
            deleteItem={deleteItem}
            key={elem.id}
            {...elem}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
