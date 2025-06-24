import Swal, { type SweetAlertResult, type SweetAlertOptions } from 'sweetalert2';

interface AlertParams {
  text: string;
  title?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  customClass?: SweetAlertOptions['customClass'];
}

export const useSweetAlert = () => {

  const warningCustomClasses: SweetAlertOptions['customClass'] = {
    popup: 'warning-popup',
    title: 'warning-title',
    htmlContainer: 'warning-html-container',
    confirmButton: 'warning-confirm-button',
    cancelButton: 'warning-cancel-button',
    actions: 'warning-actions',
    icon: 'warning-icon',
  };

  const _showSwal = (options: SweetAlertOptions): Promise<SweetAlertResult> => {
    return Swal.fire(options);
  };

  const _buildAlertOptions = (
    type: SweetAlertOptions['icon'],
    { text, title, confirmButtonText, cancelButtonText, showCancelButton = true }: AlertParams
  ): SweetAlertOptions => {
    return {
      icon: type,
      title: title || '',
      html: text || '',
      confirmButtonText: confirmButtonText || 'OK',
      cancelButtonText: cancelButtonText || 'Cancel',
      showCancelButton: showCancelButton,
    };
  };

  const warning = (params: AlertParams): Promise<SweetAlertResult> => {
    const options: SweetAlertOptions = _buildAlertOptions('warning', params);
    options.customClass = {
      ...warningCustomClasses,
      ...params.customClass,
    };
    return _showSwal(options);
  };

  const info = (params: AlertParams): Promise<SweetAlertResult> => {
    const options: SweetAlertOptions = _buildAlertOptions('info', params);
    options.customClass = params.customClass || {};
    return _showSwal(options);
  };

  const error = (params: AlertParams): Promise<SweetAlertResult> => {
    const options: SweetAlertOptions = _buildAlertOptions('error', params);
    options.customClass = params.customClass || {};
    return _showSwal(options);
  };

  const success = (params: AlertParams): Promise<SweetAlertResult> => {
    const options: SweetAlertOptions = _buildAlertOptions('success', params);
    options.customClass = params.customClass || {};
    return _showSwal(options);
  };

  const question = (params: AlertParams): Promise<SweetAlertResult> => {
    const options: SweetAlertOptions = _buildAlertOptions('question', params);
    options.customClass = params.customClass || {};
    return _showSwal(options);
  };  

  const showSwal = (options: SweetAlertOptions): Promise<SweetAlertResult> => {
    return _showSwal(options);
  };

  return {
    showSwal,
    showAlert: {
      warning,
      info,
      error,
      success,
      question,
    },
  };
};
