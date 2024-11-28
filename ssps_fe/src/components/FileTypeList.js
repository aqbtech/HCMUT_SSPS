import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './../styles/table.css';
import ButtonIcon from "./ButtonIcon";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function FileTypeList(props) {
    const headers = [
        { name: 'Phần mở rộng', class: 'extension'},
    ];

    const fileTypes = [
        { id: '1', extension: '.pdf' },
        { id: '2', extension: '.docx' },
        { id: '3', extension: '.xlsx' },
        { id: '4', extension: '.pptx' },
        { id: '5', extension: '.txt' },
        { id: '6', extension: '.csv' },
        { id: '7', extension: '.jpg' },
        { id: '8', extension: '.png' },
        { id: '9', extension: '.gif' },
        { id: '10', extension: '.mp3' },
    ];

    return (
        <table className="table">
            <thead>
                <tr>
                    {headers.map(header => (
                        <th className={header.class} key={header.class}>{header.name}</th>
                    ))}   
                </tr>
            </thead>
            <tbody>
                {fileTypes.map((ftype) => {
                    return (
                        <tr key={ftype.id}>
                            <td>{ftype.extension}</td>
                            <td>
                                <ButtonIcon
                                    action={(e) => {
                                        if (window.confirm('Are you sure you want to delete this item?')) {
                                            props.removeFileType(ftype.id);
                                        } 
                                    }}
                                    className="delete"
                                >
                                    <FontAwesomeIcon icon={faTrashCan}/>
                                </ButtonIcon>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
