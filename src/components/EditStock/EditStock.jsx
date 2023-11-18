import { useState } from "react";

import "./EditStock.css";
import { Alert } from "@mui/material";

export const EditStock = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      stock: "",
      avg_price: "",
      qty: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.avg_price && formState.qty) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <p className="lg-value">{formState.stock}</p>
            <label className="lg-value lable-title">Avg. Price</label>
            <input
              name="avg_price"
              onChange={handleChange}
              type="number"
              step="any"
              min="0.1"
              value={formState.avg_price}
            />
            <label className="lg-value lable-title">Qty</label>
            <input
              name="qty"
              onChange={handleChange}
              type="number"
              min="1"
              value={formState.qty}
            />
          </div>

          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <div className="button-holder">
            <button
              className="button-1"
              role="button"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};