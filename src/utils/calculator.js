/**
 * 房贷计算器 - 核心计算工具
 * Mortgage Calculator - Core Calculation Utilities
 *
 * 支持两种还款方式：
 *   1. 等额本息 (Equal Installment)：每月还款额固定
 *   2. 等额本金 (Equal Principal)：每月本金固定，月供逐月递减
 * 支持提前还款计算（减少月供 / 缩短期限两种模式）
 */

/**
 * 等额本息计算
 * 月供 = 贷款本金 × 月利率 × (1+月利率)^还款月数 / ((1+月利率)^还款月数 - 1)
 *
 * @param {number} principal - 贷款本金（元）
 * @param {number} annualRate - 年利率（百分比数值，如 4.9 表示 4.9%）
 * @param {number} years - 贷款年限
 * @returns {CalculateResult} 计算结果对象
 */
export function calculateEqualInstallment(principal, annualRate, years) {
  const totalMonths = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  let monthlyPayment;
  if (monthlyRate === 0) {
    monthlyPayment = principal / totalMonths;
  } else {
    const pow = Math.pow(1 + monthlyRate, totalMonths);
    monthlyPayment = (principal * monthlyRate * pow) / (pow - 1);
  }

  const schedule = [];
  let remainingPrincipal = principal;
  let totalInterest = 0;

  for (let i = 1; i <= totalMonths; i++) {
    const interest = remainingPrincipal * monthlyRate;
    const principalPaid = monthlyPayment - interest;
    remainingPrincipal -= principalPaid;
    totalInterest += interest;

    schedule.push({
      month: i,
      payment: round2(monthlyPayment),
      principal: round2(principalPaid),
      interest: round2(interest),
      remaining: Math.max(0, round2(remainingPrincipal)),
    });
  }

  return {
    monthlyPayment: round2(monthlyPayment),
    firstMonthPayment: round2(monthlyPayment),
    totalPayment: round2(monthlyPayment * totalMonths),
    totalInterest: round2(totalInterest),
    schedule,
  };
}

/**
 * 等额本金计算
 * 每月本金 = 贷款本金 / 还款月数
 * 每月利息 = 剩余本金 × 月利率
 * 月供 = 每月本金 + 每月利息（逐月递减）
 *
 * @param {number} principal - 贷款本金（元）
 * @param {number} annualRate - 年利率（百分比数值）
 * @param {number} years - 贷款年限
 * @returns {CalculateResult} 计算结果对象
 */
export function calculateEqualPrincipal(principal, annualRate, years) {
  const totalMonths = years * 12;
  const monthlyRate = annualRate / 100 / 12;
  const monthlyPrincipal = principal / totalMonths;

  const schedule = [];
  let remainingPrincipal = principal;
  let totalInterest = 0;

  for (let i = 1; i <= totalMonths; i++) {
    const interest = remainingPrincipal * monthlyRate;
    const payment = monthlyPrincipal + interest;
    remainingPrincipal -= monthlyPrincipal;
    totalInterest += interest;

    schedule.push({
      month: i,
      payment: round2(payment),
      principal: round2(monthlyPrincipal),
      interest: round2(interest),
      remaining: Math.max(0, round2(remainingPrincipal)),
    });
  }

  return {
    monthlyPayment: round2(schedule[0]?.payment || 0),
    firstMonthPayment: round2(schedule[0]?.payment || 0),
    lastMonthPayment: round2(schedule[schedule.length - 1]?.payment || 0),
    totalPayment: round2(principal + totalInterest),
    totalInterest: round2(totalInterest),
    schedule,
  };
}

/**
 * 统一计算入口：根据还款方式调用对应计算方法
 *
 * @param {number} principal - 贷款本金（元）
 * @param {number} annualRate - 年利率（百分比）
 * @param {number} years - 贷款年限
 * @param {'equal-installment'|'equal-principal'} method - 还款方式
 * @returns {CalculateResult}
 */
export function calculate(principal, annualRate, years, method) {
  if (method === 'equal-principal') {
    return calculateEqualPrincipal(principal, annualRate, years);
  }
  return calculateEqualInstallment(principal, annualRate, years);
}

/**
 * 提前还款计算
 *
 * 场景：在还贷第 prepayMonth 期后，额外偿还 prepayAmount 元，
 *       剩余贷款按两种模式重新计算：
 *       - 'reduce-payment'：期限不变，减少月供
 *       - 'reduce-term'：月供不变，缩短期限
 *
 * @param {number} principal - 原始贷款本金（元）
 * @param {number} annualRate - 年利率（百分比）
 * @param {number} years - 原始贷款年限
 * @param {'equal-installment'|'equal-principal'} method - 还款方式
 * @param {number} prepayAmount - 提前还款金额（元）
 * @param {number} prepayMonth - 第几期后提前还款
 * @param {'reduce-payment'|'reduce-term'} prepayMode - 提前还款模式
 * @returns {PrepaymentResult}
 */
