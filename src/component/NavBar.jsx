import axios from "axios";
import { AiOutlineCloudUpload,AiOutlineClear } from "react-icons/ai";
import baseUrl from "../config/url";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from "primereact/button";
import Download from '../assets/Gif/download-crop.gif'
export default function NavBar({ handleChange, data, loading, setData }) {
  const accept = () => {
    axios.delete(baseUrl + '/clear').then(()=>{
          setData([])
    })
}

const reject = () => {}

  const confirm2 = () => {
    confirmDialog({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptClassName: 'p-button-danger',
        accept,
        reject
    });
};

// const handleDownload = async () => {
//   const jsonData = await axios.get(baseUrl + '/get/all/documents')
//   const csvString = JSON.stringify(jsonData, null, 2); 

// const blob = new Blob([csvString], { type: 'text/csv' });

// const url = window.URL.createObjectURL(blob);

// const a = document.createElement('a');
// a.href = url;
// a.download = 'data.csv';

// document.body.appendChild(a);
// }

  return (
    <nav className="nav-bar m-4 p-3 row">
      <div className="col-md-8 text-white fw-bold"> if you want demo csv file <a download={true} href="../../public/data-sheet.csv">download</a></div>
      
      <div className="col-md-4">
        { data.length < 1 ?
        <label
        htmlFor={loading ? null : "file-input"}
        disabled={loading}
          type="button"
          className={`btn btn-light float-end ${loading && 'button-disabled'} `}
        >
          <AiOutlineCloudUpload size={25} /> Upload file
        </label> :
        <>
         <ConfirmDialog />
      <button onClick={confirm2} className="btn btn-danger float-end mx-2 " ><AiOutlineClear/> delete</button>
      {/* <button onClick={handleDownload} className="btn btn-success float-end " > <img id="download-icon" src={Download} alt="" /> Download</button> */}
        </>
         }
        <input onChange={handleChange} id="file-input" type="file" hidden />
      </div>
    </nav>
  );
}
