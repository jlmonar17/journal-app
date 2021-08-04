import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { JournalEntry } from "../../../components/journal/JournalEntry";
import { activeNote } from "../../../actions/notes";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// We set initial state desired for Redux state.
const initialState = {};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const note = {
    id: 1,
    title: "Hello",
    body: "World",
    date: 0,
    url: "https://test-image.com/image.jpg",
};

describe("Tests for <JournalEntry />", () => {
    const wrapper = mount(
        <Provider store={store}>
            <JournalEntry {...note} />
        </Provider>
    );

    test("Should render correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("Should active note", () => {
        wrapper.find(".journal__entry").prop("onClick")();

        expect(store.dispatch).toHaveBeenCalledWith(activeNote(note.id, note));
    });
});
