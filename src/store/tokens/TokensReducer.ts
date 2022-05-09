import { Action } from "./Action";

// Indica o tipo da informação que a store vai receber
export interface TokenState {
    tokens: string
}

// Indica o estado inicial da store
const initialState = {
    tokens: ""
}

// O reducer deve interceptar a ação e verificar o estado da store e o tipo da ação, ou seja, verificar se é necessário fazer alguma alteração do estado
export const tokenReducer = (state: TokenState = initialState, action: Action) => {
    switch (action.type) {
        case "ADD_TOKEN": { // Usuário tentando logar
            return { tokens: action.payload } // Token que está vindo pela action
        }
        default:
            return state

    }
}