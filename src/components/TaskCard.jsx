import React, { useState } from 'react';
import { IoIosApps } from "react-icons/io";
import { FaRegComments, FaLink } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";

const TaskCard = ({ task }) => {
  const [showModal, setShowModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false); // New state to show success message
  const formattedDate = new Date(task.date).toLocaleDateString();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const filesWithDetails = files.map(file => ({
      name: file.name,
      extension: file.name.split('.').pop()
    }));
    setUploadedFiles(filesWithDetails);
  };

  const handleSave = () => {
    // Close the modal
    setShowModal(false);

    // Show "Upload Successful" message for 2 seconds
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
    }, 2000); // Hide success message after 2 seconds
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 space-y-2">
      {/* Task details */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={task.clientImage} alt={task.clientName} className="w-8 h-8 rounded-full" />
          <span className="font-semibold text-sm">{task.clientName}</span>
        </div>
        <div className="flex items-center space-x-2">
          <img src='https://lh3.googleusercontent.com/a/ACg8ocLu0mQUMMaHNArjZaMsVHhHGp_hAX1M5EvaSJ91DiGji0Wbabtn=s317-c-no' alt={task.myName} className="w-8 h-8 rounded-full" />
          <span className="text-sm text-gray-600">{task.myName}</span>
        </div>
      </div>

      {/* Task description */}
      <div className="flex items-center py-2 space-x-2">
        <div className="w-4/5 flex">
          <span className='p-1'><IoIosApps /></span>
          <p className="text-sm text-black truncate">{task.description}</p>
        </div>
        <div className="w-1/5 flex items-center bg-gray-200 rounded justify-end">
          <img src="/icons/todo.svg" alt="Task Icon" className="w-4 h-4 text-gray-500" />
          <span className="text-black text-xs px-1 py-1 rounded">1/2</span>
        </div>
      </div>

      {/* Task details */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex space-x-2">
          {task.reactorImages.slice(0, 2).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Reactor ${index}`}
              className="w-6 h-6 rounded-full border-2 border-white"
            />
          ))}
          {task.reactorImages.length > 2 && (
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 border-2 border-white text-xs">
              +{task.reactorImages.length - 2}
            </span>
          )}
        </div>

        <div className="flex items-center justify-center">
          <span className="text-xs bg-gray-200 px-2 py-1 text-black font-bold rounded-full">12+</span>
        </div>

        <div className="flex text-black items-center space-x-1 justify-center">
          <span className="text-black">
            <FaRegComments className='text-xl' />
          </span>
          <span>{task.commentCount}</span>
        </div>

        <div
          className="flex text-black items-center justify-center rounded-full cursor-pointer hover:text-blue-600"
          onClick={() => setShowModal(true)}
        >
          <span>
            <FaLink />
          </span>
          <span className='p-1'>{task.attachmentCount}</span>
        </div>

        <div className="flex text-black items-center space-x-1 text-black justify-center">
          <span className="">
            <SlCalender />
          </span>
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg w-1/2 p-6 space-y-4 shadow-lg">
            <h2 className="text-xl font-semibold text-center text-gray-700">Upload Files</h2>

            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded file:border-0
                         file:text-sm file:font-semibold
                         file:bg-indigo-100 file:text-indigo-700
                         hover:file:bg-indigo-200 cursor-pointer"
            />

            <div className="mt-4">
              <h3 className="font-semibold text-gray-600">Uploaded Files:</h3>
              {uploadedFiles.length > 0 ? (
                <ul className="space-y-1 text-gray-700">
                  {uploadedFiles.map((file, index) => (
                    <li key={index} className="flex justify-between items-center text-sm">
                      <span className="font-medium">{file.name}</span>
                      <span className="text-gray-500">{file.extension}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No files uploaded.</p>
              )}
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave} 
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {uploadSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/4">
            <h2 className="text-center text-green-500 font-semibold">Upload Successful!</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
