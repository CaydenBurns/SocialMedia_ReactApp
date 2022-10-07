import React, { useState, useEffect } from "react";
import productService from "./services/productService";
import toastr from "toastr";

function Product() {
  const [product, setProduct] = useState({
    Name: "",
    Manufacturer: "",
    Description: "",
    Cost: "",
  });

  useEffect(() => {
    productService.userLogin().then(onLoginSuccess).catch(onLoginError);
  }, []);

  function onLoginSuccess(response) {
    console.log("onAddProductSuccess", response);
    toastr.success("Congratulations, Your now Logged In");
  }

  function onLoginError(error) {
    console.log("Login Success", error);
    toastr.error("We're Sorry, Your Login Failed, please try again");
  }

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setProduct((pState) => {
      console.log(
        "pState",
        "this is state inside of set form data to send as payload",
        pState
      );
      const toFormData = { ...pState };
      toFormData[name] = value;
      toFormData.Cost = Number(toFormData.Cost);

      return toFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Inside of handle submit in addJob if statement, check for id",
      product
    );

    productService
      .addEntity(product)
      .then(onAddProductSuccess)
      .catch(onAddProductError);
  };

  function onAddProductSuccess(response) {
    console.log("onAddProductSuccess", response);
    toastr.success(
      "Congratulations, Your product has been listed",
      response.id
    );
  }

  function onAddProductError(error) {
    console.log("onAddProductSuccess", error);
    toastr.error("We're Sorry, Your product has not been listed");
  }

  return (
    <div className="formContainerReg">
      <div className="card  ">
        <div className="card-body">
          <div className="form-group">
            <form>
              <div className="mb-3">
                <label htmlFor="Name" className="form-label">
                  Name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  id="Name"
                  name="Name"
                  value={product.Name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Manufacturer" className="form-label">
                  Manufacturer
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  id="Manufacturer"
                  name="Manufacturer"
                  value={product.Manufacturer}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Description" className="form-label">
                  Description
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  id="Description"
                  name="Description"
                  value={product.Description}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Cost" className="form-label">
                  Cost
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  id="Cost"
                  name="Cost"
                  value={product.Cost}
                />
              </div>
            </form>

            <button onClick={handleSubmit} className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
