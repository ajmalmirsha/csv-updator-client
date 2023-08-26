import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Pagination from "./Pagination";
import { BiSolidEdit } from "react-icons/bi";
import { FcDownload } from "react-icons/fc";
import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import baseUrl from "../config/url";
import { InputText } from "primereact/inputtext";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
export default function Table({ data, length }) {
  const [products, setProducts] = useState(data);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [modalData, setModalData] = useState(null);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    axios
      .get(baseUrl + `/get/all/users/${event.first}`)
      .then(({ data: { data, length } }) => {
        setProducts(data);
      });
  };

  useEffect(() => {
    axios.get(baseUrl + "/get/all/agents").then(({ data: { data } }) => {
      setAgents(data);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(baseUrl + "/edit/info", modalData)
      .then(({ data: { data, message } }) => {
        setProducts(data);
      });
  }

  const reject = () => {
    // toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  };
  const confirm = (data) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        axios
          .delete(baseUrl + "/delete/document/" + data._id + "/" + first)
          .then(() => {
            const result = products.filter(
              (x) => x._id.toString() !== data._id.toString()
            );
            setProducts(result);
          });
      },
      reject,
    });
  };

  return (
    <div className="card">
      {products && products.length > 0 && (
        <>
          <DataTable
            value={products}
            showGridlines
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column
              style={{ width: "5px" }}
              field="userType"
              header="Active"
              body={(rowData) => {
                return (
                  <>
                    <span>
                      <GoDotFill
                        color={
                          rowData.userType == "Active Client"
                            ? "green"
                            : "black"
                        }
                      />
                    </span>
                  </>
                );
              }}
            ></Column>
            <Column field="firstname" header="firstname"></Column>
            <Column field="agentId.agent" header="agent"></Column>
            <Column field="email" header="email"></Column>
            <Column
              field="accountId.premium_amount"
              header="premium_amount"
            ></Column>
            <Column field="dob" header="dob"></Column>
            <Column
              body={(rowData) => {
                return (
                  <div className="d-flex justify-content-around ">
                    <BiSolidEdit
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        setModalData(rowData);
                      }}
                    />{" "}
                    {/* <FcDownload className="" /> */}
                    <MdDelete onClick={() => confirm(rowData)} />
                  </div>
                );
              }}
              header={"Actions"}
            >
              {" "}
              <ConfirmDialog />
            </Column>
          </DataTable>
          <Pagination
            length={length}
            first={first}
            rows={rows}
            onPageChange={onPageChange}
          />
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    id="modal-close"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body p-4 ">
                  {modalData && (
                    <form onSubmit={handleSubmit}>
                      <div className=" row">
                        <span className="p-float-label col-md-6 mt-4">
                          <InputText
                            name="firstname"
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                [e.target.name]: e.target.value,
                              })
                            }
                            value={modalData?.firstname}
                            id="firstname"
                          />
                          <label htmlFor="firstname" className="ms-2">
                            Firstname
                          </label>
                        </span>
                        <span className="p-float-label col-md-6 mt-4">
                          <InputText
                            name="email"
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                [e.target.name]: e.target.value,
                              })
                            }
                            value={modalData?.email}
                            id="email"
                          />
                          <label htmlFor="email" className="ms-2">
                            Email
                          </label>
                        </span>
                        <span className="p-float-label col-md-6 mt-4">
                          <InputText
                            name="premium_amount"
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                accountId: {
                                  ...modalData.accountId,
                                  [e.target.name]: e.target.value,
                                },
                              })
                            }
                            value={modalData?.accountId.premium_amount}
                            id="premium_amount"
                          />
                          <label htmlFor="premium_amount" className="ms-2">
                            Premium_amount
                          </label>
                        </span>
                        <span className="p-float-label col-md-6 mt-4">
                          <InputText
                            name="dob"
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                [e.target.name]: e.target.value,
                              })
                            }
                            value={modalData?.dob}
                            id="dob"
                          />
                          <label htmlFor="dob" className="ms-2">
                            DOB
                          </label>
                        </span>
                        <span className="p-float-label col-md-6 mt-4">
                          <InputText
                            name="company_name"
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                [e.target.name]: e.target.value,
                              })
                            }
                            value={modalData?.company_name}
                            id="company_name"
                          />
                          <label htmlFor="company_name" className="ms-2">
                            company_name
                          </label>
                        </span>
                        <span className="p-float-label col-md-6 mt-4">
                          <InputText
                            name="address"
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                [e.target.name]: e.target.value,
                              })
                            }
                            value={modalData?.address}
                            id="address"
                          />
                          <label htmlFor="address" className="ms-2">
                            address
                          </label>
                        </span>
                        <span className="p-float-label col-md-6 mt-4">
                          <InputText
                            name="phone"
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                [e.target.name]: e.target.value,
                              })
                            }
                            value={modalData?.phone}
                            id="phone"
                          />
                          <label htmlFor="phone" className="ms-2">
                            Phone
                          </label>
                        </span>
                        <span className="p-float-label col-md-6 mt-4">
                          <InputText
                            name="account_name"
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                accountId: {
                                  ...modalData.accountId,
                                  [e.target.name]: e.target.value,
                                },
                              })
                            }
                            value={modalData?.accountId?.account_name}
                            id="account_name"
                          />
                          <label htmlFor="account_name" className="ms-2">
                            account_name
                          </label>
                        </span>
                        <span className="p-float-label col-md-6 mt-4">
                          <select
                            name="agent"
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                [e.target.name]: e.target.value,
                              })
                            }
                            className="form-select"
                            id="agent"
                            aria-label="Default select example"
                          >
                            <option selected>
                              agent - {modalData?.agentId?.agent}
                            </option>
                            {agents.length > 0 &&
                              agents.map((x) => {
                                return (
                                  <option value={x.agent}>{x.agent}</option>
                                );
                              })}
                          </select>
                        </span>
                        <span className="p-float-label col-md-6 mt-4">
                          <select
                            name="policy_mode"
                            onChange={(e) => {
                              setModalData({
                                ...modalData,
                                policyId: {
                                  ...modalData.policyId,
                                  [e.target.name]: e.target.value,
                                },
                              });
                            }}
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>
                              policy_mode - {modalData?.policyId?.policy_mode}
                            </option>
                            <option value="6">6</option>
                            <option value="12">12</option>
                          </select>
                        </span>
                      </div>
                      <div className="p-3 d-flex justify-content-center py-4">
                        <button
                          type="submit"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          className="btn btn-success"
                        >
                          Edit
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
