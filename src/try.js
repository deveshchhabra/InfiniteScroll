import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [quotes, setQuotes] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get('https://api.javascripttutorial.net/v1/quotes/?page=10&limit=10');
      setQuotes(res.data.data);
    } catch (err) {
      console.error('Error fetching quotes:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1321] text-white font-serif px-6 py-10">
      <h1 className="text-center text-4xl font-bold mb-12">PROGRAMMING QUOTES</h1>

      <div className="space-y-10 max-w-4xl mx-auto">
        {quotes.map((quoteObj, index) => (
          <div key={index} className="relative text-lg leading-relaxed">
            <p>
              <span className="font-semibold">{index + 1}</span> {quoteObj.quote}
            </p>
            <p className="text-right italic text-gray-400 mt-2">— {quoteObj.author}</p>
            <span className="absolute bottom-0 right-0 text-5xl text-gray-400 select-none leading-none">”</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
