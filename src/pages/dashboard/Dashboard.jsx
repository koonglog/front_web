import React, { useEffect, useState } from 'react';
import RedSound from "../../assets/img/ic_red_sound.svg";
import OrangeSound from "../../assets/img/ic_orange_sound.svg";
import BlueSound from "../../assets/img/ic_blue_sound.svg";
import Search from "../../assets/img/ic_gray_search.svg";
import HomeIcon from "../../assets/img/ic_blue_home.svg";
import Warning from "../../assets/img/ic_red_warning.svg";
import Calendar from "../../assets/img/ic_orange_calendar.svg";
import Check from "../../assets/img/ic_green_check.svg";
import ChevronDown from "../../assets/img/ic_chevron_down.svg";
import ChevronUp from "../../assets/img/ic_chevron_up.svg";
import Message from "../../assets/img/ic_green_message.svg";
import Clock from "../../assets/img/ic_gray_clock.svg";
import Notice from "../../assets/img/ic_orange_notice.svg";
import { useNavigate } from 'react-router-dom';
import SendMessageModal from '../../components/dashboard/SendMessageModal';
import {
    getDashboardHouseholds,
    getDashboardHourly,
    getDashboardStats,
    getNoiseHotspot,
    getRecentNoiseLogs,
} from '../../api/dashboardApi';

