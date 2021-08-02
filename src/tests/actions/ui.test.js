import {
    finishLoading,
    removeError,
    setError,
    startLoading,
} from "../../actions/ui";
import { types } from "../../types/types";

describe("Tests for ui-actions", () => {
    test("All functions should work", () => {
        const error = "There is an error!!!";

        const action = setError(error);

        expect(action).toEqual({
            type: types.uiSetError,
            payload: error,
        });

        const removeErrorAction = removeError();
        const startLoadingAction = startLoading();
        const finishLoadingAction = finishLoading();

        expect(removeErrorAction).toEqual({ type: types.uiRemoveError });
        expect(startLoadingAction).toEqual({ type: types.uiStartLoading });
        expect(finishLoadingAction).toEqual({ type: types.uiFinishLoading });
    });
});
