export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div
                className="journal__entry-picture"
                style={{
                    backgroundSize: "cover",
                    backgroundImage:
                        "url(https://iso.500px.com/wp-content/uploads/2014/07/big-one.jpg)",
                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">Un nuevo dia</p>

                <p className="journal__entry-content">
                    Lorem ipsum dolor sit amet
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>22</h4>
            </div>
        </div>
    );
};
