import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { addNewSong } from "../../features/songSlice";
import closeIcon from "../../assets/icons8-close-50.png";

export const UploadForm = ({ onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch()
    const [song, setSong] = useState("")
    const [type, setType] = useState("")

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedFile) {
            dispatch(addNewSong(selectedFile));
        }
        onClose(false)
    };

    useEffect(() => {
        if (selectedFile) {
            handleSong();
        }
    }, [selectedFile]);


    const handleSong = () => {
        const songg = selectedFile.name
        const parts = songg.split(' - ');
        const typeName = (parts[0].split(".")[1])
        const type = typeName && "." + typeName
        const fullName = parts && (parts[0].split(".")[0])
        setSong(fullName)
        setType(type)
    }


    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <span
                    onClick={() => onClose(false)}
                    className={styles.closeIcon}
                >
                    <img src={closeIcon} alt="" />
                </span>
                <form onSubmit={handleSubmit} className={styles.uploadForm}>
                    <label className={styles.inputContainer}>
                        Choose file
                        <input
                            type="file"
                            id="fileInput"
                            accept="audio/mp3, audio/wav"
                            onChange={handleFileChange}
                            className={styles.fileInput}
                        />

                    </label>

                    <div className={styles.song}>
                        <div className={styles.name}>
                            <span>{song}</span>
                        </div>
                        <div className={styles.type}>
                            <span>{type}</span>
                        </div>
                    </div>
                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    )
}