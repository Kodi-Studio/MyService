import { createStore, combineReducers  } from 'redux';
 

export const initialState = {
  login: '',
  pass:''
}

const loginActions = (state= {} , action) => {
     switch (action.type) {
        case 'LOGIN':
           // console.log('+++'+action.logged);
            return { logged:action.logged };
            break;
        default:
            return state;
     }
 }
    
const disconnect = (state= {} , action) => {
    
    switch (action.type) {
        case 'UNLOG':
            return initialState;
            break;
        default:
            return initialState;
            break;
    }
}
const getUserDatas = ( state = { } , action  ) => {
    switch (action.type) {
        case 'INIT_USER':
           //console.log('+++'+action.userDatas);
            return { userDatas:action.userDatas };
            break;
        default:
            return state;
     }
}

const getListeCates = ( state = { } , action ) => {
    switch (action.type) {
        case 'INITCATES' : {
            //console.log('liste des catégories : ');
            //console.log(action.catesParent);
            return { catesParent:action.catesParent , cates:action.cates };
            //return { catesParent:Array.from(action.catesParent) , cates:Array.from(action.cates) };
            break;
        }

        default : {
            return state
        }
    }

}

const getListeUsersFound = ( state = { } , action ) => {
    switch (action.type) {
        case 'INIT_USER_LISTE' : 
            return { listeUsers:action.liste };
            break;
        default :
            return state;
    }

}

const selectedServicer = ( state = { } ,  action) => {
    switch (action.type) {
        case 'INIT_SELECTED_SERVICER' :
            return { datas:action.datas };
            break;
        default :
            return state;
    }
}

const requestToSlideToServicer = ( state = { } , action) => {
    switch (action.type) {
        case 'REQUEST_SLIDE_TO_SERVICER_ONSCREEN' :
            return { slideTo:'true' };
            break;
        case 'SERVICER_ONSCREEN' :
            return { slideTo:'false' };
            break;
        default :
            return state;
    }
}



const userLog = combineReducers({
    loginActions,
    disconnect,
    getUserDatas,
    getListeCates,
    getListeUsersFound,
    selectedServicer,
    requestToSlideToServicer
})


//let store = createStore(userLog);

export default store = createStore(userLog);
