export const SAVE_USER = "SAVE_USER"
export const LOGOUT_USER = 'LOGOUT_USER' 
const initialState = {
  token:""
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SAVE_USER:
        return {
          token: action.payload,
        };
      case LOGOUT_USER:
          return { token: "" }
      default:
        return state;
    }
};