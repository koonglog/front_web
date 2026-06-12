import CustomAxios from "./CustomAxios";

export const getDashboardHouseholds = async () => {
    const response = await CustomAxios.get("/api/v1/dashboard/households");
    return response.data;
};

export const getDashboardHourly = async (hours = 24) => {
    const response = await CustomAxios.get("/api/v1/dashboard/hourly", {
        params: {
            hours,
        },
    });

    return response.data;
};

export const getDashboardStats = async () => {
    const response = await CustomAxios.get("/api/v1/dashboard/stats");
    return response.data;
};

export const getPendingMediations = async () => {
    const response = await CustomAxios.get("/api/v1/dashboard/pending-mediations");
    return response.data;
};

export const getHouseholdNoiseStats = async (householdId) => {
    const response = await CustomAxios.get(
        `/api/v1/households/${householdId}/noise-stats`
    );

    return response.data;
};

export const getDashboardUrgent = async () => {
    const response = await CustomAxios.get("/api/v1/dashboard/urgent");
    return response.data;
};

export const getDashboardTodayEvents = async () => {
    const response = await CustomAxios.get("/api/v1/dashboard/today-events");
    return response.data;
};

export const getDashboardCompleted = async () => {
    const response = await CustomAxios.get("/api/v1/dashboard/completed");
    return response.data;
};

export const getNoiseHotspot = async () => {
    const response = await CustomAxios.get("/api/v1/noise/hotspot");
    return response.data;
};