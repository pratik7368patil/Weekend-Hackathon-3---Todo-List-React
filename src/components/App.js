import React from "react";
import "./../styles/App.css";

export default function App() {
  const [list, setList] = React.useState([]);
  const [task, setTask] = React.useState("");

  const addTask = () => {
    if (task === "") {
      return;
    }
    const copyList = [...list];
    copyList.push({
      id: Math.floor(Math.random() * 294365),
      name: task
    });
    setList(copyList);
    setTask("");
  };

  const removeTask = (id) => {
    const copyList = [...list];
    const newCopyList = copyList.filter((item) => item.id !== id);
    setList(newCopyList);
  };

  const editTask = (name, id) => {
    const copyList = [...list];
    const newList = copyList.map((item) => {
      const newItem = { ...item };
      if (item.id === id) {
        newItem.name = name;
      }
      return newItem;
    });
    setList(newList);
  };

  return (
    <div id="main">
      <textarea
        id="task"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />
      <button id="btn" onClick={addTask}>
        Add task
      </button>
      {list.map((item) => {
        return (
          <ListItem
            key={item.id}
            item={item}
            removeTask={removeTask}
            editTask={editTask}
          />
        );
      })}
    </div>
  );
}

function ListItem(props) {
  const { removeTask, item, editTask } = props;
  const [newName, setNewName] = React.useState(item.name);
  const [isEditable, setIsEditable] = React.useState(false);

  const toggleEdit = () => {
    setIsEditable(true);
  };

  const changeName = (id) => {
    if (newName.trim() === "") {
      return;
    }
    editTask(newName, id);
    setIsEditable(false);
  };

  return (
    <div key={item.id}>
      {isEditable ? (
        <>
          <textarea
            className="editTask"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
          <button className="saveTask" onClick={() => changeName(item.id)}>
            Save
          </button>
        </>
      ) : (
        <>
          <span className="list">{item.name}</span>
          <button className="delete" onClick={() => removeTask(item.id)}>
            Delete
          </button>
          <button className="edit" onClick={() => toggleEdit()}>
            Edit
          </button>
        </>
      )}
    </div>
  );
}
