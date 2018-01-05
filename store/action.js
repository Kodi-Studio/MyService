export const getUser = (loginSaisie) => {
    return{
        type: "LOGIN",
        loginSaisie
    }
}

export const actionDisconnect = (disconnect) => {
    return {
        type: "DISONNECT",
        disconnect
    }
}
