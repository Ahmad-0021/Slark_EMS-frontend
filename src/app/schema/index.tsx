import * as yup from "yup";

export const invoiceSchema = yup.object({
  basicPayForThisMonth: yup.number().required().min(0, "Invalid Basic Pay"),
  committedHoursForThisMonth: yup
    .number()
    .min(0)
    .required()
    .min(0, "Invalid Total Hours"),
  workingHoursForThisMonth: yup
    .number()
    .min(0)
    .required()
    .min(0, "Invalid Working Hours"),
  publiceLeavesForThisMonth: yup.number().min(0).notRequired(),
  publiceLeaveWorkingHourForThisMonth: yup.number().min(0).notRequired(),
  paidLeavesForThisMonth: yup.number().min(0).notRequired(),
});
