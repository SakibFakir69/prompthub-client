import Link from 'next/link';

export default function NotFound() {
  
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30 px-4 sm:px-6 lg:px-8">
      
      {/* Subtle decorative blurs (matching Auth pages) */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#FF6B35]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center relative z-10 max-w-lg">
        
        {/* Large 404 Brand Text */}
        <h1 className="text-[150px] md:text-[200px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#FF6B35] to-[#ff9a76] leading-none select-none drop-shadow-sm">
          404
        </h1>

        {/* Broken Link Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center mb-6 -mt-10 relative z-10">
          <svg 
            className="w-8 h-8 text-[#FF6B35]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>

        {/* Descriptive Text */}
       
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          The page you're looking for seems to have wandered off into another dimension. Let's get you back to creating amazing prompts.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          <Link
            href="/"
            className="inline-flex justify-center items-center py-3 px-6 rounded-xl shadow-sm text-sm font-semibold text-white bg-[#FF6B35] hover:bg-[#e55a2b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B35] transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-2 0h2" />
            </svg>
            Back to Home
          </Link>
          
          
        </div>
      </div>
    </div>
  );
}