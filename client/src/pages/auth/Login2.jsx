import React from "react";

const Login2 = () => {
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 col-sm-12 login-image"></div>
        <div class="col-md-6 col-sm-12 login-form">
          <div className="h-100 d-flex flex-column align-items-center justify-content-center">
            <h2>Login Form</h2>
            <form action="#">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login2;
