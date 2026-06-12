import React, { useEffect, useState } from 'react';
import Write from "../../assets/img/ic_white_edit.svg";
import Calendar from "../../assets/img/ic_gray_calendar.svg";
import People from "../../assets/img/ic_gray_people.svg";
import Eye from "../../assets/img/ic_gray_eye.svg";
import { useNavigate } from 'react-router-dom';
import { getNotices } from '../../api/noticeApi';

const Notice = () => {
    const navigate = useNavigate();

    const [notices, setNotices] = useState([]);
    const [total, setTotal] = useState(0);
    const [noticeTypes, setNoticeTypes] = useState({});
    const [statuses, setStatuses] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [selectedNoticeType, setSelectedNoticeType] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                setIsLoading(true);
                setIsError(false);

                const data = (await getNotices({
                    noticeType: selectedNoticeType,
                    status: selectedStatus,
                })) ?? {};

                setNotices(data.notices ?? []);
                setTotal(data.total ?? 0);
                setNoticeTypes(data.notice_types ?? {});
                setStatuses(data.statuses ?? {});
            } catch (error) {
                console.error("공지사항 목록 조회 실패:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotices();
    }, [selectedNoticeType, selectedStatus]);

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

    const formatDate = (dateString) => {
        if (!dateString) return "-";

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "-";
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}.${month}.${day}`;
    };

    const averageConfirmationRate = notices.length > 0
        ? Math.round(
            notices.reduce(
                (sum, notice) => sum + (notice.confirmation_rate ?? 0),
                0
            ) / notices.length
        )
        : 0;

    const latestSentAt = notices.length > 0
        ? notices
            .map((notice) => notice.sent_at ?? notice.created_at)
            .filter(Boolean)
            .sort((a, b) => new Date(b) - new Date(a))[0]
        : null;

    const totalRecipients = notices.length > 0
        ? Math.max(...notices.map((notice) => notice.target_count ?? 0))
        : 0;

    return (
        <div className='Notice_Wrap'>
            <div className="notice_box">
                <div className="notice_title">
                    <div className="title_text">
                        <div className="title">공지사항</div>
                        <div className="caption">주민 앱 전송 및 수신 확인 통계</div>
                    </div>
                    <div
                        className="write_btn"
                        onClick={() => navigate("write")}
                    >
                        <div className="icon">
                            <img src={Write} alt="Write" />
                        </div>
                        <div className="text">글쓰기</div>
                    </div>
                </div>
                <div className="notice_info">
                    <div className="total_send">
                        <div className="title">전체 발송</div>
                        <div className="number">{isLoading ? "-" : total}건</div>
                        <div className="caption">지난 30일</div>
                    </div>
                    <div className="average_read">
                        <div className="title">평균 확인율</div>
                        <div className="number">{isLoading ? "-" : averageConfirmationRate}%</div>
                        <div className="caption">전체 공지 기준</div>
                    </div>
                    <div className="recent_send">
                        <div className="title">최근 발송</div>
                        <div className="number">{isLoading ? "-" : formatDate(latestSentAt)}</div>
                        <div className="caption">마지막 발송일</div>
                    </div>
                    <div className="total_receiver">
                        <div className="title">전체 수신자</div>
                        <div className="number">{isLoading ? "-" : totalRecipients}세대</div>
                        <div className="caption">등록된 주민</div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="notice_contents">
                    {isLoading && (
                        <div className="list_item">
                            <div className="item_texts">
                                <div className="item_title">
                                    <div className="title">공지사항을 불러오는 중입니다.</div>
                                </div>
                            </div>
                        </div>
                    )}
                    {isError && (
                        <div className="list_item">
                            <div className="item_texts">
                                <div className="item_title">
                                    <div className="title">공지사항 조회 실패</div>
                                </div>
                                <div className="item_info">
                                    네트워크 또는 서버 상태를 확인해주세요.
                                </div>
                            </div>
                        </div>
                    )}
                    {!isLoading && !isError && notices.length === 0 && (
                        <div className="list_item">
                            <div className="item_texts">
                                <div className="item_title">
                                    <div className="title">공지사항이 없습니다.</div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isLoading && !isError && notices.map((item) => {
                        const badgeClass = getBadgeClass(item.notice_type);

                        return (
                            <div className="list_item" key={item.id}>
                                <div className="item_texts">
                                    <div className="item_title">
                                        <div className={`badge ${badgeClass}`}>
                                            {item.notice_type_label}
                                        </div>
                                        <div className="title">{item.title}</div>
                                    </div>

                                    <div className="item_info">
                                        <div className="icon">
                                            <img src={Calendar} alt="Calendar" />
                                        </div>
                                        <div className="time">
                                            {formatDateTime(item.sent_at ?? item.created_at)}
                                        </div>

                                        <div className="icon">
                                            <img src={People} alt="People" />
                                        </div>
                                        <div className="receiver">
                                            {getTargetTypeLabel(item.target_type)} · {item.target_count}명
                                        </div>

                                        <div className="icon">
                                            <img src={Eye} alt="Eye" />
                                        </div>
                                        <div className="read_text">
                                            확인 {item.confirmed_count}명 ({item.confirmation_rate}%)
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="goto_detail"
                                    onClick={() => navigate(`/notice/${item.id}`)}
                                >
                                    상세보기
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Notice
