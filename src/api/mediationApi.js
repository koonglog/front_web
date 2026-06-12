import CustomAxios from "./CustomAxios";

export const getMediations = async (status = "pending") => {
    const response = await CustomAxios.get("/api/v1/mediations", {
        params: {
            status,
        },
    });

    return response.data;
};