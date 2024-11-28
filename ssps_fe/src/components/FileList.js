import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "nanoid";
import "./../styles/file-list.css";
import { useEffect, useState } from "react";
import { sendGetRequest } from "../helpers/request";
import { useAuth } from "../contexts/AuthContext";
import dump, { dumpObject } from "../helpers/dump";
import ButtonIcon from "./ButtonIcon";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export default function FileList(props) {
    const { getUser } = useAuth();

    // Hàm hiển thị thông tin chi tiết
    function showInfo(e) {
        const fileId = e.currentTarget.parentNode.parentNode.id;
        let infoElement = document.querySelector('#' + fileId + ' div.info');
        
        if (infoElement.classList.contains('hidden')) {
            infoElement.classList.remove('hidden');
        } else {
            infoElement.classList.add('hidden');
        }
    }

    // Hàm xóa file
    function handleDelete(e) {
        props.removeFile(e.currentTarget.parentNode.parentNode.id);
    }

    // Render danh sách file với bảo vệ
    const fileList = props.files.map((file) => {
        // Bảo vệ các giá trị undefined trong config
        const numCopies = file.config?.numCopies || 1;
        const pageSize = file.config?.pageSize || "A4";
        const isDoubleSided = file.config?.isDoubleSided ? "In hai mặt" : "In một mặt";
        const isLandscape = file.config?.isLandscape ? "Ngang" : "Dọc";
        const pageNum = file.config?.pageNum || 1;

        return (
            <li key={file.id} id={file.id}>
                <a href="javascript:void(0)" className="file-item"
                    onClick={() => { 
                        props.handleSelect(file); 
                    }}>
                    <div className="file-detail">
                        <p className="filename">{file.name}</p>
                        <div className="info hidden">
                            <ul>
                                <li>Kích thước: {(file.size / 1048576).toFixed(2)} MB</li>
                                <li>Loại file: {file.type}</li>
                                <li>Số bản: {numCopies}</li>
                                <li>Khổ giấy: {pageSize}</li>
                                <li>{isDoubleSided}</li>
                                <li>Hướng trang: {isLandscape}</li>
                                <li>Số trang in: {pageNum}</li>
                            </ul>
                        </div>
                    </div>
                    <ButtonIcon action={showInfo}>
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </ButtonIcon>
                    <ButtonIcon
                        className="delete"
                        action={handleDelete}
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </ButtonIcon>
                </a>
            </li>
        );
    });

    return (
        <div className="file-list"> 
            <ul className="list">
                {fileList}
            </ul>
        </div>
    );
}
