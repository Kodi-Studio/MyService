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
    
const userLog = combineReducers({
    loginActions,
    disconnect
})


//let store = createStore(userLog);

export default store = createStore(userLog);
