import React, { useState, useEffect } from 'react';
import './App.css';
import Login from '../Usecases/Login.jsx';
import GuestPage from '../UserInterface/Guest/Guestppage.jsx';
import AdminPage from '../UserInterface/Admin/Admin.jsx';
import NewPage from '../UserInterface/Admin/ViewData/Newpage.jsx';
import BorrowPage from '../UserInterface/Admin/BorrowData/Borrow.jsx';
import EditPage from '../UserInterface/Admin/EditData/Edit.jsx';
import Detailpage from '../UserInterface/Admin/Detailpage/Detailpage.jsx';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';
// import { Button, Flex } from 'antd';

// import type { ConfigProviderProps } from 'antd';

const Main = () => {
    const [currentPage, setCurrentPage] = useState('');
    const [previousPage, setPreviousPage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        if (loggedInStatus === 'true') {
            setIsLoggedIn(true);
        }

        const handlePopState = () => {
            const path = window.location.pathname.slice(1); // Remove leading '/'
            setCurrentPage(path);
        };

        window.addEventListener('popstate', handlePopState);

        // Initialize current page based on URL
        setCurrentPage(window.location.pathname.slice(1));

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const navigate = (path) => {
        setPreviousPage(currentPage);
        setCurrentPage(path);
        window.history.pushState({}, '', `/${path}`);
    };

    const handlePage = () => {
        navigate('login');
    };

    const handleGuestPage = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('GuestPage');
    };

    const handleAdminPage = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('AdminPage');
    };

    const handleView = (book) => {
        if (isLoggedIn) {
            setSelectedBook(book);
            navigate('NewPage');
        } else {
            setErrorMessage('Invalid Login, Please Login First');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    };

    const handleBorrow = () => {
        if (isLoggedIn) {
            navigate('BorrowPage');
        } else {
            setErrorMessage('Invalid Login, Please Login First');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    };

    const handleEdit = (book) => {
        if (isLoggedIn) {
            setSelectedBook(book);
            navigate('EditPage');
        } else {
            setErrorMessage('Invalid Login, Please Login First');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    };

    const handleBack = () => {
        setCurrentPage(previousPage);
        window.history.back();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
        navigate('login');
    };

    const handleDetailspage = () => {
        if (isLoggedIn) {
            navigate('Detailpage');
        } else {
            setErrorMessage('Invalid Login, Please Login First');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    };

    const renderPage = () => {
        if (!isLoggedIn && ['GuestPage', 'AdminPage', 'NewPage', 'BorrowPage', 'EditPage', 'Detailpage'].includes(currentPage)) {
            setErrorMessage('Invalid Login, Please Login First');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
            return null;
        }

        switch (currentPage) {
            case 'login':
                return <Login loginsuccess={handleGuestPage} loginsuccess2={handleAdminPage} />;
            case 'GuestPage':
                return <GuestPage adminview={handleView} borrowdata={handleBorrow} />;
            case 'AdminPage':
                return <AdminPage adminview={handleView} borrowdata={handleBorrow} editdata={handleEdit} />;
            case 'NewPage':
                return <NewPage gettingapi={selectedBook} Handleaboutpage={handleDetailspage} />;
            case 'BorrowPage':
                return <BorrowPage borrowbook={selectedBook} hanldeseedetails={handleDetailspage} />;
            case 'EditPage':
                return <EditPage book={selectedBook} updateBook={handleEdit} closeEdit={() => window.history.back()} />;
            case 'Detailpage':
                return <Detailpage />;
            default:
                return (
                    <>
                        {isLoggedIn ? (
                            <div>
                                <div className="objectforh2">
                                    <h2>Book List</h2>
                                </div>
                                <table className="object3">
                                    <tr className="object3_1">
                                        <td>Name</td>
                                        <br />
                                        <td>The Great Gatsby</td>
                                        <br />
                                        <br />
                                        <td>To Kill a Mockingbird</td>
                                    </tr>
                                    <tr className="object3_1">
                                        <td>id</td>
                                        <br />
                                        <td>1</td>
                                        <br />
                                        <br />
                                        <td>2</td>
                                    </tr>
                                    <tr className="object3_1">
                                        <td>Category</td>
                                        <br />
                                        <td>Classic</td>
                                        <br />
                                        <br />
                                        <td>Classic</td>
                                    </tr>
                                    <tr className="object3_1">
                                        <td>Quantity</td>
                                        <br />
                                        <td>50</td>
                                        <br />
                                        <br />
                                        <td>40</td>
                                    </tr>
                                    <tr className="object3_1">
                                        <td>Price</td>
                                        <br />
                                        <td>12.99</td>
                                        <br />
                                        <br />
                                        <td>10.99</td>
                                    </tr>
                                    <tr className='object3_1'>
                                        <td>

                                            <Button onClick={() => handleView({ id: 1, name: 'The Great Gatsby', category: 'Classic', quantity: 50, price: 12.99 })} type="primary" icon={<DownloadOutlined />} >View</Button>
                                            <br />

                                            <Button onClick={() => handleView({ id: 2, name: 'To Kill a Mockingbird', category: 'Classic', quantity: 40, price: 10.99 })} type="primary" icon={<DownloadOutlined />}  >View</Button>

                                        </td>
                                    </tr>
                                </table>
                            </div>
                        ) : (
                            <div className='invalid' >
                                <h2>Please log in to view the book list</h2>
                            </div>
                        )}
                    </>
                );
        }
    };

    return (
        <div>
            <div className="object">
                <div className="object_1">
                    <h1>Library Management System</h1>
                </div>
                <div className="object_2">
                <Flex gap="small" wrap>
                    {currentPage !== 'login' && <Button onClick={handleBack}>Back</Button>}
                    {isLoggedIn ? (
                        <Button type='primary' onClick={handleLogout}>Log Out</Button>
                    ) : (
                        <Button type='primary' onClick={handlePage}>Log In</Button>
                    )}
                      </Flex>

                </div>
            </div>
            {errorMessage && <p id='abd'>{errorMessage}</p>}
            {renderPage()}
        </div>
    );
};

export default Main;
