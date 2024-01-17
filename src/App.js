import React, { useEffect, useState } from "react";
import "./index.css";
import TodoList from "./components/TodoList";


import icon from "./images/icon.png"
const App = () => {
  /*Создал состояние, которое является массивом задач*/
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Your first case in list",
    },
  ]);
  /*Состояние для хранения новой задачи*/
  const [todoTitle, setTodoTitle] = useState("");
  /*Состояние для хранения id редактируемого объекта*/
  const [edit, setEdit] = useState(null);
  /*Состояние для хранения значения редактируемой задачи*/
  const [value, setValue] = useState("");

  // ! ============================   CREATE ========================================

  // todo Create START =================================================

  // ? Функция вызываемая при отправки формы - добавления новой задачи

  const addTodo = (e) => {
    e.preventDefault(); /*предотварщает перезагрузку страницы*/

    // ? Добавляет новую задачу в массив "todos"
    setTodos([
      ...todos /*оператор расширения,, чтобы сохранить предыдущие задачи*/,
      // ? Создается новый объект задачи с заголовком и уникальным id
      {
        title: todoTitle /*Новый заголовок*/,
        id: Date.now() /*Уникальный id*/,
      },
    ]);

    // ? Сбрасываем состояние в пустую строку после доббавления задачи
    setTodoTitle("");
  };
  // ? Эффект вызываемый, после первого рендера компонента
  useEffect(() => {
    /*Получаем данные localStrg по ключу "todos" */
    const data = JSON.parse(localStorage.getItem("todos"));
    /*Преобразует данные из формата JSON и устанавливает их в состояние "todos". Позволяет сохранить данные между перезагрузками*/
    setTodos(data);
  }, []);

  useEffect(() => {
    /*Сохраняет массив "todos" в lclStrg после каждого изменения.*/
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //todo  Create FINISH =================================================

  // ! ============================= DELETE ======================================

  // todo DELETE START ===============================================================

  // ? Функция вызываемая при удалении, по id

  const deleteItem = (id) => {
    /*Создаем новый массив, который  отфильтровывает и исключает задачу с совпадением по id*/
    const updateTodos = todos.filter((elem) => elem.id !== id);
    /*Перезаписываем "todos" в новый массив после удаления задачи*/
    setTodos(updateTodos);
  };

  // TODO DELETE FINISH ================================================================

  // ! ============================== EDIT ==========================================

  // todo EDIT START ==============================================

  // ? Функция начал редактирования задачи по ее id

  const editTodo = (id, value) => {
    setEdit(id); /*Состояние edit по id в задачи*/
    setValue(value); /*Состояние value в текущее занчение в задачи*/
  };
  // ? Функция сохранения отредактированной задачи

  const saveEditTodo = (id) => {
    /*Создаем новый массив newTodo в котором обновляется значение title у задачи с заданым id*/
    const newTodo = todos.map((elem) => {
      if (elem.id === id) {
        elem.title = value;
      }
      return elem;
    });
    setTodos(newTodo); /*Установили состояние "todos" в новый массив*/
    setEdit(null); /*Сбросили состояние "edit" чтобы завершить редактирование*/
  };

  // todo EDIT FINISH ==============================================

  return (
    <div>
      <div className="container">
      <div className="todo-app">
        <h1>TO DO LIST <img src={icon} /></h1>
        
        <div className="row">
          <form onSubmit={addTodo}>
            <input id="input-box"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              type="text"
              placeholder="Add Your Text"
            />
          </form>
        </div>
      <TodoList
        saveEditTodo={saveEditTodo}
        setValue={setValue}
        edit={edit}
        editTodo={editTodo}
        value={value}
        deleteItem={deleteItem}
        todos={todos}
      />
      </div>
      </div>
    </div>
  );
};

export default App;
