import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { convertToRaw, DraftEntityMutability, DraftEntityType } from "draft-js";
import draftToHtml from "draftjs-to-html";

import { If, Modal, Skeleton, QUERY_CONSTS, Stepper } from "@/shared";
import { useToastStore } from "@/app/model";

import useEditorStore from "@/entities/editor/model";
import useEditorUtils from "@/entities/editor/hooks";

import PolicyPart from "../policy-part";
import PreviewPart from "../preview-part";
import SettingPart from "../setting-part";

import usePostArticle from "../../lib";

type Props = {
  onClose: () => void;
};

const NUMBER_OF_STEPS = 3 as const;
enum Steps {
  setting = 0,
  preview,
  policy,
}

const PublishSettingModal = ({ onClose }: Props) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const { editorMetaData } = useEditorStore();
  const { resetSavedContent } = useEditorUtils();
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const { mutateAsync: publishArticle, isPending } = usePostArticle();

  const goToNextStep = () =>
    setCurrentStep((prev) => (prev === NUMBER_OF_STEPS - 1 ? prev : prev + 1));
  const goToPreviousStep = () =>
    setCurrentStep((prev) => (prev <= 0 ? prev : prev - 1));

  type DraftEntity = {
    type: DraftEntityType;
    mutability: DraftEntityMutability;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  };

  const customEntityTransform = (entity: DraftEntity, text: string) => {
    if (entity.type === "IMAGE") {
      return `<img src="${entity.data.src}" class="h-auto max-w-lg rounded-lg" alt="${text}" />`;
    }

    if (entity.type !== "LINK") {
      return `<a href="${entity.data.url}" class="hlog_link" target="_blank">${text}</a>`;
    }
  };

  const handleUploadArticle = async () => {
    const { title, hasComment, hasHit, hasLike, summary, content, thumbnail } =
      editorMetaData;

    const rawContentState = convertToRaw(content.getCurrentContent());

    const markup = draftToHtml(
      rawContentState,
      undefined,
      undefined,
      customEntityTransform
    );

    publishArticle({
      articleMetaData: {
        title,
        has_comments: hasComment,
        has_hit: hasHit,
        has_like: hasLike,
        summary,
        body: markup,
      },
      thumbnailFile: thumbnail!,
    }).then((response: { id: string }) => {
      addToast({
        type: "success",
        content: "발행에 성공했습니다!",
        staleTime: 5000,
      });
      resetSavedContent();
      queryClient.invalidateQueries({ queryKey: [QUERY_CONSTS.ARTICLE] });
      navigate(`/article-read/${response.id}`, { replace: true });
    });
  };

  return (
    <Modal>
      <Modal.Header>
        아티클을 발행하기 전에 몇가지 설정을 해주세요.
      </Modal.Header>
      <Modal.Content>
        <div className="flex items-center justify-center mb-7">
          <Stepper currentStep={currentStep} numberOfSteps={NUMBER_OF_STEPS} />
        </div>

        <If
          condition={currentStep === Steps.setting}
          trueRender={
            <Suspense fallback={<Skeleton />}>
              <SettingPart />
            </Suspense>
          }
        />
        <If
          condition={currentStep === Steps.preview}
          trueRender={<PreviewPart />}
        />

        <If
          condition={currentStep === Steps.policy}
          trueRender={
            <Suspense fallback={<Skeleton />}>
              <PolicyPart
                value={isPolicyChecked}
                onChange={() => setIsPolicyChecked((prev) => !prev)}
              />
            </Suspense>
          }
        />
      </Modal.Content>

      <Modal.Footer align="right">
        <If
          condition={currentStep === Steps.setting}
          trueRender={
            <>
              <Modal.Button type="normal" onClick={onClose}>
                취소
              </Modal.Button>
              <div className="ml-2" />
              <Modal.Button
                onClick={goToNextStep}
                type="accept"
                disabled={!editorMetaData.thumbnail}
              >
                다음
              </Modal.Button>
            </>
          }
        />

        <If
          condition={currentStep === Steps.preview}
          trueRender={
            <>
              <Modal.Button type="normal" onClick={goToPreviousStep}>
                뒤로
              </Modal.Button>
              <div className="ml-2" />
              <Modal.Button onClick={goToNextStep} type="accept">
                다음
              </Modal.Button>
            </>
          }
        />

        <If
          condition={currentStep === Steps.policy}
          trueRender={
            <>
              <Modal.Button
                type="normal"
                onClick={goToPreviousStep}
                disabled={isPending}
              >
                뒤로
              </Modal.Button>
              <div className="ml-2" />
              <Modal.Button
                onClick={handleUploadArticle}
                type="accept"
                disabled={!isPolicyChecked || isPending}
              >
                발행
              </Modal.Button>
            </>
          }
        />
      </Modal.Footer>
    </Modal>
  );
};

export default PublishSettingModal;
