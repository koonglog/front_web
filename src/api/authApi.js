import CustomAxios from "./CustomAxios";

export const loginAdmin = async ({ email, password }) => {
    const response = await CustomAxios.post("/api/v1/auth/login", {
        email,
        password,
    });

    return response.data;
};

export const logoutAdmin = async () => {
    const response = await CustomAxios.post("/api/v1/auth/logout");

    return response.data;
};