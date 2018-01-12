export const initUserLogged = (logged) => {
    return{
        type: "LOGIN",
        logged,
    }
}

export const initUser = (userDatas) => {
    return {
        type: "INIT_USER",
        userDatas,
    }

}

export const actionDisconnect = (disconnect) => {
    return {
        type: "DISONNECT",
        disconnect,
    }
}

export const initListeCates = (catesParent , cates) => {
    return  {
        type: "INIT_CATES",
        catesParent,
        cates
    }

}
