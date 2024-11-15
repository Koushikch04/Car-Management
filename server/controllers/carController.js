import Car from "../models/Car.js";

export const addCar = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const images = req.files.map((file) => {
      return file.path.replace(/\\/g, "/"); // Normalize the path
    });

    const car = await Car.create({
      userId: req.user._id,
      title,
      description,
      images,
      tags,
    });

    res.status(201).json(car);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error", error });
  }
};

export const getCars = async (req, res) => {
  console.log("fetching cars:");

  try {
    const cars = await Car.find({ userId: req.user._id });
    res.json(cars);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error", error });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json({ message: "Car deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
