// Curated frontend fallback graph used when the backend is unavailable.

export const hardcodedInvestigationGraph = {
  entities: [
    {
      id: "CASE-HAWALA-2026",
      type: "CASE",
      name: "Operation Layered Ledger",
      confidence: 0.99,
      status: "Active Investigation",
      details:
        "Multi-state hawala and trade-based money laundering investigation.",
    },
    {
      id: "P-101",
      type: "PERSON",
      name: "Vikas Verma",
      confidence: 0.96,
      role: "Financial Handler",
      status: "Under Investigation",
      phone: "+91 9899001122",
      details:
        "Director of Global Apex Trading and authoriser of suspicious wire transfers.",
    },
    {
      id: "P-102",
      type: "PERSON",
      name: "Priya Malhotra",
      confidence: 0.94,
      role: "Hawala Operator",
      status: "Under Surveillance",
      phone: "+91 9800112233",
      details:
        "Coordinates cash settlement through jewellery and real-estate intermediaries.",
    },
    {
      id: "P-103",
      type: "PERSON",
      name: "Rohit Sharma",
      confidence: 0.91,
      role: "Collection Courier",
      status: "Wanted",
      phone: "+91 9876543210",
      details:
        "Moves physical cash between the finance cell and regional collection points.",
    },
    {
      id: "P-104",
      type: "PERSON",
      name: "Sandeep Kumar",
      confidence: 0.88,
      role: "Logistics Coordinator",
      status: "Arrested",
      phone: "+91 9811223344",
      details:
        "Controls the cargo vehicle used to move documents and sealed consignments.",
    },
    {
      id: "ORG-201",
      type: "ORGANIZATION",
      name: "Global Apex Trading Ltd",
      confidence: 0.97,
      role: "Front Company",
      status: "Account Frozen",
      details:
        "Import-export company used to layer proceeds through inflated invoices.",
    },
    {
      id: "ORG-202",
      type: "ORGANIZATION",
      name: "Northstar Exports FZE",
      confidence: 0.89,
      role: "Offshore Counterparty",
      status: "Under Audit",
      details:
        "Overseas counterparty receiving payments disguised as equipment purchases.",
    },
    {
      id: "ACC-44102",
      type: "BANK_ACCOUNT",
      name: "ACC-44102 (Corporate Current)",
      confidence: 0.98,
      details:
        "Received an anomalous INR 9,500,000 deposit from an unrelated vendor.",
    },
    {
      id: "ACC-99812",
      type: "BANK_ACCOUNT",
      name: "ACC-99812 (Offshore Settlement)",
      confidence: 0.96,
      details:
        "Destination account for layered transfers routed through the offshore entity.",
    },
    {
      id: "ACC-77631",
      type: "BANK_ACCOUNT",
      name: "ACC-77631 (Private Account)",
      confidence: 0.93,
      details:
        "Received multiple smaller transfers before cash withdrawals in Sector 17.",
    },
    {
      id: "PH-101",
      type: "PHONE",
      name: "+91 9899001122",
      confidence: 0.95,
      details:
        "Primary phone used by the financial handler during transfer windows.",
    },
    {
      id: "VEH-301",
      type: "VEHICLE",
      name: "PB10AB1234 (Black SUV)",
      confidence: 0.9,
      details:
        "Observed near the safehouse and the Sector 17 cash collection point.",
    },
    {
      id: "LOC-17",
      type: "LOCATION",
      name: "Sector 17 Collection Point",
      confidence: 0.92,
      details: "Commercial location used for short-duration cash handovers.",
    },
    {
      id: "LOC-42",
      type: "LOCATION",
      name: "Safehouse B-42",
      confidence: 0.9,
      details:
        "Private residence used for meetings between the finance and logistics cells.",
    },
    {
      id: "DOC-784",
      type: "DOCUMENT",
      name: "Invoice Batch 784",
      confidence: 0.87,
      details:
        "Invoices show repeated overvaluation of imported electronic components.",
    },
  ],
  relationships: [
    {
      source: "P-101",
      relation: "INVESTIGATED_IN",
      target: "CASE-HAWALA-2026",
      confidence: 0.99,
    },
    {
      source: "P-102",
      relation: "INVESTIGATED_IN",
      target: "CASE-HAWALA-2026",
      confidence: 0.96,
    },
    {
      source: "P-103",
      relation: "INVESTIGATED_IN",
      target: "CASE-HAWALA-2026",
      confidence: 0.9,
    },
    {
      source: "P-104",
      relation: "INVESTIGATED_IN",
      target: "CASE-HAWALA-2026",
      confidence: 0.88,
    },
    {
      source: "P-101",
      relation: "DIRECTOR_OF",
      target: "ORG-201",
      confidence: 0.97,
    },
    {
      source: "ORG-201",
      relation: "OWNS_ACCOUNT",
      target: "ACC-44102",
      confidence: 0.98,
    },
    {
      source: "ACC-44102",
      relation: "TRANSFERRED_MONEY",
      target: "ACC-99812",
      confidence: 0.99,
    },
    {
      source: "ACC-99812",
      relation: "TRANSFERRED_MONEY",
      target: "ACC-77631",
      confidence: 0.96,
    },
    {
      source: "P-102",
      relation: "CONTROLS_ACCOUNT",
      target: "ACC-77631",
      confidence: 0.92,
    },
    {
      source: "ACC-99812",
      relation: "HELD_BY",
      target: "ORG-202",
      confidence: 0.9,
    },
    { source: "P-101", relation: "USES", target: "PH-101", confidence: 0.95 },
    {
      source: "P-101",
      relation: "CONTACTED",
      target: "P-102",
      confidence: 0.93,
    },
    {
      source: "P-102",
      relation: "DIRECTED",
      target: "P-103",
      confidence: 0.89,
    },
    { source: "P-103", relation: "USES", target: "VEH-301", confidence: 0.86 },
    {
      source: "VEH-301",
      relation: "VISITED",
      target: "LOC-17",
      confidence: 0.9,
    },
    { source: "P-101", relation: "MET_AT", target: "LOC-42", confidence: 0.87 },
    { source: "P-104", relation: "MET_AT", target: "LOC-42", confidence: 0.85 },
    {
      source: "DOC-784",
      relation: "EVIDENCE_IN",
      target: "CASE-HAWALA-2026",
      confidence: 0.94,
    },
    {
      source: "ORG-201",
      relation: "ISSUED",
      target: "DOC-784",
      confidence: 0.91,
    },
  ],
  events: [
    {
      eventId: "EV-2026-0812",
      type: "SUSPICIOUS_DEPOSIT",
      date: "2026-08-12",
      location: "ACC-44102",
      participants: ["P-101", "ORG-201"],
      description:
        "INR 9,500,000 deposited outside the company transaction pattern.",
    },
    {
      eventId: "EV-2026-0813",
      type: "WIRE_TRANSFER",
      date: "2026-08-13",
      location: "ACC-44102",
      participants: ["P-101"],
      description:
        "Funds split into offshore and private settlement accounts within 24 hours.",
    },
    {
      eventId: "EV-2026-0815",
      type: "SURVEILLANCE_SIGHTING",
      date: "2026-08-15",
      location: "LOC-17",
      participants: ["P-102", "P-103"],
      description:
        "Cash handover observed near the Sector 17 collection point.",
    },
  ],
};
