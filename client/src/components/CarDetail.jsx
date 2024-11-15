// components/CarDetail.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCar, deleteCar, updateCar } from "../actions/carActions";
import "./CarDetail.css";
import API_URL from "../api/api";

const CarDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const car = useSelector((state) => state.cars.car);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    dispatch(fetchCar(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (car) {
      setTitle(car.title);
      setDescription(car.description);
      setTags(car.tags.join(", "));
    }
  }, [car]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    dispatch(deleteCar(id));
    navigate("/cars");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCar = {
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()), // Convert to array
    };
    const updatedCarData = await dispatch(updateCar(id, updatedCar));

    // Update the local state with the new car data immediately
    setTitle(updatedCarData.title);
    setDescription(updatedCarData.description);
    setTags(updatedCarData.tags.join(", "));

    setIsEditing(false);
  };
  console.log(car);

  return (
    <div className="car-detail-container">
      {car && (
        <>
          <h2>{isEditing ? "Edit Car" : car.title}</h2>
          <div className="car-detail">
            {/* Display car images */}
            <div className="car-images">
              {car.images && car.images.length > 0 ? (
                car.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${API_URL}/${image}`}
                    alt={`Car image ${index + 1}`}
                    className="car-image"
                  />
                ))
              ) : (
                <p>No images available for this car.</p>
              )}
            </div>

            {/* Display car details */}
            {isEditing ? (
              <form onSubmit={handleSubmit} className="car-detail-form">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Comma-separated tags"
                />
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
                <p>{car.description}</p>
                <p>
                  <strong>Tags:</strong> {car.tags.join(", ")}
                </p>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CarDetail;
