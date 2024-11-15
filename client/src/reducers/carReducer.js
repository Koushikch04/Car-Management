const initialState = {
  cars: [],
  car: null,
};

export default function carReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CARS":
      return { ...state, cars: action.payload };
    case "FETCH_CAR":
      return { ...state, car: action.payload };
    case "ADD_CAR":
      return { ...state, cars: [...state.cars, action.payload] };
    case "UPDATE_CAR":
      return {
        ...state,
        cars: state.cars.map((car) =>
          car._id === action.payload._id ? action.payload : car
        ),
        car: action.payload,
      };
    case "DELETE_CAR":
      return {
        ...state,
        cars: state.cars.filter((car) => car._id !== action.payload),
      };
    default:
      return state;
  }
}
