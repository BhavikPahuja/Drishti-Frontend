import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardPage from "./components/DashboardPage";
import FileIngestionPage from "./components/FileIngestionPage";
import TimelinePage from "./components/TimelinePage";
import AICopilotPage from "./components/AICopilotPage";
import HandwrittenDocumentScanner from "./components/HandwrittenDocumentScanner";
import TopSuspectsPage from "./components/TopSuspectsPage";
import SettingsPage from "./components/SettingsPage";

import { registerUploadedNlpResult } from "./services/investigationService";

export default function App() {
  // Navigation State for the 5 Stitch Pages: 'dashboard' | 'file-ingestion' | 'timeline' | 'ai-copilot' | 'settings'
  const [activeTab, setActiveTab] = useState("dashboard");
  const [investigationData, setInvestigationData] = useState({
    entities: [],
    relationships: [],
    events: [],
  });
  const [aiTargetQuery, setAiTargetQuery] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastDataRefresh, setLastDataRefresh] = useState(() => Date.now());

  // Handler: Navigate from Dashboard "Know More with AI" to AI Copilot page with entity context
  const handleSelectTargetForAI = (entity) => {
    setAiTargetQuery(entity);
    setActiveTab("ai-copilot");
  };

  // Handler: Navigate from Top Suspects leaderboard to AI Copilot page
  const handleInvestigateSuspect = (suspect) => {
    setAiTargetQuery({
      name: suspect.name,
      id: suspect.person_id,
    });
    setActiveTab("ai-copilot");
  };

  // Handler: Handle real-time file upload success to sync NLP extractions to graph
  const handleUploadSuccess = async (uploadRes) => {
    if (uploadRes?.nlpResult) {
      registerUploadedNlpResult(uploadRes.caseId, uploadRes.nlpResult);
    }
    setLastDataRefresh(Date.now());
  };

  return (
    <div className="bg-[#0f150f] min-h-screen text-[#dee4da] font-['IBM_Plex_Sans'] antialiased selection:bg-[#354234] selection:text-[#dee4da]">
      {/* Fixed Left Sidebar (Stitch Design) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Layout Area */}
      <div className="pl-64 flex flex-col min-h-screen">
        {/* Fixed Top Header (Stitch Design with Real Case Switcher & Search) */}
        <Header
          entityCount={investigationData.entities.length}
          relationshipCount={investigationData.relationships.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Main Content Area switching between the 5 Stitch Pages */}
        <main className="relative pt-14 bg-[#0f150f] flex-1 w-full">
          {activeTab === "dashboard" && (
            <DashboardPage
              searchQuery={searchQuery}
              onSelectTargetForAI={handleSelectTargetForAI}
              lastDataRefresh={lastDataRefresh}
              activeCaseId="CASE-HAWALA-2026"
              onGraphLoaded={(data) => setInvestigationData(data)}
            />
          )}

          {activeTab === "top-suspects" && (
            <TopSuspectsPage
              activeCaseId={undefined}
              onInvestigateSuspect={handleInvestigateSuspect}
            />
          )}

          {activeTab === "file-ingestion" && (
            <FileIngestionPage
              activeCase={null}
              onUploadSuccess={handleUploadSuccess}
              onNavigateToDashboard={() => setActiveTab("dashboard")}
            />
          )}

          {activeTab === "ocr-ingestion" && (
            <HandwrittenDocumentScanner
              activeCaseId=""
              onOpenInCopilot={(prompt) => {
                setAiTargetQuery({ name: prompt, id: "OCR_EVIDENCE" });
                setActiveTab("ai-copilot");
              }}
            />
          )}

          {activeTab === "timeline" && <TimelinePage />}

          {activeTab === "ai-copilot" && (
            <AICopilotPage
              targetEntity={aiTargetQuery}
              activeCaseId={undefined}
            />
          )}

          {activeTab === "settings" && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}
