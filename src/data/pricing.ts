// The /pricing rate card. One source for every figure and claim on that page.
//
// Prices and included users are the owner's rates (2026-11-11), exclusive of
// GST. Module and submodule names are the FlowX365 app's own sidebar names
// (app/lib/shared/widgets/sidebar.dart); only items with working screens are
// listed (items routed to a PlaceholderScreen in app/lib/app/router.dart are
// left off). Which plan includes which module is final (owner, 2026-11-13).
// The FlowX HRMS and Payroll module list was supplied and confirmed live by
// the owner (2026-11-14) and is shown by name only, without descriptions.
// See PRICING.md.

/** The bill-book copy colour a sheet is tinted with. Never rendered as text. */
export type Copy = 'original' | 'duplicate' | 'triplicate';

/** One named capability shown inside an expandable app module. */
export interface ModuleDetail {
  label: string;
  /** Used only where the verified app terminology needs a short explanation. */
  description?: string;
}

/** An official app module and the details listed under it. */
export interface ModuleGroup {
  id: string;
  module: string;
  details: ModuleDetail[];
  /** High-level marketing copy when no verified submodule names are available. */
  marketingDescription?: string;
}

/** A FlowX365 product and the app modules included with it. */
export interface ProductGroup {
  id: string;
  name: string;
  /** One factual line, shown as the lede of the product dialog. */
  intro?: string;
  modules: ModuleGroup[];
}

export interface Plan {
  id: 'basic' | 'professional' | 'enterprise';
  name: string;
  copy: Copy;
  /** Monthly price in rupees, excluding GST. */
  monthly: number;
  /** Annual price in rupees, excluding GST. A yearly total, not a monthly figure. */
  annual: number;
  /** Users included in the plan. */
  users: number;
  usersLabel: string;
  /** Companies included in the plan. */
  companies: number;
  companiesLabel: string;
  audience: string;
  positioning: string;
  /** Products and their complete module hierarchy for this plan. */
  products: ProductGroup[];
  /**
   * How the card shows its products: `inline` lists every module as an
   * accordion; `modal` shows one row per product that opens the product dialog.
   */
  presentation: 'inline' | 'modal';
  recommended?: boolean;
}

export const CTA_LABEL = 'Request a Demo';

export const PRICE_PERIOD_LABELS = {
  monthly: 'per month',
  annual: 'per year',
} as const;

export const GST_LINE = 'Prices exclude GST';

const named = (...labels: string[]): ModuleDetail[] => labels.map((label) => ({ label }));

// Descriptions below are written from the FlowX365 app's own screens
// (app/lib/features/{sales,purchase,inventory,accounting,planner,crm}). They are
// shown in the Enterprise product dialog only; the Basic and Professional
// accordions list names alone.

const basicSales: ModuleGroup = {
  id: 'sales',
  module: 'Sales',
  details: [
    {
      label: 'Customer Management',
      description: 'Keep every customer and their branch offices on one record, ready to use on sales documents.',
    },
    {
      label: 'Estimation / Quotation',
      description: 'Build quotations for customers and track each one from draft to sent to converted.',
    },
    {
      label: 'Sales Order Processing',
      description: 'Turn a sent quotation into a sales order, so the order carries the quoted lines forward.',
    },
    {
      label: 'Delivery Notes',
      description: 'Record what leaves for the customer; stock is reserved and issued as the note moves on.',
    },
  ],
};

const professionalSales: ModuleGroup = {
  ...basicSales,
  details: [
    ...basicSales.details,
    {
      label: 'Sales Tracker',
      description: 'One dashboard of quotations and orders, with figures and charts for you or the whole team.',
    },
  ],
};

const basicPurchase: ModuleGroup = {
  id: 'purchase',
  module: 'Purchase',
  details: [
    { label: 'Vendor Management', description: 'Keep the vendors you buy from in one searchable list.' },
    {
      label: 'Purchase Requisition',
      description: 'Raise a request to buy, submit it for approval, then convert it to a purchase order.',
    },
    {
      label: 'Purchase Orders',
      description: 'Place orders with vendors and convert them to purchase invoices when the bill arrives.',
    },
    {
      label: 'GRN / Goods Receipt',
      description: 'Receive goods against an approved order; what you receive is added to stock.',
    },
  ],
};

