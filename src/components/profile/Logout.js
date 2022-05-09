import { useContext } from "react";
import AuthContext from "../../store/auth-context";

import classes from './Logout.module.css';

const Logout = (props) => {
    const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
}
    return (<div className={classes.logout} onClick={logoutHandler}>خروج از حساب کاربری</div>)
};

export default Logout;