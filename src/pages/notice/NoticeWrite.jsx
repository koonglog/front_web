import React, { useEffect, useState } from 'react';
import Back from "../../assets/img/ic_gray_back.svg";
import Goal from "../../assets/img/ic_orange_goal.svg";
import WhitePeople from "../../assets/img/ic_white_prople.svg";
import BlackPeople from "../../assets/img/ic_gray_people.svg";
import WhiteBuildings from "../../assets/img/ic_white_building.svg";
import BlackBuildings from "../../assets/img/ic_gray_building.svg";
import Edit from "../../assets/img/ic_orange_edit.svg";
import More from "../../assets/img/ic_orange_template.svg";
import Send from "../../assets/img/ic_white_send.svg";
import Clock from "../../assets/img/ic_gray_clock.svg";
import OrangeCheck from "../../assets/img/ic_orange_check.svg";
import RedCancel from "../../assets/img/ic_red_cancel.svg";
import { useNavigate } from 'react-router-dom';
import { noticeTypes } from "../../mocks/noticeData.js";
import AiTemplateModal from '../../components/notice/AiTemplateModal.jsx';
import ScheduleSendModal from '../../components/notice/ScheduleSendModal.jsx';
import { getHouseholdsByBuilding } from '../../api/noticeApi.js';

const NoticeWrite = () => {
    const navigate = useNavigate();

    const [targetType, setTargetType] = useState("all");
    const [selectedBuilding, setSelectedBuilding] = useState("A동");
    const [selectedHouses, setSelectedHouses] = useState([]);
    const [householdsByBuilding, setHouseholdsByBuilding] = useState({});
    const [buildingNames, setBuildingNames] = useState([]);
    const [isHouseholdsLoading, setIsHouseholdsLoading] = useState(true);
    const [isHouseholdsError, setIsHouseholdsError] = useState(false);

    const [noticeType, setNoticeType] = useState("");
    const [noticeTitle, setNoticeTitle] = useState("");
    const [noticeContent, setNoticeContent] = useState("");
    const [showTemplates, setShowTemplates] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [scheduledTime, setScheduledTime] = useState("");

    useEffect(() => {
        const fetchHouseholdsByBuilding = async () => {
            try {
                setIsHouseholdsLoading(true);
                setIsHouseholdsError(false);

                const data = await getHouseholdsByBuilding();

                const buildings = data.buildings ?? {};
                const names = data.building_names ?? Object.keys(buildings);

                setHouseholdsByBuilding(buildings);
                setBuildingNames(names);

                if (names.length > 0) {
                    setSelectedBuilding(names[0]);
                }
            } catch (error) {
                console.error("동별 세대 목록 조회 실패:", error);
                setIsHouseholdsError(true);
            } finally {
                setIsHouseholdsLoading(false);
            }
        };

        fetchHouseholdsByBuilding();
    }, []);

    const buildings = buildingNames;

    const filteredResidents = householdsByBuilding[selectedBuilding] ?? [];

    const handleSelectHouse = (resident) => {
        const isSelected = selectedHouses.some(
            (house) => house.household_id === resident.household_id
        );

        if (isSelected) {
            setSelectedHouses((prev) =>
                prev.filter((house) => house.household_id !== resident.household_id)
            );
        } else {
            setSelectedHouses((prev) => [
                ...prev,
                {
                    ...resident,
                    building: selectedBuilding,
                },
            ]);
        }
    };

    const handleRemoveHouse = (resident) => {
        setSelectedHouses((prev) =>
            prev.filter((house) => house.household_id !== resident.household_id)
        );
    };

    const isHouseSelected = (resident) => {
        return selectedHouses.some(
            (house) => house.household_id === resident.household_id
        );
    };

    const handleApplyTemplate = (template) => {
        setNoticeType(template.type);
        setNoticeTitle(template.title);
        setNoticeContent(template.content);
        setShowTemplates(false);
    };

    const handleScheduleSend = (time) => {
        setScheduledTime(time);

        console.log("예약 발송 시간:", time);
        console.log("공지 유형:", noticeType);
        console.log("공지 제목:", noticeTitle);
        console.log("공지 내용:", noticeContent);
        console.log("발송 대상:", targetType === "all" ? "전체 세대" : selectedHouses);
    };

    return (
        <div className='NoticeWrite_Wrap'>
            <div className="notice_write_box">
                <div className="title_box">
                    <div
                        className="back_icon"
                        onClick={() => navigate(-1)}
                    >
                        <img src={Back} alt="Back" />
                    </div>
                    <div className="title_text">
                        <div className="title">공지사항 작성 및 발송</div>
                        <div className="caption">주민 앱 전송, 예약 발송, 수신 확인 통계</div>
                    </div>
                </div>
                <div className="target_box">
                    <div className="target_title">
                        <div className="icon">
                            <img src={Goal} alt="Goal" />
                        </div>
                        <div className="title">발송 대상 선택</div>
                    </div>
                    <div className="target_tab">
                        <div
                            className={`all_btn ${targetType === "all" ? "active" : ""}`}
                            onClick={() => setTargetType("all")}
                        >
                            <div className="tab_title">
                                <div className="icon">
                                    <img
                                        src={targetType === "all" ? WhitePeople : BlackPeople}
                                        alt="People"
                                    />
                                </div>
                                <div className="text">전체 발송</div>
                            </div>
                            <div className="caption">단지 내 모든 입주민</div>
                        </div>
                        <div
                            className={`specific_btn ${targetType === "specific" ? "active" : ""}`}
                            onClick={() => setTargetType("specific")}
                        >
                            <div className="tab_title">
                                <div className="icon">
                                    <img
                                        src={targetType === "specific" ? WhiteBuildings : BlackBuildings}
                                        alt="Buildings"
                                    />
                                </div>
                                <div className="text">특정 동/호수</div>
                            </div>
                            <div className="caption">선택한 세대 (중복 선택 가능)</div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    {targetType === "specific" && (
                        <div className="select_house_section">
                            <div className="title">발송할 세대 선택 (현재 {selectedHouses.length}개 세대 선택됨)</div>
                            <div className="stepone_section">
                                <div className="step_title">1단계: 동 선택</div>
                                <div className="select_section">
                                    {isHouseholdsLoading && (
                                        <div className="building_status">세대 목록을 불러오는 중입니다.</div>
                                    )}
                                    {isHouseholdsError && (
                                        <div className="building_status">세대 목록 조회에 실패했습니다.</div>
                                    )}
                                    {!isHouseholdsLoading && !isHouseholdsError && buildings.map((building) => (
                                        <div
                                            key={building}
                                            className={`building_item ${selectedBuilding === building ? "active" : ""}`}
                                            onClick={() => setSelectedBuilding(building)}
                                        >
                                            {building}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="steptwo_section">
                                <div className="step_title">2단계: 호수 선택 (중복 선택 가능)</div>
                                <div className="select_section">
                                    {isHouseholdsLoading && (
                                        <div className="house_status">세대 목록을 불러오는 중입니다.</div>
                                    )}
                                    {isHouseholdsError && (
                                        <div className="house_status">세대 목록 조회에 실패했습니다.</div>
                                    )}
                                    {!isHouseholdsLoading && !isHouseholdsError && filteredResidents.map((resident) => (
                                        <div
                                            key={resident.household_id}
                                            className={`house_item ${isHouseSelected(resident) ? "active" : ""}`}
                                            onClick={() => handleSelectHouse(resident)}
                                        >
                                            {isHouseSelected(resident) && (
                                                <div className="check_icon">
                                                    <img src={OrangeCheck} alt="Selected" />
                                                </div>
                                            )}
                                            <div className="house_info">
                                                <div className="room">{resident.unit_number}</div>
                                                <div className="name">{resident.resident_name}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="selected_house_section">
                                <div className="selected_title">선택된 세대:</div>
                                <div className="selected_house_list">
                                    {selectedHouses.map((house) => (
                                        <div
                                            className="selected_house_item"
                                            key={house.household_id}
                                        >
                                            <span>
                                                {house.building} {house.unit_number}호
                                            </span>
                                            <div
                                                className="remove_icon"
                                                onClick={() => handleRemoveHouse(house)}
                                            >
                                                <img src={RedCancel} alt="Remove" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="contents_box">
                    <div className="contents_title">
                        <div className="title">
                            <div className="icon">
                                <img src={Edit} alt="Edit" />
                            </div>
                            <div className="text">콘텐츠 작성</div>
                        </div>
                        <div
                            className="template_btn"
                            onClick={() => setShowTemplates(true)}
                        >
                            <div className="icon">
                                <img src={More} alt="More" />
                            </div>
                            <div className="text">AI 템플릿 추천</div>
                        </div>
                    </div>
                    <div className="notice_title_section">
                        <div className="notice_title">공지 제목</div>
                        <div className="title_input">
                            <input
                                type="text"
                                placeholder="공지사항 제목을 입력하세요"
                                name="notice_title_input"
                                id="notice_title_input"
                                value={noticeTitle}
                                onChange={(e) => setNoticeTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="notice_type_section">
                        <div className="notice_type">공지 유형</div>
                        <div className="types">
                            {noticeTypes.map((type) => (
                                <div
                                    key={type}
                                    className={`type_item ${noticeType === type ? "active" : ""}`}
                                    onClick={() => setNoticeType(type)}
                                >
                                    <div className="text">{type}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="notice_contents_section">
                        <div className="notice_contents">공지 내용</div>
                        <div className="contents_input">
                            <textarea
                                placeholder="공지사항 내용을 입력하세요."
                                name="notice_contents_input"
                                id="notice_contents_input"
                                value={noticeContent}
                                onChange={(e) => setNoticeContent(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="buttons_box">
                    <div className="send_now">
                        <div className="icon">
                            <img src={Send} alt="Send" />
                        </div>
                        <div className="text">즉시 발송</div>
                    </div>
                    <div
                        className="send_later"
                        onClick={() => setShowScheduleModal(true)}
                    >
                        <div className="icon">
                            <img src={Clock} alt="Clock" />
                        </div>
                        <div className="text">예약 발송</div>
                    </div>
                </div>
            </div>
            {showTemplates && (
                <div className="modal_overlay">
                    <AiTemplateModal
                        onClose={() => setShowTemplates(false)}
                        onApplyTemplate={handleApplyTemplate}
                    />
                </div>
            )}
            {showScheduleModal && (
                <div className="modal_overlay">
                    <ScheduleSendModal
                        onClose={() => setShowScheduleModal(false)}
                        onScheduleSend={handleScheduleSend}
                    />
                </div>
            )}
        </div>
    );
}

export default NoticeWrite
