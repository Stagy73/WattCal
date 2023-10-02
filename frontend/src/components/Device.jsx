import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Device.css";

function Device() {
  const titleRef = useRef();
  const brandRef = useRef();
  const wattRef = useRef();
  const categoryRef = useRef();
  const eanRef = useRef();

  const formRef = useRef();

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      titleRef.current.value === "" ||
      brandRef.current.value === "" ||
      wattRef.current.value === "" ||
      categoryRef.current.value === "" ||
      eanRef.current.value === ""
    ) {
      return;
    }

    const title = titleRef.current.value;
    const brand = brandRef.current.value;
    const watt = wattRef.current.value;
    const category = categoryRef.current.value;
    const ean = eanRef.current.value;

    formRef.current.reset();
    titleRef.current.value = "";
    brandRef.current.value = "";
    wattRef.current.value = "";
    categoryRef.current.value = "";
    eanRef.current.value = "";

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
          }),
        }
      );

      if (response.status === 201) {
        toast.success("Electric component created successfully!", {
          position: "top-right",
        });
        setError("");
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
      <h2>Device</h2>
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
              <input
                className="form-container-info"
                type="number"
                name="category"
                ref={categoryRef}
                placeholder="Category *"
                required
              />
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
              <button className="buttonElectricComponent" type="submit">
                Submit
              </button>{" "}
              Electric component will be added to the database
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Device;
