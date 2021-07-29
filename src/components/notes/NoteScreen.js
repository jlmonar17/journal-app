import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NoteAppBar } from "./NoteAppBar";

export const NoteScreen = () => {
    const dispatch = useDispatch();

    const { active: note } = useSelector((state) => state.notes);
    const { formValues, handleInputChange, reset } = useForm(note);

    // useRef returns a ref object mutable, and the property .current will be initialized with argument
    // passed (initialValue). Object returned will keep persistent during all component lifecycle
    // useRef keeps the variable mutable and wont rerender component if value changes.
    const activeId = useRef(note.id);

    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note);

            // It will be executed only if active note changes.
            // We change .current property of mutable object, it won't cause component re render.
            activeId.current = note.id;
        }
    }, [note, reset]);

    useEffect(() => {
        dispatch(activeNote(formValues.id, { ...formValues }));
    }, [formValues, dispatch]);

    const { title, body } = formValues;

    return (
        <div className="notes__main-content">
            <NoteAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today?"
                    className="notes__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {note.url && (
                    <div className="notes__image">
                        <img src={note.url} alt="note" />
                    </div>
                )}
            </div>
        </div>
    );
};
