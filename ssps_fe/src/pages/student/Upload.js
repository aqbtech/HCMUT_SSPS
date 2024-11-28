import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Cookies from 'js-cookie';
import StudentHeader from "../../components/StudentHeader";
import Button from "../../components/Button";
import LoginFooter from "../../components/LoginFooter";
import sendRequest, { sendGetRequest } from '../../helpers/request'; // Adjust the import path as needed
import "./../../styles/Upload.css";

export default function Upload() {
    const [docs, setDocs] = useState([]);

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

    const onDrop = useCallback((acceptedFiles) => {
        const token = Cookies.get('TOKEN');
        const formData = new FormData();
        acceptedFiles.forEach(file => {
            formData.append('file', file);
        });

        sendRequest('POST', '/api/v1/document/upload', formData)
        .then(response => {
            // Handle successful upload
            console.log('File uploaded successfully:', response);
            setDocs([...docs, response]);
        })
        .catch(error => {
            // Handle upload error
            console.error('File upload failed:', error);
            alert('File upload failed');
        });
    }, [docs]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
                    <div className="upload-box" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag & drop files here, or click to select files</p>
                    </div>
                    
                </main>
            </div>
            <LoginFooter />
        </>
    );
}