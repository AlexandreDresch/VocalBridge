import { Copy } from "lucide-react";
import { toast } from "sonner";

interface ContentBoxProps {
  content: string;
}

export default function ContentBox({ content }: ContentBoxProps) {
  function handleContentCopy() {
    navigator.clipboard.writeText(content);

    toast.success("Content copied!");
  }

  return (
    <div className="flex flex-1 bg-slate-600 p-2 relative rounded-sm">
      <p className="text-sm leading-6 text-slate-100">{content}</p>

      <button
        type="button"
        onClick={handleContentCopy}
        className="absolute right-2 text-slate-100"
      >
        <Copy size={20} />
      </button>
    </div>
  );
}
