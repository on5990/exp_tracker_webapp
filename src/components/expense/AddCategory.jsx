import React, { useContext } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { ExpenseContext } from "../../pages/dashboard";

function AddCategory() {
  const { setData } = useContext(ExpenseContext);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("");
  const ref = useRef(null);
  function detectClickOutside(ref, func) {
    function handleClick(event) {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      func(event);
    }
    useEffect(() => {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("touchstart", handleClick);
      return () => {
        document.removeEventListener("mousedown", handleClick);
        document.removeEventListener("touchstart", handleClick);
      };
    }, [ref, func]);
  }
  function openInput() {
    setShowForm(true);
  }
  function closeInput() {
    setShowForm(false);
    setCategory("");
  }
  function handleSubmit() {
    const sendData = async () => {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: category }),
      });
      if (response.ok) {
        let info = await response.json();
        info = info.data.category;
        setData((prev) => {
          return { ...prev, categories: [...prev.categories, info] };
        });
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    };
    if (category !== "") {
      console.log("PASS", { name: category });
      sendData();
      setShowForm(false);
      setCategory("");
    }
  }
  detectClickOutside(ref, closeInput);
  return (
    <>
      {!showForm && (
        <button type="button" className="newCategory" onClick={openInput}>
          <p>+ Nueva</p>
        </button>
      )}
      {showForm && (
        <div className="categoryForm" ref={ref}>
          <input
            type="text"
            value={category}
            name="category"
            maxLength={20}
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
