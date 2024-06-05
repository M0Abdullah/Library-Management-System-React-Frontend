import React, { useState, useCallback } from 'react';
import '../Guest/Guestppage.css';
import Newpage from '../Admin/ViewData/Newpage.jsx';
import Borrow from '../Admin/BorrowData/Borrow.jsx';
import Detailpage from '../Admin/Detailpage/Detailpage.jsx';
import GuestpageAPI from '../../Usecases/Apidata/GuestpageAPI.jsx';
import { Button, Flex } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { Select, Space } from 'antd';
const Guestppage = ({ adminview, borrowdata }) => {
  const [option, setOption] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [detailedBook, setDetailedBook] = useState(null);

  const handlefunction = GuestpageAPI({
    option,
    setBooks,
    setIsLoading,
    setApiMessage,
  });

  const handleBorrow = useCallback((book) => {
    const updatedBook = { ...book, quantity: book.quantity - 1 };
    setBooks(prevBooks => prevBooks.map(prevBook =>
      prevBook.id === updatedBook.id ? updatedBook : prevBook
    ));
    setSelectedBook(updatedBook);
  }, []);

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
                  <Button type='primary' onClick={() => adminview(book)}>View</Button>
                  <Button type='primary' onClick={() => borrowdata(book)}>Borrow</Button>
                  <Button type='primary' onClick={() => handleSeeDetails(book)}>See Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedBook && <Newpage gettingapi={selectedBook} />}
      {selectedBook && <Borrow borrowbook={selectedBook} handleSeeDetails={() => handleSeeDetails(selectedBook)} />}
      {detailedBook && (
        <Detailpage description={detailedBook.description} />
      )}
    </div>
  );
};

export default Guestppage;
