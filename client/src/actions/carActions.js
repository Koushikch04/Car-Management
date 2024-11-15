import axios from "axios";
import API_URL from "../api/api";

export const fetchCars = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/cars`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch({ type: "FETCH_CARS", payload: data });
  } catch (error) {
    console.error("Error fetching cars:", error);
    dispatch({
      type: "FETCH_CARS_ERROR",
      payload: error.response?.data || error.message,
    });
  }
};

export const addCar = (carData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/cars`, carData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch({ type: "ADD_CAR", payload: data });
  } catch (error) {
    console.error("Error adding car:", error);
    dispatch({
      type: "ADD_CAR_ERROR",
      payload: error.response?.data || error.message,
    });
  }
};

export const deleteCar = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/cars/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch({ type: "DELETE_CAR", payload: id });
  } catch (error) {
    console.error("Error deleting car:", error);
    dispatch({
      type: "DELETE_CAR_ERROR",
      payload: error.response?.data || error.message,
    });
  }
};

// Fetch a single car by ID (for CarDetail view)
export const fetchCar = (id) => async (dispatch) => {
  console.log("fetching cars");

  try {
    const { data } = await axios.get(`${API_URL}/cars/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch({ type: "FETCH_CAR", payload: data });
  } catch (error) {
    console.error("Error fetching car:", error);
    dispatch({
      type: "FETCH_CAR_ERROR",
      payload: error.response?.data || error.message,
    });
  }
};

// Update a car by ID
export const updateCar = (id, updatedCar) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${API_URL}/cars/${id}`, updatedCar, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    dispatch({ type: "UPDATE_CAR", payload: data });

    return data;
  } catch (error) {
    console.error("Error updating car:", error);
    dispatch({
      type: "UPDATE_CAR_ERROR",
      payload: error.response?.data || error.message,
    });
  }
};