const professionalPurchase: ModuleGroup = {
  ...basicPurchase,
  details: [
    ...basicPurchase.details,
    {
      label: 'Purchase Tracker',
      description: 'One dashboard of requisitions, orders and receipts, for you or the whole team.',
    },
  ],
};

const basicInventory: ModuleGroup = {
  id: 'inventory',
  module: 'Inventory',
  details: [
    { label: 'Items', description: 'Your catalogue of products and other items, sorted by type and category.' },
    {
      label: 'Real Time Stock Tracking',
      description: 'See what is on hand for every item, across warehouses, read straight from stock movements.',
    },
  ],
};

const professionalInventory: ModuleGroup = {
  ...basicInventory,
  details: [
    ...basicInventory.details,
    { label: 'Warehouse Management', description: 'Set up the places you hold stock and see what each one holds.' },
    {
      label: 'Stock Transfer Management',
      description: 'Request a move of stock between warehouses; it moves once the transfer is approved.',
    },
  ],
};

const accounting: ModuleGroup = {
  id: 'accounting',
  module: 'Accounting',
  details: [
    { label: 'Proforma Invoices', description: 'Send a customer a proforma before the final invoice.' },
    {
      label: 'Sales Invoices',
      description: 'Bill customers, converting from the sales order so nothing is keyed in twice.',
    },
    {
      label: 'Purchase Invoices',
      description: 'Record vendor bills against purchase orders, with the vendor’s own invoice number.',
    },
    {
      label: 'Payment – Receivable',
      description: 'Follow money coming in, from invoices and advances, with received and balance figures.',
    },
    {
      label: 'Payment – Payable',
      description: 'Follow what you owe vendors, from bills and advances, until it is fully paid.',
    },
  ],
};

export const billingsuiteBasic: ProductGroup = {
  id: 'billingsuite',
  name: 'FlowX Billingsuite',
  intro: 'Sales, purchase, stock and accounts as one chain of documents, each made from the one before it.',
  modules: [basicSales, basicPurchase, basicInventory, accounting],
};

export const billingsuiteProfessional: ProductGroup = {
  ...billingsuiteBasic,
  modules: [professionalSales, professionalPurchase, professionalInventory, accounting],
};

export const salesPro: ProductGroup = {
  id: 'salespro',
  name: 'FlowX SalesPro',
  intro: 'Plan the team’s day and take every lead from first contact to a won deal.',
  modules: [
    {
      id: 'planner',
      module: 'Planner',
      details: [
        {
          label: 'Task Planner',
          description: 'Plan activities by day, week or month, for yourself or, as an admin, for the team.',
        },
        {
          label: 'Team Availability',
          description: 'See who is doing what, when and where today, so you know who is free.',
        },
      ],
    },
    {
      id: 'crm',
      module: 'CRM',
      details: [
        {
          label: 'Lead Management',
          description: 'Capture leads for new prospects, existing customers or a customer’s new branch.',
        },
        {
          label: 'Lead Approval',
          description: 'Admins approve or reject submitted leads; approved leads move into the pipeline.',
        },
        {
          label: 'Sales Pipeline',
          description: 'A board of open opportunities with quoted value, orders and the latest activity on each.',
        },
        {
          label: 'Sales Target & Performance',
          description: 'Set targets by financial year and compare performance for each person or the team.',
        },
      ],
    },
  ],
};

export const hrmsPayroll: ProductGroup = {
  id: 'hrms-payroll',
  name: 'FlowX HRMS and Payroll',
  intro: 'Your people, from joining to exit, and the payroll that goes with them.',
  // Module list supplied and confirmed live by the owner (2026-11-14).
  modules: [
    {
      id: 'employee-management',
      module: 'Employee Management',
      details: named(
        'Employee Directory',
        'Onboarding – Employee Creation',
        'Attendance',
        'Leave Management',
        'Performance',
        'Training & Development',
        'Employee Exit Form',
        'Tax Declaration Form',
      ),
    },
    {
      id: 'payroll-management',
      module: 'Payroll Management',
      details: named(
        'Payroll',
        'Pay Slip',
        'Offer Letter',
        'Increment Letter',
        'Tax Management',
        'Reimbursements',
        'Loan & Advances',
        'Employee Exit Clearance',
      ),
    },
    {
      id: 'reports',
      module: 'Reports',
      details: [],
      marketingDescription: 'Customised to your requirements on demand.',
    },
    {
      id: 'hrms-payroll-master',
      module: 'HRMS & Payroll Master',
      details: named(
        'Holiday Master',
        'Employee ID Generate Master',
        'Department Master',
        'Location Master',
        'Shift Master',
        'Relieving Letter',
      ),
    },
  ],
};

