import { getDefaultKeyBinding, KeyBindingUtil } from "draft-js";

const bindingKeyFunction = (e: React.KeyboardEvent) => {
  if (KeyBindingUtil.hasCommandModifier(e) && e.key === "1") {
    return "header-one";
  }
  if (KeyBindingUtil.hasCommandModifier(e) && e.key === "2") {
    return "header-two";
  }
  if (KeyBindingUtil.hasCommandModifier(e) && e.key === "3") {
    return "header-three";
  }
  if (KeyBindingUtil.hasCommandModifier(e) && e.key === "4") {
    return "header-four";
  }
  if (KeyBindingUtil.hasCommandModifier(e) && e.key === "5") {
    return "header-five";
  }
  if (KeyBindingUtil.hasCommandModifier(e) && e.key === "6") {
    return "header-six";
  }
  if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === "o") {
    return "ordered-list-item";
  }
  if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === "u") {
    return "unordered-list-item";
  }
  if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === "q") {
    return "blockquote";
  }
  if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === "x") {
    return "strikethrough";
  }
  if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === "c") {
    return "code-block";
  }
  if (KeyBindingUtil.hasCommandModifier(e) && e.key === "u") {
    return "underline";
  }
  if (KeyBindingUtil.hasCommandModifier(e) && e.key === "s") {
    return "hlog-editor-save";
  }
  if (KeyBindingUtil.hasCommandModifier(e) && e.key === "r") {
    return "hlog-editor-refresh";
  }
  return getDefaultKeyBinding(e);
};

export default bindingKeyFunction;
