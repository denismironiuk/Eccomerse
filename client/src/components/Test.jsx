import React, { useState } from 'react';

const Test = () => {
  const allCategories = [
    { id: 1, name: 'Category X' },
    { id: 2, name: 'Category Y' },
    { id: 3, name: 'Category Z' }
    // ... add more categories as needed
  ];

  const [productName, setProductName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryAdd = () => {
    if (selectedCategory && !selectedCategories.includes(selectedCategory)) {
      setSelectedCategories([...selectedCategories, selectedCategory]);
      setSelectedCategory('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data, including productName and selectedCategories
    console.log('Product Name:', productName);
    console.log('Selected Categories:', selectedCategories);
    // You can send this data to an API or perform any other action
  };

  return (
    <div>
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Select Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
          >
            <option value="">Select a Category</option>
            {allCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleCategoryAdd}>Add Category</button>
        </div>
        <div>
          <p>Selected Categories:</p>
          <ul>
            {selectedCategories.map(categoryId => (
              <li key={categoryId}>
                {allCategories.find(category => category.id === categoryId)?.name}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Test;
