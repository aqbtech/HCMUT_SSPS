import { useState } from "react";
import StudentHeader from "../../components/StudentHeader";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import LoginFooter from "../../components/LoginFooter";
import "./../../styles/docs.css";

export default function UploadedDocs() {
    const [docs, setDocs] = useState([
        { id: 1, name: "Hướng dẫn sử dụng SAP", url: "/docs/sap-guide.pdf" },
        { id: 2, name: "Luật Giáo dục 2019", url: "/docs/education-law.pdf" },
        { id: 3, name: "Báo cáo tài chính Q1", url: "/docs/financial-report-q1.pdf" },
    ]);
    const navigate = useNavigate(); // Dùng để điều hướng

    const handleDownload = (url) => {
        // Simulate download
        alert(`Đang tải xuống tài liệu từ ${url}`);
    };

    const handleDelete = (docId) => {
        // Xóa tài liệu khỏi danh sách
        setDocs(docs.filter(doc => doc.id !== docId));
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
                                        <Button action={() => handleDownload(doc.url)}>Tải xuống</Button>
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
