import { IInvoiceCreate } from "../../interfaces/invoice";

export function calculateInvoice(values: IInvoiceCreate) {
  const {
    basicPayForThisMonth,
    committedHoursForThisMonth,
    workingHoursForThisMonth,
    publiceLeavesForThisMonth,
    publiceLeaveWorkingHourForThisMonth,
    paidLeavesForThisMonth,
  } = values;
  

  const oneDayHours = committedHoursForThisMonth / 20 || 0; // Default to 0 to avoid division by zero
  const publicLeavesInHours = publiceLeavesForThisMonth * oneDayHours;
  const requiredTotalHoursForThisMonth =
    publicLeavesInHours > 0
      ? committedHoursForThisMonth - publicLeavesInHours
      : committedHoursForThisMonth;

  const basicPayPerHourForThisMonth =
    requiredTotalHoursForThisMonth > 0
      ? basicPayForThisMonth / requiredTotalHoursForThisMonth
      : 0; // Handle division by zero

  const overTimePayPerHourForThisMonth = basicPayPerHourForThisMonth * 1.5;
  const publicLeavesPayPerHourForThisMonth = basicPayPerHourForThisMonth * 2;

  const overTimeHoursForThisMonth =
    workingHoursForThisMonth > requiredTotalHoursForThisMonth
      ? workingHoursForThisMonth -
        requiredTotalHoursForThisMonth -
        publiceLeaveWorkingHourForThisMonth
      : 0;

  const basicPayThisMonth =
    requiredTotalHoursForThisMonth <= workingHoursForThisMonth
      ? basicPayPerHourForThisMonth * requiredTotalHoursForThisMonth
      : basicPayPerHourForThisMonth * workingHoursForThisMonth;
  // const basicPayThisMonth =
  //   requiredTotalHoursForThisMonth < workingHoursForThisMonth
  //     ? basicPayPerHourForThisMonth * requiredTotalHoursForThisMonth
  //     : basicPayForThisMonth;


  const overTimePayForThisMonth =
    overTimePayPerHourForThisMonth * overTimeHoursForThisMonth;

  const totalPubliceLeavesPayForThisMonth = publiceLeaveWorkingHourForThisMonth
    ? basicPayPerHourForThisMonth * 2 * publiceLeaveWorkingHourForThisMonth
    : 0;

  const totalSalaryForThisMonth =
    basicPayThisMonth +
    overTimePayForThisMonth +
    totalPubliceLeavesPayForThisMonth;
  const basicPay =
    totalSalaryForThisMonth > basicPayForThisMonth
      ? basicPayForThisMonth
      : totalSalaryForThisMonth;
  // Replace NaN and Infinity with 0
  const safeValue = (value: number) =>
    isNaN(value) || !isFinite(value) ? 0 : value;

  return {
    requiredTotalHoursForThisMonth: Math.ceil(
      safeValue(requiredTotalHoursForThisMonth || 0)
    ),
    basicPayPerHourForThisMonth: Math.ceil(
      safeValue(basicPayPerHourForThisMonth || 0)
    ),
    overTimePayPerHourForThisMonth: Math.ceil(
      safeValue(overTimePayPerHourForThisMonth || 0)
    ),
    publiceLeavesPayPerHourForThisMonth: Math.ceil(
      safeValue(publicLeavesPayPerHourForThisMonth || 0)
    ),
    overTimeHoursForThisMonth: Math.ceil(
      safeValue(overTimeHoursForThisMonth || 0)
    ),
    overTimePayForThisMonth: Math.ceil(safeValue(overTimePayForThisMonth || 0)),
    totalPubliceLeavesPayForThisMonth: Math.ceil(
      safeValue(totalPubliceLeavesPayForThisMonth || 0)
    ),
    totalSalaryForThisMonth: Math.ceil(safeValue(totalSalaryForThisMonth || 0)),
    paidLeavesForThisMonth: Math.ceil(safeValue(paidLeavesForThisMonth || 0)),
    basicPayForThisMonth: Math.ceil(safeValue(basicPayForThisMonth || 0)),
    committedHoursForThisMonth: Math.ceil(
      safeValue(committedHoursForThisMonth)
    ),
    workingHoursForThisMonth: Math.ceil(
      safeValue(workingHoursForThisMonth || 0)
    ),
    publiceLeavesForThisMonth: Math.ceil(
      safeValue(publiceLeavesForThisMonth || 0)
    ),
    publiceLeaveWorkingHourForThisMonth: Math.ceil(
      safeValue(publiceLeaveWorkingHourForThisMonth || 0)
    ),
    totalBasicSalaryForThisMonth: Math.ceil(
      safeValue(basicPayForThisMonth || 0)
    ),
    basicPay: Math.ceil(safeValue(basicPay || 0)),
  };
}

