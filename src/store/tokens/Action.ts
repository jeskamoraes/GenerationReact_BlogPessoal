// type Action ->  esse type é uma estrutura dentro do typescript, similar a interface
// type: "ADD_TOKEN" -> Tipando a informação da action
export type Action = { type: "ADD_TOKEN"; payload: string }

// Ação que vai ser disparada na aplicação
// Action é o objeto retornado
export const addToken = (token: string): Action => ({ 
    type: "ADD_TOKEN",
    payload: token
})