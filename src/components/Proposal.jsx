import { useState } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import config from '../config';

const Proposal = () => {
  const [requirements, setRequirements] = useState('');
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState('');
  const [showProposal, setShowProposal] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [inputError, setInputError] = useState('');

  const validateRequirements = () => {
    if (!requirements || requirements.trim().length === 0) {
      setInputError('Please enter your requirements before submitting');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputError('');
    
    if (!validateRequirements()) {
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${config.apiUrl}/api/proposal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requirements }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate proposal');
      }

      const data = await response.json();
      setProposal(data.proposal);
      setShowProposal(true);
      setShowDownload(true);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Sorry, there was an error generating your proposal.');
      setShowProposal(true);
      setProposal('Failed to generate proposal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setInputError('');

    if (!email.trim()) {
      setInputError('Please enter an email address');
      return;
    }

    if (!email.includes('@')) {
      setInputError('Please enter a valid email address');
      return;
    }

    setError('');
    try {
      const response = await fetch(`${config.apiUrl}/api/mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mailid: email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }

      const data = await response.json();
      if (data.success) {
        setEmail('');
        alert('Proposal sent successfully!');
      } else {
        throw new Error(data.error || 'Failed to send proposal');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to send proposal. Please try again.');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/download`);
      if (!response.ok) {
        throw new Error('Failed to download proposal');
      }
      
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'proposal.pdf';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      setError('Failed to download proposal. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <HeroSection
        title="AI-Powered Software Proposals, Tailored Instantly!"
        subtitle="Get structured, client-ready software proposals in seconds—just enter the details, and let AI handle the rest."
        buttonText="Generate now"
        buttonLink="#generate-now"
      />

      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8" id="generate-now">
        {error && (
          <div className="bg-red-500 text-white p-2 sm:p-3 rounded-lg mb-3 sm:mb-4 text-center max-w-4xl mx-auto text-sm sm:text-base">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative">
            <textarea
              value={requirements}
              onChange={(e) => {
                setRequirements(e.target.value);
                if (inputError) setInputError('');
              }}
              onBlur={validateRequirements}
              placeholder="Enter requirements"
              className={`w-full p-3 sm:p-4 rounded-lg bg-gray-800 text-white border text-sm sm:text-base ${
                inputError ? 'border-red-500' : 'border-gray-700'
              } focus:border-purple-500 focus:outline-none font-source-sans min-h-[150px] sm:min-h-[200px] transition-colors`}
            />
            {inputError && (
              <div className="absolute -bottom-5 sm:-bottom-6 left-0 text-red-500 text-xs sm:text-sm">
                {inputError}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`mt-6 sm:mt-8 bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-2 rounded font-source-sans transition-colors text-sm sm:text-base ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Generating...' : 'Submit'}
          </button>
        </form>

        {loading && (
          <div className="flex justify-center items-center my-6 sm:my-8">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-b-2 border-purple-500"></div>
            <span className="ml-3 text-white font-source-sans text-sm sm:text-base">Generating...</span>
          </div>
        )}

        {showProposal && (
          <>
            {window.scrollBy(0, 1000)}
            <h2 className="text-xl sm:text-2xl text-white text-center font-source-sans my-6 sm:my-8">
              Here is your AI generated Proposal🤖
            </h2>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg text-white font-source-sans whitespace-pre-wrap max-w-4xl mx-auto text-sm sm:text-base">
              {proposal}
            </div>
          </>
        )}

        {showDownload && (
          <div className="flex flex-col md:flex-row justify-between items-start mt-6 sm:mt-8 max-w-4xl mx-auto gap-3 sm:gap-4">
            <button
              onClick={handleDownload}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 rounded font-source-sans transition-colors text-center w-full md:w-auto text-sm sm:text-base"
            >
              Download PDF
            </button>
            <form onSubmit={handleEmailSubmit} className="w-full md:w-1/2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setInputError('');
                  }}
                  placeholder="Enter email"
                  className={`flex-1 px-2 sm:px-3 rounded bg-gray-800 text-white border text-sm sm:text-base ${
                    inputError && (!email.trim() || !email.includes('@'))
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-700 focus:border-purple-500'
                  } focus:outline-none font-source-sans transition-colors`}
                  required
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 rounded font-source-sans transition-colors whitespace-nowrap text-sm sm:text-base"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Proposal; 