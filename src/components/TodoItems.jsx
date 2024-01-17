import React from "react";

const TodoItem = ({
  deleteItem,
  editTodo,
  edit,
  title,
  id,
  value,
  setValue,
  saveEditTodo,
}) => {
  const editTodoTitle = () => {
    editTodo(id, title);
  };
  return (
    <div>
      <li>
        <label>
          <input className="lies" type="checkbox"/>
          {edit == id ? (
            <div>
              <input className="input-save"
                type="text"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
            </div>
          ) : (
            <span>{title}</span>
          )}
          {edit == id ? (
            <div>
              <button className="btn-save" onClick={() => saveEditTodo(id)}>save</button>
            </div>
          ) : (
            <div>
              <button className="btn-del" onClick={() => deleteItem(id)}><span>delete</span></button>
              <button className="btn-edt" onClick={editTodoTitle}>edit</button>
            </div>
          )}
        </label>
      </li>
    </div>
  );
};

export default TodoItem;
