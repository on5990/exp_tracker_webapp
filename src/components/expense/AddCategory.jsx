import React from "react";
import { useState } from "react";

function AddCategory() {
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("");
  function handleClick() {
    setShowForm(true);
  }
  function handleSubmit() {
    if (category !== "") {
      setShowForm(false);
      setCategory("");
    }
  }
  return (
    <>
      {!showForm && (
        <button type="button" className="newCategory" onClick={handleClick}>
          <p>+ Nueva</p>
        </button>
      )}
      {showForm && (
        <div className="categoryForm">
          <input
            type="text"
            value={category}
            name="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <button onClick={handleSubmit}>
            <p>Ok</p>
          </button>
        </div>
      )}
    </>
  );
}

export default AddCategory;
