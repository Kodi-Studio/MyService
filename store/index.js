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
            console.log('+++'+action.userDatas);
            return { userDatas:action.userDatas }
        default:
            return state;
     }
}

const getListeCates = ( state = { } , action ) => {
    switch (action.type) {
        case 'INIT_CATES' : 
            console.log('liste des catégories : ');
            return { catesParent:action.catesParent , cates:action.cates }
        default :
            return state;
    }

}

const userLog = combineReducers({
    loginActions,
    disconnect,
    getUserDatas,
    getListeCates
})


//let store = createStore(userLog);

export default store = createStore(userLog);
