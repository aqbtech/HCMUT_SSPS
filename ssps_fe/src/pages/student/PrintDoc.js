import { useState,useEffect } from "react";
import StudentHeader from "../../components/StudentHeader";
import Button from "../../components/Button";
import { sendGetRequest} from "../../helpers/request";
import  sendRequest from "../../helpers/request";
import { useNavigate } from "react-router-dom";
import LoginFooter from "../../components/LoginFooter";
import "./../../styles/docs.css";

export default function UploadedDocs() {
    const [docs, setDocs] = useState([]);
    const navigate = useNavigate(); // Dùng để điều hướng

     useEffect(() => {
        const fetchDocs = async () => {
            const result = await sendGetRequest('/api/v1/document/all-documents', { page: 0, size: 10 });
            if (result) {
                setDocs(result);
            } else {
                setDocs([]); // Ensure docs is always an array
            }
        };

        fetchDocs();
    }, []);

    const handleDelete = async (docId) => {
        const result = await sendRequest('DELETE', `/api/v1/document/delete?id=${docId}`, null);
        if (result) {
            setDocs(docs.filter(doc => doc.id !== docId));
        }
    };

    return (
        <>
            <StudentHeader />
            <div className="uploaded-docs-page">
                <main>
                    <div className="docs-list">
                        <h2>Tài liệu đã tải lên</h2>
                        <ul className="docs">
                            {docs.map((doc) => (
                                <li key={doc.id} className="doc-item">
                                    <div className="doc-name">
                                        <strong>{doc.name}</strong>
                                    </div>
                                    <div className="doc-actions">
                                        <Button action={() => handleDelete(doc.id)}>Xóa</Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </main>
            </div>
            <LoginFooter />
        </>
    );
}
