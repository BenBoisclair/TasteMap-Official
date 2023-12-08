export interface AspectBarProps {
  aspect: {
    name: string;
    average: number;
  };
}

export default function AspectBar({ aspect }: AspectBarProps) {
  return (
    <div className="flex items-center justify-end gap-3 text-xs font-medium">
      <div>{aspect.name}</div>
      <div className="h-2 w-32 grow-0 rounded-full bg-neutral-200">
        <div
          className="h-2 rounded-full bg-yellow"
          style={{ width: `${aspect.average * 20}%` }}
        ></div>
      </div>
      <div className="flex w-1 justify-center">
        <span>{aspect.average.toFixed(1)}</span>
      </div>
    </div>
  );
}
