import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
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
      const url = "http://localhost:5000/addInputData";
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
        setMessage("Your data added into the database successfully.");
        nameRef.current.value = "";
        selecedtDataRef.current.value = "";
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  //get data from database
  const fetchData = () => {
    return axios
      .get("http://localhost:5000/getInputInfo")
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="container main_body">
      <div className="row">
        <div className="col-md-6">
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
                <option value="">Select Your Sector</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Construction materials">
                  Construction materials
                </option>
                <option value="Electronics and Optics">
                  Electronics and Optics
                </option>
                <option value="Food and Beverage">Food and Beverage</option>
                <option value="Bakery confectionery products">
                  Bakery confectionery products
                </option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>

            <label htmlFor="terms" className="mt-4">
              <input type="checkbox" id="term" name="terms" value="false" />
              Agree to Terms
            </label>
            <br />
            <button type="submit" className="submit_btn">
              Submit
            </button>
            <p className="successMsg pt-3">{message}</p>
          </form>
        </div>

        <div className="col-md-6">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">Sector</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
