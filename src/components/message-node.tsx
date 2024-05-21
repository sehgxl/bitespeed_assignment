import { ArrowLeftOutlined, MessageOutlined } from "@ant-design/icons";
import { Drawer, Input, Typography } from "antd";
import { useState } from "react";
import { Handle, NodeProps, Position, useReactFlow } from "reactflow";

const MessageNode = ({ data, id }: NodeProps) => {
  const reactFlow = useReactFlow();
  const { getNode, setNodes } = reactFlow;

  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    const selectedNode = getNode(id);

    if (selectedNode) {
      selectedNode.data = {
        label: inputValue,
      };

      setNodes((Nodes) => {
        return Nodes.map((node) => {
          if (+node.id === +id) {
            return selectedNode;
          } else {
            return node;
          }
        });
      });
    }
  };

  const handleDrawerClose = () => {
    setIsEditDrawerOpen(false);
  };
  return (
    <>
      <Drawer
        styles={{
          mask: {
            backgroundColor: "rgba(0,0,0,0.1)",
          },
        }}
        onClose={handleDrawerClose}
        open={isEditDrawerOpen}
        title="Message"
        closeIcon={<ArrowLeftOutlined />}
      >
        <Typography.Text type="secondary">Text</Typography.Text>
        <Input.TextArea
          rows={6}
          defaultValue={data.label}
          onChange={handleTextInputChange}
        />
      </Drawer>
      <Handle type="target" id="target-handle" position={Position.Left} />

      <article
        className={`min-w-52 bg-white  ${
          isEditDrawerOpen ? "ring-2 ring-blue-400" : null
        }  drop-shadow-lg  flex-col overflow-hidden rounded-md flex justify-center items-start`}
      >
        <div className="flex bg-teal-200 w-full px-2 py-1 items-center">
          <MessageOutlined className="mr-1 scale-[0.8]" />
          <Typography.Title
            style={{
              margin: 0,
            }}
            level={5}
          >
            Send Message
          </Typography.Title>
        </div>
        <div
          onClick={() => {
            setIsEditDrawerOpen(true);
          }}
          className="w-full min-h-8"
        >
          <Typography className="px-6 py-2 ">{data.label}</Typography>
        </div>
      </article>
      <Handle type="source" id="source-handle" position={Position.Right} />
    </>
  );
};

export default MessageNode;
