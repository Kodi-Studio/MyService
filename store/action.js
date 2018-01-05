export const initUser = (logged) => {
    return{
        type: "LOGIN",
        logged,
    }
}

export const actionDisconnect = (disconnect) => {
    return {
        type: "DISONNECT",
        disconnect
    }
}
