import scanImg from "../assets/Gif/scanning.gif";
import uploadImg from "../assets/Gif/file-upload.gif";

export default function Loading() {
  return (
    <div className="">
      <div className="d-flex justify-content-center">
        <img className="loading-gif" src={scanImg} alt="" />
      </div>
      <div className="d-flex justify-content-center">
        <img className="loading-gif" src={uploadImg} alt="" />
      </div>
    </div>
  );
}
