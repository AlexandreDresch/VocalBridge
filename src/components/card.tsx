export default function Card() {
  return (
    <button className="rounded-sm text-left bg-slate-700 p-5 space-y-3 overflow-hidden relative outline-none hover:ring-1 hover:ring-slate-600 transition-transform hover:scale-105 focus-visible:ring-1 focus-visible:ring-slate-500 focus-visible:scale-105">
      <span className="text-sm font-medium text-slate-200">2 days ago</span>

      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam
        impedit nobis autem suscipit qui cupiditate earum, molestias doloremque
        possimus, ullam omnis nihil at rerum ex, ab numquam deleniti tempora.
        Repudiandae!
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-900/70 to-slate-900/0 pointer-events-none" />
    </button>
  );
}
