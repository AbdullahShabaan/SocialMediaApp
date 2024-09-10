import { Dayjs } from "dayjs";

interface IIinitialValues {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: Dayjs | null;
  gender: string;
}

export default IIinitialValues;
