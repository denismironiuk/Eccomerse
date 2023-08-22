import React, { useState } from "react";
import "./CustomSelect.css";

const CustomSelect = ({setSort,sort}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { key: "desc", value:"Price (Highest first)"   },
    { key: "asc", value: "Price (Lowest first)"},
  ];

  const [selectedOption, setSelectedOption] = useState(options[1]);
console.log(selectedOption)
  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

const handleOptionSelect = (option) => {
 
  setSelectedOption(option);
  setIsOpen(false);
  setSort(option.key)
  console.log(option.key)
};

  return (
    <div className={`custom-select ${isOpen ? "active" : ""}`}>
      <span className="selected-option" onClick={toggleOptions}>
        {selectedOption.value}
      </span>
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li
              className="option"
              key={option.key}
              onClick={() => handleOptionSelect(option)}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
