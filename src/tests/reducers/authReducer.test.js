import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("Tests for authReducer", () => {
    test("Shoul return state with uid and displayName when using login type", () => {
        const action = {
            type: types.login,
            payload: {
                uid: "12345",
                displayName: "José",
            },
        };

        const state = authReducer({}, action);

        expect(state).toEqual({
            uid: "12345",
            name: "José",
        });
    });

    test("Should return an emty state when using logout type", () => {
        const state = authReducer(
            {},
            {
                type: types.logout,
            }
        );

        expect(state).toEqual({});
    });

    test("should return initial state when using invalid type", () => {
        const initialState = {
            uid: 2345,
            displayName: "José",
        };
        const state = authReducer(initialState, {
            type: "invalid type",
        });

        console.log(state);

        expect(state).toEqual(initialState);
    });
});
