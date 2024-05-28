import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div style={{ display: "block", paddingLeft: "10rem " }}>
      <h1>
        404
        <br />
        Page Not Found
      </h1>
      <p>Sorry, the page you were looking for does not exist.</p>
      <p>Go To Homepage by Button Below</p>
      <Link to="/">Home Page</Link>
    </div>
  );
};

export default NoPage;
