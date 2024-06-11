import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { Modal, QueryBoundary, Stepper, useToast } from "@/shared";
import { articleKeyFactor, useEditorStore } from "@/entities/article";
import { useEditorUtils } from "@/widgets/editor";

import SettingPart from "./setting-part";
import PreviewPart from "./preview-part";
import CategoryPart from "./category-part";

import { useEditArticle } from "../lib";

type Props = {
  open: boolean;
  onClose: () => void;
};

enum Steps {
  setting = 0,
  category,
  preview,
}

const stepComponents: Record<Steps, () => JSX.Element> = {
  [Steps.setting]: () => (
    <QueryBoundary>
      <SettingPart />
    </QueryBoundary>
  ),
  [Steps.category]: () => (
    <QueryBoundary>
      <CategoryPart />
    </QueryBoundary>
  ),
  [Steps.preview]: () => <PreviewPart />,
};

const EditArticleModal = ({ open, onClose }: Props) => {
  const params = useParams<{ article_id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { open: openToast } = useToast();
  const { editorMetaData, content } = useEditorStore();
  const { parseEditorStateToSave, resetSavedEditorMetaData } = useEditorUtils();
  const { mutateAsync: editArticle, isPending } = useEditArticle(
    params.article_id!
  );

  const [currentStep, setCurrentStep] = useState(Steps.setting);

  const goToNextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, Steps.preview));
  const goToPreviousStep = () =>
    setCurrentStep((prev) => Math.max(prev - 1, Steps.setting));

  const handleEditArticle = async () => {
    await editArticle({
      ...editorMetaData,
      content: parseEditorStateToSave(content),
    });
    openToast({
      type: "success",
      content: "수정에 성공했습니다!",
      staleTime: 5000,
    });
    onClose();
    resetSavedEditorMetaData();
    queryClient.invalidateQueries({ queryKey: articleKeyFactor._def });
    navigate(`/article-read/${params.article_id!}`, { replace: true });
  };

  const renderStepComponent = () => {
    const StepComponent = stepComponents[currentStep];
    return <StepComponent />;
  };

  const renderFooterButtons = () => {
    switch (currentStep) {
      case Steps.setting:
        return (
          <>
            <Modal.Button type="normal" onClick={onClose}>
              취소
            </Modal.Button>
            <div className="ml-2" />
            <Modal.Button onClick={goToNextStep} type="accept">
              다음
            </Modal.Button>
          </>
        );
      case Steps.category:
        return (
          <>
            <Modal.Button type="normal" onClick={goToPreviousStep}>
              뒤로
            </Modal.Button>
            <div className="ml-2" />
            <Modal.Button onClick={goToNextStep} type="accept">
              다음
            </Modal.Button>
          </>
        );
      case Steps.preview:
        return (
          <>
            <Modal.Button type="normal" onClick={goToPreviousStep}>
              뒤로
            </Modal.Button>
            <div className="ml-2" />
            <Modal.Button
              onClick={handleEditArticle}
              type="accept"
              disabled={isPending}
            >
              수정
            </Modal.Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal open={open}>
      <Modal.Header>
        아티클을 수정하기 전에 몇가지 설정을 해주세요.
      </Modal.Header>
      <Modal.Content>
        <div className="flex items-center justify-center mb-7">
          <Stepper
            currentStep={currentStep}
            numberOfSteps={Object.keys(Steps).length / 2}
          />
        </div>
        {renderStepComponent()}
      </Modal.Content>
      <Modal.Footer align="right">{renderFooterButtons()}</Modal.Footer>
    </Modal>
  );
};

export default EditArticleModal;
