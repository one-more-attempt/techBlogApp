import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/routePathes";
const serverURL = "https://conduit.productionready.io/api/users/login";

export const MainPage = () => {
  const [userData, setUserData] = useState({
    email:'', bio:'', token:'', username:'', image: ''
  });
  const serverURL = "https://conduit.productionready.io/api/user";

  useEffect(() => {
    let token = localStorage.getItem(`userToken`);
    if (token) {
      axios
        .get("https://conduit.productionready.io/api/user", {
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
j
      <div>
        user:
        <p>{userData.username  ? userData.username : null}</p>
        <p>{userData.image  ? <img src={userData.image } alt="" />  : null}</p>
        <p>{userData.email  ? userData.email : null}</p>
      </div>
      <div><Link to={`/profile/${userData.username }`}> <h1> Go to user profile</h1> </Link>
      <Link to="/sign-in"> Sign in </Link>
       </div>
    </div>
  );
};
