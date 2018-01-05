import { createStore, combineReducers  } from 'redux';
 

export const initialState = {
  login: '',
  pass:''
}

const loginActions = (state= {} , action) => {
    
     switch (action.type) {
        case 'LOGIN':
            if(testConnect(action.loginSaisie)) { return {logged:true} } else { return {logged:false};  } 
            //return {login:action.loginSaisie}; //Object.assign( {}, {login:action.loginSaisie} ) ;
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





////// other function

const testConnect = (login) => {

    //// verification a faire ici
    return true;

}




