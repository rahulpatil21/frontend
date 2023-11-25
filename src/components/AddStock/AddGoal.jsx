import { useState } from "react";
import AutocompleteGoal from "../Autocomplete/AutocompleteGoal";
import "./AddStock.css";

import CurrentPortfolio from "../CurrentPortfolio/InvestmentHistory";
export const AddGoal = ({ closeModal, onSubmit, defaultValue ,goalList}) => {
  let data={}
  //  {"user": 2,  // Replace with the actual user ID
  //   "equity": 11,  // Replace with the actual equity ID
  //   "investment_date": "2023-05-04",  // Replace with the actual date
  //   "shares": 1000,
  //   "purchase_price": 2960.32
  // }
  const [formState, setFormState] = useState(
     {
        name: null,
        duration_in_months: null,
        monthly_contribution: null,
        goal_amount:null,
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.name 
        && (
            (formState.duration_in_months&& formState.monthly_contribution) 
        || (formState.monthly_contribution&& formState.goal_amount)
        || (formState.duration_in_months && formState.goal_amount)
        )) {
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
    if (!validateForm()) {
        
        return;
    }
    formState.duration_in_months=formState.duration_in_months?parseInt(formState.duration_in_months, 10):null;
    formState.monthly_contribution=formState.monthly_contribution?parseFloat(formState.monthly_contribution):null;
    formState.goal_amount=formState.goal_amount?parseFloat(formState.goal_amount):null;
    onSubmit(formState);

    closeModal();
    <CurrentPortfolio />;
  };

  const handleSelect = (selectedItem) => {
    // Do something with the selected item
    
    formState["equity"]=selectedItem.id;
    
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
            <label className="lg-value lable-title">Goal Name</label>
            <input
              name="name"
              onChange={handleChange}
              type="text"
              value={formState.name}
            />
            <label className="lg-value lable-title">Duration In Months</label>
            <input
              name="duration_in_months"
              onChange={handleChange}
              type="number"
              min="1"
              value={formState.duration_in_months}
            />
            <label className="lg-value lable-title">Goal Amount</label>
            <input
              name="goal_amount"
              onChange={handleChange}
              type="number"
              min="0.1"
              value={formState.goal_amount}
            />
            {/* <label className="lg-value lable-title">Monthly Contribution</label>
            <input
              name="monthly_contribution"
              onChange={handleChange}
              type="number"
              value={formState.monthly_contribution}
            /> */}
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
