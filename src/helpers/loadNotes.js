import { db } from "../firebase/firebase-config";

export const loadNotes = async (uid) => {
    // Here we get only snapshot of notes
    const notesSnap = await db.collection(`${uid}/journal/notes`).get();
    const notes = [];

    // Loop snapshot to get snapChilds and build notes array with corresponding id
    notesSnap.forEach((snapChild) => {
        notes.push({
            id: snapChild.id,
            ...snapChild.data(),
        });
    });

    return notes;
};