export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    copy: 'original',
    monthly: 250,
    annual: 2499,
    users: 1,
    usersLabel: '1 User',
    companies: 1,
    companiesLabel: '1 Company',
    audience: 'For small businesses and startups',
    positioning: 'Run sales, purchase, stock and billing in one place.',
    products: [billingsuiteBasic],
    presentation: 'inline',
  },
  {
    id: 'professional',
    name: 'Professional',
    copy: 'original',
    monthly: 499,
    annual: 4999,
    users: 5,
    usersLabel: 'Up to 5 Users',
    companies: 3,
    companiesLabel: 'Up to 3 Companies',
    audience: 'For growing businesses',
    positioning: 'Leads, plans and several warehouses for a growing team.',
    products: [salesPro, billingsuiteProfessional],
    presentation: 'inline',
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    copy: 'original',
    monthly: 999,
    annual: 9999,
    users: 10,
    usersLabel: 'Up to 10 Users',
    companies: 5,
    companiesLabel: 'Up to 5 Companies',
    audience: 'For larger, multi-company businesses',
    positioning: 'People, attendance and several companies under one login.',
    products: [hrmsPayroll, salesPro, billingsuiteProfessional],
    presentation: 'modal',
  },
];

const rupees = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

/** ₹2,499: Indian digit grouping, no decimals. */
export function formatPrice(amount: number): string {
  return `₹${rupees.format(amount)}`;
}

// ── Module comparison ───────────────────────────────────────────────────────
// Groups are official app modules; rows are their submodules. `true` means
// the plan includes it under the proposed mapping; `false` means it does not.

export interface ScheduleRow {
  label: string;
  /** A short gloss, when the sidebar name alone would not say enough. */
  note?: string;
  plans: [basic: boolean, professional: boolean, enterprise: boolean];
}

/**
 * A derived capability schedule retained for tests and future comparisons.
 * Product definitions above remain the only manually maintained source.
 */
export const schedule: { group: string; rows: ScheduleRow[] }[] = (() => {
  const groups = new Map<string, Map<string, ScheduleRow['plans']>>();

  plans.forEach((plan, planIndex) => {
    for (const product of plan.products) {
      for (const module of product.modules) {
        for (const detail of module.details) {
          if (!groups.has(module.module)) groups.set(module.module, new Map());
          const rows = groups.get(module.module)!;
          if (!rows.has(detail.label)) rows.set(detail.label, [false, false, false]);
          rows.get(detail.label)![planIndex] = true;
        }
      }
    }
  });

  return [...groups].map(([group, rows]) => ({
    group,
    rows: [...rows].map(([label, included]) => ({ label, plans: included })),
  }));
})();

/** In every plan alike, so printed once under the comparison. */
export const everyPlan = [
  'Dashboard',
  'Document Series',
  'PDF Settings with three PDF designs',
  'Excel and CSV export',
  'web browser and Android',
  'a dedicated database for your business',
];

// ── Add-ons and additional capacity ─────────────────────────────────────────
// Possible extensions, discussed through a demo request. Not sold online and
// never priced on the page.

export const addOns: { name: string; adds: string }[] = [
  { name: 'Additional users', adds: 'More people signing in.' },
  { name: 'Additional warehouses', adds: 'More places to hold stock.' },
  { name: 'Additional companies', adds: 'More companies under one login.' },
  { name: 'Optional modules', adds: 'Other FlowX products, such as Project365 or BudgetPro.' },
  { name: 'Additional capacity', adds: 'Room for higher volumes.' },
];

export const ADDITIONAL_LICENCE_NOTICE = {
  heading: 'Need More License or Additional User?',
  body: 'Each FlowX365 plan includes a defined number of user licences and product capabilities. If your business needs additional users, licences or capacity beyond what is included in your selected plan, additional licences may be required.',
  actionBefore: 'Contact our team through',
  actionLabel: CTA_LABEL,
  actionAfter: 'to discuss your additional requirements and the suitable licensing option.',
} as const;

