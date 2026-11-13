import React, { useEffect, useRef, useState } from "react";
import { DataSet } from "vis-data";
import { Network } from "vis-network";
import { fetchDashboardGraphReal } from "../api/real/realInvestigationApi.js";

function graphColor(type) {
  const colors = {
    PERSON: "#7d1f3b",
    PHONE: "#176b87",
    ACCOUNT: "#9b5b13",
    BANK_ACCOUNT: "#9b5b13",
    VEHICLE: "#26734d",
    LOCATION: "#a23b3b",
  };
  return colors[String(type || "").toUpperCase()] || "#56616b";
}

function normalizeGraph(response) {
  const nodes = (response?.nodes || []).map((node) => node.data || node);
  const edges = (response?.edges || []).map((edge) => edge.data || edge);

  return {
    nodes: nodes
      .map((node) => ({
        id: node.id || node.entityId,
        label: node.label || node.name || node.id || node.entityId,
        group: node.type || node.entityType || "ENTITY",
        color: {
          background: graphColor(node.type || node.entityType),
          border: "#292625",
          highlight: { background: "#e4b45c", border: "#292625" },
        },
        font: { color: "#292625", size: 14, face: "IBM Plex Sans" },
        borderWidth: 2,
        shape: "dot",
        size: node.type === "PERSON" ? 25 : 18,
      }))
      .filter((node) => node.id),
    edges: edges
      .map((edge, index) => ({
        id: edge.id || `edge-${index}`,
        from: edge.source || edge.sourceId,
        to: edge.target || edge.targetId,
        label: edge.relationship || edge.relation || "CONNECTED",
        arrows: "to",
        color: { color: "#8e8176", highlight: "#7d1f3b" },
        font: { color: "#756e69", size: 11, align: "middle" },
        smooth: { type: "dynamic" },
      }))
      .filter((edge) => edge.from && edge.to),
  };
}

export default function DashboardGraph({ onGraphLoaded }) {
  const containerRef = useRef(null);
  const networkRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [graph, setGraph] = useState({ nodes: [], edges: [] });

  const loadGraph = async () => {
    setStatus("loading");
    setError("");
    try {
      const response = await fetchDashboardGraphReal();
      const nextGraph = normalizeGraph(response);
      setGraph(nextGraph);
      onGraphLoaded?.({
        entities: nextGraph.nodes,
        relationships: nextGraph.edges,
      });
      setStatus("ready");
    } catch (requestError) {
      setError(
        requestError.message ||
          "The backend graph endpoint returned no usable response.",
      );
      setStatus("error");
    }
  };

  useEffect(() => {
    loadGraph();
  }, []);

  useEffect(() => {
    if (status !== "ready" || !containerRef.current) return undefined;
    networkRef.current?.destroy();
    networkRef.current = new Network(
      containerRef.current,
      {
        nodes: new DataSet(graph.nodes),
        edges: new DataSet(graph.edges),
      },
      {
        autoResize: true,
        physics: { enabled: true, stabilization: { iterations: 120 } },
        interaction: { hover: true, navigationButtons: true, keyboard: true },
        layout: { improvedLayout: true },
      },
    );
    networkRef.current.fit({ animation: false });

    return () => {
      networkRef.current?.destroy();
      networkRef.current = null;
    };
  }, [graph, status]);

  return (
    <section className="relative h-[calc(100vh-3.5rem)] min-h-155 bg-[#fffdf8] border border-[#d9d0c4]">
      <div className="absolute left-3 top-3 z-10 flex items-center gap-2 bg-[#fffdf8]/95 border border-[#d9d0c4] px-3 py-2 text-[11px] font-['Space_Grotesk'] uppercase tracking-wider text-[#6f1d32]">
        <span className="h-2 w-2 rounded-full bg-[#2e7d32]" />
        Backend relationship graph
        {status === "ready" &&
          ` - ${graph.nodes.length} nodes / ${graph.edges.length} relations`}
      </div>
      {status === "loading" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#fffdf8] text-[#756e69]">
          <span className="material-symbols-outlined animate-spin text-3xl text-[#7d1f3b]">
            progress_activity
          </span>
          <span className="text-xs uppercase tracking-wider">
            Loading graph from backend
          </span>
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#fffdf8] text-center">
          <span className="text-sm font-bold uppercase text-[#b3261e]">
            Graph unavailable
          </span>
          <span className="max-w-md text-xs text-[#756e69]">{error}</span>
          <button
            type="button"
            onClick={loadGraph}
            className="bg-[#7d1f3b] px-4 py-2 text-xs font-bold uppercase text-white"
          >
            Retry graph
          </button>
        </div>
      )}
      <div ref={containerRef} className="h-full w-full" />
    </section>
  );
}
