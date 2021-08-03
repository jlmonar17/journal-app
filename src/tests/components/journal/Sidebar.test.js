import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { Sidebar } from "../../../components/journal/Sidebar";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";
jest.mock("../../../actions/auth");
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
        active: null,
        notes: [],
    },
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

describe("Tests for <Sidebar />", () => {
    const wrapper = mount(
        <Provider store={store}>
            <Sidebar />
        </Provider>
    );

    test("Should render correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("Should call startLogout when press logout button", () => {
        wrapper.find("button").prop("onClick")();

        expect(startLogout).toHaveBeenCalled();
    });

    test("Should calll startNewNote when press button for new entry", () => {
        wrapper.find(".journal__new-entry").prop("onClick")();

        expect(startNewNote).toHaveBeenCalled();
    });
});
