import CustomAxios from "./CustomAxios";

export const getDashboardNoticeSummary = async () => {
    const response = await CustomAxios.get("/api/v1/dashboard/notices/summary");
    return response.data;
};