import React, { useState } from 'react';
import Close from "../../assets/img/ic_gray_cancel.png";
import Send from "../../assets/img/ic_white_send.png";

const ScheduleSendModal = ({ onClose, onScheduleSend }) => {
    const [selectedTime, setSelectedTime] = useState("");

    const timeList = [
        ["07:00", "08:00", "09:00", "10:00", "11:00"],
        ["18:00", "19:00", "20:00", "21:00", "22:00"],
    ];

    const handleSend = () => {
        if (!selectedTime) {
            alert("발송 시간을 선택해주세요.");
            return;
        }

        onScheduleSend?.(selectedTime);
        onClose();
    };

    return (
        <div className='ScheduleSendModal_Wrap'>
            <div className="modal_title">
                <div className="title">예약 메시지 발송</div>
                <div
                    className="close_btn"
                    onClick={onClose}
                >
                    <img src={Close} alt="Close" />
                </div>
            </div>
            <div className="divider"></div>
            <div className="time_select_section">
                <div className="title">메시지 발송 시간 선택</div>
                <div className="time_list">
                    {timeList.map((row, rowIndex) => (
                        <div
                            className={rowIndex === 0 ? "list_top" : "list_bottom"}
                            key={rowIndex}
                        >
                            {row.map((time) => (
                                <div
                                    key={time}
                                    className={`time ${selectedTime === time ? "active" : ""}`}
                                    onClick={() => setSelectedTime(time)}
                                >
                                    {time}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="buttons_section">
                <div
                    className="cancel"
                    onClick={onClose}
                >
                    취소
                </div>
                <div
                    className={`send_btn ${selectedTime ? "active" : "disabled"}`}
                    onClick={handleSend}
                >
                    <div className="icon">
                        <img src={Send} alt="Send" />
                    </div>
                    <div className="text">메시지 발송</div>
                </div>
            </div>
        </div>
    )
}

export default ScheduleSendModal
