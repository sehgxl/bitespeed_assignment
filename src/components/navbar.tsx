import { Button, Typography } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { useState } from "react";
import { Edge, Node } from "reactflow";

type NavbarProps = {
  messageApi: MessageInstance;
  nodes: Node[];
  edges: Edge[];
};

const Navbar = ({ messageApi, nodes, edges }: NavbarProps) => {
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);

  const nodesLength = nodes.length;
  const edgesLength = edges.length;

  const handleSaveChanges = () => {
    setSaveButtonLoading(true);
    try {
      if (edgesLength === nodesLength - 1) {
        localStorage.setItem("nodes", JSON.stringify(nodes));
        localStorage.setItem("edges", JSON.stringify(edges));

        messageApi.open({
          type: "success",
          content: "Flow Saved",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Cannot Save Flow",
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error occurred, please try again",
      });
    } finally {
      setSaveButtonLoading(false);
    }
  };

  return (
    <nav className="bg-slate-200 p-2 flex items-center justify-between">
      <Typography.Text className="font-semibold">
        Chatbot Flow Builder
      </Typography.Text>
      <Button
        loading={saveButtonLoading}
        onClick={handleSaveChanges}
        disabled={nodesLength === 0}
      >
        Save Changes
      </Button>
    </nav>
  );
};

export default Navbar;
