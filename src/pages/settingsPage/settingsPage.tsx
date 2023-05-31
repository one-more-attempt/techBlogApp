import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogAPI } from "../../api/blogAPI";
import { SimpleButton } from "../../components/buttons/simpleTextButton/simpleTextButton";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { InputTypes, SimpleInput } from "../../components/inputs/simpleInput";
import { ROUTE_PATH } from "../../routes/routePathes";
import { localStorageService } from "../../services/LSService";
import { stateSelectors } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { userSliceActions } from "../../store/slices/userSlice";

import Settings from "./settingsPage.module.scss";
export const SettingsPage = () => {
  const userDataState = useAppSelector(stateSelectors.userSliceData);
  const { bio, userName, email, imageURL, isLogined } = userDataState;
  console.log(userDataState);

  const [emailInput, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [bioInput, setBio] = useState("");
  const [nickName, setNickName] = useState("");
  const [buttonStatus, setButtonStatus] = useState(true);

  const {
    data: userInfoData,
    isLoading: userInfoIsLoading,
    error: userInfoIsError,
  } = blogAPI.useGetUserInfoByTokenQuery();

  const [updateUser, { data, error, isLoading: isUpdateUserLoading }] =
    blogAPI.useUpdateProfileMutation();

  useEffect(() => {
    if (isLogined) {
      setEmail(email);
      setImage(imageURL);
      setBio(bio);
      setNickName(userName);
    }
  }, [userDataState]);

  const goToUpdate = () => {
    const updateData = {
      user: {
        email: `${email}`,
        bio: bioInput,
        image: password,
        username: nickName,
      },
    };
    updateUser({ updateData });
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
              isDisabled={true}
            />
            <SimpleInput
              type={InputTypes.Text}
              placeholder={"Image"}
              value={image}
              setValue={setImage}
            />

            <SimpleInput
              type={InputTypes.Text}
              placeholder={"Email"}
              value={emailInput}
              setValue={setEmail}
            />
            <textarea
              name="bio"
              rows={7}
              className={Settings.bio}
              placeholder={"Short bio about you"}
              value={bioInput}
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
