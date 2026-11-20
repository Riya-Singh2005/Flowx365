import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import {
  ADDITIONAL_LICENCE_NOTICE,
  addOns,
  billingsuiteBasic,
  billingsuiteProfessional,
  CTA_LABEL,
  everyPlan,
  formatPrice,
  GST_LINE,
  hrmsPayroll,
  plans,
  PRICE_PERIOD_LABELS,
  pricingFaqs,
  PRICING_SECTION_IDS,
  salesPro,
  schedule,
  terms,
  TRIAL_LABEL,
  TRIAL_LINE,
} from '../src/data/pricing.ts';
import { sections } from '../src/data/sections.ts';

// Names from the FlowX365 app sidebar and working routes, checked 2026-11-12.
// The HRMS and Payroll lists were supplied and confirmed live by the owner
// (2026-11-14). Reports carries only an on-demand line and is tested separately.
const SHIPPED_MODULES: Record<string, string[]> = {
  Sales: ['Customer Management', 'Estimation / Quotation', 'Sales Order Processing', 'Delivery Notes', 'Sales Tracker'],
  Purchase: ['Vendor Management', 'Purchase Requisition', 'Purchase Orders', 'GRN / Goods Receipt', 'Purchase Tracker'],
  Inventory: ['Items', 'Real Time Stock Tracking', 'Warehouse Management', 'Stock Transfer Management'],
  Accounting: [
    'Proforma Invoices',
    'Sales Invoices',
    'Purchase Invoices',
    'Payment – Receivable',
    'Payment – Payable',
  ],
  CRM: ['Lead Management', 'Lead Approval', 'Sales Pipeline', 'Sales Target & Performance'],
  Planner: ['Task Planner', 'Team Availability'],
  'Employee Management': [
    'Employee Directory',
    'Onboarding – Employee Creation',
    'Attendance',
    'Leave Management',
    'Performance',
    'Training & Development',
    'Employee Exit Form',
    'Tax Declaration Form',
  ],
  'Payroll Management': [
    'Payroll',
    'Pay Slip',
    'Offer Letter',
    'Increment Letter',
    'Tax Management',
    'Reimbursements',
    'Loan & Advances',
    'Employee Exit Clearance',
  ],
  'HRMS & Payroll Master': [
    'Holiday Master',
    'Employee ID Generate Master',
    'Department Master',
    'Location Master',
    'Shift Master',
    'Relieving Letter',
  ],
};

// In the sidebar but routed to a PlaceholderScreen: never sold on the page.
const PLACEHOLDERS = [
  'Chart of Accounts',
  'Journal Entries',
  'Banking',
  'Fixed Assets',
  'GST Management',
  'TDS Management',
  'Budget Creation',
  'Budget Approval',
  'Revenue Planning',
  'Expense Planning',
  'Budget vs Actual',
  'Forecasting & Scenarios',
  'Purchase Quotations',
  'Project Management',
  'Report',
];

