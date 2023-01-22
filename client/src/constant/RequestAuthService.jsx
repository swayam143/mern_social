// core module
import axios from "axios";
import CURL, { headers, validateUrl } from ".";
import StoredVariables, { GetSession } from "./Session";
// import { Json } from "./Util";

// Authentication if availiable in eack response
export const GetAuthentication = (props) => {
  let Auth = "",
    header = "";
  //
  //logindata is the data we get after login
  // simple we check if we have logindata so we can get the value of header because we get token in logindata after login
  //
  if (
    GetSession(StoredVariables.logindata) !== null &&
    GetSession(StoredVariables.logindata) !== undefined &&
    GetSession(StoredVariables.logindata) !== "null"
  ) {
    // Auth = Json(DECODE(GetSession(StoredVariables.logindata)));
    //Auth is the data we get after login from response
  } else {
    Auth = "";
  }
  if (props && props[0]) {
    header = headers;
    //here headers is  simply this -- -   "Content-Type": "application/json",
    if (Auth !== "") {
      header.Authorization = `Bearer ${Auth.token}`;
      //we pass the token we get after login to above (Auth.token)
    }
    return header;
  } else {
    return Auth;
  }
};

// Post the Data on The POST Helper API Service
export const POST = async (...props) => {
  //
  // console.log(props); //Result --->  ["urlName", data to post] eg... ["cart", {data}]
  //
  const validate = await CURL(props[0]);
  //
  // console.log(props[0]); //Result --- > urlName above we give i.e cart
  //
  // console.log(validate); //Result--->https://medical.mobitplus.com/api/cart
  //
  //
  const url = await validateUrl(validate, props);
  //
  // Url and its function validateUrl only create url to post like its going to simple url or we pass any id in that url like {id:data.id}
  //

  if (validate !== false) {
    try {
      const { status, data } = await axios.post(url, props[1], {
        headers: GetAuthentication(props),
      });
      //
      // url --->https://medical.mobitplus.com/api/cart
      //props[1] ---> data to send
      //headers ---> the token we have after login
      //
      //
      return { status, message: data.msg, data: data };
      // we get the response above according to apis
    } catch (error) {
      // console.log(error);
      return {
        status: error.response.data,
      };
    }
  } else {
    return {
      status: 203,
      success: false,
      message: "Url is not defiend! Please defiend first",
    };
  }
};

// Update the Data on The PUT Helper API Service
export const PUT = async (...props) => {
  //
  // console.log(props); //Result --->  ["urlName"] eg... ["cart"]
  //
  const validate = await CURL(props[0]);
  //
  // console.log(props[0]); //Result --- > urlName above we give i.e cart
  //
  // console.log(validate); //Result--->https://medical.mobitplus.com/api/cart
  //
  //
  const url = await validateUrl(validate, props);
  //
  // Url and its function validateUrl only create url to post like its going to simple url or we pass any id in that url like {id:data.id}
  //

  if (validate !== false) {
    try {
      await delete props[1].id;
      //
      //we delete id because its not required to send id as a data in api
      //

      const { status, data } = await axios.put(url, props[1], {
        headers: GetAuthentication(props),
      });
      //
      // url --->https://medical.mobitplus.com/api/cart/props[1].id
      //props[1] ---> data to send
      //headers ---> the token we have after login
      //
      //
      return { status, message: data.message, data: data };
    } catch (error) {
      return {
        status: 203,
        success: false,
        message: "500 (Internal Server Error)!",
      };
    }
  } else {
    return {
      status: 203,
      success: false,
      message: "Url is not defiend! Please defiend first",
    };
  }
};

// Fetch the Data on The GET Helper API Service
export const GET = async (...props) => {
  //
  // console.log(props); //Result --->  ["urlName"] eg... ["cart"]
  //
  const validate = await CURL(props[0]);
  //
  // console.log(props[0]); //Result --- > urlName above we give i.e cart
  //
  // console.log(validate); //Result--->https://medical.mobitplus.com/api/cart
  //
  //
  const url = await validateUrl(validate, props);
  //
  // Url and its function validateUrl only create url to post like its going to simple url or we pass any id in that url like {id:data.id}
  //

  if (validate !== false) {
    try {
      const { status, data } = await axios.get(url, {
        headers: GetAuthentication(props),
      });
      //
      // url --->https://medical.mobitplus.com/api/cart
      //headers ---> the token we have after login
      //
      //
      return { status, message: data.message, data: data };
    } catch (error) {
      return {
        status: error.response.data,
      };
    }
  } else {
    return {
      status: 203,
      success: false,
      message: "Url is not defiend! Please defiend first",
    };
  }
};

// Delete the Data on The DELETE Helper API Service
export const DELETE = async (...props) => {
  //
  // console.log(props); //Result --->  ["urlName"] eg... ["cart"]
  //
  const validate = await CURL(props[0]);
  //
  // console.log(props[0]); //Result --- > urlName above we give i.e cart
  //
  // console.log(validate); //Result--->https://medical.mobitplus.com/api/cart
  //
  //
  const url = await validateUrl(validate, props);
  //
  // Url and its function validateUrl only create url to post like its going to simple url or we pass any id in that url like {id:data.id}
  //

  if (validate !== false) {
    try {
      const { status, data } = await axios.delete(url, {
        headers: GetAuthentication(props),
      });
      //
      // url --->https://medical.mobitplus.com/api/cart
      //headers ---> the token we have after login
      //
      //
      return { status, message: data.message, data: data };
    } catch (error) {
      return {
        status: 203,
        success: false,
        message: "500 (Internal Server Error)!",
      };
    }
  } else {
    return {
      status: 203,
      success: false,
      message: "Url is not defiend! Please defiend first",
    };
  }
};

// For Uploading image
// const uploadFiles = async (...props) => {
//     let formdata = new FormData();
//     formdata.append(`file`, props[1]);
//     const url = await CURL(props[0]);
//     // console.log(url, GetAuthentication(props, true))
//     if (url !== false) {
//         try {
//             const { status, data } = await axios.post(url, formdata, { headers: GetAuthentication(props, true) });
//             return { status, message: data.message, data: data };
//         } catch (error) {
//             return { status: 203, success: false, message: '500 (Internal Server Error)!' };
//         }
//     } else {
//         return { status: 203, success: false, message: 'Url is not defiend! Please defiend first' };
//     }
// };

// export default uploadFiles;
