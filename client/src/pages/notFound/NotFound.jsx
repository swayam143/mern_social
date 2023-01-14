import React from "react";
import { PrimaryButton } from "../../components/button/Buttons";
import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      <div className="full_body">
        <section className="jp-404">
          <h1>
            <span> 404 </span>
            Sorry Page Not Found!
          </h1>

          <p>
            The page you're looking for, doesn't exist. It may have removed or
            its URL has been changed.
          </p>

          <PrimaryButton title={"Home"} />
        </section>
      </div>
    </>
  );
};

export default NotFound;
