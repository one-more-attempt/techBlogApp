import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./registerPage.scss";
import React, { useState } from "react";

// error?
// response=> data => errors
// email:['has already been taken']
// username : ['has already been taken']

// success!
// "user": {
//   "email": "jake@jake.jake",
//   "token": "jwt.token.here",
//   "username": "jake",
//   "bio": "I work at State Farm.",
//   "image": null
// }

const serverURL = "https://conduit.productionready.io/api/users";

export const RegisterPage = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [userNameInput, setUserName] = useState("");
  const [responseFromServer, setResponseFromServer] = useState("");

  const tryToRegister = () => {
    const userObj = {
      user: {
        username: userNameInput,
        email: emailInput,
        password: passwordInput,
      },
    };
    axios
      .post(serverURL, userObj)
      .then(function (response: any) {
        // console.log(response);
        setResponseFromServer(
          `${response.data.user.username}successfully registered`
        );
      })
      .catch((error) => {
        let errmessage = "";
        for (const [key, value] of Object.entries(error.response.data.errors)) {
          errmessage += `${key} ${[value]} / `;
        }
        if (errmessage) {
          setResponseFromServer(errmessage);
        }
      });
  };

  return (
    <div className="mainRegBlock">
      <TextField
        id="outlined-basic"
        label="User name"
        variant="outlined"
        value={userNameInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.value);
          setUserName(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        value={emailInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.value);
          setEmailInput(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        value={passwordInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.value);
          setPasswordInput(e.target.value);
        }}
      />
      <div>{responseFromServer ? responseFromServer : null}</div>
      <Button variant="outlined" onClick={tryToRegister}>
        Outlined
      </Button>
    </div>
  );
};
