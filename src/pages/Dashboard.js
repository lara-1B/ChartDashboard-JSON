import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeWidget } from '../redux/categorySlice';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
} from 'chart.js';
import { Bar, Pie, Doughnut, Line, Bubble } from 'react-chartjs-2';
import CardContainer from '../components/CardContainer.component';
import Navbar from '../components/Navbar.component';
import WidgetOverlay from '../components/WidgetOverlay.component';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

function Dashboard() {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const renderChart = (widget) => {
    switch (widget.type) {
      case 'bar':
        return <Bar data={widget.data} options={{ maintainAspectRatio: false }} />;
      case 'pie':
        return <Pie data={widget.data} options={{ maintainAspectRatio: false }} />;
      case 'doughnut':
        return <Doughnut data={widget.data} options={{ maintainAspectRatio: false }} />;
      case 'line':
        return <Line data={widget.data} options={{ maintainAspectRatio: false }} />;
      case 'bubble':
        return <Bubble data={widget.data} options={{ maintainAspectRatio: false }} />;
      case 'horizontal-line':
        return (
          <Line
            data={widget.data}
            options={{
              indexAxis: 'y',
              maintainAspectRatio: false,
              scales: {
                x: {
                  beginAtZero: true
                }
              }
            }}
          />
        );
      default:
        return <div>No chart available</div>;
    }
  };

  const filteredWidgets = (widgets) => {
    if (!searchTerm) return widgets;
    return widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar onSearch={handleSearch} />
      <div className="container mx-auto p-6">
        {categories.map((category) => (
          <div key={category.id} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">{category.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWidgets(category.widgets).map((widget) => (
                <CardContainer key={widget.id}>
                  <h4 className="text-lg font-medium mb-2">{widget.name}</h4>
                  <div className="flex-grow">
                    {renderChart(widget)}
                  </div>
                  <button
                    onClick={() => dispatch(removeWidget({ categoryId: category.id, widgetId: widget.id }))}
                    className="text-red-500 mt-2"
                  >
                    Remove
                  </button>
                </CardContainer>
              ))}
              <CardContainer>
                <button
                  onClick={() => setOverlayOpen(true)}
                  className="bg-gray-500 text-white rounded px-4 py-2 w-full h-full"
                >
                  Add Widget
                </button>
              </CardContainer>
            </div>
          </div>
        ))}
      </div>

      {overlayOpen && (
        <WidgetOverlay
          open={overlayOpen}
          onClose={() => setOverlayOpen(false)}
          categoryId={selectedCategory?.id} 
        />
      )}
    </div>
  );
}

export default Dashboard;
