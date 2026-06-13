import CustomAxios from "./CustomAxios";

export const getDashboardNoticeSummary = async () => {
    const response = await CustomAxios.get("/api/v1/dashboard/notices/summary");
    return response.data;
};

export const getNotices = async ({ noticeType = null, status = null } = {}) => {
    const response = await CustomAxios.get("/api/v1/notices", {
        params: {
            notice_type: noticeType,
            status,
        },
    });

    return response.data;
};

export const getNoticeDetail = async (noticeId) => {
    const response = await CustomAxios.get(`/api/v1/notices/${noticeId}`);
    return response.data;
};

export const getHouseholdsByBuilding = async () => {
    const response = await CustomAxios.get("/api/v1/dashboard/households/by-building");
    return response.data;
};