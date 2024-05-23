import React, { useCallback } from 'react';

export default function AdminAPI({ option, setBooks, setIsLoading, setApiMessage }) {
  const handlefunction = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://08d48594-1db2-46f0-bd1a-0bd0485eae7f.mock.pstmn.io', {
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
      setApiMessage('Data fetched successfully!');
    } catch (error) {
      console.error('Error fetching data:', error);
      setApiMessage('Error fetching data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [option, setBooks, setIsLoading, setApiMessage]);

  return { handlefunction };
}