describe('pricing data', () => {
  test('each plan carries the owner’s monthly and annual prices', () => {
    assert.deepEqual(
      plans.map((p) => [p.id, p.monthly, p.annual]),
      [
        ['basic', 250, 2499],
        ['professional', 499, 4999],
        ['enterprise', 999, 9999],
      ],
    );
    assert.deepEqual(plans.map((p) => formatPrice(p.monthly)), ['₹250', '₹499', '₹999']);
    assert.deepEqual(plans.map((p) => formatPrice(p.annual)), ['₹2,499', '₹4,999', '₹9,999']);
  });

  test('each plan states its included users', () => {
    assert.deepEqual(
      plans.map((p) => [p.users, p.usersLabel]),
      [
        [1, '1 User'],
        [5, 'Up to 5 Users'],
        [10, 'Up to 10 Users'],
      ],
    );
  });

  test('each plan states its included companies', () => {
    assert.deepEqual(
      plans.map((p) => [p.companies, p.companiesLabel]),
      [
        [1, '1 Company'],
        [3, 'Up to 3 Companies'],
        [5, 'Up to 5 Companies'],
      ],
    );
  });

  test('all three plans use the same original white rate sheet', () => {
    assert.deepEqual(plans.map((p) => p.copy), ['original', 'original', 'original']);
  });

  test('no discount, saving or monthly-equivalent figure has been invented', () => {
    for (const p of plans) {
      assert.doesNotMatch(Object.keys(p).join(' '), /discount|saving|equivalent|perMonth/i);
    }
  });

  test('prices use the approved period labels and exclude GST', () => {
    assert.deepEqual(PRICE_PERIOD_LABELS, { monthly: 'per month', annual: 'per year' });
    assert.equal(GST_LINE, 'Prices exclude GST');
  });

  test('exactly one plan is recommended, and every plan offers the same demo action', () => {
    assert.deepEqual(plans.filter((p) => p.recommended).map((p) => p.id), ['professional']);
    assert.equal(CTA_LABEL, 'Request a Demo');
  });

  test('plans expose the approved product hierarchy in order', () => {
    assert.deepEqual(
      plans.map((p) => p.products.map((product) => product.name)),
      [
        ['FlowX Billingsuite'],
        ['FlowX SalesPro', 'FlowX Billingsuite'],
        ['FlowX HRMS and Payroll', 'FlowX SalesPro', 'FlowX Billingsuite'],
      ],
    );
    assert.deepEqual(billingsuiteBasic.modules.map((module) => module.module), [
      'Sales',
      'Purchase',
      'Inventory',
      'Accounting',
    ]);
    assert.deepEqual(salesPro.modules.map((module) => module.module), ['Planner', 'CRM']);
    assert.deepEqual(hrmsPayroll.modules.map((module) => module.module), [
      'Employee Management',
      'Payroll Management',
      'Reports',
      'HRMS & Payroll Master',
    ]);
    assert.equal(plans[1].products[0], salesPro);
    assert.equal(plans[2].products[1], salesPro);
    assert.equal(plans[1].products[1], billingsuiteProfessional);
    assert.equal(plans[2].products[2], billingsuiteProfessional);
  });

  test('SalesPro and HRMS use the exact approved details', () => {
    assert.deepEqual(
      salesPro.modules.map((module) => [module.module, module.details.map((detail) => detail.label)]),
      [
        ['Planner', ['Task Planner', 'Team Availability']],
        ['CRM', ['Lead Management', 'Lead Approval', 'Sales Pipeline', 'Sales Target & Performance']],
      ],
    );
    assert.deepEqual(
      hrmsPayroll.modules.map((module) => [module.module, module.details.map((detail) => detail.label)]),
      [
        ['Employee Management', SHIPPED_MODULES['Employee Management']],
        ['Payroll Management', SHIPPED_MODULES['Payroll Management']],
        ['Reports', []],
        ['HRMS & Payroll Master', SHIPPED_MODULES['HRMS & Payroll Master']],
      ],
    );
  });

  test('Basic and expanded Billingsuite contain the exact approved details', () => {
    const labels = (product: typeof billingsuiteBasic) =>
      Object.fromEntries(product.modules.map((module) => [module.module, module.details.map((item) => item.label)]));

    assert.deepEqual(labels(billingsuiteBasic), {
      Sales: ['Customer Management', 'Estimation / Quotation', 'Sales Order Processing', 'Delivery Notes'],
      Purchase: ['Vendor Management', 'Purchase Requisition', 'Purchase Orders', 'GRN / Goods Receipt'],
      Inventory: ['Items', 'Real Time Stock Tracking'],
      Accounting: [
        'Proforma Invoices',
        'Sales Invoices',
        'Purchase Invoices',
        'Payment – Receivable',
        'Payment – Payable',
      ],
    });
    assert.deepEqual(labels(billingsuiteProfessional), {
      Sales: ['Customer Management', 'Estimation / Quotation', 'Sales Order Processing', 'Delivery Notes', 'Sales Tracker'],
      Purchase: ['Vendor Management', 'Purchase Requisition', 'Purchase Orders', 'GRN / Goods Receipt', 'Purchase Tracker'],
      Inventory: ['Items', 'Real Time Stock Tracking', 'Warehouse Management', 'Stock Transfer Management'],
      Accounting: [
        'Proforma Invoices',
        'Sales Invoices',
        'Purchase Invoices',
        'Payment – Receivable',
        'Payment – Payable',
      ],
    });
  });

  test('every verified module detail named on the cards is a shipped app name', () => {
    for (const p of plans) {
      for (const product of p.products) {
        for (const module of product.modules) {
          if (module.module === 'Reports') continue;
          assert.ok(SHIPPED_MODULES[module.module], `${p.id}: unknown module ${module.module}`);
          for (const detail of module.details) {
            assert.ok(
              SHIPPED_MODULES[module.module].includes(detail.label),
              `${p.id}: ${detail.label} is not under ${module.module}`,
            );
          }
        }
      }
    }
  });

  test('HRMS Reports names no report, only that reports are customised on demand', () => {
    const reports = hrmsPayroll.modules.find((module) => module.module === 'Reports');
    assert.ok(reports);
    assert.deepEqual(reports.details, []);
    assert.equal(reports.marketingDescription, 'Customised to your requirements on demand.');
  });

  test('only Enterprise opens its products in the product dialog', () => {
    assert.deepEqual(
      plans.map((p) => [p.id, p.presentation]),
      [
        ['basic', 'inline'],
        ['professional', 'inline'],
        ['enterprise', 'modal'],
      ],
    );
  });

  test('every Enterprise product has a dialog intro', () => {
    for (const product of plans[2].products) assert.ok(product.intro?.trim(), `${product.name} has no intro`);
  });

  test('SalesPro and Billingsuite describe every detail; HRMS lists names only', () => {
    for (const product of [salesPro, billingsuiteProfessional]) {
      for (const module of product.modules) {
        for (const detail of module.details) {
          assert.ok(detail.description?.trim(), `${product.name}: ${detail.label} has no description`);
        }
      }
    }
    for (const module of hrmsPayroll.modules) {
      for (const detail of module.details) assert.equal(detail.description, undefined, `${detail.label} is described`);
    }
  });

  test('the derived schedule uses shipped names, three marks per row, and lists every detail once', () => {
    const seen: string[] = [];
    for (const g of schedule) {
      assert.ok(SHIPPED_MODULES[g.group], `unknown module ${g.group}`);
      for (const r of g.rows) {
        assert.ok(SHIPPED_MODULES[g.group].includes(r.label), `${r.label} is not under ${g.group}`);
        assert.equal(r.plans.length, 3);
        seen.push(r.label);
      }
    }
    assert.equal(new Set(seen).size, seen.length);
    assert.deepEqual([...seen].sort(), [...new Set(Object.values(SHIPPED_MODULES).flat())].sort());
  });

  test('the cards agree with the comparison', () => {
    const inPlan = (i: number) =>
      new Set(schedule.flatMap((g) => g.rows.filter((r) => r.plans[i]).map((r) => r.label)));
    plans.forEach((p, i) => {
      for (const product of p.products) {
        for (const module of product.modules) {
          for (const detail of module.details) {
            assert.ok(inPlan(i).has(detail.label), `${p.id} card lists ${detail.label}, the comparison does not`);
          }
        }
      }
    });
  });

  test('no placeholder module is sold anywhere on the page', () => {
    // HRMS Reports (customised on demand, owner 2026-11-14) is not the app's
    // placeholder Report screen; drop only its name before matching.
    const text = JSON.stringify({ plans, schedule, everyPlan }).replaceAll('"module":"Reports"', '');
    for (const name of PLACEHOLDERS) assert.ok(!text.includes(name), `${name} is a placeholder`);
  });

  test('add-ons carry no rate or placeholder, only what they add', () => {
    assert.ok(addOns.length > 0);
    for (const a of addOns) {
      assert.deepEqual(Object.keys(a).sort(), ['adds', 'name']);
      assert.doesNotMatch(`${a.name} ${a.adds}`, /₹|\brate\b|to be confirmed|\btbc\b/i);
    }
  });

  test('additional licences remain a demo-led enquiry with no invented price', () => {
    assert.equal(ADDITIONAL_LICENCE_NOTICE.heading, 'Need More License or Additional User?');
    assert.equal(
      ADDITIONAL_LICENCE_NOTICE.body,
      'Each FlowX365 plan includes a defined number of user licences and product capabilities. If your business needs additional users, licences or capacity beyond what is included in your selected plan, additional licences may be required.',
    );
    assert.equal(
      `${ADDITIONAL_LICENCE_NOTICE.actionBefore} ${ADDITIONAL_LICENCE_NOTICE.actionLabel} ${ADDITIONAL_LICENCE_NOTICE.actionAfter}`,
      'Contact our team through Request a Demo to discuss your additional requirements and the suitable licensing option.',
    );
    assert.equal(ADDITIONAL_LICENCE_NOTICE.actionLabel, CTA_LABEL);
    assert.doesNotMatch(
      JSON.stringify(ADDITIONAL_LICENCE_NOTICE),
      /₹|to be confirmed|\btbc\b|buy|checkout|subscribe|subscription|activate|purchase/i,
    );
  });

  test('the 30-day free trial is offered and arranged through the demo request', () => {
    assert.equal(TRIAL_LABEL, '30-Day Free Trial');
    assert.match(TRIAL_LINE, /request a demo/i);
    const trialTerm = terms.find((t) => /trial/i.test(t.title));
    assert.ok(trialTerm, 'missing trial term');
    assert.match(trialTerm.text, /30 days/);
    assert.match(trialTerm.text, /request a demo/i);
    assert.ok(pricingFaqs.some((f) => /30-day free trial/i.test(f.q)));
  });

  test('every commercial term is stated, with no internal status or competing action', () => {
    const titles = terms.map((t) => t.title.toLowerCase()).join(' | ');
    for (const word of ['trial', 'annual', 'gst', 'plan', 'payment']) {
      assert.ok(titles.includes(word), `missing term for ${word}`);
    }
    for (const t of terms) assert.deepEqual(Object.keys(t).sort(), ['text', 'title']);
    const copy = JSON.stringify({ terms, pricingFaqs, addOns, additionalLicence: ADDITIONAL_LICENCE_NOTICE, TRIAL_LINE });
    for (const banned of [
      /\bplanned\b/i,
      /to be confirmed/i,
      /being finali[sz]ed/i,
      /not available yet/i,
      /start (your |a )?free trial/i,
      /buy now/i,
      /subscribe/i,
      /purchase plan/i,
      /activate/i,
      /contact sales/i,
    ]) {
      assert.doesNotMatch(copy, banned);
    }
  });

  test('pricing section ids never collide with homepage section ids or paths', () => {
    const taken = new Set(sections.flatMap((s) => [s.id, s.slug]));
    for (const id of PRICING_SECTION_IDS) assert.ok(!taken.has(id), `${id} collides`);
  });
});
