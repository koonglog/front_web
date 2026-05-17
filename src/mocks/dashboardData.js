import RedSound from "../assets/img/ic_red_sound.png";
import OrangeSound from "../assets/img/ic_orange_sound.png";
import BlueSound from "../assets/img/ic_blue_sound.png";

export const dashboardSummary = {
    monitoring: 4,
    emergency: 2,
    todayTotal: 21,
    finishedAdjust: 3,
};

export const
    households = [
        {
            house: "A동 304호",
            status: "즉시 대응 필요",
            statusClass: "badge_high",
            circleClass: "circle_high",

            name: "김철수",
            phone: "010-1234-5678",

            today: "7건",
            high: "3건",
            averageDuration: "12분",
            time: "23:34",
            recentEvent: "23:34",

            events: [
                {
                    type: "반복 충격음",
                    from: "위층",
                    intensity: "강도 강",
                    intensityClass: "red",

                    icon: RedSound,
                    iconClass: "icon_red",

                    timeRange: "23:20 ~ 23:34",
                    duration: "14분",
                    repeat: "7회",
                },

                {
                    type: "끄는 소리",
                    from: "위층",
                    intensity: "강도 중",
                    intensityClass: "orange",

                    icon: OrangeSound,
                    iconClass: "icon_orange",

                    timeRange: "22:45 ~ 22:52",
                    duration: "7분",
                    repeat: "3회",
                },
            ],
        },

        {
            house: "A동 502호",
            status: "관찰 필요",
            statusClass: "badge_middle",
            circleClass: "circle_middle",

            name: "이영희",
            phone: "010-2345-6789",

            today: "4건",
            high: "1건",
            averageDuration: "5분",
            time: "21:15",
            recentEvent: "21:15",

            events: [
                {
                    type: "충격음",
                    from: "위층",
                    intensity: "강도 중",
                    intensityClass: "orange",

                    icon: OrangeSound,
                    iconClass: "icon_orange",

                    timeRange: "21:10 ~ 21:15",
                    duration: "5분",
                    repeat: "2회",
                },
            ],
        },

        {
            house: "B동 1208호",
            status: "정상",
            statusClass: "badge_low",
            circleClass: "circle_low",

            name: "박민수",
            phone: "010-3456-7890",

            today: "2건",
            high: "0건",
            averageDuration: "3분",
            time: "19:30",
            recentEvent: "19:30",

            events: [
                {
                    type: "충격음",
                    from: "위층",
                    intensity: "강도 약",
                    intensityClass: "green",

                    icon: BlueSound,
                    iconClass: "icon_green",

                    timeRange: "19:27 ~ 19:30",
                    duration: "3분",
                    repeat: "1회",
                },
            ],
        },

        {
            house: "A동 705호",
            status: "즉시 대응 필요",
            statusClass: "badge_high",
            circleClass: "circle_high",

            name: "정수연",
            phone: "010-4567-8901",

            today: "8건",
            high: "4건",
            averageDuration: "15분",
            time: "00:12",
            recentEvent: "00:12",

            events: [
                {
                    type: "끄는 소리",
                    from: "위층",
                    intensity: "강도 강",
                    intensityClass: "red",

                    icon: RedSound,
                    iconClass: "icon_red",

                    timeRange: "23:57 ~ 00:12",
                    duration: "15분",
                    repeat: "6회",
                },
            ],
        },
    ];

export const feedItems = [
    {
        icon: RedSound,
        iconClass: "icon_red",
        house: "A동 304호",
        issue: "반복 충격음",
        detail: "23:34 · 14분",
    },

    {
        icon: RedSound,
        iconClass: "icon_red",
        house: "A동 705호",
        issue: "끄는 소리",
        detail: "23:15 · 18분",
    },

    {
        icon: OrangeSound,
        iconClass: "icon_orange",
        house: "A동 502호",
        issue: "충격음",
        detail: "21:15 · 5분",
    },
];

export const finishedAdjustItems = [
    {
        house: "C동 1505호",
        status: "현장진단",
        name: "김관리",
        time: "2026.04.05 14:30",
        issue: "소음 측정 완료 및 중재 안내",
    },

    {
        house: "B동 803호",
        status: "상담",
        name: "이관리",
        time: "2026.04.05 11:00",
        issue: "양측 세대 조율 완료",
    },
];

export const messageTypes = [
    "긴급 알림",
    "일반 안내",
    "생활 에티켓",
    "점검 안내",
];