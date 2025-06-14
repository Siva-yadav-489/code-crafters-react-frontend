import { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import config from '../config';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [inputError, setInputError] = useState('');
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const validateInput = () => {
    if (!input || input.trim().length === 0) {
      setInputError('Please enter your question before submitting');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputError('');

    if (!validateInput()) {
      return;
    }

    setError('');
    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch(`${config.apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      
      // Add AI response
      const aiMessage = { text: data.response, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Sorry, there was an error processing your request.');
      // Add error message
      const errorMessage = { 
        text: error.message || 'Sorry, there was an error processing your request.', 
        sender: 'ai',
        isError: true 
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="bg-gray-900">
      <Navbar />
      <HeroSection
        title="Have a Quick Question? Just Ask!"
        subtitle="Start a quick conversation with our smart assistant. Brainstorm, ask questions, or just explore ideas."
        buttonText="Start Chatting"
        buttonLink="#start-chatting"
      />
      
      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 md:py-8" id="start-chatting">
        {error && (
          <div className="bg-red-500 text-white p-2 sm:p-3 rounded-lg mb-3 sm:mb-4 text-center text-sm sm:text-base">
            {error}
          </div>
        )}
        <div 
          ref={chatWindowRef}
          className=" rounded-lg p-3 sm:p-4 h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-y-auto mb-3 sm:mb-4"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 sm:mb-3 md:mb-4 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-sm sm:text-base ${
                  message.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : message.isError
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-white'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (inputError) setInputError('');
              }}
              onBlur={validateInput}
              placeholder="Ask question here"
              className={`flex-1 p-2 sm:p-3 rounded bg-gray-800 text-white border text-sm sm:text-base ${
                inputError ? 'border-red-500' : 'border-gray-700'
              } focus:border-purple-500 focus:outline-none font-source-sans transition-colors`}
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 rounded font-source-sans transition-colors text-sm sm:text-base whitespace-nowrap"
            >
              Submit
            </button>
          </div>
          {inputError && (
            <div className="absolute -bottom-5 sm:-bottom-6 left-0 text-red-500 text-xs sm:text-sm">
              {inputError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Chatbot; 