import React, { useState, useEffect } from "react";
import './Edit.add1.css';
import { InputNumber, Button, Input } from 'antd';

const Edit = ({ book, updateBook, closeEdit }) => {
  const [editedBook, setEditedBook] = useState({});

  useEffect(() => {
    setEditedBook(book || {});
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNumberChange = (name, value) => {
    setEditedBook(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting book data:', editedBook);

    try {
      const response = await fetch('https://08d48594-1db2-46f0-bd1a-0bd0485eae7f.mock.pstmn.io', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedBook)
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Response error details:', errorDetails);
        throw new Error('Failed to update book');
      }

      const updatedBook = await response.json();
      updateBook(updatedBook);
      closeEdit();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit} className="form1">
        <div className="flex">
          <div className="label1">
            <label>ID</label>
          </div>
          <InputNumber
            style={{ width: 200 }}
            value={editedBook.id}
            min={0}
            max={1000}
            onChange={(value) => handleNumberChange('id', value)}
            stringMode
          />
          <div className="label1">
            <label>Name</label>
          </div>
          <Input
            style={{ width: 200 }}
            name="name"
            value={editedBook.name || ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex1">
          <div className="label2">
            <label>Category</label>
          </div>
          <Input
            style={{ width: 200 }}
            name="category"
            value={editedBook.category || ''}
            onChange={handleChange}
          />
          <div className="label2">
            <label>Price</label>
          </div>
          <InputNumber
            style={{ width: 200 }}
            value={editedBook.price}
            min={0}
            max={1000}
            onChange={(value) => handleNumberChange('price', value)}
            stringMode
          />
        </div>
        <div className="flex3">
          <div className="label3">
            <label>Quantity</label>
          </div>
          <InputNumber
            style={{ width: 200 }}
            value={editedBook.quantity}
            min={0}
            max={1000}
            onChange={(value) => handleNumberChange('quantity', value)}
            stringMode
          />
        </div>
        <div className="flex2">
          <Button type="primary" style={{backgroundColor:"black"}} htmlType="submit" className="savebtn">Save</Button>
          <Button type="primary" style={{backgroundColor:"black"}} className="cancelbtn" onClick={closeEdit}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
