import React from "react";
import "./../styles/App.css";

function App() {
  const [list, setList] = React.useState([]);
  const [task, setTask] = React.useState("");
  const [empty, setEmpty] = React.useState(true);

  const addTask = () => {
    const copyList = [...list];
    copyList.push({
      id: Math.floor(Math.random() * 294365),
      name: task,
      isEditable: false
    });
    setList(copyList);
  };

  const removeTask = (id) => {
    const copyList = [...list];
    const newCopyList = copyList.filter((item) => item.id !== id);
    setList(newCopyList);
  };

  const toggleEditOn = (id) => {
    const copyList = [...list];
    const newList = copyList.map((item) => {
      const newItem = { ...item };
      if (item.id === id) {
        newItem.isEditable = true;
      }
      return newItem;
    });
    setList(newList);
  };

  const toggleEditOff = (id) => {
    const copyList = [...list];
    const newList = copyList.map((item) => {
      const newItem = { ...item };
      if (item.id === id) {
        newItem.isEditable = false;
      }
      return newItem;
    });
    setList(newList);
  };

  const editTask = (name, id) => {
    if (name === "") {
      setEmpty(true);
      return;
    }
    const copyList = [...list];
    const newList = copyList.map((item) => {
      const newItem = { ...item };
      if (item.id === id) {
        newItem.name = name;
      }
      return newItem;
    });
    setList(newList);
    setEmpty(false);
  };

  return (
    <div id="main">
      <textarea id="task" onChange={(event) => setTask(event.target.value)} />
      <button id="btn" onClick={addTask}>
        Add task
      </button>
      {list.map((item) => {
        return (
          <div key={item.id}>
            {item.isEditable ? (
              <>
                <textarea
                  className="editTask"
                  onChange={(event) => editTask(event.target.value, item.id)}
                />
                <button
                  className="saveTask"
                  onClick={() => (empty ? null : toggleEditOff(item.id))}
                >
                  Save
                </button>
              </>
            ) : null}

            <span>{item.name}</span>
            <button className="edit" onClick={() => removeTask(item.id)}>
              Delete
            </button>
            <button className="delete" onClick={() => toggleEditOn(item.id)}>
              Edit
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