const Dashboard = () => {
    const navigate = useNavigate();

    const hourlyFilterOptions = [
        { label: "최근 24시간", value: 24 },
        { label: "최근 12시간", value: 12 },
        { label: "최근 3시간", value: 3 },
        { label: "최근 1시간", value: 1 },
    ];

    const [dashboardHouseholds, setDashboardHouseholds] = useState([]);
    const [selectedHousehold, setSelectedHousehold] = useState(null);
    const [householdSearch, setHouseholdSearch] = useState("");
    const [isHouseholdsLoading, setIsHouseholdsLoading] = useState(true);
    const [isHouseholdsError, setIsHouseholdsError] = useState(false);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

    const [dashboardStats, setDashboardStats] = useState({
        total_households: 0,
        urgent_households: 0,
        today_noise_count: 0,
        completed_count: 0,
    });

    const [isStatsLoading, setIsStatsLoading] = useState(true);

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

                const data = await getDashboardStats();

                setDashboardStats({
                    total_households: data.total_households ?? 0,
                    urgent_households: data.urgent_households ?? 0,
                    today_noise_count: data.today_noise_count ?? 0,
                    completed_count: data.completed_count ?? 0,
                });
            } catch (error) {
                console.error("대시보드 통계 조회 실패:", error);
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

    useEffect(() => {
        const fetchRecentNoiseLogs = async () => {
            try {
                setIsRecentNoiseLogsLoading(true);
                setIsRecentNoiseLogsError(false);

                const data = await getRecentNoiseLogs();

                setRecentNoiseLogs(data.logs ?? []);
            } catch (error) {
                console.error("최근 소음 로그 조회 실패:", error);
                setIsRecentNoiseLogsError(true);
            } finally {
                setIsRecentNoiseLogsLoading(false);
            }
        };

        fetchRecentNoiseLogs();
    }, []);

    useEffect(() => {
        const fetchDashboardHouseholds = async () => {
            try {
                setIsHouseholdsLoading(true);
                setIsHouseholdsError(false);

                const data = await getDashboardHouseholds({
                    search: householdSearch.trim() || null,
                });

                const households = data.households ?? [];

                setDashboardHouseholds(households);

                setSelectedHousehold((prev) => {
                    if (!prev) return households[0] ?? null;

                    const stillExists = households.find(
                        (household) => household.household_id === prev.household_id
                    );

                    return stillExists ?? households[0] ?? null;
                });
            } catch (error) {
                console.error("대시보드 세대 목록 조회 실패:", error);
                setIsHouseholdsError(true);
            } finally {
                setIsHouseholdsLoading(false);
            }
        };

        const timer = setTimeout(fetchDashboardHouseholds, 300);

        return () => clearTimeout(timer);
    }, [householdSearch]);

    const maxHourlyTotal = Math.max(
        ...hourlyData.map((item) => item.total),
        1
    );

    const handleClickHourlyFilter = (event, option) => {
        event.stopPropagation();

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

    const [recentNoiseLogs, setRecentNoiseLogs] = useState([]);
    const [isRecentNoiseLogsLoading, setIsRecentNoiseLogsLoading] = useState(true);
    const [isRecentNoiseLogsError, setIsRecentNoiseLogsError] = useState(false);

    const [selectedHouseholdLogs, setSelectedHouseholdLogs] = useState([]);
    const [isSelectedLogsLoading, setIsSelectedLogsLoading] = useState(false);
    const [isSelectedLogsError, setIsSelectedLogsError] = useState(false);

    useEffect(() => {
        const fetchSelectedHouseholdLogs = async () => {
            if (!selectedHousehold?.household_id) {
                setSelectedHouseholdLogs([]);
                return;
            }

            try {
                setIsSelectedLogsLoading(true);
                setIsSelectedLogsError(false);

                const data = await getRecentNoiseLogs({
                    householdId: selectedHousehold.household_id,
                    limit: 3,
                });

                setSelectedHouseholdLogs(data.logs ?? []);
            } catch (error) {
                console.error("선택 세대 최근 이벤트 조회 실패:", error);
                setIsSelectedLogsError(true);
            } finally {
                setIsSelectedLogsLoading(false);
            }
        };

        fetchSelectedHouseholdLogs();
    }, [selectedHousehold?.household_id]);

    const getEventTypeLabel = (eventType) => {
        switch (eventType) {
            case "impact_noise":
                return "충격음";
            case "daily_noise":
                return "생활 소음";
            case "background_noise":
                return "배경 소음";
            default:
                return "소음 이벤트";
        }
    };

    const getSeverityLabel = (severity) => {
        switch (severity) {
            case "high":
                return "높음";
            case "medium":
                return "보통";
            case "low":
                return "낮음";
            default:
                return "알 수 없음";
        }
    };

    const getSeverityIconClass = (severity) => {
        switch (severity) {
            case "high":
                return "icon_red";
            case "medium":
                return "icon_orange";
            case "low":
                return "icon_blue";
            default:
                return "icon_blue";
        }
    };

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case "high":
                return RedSound;
            case "medium":
                return OrangeSound;
            case "low":
                return BlueSound;
            default:
                return BlueSound;
        }
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return "-";

        const date = new Date(timestamp);

        if (Number.isNaN(date.getTime())) {
            return "-";
        }

        return date.toLocaleString("ko-KR", {
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getHouseholdName = (item) => {
        if (item.building_name && item.unit_number) {
            return `${item.building_name} ${item.unit_number}`;
        }

        return item.alias ?? `세대 ${item.household_id}`;
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

    const getDashboardHouseholdName = (household) => {
        if (!household) return "-";

        if (household.building_name && household.unit_number) {
            return `${formatBuildingName(household.building_name)} ${formatUnitNumber(household.unit_number)}`;
        }

        return household.alias ?? `세대 ${household.household_id}`;
    };

    const getStatusCircleClass = (status) => {
        switch (status) {
            case "urgent":
                return "circle_high";
            case "caution":
                return "circle_middle";
            case "normal":
                return "circle_low";
            default:
                return "circle_low";
        }
    };

    const getStatusBadgeClass = (status) => {
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

    const getLatestTimeText = (household) => {
        if (!household?.latest_time) return "-";

        const date = new Date(household.latest_time);

        if (Number.isNaN(date.getTime())) return "-";

        return date.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    const getEventIconClass = (severity) => {
        switch (severity) {
            case "high":
                return "icon_red";
            case "medium":
                return "icon_orange";
            case "low":
                return "icon_green";
            default:
                return "icon_green";
        }
    };

    const getEventIcon = (severity) => {
        switch (severity) {
            case "high":
                return RedSound;
            case "medium":
                return OrangeSound;
            case "low":
                return BlueSound;
            default:
                return BlueSound;
        }
    };

    const getEventIntensityClass = (severity) => {
        switch (severity) {
            case "high":
                return "red";
            case "medium":
                return "orange";
            case "low":
                return "green";
            default:
                return "green";
        }
    };

    const formatEventTime = (timestamp) => {
        if (!timestamp) return "-";

        const date = new Date(timestamp);

        if (Number.isNaN(date.getTime())) return "-";

        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");

        return `${hour}:${minute}`;
    };

    const getRecentNoiseTimeText = () => {
        if (selectedHouseholdLogs.length === 0) {
            return "-";
        }

        return formatEventTime(selectedHouseholdLogs[0].timestamp);
    };

    const formatDuration = (durationMs) => {
        const seconds = Math.round((durationMs ?? 0) / 1000);

        if (seconds < 60) {
            return `${seconds}초`;
        }

        const minutes = Math.round(seconds / 60);
        return `${minutes}분`;
    };

    return (
        <div className='Dashboard_Wrap'>
            <aside className='dashboard_aside'>
                <div className="aside_title">세대 현황</div>
                <div className="aside_search">
                    <div className="icon">
                        <img src={Search} alt="Search" />
                    </div>
                    <input
                        type="search"
                        placeholder="동/호수 검색"
                        name="aside_search"
                        id="aside_search"
                        value={householdSearch}
                        onChange={(event) => setHouseholdSearch(event.target.value)}
                    />
                </div>
                <div className="aside_lists">
                    {isHouseholdsLoading && (
                        <div className="household_item">
                            <div className="household_info">
                                <div className="location">
                                    <div className="text">세대 목록을 불러오는 중입니다.</div>
                                </div>
                            </div>
                        </div>
                    )}
                    {isHouseholdsError && (
                        <div className="household_item">
                            <div className="household_info">
                                <div className="location">
                                    <div className="text">세대 목록 조회 실패</div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isHouseholdsLoading && !isHouseholdsError && dashboardHouseholds.length === 0 && (
                        <div className="household_item">
                            <div className="household_info">
                                <div className="location">
                                    <div className="text">검색 결과가 없습니다.</div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isHouseholdsLoading && !isHouseholdsError && dashboardHouseholds.map((item) => (
                        <div
                            key={item.household_id}
                            className={
                                selectedHousehold?.household_id === item.household_id
                                    ? "household_item_selected"
                                    : "household_item"
                            }
                            onClick={() => setSelectedHousehold(item)}
                        >
                            <div className="household_info">
                                <div className="location">
                                    <div className="text">{getDashboardHouseholdName(item)}</div>
                                    <div className={`circle ${getStatusCircleClass(item.status)}`}></div>
                                </div>
                                <div className="time">{getLatestTimeText(item)}</div>
                            </div>
                            <div className="household_log">
                                <div className="event_number">오늘 {item.today_count ?? 0}건</div>
                                <div className="high_intensity">
                                    {(item.high_count ?? 0) > 0 ? `고강도 ${item.high_count}` : ""}
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
                            {isRecentNoiseLogsLoading && (
                                <div className="feed_status">최근 이벤트를 불러오는 중입니다.</div>
                            )}
                            {isRecentNoiseLogsError && (
                                <div className="feed_status">최근 이벤트 조회에 실패했습니다.</div>
                            )}
                            {!isRecentNoiseLogsLoading && !isRecentNoiseLogsError && recentNoiseLogs.length === 0 && (
                                <div className="feed_status">최근 감지된 이벤트가 없습니다.</div>
                            )}
                            {!isRecentNoiseLogsLoading && !isRecentNoiseLogsError && recentNoiseLogs.map((item) => {
                                const eventTypeLabel = getEventTypeLabel(item.event_type);
                                const severityLabel = getSeverityLabel(item.severity);
                                const severityIconClass = getSeverityIconClass(item.severity);
                                const severityIcon = getSeverityIcon(item.severity);

                                return (
                                    <div className="feed_item" key={item.id}>
                                        <div className={severityIconClass}>
                                            <img src={severityIcon} alt={eventTypeLabel} />
                                        </div>
                                        <div className="text">
                                            <div className="feed_info">
                                                {getHouseholdName(item)}: {eventTypeLabel}
                                            </div>
                                            <div className="detail">
                                                {item.sound_level}dB · {severityLabel} · {formatTimestamp(item.timestamp)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
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
                                            onClick={(event) => handleClickHourlyFilter(event, option)}
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
                                                <div className="hour_label">
                                                    {selectedHourlyFilter.value === 1 ? item.hour : `${item.hour}시`}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {selectedHousehold && (
                    <div className="household_analysis">
                        <div className="household_title">
                            <div className="title_left">
                                <div className="title">
                                    <div className="location">{getDashboardHouseholdName(selectedHousehold)}</div>
                                    <div className={`badge ${getStatusBadgeClass(selectedHousehold.status)}`}>
                                        {selectedHousehold.status_label ?? "정상"}
                                    </div>
                                </div>
                                <div className="recent_event">
                                    최근 이벤트: {isSelectedLogsLoading ? "불러오는 중" : getRecentNoiseTimeText()}
                                </div>
                            </div>
                            <div className="title_right">
                                {selectedHousehold.status === "urgent" && (
                                    <div
                                        className="adjust_btn"
                                        onClick={() => navigate("emergency")}
                                    >
                                        대응
                                    </div>
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
                                <div className="number">{selectedHousehold.today_count ?? 0}건</div>
                            </div>
                            <div className="high_intensity">
                                <div className="title">고강도</div>
                                <div className="number">{selectedHousehold.high_count ?? 0}건</div>
                            </div>
                            <div className="average_duration">
                                <div className="title">최근 시간</div>
                                <div className="number">{getLatestTimeText(selectedHousehold)}</div>
                            </div>
                        </div>
                        <div className="recent_events">
                            <div className="event_title">최근 이벤트</div>
                            <div className="event_lists">
                                {isSelectedLogsLoading && (
                                    <div className="event_item">
                                        <div className="event_info">
                                            <div className="info_left">
                                                <div className="info_text">
                                                    <div className="event_type">최근 이벤트를 불러오는 중입니다.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {isSelectedLogsError && (
                                    <div className="event_item">
                                        <div className="event_info">
                                            <div className="info_left">
                                                <div className="info_text">
                                                    <div className="event_type">최근 이벤트 조회에 실패했습니다.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {!isSelectedLogsLoading && !isSelectedLogsError && selectedHouseholdLogs.length === 0 && (
                                    <div className="event_item">
                                        <div className="event_info">
                                            <div className="info_left">
                                                <div className="info_text">
                                                    <div className="event_type">최근 이벤트 없음</div>
                                                    <div className="event_from">{getDashboardHouseholdName(selectedHousehold)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {!isSelectedLogsLoading && !isSelectedLogsError && selectedHouseholdLogs.map((event) => {
                                    const eventTypeLabel = getEventTypeLabel(event.event_type);
                                    const severityLabel = getSeverityLabel(event.severity);
                                    const intensityClass = getEventIntensityClass(event.severity);

                                    return (
                                        <div className="event_item" key={event.id}>
                                            <div className="event_info">
                                                <div className="info_left">
                                                    <div className={getEventIconClass(event.severity)}>
                                                        <img
                                                            src={getEventIcon(event.severity)}
                                                            alt={eventTypeLabel}
                                                        />
                                                    </div>
                                                    <div className="info_text">
                                                        <div className="event_type">{eventTypeLabel}</div>
                                                        <div className="event_from">
                                                            {getDashboardHouseholdName(event)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`info_right_${intensityClass}`}>
                                                    {severityLabel}
                                                </div>
                                            </div>
                                            <div className="event_detail">
                                                <div className="time">
                                                    <div className="icon">
                                                        <img src={Clock} alt="Clock" />
                                                    </div>
                                                    <div className="text">{formatEventTime(event.timestamp)}</div>
                                                    <div className="duration_time">
                                                        지속 {formatDuration(event.duration_ms)}
                                                    </div>
                                                </div>
                                                <div className="repeat">
                                                    <div className="icon">
                                                        <img src={Notice} alt="Notice" />
                                                    </div>
                                                    <div className="text">
                                                        {event.sound_level ?? 0}dB
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {isMessageModalOpen && (
                            <div className="modal_overlay">
                                <SendMessageModal
                                    householdId={selectedHousehold.household_id}
                                    receiverHouse={getDashboardHouseholdName(selectedHousehold)}
                                    receiverName={selectedHousehold.resident_name}
                                    onClose={() => setIsMessageModalOpen(false)}
                                />
                            </div>
                        )}
                    </div>
                )}
            </main >
        </div >
    )
}

export default Dashboard
