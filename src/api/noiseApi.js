import CustomAxios from "./CustomAxios";

export const getNoiseDistribution = async (building = null) => {
    const response = await CustomAxios.get("/api/v1/noise/distribution", {
        params: building ? { building } : {},
    });

    return response.data;
};

export const getNoiseDistributionExport = async () => {
    const response = await CustomAxios.get("/api/v1/noise/distribution/export");
    return response.data;
};