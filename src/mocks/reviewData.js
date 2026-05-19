export const mediationReviewItems = [
    {
        id: 1,
        status: "pending",
        house: "A동 304호",
        name: "김철수",
        badgeText: "승인 대기",

        requestDate: "2026.04.30 23:40",

        senderFloor: "3층",
        receiverFloor: "4층",

        originalMessage:
            "위층에서 밤 11시 이후에도 계속 쿵쿵거리는 소리가 들려서 잠을 잘 수가 없습니다. 아이들이 뛰어다니는 것 같은데 너무 심합니다.",

        aiMessage:
            "안녕하세요. 3층 거주자입니다. 밤 11시 이후 시간대에 층간소음이 감지되고 있습니다. 객관적 측정 결과, 야간 시간(22시~06시) 동안 7건의 민원 움직임이 기록되었습니다. 서로 편안한 주거환경을 위해 야간 시간대 소음 저감에 협조 부탁드립니다.",

        suggestedQuietHours: [2, 3, 4, 5, 6],
    },
    {
        id: 2,
        status: "finished",
        house: "A동 502호",
        name: "이영희",
        badgeText: "완료",

        requestDate: "2026.04.30 21:20",
        completedDate: "2026.04.30 22:15",

        senderFloor: "5층",
        receiverFloor: "6층",

        originalMessage:
            "위층에서 의자 끄는 소리가 계속 들립니다.",

        aiMessage:
            "안녕하세요. 5층 거주자입니다. 가구 이동으로 추정되는 끄는 소리가 감지되었습니다. 의자 다리에 소음 방지 패드를 부착하시면 소음을 크게 줄일 수 있습니다. 관리사무소에서 무상으로 제공하고 있으니 편하게 문의해 주세요.",

        suggestedQuietHours: {
            start: "01:00",
            end: "06:00",
        },
    },
    {
        id: 3,
        status: "finished",
        house: "B동 803호",
        name: "박민수",
        badgeText: "완료",

        requestDate: "2026.04.29 23:00",
        completedDate: "2026.04.30 10:30",

        senderFloor: "8층",
        receiverFloor: "9층",

        originalMessage:
            "위층에서 밤에 계속 쿵쿵거리는 소리가 들립니다.",

        aiMessage:
            "안녕하세요. 8층 거주자입니다. 야간 시간대에 충격성 소음이 감지되었습니다. 객관적 측정 결과, 야간 시간(22시~06시) 동안 5회의 충격음이 기록되었습니다. 서로 배려하는 이웃이 되어주세요.",

        suggestedQuietHours: {
            start: "23:00",
            end: "07:00",
        },
    },
];