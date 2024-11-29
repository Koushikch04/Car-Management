// components/CarList.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../actions/carActions";
import "./CarList.css";
import { Link } from "react-router-dom";

const CarList = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const filteredCars = cars.filter(
    (car) =>
      car.title.toLowerCase().includes(search.toLowerCase()) ||
      car.description.toLowerCase().includes(search.toLowerCase()) ||
      car.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="car-list-container">
      <h2>My Cars</h2>
      <input
        type="text"
        placeholder="Search cars"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <ul className="car-list">
        {filteredCars.map((car) => (
          <li key={car._id} className="car-item">
            <Link to={`/cars/${car._id}`}> {car.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
