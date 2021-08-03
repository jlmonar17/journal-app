import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { MemoryRouter } from "react-router-dom";
import {
    smartLoginEmailPassword,
    startGoogleLogin,
} from "../../../actions/auth";
// Now we can simulate execution of startGoogleLogin
jest.mock("../../../actions/auth");

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// We set initial state desired for Redux state.
const initialState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null,
    },
};

let store = mockStore(initialState);
// Simulate execution of dispatch, no matter how and with what parameters
store.dispatch = jest.fn();

describe("Tests for <LoginScreen />", function () {
    beforeEach(() => {
        store = mockStore(initialState);
        jest.clearAllMocks();
    });

    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <LoginScreen />
            </MemoryRouter>
        </Provider>
    );

    test("Should render correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("Should dispatch startGoogleLogin function", () => {
        wrapper.find(".google-btn").prop("onClick")();

        // Expect that  startGoogleLogin have been called
        expect(startGoogleLogin).toHaveBeenCalled();
    });

    test("smartLoginEmailPassword should  be called with respectively arguments", () => {
        // wrapper.find("form").simulate("submit", { preventDefault: () => {} });
        wrapper.find("form").prop("onSubmit")({ preventDefault() {} });

        expect(smartLoginEmailPassword).toHaveBeenCalledWith("", "");
    });
});
