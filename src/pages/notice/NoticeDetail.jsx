import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Back from "../../assets/img/ic_gray_back.svg";
import Calendar from "../../assets/img/ic_gray_calendar.svg";
import People from "../../assets/img/ic_gray_people.svg";
import { getNoticeDetail } from '../../api/noticeApi';

const NoticeDetail = () => {
    const navigate = useNavigate();
    const { noticeId } = useParams();

    const [notice, setNotice] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchNoticeDetail = async () => {
            try {
                setIsLoading(true);
                setIsError(false);

                const data = await getNoticeDetail(noticeId);

                setNotice(data);
            } catch (error) {
                console.error("공지사항 상세 조회 실패:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (noticeId) {
            fetchNoticeDetail();
        }
    }, [noticeId]);

    const getBadgeClass = (noticeType) => {
        const badgeClassMap = {
            life_etiquette: "green",
            equipment_check: "purple",
            urgent_alert: "red",
            general_notice: "blue",
        };

        return badgeClassMap[noticeType] ?? "blue";
    };

    const getTargetTypeLabel = (targetType) => {
        if (targetType === "all") return "전체";
        if (targetType === "selected") return "선택 세대";
        return targetType ?? "-";
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return "-";

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "-";
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");

        return `${year}.${month}.${day} ${hour}:${minute}`;
    };

    if (isLoading) {
        return (
            <div className='NoticeDetail_Wrap'>
                <div className="notice_detail_box">
                    <div className="detail_title">
                        <div
                            className="back_icon"
                            onClick={() => navigate(-1)}
                        >
                            <img src={Back} alt="Back" />
                        </div>
                        <div className="title_texts">
                            <div className="title">
                                <div className="text">공지사항을 불러오는 중입니다.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !notice) {
        return (
            <div className='NoticeDetail_Wrap'>
                <div className="notice_detail_box">
                    <div className="detail_title">
                        <div
                            className="back_icon"
                            onClick={() => navigate(-1)}
                        >
                            <img src={Back} alt="Back" />
                        </div>
                        <div className="title_texts">
                            <div className="title">
                                <div className="text">공지사항 상세 조회 실패</div>
                            </div>
                            <div className="caption">
                                <div className="text">네트워크 또는 서버 상태를 확인해주세요.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const badgeClass = getBadgeClass(notice.notice_type);
    const sentAt = notice.sent_at ?? notice.created_at;
    const unconfirmedRate = 100 - (notice.confirmation_rate ?? 0);

    return (
        <div className='NoticeDetail_Wrap'>
            <div className="notice_detail_box">
                <div className="detail_title">
                    <div
                        className="back_icon"
                        onClick={() => navigate(-1)}
                    >
                        <img src={Back} alt="Back" />
                    </div>
                    <div className="title_texts">
                        <div className="title">
                            <div className="text">{notice.title}</div>
                            <div className={`badge ${badgeClass}`}>
                                {notice.notice_type_label}
                            </div>
                        </div>
                        <div className="caption">
                            <div className="icon">
                                <img src={Calendar} alt="Calendar" />
                            </div>
                            <div className="text">{formatDateTime(sentAt)}</div>
                            <div className="icon">
                                <img src={People} alt="People" />
                            </div>
                            <div className="text">{getTargetTypeLabel(notice.target_type)}</div>
                        </div>
                    </div>
                </div>
                <div className="notice_info">
                    <div className="total_receiver">
                        <div className="title">총 수신자</div>
                        <div className="number">{notice.target_count ?? 0}명</div>
                        <div className="caption">발송 대상</div>
                    </div>
                    <div className="checked_house">
                        <div className="title">확인 완료</div>
                        <div className="number">{notice.confirmed_count ?? 0}명</div>
                        <div className="caption">{notice.confirmation_rate ?? 0}%</div>
                    </div>
                    <div className="unchecked_house">
                        <div className="title">미확인</div>
                        <div className="number">{notice.unconfirmed_count ?? 0}명</div>
                        <div className="caption">{unconfirmedRate}%</div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="notice_detail">
                    <div className="title">공지 내용</div>
                    <div className="contents">{notice.content || "공지 내용이 없습니다."}</div>
                </div>
            </div>
        </div>
    );
}

export default NoticeDetail
