import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import {
    login,
    logout,
    smartLoginEmailPassword,
    startLogout,
} from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// We set initial state desired for Redux state.
const initialState = {};
let store = mockStore(initialState);

describe("Tests for auth.js", function () {
    beforeEach(() => {
        store = mockStore(initialState);
    });

    test("login and logout should fire respectively action", () => {
        const uid = "abc";
        const displayName = "José";

        const resultLogin = login(uid, displayName);

        expect(resultLogin).toEqual({
            type: types.login,
            payload: {
                uid: uid,
                displayName: displayName,
            },
        });

        const resultLogout = logout();
        expect(resultLogout).toEqual({ type: types.logout });
    });

    test("Should logout", async () => {
        await store.dispatch(startLogout());
        const actions = store.getActions();

        // We expect if specifics actions were fired.
        expect(actions[0]).toEqual({
            type: types.logout,
        });

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning,
        });
    });

    test("Should login with email and password", async () => {
        await store.dispatch(
            smartLoginEmailPassword("test@testing.com", "123456")
        );
        const actions = store.getActions();

        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: "ManraTNEaohoJjOR8LnWBYi5Mia2",
                displayName: null,
            },
        });
    });
});
