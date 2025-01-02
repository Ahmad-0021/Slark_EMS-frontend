// get all invoices
export interface InvoiceRecord {
  id: number;
  month: string;
  requiredTotalHoursForThisMonth: number;
  basicPayPerHourForThisMonth: number;
  overTimePayPerHourForThisMonth: number;
  publiceLeavesPayPerHourForThisMonth: number;
  overTimeHoursForThisMonth: number;
  overTimePayForThisMonth: number;
  totalPubliceLeavesPayForThisMonth: number;
  totalSalaryForThisMonth: number;
  paidLeavesForThisMonth: number;
  basicPayForThisMonth: number;
  committedHoursForThisMonth: number;
  workingHoursForThisMonth: number;
  publiceLeavesForThisMonth: number;
  publiceLeaveWorkingHourForThisMonth: number;
  totalBasicSalaryForThisMonth: number;
  basicPay: number;
  slug?: string;
}

// create invoice

export interface IInvoiceCreate {
  basicPayForThisMonth: number;
  committedHoursForThisMonth: number;
  workingHoursForThisMonth: number;
  publiceLeavesForThisMonth: number;
  publiceLeaveWorkingHourForThisMonth: number;
  paidLeavesForThisMonth: number;

}

export interface ItotalInvoiceDetail {
  requiredTotalHoursForThisMonth: number;
  basicPayPerHourForThisMonth: number;
  overTimePayPerHourForThisMonth: number;
  publiceLeavesPayPerHourForThisMonth: number;
  overTimeHoursForThisMonth: number;
  overTimePayForThisMonth: number;
  totalPubliceLeavesPayForThisMonth: number;
  totalSalaryForThisMonth: number;
  paidLeavesForThisMonth: number;
  basicPayForThisMonth: number;
  committedHoursForThisMonth: number;
  workingHoursForThisMonth: number;
  publiceLeavesForThisMonth: number;
  publiceLeaveWorkingHourForThisMonth: number;
  totalBasicSalaryForThisMonth: number;
  basicPay: number;
}

// login

export interface LoginResponse {
  token: string;
}
