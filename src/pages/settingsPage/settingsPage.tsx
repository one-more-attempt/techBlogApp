import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogAPI } from "../../api/blogAPI";
import { SimpleButton } from "../../components/buttons/simpleTextButton/simpleTextButton";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { InputTypes, SimpleInput } from "../../components/inputs/simpleInput";
import { ROUTE_PATH } from "../../routes/routePathes";
import { localStorageService } from "../../services/LSService";
import { useAppDispatch } from "../../store/hooks/redux-hooks";
import { userSliceActions } from "../../store/slices/userSlice";

import Settings from "./settingsPage.module.scss";
export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  let LSToken = localStorageService.getToken();
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [nickName, setNickName] = useState("");
  const [buttonStatus, setButtonStatus] = useState(true);

  const [
    getUserInfoTrigger,
    { data: userInfoData, isLoading: isGetUserLoading },
  ] = blogAPI.useLazyGetUserInfoByTokenQuery();
  const [updateUser, { data, error, isLoading: isUpdateUserLoading }] =
    blogAPI.useUpdateProfileMutation();

  const getUserInfo = () => {
    if (LSToken) {
      getUserInfoTrigger(LSToken)
        .unwrap()
        .then((resp) => {
          console.log(resp);
          const { email, username, bio, image } = resp.user;
          const userDataFromServer = {
            email: resp.user.email,
            name: resp.user.username,
            bio: resp.user.bio,
            imageURL: resp.user.image,
          };

          dispatch(userSliceActions.setIsLogined(userDataFromServer));
          bio ? setBio(bio) : setBio("");
          setImage(image);
          setNickName(username);
          setEmail(email);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const goToUpdate = () => {
    const updateData = {
      user: {
        email: `${email}`,
        bio,
        image,
        password,
        username: nickName,
        token: LSToken,
      },
    };
    updateUser({ updateData, token: LSToken }).then((resp) => {
      getUserInfo();
    });
  };

  return (
    <>
      <Header />
      <div
        className={`content ${Settings.settingsBlock} ${Settings.adaptiveLayout}`}
      >
        <div className={Settings.formContainer}>
          <p className={Settings.settings}>Your Settings</p>
          <div>
            <SimpleInput
              type={InputTypes.Text}
              placeholder={"Nickname"}
              value={nickName}
              setValue={setNickName}
            />
            <SimpleInput
              type={InputTypes.Text}
              placeholder={"Image"}
              value={image}
              setValue={setNickName}
            />

            <SimpleInput
              type={InputTypes.Text}
              placeholder={"Email"}
              value={email}
              setValue={setEmail}
            />
            <textarea
              name="bio"
              rows={7}
              className={Settings.bio}
              placeholder={"Short bio about you"}
              value={bio}
              onChange={(e) => {
                setBio(e.currentTarget.value);
              }}
            ></textarea>

            <SimpleInput
              type={InputTypes.Password}
              placeholder={"New Password"}
              value={password}
              setValue={setPassword}
            />

            <SimpleButton
              disabled={false}
              text="Update Profile"
              onClickFunc={() => goToUpdate()}
            />
            {isUpdateUserLoading ? "loading" : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
function dispatch(arg0: {
  payload: { name: string; bio: string; imageURL: string; email: string };
  type: "userSlice/setIsLogined";
}) {
  throw new Error("Function not implemented.");
}
