import { Description } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import NewPost from "./newArticlePage.module.scss";

export const NewArticlePage = () => {
  const { slug } = useParams();
  const slugName = slug ? slug : "";
  const navigate = useNavigate();
  const userDataState = useAppSelector(stateSelectors.userSliceData);
  const userName = userDataState.userName;
  const dispatch = useAppDispatch();
  let LSToken = localStorageService.getToken() || "";

  //editMode
  const [editMode, setEditMode] = useState(false);

  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [tags, setTags] = useState("");

  const [
    getUserInfoTrigger,
    { data: userInfoData, isLoading: isGetUserLoading },
  ] = blogAPI.useLazyGetUserInfoByTokenQuery();
  const [postNewArticle, { data: newPostData, isLoading: isNewPostLoading }] =
    blogAPI.useNewPostMutation();

  //get post data for editing mode
  const [getSelectedPostTrigger, { data }] =
    blogAPI.useLazyGetSelectedPostQuery();

  const getSelectedPostHandler = () => {
    getSelectedPostTrigger({ slug: slugName, token: LSToken });
  };

  const getUserInfo = () => {
    if (LSToken) {
      getUserInfoTrigger(LSToken)
        .unwrap()
        .then((resp) => {
          console.log(resp);
          const { email, username, bio, image } = resp.user;
          const userDataFromServer = {
            email,
            bio,
            name: username,
            imageURL: image,
          };
          dispatch(userSliceActions.setIsLogined(userDataFromServer));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const goToPostNewArticle = () => {
    const postData = {
      article: {
        title: titleInput,
        description: descriptionInput,
        body: bodyText,
        tagList: tags.split(/\s*,\s*/),
      },
    };
    console.log(postData.article.tagList);
    postNewArticle({ postData, token: LSToken })
      .unwrap()
      .then((res) => {
        navigate(ROUTE_PATH.PROFILE_DYNAMIC(userName));
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Header />
      <div
        className={`content ${NewPost.newPostBlock} ${NewPost.adaptiveLayout}`}
      >
        <div className={NewPost.formContainer}>
          <p className={NewPost.newPost}>Create a new post</p>
          <div>
            <SimpleInput
              type={InputTypes.Text}
              placeholder={"Title"}
              value={titleInput}
              setValue={setTitleInput}
            />
            <SimpleInput
              type={InputTypes.Text}
              placeholder={"Short description"}
              value={descriptionInput}
              setValue={setDescriptionInput}
            />

            <textarea
              name="postBody"
              rows={7}
              className={NewPost.postTextArea}
              placeholder={"Post you"}
              value={bodyText}
              onChange={(e) => {
                setBodyText(e.currentTarget.value);
              }}
            ></textarea>

            <SimpleInput
              type={InputTypes.Text}
              placeholder={"Add some tags"}
              value={tags}
              setValue={setTags}
            />

            <SimpleButton
              disabled={false}
              text="Publish in global"
              onClickFunc={() => goToPostNewArticle()}
            />

            {isNewPostLoading ? "loading" : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
