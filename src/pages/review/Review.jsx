import React, { useEffect, useState } from 'react';
import OrangePeople from "../../assets/img/ic_orange_people.svg";
import GreenPeople from "../../assets/img/ic_green_people.svg";
import Message from "../../assets/img/ic_gray_message.svg";
import GreenSend from "../../assets/img/ic_green_send.svg";
import Calendar from "../../assets/img/ic_gray_calendar.svg";
import WhiteCheck from "../../assets/img/ic_white_check.svg";
import GreenCheck from "../../assets/img/ic_green_check.svg";
import Clock from "../../assets/img/ic_gray_clock.svg";
import { getMediations, updateMediation } from '../../api/mediationApi';

const Review = () => {
    const [activeTab, setActiveTab] = useState("pending");

    const [pendingItems, setPendingItems] = useState([]);
    const [completedItems, setCompletedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);

    const hours = Array.from({ length: 24 }, (_, index) => index + 1);

    useEffect(() => {
        const fetchMediations = async () => {
            try {
                setIsLoading(true);
                setIsError(false);

                const [pendingData, completedData] = await Promise.all([
                    getMediations("pending"),
                    getMediations("completed"),
                ]);

                setPendingItems(Array.isArray(pendingData) ? pendingData : []);
                setCompletedItems(Array.isArray(completedData) ? completedData : []);
            } catch (error) {
                console.error("중재 메시지 목록 조회 실패:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMediations();
    }, []);

    const currentItems = activeTab === "pending" ? pendingItems : completedItems;

    const generationMethodMap = {
        template: "템플릿",
        ai: "AI 생성",
        manual: "수동 작성",
    };

    const handleApproveMediation = async (item) => {
        try {
            setUpdatingId(item.id);

            const updatedItem = await updateMediation(item.id, {
                status: "completed",
                aiMessage: item.ai_message ?? "",
                residentMessage: item.resident_message ?? "",
            });

            setPendingItems((prev) =>
                prev.filter((pendingItem) => pendingItem.id !== item.id)
            );

            setCompletedItems((prev) => [
                updatedItem,
                ...prev,
            ]);

            setActiveTab("completed");
        } catch (error) {
            console.error("중재 메시지 승인 실패:", error);
            alert("중재 메시지 승인에 실패했습니다.");
        } finally {
            setUpdatingId(null);
        }
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return "-";

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "-";
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");

        return `${year}.${month}.${day} ${hour}:${minute}`;
    };

    const formatQuietTime = (timeString) => {
        if (!timeString) return "미설정";

        return timeString.slice(0, 5);
    };

    const getQuietHours = (startTime, endTime) => {
        if (!startTime || !endTime) return [];

        const startHour = Number(startTime.slice(0, 2));
        const endHour = Number(endTime.slice(0, 2));

        if (Number.isNaN(startHour) || Number.isNaN(endHour)) {
            return [];
        }

        if (startHour === endHour) {
            return [startHour];
        }

        if (startHour < endHour) {
            return Array.from(
                { length: endHour - startHour },
                (_, index) => startHour + index + 1
            );
        }

        return [
            ...Array.from({ length: 24 - startHour }, (_, index) => startHour + index + 1),
            ...Array.from({ length: endHour }, (_, index) => index + 1),
        ];
    };

    const getFloorFlowText = (targetUnit) => {
        if (!targetUnit) return "-";

        const unitMatch = targetUnit.match(/(\d+)호/);

        if (!unitMatch) return "-";

        const unitNumber = Number(unitMatch[1]);

        if (Number.isNaN(unitNumber)) return "-";

        const requestFloor = Math.floor(unitNumber / 100);

        if (requestFloor <= 0) return "-";

        return `${requestFloor}층 → ${requestFloor + 1}층`;
    };

    return (
        <div className='Review_Wrap'>
            <div className="review_box">
                <div className="title_box">
                    <div className="review_title">
                        <div className="title">중재 메시지 검토</div>
                        <div className="caption">비폭력 대화 기반 AI 메시지 생성 및 검토 시스템</div>
                    </div>
                    <div className="tabs">
                        <div
                            className={`pending ${activeTab === "pending" ? "active" : ""}`}
                            onClick={() => setActiveTab("pending")}
                        >
                            승인 대기({isLoading ? "-" : pendingItems.length})
                        </div>

                        <div
                            className={`completed ${activeTab === "completed" ? "active" : ""}`}
                            onClick={() => setActiveTab("completed")}
                        >
                            완료({isLoading ? "-" : completedItems.length})
                        </div>
                    </div>
                </div>
                <div className="contents_box">
                    {isLoading && (
                        <div className="review_item">
                            <div className="item_title">
                                <div className="title_text">
                                    <div className="title">
                                        <div className="house_name">중재 메시지를 불러오는 중입니다.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {isError && (
                        <div className="review_item">
                            <div className="item_title">
                                <div className="title_text">
                                    <div className="title">
                                        <div className="house_name">중재 메시지 조회 실패</div>
                                    </div>
                                    <div className="caption">네트워크 또는 서버 상태를 확인해주세요.</div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isLoading && !isError && currentItems.length === 0 && (
                        <div className="review_item">
                            <div className="item_title">
                                <div className="title_text">
                                    <div className="title">
                                        <div className="house_name">
                                            {activeTab === "pending"
                                                ? "승인 대기 중인 중재 메시지가 없습니다."
                                                : "완료된 중재 메시지가 없습니다."}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isLoading && !isError && currentItems.map((item) => {
                        const isPending = item.status === "pending";
                        const statusClass = isPending ? "pending" : "completed";
                        const badgeText = isPending ? "승인 대기" : "완료";
                        const quietHours = getQuietHours(
                            item.quiet_start_time,
                            item.quiet_end_time
                        );

                        return (
                            <div className="review_item" key={item.id}>
                                <div className="item_title">
                                    <div className={`icon ${statusClass}`}>
                                        <img
                                            src={isPending ? OrangePeople : GreenPeople}
                                            alt={isPending ? "OrangePeople" : "GreenPeople"}
                                        />
                                    </div>
                                    <div className="title_text">
                                        <div className="title">
                                            <div className="house_name">
                                                {item.target_unit}
                                            </div>
                                            <div className={`status_badge ${statusClass}`}>
                                                {badgeText}
                                            </div>
                                        </div>
                                        <div className="caption">
                                            신청: {formatDateTime(item.created_at)} · {getFloorFlowText(item.target_unit)}
                                        </div>
                                    </div>
                                </div>
                                <div className="message_compare">
                                    <div className="original_message">
                                        <div className="message_title">
                                            <div className="icon">
                                                <img src={Message} alt="Message" />
                                            </div>
                                            <div className="text">원본 민원</div>
                                        </div>
                                        <div className="message_box">
                                            {item.resident_message || "원본 민원 내용이 없습니다."}
                                        </div>
                                    </div>
                                    <div className="ai_message">
                                        <div className="message_title">
                                            <div className="icon">
                                                <img src={GreenSend} alt="GreenSend" />
                                            </div>
                                            <div className="text">AI 생성 중재 메시지</div>
                                            <div className="badge">
                                                {generationMethodMap[item.generation_method] ?? "비폭력 대화"}
                                            </div>
                                        </div>
                                        <div className="message_box">
                                            {item.ai_message || "AI 생성 메시지가 없습니다."}
                                        </div>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                {isPending && (
                                    <>
                                        <div className="quiet_time_section">
                                            <div className="quiet_title">
                                                <div className="icon">
                                                    <img src={Calendar} alt="Calendar" />
                                                </div>
                                                <div className="text">민원 세대가 희망하는 조용한 시간</div>
                                            </div>
                                            <div className="hour_grid">
                                                {hours.map((hour) => (
                                                    <div
                                                        key={hour}
                                                        className={`hour_item ${quietHours.includes(hour)
                                                            ? "selected"
                                                            : ""
                                                            }`}
                                                    >
                                                        {hour}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div
                                            className="approve_btn"
                                            onClick={() => {
                                                if (updatingId !== item.id) {
                                                    handleApproveMediation(item);
                                                }
                                            }}
                                        >
                                            <div className="icon">
                                                <img src={WhiteCheck} alt="WhiteCheck" />
                                            </div>
                                            <div className="text">
                                                {updatingId === item.id ? "승인 처리 중..." : "AI 메시지 승인 및 발송"}
                                            </div>
                                        </div>
                                    </>
                                )}
                                {!isPending && (
                                    <>
                                        <div className="quiet_time_section">
                                            <div className="quiet_title">
                                                <div className="icon">
                                                    <img src={Clock} alt="Clock" />
                                                </div>
                                                <div className="text">민원 세대가 희망하는 조용한 시간</div>
                                            </div>
                                            <div className="times">
                                                <div className="start_time">
                                                    {formatQuietTime(item.quiet_start_time)}
                                                </div>
                                                <span>~</span>
                                                <div className="end_time">
                                                    {formatQuietTime(item.quiet_end_time)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="complete_btn">
                                            <div className="icon">
                                                <img src={GreenCheck} alt="GreenCheck" />
                                            </div>
                                            <div className="text">중재 메시지 발송 완료</div>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Review
