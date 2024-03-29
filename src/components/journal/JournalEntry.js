import moment from "moment";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";

export const JournalEntry = ({ id, title, body, date, url }) => {
    const dispatch = useDispatch();
    const noteDate = moment(date);

    const handleEntryClick = () => {
        const note = {
            id,
            title,
            body,
            date,
            url,
        };

        dispatch(activeNote(id, note));
    };

    return (
        <div
            className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
            onClick={handleEntryClick}
        >
            {url && (
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: "cover",
                        backgroundImage: `url(${url})`,
                        backgroundPosition: "center",
                    }}
                ></div>
            )}

            <div className="journal__entry-body">
                <p className="journal__entry-title">{title}</p>

                <p className="journal__entry-content">{body}</p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format("dddd")}</span>
                <h4>{noteDate.format("Do")}</h4>
            </div>
        </div>
    );
};
