import React from 'react';

interface Props {
  term: string;
  definition: string;
}

export const GlossaryTooltip: React.FC<Props> = ({ term, definition }) => {
  return (
    <span className="relative group inline-block cursor-help">
      <span className="text-blue-400 font-medium border-b border-dotted border-blue-500 hover:text-blue-300 transition-colors">
        {term}
      </span>
      {/* Tooltip Container */}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <span className="block bg-gray-900 border border-gray-600 text-gray-200 text-xs rounded-md p-3 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
           <span className="font-bold text-white block mb-1">{term}</span>
           {definition}
        </span>
        {/* Triangle Pointer */}
        <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-600" />
      </span>
    </span>
  );
};