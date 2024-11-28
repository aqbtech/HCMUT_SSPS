import { useState } from "react";
import StudentHeader from "../../components/StudentHeader";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import LoginFooter from "../../components/LoginFooter";
import "./../../styles/register-printer.css";
import sendRequest from "../../helpers/request";

export default function RegisterPrinter() {
    const [docsId, setDocsId] = useState(''); // Docs ID
    const [printDeviceId, setPrintDeviceId] = useState(''); // Print Device ID
    const [paperSize, setPaperSize] = useState('A4'); // Paper Size
    const [numberOfCopies, setNumberOfCopies] = useState(1); // Number of Copies
    const [pageRange, setPageRange] = useState('1-3'); // Page Range
    const [pageType, setPageType] = useState('single'); // Page Type
    const [layout, setLayout] = useState('portrait'); // Layout
    const navigate = useNavigate(); // Dùng để điều hướng sau khi đăng ký thành công

    const handleRegisterPrinter = async () => {
        if (!docsId || !printDeviceId || !paperSize || !numberOfCopies || !pageRange || !pageType || !layout) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const requestBody = {
            docsId: parseInt(docsId),
            printDeviceId: parseInt(printDeviceId),
            paperSize: paperSize,
            numberOfCopies: numberOfCopies,
            pageRange: pageRange,
            pageType: pageType,
            layout: layout
        };

        try {
            const response = await sendRequest('POST', '/api/v1/print', requestBody);
            console.log('Printer registered successfully:', response);
            alert('Printer registered successfully');
            navigate('/printer-dashboard'); // Điều hướng sau khi đăng ký thành công
        } catch (error) {
            console.error('Printer registration failed:', error);
            alert('Printer registration failed');
        }
    };

    return (
        
                <>
            <StudentHeader />
            <div className="register-printer-page">
                <main>
                    <div className="form-container">
                        <div className="form-group">
                            <label htmlFor="docs-id">Docs ID</label>
                            <input
                                type="text"
                                name="docs-id"
                                id="docs-id"
                                value={docsId}
                                onChange={(e) => setDocsId(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="print-device-id">Print Device ID</label>
                            <input
                                type="text"
                                name="print-device-id"
                                id="print-device-id"
                                value={printDeviceId}
                                onChange={(e) => setPrintDeviceId(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="paper-size">Paper Size</label>
                            <select
                                name="paper-size"
                                id="paper-size"
                                value={paperSize}
                                onChange={(e) => setPaperSize(e.target.value)}
                            >
                                <option value="A4">A4</option>
                                <option value="A3">A3</option>
                                <option value="Letter">Letter</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="number-of-copies">Number of Copies</label>
                            <input
                                type="number"
                                name="number-of-copies"
                                id="number-of-copies"
                                value={numberOfCopies}
                                onChange={(e) => setNumberOfCopies(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="page-range">Page Range</label>
                            <input
                                type="text"
                                name="page-range"
                                id="page-range"
                                value={pageRange}
                                onChange={(e) => setPageRange(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="page-type">Page Type</label>
                            <select
                                name="page-type"
                                id="page-type"
                                value={pageType}
                                onChange={(e) => setPageType(e.target.value)}
                            >
                                <option value="single">Single</option>
                                <option value="double">Double</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="layout">Layout</label>
                            <select
                                name="layout"
                                id="layout"
                                value={layout}
                                onChange={(e) => setLayout(e.target.value)}
                            >
                                <option value="portrait">Portrait</option>
                                <option value="landscape">Landscape</option>
                            </select>
                        </div>
                        <Button action={handleRegisterPrinter}>Đăng ký</Button>
                    </div>
                </main>
            </div>
            <LoginFooter />
        </>
    );
}
