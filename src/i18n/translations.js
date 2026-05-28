/**
 * 国际化翻译字典 — 中 / 日 / 英
 *
 * 所有 UI 文本集中管理，key 命名规则：{组件名}.{功能点}
 * 组件通过 useTranslation() hook 的 t(key) 函数获取当前语言文本
 */

const translations = {
  // ==================== 中文 ====================
  'zh-CN': {
    // --- 通用 ---
    'common.yuan': '元',
    'common.wan': '万',
    'common.year': '年',
    'common.month': '月',
    'common.period': '期',
    'common.perPage': '每页：',

    // --- 语言切换 ---
    'lang.label': '语言',
    'lang.zh': '中文',
    'lang.ja': '日本語',
    'lang.en': 'English',

    // --- 标题区域 (MonthlyPayment) ---
    'hero.title': '每月还款金额',
    'hero.equalPrincipalNote': '等额本金 · 首月最高，逐月递减',
    'hero.perMonth': '元 / 月',
    'hero.firstMonth': '首月',
    'hero.to': '→',
    'hero.lastMonth': '末月',
    'hero.monthlyDecrease': '每月递减约 ¥',

    // --- 参数面板标题 (App) ---
    'panel.title': '📊 贷款参数调节',

    // --- 输入面板 (LoanInputPanel) ---
    'input.loanAmountLabel': '贷款金额（万元）',
    'input.loanAmountHelper': '1 万 - 5000 万',
    'input.loanAmountUnit': '万元',
    'input.rateLabel': '年利率（LPR）',
    'input.rateHelper': '1% - 20%',
    'input.rateUnit': '%',
    'input.termLabel': '贷款期限',
    'input.termHelper': '1 - 30 年',
    'input.termUnit': '年',
    'input.presetWan': '{value}万',

    // --- 还款方式 ---
    'method.label': '还款方式：',
    'method.equalInstallment': '等额本息',
    'method.equalPrincipal': '等额本金',
    'method.installmentDesc': '每月还款额固定，适合收入稳定人群',
    'method.principalDesc': '每月本金固定，月供逐月递减，总利息更少',

    // --- 汇总卡片 ---
    'summary.totalInterest': '利息总额',
    'summary.totalPayment': '还款总额',
    'summary.principal': '贷款本金',
    'summary.periods': '还款期数',
    'summary.periodUnit': '期（月）',

    // --- 分析区域 (App) ---
    'analysis.title': '📈 还款分析',

    // --- 饼图 (PaymentChart) ---
    'chart.principalName': '本金',
    'chart.interestName': '利息',
    'chart.ratioTitle': '本金 vs 利息 占比',
    'chart.ratio': '占比',
    'chart.total': '总额',
    'chart.wanUnit': '万',

    // --- 还款明细表 (AmortizationTable) ---
    'table.title': '还款明细表',
    'table.colPeriod': '期数',
    'table.colPayment': '月供（元）',
    'table.colPrincipal': '本金（元）',
    'table.colInterest': '利息（元）',
    'table.colRemaining': '剩余本金（元）',
    'table.noData': '暂无数据',
    'table.periodPrefix': '第',
    'table.periodSuffix': '期',
    'table.displayedRows': ({ from, to, count }) => `${from}-${to} / 共 ${count} 期`,

    // --- 提前还款 (PrepaymentCalc) ---
    'prepay.title': '💰 提前还款计算器',
    'prepay.amountLabel': '提前还款金额',
    'prepay.amountUnit': '万元',
    'prepay.amountExceeds': '不能超过剩余本金',
    'prepay.remainingPrincipal': ({ val }) => `剩余本金：${val} 元`,
    'prepay.monthLabel': '第几期后还款',
    'prepay.monthUnit': '期',
    'prepay.monthExceeds': '超出范围',
    'prepay.monthRange': ({ total }) => `范围：1 - ${total} 期`,
    'prepay.reducePayment': '减少月供',
    'prepay.keepTerm': '期限不变',
    'prepay.reduceTerm': '缩短期限',
    'prepay.keepPayment': '月供不变',
    'prepay.savedInterestTip': ({ val }) => `💡 提前还款可节省利息：¥ ${val}`,
    'prepay.newPrincipal': '剩余本金',
    'prepay.newPayment': '新月供',
    'prepay.savedInterest': '节省利息',
    'prepay.newTerm': '新期限',
    'prepay.remainingTerm': '剩余期限',
    'prepay.hint': '输入提前还款金额和期数，查看可节省的利息',

    // --- Footer ---
    'footer.text': '房贷计算器 · 按揭计算器 · 等额本息计算器 · 等额本金计算器 · 提前还款计算器 · 月供计算器',
    'footer.disclaimer': '计算结果仅供参考，实际以银行审批为准',
  },

  // ==================== 日本語 ====================
  'ja': {
    'common.yuan': '元',
    'common.wan': '万',
    'common.year': '年',
    'common.month': '月',
    'common.period': '回',
    'common.perPage': 'ページごと：',

    'lang.label': '言語',
    'lang.zh': '中国語',
    'lang.ja': '日本語',
    'lang.en': 'English',

    'hero.title': '月次返済額',
    'hero.equalPrincipalNote': '元金均等返済 · 初月最高、月々減少',
    'hero.perMonth': '元 / 月',
    'hero.firstMonth': '初月',
    'hero.to': '→',
    'hero.lastMonth': '最終月',
    'hero.monthlyDecrease': '月々約 ¥ の減少',

    'panel.title': '📊 ローン条件設定',

    'input.loanAmountLabel': '借入金額（万元）',
    'input.loanAmountHelper': '1万 - 5000万',
    'input.loanAmountUnit': '万元',
    'input.rateLabel': '年利（LPR）',
    'input.rateHelper': '1% - 20%',
    'input.rateUnit': '%',
    'input.termLabel': '返済期間',
    'input.termHelper': '1 - 30年',
    'input.termUnit': '年',
    'input.presetWan': '{value}万',

    'method.label': '返済方式：',
    'method.equalInstallment': '元利均等返済',
    'method.equalPrincipal': '元金均等返済',
    'method.installmentDesc': '毎月の返済額が固定、安定した収入の方に最適',
    'method.principalDesc': '毎月の元金が固定、返済額は月々減少、総利息を節約',

    'summary.totalInterest': '総利息',
    'summary.totalPayment': '総返済額',
    'summary.principal': '借入元金',
    'summary.periods': '返済回数',
    'summary.periodUnit': '回（月）',

    'analysis.title': '📈 返済分析',

    'chart.principalName': '元金',
    'chart.interestName': '利息',
    'chart.ratioTitle': '元金 vs 利息 内訳',
    'chart.ratio': '割合',
    'chart.total': '合計',
    'chart.wanUnit': '万',

    'table.title': '返済明細表',
    'table.colPeriod': '回数',
    'table.colPayment': '月次返済（元）',
    'table.colPrincipal': '元金（元）',
    'table.colInterest': '利息（元）',
    'table.colRemaining': '残元金（元）',
    'table.noData': 'データなし',
    'table.periodPrefix': '第',
    'table.periodSuffix': '回目',
    'table.displayedRows': ({ from, to, count }) => `${from}-${to} / 全${count}回`,

    'prepay.title': '💰 繰上返済シミュレーター',
    'prepay.amountLabel': '繰上返済額',
    'prepay.amountUnit': '万元',
    'prepay.amountExceeds': '残元金を超過しています',
    'prepay.remainingPrincipal': ({ val }) => `残元金：${val} 元`,
    'prepay.monthLabel': '何回目後に繰上返済',
    'prepay.monthUnit': '回',
    'prepay.monthExceeds': '範囲外です',
    'prepay.monthRange': ({ total }) => `範囲：1 - ${total} 回`,
    'prepay.reducePayment': '返済額減少',
    'prepay.keepTerm': '期間変更なし',
    'prepay.reduceTerm': '期間短縮',
    'prepay.keepPayment': '返済額変更なし',
    'prepay.savedInterestTip': ({ val }) => `💡 繰上返済で節約できる利息：¥ ${val}`,
    'prepay.newPrincipal': '残元金',
    'prepay.newPayment': '新規返済額',
    'prepay.savedInterest': '節約利息',
    'prepay.newTerm': '新期間',
    'prepay.remainingTerm': '残期間',
    'prepay.hint': '繰上返済額と回数を入力して、節約可能な利息をご確認ください',

    'footer.text': '住宅ローン計算機・按掲計算機・元利均等計算機・元金均等計算機・繰上返済計算機・月供計算機',
    'footer.disclaimer': '計算結果は参考値です。実際は銀行の審査基準に従ってください。',
  },

  // ==================== English ====================
  'en': {
    'common.yuan': 'CNY',
    'common.wan': '10K',
    'common.year': 'Years',
    'common.month': 'mo',
    'common.period': '#',
    'common.perPage': 'Per page:',

    'lang.label': 'Language',
    'lang.zh': '中文',
    'lang.ja': '日本語',
    'lang.en': 'English',

    'hero.title': 'Monthly Payment',
    'hero.equalPrincipalNote': 'Equal Principal · Highest first month, decreasing monthly',
    'hero.perMonth': 'CNY / mo',
    'hero.firstMonth': 'First mo',
    'hero.to': '→',
    'hero.lastMonth': 'Last mo',
    'hero.monthlyDecrease': 'Decreases ~CNY ',

    'panel.title': '📊 Loan Parameters',

    'input.loanAmountLabel': 'Loan Amount (×10K CNY)',
    'input.loanAmountHelper': '10K - 50M CNY',
    'input.loanAmountUnit': '×10K',
    'input.rateLabel': 'Annual Rate (LPR)',
    'input.rateHelper': '1% - 20%',
    'input.rateUnit': '%',
    'input.termLabel': 'Loan Term',
    'input.termHelper': '1 - 30 years',
    'input.termUnit': 'yr',
    'input.presetWan': ({ value }) => `${value * 10}K`,

    'method.label': 'Repayment Method:',
    'method.equalInstallment': 'Equal Installment',
    'method.equalPrincipal': 'Equal Principal',
    'method.installmentDesc': 'Fixed monthly payment, ideal for stable income',
    'method.principalDesc': 'Fixed principal each month, payment decreases, less total interest',

    'summary.totalInterest': 'Total Interest',
    'summary.totalPayment': 'Total Payment',
    'summary.principal': 'Principal',
    'summary.periods': 'Total Periods',
    'summary.periodUnit': 'months',

    'analysis.title': '📈 Repayment Analysis',

    'chart.principalName': 'Principal',
    'chart.interestName': 'Interest',
    'chart.ratioTitle': 'Principal vs Interest Breakdown',
    'chart.ratio': 'Share',
    'chart.total': 'Total',
    'chart.wanUnit': '×10K',

    'table.title': 'Amortization Schedule',
    'table.colPeriod': 'Period',
    'table.colPayment': 'Monthly (CNY)',
    'table.colPrincipal': 'Principal (CNY)',
    'table.colInterest': 'Interest (CNY)',
    'table.colRemaining': 'Remaining (CNY)',
    'table.noData': 'No data available',
    'table.periodPrefix': 'Mo.',
    'table.periodSuffix': '',
    'table.displayedRows': ({ from, to, count }) => `${from}-${to} of ${count}`,

    'prepay.title': '💰 Prepayment Calculator',
    'prepay.amountLabel': 'Prepayment Amount',
    'prepay.amountUnit': '×10K',
    'prepay.amountExceeds': 'Cannot exceed remaining principal',
    'prepay.remainingPrincipal': ({ val }) => `Remaining: CNY ${val}`,
    'prepay.monthLabel': 'After Period #',
    'prepay.monthUnit': '',
    'prepay.monthExceeds': 'Out of range',
    'prepay.monthRange': ({ total }) => `Range: 1 – ${total}`,
    'prepay.reducePayment': 'Reduce Payment',
    'prepay.keepTerm': 'Same Term',
    'prepay.reduceTerm': 'Shorten Term',
    'prepay.keepPayment': 'Same Payment',
    'prepay.savedInterestTip': ({ val }) => `💡 You could save interest: CNY ${val}`,
    'prepay.newPrincipal': 'New Principal',
    'prepay.newPayment': 'New Monthly',
    'prepay.savedInterest': 'Interest Saved',
    'prepay.newTerm': 'New Term',
    'prepay.remainingTerm': 'Remaining Term',
    'prepay.hint': 'Enter prepayment amount and period to see potential savings',

    'footer.text': 'Mortgage Calculator · Amortization Calculator · Equal Installment Calculator · Equal Principal Calculator · Prepayment Calculator · Payment Calculator',
    'footer.disclaimer': 'Results are for reference only. Actual terms subject to bank approval.',
  },
};

export default translations;
