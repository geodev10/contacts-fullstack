export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectError = (state) => state.auth.error;
export const selectRefresh = (state) => state.auth.isRefreshing;
