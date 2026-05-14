import React from 'react';
import Back from "../../assets/img/ic_back.png";
import Filter from "../../assets/img/ic_gray_filter.png";
import Clock from "../../assets/img/ic_gray_clock.png";
import RedSound from "../../assets/img/ic_red_sound.png";
import OrangeSound from "../../assets/img/ic_orange_sound.png";
import BlueSound from "../../assets/img/ic_blue_sound.png";
import { useNavigate } from 'react-router-dom';

const TodayTotal = () => {
    const navigate = useNavigate();

    const households = [
        {
            house: "A동 304호",
            statusClass: "badge_high",
            status: "고강도",
            name: "",
            phone: "",
            today: "",
            high: "",
            averageDuration: "14분",
            time: "23:34",
            issue: "반복 충격음",
        },
        {
            house: "A동 705호",
            statusClass: "badge_high",
            status: "고강도",
            name: "",
            phone: "",
            today: "",
            high: "",
            averageDuration: "18분",
            time: "23:15",
            issue: "기능 소리",
        },
        {
            house: "A동 304호",
            statusClass: "badge_medium",
            status: "중강도",
            name: "",
            phone: "",
            today: "",
            high: "",
            averageDuration: "7분",
            time: "22:45",
            issue: "끄는 소리",
        },
        {
            house: "A동 502호",
            statusClass: "badge_medium",
            status: "중강도",
            name: "",
            phone: "",
            today: "",
            high: "",
            averageDuration: "5분",
            time: "21:15",
            issue: "충격음",
        },
        {
            house: "B동 1208호",
            statusClass: "badge_low",
            status: "저강도",
            name: "",
            phone: "",
            today: "",
            high: "",
            averageDuration: "3분",
            time: "19:30",
            issue: "충격음",
        },
        {
            house: "A동 705호",
            statusClass: "badge_high",
            status: "고강도",
            name: "",
            phone: "",
            today: "",
            high: "",
            averageDuration: "12분",
            time: "22:50",
            issue: "반복 충격음",
        },
    ];

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
                            <div className="caption">시간순 정렬 · 총 6건 (2026.04.30)</div>
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
                    {households.map((item) => {
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
