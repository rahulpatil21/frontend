import { useState } from "react";
import Autocomplete from "../Autocomplete/AutoComplete";
import "./AddStock.css";
import CurrentPortfolio from "../CurrentPortfolio/InvestmentHistory";
export const EditFire = ({ closeModal, onSubmit, defaultValue ,stockList}) => {
    
  let data={}
  //  {"user": 2,  // Replace with the actual user ID
  //   "equity": 11,  // Replace with the actual equity ID
  //   "investment_date": "2023-05-04",  // Replace with the actual date
  //   "shares": 1000,
  //   "purchase_price": 2960.32
  // }
  const [formState, setFormState] = useState(
    defaultValue || {
        todays_yearly_requirement: defaultValue.todays_yearly_requirement,
        duration: defaultValue.duration,
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.todays_yearly_requirement && formState.duration) {
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
            
            <label className="lg-value lable-title">Yearly Expenses</label>
            <input
              name="todays_yearly_requirement"
              onChange={handleChange}
              type="number"
              min="1"
              value={formState.todays_yearly_requirement}
            />
            <label className="lg-value lable-title">Number Of Years In Which You Want To Retire</label>
            <input
              name="duration"
              onChange={handleChange}
              type="number"
              min="1"
              value={formState.duration}
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
