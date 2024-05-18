import { useEditorStore, useToastStore } from "@/app/store";
import { useQueryClient } from "@tanstack/react-query";
import { If, Modal, Skeleton, QUERY_CONSTS } from "@/shared";
import { Suspense, useState } from "react";

import { convertToHTML } from "draft-convert";
import { Stepper } from "..";
import { usePostArticle } from "../../lib";
import PolicyPart from "./policy-part";
import PreviewPart from "./preview-part";
import SettingPart from "./setting-part";
import { useNavigate } from "react-router-dom";
import useEditorUtils from "../../hooks";

type Props = {
  onClose: () => void;
};

const NUMBER_OF_STEPS = 3 as const;
enum Steps {
  setting = 0,
  preview,
  policy,
}

const ArticleWriteModal = ({ onClose }: Props) => {
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

  const handleUploadArticle = async () => {
    const { title, hasComment, hasHit, hasLike, summary, content, thumbnail } =
      editorMetaData;

    const parsedHTML = convertToHTML({})(content.getCurrentContent());

    publishArticle({
      articleMetaData: {
        title,
        has_comments: hasComment,
        has_hit: hasHit,
        has_like: hasLike,
        summary,
        body: parsedHTML,
      },
      thumbnailFile: thumbnail!,
    }).then((response) => {
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

export default ArticleWriteModal;
