import { types } from "../../types/types";

describe("Tests for types.js", function () {
    test("Should exists all types expected", () => {
        const typesExpected = {
            login: "[Auth] Login",
            logout: "[Auth] Logout",

            uiSetError: "[UI] Set Error",
            uiRemoveError: "[UI] Remove Error",

            uiStartLoading: "[UI] Start loading",
            uiFinishLoading: "[UI] Finish loading",

            notesAddNew: "[Notes] New Note",
            notesActive: "[Notes] Set active note",
            notesLoad: "[Notes] Load notes",
            notesUpdated: "[Notes] Updated note",
            notesFileUrl: "[Notes] Updated image url",
            notesDelete: "[Notes] Delete note",
            notesLogoutCleaning: "[Notes] Logout Cleaning",
        };

        expect(types).toEqual(typesExpected);
    });
});
