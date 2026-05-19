import React from 'react';
import { aiTemplates } from "../../mocks/noticeData.js";
import Close from "../../assets/img/ic_gray_cancel.png";
import Docs from "../../assets/img/ic_orange_docs.png";

const AiTemplateModal = ({ onClose, onApplyTemplate }) => {
    const getTemplateTypeClass = (type) => {
        switch (type) {
            case "긴급 알림":
                return "emergency";
            case "일반 공지":
                return "normal";
            case "생활 에티켓":
                return "etiquette";
            case "장비 점검 안내":
                return "inspection";
            default:
                return "normal";
        }
    };

    return (
        <div className='AiTemplateModal_Wrap'>
            <div className="modal_title">
                <div className="title_text">
                    <div className="title">AI 템플릿 추천</div>
                    <div className="caption">비폭력 대화법을 적용한 공지사항 템플릿을 선택하세요</div>
                </div>
                <div
                    className="close_btn"
                    onClick={onClose}
                >
                    <img src={Close} alt="Close" />
                </div>
            </div>
            <div className="divider"></div>
            <div className="template_list">
                {aiTemplates.map((template) => (
                    <div className="template_item" key={template.id}>
                        <div className="template_info">
                            <div className="title_text">
                                <div className="icon">
                                    <img src={Docs} alt="Docs" />
                                </div>
                                <div className="template_title">{template.title}</div>
                            </div>
                            <div className={`template_type ${getTemplateTypeClass(template.type)}`}>
                                {template.type}
                            </div>
                        </div>
                        <div className="template_content">{template.content}</div>
                        <div
                            className="apply_btn"
                            onClick={() => onApplyTemplate(template)}
                        >
                            이 템플릿 적용
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AiTemplateModal;