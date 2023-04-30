import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { InputTypes, SimpleInput } from "../../components/inputs/simpleInput";
import { SimpleButton } from "../../components/buttons/simpleTextButton/simpleTextButton";
import SignIn from "./signInPage.module.scss";
import { blogAPI } from "../../api/blogAPI";
import { loginObject, loginResponse } from "../../types/types";
import { ErrorNotification } from "../../components/errorNotification/errorNotification";
import { userSlice } from "../../store/slices/userSlice";
import { stateSelectors } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export const SignInPage = () => {
  const navigate = useNavigate();
  const [goToLogin, { error, isError, isLoading, data }] =
    blogAPI.useLoginMutation();

  const userDataState = useAppSelector(stateSelectors.userSliceData);
  const dispatch = useAppDispatch();
  console.log(userDataState);
  const [errinput, setErrinput] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [buttonStatus, setButtonStatus] = useState(true);

  //not emty
  useEffect(() => {
    if (emailInput.length > 5 && passwordInput.length > 5) {
      if (buttonStatus !== false) {
        setButtonStatus(false);
      }
    }
  });

  useEffect(() => {
    setErrinput(false);
  }, [emailInput, passwordInput]);

  const tryToLogin = async () => {
    const obj: loginObject = {
      user: { email: emailInput, password: passwordInput },
    };

    await goToLogin(obj)
      .unwrap()
      .then((resp) => {
        console.log(resp);
        const { username, bio, image, email } = resp.user;

        const userData = {
          name: username,
          bio: bio,
          imageURL: image,
          email: email,
        };
        const token = resp.user.token;
        localStorage.setItem(`userToken`, token);
        dispatch(userSlice.actions.setIsLogined(userData));
        navigate("/");
      })
      .catch((e: FetchBaseQueryError) => {
        console.log(e);
        setErrinput(true);
      });
  };

  return (
    <>
      <Header />
      <div className={`content ${SignIn.signInBlock} ${SignIn.adaptiveLayout}`}>
        <div className={SignIn.formContainer}>
          <p className={SignIn.signIn}>Sign In</p>
          <p className={SignIn.dontHave}> Don't have an account?</p>
          {errinput ? (
            <ErrorNotification status={true} text="Something is incorrect" />
          ) : null}
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
            onClickFunc={() => tryToLogin()}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

// const tryToLogin = () => {
//   const userObj = {
//     user: {
//       username: userNameInput,
//       email: emailInput,
//       password: passwordInput,
//     },
//   };
//   axios
//     .post(serverURL, userObj)
//     .then(function (response: any) {
//       setResponseFromServer(
//         `${response.data.user.username} successfully registered`
//       );
//       console.log(response);
//     })
//     .catch((error) => {
//       let errmessage = "";
//       for (const [key, value] of Object.entries(error.response.data.errors)) {
//         errmessage += `${key} ${[value]} / `;
//       }
//       if (errmessage) {
//         setResponseFromServer(errmessage);
//       }
//     });
// };

// axios
//   .post(serverURL, {
//     user: {
//       email: "echo82465@mail.com",
//       password: "111111",
//     },
//   })
//   .then((resp) => {
//     console.log(resp.data.user.token);
//     const userToken = resp.data.user.token;
//     // localStorage.setItem('items', JSON.stringify(items))
//     localStorage.setItem (`userToken`, userToken)
//   })
