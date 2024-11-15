import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CarList from "./components/CarList";
import AddCar from "./components/AddCar";
import CarDetail from "./components/CarDetail";
import Navbar from "./components/Navbar";
import ErrorPage from "./components/ErrorPage";

// eslint-disable-next-line no-unused-vars, react/prop-types
const PrivateRoute = ({ element, ...rest }) => {
  const token = useSelector((state) => state.auth.token);

  return token ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/cars"
            element={<PrivateRoute element={<CarList />} />}
          />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route
            path="/add-car"
            element={<PrivateRoute element={<AddCar />} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
