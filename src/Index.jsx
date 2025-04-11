import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [quoteCount, setQuoteCount] = useState(0);

  const fetchData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await axios.get(`https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=10`);
      const newQuotes = res.data.data;

      if (newQuotes.length === 0) {
        setHasMore(false);
      } else {
        setQuotes(prev => [...prev, ...newQuotes]);
        setQuoteCount(prev => prev + newQuotes.length);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading && hasMore) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="text-lg p-6 max-w-3xl mx-auto">
      <div className="text-2xl font-bold mb-6">📚 Quotes Loaded: {quoteCount}</div>

      {quotes.map((quote, index) => (
        <div key={index} className="p-4 mb-4 rounded-lg shadow-md bg-white border border-gray-200">
          <p className="italic mb-2">{index + 1}. "{quote.quote}"</p>
          <p className="text-right text-sm text-gray-600">- {quote.author}</p>
        </div>
      ))}

      {loading && <div className="text-center p-4">🔄 Loading...</div>}
      {!hasMore && <div className="text-center p-4 text-gray-500">✅ No more quotes to load.</div>}
    </div>
  );
}

export default App;
