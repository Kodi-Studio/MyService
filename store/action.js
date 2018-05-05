import { isIphoneX } from 'react-native-device-detection';


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

export const initDateDemande = (objDate) => {
    return  {
        type: "INIT_DATE_DEMANDE",
        objDate
    }
}
export const confirmShowServicer = () => {
    return  {
        type: "SERVICER_ONSCREEN"
    }
}


export const navToDemandeDetails = (id,messages) => {
    return  {
        type: "NAVTO_DEMANDES",
    }
}

export const confirmShowDemandedetails = () => {
    return  {
        type: "DEMANDEDETAILS_ONSCREEN"
    }
}


export const getListeDemandes = (datas) => {
    return  {
        type: "GET_LISTE",
        datas
    }
}

export const initDatasDemandesToView = (datas) => {
    return  {
        type: "INIT_DEMANDE_DETAILS",
        datas
    }
}

export const getDevice = () => {

    //// defincition du device
    let detected;
    (isIphoneX===true)? detected = "IphoneX"  : detected = "mobilePhone" ;
    return {
        type: "GET_DEVICE",
        device:detected
    }
}
