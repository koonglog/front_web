export const noticeTypes = [
    "긴급 알림",
    "일반 공지",
    "생활 에티켓",
    "장비 점검 안내",
];

export const noticeSummary = {
    totalSent: 5,
    averageReadRate: 88,
    recentSentDate: "2026.05.12",
    totalRecipients: 234,
};

export const noticeItems = [
    {
        id: 1,
        title: "야간 소음 자제 안내",
        type: "생활 에티켓",
        typeClass: "badge_green",

        sentAt: "2026.05.12 20:00",

        target: "전체",
        recipients: 234,

        readCount: 215,
        unreadCount: 19,

        readRate: 92,
        unreadRate: 8,

        content:
            "안녕하세요. 관리사무소입니다. 밤 10시 이후 생활 소음으로 인한 층간 불편이 증가하고 있습니다. 청소기, 세탁기 사용을 자제하시고 실내화 착용을 권장드립니다. 서로 배려하는 아름다운 이웃이 되어주세요. 감사합니다.",
    },

    {
        id: 2,
        title: "빨간 소음 현황 안내",
        type: "일반 공지",
        typeClass: "badge_blue",

        sentAt: "2026.05.10 14:00",

        target: "전체",
        recipients: 234,

        readCount: 198,
        unreadCount: 36,

        readRate: 85,
        unreadRate: 15,

        content:
            "최근 일부 세대에서 반복적인 생활 소음이 감지되고 있습니다. 서로 배려하는 생활 문화 조성에 협조 부탁드립니다.",
    },

    {
        id: 3,
        title: "센서 점검 안내 (101동)",
        type: "장비 점검 안내",
        typeClass: "badge_purple",

        sentAt: "2026.05.08 10:00",

        target: "특정 동/호수",
        recipients: 45,

        readCount: 43,
        unreadCount: 2,

        readRate: 96,
        unreadRate: 4,

        content:
            "101동 센서 장비 점검이 예정되어 있습니다. 점검 시간 동안 일부 기능 사용이 제한될 수 있습니다.",
    },

    {
        id: 4,
        title: "층간소음 예방 캠페인",
        type: "일반 공지",
        typeClass: "badge_blue",

        sentAt: "2026.05.05 09:00",

        target: "전체",
        recipients: 234,

        readCount: 180,
        unreadCount: 54,

        readRate: 77,
        unreadRate: 23,

        content:
            "층간소음 예방을 위한 생활 수칙 캠페인을 진행합니다. 주민 여러분의 많은 협조 부탁드립니다.",
    },

    {
        id: 5,
        title: "발소리 완화 가이드",
        type: "생활 에티켓",
        typeClass: "badge_green",

        sentAt: "2026.05.03 16:00",

        target: "전체",
        recipients: 234,

        readCount: 210,
        unreadCount: 24,

        readRate: 90,
        unreadRate: 10,

        content:
            "실내 슬리퍼 착용 및 러그 사용은 층간소음 완화에 도움이 됩니다. 작은 배려로 쾌적한 주거 환경을 만들어주세요.",
    },
];

export const aiTemplates = [
    {
        id: 1,
        type: "긴급 알림",
        title: "긴급 점검 안내",
        content: "안녕하세요. 관리사무소입니다. 긴급 점검으로 인해 일부 시설 이용이 제한될 수 있으니 입주민 여러분의 양해 부탁드립니다.",
    },
    {
        id: 2,
        type: "일반 공지",
        title: "관리사무소 공지사항 안내",
        content: "안녕하세요. 관리사무소입니다. 단지 운영과 관련된 공지사항을 안내드리오니 입주민 여러분께서는 확인 부탁드립니다.",
    },
    {
        id: 3,
        type: "생활 에티켓",
        title: "공동주택 생활 에티켓 안내",
        content: "안녕하세요. 관리사무소입니다. 쾌적한 공동주택 생활을 위해 늦은 시간 소음 발생을 자제해주시고 이웃을 배려해주시기 바랍니다.",
    },
    {
        id: 4,
        type: "장비 점검 안내",
        title: "단지 내 장비 점검 안내",
        content: "안녕하세요. 관리사무소입니다. 단지 내 장비 점검이 예정되어 있어 안내드립니다. 점검 시간 동안 일부 이용이 제한될 수 있습니다.",
    },
];