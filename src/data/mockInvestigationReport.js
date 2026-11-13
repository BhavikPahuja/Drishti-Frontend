export const mockInvestigationReport = {
  documentId: "DOC-MOCK-784",
  title: "Operation Layered Ledger - Financial Intelligence Report.pdf",
  documentType: "application/pdf",
  caseId: "CASE-HAWALA-2026",
  narrative:
    "Financial Intelligence Report dated 15 August 2026. Global Apex Trading Ltd, directed by Vikas Verma, received an anomalous INR 9,500,000 deposit into account ACC-44102. Within 24 hours, INR 7,200,000 was transferred to offshore settlement account ACC-99812 held by Northstar Exports FZE. The offshore funds were split into smaller transfers to ACC-77631, controlled by Priya Malhotra. CCTV and telecom records place Priya Malhotra and courier Rohit Sharma at the Sector 17 collection point. Sandeep Kumar used vehicle PB10AB1234 to move sealed invoices and cash between Safehouse B-42 and the collection point. Invoice Batch 784 shows inflated electronic component values and is attached as evidence in the case.",
  nlpResult: {
    entities: {
      persons: [
        "Vikas Verma",
        "Priya Malhotra",
        "Rohit Sharma",
        "Sandeep Kumar",
      ],
      organizations: ["Global Apex Trading Ltd", "Northstar Exports FZE"],
      accounts: ["ACC-44102", "ACC-99812", "ACC-77631"],
      phones: ["+91 9899001122", "+91 9800112233", "+91 9876543210"],
      vehicles: ["PB10AB1234"],
      locations: ["Sector 17 collection point", "Safehouse B-42"],
      documents: ["Invoice Batch 784"],
    },
    relationships: [
      { sourceId: "P-101", relation: "DIRECTOR_OF", targetId: "ORG-201" },
      { sourceId: "ORG-201", relation: "OWNS_ACCOUNT", targetId: "ACC-44102" },
      {
        sourceId: "ACC-44102",
        relation: "TRANSFERRED_MONEY",
        targetId: "ACC-99812",
      },
      {
        sourceId: "ACC-99812",
        relation: "TRANSFERRED_MONEY",
        targetId: "ACC-77631",
      },
      {
        sourceId: "P-102",
        relation: "CONTROLS_ACCOUNT",
        targetId: "ACC-77631",
      },
      { sourceId: "P-102", relation: "DIRECTED", targetId: "P-103" },
      { sourceId: "P-103", relation: "USES", targetId: "VEH-301" },
      { sourceId: "VEH-301", relation: "VISITED", targetId: "LOC-17" },
      {
        sourceId: "DOC-784",
        relation: "EVIDENCE_IN",
        targetId: "CASE-HAWALA-2026",
      },
    ],
  },
};

export const mockUploadedFile = {
  id: mockInvestigationReport.documentId,
  name: mockInvestigationReport.title,
  size: 184320,
  uploadedAt: "2026-08-15T10:30:00.000Z",
  status: "Completed",
  type: mockInvestigationReport.documentType,
};
