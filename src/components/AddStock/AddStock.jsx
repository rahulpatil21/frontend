import { useState } from "react";
import Autocomplete from "../AutoComplete";
import "./AddStock.css";
import CurrentPortfolio from "../CurrentPortfolio/CurrentPortfolio";
export const AddStock = ({ closeModal, onSubmit, defaultValue ,stockList}) => {
  let data={}
  //  {"user": 2,  // Replace with the actual user ID
  //   "equity": 11,  // Replace with the actual equity ID
  //   "investment_date": "2023-05-04",  // Replace with the actual date
  //   "shares": 1000,
  //   "purchase_price": 2960.32
  // }
  const [formState, setFormState] = useState(
    defaultValue || {
      equity: 0,
      purchase_price: "",
      shares: "",
      investment_date:"",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.equity && formState.purchase_price&& formState.shares && formState.investment_date) {
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
    <CurrentPortfolio />;
  };

  const handleSelect = (selectedItem) => {
    // Do something with the selected item
    console.log('Selected item:', selectedItem);
    formState["equity"]=selectedItem.id;
    console.log(formState)
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
            <label className="lg-value lable-title">Stock Name</label>
            <Autocomplete suggestions={stockList} onSelect={handleSelect}/>
            <label className="lg-value lable-title">Avg. Price</label>
            <input
              name="purchase_price"
              onChange={handleChange}
              type="number"
              step="any"
              min="0.1"
              value={formState.purchase_price}
            />
            <label className="lg-value lable-title">Qty</label>
            <input
              name="shares"
              onChange={handleChange}
              type="number"
              min="1"
              value={formState.shares}
            />
            <label className="lg-value lable-title">Investment date</label>
            <input
              name="investment_date"
              onChange={handleChange}
              type="date"
              value={formState.investment_date}
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
