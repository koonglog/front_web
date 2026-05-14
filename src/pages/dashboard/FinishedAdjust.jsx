import React from 'react';
import Back from "../../assets/img/ic_back.png";
import Check from "../../assets/img/ic_white_check.png";
import { useNavigate } from 'react-router-dom';

const FinishedAdjust = () => {
    const navigate = useNavigate();

    const households = [
        {
            house: "C동 1505호",
            statusClass: "badge_resolved",
            status: "현장진단",
            name: "김관리",
            phone: "",
            today: "",
            high: "",
            averageDuration: "",
            time: "2026.04.05 14:30",
            issue: "소음 측정 완료 및 중재 안내",
        },
        {
            house: "B동 803호",
            statusClass: "badge_consult",
            status: "상담",
            name: "이관리",
            phone: "",
            today: "",
            high: "",
            averageDuration: "",
            time: "2026.04.05 11:00",
            issue: "양측 세대 조율 완료",
        },
        {
            house: "A동 402호",
            statusClass: "badge_resolved",
            status: "현장진단",
            name: "박관리",
            phone: "",
            today: "",
            high: "",
            averageDuration: "",
            time: "2026.04.04 16:20",
            issue: "층간소음 기준치 미만 확인",
        },
    ];

    return (
        <div className='FinishedAdjust_Wrap'>
            <div className="adjust_box">
                <div className="adjust_title">
                    <div
                        className="back_icon"
                        onClick={() => navigate(-1)}
                    >
                        <img src={Back} alt="Back" />
                    </div>
                    <div className="title_text">
                        <div className="title">조치 완료 내역</div>
                        <div className="caption">최근 완료된 조치 {households.length}건 (현장진단, 상담 등)</div>
                    </div>
                </div>
                <div className="adjust_contents">
                    {households.map((item) => {
                        return (
                            <div className="list_item">
                                <div className="item_title">
                                    <div className="icon">
                                        <img src={Check} alt="Check" />
                                    </div>
                                    <div className="title_text">
                                        <div className="title">
                                            <div className="location">{item.house}</div>
                                            <div className="adjust_type">{item.status}</div>
                                        </div>
                                        <div className="caption">{item.time} · 담당: {item.name}</div>
                                    </div>
                                </div>
                                <div className="item_result">
                                    <div className="result_title">조치 결과</div>
                                    <div className="result_contents">{item.issue}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default FinishedAdjust
