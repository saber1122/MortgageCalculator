/**
 * 房贷计算器 - 单元测试
 */
import { describe, it, expect } from 'vitest';
import {
  calculateEqualInstallment,
  calculateEqualPrincipal,
  calculate,
  calculatePrepayment,
  formatMoney,
  formatCurrency,
} from './calculator';

describe('calculateEqualInstallment - 等额本息', () => {
  it('贷款100万，年利率4.9%，30年 - 月供应约5307.27', () => {
    const result = calculateEqualInstallment(1000000, 4.9, 30);
    expect(result.monthlyPayment).toBeCloseTo(5307.27, 0);
  });

  it('贷款100万，年利率4.9%，20年 - 月供应约6544.44', () => {
    const result = calculateEqualInstallment(1000000, 4.9, 20);
    expect(result.monthlyPayment).toBeCloseTo(6544.44, 0);
  });

  it('利率为0时，月供应等于本金/总月数', () => {
    const result = calculateEqualInstallment(120000, 0, 10);
    expect(result.monthlyPayment).toBeCloseTo(1000, 2);
  });

  it('schedule 长度应等于总月数', () => {
    const result = calculateEqualInstallment(100000, 5, 1);
    expect(result.schedule.length).toBe(12);
  });

  it('最后一期剩余本金应接近0', () => {
    const result = calculateEqualInstallment(1000000, 4.9, 30);
    const last = result.schedule[result.schedule.length - 1];
    expect(last.remaining).toBeLessThan(1);
  });

  it('总还款额 = 本金 + 总利息', () => {
    const result = calculateEqualInstallment(500000, 5, 10);
    const calculatedTotal = 500000 + result.totalInterest;
    expect(result.totalPayment).toBeCloseTo(calculatedTotal, 0);
  });

  it('每期还款明细中的金额累加应等于总额', () => {
    const result = calculateEqualInstallment(300000, 3.5, 5);
    const scheduleTotal = result.schedule.reduce((s, item) => s + item.payment, 0);
    expect(scheduleTotal).toBeCloseTo(result.totalPayment, 0);
  });
});

describe('calculateEqualPrincipal - 等额本金', () => {
  it('贷款100万，年利率4.9%，30年 - 首月月供应约6861.11', () => {
    const result = calculateEqualPrincipal(1000000, 4.9, 30);
    expect(result.firstMonthPayment).toBeCloseTo(6861.11, 0);
  });

  it('月供应逐月递减', () => {
    const result = calculateEqualPrincipal(1000000, 4.9, 30);
    const first = result.schedule[0].payment;
    const second = result.schedule[1].payment;
    expect(second).toBeLessThan(first);
  });

  it('每月本金应相等', () => {
    const result = calculateEqualPrincipal(1000000, 4.9, 30);
    const firstPrincipal = result.schedule[0].principal;
    result.schedule.forEach((item) => {
      expect(item.principal).toBeCloseTo(firstPrincipal, 0);
    });
  });

  it('总还款额 = 本金 + 总利息', () => {
    const result = calculateEqualPrincipal(500000, 4.5, 20);
    expect(result.totalPayment).toBeCloseTo(500000 + result.totalInterest, 0);
  });

  it('最后一期剩余本金接近0', () => {
    const result = calculateEqualPrincipal(300000, 3.5, 15);
    const last = result.schedule[result.schedule.length - 1];
    expect(last.remaining).toBeLessThan(1);
  });
});

describe('calculate - 统一入口', () => {
  it('等额本息与直接调用结果一致', () => {
    const direct = calculateEqualInstallment(1000000, 4.9, 30);
    const viaCalculate = calculate(1000000, 4.9, 30, 'equal-installment');
    expect(viaCalculate.monthlyPayment).toBe(direct.monthlyPayment);
  });

  it('等额本金与直接调用结果一致', () => {
    const direct = calculateEqualPrincipal(1000000, 4.9, 30);
    const viaCalculate = calculate(1000000, 4.9, 30, 'equal-principal');
    expect(viaCalculate.firstMonthPayment).toBe(direct.firstMonthPayment);
  });
});

describe('calculatePrepayment - 提前还款', () => {
  it('减少月供模式：提前还10万应节省利息', () => {
    const result = calculatePrepayment(
      1000000, 4.9, 30, 'equal-installment',
      100000, 12, 'reduce-payment'
    );
    expect(result.savedInterest).toBeGreaterThan(0);
    expect(result.newPrincipal).toBeLessThan(1000000);
  });

  it('缩短期限模式：节省利息应大于0', () => {
    const result = calculatePrepayment(
      1000000, 4.9, 30, 'equal-installment',
      100000, 12, 'reduce-term'
    );
    expect(result.savedInterest).toBeGreaterThan(0);
    expect(result.newTerm).toBeLessThan(29);
  });

  it('提前还清：newPrincipal 应为 0', () => {
    const result = calculatePrepayment(
      1000000, 4.9, 30, 'equal-installment',
      5000000, 12, 'reduce-payment'
    );
    expect(result.newPrincipal).toBe(0);
  });

  it('等额本金-减少月供模式', () => {
    const result = calculatePrepayment(
      1000000, 4.9, 30, 'equal-principal',
      100000, 12, 'reduce-payment'
    );
    expect(result.savedInterest).toBeGreaterThan(0);
  });

  it('等额本金-缩短期限模式', () => {
    const result = calculatePrepayment(
      1000000, 4.9, 30, 'equal-principal',
      100000, 12, 'reduce-term'
    );
    expect(result.savedInterest).toBeGreaterThan(0);
  });

  it('第一期内提前还款', () => {
    const result = calculatePrepayment(
      1000000, 4.9, 30, 'equal-installment',
      50000, 1, 'reduce-payment'
    );
    expect(result.savedInterest).toBeGreaterThan(0);
  });
});

describe('formatMoney - 金额格式化', () => {
  it('小于1万显示元', () => {
    expect(formatMoney(5000)).toBe('5000.00 元');
  });

  it('大于等于1万显示万元', () => {
    expect(formatMoney(100000)).toBe('10.00 万元');
  });

  it('大额金额正确显示', () => {
    expect(formatMoney(1234567)).toBe('123.46 万元');
  });
});

describe('formatCurrency - 千分位格式化', () => {
  it('应包含千分位分隔符', () => {
    const result = formatCurrency(1234567.89);
    expect(result).toMatch(/1,234,567/);
  });
});

describe('边界情况', () => {
  it('贷款期限1年应正常工作', () => {
    const result = calculateEqualInstallment(100000, 5, 1);
    expect(result.schedule.length).toBe(12);
  });

  it('贷款金额很小也应正常工作', () => {
    const result = calculateEqualInstallment(10000, 5, 10);
    expect(result.monthlyPayment).toBeGreaterThan(0);
  });

  it('利率很高也应正常工作', () => {
    const result = calculateEqualInstallment(100000, 20, 1);
    expect(result.monthlyPayment).toBeGreaterThan(0);
  });
});
