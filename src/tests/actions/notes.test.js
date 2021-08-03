/**
 * @jest-environment node
 */
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
    startNewNote,
    startLoadingNotes,
    startSaveNote,
    startUploadingFile,
} from "../../actions/notes";
import { db } from "../../firebase/firebase-config";
import { types } from "../../types/types";
import { fileUpload } from "../../helpers/fileUpload";
jest.mock("../../helpers/fileUpload");

const urlTest = "https://test-image.com/image.jpg";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// We set initial state desired for Redux state.
const initialState = {
    auth: {
        uid: "TESTING",
    },
    notes: {
        active: {
            id: "AzbE6Vmq3JjrIeQPsVMC",
            title: "Hello",
            body: "World!",
        },
    },
};
let store = mockStore(initialState);

describe("Tests for notes actions", () => {
    afterAll(() => {
        db.terminate();
    });

    beforeEach(() => {
        store = mockStore(initialState);
    });

    test("Should create a new note with startNewNote", async () => {
        await store.dispatch(startNewNote());

        // Get actions executed on Redux state
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: "",
                body: "",
                date: expect.any(Number),
            },
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: "",
                body: "",
                date: expect.any(Number),
            },
        });

        const docId = actions[0].payload.id;

        await db.doc(`/TESTING/journal/notes/${docId}`).delete();
    });

    test("startLoadingNotes should load all available notes for given uid", async () => {
        await store.dispatch(startLoadingNotes(initialState.auth.uid));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array),
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        };

        expect(actions[0].payload[0]).toMatchObject(expected);
    });

    test("startSaveNote should update note", async () => {
        const newNote = {
            id: "AzbE6Vmq3JjrIeQPsVMC",
            body: "body",
            title: "title",
            date: 1627869806050,
        };

        await store.dispatch(startSaveNote(newNote));

        const actions = store.getActions();

        expect(actions[0].type).toBe(types.notesUpdated);

        const docRef = await db
            .doc(`/TESTING/journal/notes/${newNote.id}`)
            .get();

        // Comparing with value updated on firestore
        expect(docRef.data().title).toBe(newNote.title);
    });

    test("startUploadingFile should update url of note on firestore", async () => {
        // Simulating fileUpload return, using mock function and mock return value
        fileUpload.mockReturnValue(urlTest);

        const file = [];
        await store.dispatch(startUploadingFile(file));

        const result = await db
            .doc(`/TESTING/journal/notes/${initialState.notes.active.id}`)
            .get();

        // note url should be the same than stored on db in firestore
        expect(result.data().url).toBe(urlTest);
    });
});
