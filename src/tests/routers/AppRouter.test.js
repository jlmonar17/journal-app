import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "../../routers/AppRouter";
import { firebase } from "../../firebase/firebase-config";
import { act } from "@testing-library/react";

import { login } from "../../actions/auth";
jest.mock("../../actions/auth");
// jest.mock("../../actions/auth", () => ({ login: jest.fn() }));
// jest.mock("../../actions/auth", () => ({
//     __esModule: true,
//     login: jest.fn(),
// }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// We set initial state desired for Redux state.
const initialState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null,
    },
    notes: {
        active: {
            id: "abc",
        },
        notes: [],
    },
};

let store = mockStore(initialState);
// Simulate execution of dispatch, no matter how and with what parameters
store.dispatch = jest.fn();

describe("Tests for <AppRouter />)", () => {
    let user;

    test("Should call login if there is an authentication", async () => {
        await act(async () => {
            // It should execute useEffect on AppRouter because we are cnahging state of authentication.
            const userCred = await firebase
                .auth()
                .signInWithEmailAndPassword("test@testing.com", "123456");
            user = userCred.user;

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );

            console.log(wrapper.html());

            // TODO pending for test, waiting for answer to problem in Udemy course
            // After authentication change, we expect that login was dispatched, because
            // we are using valid credentials for authentication
            // expect(login).toHaveBeenCalled();
        });
    });
});
