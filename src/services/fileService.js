// File Management Service Abstraction
import {
  fetchRecentFiles,
  uploadFileMock,
  deleteFileMock,
} from "../api/mock/mockFileApi.js";
import { mockInvestigationReport } from "../data/mockInvestigationReport.js";

export async function getRecentFiles(caseId) {
  return fetchRecentFiles(caseId);
}

export async function uploadFile(file, onProgress, options = {}) {
  const res = await uploadFileMock(file, onProgress);
  return {
    id: res.id,
    name: res.name,
    size: res.size,
    uploadedAt: res.uploadedAt,
    status: res.status,
    type: res.type,
    nlpResult: mockInvestigationReport.nlpResult,
    caseId: options.caseId || mockInvestigationReport.caseId,
    rawResponse: res,
  };
}

export async function deleteFile(fileId) {
  return deleteFileMock(fileId);
}
