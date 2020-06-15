import React, { useState, useEffect } from "react";
import "./App.scss";

function App() {
  const [allItems, setAllItems] = useState([
    { name: "Iron Man", completed: false },
    { name: "Super Man", completed: true },
    { name: "Spider Man", completed: false },
    { name: "Hulk", completed: false }
  ]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(allItems);
  }, []);

  const updateItem = (index, newItem) => {
    if (newItem && !newItem.name) return;
    let newItems = JSON.parse(JSON.stringify(items));
    if (index != undefined) newItems[index] = newItem;
    else {
      newItems.push(newItem);
    }
    setItems(newItems.filter((a) => a));
    setAllItems(items);
  };

  const updateItems = (searchQuery) => {
    if (!searchQuery) return setItems(allItems);
    const reg = new RegExp(searchQuery, "gi");
    setItems(items.filter((i) => i.name.match(reg)));
  };

  const edit = (i, item) => {
    item.isBlur = true;
  };

  return (
    <div>
      <div className="wrapper">
        <input
          placeholder="Search Items"
          className="search"
          onChange={(e) => updateItems(e.target.value)}
        />
        {items.map((item, i) => (
          <div key={i} className="item">
            <div>
              <input
                type="checkbox"
                id={`item-${i}`}
                checked={item.completed}
                onChange={(e) =>
                  updateItem(i, { ...item, completed: !item.completed })
                }
              />
              {item.isBlur && (
                <input
                  autofocus
                  onBlur={(e) => updateItem(i, { ...item, isBlur: false })}
                  value={item.name}
                  onChange={(e) =>
                    updateItem(i, { ...item, name: e.target.value })
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    updateItem(i, { ...item, name: e.target.value })
                  }
                />
              )}
              {!item.isBlur && (
                <label
                  onDoubleClick={(e) =>
                    updateItem(i, { ...item, isBlur: true })
                  }
                  htmlFor={`item-${i}`}
                >
                  {item.name}
                </label>
              )}
            </div>
            <button onClick={() => updateItem(i)}>-</button>
          </div>
        ))}
        <input
          className="search"
          placeholder="Add new Item"
          onBlur={(e) => updateItem(undefined, { name: e.target.value })}
          onKeyDown={(e) =>
            e.key === "Enter" && updateItem(undefined, { name: e.target.value })
          }
        />
      </div>
      <span className="note">Note: Double click any item to edit</span>
    </div>
  );
}

export default App;
