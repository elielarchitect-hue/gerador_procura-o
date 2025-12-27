
import React from 'react';
import { DocumentIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md print:hidden">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center">
        <DocumentIcon className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800 ml-3">
          Gerador de Procuração
        </h1>
      </div>
    </header>
  );
};

export default Header;
