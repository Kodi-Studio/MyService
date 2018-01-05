import { createStore, combineReducers  } from 'redux';
 

export const initialState = {
  login: '',
  pass:''
}

const loginActions = (state= {} , action) => {
    
     switch (action.type) {
        case 'LOGIN':
            //console.log('---------------------------');
           // console.log( testConnect(action.loginSaisie, action.passSaisie) );
            //if(testConnect(action.loginSaisie, action.passSaisie)) { return {logged:true} } else { return {logged:false};  } 
            //return {login:action.loginSaisie}; //Object.assign( {}, {login:action.loginSaisie} ) ;
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
