import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import AddWidgetForm from './AddWidget.component';
import { toggleWidgetVisibility } from '../redux/categorySlice';

const tabs = [
  { name: 'CSPM', key: 0 },
  { name: 'CWPP', key: 1 },
  { name: 'Image', key: 2 },
  { name: 'Ticket', key: 3 }
];

const WidgetOverlay = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  const handleCheckboxChange = (categoryId, widgetId) => {
    dispatch(toggleWidgetVisibility({ categoryId, widgetId }));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-end items-start bg-gray-900 bg-opacity-50 z-50">
      <div className="w-full max-w-sm bg-white h-full shadow-lg overflow-y-auto transform transition-transform duration-300 ease-in-out">
        <div className="bg-gray-500 text-white flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">Add Widget</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <div className="flex border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={tab.key}
              className={`flex-1 p-4 text-center font-semibold ${activeTab === index ? 'border-b-4 border-gray-500 text-gray-500' : 'text-gray-600'}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="p-4">
          {categories[activeTab]?.widgets.map((widget) => (
            <div key={widget.id} className="flex items-center justify-between mb-4">
              <span>{widget.name}</span>
              <input
                type="checkbox"
                checked={widget.visible}
                onChange={() => handleCheckboxChange(categories[activeTab].id, widget.id)}
                className="form-checkbox h-5 w-5 text-gray-600"
              />
            </div>
          ))}
          <AddWidgetForm categoryId={categories[activeTab]?.id} />
        </div>
      </div>
    </div>
  );
};

export default WidgetOverlay;
