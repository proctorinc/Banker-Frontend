import { Handle, Position, type NodeProps } from "@xyflow/react";

import { type PositionLoggerNode } from "./types";
import { formatCurrency } from "@/utils/utils";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function PositionLoggerNode({ data }: NodeProps<PositionLoggerNode>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-white flex flex-col rounded-xl border border-gray-200 w-[150px] shadow-sm">
          <div className="px-4 py-2 w-full bg-gray-50 text-gray-400 text-sm rounded-t-xl border-b border-gray-200">
            {data.label}
          </div>
          <div className="px-4 py-3">
            {data.value > 0 && (
              <span className="font-semibold text-emerald-600">
                {formatCurrency(data.value, true)}
              </span>
            )}
            {data.value === 0 && (
              <span className="font-semibold text-gray-600">
                {formatCurrency(data.value, true)}
              </span>
            )}
            {data.value < 0 && (
              <span className="font-semibold text-red-600">
                {formatCurrency(data.value, true)}
              </span>
            )}

            {/* <div>
            {x} {y}
          </div> */}

            {data.handleLeft && (
              <Handle id="left" type="target" position={Position.Left} />
            )}
            {data.handleRight && (
              <Handle id="right" type="source" position={Position.Right} />
            )}
            {data.handleTop && (
              <Handle id="top" type="target" position={Position.Top} />
            )}
            {data.handleBottom && (
              <Handle type="source" id="bottom" position={Position.Bottom} />
            )}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data.label}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogTrigger asChild>
            {/* <Button onClick={() => createSavingsFund()}>Create</Button> */}
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
