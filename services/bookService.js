import axios from 'axios';

const API_URL = 'https://lawebdeperez.es/apidog';

export const bookService = {
  // Obtener todos los libros
  getBooks: async () => {
    try {
      const response = await axios.get(API_URL);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching books:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Obtener libro por ID
  getBookById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching book:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
};