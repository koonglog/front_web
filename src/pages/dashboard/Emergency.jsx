import React, { useEffect, useState } from 'react';
import Back from "../../assets/img/ic_gray_back.svg";
import Warning from "../../assets/img/ic_white_warning.svg";
import Message from "../../assets/img/ic_green_message.svg";
import { useNavigate } from 'react-router-dom';
import SendMessageModal from '../../components/dashboard/SendMessageModal';
import { getDashboardUrgent } from '../../api/dashboardApi';

const Emergency = () => {
    const navigate = useNavigate();

    const [emergencyHouseholds, setEmergencyHouseholds] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [completedButtons, setCompletedButtons] = useState({});
    const [selectedHousehold, setSelectedHousehold] = useState(null);

    useEffect(() => {
        const fetchUrgentHouseholds = async () => {
            try {
                setIsLoading(true);
                setIsError(false);

                const data = (await getDashboardUrgent()) ?? {};

                setEmergencyHouseholds(data.urgent_households ?? []);
                setTotal(data.total ?? 0);
            } catch (error) {
                console.error("긴급 대응 필요 세대 조회 실패:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUrgentHouseholds();
    }, []);

    const handleComplete = (householdId, type) => {
        setCompletedButtons((prev) => ({
            ...prev,
            [householdId]: {
                ...prev[householdId],
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
                        <div className="caption">즉시 조치가 필요한 {isLoading ? "-" : total}개 세대 (오늘 7건 이상 또는 고강도 3건 이상)</div>
                    </div>
                </div>
                <div className="emergency_contents">
                    {isLoading && (
                        <div className="household_item">
                            <div className="item_title">
                                <div className="title_text">
                                    <div className="title">
                                        <div className="location">긴급 대응 필요 세대를 불러오는 중입니다.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {isError && (
                        <div className="household_item">
                            <div className="item_title">
                                <div className="title_text">
                                    <div className="title">
                                        <div className="location">긴급 대응 필요 세대 조회 실패</div>
                                    </div>
                                    <div className="household_info">네트워크 또는 서버 상태를 확인해주세요.</div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isLoading && !isError && emergencyHouseholds.length === 0 && (
                        <div className="household_item">
                            <div className="item_title">
                                <div className="title_text">
                                    <div className="title">
                                        <div className="location">긴급 대응 필요 세대가 없습니다.</div>
                                    </div>
                                    <div className="household_info">현재 즉시 조치가 필요한 세대가 없습니다.</div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isLoading && !isError && emergencyHouseholds.map((item) => {
                        const householdName =
                            item.building_name && item.unit_number
                                ? `${item.building_name} ${item.unit_number}`
                                : item.alias;
                        const latestTime = item.latest_time
                            ? item.latest_time.slice(11, 16)
                            : "-";
                        const isConsultDone = completedButtons[item.household_id]?.consultation;
                        const isReservationDone = completedButtons[item.household_id]?.reservation;

                        return (
                            <div className="household_item" key={item.household_id}>
                                <div className="item_title">
                                    <div className="icon">
                                        <img src={Warning} alt="Warning" />
                                    </div>
                                    <div className="title_text">
                                        <div className="title">
                                            <div className="location">{householdName}</div>
                                            <div className="badge">즉시 대응 필요</div>
                                        </div>
                                        <div className="household_info">
                                            {item.resident_name ?? "-"} · {item.phone_number ?? "-"}
                                        </div>
                                    </div>
                                </div>
                                <div className="item_info">
                                    <div className="today_log">
                                        <div className="title">오늘 감지</div>
                                        <div className="number">{item.today_count ?? 0}건</div>
                                    </div>
                                    <div className="high">
                                        <div className="title">고강도</div>
                                        <div className="high_number">{item.high_count ?? 0}건</div>
                                    </div>
                                    <div className="average_duration">
                                        <div className="title">평균 지속</div>
                                        <div className="number">{item.avg_duration_min ?? 0}분</div>
                                    </div>
                                    <div className="recent_time">
                                        <div className="title">최근 시간</div>
                                        <div className="number">{latestTime}</div>
                                    </div>
                                </div>
                                <div className="item_buttons">
                                    <div className="reaction_btns">
                                        <div
                                            className={isConsultDone ? "apply_consultation_done" : "apply_consultation"}
                                            onClick={() => handleComplete(item.household_id, "consultation")}
                                        >
                                            {isConsultDone ? "상담 신청 완료" : "상담 신청 하기"}
                                        </div>
                                        <div
                                            className={isReservationDone ? "site_reservation_done" : "site_reservation"}
                                            onClick={() => handleComplete(item.household_id, "reservation")}
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
                            householdId={selectedHousehold.household_id}
                            receiverHouse={
                                selectedHousehold.building_name && selectedHousehold.unit_number
                                    ? `${selectedHousehold.building_name} ${selectedHousehold.unit_number}`
                                    : selectedHousehold.alias
                            }
                            receiverName={selectedHousehold.resident_name}
                            onClose={() => setSelectedHousehold(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Emergency
