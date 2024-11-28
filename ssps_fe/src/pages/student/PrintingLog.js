import { useEffect, useRef, useState } from "react";
import StudentHeader from "../../components/StudentHeader";
import { useAuth } from "../../contexts/AuthContext";
import "./../../styles/printing-log.css";
import moment from "moment";
import SearchBar from "../../components/SearchBar";
import { sendGetRequest } from "../../helpers/request";
export default function PrintingLog() {
    const { getUser } = useAuth();
    const [printingLogs, setPrintingLogs] = useState([]);
    const allPrintingLogs = useRef([]);

    useEffect(() => {
        const fetchLogs = async () => {
            const result = await sendGetRequest('/api/v1/log/all-logs', { page: 0, size: 10 });
            if (result && result.content) {
                const initLogs = result.content.map((log) => {
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
                            room: log.location.room,
                            building: log.location.building,
                            campus: log.location.campus
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
            } else {
                setPrintingLogs([]); // Ensure printingLogs is always an array
                allPrintingLogs.current = [];
            }
        };

        fetchLogs();
    }, []);

    const headers = [
        { name: "Ngày", value: "" },
        { name: "Tên file", value: "student" },
        { name: "Máy in", value: "printer" },
        { name: "Địa điểm", value: "start-time" },
        { name: "Số lượng bản copy", value: "end-time" },
        { name: "Loại giấy", value: "filename" },
        { name: "Giá thành", value: "page-num" },
        { name: "Trạng thái", value: "page-size" }
    ];

    function handleSearch(input) {
        const filteredLogs = allPrintingLogs.current.filter((log) => {
            return (
                log.fileName.toLowerCase().includes(input) || 
                log.printer.toLowerCase().includes(input) || 
                (log.location.room + log.location.building + ' - ' + log.location.campus).toLowerCase().includes(input) ||
                moment(log.date).format('DD/MM/YYYY hh:mm:ss').toLowerCase().includes(input) ||
                log.numberOfCopy.toString().toLowerCase().includes(input) ||
                log.pageType.toLowerCase().includes(input) ||
                log.layout.toLowerCase().includes(input) ||
                log.cost.toString().toLowerCase().includes(input) ||
                log.status.toLowerCase().includes(input)
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
                            printingLogs.map((log, index) => 
                                <tr key={index}>
                                    <td>{moment(log.date).format('DD/MM/YYYY hh:mm:ss')}</td>
                                    <td>{log.fileName}</td>
                                    <td>{log.printer}</td>
                                    <td>{log.location.campus}</td>
                                    <td>{log.location.building}</td>
                                    <td>{log.location.room}</td>
                                    <td>{log.numberOfCopy}</td>
                                    <td>{log.pageType}</td>
                                    <td>{log.layout}</td>
                                    <td>{log.cost}</td>
                                    <td>{log.status}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </main>
        </div>
    );
}
