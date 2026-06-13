import CustomAxios from "./CustomAxios";

export const getMediations = async (status = "pending") => {
    const response = await CustomAxios.get("/api/v1/mediations", {
        params: {
            status,
        },
    });

    return response.data;
};

export const updateMediation = async (mediationId, {
    status,
    aiMessage,
    residentMessage,
}) => {
    const response = await CustomAxios.patch(`/api/v1/mediations/${mediationId}`, {
        status,
        ai_message: aiMessage,
        resident_message: residentMessage,
    });

    return response.data;
};