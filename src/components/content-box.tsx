import { Copy } from "lucide-react";
import { toast } from "sonner";

interface ContentBoxProps {
  content: string;
}

export default function ContentBox({ content }: ContentBoxProps) {
  function handleContentCopy() {
    navigator.clipboard.writeText(content);

    toast.success(
      <div className="flex gap-2">
        <Copy size={20} />
        <span>Content copied to clipboard!</span>
      </div>
    );
  }

  return (
    <div className="flex flex-1 hover:bg-slate-500/10 p-2 relative border border-tertiary rounded-sm transition-colors">
      <p className="text-sm leading-6 text-slate-100">{content}</p>

      <button
        type="button"
        onClick={handleContentCopy}
        className="absolute right-2 text-slate-100 hover:text-secondary transition-colors"
      >
        <Copy size={20}/>
      </button>
    </div>
  );
}
