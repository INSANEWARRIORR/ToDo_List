"use client"; // for telling we are on client site
import React, { useState } from "react";

const page = () => {
  const [task, settask] = useState(""); // for creating variable in react
  const [desc, setdesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const submitHandler = (e) => {
    e.preventDefault(); //Prevent from reloading page after submit
    // for storing data
    setMainTask([...mainTask, { task, desc }]);
    settask(""); // for making empty after submit
    setdesc(""); // for making empty after submit
    console.log(mainTask);
  };

  //for deleting the task
  const deleteHandler = (i) => {
    let copytask = [...mainTask];
    copytask.splice(i, 1); // which task you want to delete that task will be deleted
    setMainTask(copytask);
  };

  //for completion of task
  const completeHandler = (i) => {
    const updatedTasks = [...mainTask];
    updatedTasks[i].completed = true;
    setMainTask(updatedTasks);
  };

  //if there is no task then it will render
  let renderTask = <h2>No Task Available</h2>;

  // if there is no task
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        //key give an unique identity to an element for react to differentiate i=identity
        <li key={i} className="flex items-center justify-between mb-8 ">
          <div className="flex items-center justify-between w-2/3">
            {/* t.completed ? 'line-through' : 'none': This is a ternary operator, 
            which is a shorthand for an if-else statement. It checks if the 
            completed property of the task (t.completed) is true or false. If 
            it's true, it sets the text decoration to 'line-through', 
            indicating that the task is completed.  */}
            <h5 style={{ textDecoration: t.completed ? 'line-through' : 'none' }} className="text-xl font-semibold">{t.task}</h5>
            <h6 style={{ textDecoration: t.completed ? 'line-through' : 'none' }} className="text-xl font-semibold">{t.desc}</h6>
          </div>
          <button
            onClick={() => {
              completeHandler(i);
            }}
            className="bg-green-400 text-white px-4 py-2 font-bold rounded"
          >
            Complete
          </button>
          <button
            onClick={() => {
              deleteHandler(i);
            }}
            className="bg-yellow-400 text-white px-4 py-2 font-bold rounded"
          >
            Delete
          </button>
        </li>
      );
    });
  }
  return (
    <>
      <h1 className="bg-sky-400 text-pink-400 p-5 text-5xl font-bold text-center">
        WaRRioR Todo List
      </h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-zinc-800 border-4 m-8 px-4 py-2"
          placeholder="Enter Task Here"
          value={task} // For two way binding
          onChange={(e) => {
            settask(e.target.value);
          }}
        />
        <input
          type="text"
          className="text-2xl border-zinc-800 border-4 m-8 px-4 py-2"
          placeholder="Enter Description Here"
          value={desc} // For two way binding
          onChange={(e) => {
            setdesc(e.target.value);
          }}
        />
        <button className="bg-black text-white m-5 px-4 py-2 text-2xl font-bold rounded">
          Add Task
        </button>
      </form>

      {/* horizontal row     */}
      <hr />
      <div className="p-8 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default page;
