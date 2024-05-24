import React, { useState, useEffect, useCallback } from 'react';
import '../Guest/Guestppage.css';
import Borrow from './BorrowData/Borrow.jsx';
import Newpage from './ViewData/Newpage.jsx';
import Edit from './EditData/Edit.jsx';
import Detailpage from './Detailpage/Detailpage.jsx';
import AdminAPI from '../../Usecases/Apidata/AdminAPI.jsx';
import { Button, Flex } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { Select, Space } from 'antd';

const Guestppage = ({ adminview, borrowdata, editdata }) => {
  const [option, setOption] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  const [showAdminMessage, setShowAdminMessage] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [detailedBook, setDetailedBook] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAdminMessage(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const { handlefunction } = AdminAPI({ option, setBooks, setIsLoading, setApiMessage });

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
        <Space wrap>
            <Select
              defaultValue=""
              style={{ width: 150 }}
              onChange={(value) => setOption(value)}
            >
              <option value="">Select a category</option>
              <option value="Dystopian">Dystopian</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Romance">Romance</option>
              <option value="Classic">Classic</option>
            </Select>
          </Space>
          </div>
        <div className="object4_3">
        <Button
          
            icon={<PoweroffOutlined />}
            loading={isLoading}
            onClick={handlefunction}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
        </div>
      </div>

      {showAdminMessage && (
        <div className="adminportal">
          <h1>Welcome, as an Admin</h1>
        </div>
      )}

      <div id="id">
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
                  <Button type='primary' style={{backgroundColor:"black"}} onClick={()=>adminview(book)} >View</Button>
                  <Button type='primary'style={{backgroundColor:"black"}} onClick={() => borrowdata(book)}>Borrow</Button>
                  <Button type='primary' style={{backgroundColor:"black"}} onClick={() => editdata(book)}>Edit</Button>
                  <Button  type='primary'style={{backgroundColor:"black"}} onClick={() => handleSeeDetails(book)}>See Details</Button>
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
