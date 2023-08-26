import { useEffect, useState } from "react";
import "./App.css";
import List from "./component/List";
import NavBar from "./component/NavBar";
import axios from "axios";
import baseUrl from "./config/url";
import Loading from "./component/Loading";

function App() {
  const [data, setData] = useState([]);
  const [length, setLength] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const allowedFileTypes = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!allowedFileTypes.includes(e.target.files[0].type)) {
      return alert("Only .csv and .XLSX files are allowed");
    }
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    setLoading(true);
    axios
      .post(baseUrl + "/file-upload", formData, config)
      .then(({ data: { data, length } }) => {
        setLoading(false);
        setData(data);
        setLength(length);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(baseUrl + "/get/all/users/1")
      .then(({ data: { data, length } }) => {
        setData(data);
        setLength(length);
      });
  }, []);

  return (
    <>
      <NavBar
        setData={setData}
        loading={loading}
        data={data}
        handleChange={handleChange}
      />
      {loading ? <Loading /> : <List data={data} length={length} />}
    </>
  );
}

export default App;
