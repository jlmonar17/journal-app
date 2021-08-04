import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { activeNote } from "../../../actions/notes";
import { NoteScreen } from "../../../components/notes/NoteScreen";
jest.mock("../../../actions/notes");

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// We set initial state desired for Redux state.
const initialState = {
    auth: {
        uid: "123abc",
        name: "José",
    },
    ui: {
        loading: false,
        msgError: null,
    },
    notes: {
        active: {
            id: 123,
            title: "Hello",
            body: "World",
            date: 0,
        },
        notes: [],
    },
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

describe("Tests for <NoteScreen />", () => {
    const wrapper = mount(
        <Provider store={store}>
            <NoteScreen />
        </Provider>
    );

    test("Should render correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("Should dispatch activeNote when value of title's note changes", () => {
        wrapper.find("input[name='title']").simulate("change", {
            target: {
                name: "title",
                value: "Hello world again",
            },
        });

        // activeNote is executed two times, first ecetution occurs when form is created the first time,
        // and it is executed again when in put value changes, for that reason whe use toHaveBeenLastCalledWith,
        // because we need to know with what arguments activeNote was executed in the last calling.
        expect(activeNote).toHaveBeenLastCalledWith(123, {
            id: 123,
            title: "Hello world again",
            body: "World",
            date: 0,
        });
    });
});