// export function calculateInvoice(values: IInvoicesFormValues) {
//   const {
//     basicPayForThisMonth,
//     committedHoursForThisMonth,
//     workingHoursForThisMonth,
//     publiceLeavesForThisMonth,
//     publiceLeaveWorkingHourForThisMonth,
//   } = values;

//   const oneDayHours = committedHoursForThisMonth / 20;
//   const publicLeavesInHours = publiceLeavesForThisMonth * oneDayHours;

//   const requiredTotalHoursForThisMonth =
//     committedHoursForThisMonth - publicLeavesInHours;
//   const basicPayPerHourThisMonth =
//     basicPayForThisMonth / requiredTotalHoursForThisMonth;
//   const overTimePayPerHour = basicPayPerHourThisMonth * 1.5;
//   const publicLeavespayPerHour = basicPayPerHourThisMonth * 2;

//   const overTimeHours =
//     workingHoursForThisMonth > requiredTotalHoursForThisMonth
//       ? workingHoursForThisMonth -
//         requiredTotalHoursForThisMonth -
//         publiceLeaveWorkingHourForThisMonth
//       : 0;

//   const basicPayThisMonth =
//     requiredTotalHoursForThisMonth <= workingHoursForThisMonth
//       ? basicPayPerHourThisMonth * requiredTotalHoursForThisMonth
//       : basicPayPerHourThisMonth * workingHoursForThisMonth;

//   const overTimePayForThisMonth = overTimePayPerHour * overTimeHours;

//   const publicHoursPayThisMonth = publiceLeaveWorkingHourForThisMonth
//     ? basicPayPerHourThisMonth * 2 * publiceLeaveWorkingHourForThisMonth
//     : 0;

//   const totalSalaryThisMonth =
//     basicPayThisMonth + overTimePayForThisMonth + publicHoursPayThisMonth;

//   return {
//     requiredTotalHoursForThisMonth,
//     basicPayPerHourThisMonth,
//     overTimePayPerHour,
//     publicLeavespayPerHour,
//     basicPayThisMonth,
//     overTimeHours,
//     overTimePayForThisMonth,
//     publicHoursPayThisMonth,
//     totalSalaryThisMonth,
//   };
// }

// export function calculateInvoice(values: IInvoicesFormValues) {
//   const {
//     basicPayForThisMonth,
//     committedHoursForThisMonth,
//     workingHoursForThisMonth,
//     publicLeavesForThisMonth,
//     publicLeaveWorkingHourForThisMonth,
//   } = values;

//   const oneDayHours = committedHours / 20;
//   const publicLeavesInHours = publiceLeaves * oneDayHours;

//   const requiredTotalHoursForThisMonth = committedHours - publicLeavesInHours;
//   const basicPayPerHourThisMonth = basicPay / requiredTotalHoursForThisMonth;
//   const overTimePayPerHour = basicPayPerHourThisMonth * 1.5;
//   const publicLeavespayPerHour = basicPayPerHourThisMonth * 2;

//   console.log({
//     workingHours,
//     requiredTotalHoursForThisMonth,
//     publicLeavesInHours,
//   });
//   const overTimeHours =
//     workingHours > requiredTotalHoursForThisMonth
//       ? workingHours - requiredTotalHoursForThisMonth - publicLeaveWorkingHour
//       : 0;

//   const basicPayThisMonth =
//     requiredTotalHoursForThisMonth <= workingHours
//       ? basicPayPerHourThisMonth * requiredTotalHoursForThisMonth
//       : basicPayPerHourThisMonth * workingHours;

//   const overTimePayForThisMonth = overTimePayPerHour * overTimeHours;

//   const publicHoursPayThisMonth = publicLeaveWorkingHour
//     ? basicPayPerHourThisMonth * 2 * publicLeaveWorkingHour
//     : 0;

//   const totalSalaryThisMonth =
//     basicPayThisMonth + overTimePayForThisMonth + publicHoursPayThisMonth;

//   return {
//     requiredTotalHoursForThisMonth,
//     basicPayPerHourThisMonth,
//     overTimePayPerHour,
//     publicLeavespayPerHour,
//     basicPayThisMonth,
//     overTimeHours,
//     overTimePayForThisMonth,
//     publicLeaveWorkingHour,
//     publicHoursPayThisMonth,
//     totalSalaryThisMonth,
//     workingHours,
//     publiceLeaves,
//   };
// }
