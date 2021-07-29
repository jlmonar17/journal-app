import { useDispatch, useSelector } from "react-redux";
import { startSaveNote } from "../../actions/notes";

export const NoteAppBar = () => {
    const dispatch = useDispatch();
    const { active } = useSelector((state) => state.notes);

    const handleSaveNote = () => {
        const note = { ...active };
        delete note.url;

        console.log(note);

        dispatch(startSaveNote(note));
    };

    return (
        <div className="notes__appbar">
            <span>23 de Julio 2021</span>

            <div>
                <button className="btn">Picture</button>
                <button className="btn" onClick={handleSaveNote}>
                    Save
                </button>
            </div>
        </div>
    );
};
