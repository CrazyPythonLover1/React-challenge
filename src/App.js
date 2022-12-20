import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const nameRef = useRef();
  const selecedtDataRef = useRef();

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const info = {
      name: nameRef.current.value,
      selecedtData: selecedtDataRef?.current?.value,
    };
    console.log(info);

    // add data info the mongodb
    try {
      setMessage("");
      const url = "http://localhost:8000/addInputData";
      const option = {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const response = await fetch(url, option);
      const data = await response.json();
      if (data) {
        setMessage("Your data added into database successfully.");
        nameRef.current.value = "";
        selecedtDataRef.current.value = "";
        window.location.reload();
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <div className="main_body">
      <form className="form_body" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fname" className="form-label">
            Name:
          </label>
          <input
            ref={nameRef}
            type="text"
            id="fname"
            name="name"
            placeholder="name"
            className="form-control"
            required
          />
        </div>

        <div>
          <label htmlFor="select" className="form-label mt-2">
            Select:
          </label>

          <select
            id="select"
            name="selectedData"
            className="input-group form-select"
            ref={selecedtDataRef}
            required
          >
            <option value="1">Manufacturing</option>
            <option value="19">
              &nbsp;&nbsp;&nbsp;&nbsp;Construction materials
            </option>
            <option value="18">
              &nbsp;&nbsp;&nbsp;&nbsp;Electronics and Optics
            </option>
          </select>
        </div>

        <label htmlFor="terms" className="mt-4">
          <input type="checkbox" id="term" name="terms" value="false" /> Agree
          to Terms
        </label>
        <br />
        <button type="submit" className="submit_btn">
          Submit
        </button>
      </form>
      <p className="successMsg">{message}</p>
    </div>
  );
}

export default App;
