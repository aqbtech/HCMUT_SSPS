import { useEffect, useRef, useState } from "react";
import StudentHeader from "../../components/StudentHeader";
import { useAuth } from "../../contexts/AuthContext";
import "./../../styles/printing-log.css";
import moment from "moment";
import SearchBar from "../../components/SearchBar";

export default function PrintingLog() {
    const { getUser } = useAuth();
    const [printingLogs, setPrintingLogs] = useState([]);
    const allPrintingLogs = useRef([]);

    // Mock data
    const mockData = [
        {
            student: { studentId: "123456", firstName: "Nguyen", lastName: "A" },
            printer: { room: "Room 101", building: "Building A", campus: "HCMUT" },
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            fileName: "Document 1.pdf",
            fileConfig: { pageNum: 10, pageSize: "A4" }
        },
        {
            student: { studentId: "789012", firstName: "Tran", lastName: "B" },
            printer: { room: "Room 102", building: "Building B", campus: "HCMUT" },
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            fileName: "Document 2.pdf",
            fileConfig: { pageNum: 5, pageSize: "A4" }
        }
    ];

    // Sử dụng mock data thay vì gọi API
    useEffect(() => {
        // Giả lập việc lấy dữ liệu từ API
        const initLogs = mockData.map((log) => {
            return {
                fileName: log.fileName,
                fileSize: log.size,
                fileConfig: {
                    pageNum: log.fileConfig.pageNum,
                    numCopies: log.numCopies,
                    isLandscape: log.isLandscape,
                    isDoubleSided: log.isDoubleSided,
                    pageSize: log.fileConfig.pageSize
                },
                startTime: new Date(log.startTime).toUTCString(),
                endTime: new Date(log.endTime).toUTCString(),
                printArea: log.squarePrinting,
                printer: {
                    room: log.printer.room,
                    building: log.printer.building,
                    campus: log.printer.campus
                },
                student: {
                    studentId: log.student.studentId,
                    firstName: log.student.firstName,
                    lastName: log.student.lastName
                }
            };
        });
        setPrintingLogs(initLogs);
        allPrintingLogs.current = initLogs;
    }, []);

    const headers = [
        { name: "MSSV", value: "student-id" },
        { name: "Tên SV", value: "student" },
        { name: "Máy in", value: "printer" },
        { name: "Thời gian bắt đầu", value: "start-time" },
        { name: "Thời gian hoàn thành", value: "end-time" },
        { name: "Tên file", value: "filename" },
        { name: "Số trang", value: "page-num" },
        { name: "Khổ giấy", value: "page-size" }
    ];

    function handleSearch(input) {
        const filteredLogs = allPrintingLogs.current.filter((log) => {
            return (
                log.student.studentId.toString().toLowerCase().includes(input) || 
                log.student.firstName.toLowerCase().includes(input) || 
                (log.printer.room + log.printer.building + ' - ' + log.printer.campus).toLowerCase().includes(input) ||
                moment(log.startTime).format('DD/MM/YYYY hh:mm:ss').toLowerCase().includes(input) ||
                moment(log.endTime).format('DD/MM/YYYY hh:mm:ss').toLowerCase().includes(input) ||
                log.fileName.toLowerCase().includes(input) ||
                log.fileConfig.pageNum.toString().toLowerCase().includes(input) ||
                log.fileConfig.pageSize.toLowerCase().includes(input)
            );
        });
        setPrintingLogs(filteredLogs);
    }

    return (
        <div className="printing-log">
            <StudentHeader />
            <main>
                <div className="util">
                    <SearchBar handleSearch={handleSearch}/>    
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            {headers.map((header) => 
                                <th key={header.value} className={header.value}>{header.name}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            printingLogs.map((log) => 
                                <tr key={log.student.studentId}>
                                    <td>{log.student.studentId}</td>
                                    <td>{log.student.firstName}</td>
                                    <td>{log.printer.room + ' ' + log.printer.building + ' - ' + log.printer.campus}</td>
                                    <td>{moment(log.startTime).format('DD/MM/YYYY hh:mm:ss')}</td>
                                    <td>{moment(log.endTime).format('DD/MM/YYYY hh:mm:ss')}</td>
                                    <td>{log.fileName}</td>
                                    <td>{log.fileConfig.pageNum}</td>
                                    <td>{log.fileConfig.pageSize}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </main>
        </div>
    );
}
