import React from "react";
import Table from "./Table";
import empty from "../assets/Gif/empty.gif";

export default function List({ data, length }) {
  return (
    <div className="card m-4 p-3">
      {data.length ? (
        <Table data={data} length={length} />
      ) : (
        <label htmlFor="file-input">
          <div className="d-flex justify-content-center">
            <img id="empty-img col-md-12 " src={empty} alt="" />{" "}
          </div>
          <label className="d-block text-center" htmlFor="">
            Click here to upload file
          </label>
        </label>
      )}
    </div>
  );
}