// ── 30-day free trial ───────────────────────────────────────────────────────
// Offered to customers and arranged by the team after a demo request. There is
// no self-service sign-up or automatic activation, so the page never says so.

export const TRIAL_LABEL = '30-Day Free Trial';

export const TRIAL_LINE = 'Ask for it when you request a demo.';

// ── Terms ───────────────────────────────────────────────────────────────────
// How billing works today, in customer language. No internal status labels.

export const terms: { title: string; text: string }[] = [
  {
    title: '30-day free trial',
    text: 'Try FlowX365 free for 30 days. Request a demo and our team will set up your trial.',
  },
  {
    title: 'Monthly and annual billing',
    text: 'Pay by the month or once a year, at the rates shown above.',
  },
  {
    title: 'GST on these prices',
    text: 'Prices exclude GST, which is added to your bill.',
  },
  {
    title: 'Changing plans',
    text: 'Need a different plan? Tell us when you request a demo and our team will help.',
  },
  {
    title: 'Payment and renewal',
    text: 'Arranged with our team. There is no online checkout or automatic renewal.',
  },
  {
    title: 'Custom Enterprise arrangements',
    text: 'Needs beyond Enterprise? Tell us when you request a demo.',
  },
];

// ── Why FlowX365 ────────────────────────────────────────────────────────────
// `section` is a homepage section id (src/data/sections.ts) that tells more.

export const reasons: { title: string; text: string; section: string; link: string }[] = [
  {
    title: 'One chain of documents',
    text: 'Each document is made from the one before it.',
    section: 'chain',
    link: 'How it works',
  },
  {
    title: 'Documents ready for GST',
    text: 'HSN, CGST/SGST or IGST, boxed statutory invoices.',
    section: 'details',
    link: 'Details',
  },
  {
    title: 'Stock that follows paperwork',
    text: 'Receipts add stock; deliveries reserve it.',
    section: 'stock',
    link: 'Purchase and stock',
  },
  {
    title: 'Your own database',
    text: 'A dedicated database, isolated from other customers.',
    section: 'what',
    link: 'What it is',
  },
  {
    title: 'On the web and Android',
    text: 'At the desk or in the field.',
    section: 'day',
    link: 'A day',
  },
];

// ── Questions ───────────────────────────────────────────────────────────────

export const pricingFaqs: { q: string; a: string }[] = [
  {
    q: 'Which plan should my business choose?',
    a: 'Basic for one person using FlowX Billingsuite; Professional for a team of up to five using FlowX SalesPro and the expanded Billingsuite; Enterprise for up to ten users with FlowX HRMS and Payroll, SalesPro and Billingsuite. Unsure? Request a demo and we will suggest a fit.',
  },
  {
    q: 'What is included in each plan?',
    a: 'Each plan card groups its modules and details under the FlowX365 products included in that plan; on Enterprise, select a product to see its modules. Every plan also includes the Dashboard, Document Series, PDF Settings, Excel and CSV export, and a dedicated database.',
  },
  {
    q: 'Is there a 30-day free trial?',
    a: 'Yes. Request a demo and our team will arrange your 30-day free trial.',
  },
  {
    q: 'What does annual billing cost?',
    a: 'Basic is ₹2,499 a year, Professional ₹4,999 and Enterprise ₹9,999, each paid once a year. Monthly billing is ₹250, ₹499 and ₹999 a month.',
  },
  {
    q: 'Are the displayed prices inclusive of GST?',
    a: 'No. Prices exclude GST, which is added to your bill.',
  },
  {
    q: 'Can I add more users?',
    a: 'Basic includes 1 user, Professional up to 5 and Enterprise up to 10. Need more? Tell us when you request a demo and we will discuss the options.',
  },
  {
    q: 'Can I add other modules?',
    a: 'Other FlowX products, such as Project365 or BudgetPro, can be discussed when you request a demo.',
  },
  {
    q: 'Can I request a customized Enterprise plan?',
    a: 'Yes. Tell us what you need through the demo form; we can also build custom software.',
  },
  {
    q: 'How can I request a product demonstration?',
    a: 'Use Request a Demo on any plan, or Get in touch at the top of the page.',
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Tell us when you request a demo and our team will help you move to the plan that fits.',
  },
];

/** Section ids on /pricing. They must not reuse homepage section ids. */
export const PRICING_SECTION_IDS = ['plans', 'add-ons', 'terms', 'why', 'pricing-faq'] as const;
