export function FormDebugger({ watch, fields = [] }) {
  return (
    <div>
      <pre>
        <code>{JSON.stringify(watch(fields), null, 2)}</code>
      </pre>
    </div>
  );
}
