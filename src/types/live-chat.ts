export interface IActionWelcomeDialog {
  label: string;
  iconUrl: string;
}

export interface IAdditionalField {
  type: string;
  title: string;
  placeholder: string;
  required: boolean;
  iconField: string;
  dropdownItems: string[];
  isRequired: boolean;
}

export interface ILoginFormState {
  firstDescription: string;
  secondDescription: string;
  subtitle: string;
  buttonForm: string;
  customerIdentifier: string;
  additionalField: IAdditionalField[];
}

export interface IChatFormState {
  customerServiceName: string;
  customerServiceAvatar: string;
}

export interface IWelcomeDialogState {
  isWelcomeDialog: boolean;
  isAttentionGrabber: boolean;
  firstDescriptionWelcomeDialog: string;
  secondDescriptionWelcomeDialog: string;
  descriptionWelcomeDialog: string;
  appearDelayWelcomeDialog: string;
  isAutoExpandWelcomeDialog: boolean;
  isAttentionGrabberImage: boolean;
  isAttentionGrabberText: boolean;
  attentionGrabberTextDescription: string;
  attentionGrabberAppearDelay: string;
  attentionGrabberImage: string;
  brandIconWelcomeDialog: string;
  actionsWelcomeDialog: IActionWelcomeDialog[];
}
export interface ICallToActionState {
  isWithText: boolean;
  isWithIcon: boolean;
  liveChatButtonText: string;
  iconImage: string;
  borderRadius: string;
}