import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";

export const smartLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
            })
            .catch((e) => console.log(e));
    };
};

// Asynchronus action, after resolve, it will dispatch another SYNCHRONUS action.
// Asynchronus actions return a callback. in difference to SYNCHRONUS actions.
export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase
            .auth()
            .signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
            })
            .catch((e) => console.log(e));
    };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name });

                dispatch(login(user.uid, user.displayName));
            })
            .catch((e) => console.log(e));
    };
};

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
    },
});
