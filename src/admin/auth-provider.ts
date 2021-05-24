const authProvider = ({
                          isAuthenticated,
                          loginWithRedirect,
                          logout,
                          user,
                      }: { isAuthenticated: boolean; loginWithRedirect: any; logout: any, user: any }) => ({
    login: loginWithRedirect,
    logout: () => logout({returnTo: window.location.origin}),
    checkError: () => Promise.resolve(),
    checkAuth: () => (isAuthenticated ? Promise.resolve() : Promise.reject()),
    getPermissions: () => Promise.reject('Unknown method'),
    getIdentity: () =>
        Promise.resolve({
            id: user.id,
            fullName: user.name,
            avatar: user.picture,
        }),
});

export default authProvider;
