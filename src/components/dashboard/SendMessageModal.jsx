import React, { useEffect, useState } from 'react';
import Cancel from "../../assets/img/ic_gray_cancel.svg";
import Send from "../../assets/img/ic_white_send.svg";
import { getHouseholdNoiseStats } from '../../api/dashboardApi';
import { createNotice } from '../../api/noticeApi';

const messageTypes = [
    "긴급 알림",
    "일반 안내",
    "생활 에티켓",
    "점검 안내",
];

const messageTypeValueMap = {
    "긴급 알림": "urgent_alert",
    "일반 안내": "general_notice",
    "생활 에티켓": "life_etiquette",
    "점검 안내": "equipment_check",
};

const SendMessageModal = ({ householdId, receiverHouse, receiverName, onClose }) => {
    const [selectedType, setSelectedType] = useState("");
    const [messageTitle, setMessageTitle] = useState("");
    const [messageContent, setMessageContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [noiseStats, setNoiseStats] = useState({
        total_count: 0,
        high_count: 0,
        avg_duration_min: 0,
    });

    const [isNoiseStatsLoading, setIsNoiseStatsLoading] = useState(true);
    const [isNoiseStatsError, setIsNoiseStatsError] = useState(false);

    useEffect(() => {
        const fetchNoiseStats = async () => {
            if (!householdId) return;

            try {
                setIsNoiseStatsLoading(true);
                setIsNoiseStatsError(false);

                const data = await getHouseholdNoiseStats(householdId);

                setNoiseStats({
                    total_count: data.total_count ?? 0,
                    high_count: data.high_count ?? 0,
                    avg_duration_min: data.avg_duration_min ?? 0,
                });
            } catch (error) {
                console.error("세대 소음 통계 조회 실패:", error);
                setIsNoiseStatsError(true);
            } finally {
                setIsNoiseStatsLoading(false);
            }
        };

        fetchNoiseStats();
    }, [householdId]);

    const handleClickMessageType = (type) => {
        setSelectedType(type);
        setMessageTitle(`[${type}] `);
    };

    const renderNoiseStatsText = () => {
        if (isNoiseStatsLoading) {
            return "소음 데이터를 불러오는 중입니다.";
        }

        if (isNoiseStatsError) {
            return "소음 데이터 조회에 실패했습니다.";
        }

        return `오늘 감지: ${noiseStats.total_count}건 | 고강도: ${noiseStats.high_count}건 | 평균 지속: ${noiseStats.avg_duration_min}분`;
    };

    const handleSendMessage = async () => {
        if (!householdId) {
            alert("세대 정보가 없습니다.");
            return;
        }

        if (!selectedType) {
            alert("메시지 유형을 선택해주세요.");
            return;
        }

        if (!messageTitle.trim()) {
            alert("메시지 제목을 입력해주세요.");
            return;
        }

        if (!messageContent.trim()) {
            alert("메시지 내용을 입력해주세요.");
            return;
        }

        try {
            setIsSubmitting(true);

            await createNotice({
                title: messageTitle,
                content: messageContent,
                noticeType: messageTypeValueMap[selectedType] ?? selectedType,
                targetType: "selected",
                targetHouseholds: [String(householdId)],
                scheduledAt: null,
            });

            alert("메시지가 발송되었습니다.");
            onClose();
        } catch (error) {
            console.error("세대 메시지 발송 실패:", error);
            alert("메시지 발송에 실패했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='SendMessageModal_Wrap'>
            <div className="modal_top">
                <div className="modal_title">
                    <div className="title">세대 메시지 발송</div>
                    <div className="receiver_info">{receiverHouse} - {receiverName}</div>
                </div>
                <div className="cancel" onClick={onClose}>
                    <img src={Cancel} alt="Cancel" />
                </div>
            </div>
            <div className="divider"></div>
            <div className="modal_main">
                <div className="message_type">
                    <div className="title">메시지 유형</div>
                    <div className="type_lists">
                        {messageTypes.map((type) => (
                            <div
                                className={`type_item ${selectedType === type ? "active" : ""}`}
                                key={type}
                                onClick={() => handleClickMessageType(type)}
                            >
                                {type}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="message_title">
                    <div className="msg_title">메시지 제목</div>
                    <div className="message_input">
                        <input
                            type="text"
                            placeholder='메시지 제목을 입력하세요'
                            name="msg_title_input"
                            id="msg_title_input"
                            value={messageTitle}
                            onChange={(e) => setMessageTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div className="message_contents">
                    <div className="msg_contents">메시지 내용</div>
                    <div className="message_input">
                        <textarea
                            placeholder='메시지 내용을 입력하세요.'
                            name="msg_contents_input"
                            id="msg_contents_input"
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                        />
                    </div>
                </div>
                <div className="divider"></div>
                <div className="recent_data">
                    <div className="recent_title">해당 세대의 최근 24시간 소음 데이터 첨부</div>
                    <div className="data_item">{renderNoiseStatsText()}</div>
                </div>
            </div>
            <div className="divider"></div>
            <div className="buttons">
                <div className="cancel_btn" onClick={onClose}>취소</div>
                <div
                    className="send_btn"
                    onClick={() => {
                        if (!isSubmitting) {
                            handleSendMessage();
                        }
                    }}
                >
                    <div className="icon">
                        <img src={Send} alt="Send" />
                    </div>
                    <div className="text">
                        {isSubmitting ? "발송 중..." : "메시지 발송"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SendMessageModal
