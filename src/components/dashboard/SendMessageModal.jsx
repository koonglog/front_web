import React from 'react';
import Cancel from "../../assets/img/ic_gray_cancel.png";
import Send from "../../assets/img/ic_white_send.png";

const SendMessageModal = ({ receiverHouse, receiverName, onClose }) => {
    return (
        <div className='SendMessageModal_Wrap'>
            <div className="modal_top">
                <div className="modal_title">
                    <div className="title">세대 메시지 발송</div>
                    <div className="receiver_info">{receiverHouse} - {receiverName}</div>
                </div>
                <div className="cancel" onClick={onClose}>
                    <img src={Cancel} alt="Cancel" />
                </div>
            </div>
            <div className="divider"></div>
            <div className="modal_main">
                <div className="message_type">
                    <div className="title">메시지 유형</div>
                    <div className="type_lists">
                        <div className="type_item">긴급 알림</div>
                        <div className="type_item">일반 안내</div>
                        <div className="type_item">생활 에티켓</div>
                        <div className="type_item">점검 안내</div>
                    </div>
                </div>
                <div className="message_title">
                    <div className="msg_title">메시지 제목</div>
                    <div className="message_input">
                        <input type="text" placeholder='메시지 제목을 입력하세요' name="msg_title_input" id="msg_title_input" />
                    </div>
                </div>
                <div className="message_contents">
                    <div className="msg_contents">메시지 내용</div>
                    <div className="message_input">
                        <textarea
                            placeholder='메시지 내용을 입력하세요.'
                            name="msg_contents_input"
                            id="msg_contents_input"
                        />
                    </div>
                </div>
                <div className="divider"></div>
                <div className="recent_data">
                    <div className="recent_title">최근 소음 데이터 첨부 (최근 7일 패턴)</div>
                    <div className="data_item">오늘 감지: 7건 | 고강도: 3건 | 평균 지속: 12분</div>
                </div>
            </div>
            <div className="divider"></div>
            <div className="buttons">
                <div className="cancel_btn">취소</div>
                <div className="send_btn">
                    <div className="icon">
                        <img src={Send} alt="Send" />
                    </div>
                    <div className="text">메시지 발송</div>
                </div>
            </div>
        </div>
    );
}

export default SendMessageModal
