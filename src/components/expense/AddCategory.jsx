import React, { useContext } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { REQUEST_BUDGET, REQUEST_TRUE } from "../../global/constants";
import categoryRequest from "../../lib/frontendHelpers/requests/category.request";
import { ExpenseContext } from "../../pages/dashboard";

function AddCategory() {
  const { setData, data } = useContext(ExpenseContext);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);
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
      const content = await categoryRequest.create(category);
      setData((prev) => {
        return { ...prev, categories: [...prev.categories, content] };
      });
    };
    let pass = true;
    const same = data.categories?.filter(
      (cat) => cat.name.toLowerCase() == category.toLowerCase()
    );
    if (same.length > 0) {
      pass = false;
      setCategory("");
      setError("Esta categoría ya existe");
    } else if (category == "") {
      pass = false;
      setError("Debe ingresar algo");
    }
    if (pass) {
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
            placeholder={error}
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
