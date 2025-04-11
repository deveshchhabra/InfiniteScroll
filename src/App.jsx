import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [Page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);//loading State 
  const fetchData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await axios.get(`https://api.javascripttutorial.net/v1/quotes/?page=${Page}&limit=10`);
      const newData = res.data.data;


      setQuotes(prev => [...prev, ...newData]);
      setPage(prev => prev + 1);
      setLoading(false);
    }
    catch (error) {
      console.error('Error fetching quotes:', error);
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();

  }, [])
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);
  return (
    <div className="min-h-screen bg-[#0d1321] text-white font-serif px-6 py-10">
      <h1 className="text-center text-4xl font-bold mb-12">PROGRAMMING QUOTES</h1>

    <div className='space-y-10 max-w-4xl mx-auto '>{
      quotes.map((quoteObj, index) => (
        <div key={index} className="p-4 mb-4 rounded-lg shadow-md bg-gray-900 border border-gray-200">
          <p className="italic mb-2">{index + 1}. "{quoteObj.quote}"</p>
          <p className="text-right italic text-gray-400 mt-2">— {quoteObj.author}</p>

        </div>
      ))}

    </div>
    {loading && <div className="text-center p-4">🔄 Loading...</div>}

    </div>

  )
}

export default App



