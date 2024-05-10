import { useToast } from "@/app/store";
import { Modal, supabase, generateRandomId } from "@/shared";
import { ContentState } from "draft-js";
import React, { useState } from "react";
import { convertToHTML } from "draft-convert";
import useEditor from "../../hooks";
import { useNavigate } from "react-router-dom";

type Props = {
  onCancel: () => void;
};

type SettingState = {
  thumbnail: File | null;
  summary: string;
  hasComment: boolean;
};

const SettingModal = ({ onCancel }: Props) => {
  const navigate = useNavigate();
  const {
    editorState: { title, content, summary, hasComment },
    resetSavedContent,
  } = useEditor();
  const { addToast } = useToast();

  const [setting, setSetting] = useState<SettingState>({
    thumbnail: null,
    summary: "",
    hasComment: true,
  });

  const handleChangeFileInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const thumbnail = event.currentTarget.files?.[0];
    if (!!thumbnail) {
      setSetting((prev) => ({ ...prev, thumbnail }));
    }
  };

  const handleDetectPublish = async () => {
    try {
      const data = await handleUploadThumbnail();

      if (data && data.path) {
        await handleUploadArticle(data.path);
      }
    } catch (error) {
      addToast({
        type: "error",
        content: "아티클 발행중 에기치 못한 에러가 오류가 발생했습니다.",
        hasCloseButton: false,
      });
    }
  };

  const handleUploadThumbnail = async () => {
    if (setting.thumbnail) {
      try {
        const { data } = await supabase.storage
          .from("thumbnails")
          .upload(`${generateRandomId()}`, setting.thumbnail, {
            cacheControl: "3600",
            upsert: false,
          });

        return data;
      } catch (error) {
        throw error;
      }
    }
  };

  const createContentToHTML = (content: ContentState) => {
    const html = convertToHTML({
      blockToHTML: (block) => {
        if (block.type === "blockquote") {
          return <blockquote className="hlog_blockquote" />;
        }
        return null;
      },
    })(content);

    return html;
  };

  const handleUploadArticle = async (thumbnailUrl: string) => {
    try {
      const response = await supabase
        .from("articles")
        .insert({
          title,
          body: createContentToHTML(content.getCurrentContent()),
          summary,
          thumbnail: thumbnailUrl,
          has_comments: hasComment,
        })
        .select("id");

      addToast({
        type: "success",
        content: "아티클 발행에 성공하였습니다.",
        hasCloseButton: true,
        staleTime: 3000,
      });

      resetSavedContent();
      const createdArticleId = response.data?.[0].id;
      navigate(`/article-read/${createdArticleId}`, { replace: true });
    } catch (error) {
      throw error;
    }
  };

  return (
    <Modal>
      <Modal.Header>
        {title}을 발행하기 전에 몇가지 설정을 해주세요.
      </Modal.Header>
      <Modal.Content>
        <ul>
          <li>아티클 썸네일</li>
          {setting.thumbnail && (
            <img
              src={URL.createObjectURL(setting.thumbnail)}
              alt={title}
              className="object-cover w-full h-64 max-md:w-0 rounded-3xl"
            />
          )}
          <input
            type="file"
            multiple={false}
            accept="image/*"
            onChange={handleChangeFileInput}
          />

          <li>아티클 요약 내용 (필수 아님)</li>
          <textarea
            value={setting.summary}
            onChange={(event) =>
              setSetting((prev) => ({
                ...prev,
                summary: event.target.value,
              }))
            }
          />

          <li>댓글 포함여부 (기본은 true)</li>
        </ul>
      </Modal.Content>
      <Modal.Footer align="right">
        <Modal.Button type="normal" onClick={onCancel}>
          취소
        </Modal.Button>
        <div className="ml-2" />
        <Modal.Button onClick={handleDetectPublish} type="accept">
          발행
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingModal;
