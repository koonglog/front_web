import React, { useEffect, useState } from 'react';
import Close from "../../assets/img/ic_gray_cancel.svg";
import Docs from "../../assets/img/ic_orange_docs.svg";
import { getAiNoticeTemplates } from '../../api/noticeApi';

const AiTemplateModal = ({ onClose, onApplyTemplate }) => {
    const [aiTemplates, setAiTemplates] = useState([]);
    const [isTemplatesLoading, setIsTemplatesLoading] = useState(true);
    const [isTemplatesError, setIsTemplatesError] = useState(false);

    useEffect(() => {
        const fetchAiTemplates = async () => {
            try {
                setIsTemplatesLoading(true);
                setIsTemplatesError(false);

                const data = await getAiNoticeTemplates();

                const templates = Object.values(data.all_templates ?? {})
                    .flatMap((templateGroup) => templateGroup.templates ?? [])
                    .map((template, index) => ({
                        id: `${template.notice_type}-${index}`,
                        title: template.title,
                        content: template.content,
                        type: template.notice_type_label,
                        noticeType: template.notice_type,
                        noticeTypeLabel: template.notice_type_label,
                    }));

                setAiTemplates(templates);
            } catch (error) {
                console.error("AI 템플릿 조회 실패:", error);
                setIsTemplatesError(true);
            } finally {
                setIsTemplatesLoading(false);
            }
        };

        fetchAiTemplates();
    }, []);

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
                {isTemplatesLoading && (
                    <div className="template_status">AI 템플릿을 불러오는 중입니다.</div>
                )}
                {isTemplatesError && (
                    <div className="template_status">AI 템플릿 조회에 실패했습니다.</div>
                )}
                {!isTemplatesLoading && !isTemplatesError && aiTemplates.length === 0 && (
                    <div className="template_status">사용 가능한 AI 템플릿이 없습니다.</div>
                )}
                {!isTemplatesLoading && !isTemplatesError && aiTemplates.map((template) => (
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