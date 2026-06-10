import React, { useEffect, useState } from 'react';
import Back from "../../assets/img/ic_gray_back.svg";
import Filter from "../../assets/img/ic_gray_filter.svg";
import Clock from "../../assets/img/ic_gray_clock.svg";
import RedSound from "../../assets/img/ic_red_sound.svg";
import OrangeSound from "../../assets/img/ic_orange_sound.svg";
import BlueSound from "../../assets/img/ic_blue_sound.svg";
import { useNavigate } from 'react-router-dom';
import { getDashboardTodayEvents } from '../../api/dashboardApi';

const TodayTotal = () => {
    const navigate = useNavigate();

    const [todayTotalItems, setTodayTotalItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchTodayEvents = async () => {
            try {
                setIsLoading(true);
                setIsError(false);

                const data = (await getDashboardTodayEvents()) ?? {};

                setTodayTotalItems(data.events ?? []);
                setTotal(data.total ?? 0);
            } catch (error) {
                console.error("오늘 발생 소음 조회 실패:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTodayEvents();
    }, []);

    const severityInfoMap = {
        high: {
            statusClass: "badge_high",
            status: "고강도",
            icon: RedSound,
        },
        medium: {
            statusClass: "badge_middle",
            status: "중강도",
            icon: OrangeSound,
        },
        low: {
            statusClass: "badge_low",
            status: "저강도",
            icon: BlueSound,
        },
    };

    const eventTypeMap = {
        impact_noise: "충격음",
        daily_noise: "생활 소음",
        background_noise: "배경 소음",
    };

    const formatTodayDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}.${month}.${day}`;
    };

    const formatTime = (dateString) => {
        if (!dateString) return "-";

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "-";
        }

        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");

        return `${hour}:${minute}`;
    };

    const formatDuration = (durationMs) => {
        if (durationMs === null || durationMs === undefined) return "0초";

        const seconds = Math.round(durationMs / 1000);

        return `${seconds}초`;
    };

    return (
        <div className='TodayTotal_Wrap'>
            <div className="today_total_box">
                <div className="total_title">
                    <div className="title_left">
                        <div
                            className="back_icon"
                            onClick={() => navigate(-1)}
                        >
                            <img src={Back} alt="Back" />
                        </div>
                        <div className="title_text">
                            <div className="title">오늘 발생 소음 종합</div>
                            <div className="caption">
                                시간순 정렬 · 총 {isLoading ? "-" : total}건 ({formatTodayDate()})
                            </div>
                        </div>
                    </div>
                    <div className="title_right">
                        <div className="icon">
                            <img src={Filter} alt="Filter" />
                        </div>
                        <div className="text">필터</div>
                    </div>
                </div>
                <div className="today_total_contents">
                    {isLoading && (
                        <div className="list_item">
                            <div className="texts">
                                <div className="text_top">
                                    <div className="location">오늘 발생 소음을 불러오는 중입니다.</div>
                                </div>
                            </div>
                        </div>
                    )}
                    {isError && (
                        <div className="list_item">
                            <div className="texts">
                                <div className="text_top">
                                    <div className="location">오늘 발생 소음 조회 실패</div>
                                </div>
                                <div className="text_bottom">
                                    <div className="duration_time">네트워크 또는 서버 상태를 확인해주세요.</div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isLoading && !isError && todayTotalItems.length === 0 && (
                        <div className="list_item">
                            <div className="texts">
                                <div className="text_top">
                                    <div className="location">오늘 발생한 소음이 없습니다.</div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isLoading && !isError && todayTotalItems.map((item) => {
                        const severityInfo = severityInfoMap[item.severity] ?? severityInfoMap.low;
                        const houseName =
                            item.building_name && item.unit_number
                                ? `${item.building_name} ${item.unit_number}`
                                : item.alias;
                        const eventType = eventTypeMap[item.event_type] ?? item.event_type;

                        return (
                            <div className="list_item" key={item.id}>
                                <div className={`icon ${severityInfo.statusClass}`}>
                                    <img src={severityInfo.icon} alt={severityInfo.status} />
                                </div>
                                <div className="texts">
                                    <div className="text_top">
                                        <div className="location">{houseName}</div>
                                        <div className={`badge ${severityInfo.statusClass}`}>
                                            {severityInfo.status}
                                        </div>
                                        <div className="log_type">{eventType}</div>
                                    </div>
                                    <div className="text_bottom">
                                        <div className="icon">
                                            <img src={Clock} alt="Clock" />
                                        </div>
                                        <div className="time">{formatTime(item.timestamp)}</div>
                                        <div className="duration_time">
                                            지속시간 {formatDuration(item.duration_ms)} · {item.sound_level}dB
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default TodayTotal
