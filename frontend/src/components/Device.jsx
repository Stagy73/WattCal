import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Device.css";
import ConsumptionCalculator from "./ConsumptionCalculator";

function Device() {
  const titleRef = useRef();
  const brandRef = useRef();
  const wattRef = useRef();
  const categoryRef = useRef();
  const eanRef = useRef();
  const supplierRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef(); // Ref for the description field
  const pictureUrlRef = useRef(); // Ref for the picture URL field

  const formRef = useRef();

  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:6001"}/cats`
        );

        if (response.status === 200) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Error fetching categories");
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchSuppliers() {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:6001"
          }/suppliers`
        );

        if (response.status === 200) {
          const data = await response.json();
          setSuppliers(data);
        } else {
          console.error("Error fetching suppliers");
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
    fetchSuppliers();
  }, []);

  async function fetchDevices() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:6001"}/devices`
      );

      if (response.status === 200) {
        const data = await response.json();
        setDevices(data);
      } else {
        console.error("Error fetching devices");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchPrices() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL ?? "http:127.0.0.1:6001"}/prices`
      );

      if (response.status === 200) {
        const data = await response.json();
        setPrices(data);
      } else {
        console.error("Error fetching prices");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPrices();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      titleRef.current.value === "" ||
      brandRef.current.value === "" ||
      wattRef.current.value === "" ||
      categoryRef.current.value === "" ||
      eanRef.current.value === "" ||
      supplierRef.current.value === "" ||
      priceRef.current.value === "" ||
      descriptionRef.current.value === "" || // Added description validation
      pictureUrlRef.current.value === "" // Added picture_url validation
    ) {
      return;
    }

    const title = titleRef.current.value;
    const brand = brandRef.current.value;
    const watt = wattRef.current.value;
    const category = categoryRef.current.value;
    const ean = eanRef.current.value;
    const supplier = supplierRef.current.value;
    const price = priceRef.current.value;
    const description = descriptionRef.current.value; // Get description value
    const pictureUrl = pictureUrlRef.current.value; // Get picture_url value

    formRef.current.reset();
    titleRef.current.value = "";
    brandRef.current.value = "";
    wattRef.current.value = "";
    categoryRef.current.value = "";
    eanRef.current.value = "";
    supplierRef.current.value = "";
    priceRef.current.value = "";
    descriptionRef.current.value = ""; // Clear description field
    pictureUrlRef.current.value = ""; // Clear picture_url field

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:6001"
        }/devices`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            brand,
            watt,
            category,
            ean,
            supplier,
            price,
            description, // Include description in the JSON
            picture_url: pictureUrl, // Include picture_url in the JSON
          }),
        }
      );

      if (response.status === 201) {
        toast.success("Electric component created successfully!", {
          position: "top-right",
        });
        setError("");

        // Fetch the newly added device and add it to the devices state
        fetchDevices();
      } else {
        const data = await response.json();
        if (data.message) {
          toast.error(data.message, { position: "top-right" });
          setError(data.message);
        } else {
          toast.error("Error on electric component creation.", {
            position: "top-right",
          });
          setError("");
        }
      }
    } catch (error) {
      console.error(error);

      toast.error("Error on electric component creation.", {
        position: "top-right",
      });
      setError("");
    }
  };

  return (
    <div className="electricComponentCreation">
      <h2>Add your Device</h2>
      <div className="form-container">
        <div className="message-error">{error && <p>{error}</p>}</div>
        <div>
          <form
            className="formElectricComponent"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <label>
              <input
                className="form-container-info"
                type="text"
                name="title"
                ref={titleRef}
                placeholder="Title *"
                required
              />
            </label>
            <label>
              <input
                className="form-container-info"
                type="text"
                name="brand"
                ref={brandRef}
                placeholder="Brand *"
                required
              />
            </label>
            <label>
              <input
                className="form-container-info"
                type="number"
                name="watt"
                ref={wattRef}
                placeholder="Watt *"
                required
              />
            </label>
            <label>
              <select
                className="form-container-info"
                name="category"
                ref={categoryRef}
                required
              >
                <option value="" disabled>
                  Select a Category *
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <select
                className="form-container-info"
                name="supplier"
                ref={supplierRef}
                required
              >
                <option value="" disabled>
                  Select a Supplier *
                </option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.title}>
                    {supplier.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <select
                className="form-container-info"
                name="price"
                ref={priceRef}
                required
              >
                <option value="" disabled>
                  Select a Price *
                </option>
                {prices
                  .sort((a, b) => a.price - b.price)
                  .map((price) => (
                    <option key={price.id} value={price.value}>
                      {price.value}
                    </option>
                  ))}
              </select>
            </label>
            <label>
              <input
                className="form-container-info"
                type="number"
                name="ean"
                ref={eanRef}
                placeholder="EAN *"
                required
              />
            </label>
            <label>
              <input
                className="form-container-info"
                type="text"
                name="description"
                ref={descriptionRef}
                placeholder="Description *"
                required
              />
            </label>
            <label>
              <input
                className="form-container-info"
                type="text"
                name="picture_url"
                ref={pictureUrlRef}
                placeholder="Picture URL *"
                required
              />
            </label>

            <button className="buttonElectricComponent" type="submit">
              Submit
            </button>
          </form>
        </div>
        <ConsumptionCalculator />
      </div>
    </div>
  );
}

export default Device;
