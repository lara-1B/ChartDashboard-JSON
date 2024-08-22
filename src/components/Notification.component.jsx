import React, { useState } from 'react';
import { FaBell, FaTimes } from 'react-icons/fa'; 

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New widget added to CSPM Dashboard' },
    { id: 2, message: 'Cloud account risk assessment completed' },
    { id: 3, message: 'Top 5 namespace specific alerts updated' },
    { id: 4, message: 'New image risk assessment available in Registry Scan Dashboard' },
  ]);

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <FaBell className="w-6 h-6 text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md z-50">
          <ul className="py-2">
            {notifications.length === 0 ? (
              <li className="px-4 py-2 text-sm text-gray-500">No new notifications</li>
            ) : (
              notifications.map(notification => (
                <li
                  key={notification.id}
                  className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span>{notification.message}</span>
                  <button onClick={() => dismissNotification(notification.id)}>
                    <FaTimes className="w-4 h-4 text-gray-400 hover:text-gray-700" />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
