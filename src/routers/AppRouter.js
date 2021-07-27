import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../firebase/firebase-config";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRouter";
import { PrivateRoute } from "./PrivateRouter";

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checkAuthentication, setCheckAuthentication] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // It creates an observable, it fires when authentication change, when user
        // authenticates again, when user login without refresh page, etc
        firebase.auth().onAuthStateChanged((user) => {
            // If user exist, that means that user is authenticated.
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));

                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }

            setCheckAuthentication(false);
        });
    }, [dispatch, setCheckAuthentication, setIsLoggedIn]);

    if (checkAuthentication) {
        return <h1>Wait....</h1>;
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        isAuthenticated={isLoggedIn}
                        path="/auth"
                        component={AuthRouter}
                    />

                    <PrivateRoute
                        isAuthenticated={isLoggedIn}
                        exact
                        path="/"
                        component={JournalScreen}
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    );
};
