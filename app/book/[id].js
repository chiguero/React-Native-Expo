// Al inicio del archivo, cambia:
import { bookService } from '../../services/bookService';

// Y en el componente:
const [book, setBook] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadBook();
}, [id]);

const loadBook = async () => {
  setLoading(true);
  const response = await bookService.getBookById(id);
  if (response.success) {
    setBook(response.data);
  }
  setLoading(false);
};

if (loading) {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
      <ActivityIndicator size="large" color="#1e293b" />
    </SafeAreaView>
  );
}