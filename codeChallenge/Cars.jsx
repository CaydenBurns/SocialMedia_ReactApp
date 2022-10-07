import React, { useState } from "react";
import SingleCar from "./SingleCar";

function Cars() {
  const [cars, setCars] = useState([
    {
      make: "Kia",
      model: "Sorento",
      year: 2020,
    },
    {
      make: "Kia",
      model: "Optima",
      year: 2019,
    },
    {
      make: "Tesla",
      model: "Model 3",
      year: 2021,
    },
    {
      make: "Honda",
      model: "Civic",
      year: 2019,
    },
    {
      make: "Honda",
      model: "Accord",
      year: 2018,
    },
    {
      make: "Volkswagen",
      model: "Jetta",
      year: 2021,
    },
    {
      make: "Toyota",
      model: "Camry",
      year: 2021,
    },
    {
      make: "Ford",
      model: "Mustang",
      year: 2019,
    },
    {
      make: "Ford",
      model: "F-150",
      year: 2019,
    },
    {
      make: "Toyota",
      model: "Camry",
      year: 2020,
    },
    {
      make: "Ford",
      model: "F-150",
      year: 2021,
    },
  ]);

  function filter2018Cars(e) {
    e.preventDefault();
    setCars((pState) => {
      let filteredCars = { ...pState };
      filteredCars = cars.filter((car) => car.year === 2018);
      console.log(filteredCars, "rightAFter filter");
      return filteredCars;
    });
  }

  function filter2019Cars(e) {
    e.preventDefault();
    setCars((pState) => {
      let filteredCars = { ...pState };
      filteredCars = cars.filter((car) => car.year === 2019);
      console.log(filteredCars, "rightAFter filter");
      return filteredCars;
    });
  }

  function filter2020Cars(e) {
    e.preventDefault();
    setCars((pState) => {
      let filteredCars = { ...pState };
      filteredCars = cars.filter((car) => car.year === 2020);
      console.log(filteredCars, "rightAFter filter");
      return filteredCars;
    });
  }

  function filter2021Cars(e) {
    e.preventDefault();
    setCars((pState) => {
      let filteredCars = { ...pState };
      filteredCars = cars.filter((car) => car.year === 2021);
      console.log(filteredCars, "rightAFter filter");
      return filteredCars;
    });
  }

  const [show, setShow] = useState({ isShow: false });

  const toggleCars = () => {
    setShow((pState) => {
      let toggle = { ...pState };
      show.isShow = !pState.isShow;
      return toggle;
    });
  };

  const mapCar = (cars) => {
    return (
      <SingleCar
        car={cars}
        key={Math.random() * 12376}
        togglecars={toggleCars}
      />
    );
  };

  return (
    <React.Fragment>
      <button onClick={toggleCars} className="btn btn-success">
        Toggle
      </button>
      <button className="btn btn-warning" id="2018" onClick={filter2018Cars}>
        2018 Cars
      </button>
      <button className="btn btn-success" id="2019" onClick={filter2019Cars}>
        2019 Cars
      </button>
      <button className="btn btn-warning" id="2020" onClick={filter2020Cars}>
        2020 Cars
      </button>
      <button className="btn btn-success" id="2021" onClick={filter2021Cars}>
        2021 Cars
      </button>
      <div>
        <h1>Cars</h1>
        {show.isShow ? cars.map(mapCar) : <h1>Toggle Cars please!</h1>}
      </div>
    </React.Fragment>
  );
}

export default Cars;
