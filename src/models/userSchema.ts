import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required("required"),
  password: yup.string().required("required"),
});
