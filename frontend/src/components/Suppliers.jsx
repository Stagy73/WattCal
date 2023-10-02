import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Suppliers.css";

function Suppliers() {
  const titleRef = useRef();
  const countryRef = useRef();
  const priceRef = useRef();
  const yearRef = useRef();

  const formRef = useRef();

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      titleRef.current.value === "" ||
      countryRef.current.value === "" ||
      priceRef.current.value === "" ||
      yearRef.current.value === ""
    ) {
      return;
    }

    const title = titleRef.current.value;
    const country = countryRef.current.value;
    const price = priceRef.current.value;
    const year = yearRef.current.value;

    formRef.current.reset();
    titleRef.current.value = "";
    countryRef.current.value = "";
    priceRef.current.value = "";
    yearRef.current.value = "";

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:6001"
        }/suppliers`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            country,
            price,
            year,
          }),
        }
      );

      if (response.status === 201) {
        toast.success("Supplier created successfully!", {
          position: "top-right",
        });
        setError("");
      } else {
        const data = await response.json();
        if (data.message) {
          toast.error(data.message, { position: "top-right" });
          setError(data.message);
        } else {
          toast.error("Error on supplier creation.", { position: "top-right" });
          setError("");
        }
      }
    } catch (error) {
      console.error(error);

      toast.error("Error on supplier creation.", { position: "top-right" });
      setError("");
    }
  };

  return (
    <div className="supplierCreation">
      <h2>Electric Supplier</h2>
      <div className="form-container">
        <div className="message-error">{error && <p>{error}</p>}</div>
        <div>
          <form className="formSuppliers" ref={formRef} onSubmit={handleSubmit}>
            <label>
              <input
                className="form-container-info"
                type="text"
                name="title"
                ref={titleRef}
                placeholder="Supplier *"
                required
              />
            </label>
            <label>
              <input
                className="form-container-info"
                type="text"
                name="country"
                ref={countryRef}
                placeholder="Country *"
                required
              />
            </label>
            <label>
              <input
                className="form-container-info"
                type="text"
                name="price"
                ref={priceRef}
                placeholder="Price *"
                required
                pattern="^\d+(\.\d{1,2})?$"
                title="Enter a valid decimal number (e.g., 12.34)"
              />
            </label>
            <label>
              <input
                className="form-container-info"
                type="text"
                name="year"
                ref={yearRef}
                placeholder="Year * (yyyy-mm-dd)"
                required
                pattern="\d{4}-\d{2}-\d{2}"
                title="Enter a valid date in the format yyyy-mm-dd"
              />
            </label>
            <label>
              <button className="buttonSupplier" type="submit">
                Submit
              </button>{" "}
              supplier will be added to database
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Suppliers;
