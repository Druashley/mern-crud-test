import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [newFoodName, setNewFoodName] = useState("");

  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get("https://mern-crud-test-dru.herokuapp.com/read").then(
      (response) => {
        setFoodList(response.data);
      }
    );
  }, []);

  const addToList = () => {
    Axios.post("https://mern-crud-test-dru.herokuapp.com/insert", {
      foodName: foodName,
      days: days,
    });
  };

  const updateFood = (id) => {
    Axios.put("https://mern-crud-test-dru.herokuapp.com/update", {
      id: id,
      newFoodName: newFoodName,
    });
  };

  const deleteFood = (id) => {
    Axios.delete(`https://mern-crud-test-dru.herokuapp.com/delete/${id}`);
  };

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>
      <label>Food Name:</label>
      <input
        type="text"
        onChange={(e) => {
          setFoodName(e.target.value);
        }}
      ></input>
      <label>Days since you ate it:</label>
      <input
        type="number"
        onChange={(e) => {
          setDays(e.target.value);
        }}
      ></input>
      <button onClick={addToList}>Add to list</button>
      <hr />
      <h1>Food List</h1>
      {foodList.map((food, key) => {
        return (
          <div key={key} className="food">
            <h1>{food.foodName}</h1>
            <h1>{food.daysSinceIAte}</h1>
            <input
              onChange={(e) => {
                setNewFoodName(e.target.value);
              }}
              type="text"
              placeholder="New Food Name..."
            />
            <button onClick={() => updateFood(food._id)}>Update</button>
            <button onClick={() => deleteFood(food._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
