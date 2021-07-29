import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploadingFile } from "../../actions/notes";

export const NoteAppBar = () => {
    const dispatch = useDispatch();
    const { active } = useSelector((state) => state.notes);

    const handleSaveNote = () => {
        const note = { ...active };
        delete note.url;

        dispatch(startSaveNote(note));
    };

    const handlePictureClick = () => {
        document.querySelector("#fileSelector").click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        dispatch(startUploadingFile(file));
    };

    return (
        <div className="notes__appbar">
            <span>23 de Julio 2021</span>

            <input
                id="fileSelector"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

            <div>
                <button className="btn" onClick={handlePictureClick}>
                    Picture
                </button>
                <button className="btn" onClick={handleSaveNote}>
                    Save
                </button>
            </div>
        </div>
    );
};
