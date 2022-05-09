import { useState, useRef, useContext, Fragment } from "react";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const nameInputRef = useRef();
  const familyInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const createUser = async (localId, name, family, email, password) => {
    
  };

  const authentication = async (
    url,
    enteredEmail,
    enteredPassword,
    enteredName,
    enteredFamily
  ) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "authentication failed");
    }

    const expirationTime = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    console.log(data);

    if (!isLogin) {
      // createUser(
      //   data.localId,
      //   enteredName,
      //   enteredFamily,
      //   enteredEmail,
      //   enteredPassword
      // ).catch((err) => {
      //   alert(err.message);
      // })

      const createResponse = await fetch(
        `https://online-shop-db472-default-rtdb.firebaseio.com/Users/${data.localId}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            Name: enteredName,
            Family: enteredFamily,
            Email: enteredEmail,
            Password: enteredPassword,
            Code: 0,
            PhoneNumber: "",
            Wallet: 0,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const createData = await createResponse.json();

      if (!createResponse.ok) {
        throw new Error(createData.message || "authentication failed");
      }
    }

    // const responseUserData = await fetch(
    //   `https://online-shop-db472-default-rtdb.firebaseio.com/Users/${data.localId}.json`
    // );

    // const userData = await responseUserData.json();

    // if (!responseUserData.ok) {
    //   throw new Error(data.message || "fetch failed");
    // }

    // const ud = userData[Object.keys(userData)[0]];
    // console.log(ud);

    // user = { ...ud };

    // console.log(user);

    authCtx.login(
      data.idToken,
      data.localId,
      expirationTime.toISOString()
      
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let enteredName;
    let enteredFamily;
    if (!isLogin) {
      enteredName = nameInputRef.current.value;
      enteredFamily = familyInputRef.current.value;
    }
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYZxNIAFATh3UePqOe5OLieiaQgWpZkHQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYZxNIAFATh3UePqOe5OLieiaQgWpZkHQ";
    }

    authentication(
      url,
      enteredEmail,
      enteredPassword,
      enteredName,
      enteredFamily
    ).catch((err) => {
      alert(err.message);
    });

    // const localId = authCtx.localId;

    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "ورود" : "ثبت نام"}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <Fragment>
            <div className={classes.control}>
              <label htmlFor="name">نام</label>
              <input type="name" id="name" required ref={nameInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="family">نام خانوادگی</label>
              <input type="family" id="family" required ref={familyInputRef} />
            </div>
          </Fragment>
        )}
        <div className={classes.control}>
          <label htmlFor="email">ایمیل</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">رمزعبور</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{!isLogin ? "ثبت نام" : "ورود"}</button>}
          {isLoading && <p>loading...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "برای ثبت نام کلیک کنید" : "برای ورود به حساب کاربری کلیک کنید"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
