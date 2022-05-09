import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../ui/LoadingSpinner";
import Logout from "./Logout";
import classes from "./Profile.module.css";

const Profile = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");

  const authCtx = useContext(AuthContext);
  const localId = authCtx.localId;
  const isLogedIn = authCtx.isLoggedIn;

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        `https://online-shop-db472-default-rtdb.firebaseio.com/Users/${localId}.json`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "authentication failed");
      }

      const user = data[Object.keys(data)[0]];
      setName(user.Name);
      setFamily(user.Family);
    };
    if (isLogedIn) {
      fetchUserData().catch((err) => {
        alert(err.message);
      });

      setIsLoading(false);
    }
  }, [localId,isLogedIn]);

  let content;

  const data = (
    <div className="contentHolder">
      {name && <div className={classes.NameFamily}>{`${name} ${family}`}</div>}
      <div className={classes.ProfileInfo}>
        <a href="wallet">کیف پول</a>
      </div>
      <div className={classes.ProfileInfo}>
        <a href="myOrders">سفارشات من</a>
      </div>
      <div className={classes.ProfileInfo}>
        <a href="/personalInformation">اطلاعات حساب کاربری</a>
      </div>
      <div className={classes.ProfileInfo}>
        <a href="/addresses">آدرس ها</a>
      </div>
      <div className={classes.ProfileInfo}>
        <a href="/favourites">لیست مورد علاقه</a>
      </div>

      <Logout />
    </div>
  );

   if (isLoading) {
     content = <LoadingSpinner />;
   }

   if (!isLoading) {
     content = data;
   }

  return (<Fragment>
    {content}
    </Fragment>
  );
};

export default Profile;
