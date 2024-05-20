import React from 'react';
import '../ViewData/Newpage.css';

const Newpage = ({ gettingapi }) => {
  const book = gettingapi;

  return (
    <div>
      <div className="View">

        {book ? (
          <>
            <div className="view1">
              <div className="view1_1">
                <h1>Id</h1>
                <p>{book.id}</p>
              </div>
              <div className="view1_2">
                <h1>Name</h1>
                <p>{book.name}</p>
              </div>
            </div>
            <div className="view2">
              <div className="view2_1">
                <h1>Category</h1>
                <p>{book.category}</p>
              </div>
              <div className="view2_2">
                <h1>Price</h1>
                <p>${book.price}</p>
              </div>
            </div>
            <div className="view3">
              <h1>Quantity</h1>
              <p>{book.quantity}</p>
            </div>
          </>
        ) : (
          <p>No book data available</p>
        )}
      </div>
    </div>
  );
}

export default Newpage;
