import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center">
        <Loader className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
        <p className="text-white text-lg">Cargando música...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;