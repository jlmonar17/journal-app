import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { MemoryRouter } from "react-router-dom";
import { types } from "../../../types/types";

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

describe("Tests for <RegisterScreen />", () => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <RegisterScreen />
            </MemoryRouter>
        </Provider>
    );

    test("Should render correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("Should dispatch setError when trying to register with empty email", () => {
        const emailField = wrapper.find("input[name='email']");

        // Set empty string to email field
        emailField.simulate("change", {
            target: {
                value: "",
                name: "email",
            },
        });

        // Simulate form submit
        wrapper.find("form").simulate("submit", { preventDefault() {} });

        // Get all dispatched actions
        const actions = store.getActions();

        // We expect setError action was dispatched
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: "Email is not valid",
        });
    });

    test("Should show div error when there is an error during register", () => {
        const initialState = {
            auth: {},
            ui: {
                loading: false,
                // We specified an error message to simulate div with error in the wrapper
                msgError: "There is an error!",
            },
        };

        const store = mockStore(initialState);

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find(".auth__alert-error").exists()).toBe(true);
        expect(wrapper.find(".auth__alert-error").text().trim()).toBe(
            initialState.ui.msgError
        );
    });
});
