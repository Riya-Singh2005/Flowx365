// The product line, flagship first. `soon` marks a product not yet on sale (none at present).
export const products: { name: string; covers: string; soon?: boolean }[] = [
  {
    name: 'FlowX365',
    covers: 'All-in-one business management ERP: CRM, sales, purchase, inventory, accounts and HRMS in one connected system',
  },
  { name: 'FlowX Billingsuite', covers: 'Billing, invoicing, inventory, sales, purchase and accounts management' },
  { name: 'FlowX SalesPro', covers: 'Daily planner, CRM, lead management, customer follow-ups and sales pipeline' },
  { name: 'FlowX HRMS and Payroll', covers: 'Employee management, attendance, leave, payroll and HR operations' },
  {
    name: 'FlowX Project365',
    covers:
      'A complete project management solution for planning, budgeting, scheduling, resource allocation, execution and project tracking',
  },
  {
    name: 'FlowX BudgetPro',
    covers: 'Budget planning, expense control, financial forecasting and budget-versus-actual analysis',
  },
];
