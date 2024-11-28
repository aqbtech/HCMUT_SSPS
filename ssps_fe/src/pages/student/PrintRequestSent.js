import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../../styles/print-request-sent.css";
import Button from "../../components/Button";
import { useState } from "react";

export default function PrintRequestSent() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            // Handle file upload logic here
            console.log("File selected:", selectedFile);
        } else {
            alert("Please select a file to upload.");
        }
    };

    return (
        <div className="print-request-sent">
            <FontAwesomeIcon icon={faCheckCircle} size="6x" color="#4BD396" />
            <h1>Yêu cầu in được gửi thành công</h1>
            <Button link="/">
                Trang chủ
            </Button>
            <div className="upload-box">
                <input type="file" onChange={handleFileChange} />
                <Button action={handleUpload}>
                    Upload File
                </Button>
            </div>
        </div>
    );
}