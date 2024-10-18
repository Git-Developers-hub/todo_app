const todoKey = "reactTodo";

// todo add data to localStorage
const settLocalStorageTodoData = (task) => {
  return localStorage.setItem(todoKey, JSON.stringify(task));
};

const getLocalStorageTodoData = () => {
  const rawTodos = localStorage.getItem(todoKey);
  if (!rawTodos) return [];
  return JSON.parse(rawTodos);
};

export { getLocalStorageTodoData, settLocalStorageTodoData };
