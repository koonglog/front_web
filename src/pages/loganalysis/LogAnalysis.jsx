import React, { useEffect, useState } from 'react';
import DownArrow from "../../assets/img/ic_chevron_down.svg";
import UpArrow from "../../assets/img/ic_chevron_up.svg";
import Download from "../../assets/img/ic_white_download.svg";
import { getRecentNoiseLogs } from '../../api/dashboardApi';

const LogAnalysis = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("최근 24시간");

    const [hourlyData, setHourlyData] = useState([]);
    const [summary, setSummary] = useState({
        nightMaxHour: "-",
        nightMaxCount: 0,
        dayMaxHour: "-",
        dayMaxCount: 0,
        totalExceededHouseholds: 0,
        normalHourCount: 0,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const filterOptions = [
        "최근 24시간",
        "최근 12시간",
        "최근 3시간",
        "최근 1시간",
    ];

    const getFilterHours = (filter) => {
        switch (filter) {
            case "최근 1시간":
                return 1;
            case "최근 3시간":
                return 3;
            case "최근 12시간":
                return 12;
            case "최근 24시간":
            default:
                return 24;
        }
    };

    const getSinceTime = (hours) => {
        const date = new Date();
        date.setHours(date.getHours() - hours);
        return date.toISOString();
    };

    const formatHourLabel = (hour) => {
        return String(hour).padStart(2, "0");
    };

    const isOneHourFilter = (filter) => filter === "최근 1시간";

    const formatTimeLabel = (date) => {
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");

        return `${hour}:${minute}`;
    };

    const formatThresholdData = (logs = [], filter) => {
        const hours = getFilterHours(filter);
        const now = new Date();

        if (isOneHourFilter(filter)) {
            const timeSlots = Array.from({ length: 12 }, (_, index) => {
                const slotDate = new Date(now);
                slotDate.setMinutes(now.getMinutes() - (11 - index) * 5);
                slotDate.setSeconds(0);
                slotDate.setMilliseconds(0);

                const roundedMinute = Math.floor(slotDate.getMinutes() / 5) * 5;
                slotDate.setMinutes(roundedMinute);

                return {
                    label: formatTimeLabel(slotDate),
                    dayHouseholds: new Set(),
                    nightHouseholds: new Set(),
                };
            });

            logs.forEach((log) => {
                if (!log.timestamp || !log.household_id) return;

                const date = new Date(log.timestamp);

                if (Number.isNaN(date.getTime())) return;

                const roundedDate = new Date(date);
                const roundedMinute = Math.floor(roundedDate.getMinutes() / 5) * 5;
                roundedDate.setMinutes(roundedMinute);
                roundedDate.setSeconds(0);
                roundedDate.setMilliseconds(0);

                const label = formatTimeLabel(roundedDate);
                const targetSlot = timeSlots.find((slot) => slot.label === label);

                if (!targetSlot) return;

                const soundLevel = Number(log.sound_level ?? 0);

                if (log.is_night && soundLevel >= 34) {
                    targetSlot.nightHouseholds.add(log.household_id);
                }

                if (!log.is_night && soundLevel >= 39) {
                    targetSlot.dayHouseholds.add(log.household_id);
                }
            });

            return timeSlots.map((item) => ({
                label: item.label,
                dayCount: item.dayHouseholds.size,
                nightCount: item.nightHouseholds.size,
            }));
        }

        const hourSlots = Array.from({ length: hours }, (_, index) => {
            const slotDate = new Date(now);
            slotDate.setHours(now.getHours() - (hours - 1 - index));
            slotDate.setMinutes(0);
            slotDate.setSeconds(0);
            slotDate.setMilliseconds(0);

            return {
                label: formatHourLabel(slotDate.getHours()),
                dayHouseholds: new Set(),
                nightHouseholds: new Set(),
            };
        });

        logs.forEach((log) => {
            if (!log.timestamp || !log.household_id) return;

            const date = new Date(log.timestamp);

            if (Number.isNaN(date.getTime())) return;

            const label = formatHourLabel(date.getHours());
            const targetSlot = hourSlots.find((slot) => slot.label === label);

            if (!targetSlot) return;

            const soundLevel = Number(log.sound_level ?? 0);

            if (log.is_night && soundLevel >= 34) {
                targetSlot.nightHouseholds.add(log.household_id);
            }

            if (!log.is_night && soundLevel >= 39) {
                targetSlot.dayHouseholds.add(log.household_id);
            }
        });

        return hourSlots.map((item) => ({
            label: item.label,
            dayCount: item.dayHouseholds.size,
            nightCount: item.nightHouseholds.size,
        }));
    };

    const makeSummary = (items, logs = []) => {
        const nightMax = items.reduce(
            (max, item) => item.nightCount > max.nightCount ? item : max,
            { label: "-", nightCount: 0 }
        );

        const dayMax = items.reduce(
            (max, item) => item.dayCount > max.dayCount ? item : max,
            { label: "-", dayCount: 0 }
        );

        const exceededHouseholdSet = new Set();

        logs.forEach((log) => {
            const soundLevel = Number(log.sound_level ?? 0);

            if (log.is_night && soundLevel >= 34) {
                exceededHouseholdSet.add(log.household_id);
            }

            if (!log.is_night && soundLevel >= 39) {
                exceededHouseholdSet.add(log.household_id);
            }
        });

        const normalHourCount = items.filter(
            (item) => item.dayCount === 0 && item.nightCount === 0
        ).length;

        return {
            nightMaxHour: nightMax.nightCount > 0 ? nightMax.label : "-",
            nightMaxCount: nightMax.nightCount,
            dayMaxHour: dayMax.dayCount > 0 ? dayMax.label : "-",
            dayMaxCount: dayMax.dayCount,
            totalExceededHouseholds: exceededHouseholdSet.size,
            normalHourCount,
        };
    };

    useEffect(() => {
        const fetchRecentLogs = async () => {
            try {
                setIsLoading(true);
                setIsError(false);

                const hours = getFilterHours(selectedFilter);

                const data = await getRecentNoiseLogs({
                    since: getSinceTime(hours),
                    limit: 100,
                });

                const logs = data.logs ?? [];
                const formattedData = formatThresholdData(logs, selectedFilter);

                setHourlyData(formattedData);
                setSummary(makeSummary(formattedData, logs));
            } catch (error) {
                console.error("시간대별 기준치 초과 데이터 조회 실패:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecentLogs();
    }, [selectedFilter]);

    const handleSelectFilter = (option) => {
        setSelectedFilter(option);
        setIsDropdownOpen(false);
    };

    const maxCount = Math.max(
        ...hourlyData.map((item) => Math.max(item.dayCount, item.nightCount)),
        1
    );

    return (
        <div className='LogAnalysis_Wrap'>
            <div className="analysis_box">
                <div className="analysis_title">
                    <div className="title_text">
                        <div className="title">시간대별 기준치 초과 세대 수</div>
                        <div className="caption">주간 39dB / 야간 34dB 기준 초과 세대 추이 분석</div>
                    </div>
                    <div className="buttons">
                        <div
                            className="filter_btn"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <div className="icon">
                                <img
                                    src={isDropdownOpen ? UpArrow : DownArrow}
                                    alt={isDropdownOpen ? "UpArrow" : "DownArrow"}
                                />
                            </div>
                            <div className="text">{selectedFilter}</div>
                        </div>
                        <div className="download_btn">
                            <div className="icon">
                                <img src={Download} alt="Download" />
                            </div>
                            <div className="text">데이터 내보내기</div>
                        </div>
                    </div>
                </div>
                <div className="analysis_graph">
                    {isLoading && (
                        <div className="graph_status">그래프 데이터를 불러오는 중입니다.</div>
                    )}

                    {isError && (
                        <div className="graph_status">그래프 데이터 조회에 실패했습니다.</div>
                    )}

                    {!isLoading && !isError && (
                        <div className="threshold_chart">
                            <div className="chart_grid">
                                {[16, 12, 8, 4, 0].map((value) => (
                                    <div className="grid_row" key={value}>
                                        <div className="y_label">{value}</div>
                                        <div className="grid_line"></div>
                                    </div>
                                ))}
                            </div>
                            <div className="chart_body">
                                {hourlyData.map((item) => {
                                    const dayHeight = item.dayCount === 0
                                        ? 0.9
                                        : Math.max((item.dayCount / maxCount) * 100, 8);

                                    const nightHeight = item.nightCount === 0
                                        ? 0.9
                                        : Math.max((item.nightCount / maxCount) * 100, 8);

                                    return (
                                        <div className="bar_item" key={item.label}>
                                            <div className="bar_box">
                                                <div
                                                    className="bar day_bar"
                                                    style={{ height: `${dayHeight}%` }}
                                                ></div>
                                                <div
                                                    className="bar night_bar"
                                                    style={{ height: `${nightHeight}%` }}
                                                ></div>
                                            </div>
                                            <div className="hour_label">
                                                {selectedFilter === "최근 1시간" ? item.label : `${item.label}시`}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="legend">
                                <div className="legend_item">
                                    <div className="color_box day"></div>
                                    <div className="text">주간 기준(39dB) 초과</div>
                                </div>
                                <div className="legend_item">
                                    <div className="color_box night"></div>
                                    <div className="text">야간 기준(34dB) 초과</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="analysis_info">
                    <div className="night_high">
                        <div className="title">야간 최다 초과 시간</div>
                        <div className="number">{summary.nightMaxHour}</div>
                        <div className="caption">{summary.nightMaxCount}세대</div>
                    </div>
                    <div className="week_high">
                        <div className="title">주간 최다 초과 시간</div>
                        <div className="number">{summary.dayMaxHour}</div>
                        <div className="caption">{summary.dayMaxCount}세대</div>
                    </div>
                    <div className="total_high">
                        <div className="title">총 초과 세대</div>
                        <div className="number">{summary.totalExceededHouseholds}</div>
                        <div className="caption">세대</div>
                    </div>
                    <div className="low_time">
                        <div className="title">정상 시간대</div>
                        <div className="number">{summary.normalHourCount}</div>
                        <div className="caption">시간</div>
                    </div>
                </div>
            </div>
            {isDropdownOpen && (
                <div
                    className="dropdown_overlay"
                    onClick={() => setIsDropdownOpen(false)}
                >
                    <div
                        className="filter_dropdown"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {filterOptions.map((option) => (
                            <div
                                key={option}
                                className={`dropdown_item ${selectedFilter === option ? "active" : ""}`}
                                onClick={() => handleSelectFilter(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default LogAnalysis
