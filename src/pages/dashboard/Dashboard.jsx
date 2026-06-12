import React, { useEffect, useState } from 'react';
import Search from "../../assets/img/ic_gray_search.svg";
import HomeIcon from "../../assets/img/ic_blue_home.svg";
import Warning from "../../assets/img/ic_red_warning.svg";
import Calendar from "../../assets/img/ic_orange_calendar.svg";
import Check from "../../assets/img/ic_green_check.svg";
import ChevronDown from "../../assets/img/ic_chevron_down.svg";
import ChevronUp from "../../assets/img/ic_chevron_up.svg";
import Message from "../../assets/img/ic_green_message.svg";
import {
    households,
    feedItems,
} from "../../mocks/dashboardData";
import Clock from "../../assets/img/ic_gray_clock.svg";
import Notice from "../../assets/img/ic_orange_notice.svg";
import { useNavigate } from 'react-router-dom';
import SendMessageModal from '../../components/dashboard/SendMessageModal';
import { getDashboardHourly, getDashboardStats, getNoiseHotspot } from '../../api/dashboardApi';

const Dashboard = () => {
    const navigate = useNavigate();

    const hourlyFilterOptions = [
        { label: "최근 24시간", value: 24 },
        { label: "최근 12시간", value: 12 },
        { label: "최근 3시간", value: 3 },
        { label: "최근 1시간", value: 1 },
    ];

    const [selectedHousehold, setSelectedHousehold] = useState(households[0]);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

    const [dashboardStats, setDashboardStats] = useState({
        total_households: 0,
        urgent_households: 0,
        today_noise_count: 0,
        completed_count: 0,
    });

    const [isStatsLoading, setIsStatsLoading] = useState(true);
    const [isStatsError, setIsStatsError] = useState(false);

    const [hourlyData, setHourlyData] = useState([]);
    const [hourlyPeriod, setHourlyPeriod] = useState("최근 24시간");
    const [isHourlyLoading, setIsHourlyLoading] = useState(true);
    const [isHourlyError, setIsHourlyError] = useState(false);

    const [selectedHourlyFilter, setSelectedHourlyFilter] = useState(hourlyFilterOptions[0]);
    const [isHourlyFilterOpen, setIsHourlyFilterOpen] = useState(false);

    const formatHourlyData = (hourly) => {
        if (!hourly) return [];

        return Object.entries(hourly)
            .sort(([hourA], [hourB]) => Number(hourA) - Number(hourB))
            .map(([hour, value]) => ({
                hour: hour.padStart(2, "0"),
                total: value.total ?? 0,
            }));
    };

    const [hotspotBuildings, setHotspotBuildings] = useState([]);
    const [hotspotLegend, setHotspotLegend] = useState({
        urgent: "긴급 대응 필요",
        caution: "관찰 필요",
        normal: "정상",
    });
    const [isHotspotLoading, setIsHotspotLoading] = useState(true);
    const [isHotspotError, setIsHotspotError] = useState(false);

    useEffect(() => {
        const fetchHourlyData = async () => {
            try {
                setIsHourlyLoading(true);
                setIsHourlyError(false);

                const data = await getDashboardHourly(selectedHourlyFilter.value);

                setHourlyData(formatHourlyData(data.hourly));
                setHourlyPeriod(data.period || selectedHourlyFilter.label);
            } catch (error) {
                console.error("전체 시간대별 발생 현황 조회 실패:", error);
                setIsHourlyError(true);
            } finally {
                setIsHourlyLoading(false);
            }
        };

        fetchHourlyData();
    }, [selectedHourlyFilter]);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                setIsStatsLoading(true);
                setIsStatsError(false);

                const data = await getDashboardStats();

                setDashboardStats({
                    total_households: data.total_households ?? 0,
                    urgent_households: data.urgent_households ?? 0,
                    today_noise_count: data.today_noise_count ?? 0,
                    completed_count: data.completed_count ?? 0,
                });
            } catch (error) {
                console.error("대시보드 통계 조회 실패:", error);
                setIsStatsError(true);
            } finally {
                setIsStatsLoading(false);
            }
        };

        fetchDashboardStats();
    }, []);

    useEffect(() => {
        const fetchNoiseHotspot = async () => {
            try {
                setIsHotspotLoading(true);
                setIsHotspotError(false);

                const data = (await getNoiseHotspot()) ?? {};

                const buildings = Object.entries(data.buildings ?? {}).map(([name, value]) => ({
                    name,
                    urgent: value.urgent ?? 0,
                    caution: value.caution ?? 0,
                    normal: value.normal ?? 0,
                    total: value.total ?? 0,
                }));

                setHotspotBuildings(buildings);
                setHotspotLegend({
                    urgent: data.legend?.urgent ?? "긴급 대응 필요",
                    caution: data.legend?.caution ?? "관찰 필요",
                    normal: data.legend?.normal ?? "정상",
                });
            } catch (error) {
                console.error("갈등 핫스팟 맵 조회 실패:", error);
                setIsHotspotError(true);
            } finally {
                setIsHotspotLoading(false);
            }
        };

        fetchNoiseHotspot();
    }, []);

    const maxHourlyTotal = Math.max(
        ...hourlyData.map((item) => item.total),
        1
    );

    const handleClickHourlyFilter = (option) => {
        setSelectedHourlyFilter(option);
        setIsHourlyFilterOpen(false);
    };

    const getHotspotStatus = (building) => {
        if (building.urgent > 0) {
            return {
                className: "urgent",
                label: hotspotLegend.urgent,
            };
        }

        if (building.caution > 0) {
            return {
                className: "caution",
                label: hotspotLegend.caution,
            };
        }

        return {
            className: "normal",
            label: hotspotLegend.normal,
        };
    };

    return (
        <div className='Dashboard_Wrap'>
            <aside className='dashboard_aside'>
                <div className="aside_title">세대 현황</div>
                <div className="aside_search">
                    <div className="icon">
                        <img src={Search} alt="Search" />
                    </div>
                    <input type="search" placeholder="동/호수 검색" name="aside_search" id="aside_search" />
                </div>
                <div className="aside_lists">
                    {households.map((item) => (
                        <div
                            key={item.house}
                            className={selectedHousehold.house === item.house ? "household_item_selected" : "household_item"}
                            onClick={() => setSelectedHousehold(item)}
                        >
                            <div className="household_info">
                                <div className="location">
                                    <div className="text">{item.house}</div>
                                    <div className={`circle ${item.circleClass}`}></div>
                                </div>
                                <div className="time">{item.time}</div>
                            </div>
                            <div className="household_log">
                                <div className="event_number">오늘 {item.today}</div>
                                <div className="high_intensity">
                                    {item.high !== "0건" ? `고강도 ${item.high.replace("건", "")}` : ""}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
            <main className="dashboard_main">
                <div className="manage_info">
                    <div
                        className="monitoring"
                        onClick={() => navigate("monitoring")}
                    >
                        <div className="icon">
                            <img src={HomeIcon} alt="HomeIcon" />
                        </div>
                        <div className="text">
                            <div className="title">모니터링 세대</div>
                            <div className="number">{isStatsLoading ? "-" : dashboardStats.total_households}</div>
                        </div>
                    </div>
                    <div
                        className="emergency"
                        onClick={() => navigate("emergency")}
                    >
                        <div className="icon">
                            <img src={Warning} alt="Warning" />
                        </div>
                        <div className="text">
                            <div className="title">긴급 대응 필요</div>
                            <div className="number">{isStatsLoading ? "-" : dashboardStats.urgent_households}</div>
                        </div>
                    </div>
                    <div
                        className="today_total"
                        onClick={() => navigate("todayTotal")}
                    >
                        <div className="icon">
                            <img src={Calendar} alt="Calendar" />
                        </div>
                        <div className="text">
                            <div className="title">오늘 발생 소음 종합</div>
                            <div className="number">{isStatsLoading ? "-" : dashboardStats.today_noise_count}</div>
                        </div>
                    </div>
                    <div
                        className="finished_adjust"
                        onClick={() => navigate("finishedAdjust")}
                    >
                        <div className="icon">
                            <img src={Check} alt="Check" />
                        </div>
                        <div className="text">
                            <div className="title">조치 완료</div>
                            <div className="number">{isStatsLoading ? "-" : dashboardStats.completed_count}</div>
                        </div>
                    </div>
                </div>
                <div className="mapNfeed">
                    <div className="hotspot">
                        <div className="hotspot_title">
                            <div className="text">
                                <div className="title">갈등 핫스팟 맵</div>
                                <div className="caption">건물별 소음 발생 현황</div>
                            </div>
                            <div className="detail" onClick={() => navigate("/log-analysis")}>자세히 보기</div>
                        </div>
                        <div className="hotspot_map">
                            {isHotspotLoading && (
                                <div className="hotspot_status">핫스팟 맵을 불러오는 중입니다.</div>
                            )}
                            {isHotspotError && (
                                <div className="hotspot_status">핫스팟 맵 조회에 실패했습니다.</div>
                            )}
                            {!isHotspotLoading && !isHotspotError && hotspotBuildings.length === 0 && (
                                <div className="hotspot_status">표시할 핫스팟 데이터가 없습니다.</div>
                            )}
                            {!isHotspotLoading && !isHotspotError && hotspotBuildings.length > 0 && (
                                <div className="hotspot_scroll_area">
                                    {hotspotBuildings.map((building) => {
                                        const status = getHotspotStatus(building);

                                        return (
                                            <div
                                                className={`hotspot_building_item ${status.className}`}
                                                key={building.name}
                                            >
                                                <div className="building_name">{building.name}</div>
                                                <div className="building_counts">
                                                    {building.urgent > 0 && (
                                                        <div className="count_item urgent">
                                                            <div className="circle"></div>
                                                            <div className="count_text">{building.urgent}개</div>
                                                        </div>
                                                    )}
                                                    {building.caution > 0 && (
                                                        <div className="count_item caution">
                                                            <div className="circle"></div>
                                                            <div className="count_text">{building.caution}개</div>
                                                        </div>
                                                    )}
                                                    {building.normal > 0 && (
                                                        <div className="count_item normal">
                                                            <div className="circle"></div>
                                                            <div className="count_text">{building.normal}개</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="divider"></div>
                        <div className="value_info">
                            <div className="emergency">
                                <div className="circle"></div>
                                <div className="text">긴급</div>
                            </div>
                            <div className="observation">
                                <div className="circle"></div>
                                <div className="text">관찰</div>
                            </div>
                            <div className="low">
                                <div className="circle"></div>
                                <div className="text">정상</div>
                            </div>
                        </div>
                    </div>
                    <div className="realtime_feed">
                        <div className="feed_title">
                            <div className="title">실시간 피드</div>
                            <div className="caption">최근 감지된 이벤트</div>
                        </div>
                        <div className="feed_lists">
                            {feedItems.map((item, index) => (
                                <div className="feed_item" key={`${item.house}-${item.issue}-${index}`}>
                                    <div className={item.iconClass}>
                                        <img src={item.icon} alt={item.issue} />
                                    </div>
                                    <div className="text">
                                        <div className="feed_info">{item.house}: {item.issue}</div>
                                        <div className="detail">{item.detail}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="overall_status">
                    <div className="status_title">
                        <div className="title_left">
                            <div className="title">전체 시간대별 발생 현황</div>
                            <div className="caption">모든 세대 합산 · {hourlyPeriod}</div>
                        </div>
                        <div
                            className="title_right"
                            onClick={() => setIsHourlyFilterOpen((prev) => !prev)}
                        >
                            <div className="icon">
                                <img
                                    src={isHourlyFilterOpen ? ChevronUp : ChevronDown}
                                    alt="Chevron"
                                />
                            </div>
                            <div className="text">{selectedHourlyFilter.label}</div>
                            {isHourlyFilterOpen && (
                                <div className="filter_dropdown">
                                    {hourlyFilterOptions.map((option) => (
                                        <div
                                            key={option.value}
                                            className={`dropdown_item ${selectedHourlyFilter.value === option.value ? "active" : ""}`}
                                            onClick={() => handleClickHourlyFilter(option)}
                                        >
                                            {option.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="status_graph">
                        {isHourlyLoading && (
                            <div className="graph_status">
                                시간대별 발생 현황을 불러오는 중입니다.
                            </div>
                        )}
                        {isHourlyError && (
                            <div className="graph_status">
                                시간대별 발생 현황 조회에 실패했습니다.
                            </div>
                        )}
                        {!isHourlyLoading && !isHourlyError && (
                            <div className="hourly_chart">
                                <div className="chart_grid">
                                    {[16, 12, 8, 4, 0].map((value) => (
                                        <div className="grid_row" key={value}>
                                            <div className="y_label">{value}</div>
                                            <div className="grid_line"></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bar_chart">
                                    {hourlyData.map((item) => {
                                        const barHeight = item.total === 0
                                            ? 0.9
                                            : Math.max((item.total / maxHourlyTotal) * 100, 8);

                                        return (
                                            <div className="bar_item" key={item.hour}>
                                                <div className="bar_box">
                                                    <div
                                                        className="bar"
                                                        style={{
                                                            height: `${barHeight}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="hour_label">{item.hour}시</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="household_analysis">
                    <div className="household_title">
                        <div className="title_left">
                            <div className="title">
                                <div className="location">{selectedHousehold.house}</div>
                                <div className={`badge ${selectedHousehold.statusClass}`}>
                                    {selectedHousehold.status}
                                </div>
                            </div>
                            <div className="recent_event">최근 이벤트: {selectedHousehold.recentEvent}</div>
                        </div>
                        <div className="title_right">
                            {selectedHousehold.status === "즉시 대응 필요" && (
                                <div className="adjust_btn">대응</div>
                            )}
                            <div
                                className="message_btn"
                                onClick={() => setIsMessageModalOpen(true)}
                            >
                                <div className="icon">
                                    <img src={Message} alt="Message" />
                                </div>
                                <div className="text">메시지</div>
                            </div>
                        </div>
                    </div>
                    <div className="household_manage">
                        <div className="today_event">
                            <div className="title">오늘 감지</div>
                            <div className="number">{selectedHousehold.today}</div>
                        </div>
                        <div className="high_intensity">
                            <div className="title">고강도</div>
                            <div className="number">{selectedHousehold.high}</div>
                        </div>
                        <div className="average_duration">
                            <div className="title">평균 지속</div>
                            <div className="number">{selectedHousehold.averageDuration}</div>
                        </div>
                    </div>
                    <div className="recent_events">
                        <div className="event_title">최근 이벤트</div>
                        <div className="event_lists">
                            {selectedHousehold.events.map((event, index) => (
                                <div className="event_item" key={`${event.type}-${index}`}>
                                    <div className="event_info">
                                        <div className="info_left">
                                            <div className={event.iconClass}>
                                                <img src={event.icon} alt={event.type} />
                                            </div>
                                            <div className="info_text">
                                                <div className="event_type">{event.type}</div>
                                                <div className="event_from">{event.from}</div>
                                            </div>
                                        </div>
                                        <div className={`info_right_${event.intensityClass}`}>
                                            {event.intensity}
                                        </div>
                                    </div>
                                    <div className="event_detail">
                                        <div className="time">
                                            <div className="icon">
                                                <img src={Clock} alt="Clock" />
                                            </div>
                                            <div className="text">{event.timeRange}</div>
                                            <div className="duration_time">지속 {event.duration}</div>
                                        </div>
                                        <div className="repeat">
                                            <div className="icon">
                                                <img src={Notice} alt="Notice" />
                                            </div>
                                            <div className="text">반복 {event.repeat}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {isMessageModalOpen && (
                        <div className="modal_overlay">
                            <SendMessageModal
                                receiverHouse={selectedHousehold.house}
                                receiverName={selectedHousehold.name}
                                onClose={() => setIsMessageModalOpen(false)}
                            />
                        </div>
                    )}
                </div>
            </main >
        </div >
    )
}

export default Dashboard
