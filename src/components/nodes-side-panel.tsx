import { Typography } from "antd";
import MessageNodeDropper from "./message-node-dropper";

const NodesSidePanel = () => {
  return (
    <section className="flex flex-col items-center py-4 gap-1 w-1/3 border-l-2 px-10 bg-gray-100">
      <Typography.Title level={4}>Nodes Panel</Typography.Title>

      <div className="flex flex-col w-full gap-2 mt-5">
        <MessageNodeDropper />
      </div>
    </section>
  );
};

export default NodesSidePanel;
