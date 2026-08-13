"use client";

import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// We'll use a simple node layout for the Flostat Architecture
const initialNodes = [
  { 
    id: '1', 
    position: { x: 250, y: 50 }, 
    data: { label: 'React.js Client (Next.js)' },
    style: { background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', padding: '15px' }
  },
  { 
    id: '2', 
    position: { x: 250, y: 150 }, 
    data: { label: 'AWS API Gateway' },
    style: { background: '#ff9900', color: 'black', border: 'none', borderRadius: '8px', padding: '15px' }
  },
  { 
    id: '3', 
    position: { x: 100, y: 250 }, 
    data: { label: 'Node.js Microservice' },
    style: { background: '#68a063', color: 'white', border: 'none', borderRadius: '8px', padding: '15px' }
  },
  { 
    id: '4', 
    position: { x: 400, y: 250 }, 
    data: { label: 'Python Data Service' },
    style: { background: '#3776ab', color: 'white', border: 'none', borderRadius: '8px', padding: '15px' }
  },
  { 
    id: '5', 
    position: { x: 250, y: 350 }, 
    data: { label: 'AWS DynamoDB' },
    style: { background: '#ff9900', color: 'black', border: 'none', borderRadius: '8px', padding: '15px' }
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
  { id: 'e3-5', source: '3', target: '5', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
];

export default function ArchitectureDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // When a user clicks a node, we could show a tooltip. For simplicity, we use an alert here, 
  // but in a production app you'd set state for a custom tooltip overlay.
  const onNodeClick = useCallback((event, node) => {
    let explanation = "";
    switch(node.id) {
        case '1': explanation = "Next.js was chosen for SSR, SEO, and fast initial page loads."; break;
        case '2': explanation = "API Gateway routes traffic to the appropriate microservices and handles rate limiting."; break;
        case '3': explanation = "Node.js handles real-time data streaming and WebSockets for the dashboard."; break;
        case '4': explanation = "Python handles complex data aggregation and Chart.js data formatting."; break;
        case '5': explanation = "DynamoDB provides fast, highly scalable NoSQL storage for time-series flow data."; break;
        default: explanation = "Component of the Flostat architecture.";
    }
    alert(`Why ${node.data.label}?\n\n${explanation}`);
  }, []);

  return (
    <div style={{ width: '100%', height: '500px', background: '#0a0a0a' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
        colorMode="dark"
      >
        <Controls />
        <MiniMap nodeColor={(n) => n.style?.background || '#fff'} />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
