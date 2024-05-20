import React, { useState, useEffect, useCallback } from 'react';
import '../Guest/Guestppage.css';
import Borrow from './BorrowData/Borrow.jsx';
import Newpage from './ViewData/Newpage.jsx';
import Edit from './EditData/Edit.jsx';
import Detailpage from './Detailpage/Detailpage.jsx';

const Guestppage = ({ adminview, borrowdata, editdata }) => {
  const [option, setOption] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  const [showAdminMessage, setShowAdminMessage] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [detailedBook, setDetailedBook] = useState(null); // State to hold detailed book information

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAdminMessage(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handlefunction = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://4a3b785c-cdc8-4903-9957-641bddba9dbe.mock.pstmn.io', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: option }),
      });

      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      const data = await response.json();
      const filteredBooks = data.books.filter(book => book.category === option);
      setBooks(filteredBooks);
      setIsLoading(false);
      setApiMessage('Data fetched successfully!');
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
      setApiMessage('Error fetching data. Please try again.');
    }
  }, [option]);

  const handleBorrow = useCallback((book) => {
    const updatedBook = { ...book, quantity: book.quantity - 1 };
    setBooks(prevBooks => prevBooks.map(prevBook =>
      prevBook.id === updatedBook.id ? updatedBook : prevBook
    ));
    setSelectedBook(updatedBook);
  }, []);

  const handleBookClick = useCallback((book) => {
    setEditingBook(book);
    setSelectedBook(null);
  }, []);

  const updateBook = useCallback((updatedBook) => {
    const updatedBooks = books.map(book =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedBooks);
    editdata(updatedBook);
    setEditingBook(null);
  }, [books, editdata]);

  const handleSeeDetails = useCallback((book) => {
    setDetailedBook(book);
  }, []);

  return (
    <div>
      <div className="object4">
        <div className="object4_1">
          <h3>Select Category of Books</h3>
        </div>
        <div className="object4_2">
          <select onChange={(e) => setOption(e.target.value)}>
            <option value="">Select a category</option>
            <option value="Dystopian">Dystopian</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Romance">Romance</option>
            <option value="Classic">Classic</option>
          </select>
        </div>
        <div className="object_3">
          <button onClick={handlefunction}>Submit</button>
        </div>
      </div>

      {showAdminMessage && (
        <div className="adminportal">
          <h1>1:Welcome, as an Admin</h1>
        </div>
      )}

      <div id="id">
        {isLoading && <p>Loading...</p>}
        {apiMessage && <p>{apiMessage}</p>}
      </div>

      {books.length > 0 && (
        <table className="book-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.category}</td>
                <td>${book.price}</td>
                <td>{book.quantity}</td>
                <td>
                  <button onClick={() => adminview(book)}>View</button>
                  <button onClick={() => borrowdata(book)}>Borrow</button>
                  <button onClick={() => editdata(book)}>Edit</button>
                  <button onClick={() => handleSeeDetails(book)}>See Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedBook && <Newpage gettingapi={selectedBook} />}
      {selectedBook && <Borrow borrowbook={selectedBook} handleSeeDetails={() => handleSeeDetails(selectedBook)} />}
      {editingBook && (
        <Edit
          book={editingBook}
          updateBook={updateBook}
          closeEdit={() => setEditingBook(null)}
        />
      )}
      {detailedBook && (
        <Detailpage description={detailedBook.description} />
      )}
    </div>
  );
};

export default Guestppage;