import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  const updateLocalStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const addTodo = () => {
    if (todo.trim() !== "") {
      const newTask = { id: Date.now(), task: todo, completed: false };
      const updatedTasks = [...tasks, newTask];
      updateLocalStorage(updatedTasks);
      setTodo("");
    }
  };

  const deleteTodo = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    updateLocalStorage(updatedTasks);
  };

  const toggleTodo = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    updateLocalStorage(updatedTasks);
  };

  return (
    <div className="todo-container flex flex-col items-center justify-center w-full h-screen bg-[#0F172A] text-[#B7C1CE]">
      <div className="bg-[#1E293B] w-[90%] md:w-[50%] min-h-[70%] p-5 rounded-lg">
        <div className="mb-5">
          <input
            className="bg-[#293548] w-full outline-none px-3 py-2 border border-gray-600 mb-2 rounded"
            placeholder="isi disini"
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button onClick={addTodo} className="bg-sky-800 text-white w-full py-2 rounded">
            tambahkan task
          </button>
        </div>

        <h2 className="text-xl mb-3">belum dikerjakan</h2>
        <ul>
          <AnimatePresence>
            {tasks.filter(task => !task.completed).map((task) => (
              <motion.li
                key={task.id}
                className="flex justify-between items-center p-2 border-b border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <span
                  style={{ textDecoration: task.completed ? "line-through" : "none", cursor: 'pointer' }}
                  onClick={() => toggleTodo(task.id)}
                >
                  {task.task}
                </span>
                <button onClick={() => toggleTodo(task.id)} className="flex items-center justify-center">
                  <img src="circle.svg" alt="Complete" className="w-5 h-5" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <h2 className="text-xl mt-5 mb-3">sudah dikerjakan</h2>
        <ul>
          <AnimatePresence>
            {tasks.filter(task => task.completed).map((task) => (
              <motion.li
                key={task.id}
                className="flex justify-between items-center p-2 border-b border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <span
                  style={{ textDecoration: task.completed ? "line-through" : "none", cursor: 'pointer' }}
                  onClick={() => toggleTodo(task.id)}
                >
                  {task.task}
                </span>
                <button onClick={() => deleteTodo(task.id)} className="flex items-center justify-center">
                  <img src="check.svg" alt="Incomplete" className="w-5 h-5" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};

export default Todo;
