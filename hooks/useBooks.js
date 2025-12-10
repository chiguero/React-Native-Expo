import { useState, useEffect } from 'react';
import { bookService } from '../services/bookService';

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    const response = await bookService.getBooks();
    
    if (response.success) {
      setBooks(response.data);
      setError(null);
    } else {
      setError(response.error);
    }
    
    setLoading(false);
  };

  return {
    books,
    loading,
    error,
    refetch: fetchBooks,
  };
};