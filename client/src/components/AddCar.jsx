// components/AddCar.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCar } from "../actions/carActions";
import "./AddCar.css";

const AddCar = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    images.forEach((image) => formData.append("images", image));

    dispatch(addCar(formData));
  };

  return (
    <div className="add-car-container">
      <h2>Add a New Car</h2>
      <form onSubmit={handleSubmit} className="add-car-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input type="file" multiple onChange={handleImageChange} />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
