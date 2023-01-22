// Base for production
export const Base = `http://localhost:5001/`;

// Base For development
// export const Base = `http://localhost/medical-backend/`;

const CURLPath = {
  json: {
    "Content-Type": "application/json",
  },

  login: "login",
  refresh_token: "refresh_token",
  register: "register",
  search: "search",
  user: "user",
  update: "update",
};

export default CURLPath;
