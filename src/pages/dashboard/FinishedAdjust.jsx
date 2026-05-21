import React from 'react';
import Back from "../../assets/img/ic_gray_back.svg";
import { finishedAdjustItems } from "../../mocks/dashboardData";
import Check from "../../assets/img/ic_white_check.svg";
import { useNavigate } from 'react-router-dom';

const FinishedAdjust = () => {
    const navigate = useNavigate();

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
                        <div className="caption">최근 완료된 조치 {finishedAdjustItems.length}건 (현장진단, 상담 등)</div>
                    </div>
                </div>
                <div className="adjust_contents">
                    {finishedAdjustItems.map((item) => {
                        return (
                            <div className="list_item">
                                <div className="item_title">
                                    <div className="icon">
                                        <img src={Check} alt="Check" />
                                    </div>
                                    <div className="title_text">
                                        <div className="title">
                                            <div className="location">{item.house}</div>
                                            <div className="adjust_type">{item.status}</div>
                                        </div>
                                        <div className="caption">{item.time} · 담당: {item.name}</div>
                                    </div>
                                </div>
                                <div className="item_result">
                                    <div className="result_title">조치 결과</div>
                                    <div className="result_contents">{item.issue}</div>
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
