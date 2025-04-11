import { Handle, Position } from "@xyflow/react";
import { FC, ReactNode } from "react";

type Props = {
  title?: ReactNode;
  children?: ReactNode;
  handleRight?: boolean;
  handleLeft?: boolean;
  handleTop?: boolean;
  handleBottom?: boolean;
};

export const NodeLayout: FC<Props> = ({ title, children, ...handles }) => {
  return (
    <div className="bg-white flex flex-col rounded-xl border border-gray-200 w-[200px] shadow-md">
      <div className="flex justify-center items-center h-14 px-2 py-2 w-full bg-gray-50 text-gray-400 rounded-t-xl border-b border-gray-200">
        {title}
      </div>
      <div className="px-4 py-3 text-center text-xl">{children}</div>

      {handles.handleLeft && (
        <Handle id="left" type="target" position={Position.Left} />
      )}
      {handles.handleRight && (
        <Handle id="right" type="source" position={Position.Right} />
      )}
      {handles.handleTop && (
        <Handle id="top" type="target" position={Position.Top} />
      )}
      {handles.handleBottom && (
        <Handle id="bottom" type="source" position={Position.Bottom} />
      )}
    </div>
  );
};
