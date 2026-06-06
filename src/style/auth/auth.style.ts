export  const inputClass = (hasError: boolean) =>
    `appearance-none block w-full px-4 py-2.5 border rounded  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40 focus:border-[#FF6B35] sm:text-sm transition-all duration-200 pr-10 ${hasError ? "border-red-300 text-red-900" : "border-gray-200"
    }`;