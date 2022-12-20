import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [datas, setDatas] = useState([]);
  const [term, setTerm] = useState(false);

  const nameRef = useRef();
  const selecedtDataRef = useRef();

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const info = {
      name: nameRef.current.value,
      selecedtData: selecedtDataRef?.current?.value,
      terms: term,
    };

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
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  //get data from database
  const fetchData = () => {
    return axios
      .get("http://localhost:5000/getInputData")
      .then((response) => setDatas(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

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

            <div className="form-check mt-4">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                onClick={() => setTerm(!term)}
              />
              <label className="form-check-label" for="flexCheckDefault">
                Agree to Terms
              </label>
            </div>

            <br />
            {term === false ? (
              <button
                type="submit"
                className="submit_btn"
                disabled
                title="Tap to the agree checkbox"
              >
                Submit
              </button>
            ) : (
              <button type="submit" className="submit_btn">
                Submit
              </button>
            )}
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
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={data._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data?.name}</td>
                  <td>{data?.selecedtData}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
