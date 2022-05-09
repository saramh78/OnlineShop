import { useContext } from "react";
import AuthForm from "../components/auth/AuthForm";
import Profile from "../components/profile/Profile";
import AuthContext from "../store/auth-context";

const ProfilePage = () => {
    const authCtx = useContext(AuthContext);
    const content = authCtx.isLoggedIn ? <Profile /> : <AuthForm />;
     return content;
};

export default ProfilePage;