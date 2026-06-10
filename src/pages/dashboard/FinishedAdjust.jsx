import React, { useEffect, useState } from 'react';
import Back from "../../assets/img/ic_gray_back.svg";
import Check from "../../assets/img/ic_white_check.svg";
import { useNavigate } from 'react-router-dom';
import { getDashboardCompleted } from '../../api/dashboardApi';

const FinishedAdjust = () => {
    const navigate = useNavigate();

    const [finishedAdjustItems, setFinishedAdjustItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchCompleted = async () => {
            try {
                setIsLoading(true);
                setIsError(false);

                const data = (await getDashboardCompleted()) ?? {};

                setFinishedAdjustItems(data.completed ?? []);
                setTotal(data.total ?? 0);
            } catch (error) {
                console.error("조치 완료 내역 조회 실패:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompleted();
    }, []);

    const recommendedActionMap = {
        notice: "공지 발송",
        quiet_time_request: "정숙 요청",
        consultation: "상담",
        site_visit: "현장진단",
        mediation: "중재",
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
                        <div className="caption">
                            최근 완료된 조치 {isLoading ? "-" : total}건 (현장진단, 상담 등)
                        </div>
                    </div>
                </div>
                <div className="adjust_contents">
                    {isLoading && (
                        <div className="list_item">
                            <div className="item_title">
                                <div className="title_text">
                                    <div className="title">
                                        <div className="location">조치 완료 내역을 불러오는 중입니다.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {isError && (
                        <div className="list_item">
                            <div className="item_title">
                                <div className="title_text">
                                    <div className="title">
                                        <div className="location">조치 완료 내역 조회 실패</div>
                                    </div>
                                    <div className="caption">네트워크 또는 서버 상태를 확인해주세요.</div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isLoading && !isError && finishedAdjustItems.length === 0 && (
                        <div className="list_item">
                            <div className="item_title">
                                <div className="title_text">
                                    <div className="title">
                                        <div className="location">조치 완료 내역이 없습니다.</div>
                                    </div>
                                    <div className="caption">최근 완료된 조치가 없습니다.</div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isLoading && !isError && finishedAdjustItems.map((item) => {
                        const recommendedAction =
                            recommendedActionMap[item.recommended_action] ??
                            item.recommended_action ??
                            "조치 완료";

                        return (
                            <div className="list_item" key={item.id}>
                                <div className="item_title">
                                    <div className="icon">
                                        <img src={Check} alt="Check" />
                                    </div>
                                    <div className="title_text">
                                        <div className="title">
                                            <div className="location">{item.target_unit}</div>
                                            <div className="adjust_type">{recommendedAction}</div>
                                        </div>
                                        <div className="caption">{formatDateTime(item.created_at)}</div>
                                    </div>
                                </div>
                                <div className="item_result">
                                    <div className="result_title">조치 결과</div>
                                    <div className="result_contents">{item.admin_summary}</div>
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
