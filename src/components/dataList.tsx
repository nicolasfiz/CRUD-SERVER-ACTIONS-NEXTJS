export default function DataList({ data }: { data: string[] }) {
  return (
    <div className="flex flex-col items-center">
      <ul className="list-disc">
        {data.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </div>
  );
}
