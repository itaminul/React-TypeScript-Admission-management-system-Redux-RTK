import './App.css'
import Login from './components/layout/Login'
import { Routes, Route} from "react-router-dom";
import AdminDashbord from './components/layout/AdminDashboard';
import NoMatch from './components/layout/NoMatch';
import {useSelector} from 'react-redux';
import { RootState } from './redux/store';
import PrivateRoute from './route/PrivateRoute';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticate);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="*" element={<NoMatch />} /> */}
        {/* <Route path="/" element={<Layout />}> */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<AdminDashbord />} />
        </Route>
        {/* <Route path="*" element={<NoMatch />} /> */}
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App
