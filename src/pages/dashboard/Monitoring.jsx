import React, { useEffect, useState } from 'react';
import BackIcon from "../../assets/img/ic_gray_back.svg";
import Filter from "../../assets/img/ic_gray_filter.svg";
import Message from "../../assets/img/ic_green_message.svg";
import SendMessageModal from '../../components/dashboard/SendMessageModal';
import { useNavigate } from 'react-router-dom';
import { getDashboardHouseholds } from '../../api/dashboardApi';

const Monitoring = () => {
    const navigate = useNavigate();

    const [households, setHouseholds] = useState([]);
    const [total, setTotal] = useState(0);
    const [selectedHousehold, setSelectedHousehold] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchHouseholds = async () => {
            try {
                setIsLoading(true);
                setIsError(false);

                const data = await getDashboardHouseholds();

                setHouseholds(data.households || []);
                setTotal(data.total ?? data.households?.length ?? 0);
            } catch (error) {
                console.error("전체 모니터링 세대 조회 실패:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHouseholds();
    }, []);

    const getStatusClassName = (status) => {
        switch (status) {
            case "urgent":
                return "badge_high";
            case "caution":
                return "badge_middle";
            case "normal":
                return "badge_low";
            default:
                return "badge_low";
        }
    };

    const formatLatestTime = (latestTime) => {
        if (!latestTime) return "-";

        const date = new Date(latestTime);

        if (Number.isNaN(date.getTime())) {
            return "-";
        }

        const year = String(date.getFullYear()).slice(2);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");

        return `${year}.${month}.${day} ${hour}:${minute}`;
    };

    const formatBuildingName = (buildingName) => {
        if (!buildingName) return "";

        return buildingName.endsWith("동") ? buildingName : `${buildingName}동`;
    };

    const formatUnitNumber = (unitNumber) => {
        if (!unitNumber) return "";

        const unitText = String(unitNumber);

        return unitText.endsWith("호") ? unitText : `${unitText}호`;
    };

    const getHouseholdName = (household) => {
        if (!household) return "-";

        if (household.building_name && household.unit_number) {
            return `${formatBuildingName(household.building_name)} ${formatUnitNumber(household.unit_number)}`;
        }

        return household.alias ?? `세대 ${household.household_id}`;
    };

    return (
        <div className='Monitoring_Wrap'>
            <div className="monitoring_box">
                <div className="monitoring_top">
                    <div className="monitoring_left">
                        <div
                            className="back_icon"
                            onClick={() => navigate(-1)}
                        >
                            <img src={BackIcon} alt="BackIcon" />
                        </div>
                        <div className="monitoring_text">
                            <div className="title">전체 모니터링 세대</div>
                            <div className="caption">총 {total}개 세대 실시간 현황</div>
                        </div>
                    </div>
                    <div className="monitoring_right">
                        <div className="filter_btn">
                            <div className="icon">
                                <img src={Filter} alt="Filter" />
                            </div>
                            <div className="text">필터</div>
                        </div>
                    </div>
                </div>
                {isLoading && (
                    <div className="table_status">
                        전체 모니터링 세대를 불러오는 중입니다.
                    </div>
                )}
                {isError && (
                    <div className="table_status">
                        전체 모니터링 세대 조회에 실패했습니다.
                    </div>
                )}
                {!isLoading && !isError && (
                    <table>
                        <thead>
                            <tr>
                                <td>동/호</td>
                                <td>상태</td>
                                <td>입주민</td>
                                <td>연락처</td>
                                <td>오늘 이벤트</td>
                                <td>고강도</td>
                                <td>최근 시간</td>
                                <td>조치</td>
                            </tr>
                        </thead>
                        <tbody>
                            {households.map((item) => (
                                <tr key={item.household_id}>
                                    <td className='text_bold'>{getHouseholdName(item)}</td>
                                    <td className={getStatusClassName(item.status)}>{item.status_label}</td>
                                    <td>{item.resident_name}</td>
                                    <td>{item.phone_number}</td>
                                    <td className='text_bold'>{item.today_count}</td>
                                    <td className='high'>{item.high_count}</td>
                                    <td>{formatLatestTime(item.latest_time)}</td>
                                    <td
                                        className='icon'
                                        onClick={() => setSelectedHousehold(item)}
                                    >
                                        <img src={Message} alt="Message" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {selectedHousehold && (
                    <div className="modal_overlay" onClick={() => setSelectedHousehold(null)}>
                        <div onClick={(e) => e.stopPropagation()}>
                            <SendMessageModal
                                householdId={selectedHousehold.household_id}
                                receiverHouse={getHouseholdName(selectedHousehold)}
                                receiverName={selectedHousehold.resident_name}
                                onClose={() => setSelectedHousehold(null)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Monitoring
