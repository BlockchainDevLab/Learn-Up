var user = '{user: "sdlkfjaçsdlhfsdf"}'

export const methods = {
    addUser : (userInfo) => {
        user = userInfo
    },
    getUser: () => user
}