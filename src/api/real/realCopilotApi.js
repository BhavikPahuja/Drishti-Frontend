// Real AI Agent Copilot API Handler
// Communicates with Spring Boot's internal agent facade.

import { apiClient } from "../client.js";

export async function queryAgentInvestigateReal(query, options = {}) {
  const sessionId =
    options.sessionId || options.session_id || `SESSION_${Date.now()}`;
  const caseId = options.caseId || options.case_id || "";

  return await apiClient("/internal/agent/investigate", {
    method: "POST",
    body: {
      sessionId,
      caseId,
      query,
    },
  });
}
