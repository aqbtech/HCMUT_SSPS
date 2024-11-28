import { useState } from "react";
import StudentHeader from "../../components/StudentHeader";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import LoginFooter from "../../components/LoginFooter";
import "./../../styles/register-printer.css";

export default function RegisterPrinter() {
    const [printerModel, setPrinterModel] = useState(''); // Model máy in
    const [printerName, setPrinterName] = useState(''); // Tên máy in
    const [printerLocation, setPrinterLocation] = useState(''); // Vị trí máy in
    const [printerType, setPrinterType] = useState(''); // Loại máy in
    const navigate = useNavigate(); // Dùng để điều hướng sau khi đăng ký thành công

    const handleRegisterPrinter = () => {
        if (!printerModel || !printerName || !printerLocation || !printerType) {
            alert("Vui lòng điền đầy đủ thông tin máy in.");
            return;
        }

        console.log("Đăng ký máy in với thông tin:", { printerModel, printerName, printerLocation, printerType });
        alert("Đăng ký máy in thành công!");
        navigate('/printer-dashboard'); // Điều hướng sau khi đăng ký thành công
    };

    return (
        <>
            <StudentHeader />
            <div className="register-printer-page">
                <main>
                    <div className="register-info">
                        <h2>Đăng ký máy in</h2>
                        <div className="register-form">
                            <div className="form-group">
                                <label htmlFor="printer-model">Model máy in</label>
                                <input
                                    type="text"
                                    name="printer-model"
                                    id="printer-model"
                                    value={printerModel}
                                    onChange={(e) => setPrinterModel(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="printer-name">Tên máy in</label>
                                <input
                                    type="text"
                                    name="printer-name"
                                    id="printer-name"
                                    value={printerName}
                                    onChange={(e) => setPrinterName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="printer-location">Vị trí máy in</label>
                                <input
                                    type="text"
                                    name="printer-location"
                                    id="printer-location"
                                    value={printerLocation}
                                    onChange={(e) => setPrinterLocation(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="printer-type">Loại máy in</label>
                                <select
                                    name="printer-type"
                                    id="printer-type"
                                    value={printerType}
                                    onChange={(e) => setPrinterType(e.target.value)}
                                >
                                    <option value="">Chọn loại máy in</option>
                                    <option value="laser">Laser</option>
                                    <option value="inkjet">Inkjet</option>
                                    <option value="dot-matrix">Dot Matrix</option>
                                </select>
                            </div>
                            <Button action={handleRegisterPrinter}>Đăng ký</Button>
                        </div>
                    </div>
                </main>
            </div>
            <LoginFooter />
        </>
    );
}
