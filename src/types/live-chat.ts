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