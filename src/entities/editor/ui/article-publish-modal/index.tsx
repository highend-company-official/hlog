import { useEditorStore } from "@/app/store";
import { If, Modal, Skeleton } from "@/shared";
import { Suspense, useState } from "react";
import { Stepper } from "..";
import PolicyPart from "./policy-part";
import PreviewPart from "./preview-part";
import SettingPart from "./setting-part";

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
  const [currentStep, setCurrentStep] = useState(0);
  const { editorMetaData } = useEditorStore();
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);

  const goToNextStep = () =>
    setCurrentStep((prev) => (prev === NUMBER_OF_STEPS - 1 ? prev : prev + 1));
  const goToPreviousStep = () =>
    setCurrentStep((prev) => (prev <= 0 ? prev : prev - 1));

  // const handleDetectPublish = async () => {
  //   try {
  //     const data = await handleUploadThumbnail();

  //     if (data && data.path) {
  //       await handleUploadArticle(data.path);
  //     }
  //   } catch (error) {
  //     addToast({
  //       type: "error",
  //       content: "아티클 발행중 에기치 못한 에러가 오류가 발생했습니다.",
  //       hasCloseButton: false,
  //     });
  //   }
  // };

  // const handleUploadArticle = async (thumbnailUrl: string) => {
  //   const response = await supabase
  //     .from("articles")
  //     .insert({
  //       title,
  //       body: createContentToHTML(content.getCurrentContent()),
  //       summary,
  //       thumbnail: thumbnailUrl,
  //       has_comments: hasComment,
  //     })
  //     .select("id");

  //   addToast({
  //     type: "success",
  //     content: "아티클 발행에 성공하였습니다.",
  //     hasCloseButton: true,
  //     staleTime: 3000,
  //   });

  //   resetSavedContent();
  //   const createdArticleId = response.data?.[0].id;
  //   navigate(`/article-read/${createdArticleId}`, { replace: true });
  // };

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
              <Modal.Button type="normal" onClick={goToPreviousStep}>
                뒤로
              </Modal.Button>
              <div className="ml-2" />
              <Modal.Button
                onClick={() => alert("구현중")}
                type="accept"
                disabled={!isPolicyChecked}
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
