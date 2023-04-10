import PostStyles from "./post.module.scss";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const Post = () => {
  return (
    <div className={PostStyles.postWrapper}>
      <div className={PostStyles.postHeader}>
        <div className={PostStyles.postInfo}>
          <div className={PostStyles.postAvatar}>
            <Avatar src="/broken-image.jpg" />
          </div>

          <div className={PostStyles.postDetails}>
            <div className={PostStyles.postAuthor}>Anah Benešová</div>
            <div className={PostStyles.postDate}>December 9, 2022</div>
          </div>
        </div>
        <div className={PostStyles.postLikeConter}>
          <FavoriteIcon />
          500
        </div>
      </div>
      <div className={PostStyles.postBody}>
        <div className={PostStyles.postBodyTitle}>
          If we quantify the alarm, we can get to the FTP pixel through the
          online SSL interface!
        </div>
        <div className={PostStyles.postBodyMainText}>
          Quia quo iste et aperiam voluptas consectetur a omnis et.\nDolores et
          earum consequuntur sunt et.\nEa nulla ab voluptatem dicta vel.
          Temporibus aut adipisci magnam aliquam eveniet nihil laudantium
          reprehenderit sit.\nAspernatur cumque labore voluptates mollitia
          deleniti et. Quos pariatur tenetur.\nQuasi omnis eveniet eos maiores
          esse magni possimus blanditiis.\nQui incidunt sit quos consequatur aut
          qui et aperiam delectus
        </div>
      </div>
      <div className={PostStyles.postFooter}>
        <div className={PostStyles.readMore}>Read more...</div>
        <div className={PostStyles.tagsBlock}>
          <div className={PostStyles.tag}>some tag</div>
          <div className={PostStyles.tag}>some tag</div>
          <div className={PostStyles.tag}>some tag</div>
          <div className={PostStyles.tag}>some tag</div>
          <div className={PostStyles.tag}>some tag</div>
        </div>
      </div>
    </div>
  );
};
