import React from 'react';
const MobileWarning = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 text-white flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Mobile Access Restricted</h2>
        <p>Please use a desktop to access this site.</p>
      </div>
    </div>
  );
};

export default MobileWarning;
