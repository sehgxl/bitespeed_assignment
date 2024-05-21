import { MessageOutlined } from "@ant-design/icons";

const MessageNodeDropper = () => {
  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.dataTransfer.setData("text/plain", "messageNode");
  };
  return (
    <article
      onDragStart={handleDragStart}
      draggable="true"
      className="h-24 w-full border-2 border-purple-300 flex flex-col justify-center items-center bg-white rounded-lg cursor-pointer hover:bg-blue-50 ease-in transition delay-100"
    >
      <MessageOutlined />
      Message
    </article>
  );
};

export default MessageNodeDropper;
