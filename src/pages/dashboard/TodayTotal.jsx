import React from 'react';
import Back from "../../assets/img/ic_back.png";
import { households } from "../../mocks/dashboardData";
import Filter from "../../assets/img/ic_gray_filter.png";
import Clock from "../../assets/img/ic_gray_clock.png";
import RedSound from "../../assets/img/ic_red_sound.png";
import OrangeSound from "../../assets/img/ic_orange_sound.png";
import BlueSound from "../../assets/img/ic_blue_sound.png";
import { useNavigate } from 'react-router-dom';

const TodayTotal = () => {
    const navigate = useNavigate();

    const todayTotalItems = households.flatMap((household) =>
        household.events.map((event) => ({
            house: household.house,
            statusClass: household.statusClass,
            status:
                household.statusClass === "badge_high"
                    ? "고강도"
                    : household.statusClass === "badge_medium"
                        ? "중강도"
                        : "저강도",

            averageDuration: event.duration,
            time: event.timeRange.split("~")[1].trim(),
            issue: event.type,
        }))
    );

    const soundIconMap = {
        badge_high: RedSound,
        badge_medium: OrangeSound,
        badge_low: BlueSound,
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
                            <div className="caption">시간순 정렬 · 총 {todayTotalItems.length}건 (2026.04.30)</div>
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
                    {todayTotalItems.map((item) => {
                        return (
                            <div className="list_item">
                                <div className={`icon ${item.statusClass}`}>
                                    <img src={soundIconMap[item.statusClass]} alt={item.status} />
                                </div>
                                <div className="texts">
                                    <div className="text_top">
                                        <div className="location">{item.house}</div>
                                        <div className={`badge ${item.statusClass}`}>{item.status}</div>
                                        <div className="log_type">{item.issue}</div>
                                    </div>
                                    <div className="text_bottom">
                                        <div className="icon">
                                            <img src={Clock} alt="Clock" />
                                        </div>
                                        <div className="time">{item.time}</div>
                                        <div className="duration_time">지속시간 {item.averageDuration}</div>
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
