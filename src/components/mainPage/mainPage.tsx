import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/routePathes";
import { API_URL } from "../../api/apiURL";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { stateSelectors } from "../../store";

export const MainPage = () => {
  // const
  const [userData, setUserData] = useState({
    email: "",
    bio: "",
    token: "",
    username: "",
    image: "",
  });

  const randomCharacterState = useAppSelector(stateSelectors.userSliceData);
  console.log({ randomCharacterState });

  const dispatch = useAppDispatch();

  useEffect(() => {
    let token = localStorage.getItem(`userToken`);
    if (token) {
      axios
        .get(API_URL.GET_USER_INFO, {
          headers: {
            authorization: "Token " + token,
          },
        })
        .then((resp) => {
          console.log(resp.data.user);
          setUserData(resp.data.user);
        });
    }
  }, []);

  return (
    <div>
      <div>
        <h1>
          <Link to="/registration">Go to registration </Link>
        </h1>
        <h1>
          <Link to="/sign-in"> Sign in </Link>
        </h1>
      </div>

      <div>
        user:
        <p>{userData.image ? <img src={userData.image} alt="" /> : null}</p>
        <p>{userData.username ? userData.username : null}</p>
        <p>{userData.email ? userData.email : null}</p>
      </div>
      <div>
        <Link to={`/profile/${userData.username}`}>
          {" "}
          <h1> Go to user profile</h1>{" "}
        </Link>

        <Link to="/sign-in"> Sign in </Link>
      </div>
    </div>
  );
};