export function calculatePrepayment(
    principal, annualRate, years, method,
    prepayAmount, prepayMonth, prepayMode) {
  const totalMonths = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  // 计算提前还款前的已还情况
  const originalResult = calculate(principal, annualRate, years, method);

  // 用 schedule 获取第 prepayMonth 期后的剩余本金
  const remainingBeforePrepay = originalResult.schedule[prepayMonth - 1]?.remaining || 0;

  // 提前还款后剩余本金
  const newPrincipal = Math.max(0, remainingBeforePrepay - prepayAmount);
  const remainingMonths = totalMonths - prepayMonth;

  if (newPrincipal <= 0) {
    return {
      newPrincipal: 0,
      newMonthlyPayment: 0,
      newTotalPayment: 0,
      savedInterest: round2(originalResult.schedule
          .slice(prepayMonth)
          .reduce((sum, item) => sum + item.interest, 0)),
      newSchedule: [],
      newTerm: 0,
    };
  }

  let newResult;
  let newTermYears;

  if (prepayMode === 'reduce-payment') {
    // 期限不变，减少月供
    newResult = calculate(newPrincipal, annualRate, remainingMonths / 12, method);
    newTermYears = remainingMonths / 12;
  } else {
    // 月供不变，缩短期限
    if (method === 'equal-installment') {
      const targetPayment = originalResult.monthlyPayment;
      newResult = calculateByTargetPayment(newPrincipal, annualRate, targetPayment, 'equal-installment');
    } else {
      const monthlyPrincipal = originalResult.schedule[0]?.principal || 0;
      newResult = calculateByTargetPayment(newPrincipal, annualRate, monthlyPrincipal, 'equal-principal');
    }
    newTermYears = (newResult.schedule?.length || 0) / 12;
  }

  // 计算节省的利息
  const originalRemainingInterest = originalResult.schedule
      .slice(prepayMonth)
      .reduce((sum, item) => sum + item.interest, 0);

  const savedInterest = originalRemainingInterest - (newResult.totalInterest || 0);

  return {
    newPrincipal: round2(newPrincipal),
    newMonthlyPayment: newResult.monthlyPayment || 0,
    newTotalPayment: newResult.totalPayment || 0,
    savedInterest: round2(Math.max(0, savedInterest)),
    newSchedule: newResult.schedule || [],
    newTerm: round2(newTermYears, 1),
  };
}

/**
 * 按目标月供反算（用于提前还款-缩短期限模式）
 * 等额本息：月供不变，反算还清所需月数
 * 等额本金：每月本金不变，月供随时间递减直到还清
 *
 * @param {number} principal - 本金
 * @param {number} annualRate - 年利率
 * @param {number} targetPayment - 目标月供（等额本息：月供金额；等额本金：月还本金）
 * @param {'equal-installment'|'equal-principal'} method - 还款方式
 * @returns {CalculateResult}
 */
function calculateByTargetPayment(principal, annualRate, targetPayment, method) {
  const monthlyRate = annualRate / 100 / 12;

  if (method === 'equal-installment') {
    // 月供 targetPayment，反算多少个月还清
    if (monthlyRate === 0) {
      const months = Math.ceil(principal / targetPayment);
      return calculate(principal, annualRate, months / 12, 'equal-installment');
    }
    // n = -ln(1 - P*r/M) / ln(1+r)
    const n = -Math.log(1 - (principal * monthlyRate) / targetPayment) /
        Math.log(1 + monthlyRate);
    const totalMonths = Math.max(1, Math.ceil(n));
    return calculate(principal, annualRate, totalMonths / 12, 'equal-installment');
  } else {
    // 等额本金：每月本金 = targetPayment（即每月还的本金固定）
    const monthlyPrincipal = targetPayment;
    const schedule = [];
    let remainingPrincipal = principal;
    let totalInterest = 0;

    while (remainingPrincipal > 0.01) {
      const interest = remainingPrincipal * monthlyRate;
      const actualPrincipal = Math.min(monthlyPrincipal, remainingPrincipal);
      const payment = actualPrincipal + interest;
      remainingPrincipal -= actualPrincipal;
      totalInterest += interest;

      schedule.push({
        month: schedule.length + 1,
        payment: round2(payment),
        principal: round2(actualPrincipal),
        interest: round2(interest),
        remaining: Math.max(0, round2(remainingPrincipal)),
      });
    }

    return {
      monthlyPayment: round2(schedule[0]?.payment || 0),
      firstMonthPayment: round2(schedule[0]?.payment || 0),
      lastMonthPayment: round2(schedule[schedule.length - 1]?.payment || 0),
      totalPayment: round2(principal + totalInterest),
      totalInterest: round2(totalInterest),
      schedule,
    };
  }
}

/**
 * 格式化金额为人民币显示
 * 超过 10,000 则转换为"万元"，保留 2 位小数
 *
 * @param {number} value - 金额（元）
 * @returns {string} 格式化后的字符串
 */
export function formatMoney(value) {
  if (value >= 10000) {
    return (value / 10000).toFixed(2) + ' 万元';
  }
  return value.toFixed(2) + ' 元';
}

/**
 * 格式化金额为纯数字显示（带千分位分隔符）
 *
 * @param {number} value - 金额（元）
 * @returns {string} 格式化后的字符串，如 "12,345.67"
 */
export function formatCurrency(value) {
  return value.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * 保留两位小数的四舍五入
 * @param {number} value - 数值
 * @param {number} [decimals=2] - 小数位数
 * @returns {number}
 */
function round2(value, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
