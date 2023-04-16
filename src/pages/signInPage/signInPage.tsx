import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";

export const SignInPage = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [userNameInput, setUserName] = useState("");
  const [responseFromServer, setResponseFromServer] = useState("");

  const serverURL = "https://conduit.productionready.io/api/users/login";

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
  //   });

  return (
    <div>
      <h1>
        <Link to="/">main </Link>
      </h1>

      <div className="mainRegBlock">
        <h1>
          <Link to="/">{`Main page`}</Link>
        </h1>
        <TextField
          id="outlined-basic"
          label="User name"
          variant="outlined"
          value={userNameInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUserName(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={emailInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmailInput(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={passwordInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordInput(e.target.value);
          }}
        />
        <div>{responseFromServer ? responseFromServer : null}</div>
        <Button
          variant="outlined"
          onClick={() => {
            console.log(`works`);
          }}
        >
          Outlined
        </Button>
      </div>
    </div>
  );
};
