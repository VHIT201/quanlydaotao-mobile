import { BaseToast, ErrorToast, ToastProps } from "react-native-toast-message";

const SuccessToast = (props: ToastProps) => {
  return (
   <BaseToast {...props} style={{height: 90}} text1Style={{fontSize: 18}} text2Style={{fontSize: 15, marginTop: 10}}/>
  );
};

const FailedToast = (props: ToastProps) => {
  return (
    <ErrorToast {...props} style={{height: 90}} text1Style={{fontSize: 18}} text2Style={{fontSize: 15, marginTop: 10}}/>
  )
}

const ToastConfig = {
  success: (props: ToastProps) => SuccessToast(props),
  error: (props: ToastProps) => FailedToast(props)
}

export default ToastConfig