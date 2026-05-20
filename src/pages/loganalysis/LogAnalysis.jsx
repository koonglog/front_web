import React, { useState } from 'react';
import DownArrow from "../../assets/img/ic_gray_down_arrow.png";
import UpArrow from "../../assets/img/ic_gray_up_arrow.png";
import Download from "../../assets/img/ic_white_download.png";

const LogAnalysis = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("최근 24시간");

    const filterOptions = [
        "최근 1시간",
        "최근 3시간",
        "최근 12시간",
        "최근 24시간",
    ];

    const handleSelectFilter = (option) => {
        setSelectedFilter(option);
        setIsDropdownOpen(false);
    };

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
                    그래프 영역입니다.{/* 필터에 따라 그래프 보여주기 */}
                </div>
                <div className="analysis_info">
                    <div className="night_high">
                        <div className="title">야간 최다 초과 시간</div>
                        <div className="number">23:35</div>
                        <div className="caption">15세대</div>
                    </div>
                    <div className="week_high">
                        <div className="title">주간 최다 초과 시간</div>
                        <div className="number">18시</div>
                        <div className="caption">4세대</div>
                    </div>
                    <div className="total_high">
                        <div className="title">총 초과 세대</div>
                        <div className="number">28</div>
                        <div className="caption">세대</div>
                    </div>
                    <div className="low_time">
                        <div className="title">정상 시간대</div>
                        <div className="number">17</div>
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
