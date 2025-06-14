const HeroSection = ({ title, subtitle, buttonText, buttonLink }) => {
  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-evenly py-12 sm:py-16 md:py-20 relative bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <div className="relative z-10 px-4 sm:px-6 md:px-8 w-full max-w-7xl mx-auto">
        <div className="mb-2 sm:mb-4 flex flex-col">
          <img 
            src="/gemini-brand-color.svg" 
            alt="gemini" 
            className="w-3/4 sm:w-4/5 md:w-3/5 mx-auto" 
          />
          <span className="text-neutral-400 text-sm sm:text-base md:text-lg italic font-source-sans ml-auto mr-10">
            powered Proposal Generator
          </span>
        </div>
        <div className="text-center">
          <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold font-source-sans mb-3 sm:mb-4">
            {title}
          </p>
          <p className="text-white text-base sm:text-lg md:text-xl font-source-sans max-w-2xl mx-auto px-2 sm:px-4">
            {subtitle}
          </p>
        </div>
      </div>
      <a
        href={buttonLink}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded font-source-sans transition-colors inline-block mt-4 sm:mt-6 text-sm sm:text-base"
      >
        {buttonText}
      </a>
    </div>
  );
};

export default HeroSection; 