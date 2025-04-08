export default function Button({ children, onClick, type, disabled }) {
  let cssClasses =
    "cursor-pointer py-2 px-4 rounded-md border-2 transition-colors duration-300";

  if (type === "warning") {
    cssClasses += " border-yellow-500 hover:bg-yellow-500";
  } else if (type === "danger") {
    cssClasses += " border-red-500 hover:bg-red-500";
  } else {
    cssClasses += " border-slate-500 hover:bg-slate-500";
  }

  return (
    <button className={cssClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
