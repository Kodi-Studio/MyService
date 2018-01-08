import { createStore, combineReducers  } from 'redux';
 

export const initialState = {
  login: '',
  pass:''
}

const loginActions = (state= {} , action) => {
     switch (action.type) {
        case 'LOGIN':
            console.log('+++'+action.logged);
            return { logged:action.logged }
        default:
            return state;
     }
 }
    
const disconnect = (state= {} , action) => {
    
    switch (action.type) {
        case 'UNLOG':
            return initialState;
        default:
            return initialState;
    }
}
const getUserDatas = ( state = { } , action  ) => {
    switch (action.type) {
        case 'INIT_USER':
            console.log('+++'+action.type);
            return { userDatas:action.userDatas }
        default:
            return state;
     }
}



    
const userLog = combineReducers({
    loginActions,
    disconnect,
    getUserDatas
})


//let store = createStore(userLog);

export default store = createStore(userLog);
