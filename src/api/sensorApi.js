import CustomAxios from "./CustomAxios";

export const getSensorStatus = async () => {
    const response = await CustomAxios.get("/api/v1/sensors/status");

    return response.data;
};