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

// 관리자 프로필 조회
export const getAdminProfile = async (adminId) => {
    const response = await CustomAxios.get(`/api/v1/admin/profile/${adminId}`);

    return response.data;
};