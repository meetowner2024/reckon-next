import React from 'react';

import { 
  Home, 
  ChevronRight,
  Square,  
  Maximize2  
} from 'lucide-react';
import Link from 'next/link';

const iconMap = {
  home: Home,
  windows: Square, // Changed from Window to Square (or choose another valid icon)
  casement: Square,
  bay: Maximize2,
  default: ChevronRight 
};

const Breadcrumb = ({ 
  items, 
  // separator = <ChevronRight className="w-4 h-4 text-gray-400" />,
  className = '' 
}) => {
  return (
    <nav aria-label="breadcrumb" className={`flex items-center space-x-4 py-2 px-5 bg-gradient-to-r from-white to-blue-50/50 border-b border-gray-200 rounded-lg shadow-sm ${className}`}>
      <ol className="flex items-center space-x-4">
        {items.map((item, index) => {
          const IconComponent = iconMap[item.icon || 'default'];
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center justify-center space-x-2">
              {/* Icon always shown, styled differently for active */}
              <IconComponent 
                className={`w-4 h-4 transition-colors duration-200 ${
                  isLast 
                    ? 'text-black' 
                    : 'text-black hover:text-[#044182]'
                }`} 
              />
              
              {/* Link or Active Text */}
              {!isLast ? (
                <>
                  <Link
                    href={item.path}
                    className="text-sm font-medium text-black hover:text-[#044182] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                  {/* <span className="text-gray-300">{separator}</span> */}
                </>
              ) : (
                <span className="text-sm font-semibold text-[#044182]">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;