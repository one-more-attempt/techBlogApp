import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { blogAPI } from "../../api/blogAPI";
import { SimpleButton } from "../../components/buttons/simpleTextButton/simpleTextButton";
import { ErrorNotification } from "../../components/errorNotification/errorNotification";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { InputTypes, SimpleInput } from "../../components/inputs/simpleInput";
import { ROUTE_PATH } from "../../routes/routePathes";
import { stateSelectors } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { userSlice, userSliceActions } from "../../store/slices/userSlice";
import { SignUpResponse } from "../../types/types";
import SignUp from "./signUpPage.module.scss";

export const SignUpPage = () => {
  const userDataState = useAppSelector(stateSelectors.userSliceData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [goToSignUp, { error, isError, isLoading, data }] =
    blogAPI.useRegisterMutation();
  const [emailInput, setEmailInput] = useState("");
  const [nickNameInput, setNickNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [buttonStatus, setButtonStatus] = useState(true);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [errorNotificationData, setErrorNotificationData] = useState({
    text: "",
    status: false,
  });

  //not emty check
  useEffect(() => {
    if (emailInput.length > 5 && passwordInput.length > 5) {
      if (buttonStatus !== false) {
        setButtonStatus(false);
      }
    }
  });

  type ErrorData = {
    errors: {
      email: string[];
      username: string[];
      password: string[];
    };
  };

  const tryToRegister = () => {
    const userData = {
      user: {
        email: emailInput,
        username: nickNameInput,
        password: passwordInput,
      },
    };

    goToSignUp(userData)
      .unwrap()
      .then((data: SignUpResponse) => {
        console.log(data);
        const { username, bio, image, email } = data.user;
        const userData = {
          name: username,
          bio: bio,
          imageURL: image,
          email: email,
        };
        const token = data.user.token;
        localStorage.setItem(`userToken`, token);
        dispatch(userSliceActions.setIsLogined(userData));
        navigate(ROUTE_PATH.MAIN);
      })
      .catch((e: FetchBaseQueryError) => {
        //error handling
        console.log(e.data);
        setInvalidCredentials(true);
      });
  };

  return (
    <>
      <Header />
      <div className={`content ${SignUp.signUpBlock} ${SignUp.adaptiveLayout}`}>
        <div className={SignUp.formContainer}>
          <p className={SignUp.signUp}>Sign Up</p>
          <p className={SignUp.dontHave}>
            <Link to={ROUTE_PATH.SIGN_IN}> Already have an account?</Link>
          </p>

          {invalidCredentials ? (
            <ErrorNotification data={errorNotificationData} />
          ) : null}

          <SimpleInput
            type={InputTypes.Text}
            placeholder={"Nickname"}
            value={nickNameInput}
            setValue={setNickNameInput}
          />
          <SimpleInput
            type={InputTypes.Text}
            placeholder={"Email"}
            value={emailInput}
            setValue={setEmailInput}
          />
          <SimpleInput
            type={InputTypes.Password}
            placeholder={"Password"}
            value={passwordInput}
            setValue={setPasswordInput}
          />
          <SimpleButton
            disabled={buttonStatus}
            text="Sign In"
            onClickFunc={() => tryToRegister()}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
