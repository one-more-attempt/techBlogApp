import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div>
      <h1>
        Sorry, page this page is doesn't exist
        <Link to="/">Go to MAIN </Link>
      </h1>
    </div>
  );
};
