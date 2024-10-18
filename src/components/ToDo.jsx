import { useState } from "react";
import "./ToDoList.css";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";
import TodoDate from "./TodoDate";
import {
  settLocalStorageTodoData,
  getLocalStorageTodoData,
} from "./TodoLocalStorage";

const ToDo = () => {
  const [task, setTask] = useState(() => getLocalStorageTodoData());

  const handleFormSubmit = (inputValue) => {
    const { id, content, checked } = inputValue;
    // to check if the input field is empty or not
    if (!content) return;
    // to check if the data is already existing or not
    // if (task.includes(inputValue)) return;
    const ifTodoContentMatched = task.find(
      (curTask) => curTask.content === content
    );
    if (ifTodoContentMatched) return;
    setTask((prevTask) => [...prevTask, { id, content, checked }]);
  };

  // todo add data to localStorage
  settLocalStorageTodoData(task);

  // todo handleDeleteTodo function
  const handleDeleteTodo = (value) => {
    const updatedTask = task.filter((curTask) => curTask.content !== value);
    setTask(updatedTask);
  };

  // todo handleCheckedTodo function
  const handleCheckedTodo = (content) => {
    const updatedTask = task.map((curTask) => {
      if (curTask.content === content) {
        return { ...curTask, checked: !curTask.checked };
      } else {
        return curTask;
      }
    });
    setTask(updatedTask);
  };

  return (
    <>
      <section className="todo-container">
        <header>
          <h1>Todo List</h1>
          <TodoDate />
        </header>
        <ToDoForm onAddTodo={handleFormSubmit} />
        <section className="myUnordList">
          <ul>
            {task.map((curTask) => {
              return (
                <ToDoList
                  key={curTask.id}
                  data={curTask.content}
                  checked={curTask.checked}
                  onHandleDeleteTodo={handleDeleteTodo}
                  onHandleCheckedTodo={handleCheckedTodo}
                />
              );
            })}
          </ul>
        </section>
        <section>
          <button className="clear-btn" onClick={() => setTask([])}>
            Clear All
          </button>
        </section>
      </section>
    </>
  );
};

export default ToDo;
