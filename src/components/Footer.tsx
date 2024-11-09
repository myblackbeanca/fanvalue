import React from 'react';
import { Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="glass-card border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <a
            href="https://instagram.com/minyvinyl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" />
          </a>
          <a
            href="https://twitter.com/minyvinyl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </a>
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MINY. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;