import {
  USER_LIST_MY_REQUEST,
  USER_LIST_MY_SUCCESS,
  USER_LIST_MY_FAIL,
} from "../../constants/user/userConstants";
import axios from "axios";
const userToken = JSON.parse(localStorage.getItem("auth-token"));

// export const deleteCompany = (companyId) => async (dispatch) => {
//   try {
//     dispatch({
//       type: COMPANY_DELETE_REQUEST,
//     });

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userToken.token}`,
//       },
//     };

//     await axios.delete(
//       `http://localhost:4000/deleteCompany/${companyId}`,
//       config
//     );

//     dispatch({
//       type: COMPANY_DELETE_SUCCESS,
//     });
//   } catch (error) {
//     dispatch({
//       type: COMPANY_DELETE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const listUser = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_MY_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:4000/getUser`,
      config
    );

    dispatch({
      type: USER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
