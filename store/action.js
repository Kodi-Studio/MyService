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
        type: "INITCATES",
        catesParent,
        cates
    }

}

export const initUserListe = (liste) => {
    return  {
        type: "INIT_USER_LISTE",
        liste
    }

}

export const initSelectedServicer = (datas) => {
    return  {
        type: "INIT_SELECTED_SERVICER",
        datas
    }
}

export const requestToShowServicer = () => {
    return  {
        type: "REQUEST_SLIDE_TO_SERVICER_ONSCREEN"
    }
}


export const confirmShowServicer = () => {
    return  {
        type: "SERVICER_ONSCREEN"
    }
}