import React from 'react';
import TaskCard from './TaskCard';

const DataList = ({ type, data }) => (
  <div className="flex flex-col w-[350px] bg-gray-100 rounded-lg shadow-lg">
    <h2 className="text-center text-lg font-bold p-4 bg-gray-200 rounded-t-lg">{type}</h2>
    <div className="p-2 space-y-4 overflow-y-auto max-h-[80vh]">
      {data.length > 0 ? (
        data.map((item) => <TaskCard key={item.id} task={item} />)
      ) : (
        <p className="text-center text-gray-500">No items available</p>
      )}
    </div>
  </div>
);

export default DataList;
