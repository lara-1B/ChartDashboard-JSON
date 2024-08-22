import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWidget } from '../redux/categorySlice';

const AddWidgetForm = ({ categoryId }) => {
  const [name, setName] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [includeAverage, setIncludeAverage] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const dispatch = useDispatch();

  const availableColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
  ];

  const dataLabels = ['Revenue', 'Sales', 'Profit', 'Expenses', 'Growth'];

  const generateRandomData = () => {
    const randomLabel = dataLabels[Math.floor(Math.random() * dataLabels.length)];
    return {
      labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
      datasets: [
        {
          label: randomLabel,
          data: Array.from({ length: 5 }, () => Math.floor(Math.random() * 100)),
          backgroundColor: selectedColors.length ? selectedColors : 'rgba(75, 192, 192, 0.2)',
          borderColor: selectedColors.length ? selectedColors.map(color => color.replace('0.2', '1')) : 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };
  };

  const handleColorSelect = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else if (selectedColors.length < 5) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (categoryId) {
      const newWidget = {
        id: Date.now(),
        name, 
        type: chartType,
        data: generateRandomData(), 
        visible: true
      };

      dispatch(addWidget({ categoryId, widget: newWidget }));

      setName('');
      setChartType('bar');
      setIncludeAverage(false);
      setSelectedColors([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col">
        <label htmlFor="widgetName" className="text-sm font-medium text-gray-700 mb-1">
          Widget Name
        </label>
        <input
          id="widgetName"
          type="text"
          placeholder="Enter widget name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="chartType" className="text-sm font-medium text-gray-700 mb-1">
          Chart Type
        </label>
        <select
          id="chartType"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <option value="bar">Bar</option>
          <option value="pie">Pie</option>
          <option value="doughnut">Doughnut</option>
          <option value="line">Line</option>
          <option value="bubble">Bubble</option>
          <option value="horizontal-line">Horizontal Line</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Select Colors (up to 5)
        </label>
        <div className="grid grid-cols-5 gap-2">
          {availableColors.map((color) => (
            <div
              key={color}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer ${selectedColors.includes(color) ? 'border-gray-500' : 'border-transparent'}`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
            >
              {selectedColors.includes(color) && (
                <span className="text-white text-xs flex items-center justify-center">
                  ✓
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="includeAverage"
          type="checkbox"
          checked={includeAverage}
          onChange={(e) => setIncludeAverage(e.target.checked)}
          className="h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
        />
        <label htmlFor="includeAverage" className="ml-2 text-sm font-medium text-gray-700">
          Include Average
        </label>
      </div>

      <button type="submit" className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-200">
        Add Widget
      </button>
    </form>
  );
};

export default AddWidgetForm;
