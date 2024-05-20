import React from 'react';
import '../BorrowData/Borrow.css';

const BorrowPage = ({ borrowbook, handleSeeDetails }) => {
  return (
    <div>
      <div className="borrow">
        {borrowbook ? (
          <div>
            <h3>Borrowing Details</h3>
            <p>ID: {borrowbook.id}</p>
            <p>Name: {borrowbook.name}</p>
            <p>Category: {borrowbook.category}</p>
            <p>Price: ${borrowbook.price}</p>
            <p>Quantity: {borrowbook.quantity}</p>
          </div>
        ) : (
          <p>Please select a book to borrow.</p>
        )}
      </div>
      {borrowbook && <p className="borrow-message">You have successfully borrowed {borrowbook.name}!</p>}

    </div>
  );
}

export default BorrowPage;
