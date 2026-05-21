import React, { useState } from 'react';
import Back from "../../assets/img/ic_gray_back.svg";
import { households } from "../../mocks/dashboardData";
import Warning from "../../assets/img/ic_white_warning.svg";
import Message from "../../assets/img/ic_green_message.svg";
import { useNavigate } from 'react-router-dom';
import SendMessageModal from '../../components/dashboard/SendMessageModal';

const Emergency = () => {
    const navigate = useNavigate();

    const emergencyHouseholds = households.filter(
        (item) => item.status === "즉시 대응 필요"
    );

    const [completedButtons, setCompletedButtons] = useState({});
    const [selectedHousehold, setSelectedHousehold] = useState(null);

    const handleComplete = (house, type) => {
        setCompletedButtons((prev) => ({
            ...prev,
            [house]: {
                ...prev[house],
                [type]: true,
            },
        }));
    };

    return (
        <div className='Emergency_Wrap'>
            <div className="emergency_box">
                <div className="emergency_title">
                    <div
                        className="back_icon"
                        onClick={() => navigate(-1)}
                    >
                        <img src={Back} alt="Back" />
                    </div>
                    <div className="title_text">
                        <div className="title">긴급 대응 필요 세대</div>
                        <div className="caption">즉시 조치가 필요한 {emergencyHouseholds.length}개 세대 (오늘 7건 이상 또는 고강도 3건 이상)</div>
                    </div>
                </div>
                <div className="emergency_contents">
                    {emergencyHouseholds.map((item) => {
                        const isConsultDone = completedButtons[item.house]?.consultation;
                        const isReservationDone = completedButtons[item.house]?.reservation;

                        return (
                            <div className="household_item" key={item.house}>
                                <div className="item_title">
                                    <div className="icon">
                                        <img src={Warning} alt="Warning" />
                                    </div>
                                    <div className="title_text">
                                        <div className="title">
                                            <div className="location">{item.house}</div>
                                            <div className="badge">{item.status}</div>
                                        </div>
                                        <div className="household_info">
                                            {item.name} · {item.phone}
                                        </div>
                                    </div>
                                </div>
                                <div className="item_info">
                                    <div className="today_log">
                                        <div className="title">오늘 감지</div>
                                        <div className="number">{item.today}</div>
                                    </div>
                                    <div className="high">
                                        <div className="title">고강도</div>
                                        <div className="high_number">{item.high}</div>
                                    </div>
                                    <div className="average_duration">
                                        <div className="title">평균 지속</div>
                                        <div className="number">{item.averageDuration}</div>
                                    </div>
                                    <div className="recent_time">
                                        <div className="title">최근 시간</div>
                                        <div className="number">{item.time}</div>
                                    </div>
                                </div>
                                <div className="item_buttons">
                                    <div className="reaction_btns">
                                        <div
                                            className={isConsultDone ? "apply_consultation_done" : "apply_consultation"}
                                            onClick={() => handleComplete(item.house, "consultation")}
                                        >
                                            {isConsultDone ? "상담 신청 완료" : "상담 신청 하기"}
                                        </div>

                                        <div
                                            className={isReservationDone ? "site_reservation_done" : "site_reservation"}
                                            onClick={() => handleComplete(item.house, "reservation")}
                                        >
                                            {isReservationDone ? "현장진단 예약 완료" : "현장진단 예약하기"}
                                        </div>
                                    </div>
                                    <div
                                        className="message_btn"
                                        onClick={() => setSelectedHousehold(item)}
                                    >
                                        <img src={Message} alt="Message" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedHousehold && (
                <div className="modal_overlay" onClick={() => setSelectedHousehold(null)}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <SendMessageModal
                            receiverHouse={selectedHousehold.house}
                            receiverName={selectedHousehold.name}
                            onClose={() => setSelectedHousehold(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Emergency
