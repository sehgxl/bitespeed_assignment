import { message } from "antd";
import { useCallback, useMemo, useState } from "react";

import ReactFlow, {
  Controls,
  Background,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Edge,
  BackgroundVariant,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Node,
} from "reactflow";

import "reactflow/dist/style.css";

import Navbar from "./components/navbar";
import NodesSidePanel from "./components/nodes-side-panel";
import MessageNode from "./components/message-node";

type newNodeType = {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    label: string | React.FC;
  };
};

function App() {
  const nodeTypes = useMemo(() => ({ messageNode: MessageNode }), []);
  const [messageApi, contextHolder] = message.useMessage();

  const initialFlowData: [Node[], Edge[]] = useMemo(() => {
    let nodes: Node[] | string | null = localStorage.getItem("nodes");
    let edges: Edge[] | string | null = localStorage.getItem("edges");

    if (nodes) {
      nodes = JSON.parse(nodes);
    } else {
      nodes = [];
    }
    if (edges) {
      edges = JSON.parse(edges);
    } else {
      edges = [];
    }

    return [nodes as Node[], edges as Edge[]];
  }, []);

  const initialNodes = initialFlowData[0];
  const initialEdges = initialFlowData[1];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        const isNodePresent = eds.some((ed) => {
          return ed.source === params.source;
        });

        if (isNodePresent) {
          return eds;
        } else {
          return addEdge(params, eds);
        }
      });
    },
    [setEdges]
  );

  const handleNodeDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const nodeType = e.dataTransfer.getData("text/plain");

    setNodes((prev) => {
      const nodesCount = prev.length;
      const id = "" + (nodesCount + 1);
      const positionX = e.clientX - 104;
      const positionY = e.clientY - 48;

      const newNode: newNodeType = {
        id: id,
        type: nodeType,
        position: { x: positionX, y: positionY },
        data: { label: "" },
      };
      return [...prev, newNode];
    });
  };

  //This function is required to make handleNodeDrop work
  const handleReactFlowDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    return;
  };

  return (
    <>
      {contextHolder}
      <section className="h-screen w-screen bg-gray-50 flex flex-col">
        <Navbar edges={edges} messageApi={messageApi} nodes={nodes} />
        <section className="flex h-full">
          <ReactFlow
            id="react-flow"
            onDragOver={handleReactFlowDragOver}
            onDrop={handleNodeDrop}
            className="w-2/3"
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
          >
            <Controls />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>

          <NodesSidePanel />
        </section>
      </section>
    </>
  );
}

export default App;
