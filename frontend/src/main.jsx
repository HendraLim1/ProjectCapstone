import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/features/store.js';

// Private Route
import PrivateRoute from './components/PrivateRoute.jsx';

// Auth
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';

// User
import Profile from './pages/User/Profile.jsx';

// Admin
import AdminRoute from './pages/Admin/AdminRoute.jsx';
import UserList from './pages/Admin/UserList.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private Route */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="userlist" element={<UserList />} />
        <Route
          path="productlist"
          element={
            <div className="p-4">
              <h1 className="text-2xl font-semibold mb-4">Products</h1>
              <p>Product list coming soon</p>
            </div>
          }
        />
        <Route
          path="categorylist"
          element={
            <div className="p-4">
              <h1 className="text-2xl font-semibold mb-4">Categories</h1>
              <p>Category list coming soon</p>
            </div>
          }
        />
        <Route
          path="orderlist"
          element={
            <div className="p-4">
              <h1 className="text-2xl font-semibold mb-4">Orders</h1>
              <p>Order list coming soon</p>
            </div>
          }
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
