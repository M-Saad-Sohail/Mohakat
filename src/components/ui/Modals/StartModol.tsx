import { useState, useEffect } from 'react';

const StartModal = () => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    // Function to hide the modal after 10 seconds
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 300000); // 10 seconds in milliseconds

    // Clear the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showModal && (
        <div className="fixed top-30 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50 ">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Terms of Service</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="text-gray-700">
              <p className="mb-4">With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
              <p>The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">I accept</button>
              <button onClick={() => setShowModal(false)} className="ml-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300">Decline</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StartModal;
