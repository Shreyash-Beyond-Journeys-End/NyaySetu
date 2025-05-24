export const legalCategories = {
  domesticViolence: {
    title: 'Domestic Violence',
    acts: ['Protection of Women from Domestic Violence Act, 2005'],
    helplines: ['1091', '181'],
    procedures: [
      'File complaint at nearest magistrate court',
      'Contact local police station',
      'Seek protection order',
      'Apply for monetary relief'
    ]
  },
  laborRights: {
    title: 'Labor Rights',
    acts: ['Minimum Wages Act, 1948', 'Contract Labour Act, 1970'],
    helplines: ['1800-11-8888'],
    procedures: [
      'File complaint with Labour Commissioner',
      'Approach industrial tribunal',
      'Maintain work hour records',
      'Collect salary slips as evidence'
    ]
  },
  consumerRights: {
    title: 'Consumer Rights',
    acts: ['Consumer Protection Act, 2019'],
    helplines: ['1800-11-4000'],
    procedures: [
      'File complaint within 2 years',
      'Gather purchase receipts',
      'Document the defect/issue',
      'Approach consumer forum'
    ]
  }
};

export const emergencyContacts = [
  { name: 'Police', number: '100', type: 'emergency' },
  { name: 'Women Helpline', number: '1091', type: 'support' },
  { name: 'Child Helpline', number: '1098', type: 'support' },
  { name: 'Senior Citizen Helpline', number: '1091', type: 'support' },
  { name: 'Legal Aid Services', number: '15100', type: 'legal' }
];

export const legalDocumentTemplates = [
  {
    name: 'Domestic Violence Complaint',
    category: 'domesticViolence',
    language: ['en', 'hi', 'mr'],
    fields: ['complainant_name', 'respondent_name', 'incident_details', 'relief_sought']
  },
  {
    name: 'Labor Complaint',
    category: 'laborRights',
    language: ['en', 'hi', 'mr'],
    fields: ['employee_name', 'employer_name', 'violation_details', 'compensation_sought']
  },
  {
    name: 'Consumer Complaint',
    category: 'consumerRights',
    language: ['en', 'hi', 'mr'],
    fields: ['consumer_name', 'seller_name', 'product_details', 'issue_description']
  }
];
