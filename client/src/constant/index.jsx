import CURLPath, { Base } from "./Urls";

// Base Url set Here
export const Base_url = `${Base}api/`;

// Image url path
export const Img_url = `${Base}`;

// Get Value
export const getValue = (value) => `/${value}`;

// Set headers for All APIs
export const headers = CURLPath.json;

// Set the url of the for delete and get
export const validateUrl = async (url, props) =>
  //here props[1] is data we going to send in our apis
  //here id is we are going to given extra parameter in post api eg --- {id:data.id}
  //And if id present than we give parameter getValue in and post id in that otherwise simplly posted that data
  (await props[1]) &&
  (props[1].id > 0 || (props[1].id && props[1].id.length >= 4))
    ? url + getValue(props[1].id)
    : url;

// Checking Url is defiend or not
const CURL = async (c) =>
  //Result ---> c is our Url i.e cart
  (await (CURLPath[c] === c)) ? `${Base_url}${CURLPath[c]}` : false;

export default CURL;
