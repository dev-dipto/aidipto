import type { ConnectedOperation } from '../data/connectedOperations';
import { useReducedMotion } from '../hooks/useMediaQuery';

const kindColor: Record<string, string> = {
  source: '#8A98AE',
  process: '#4C8DFF',
  output: '#2FE8C3',
};

/** Node graph rendered from data — every state has its own layout. */
export function OperationGraph({ operation }: { operation: ConnectedOperation }) {
  const reduced = useReducedMotion();
  const byId = new Map(operation.nodes.map((node) => [node.id, node]));

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      role="img"
      aria-label={`${operation.title} workflow diagram`}
      preserveAspectRatio="xMidYMid meet"
    >
      <g>
        {operation.edges.map((edge, index) => {
          const from = byId.get(edge.from);
          const to = byId.get(edge.to);
          if (!from || !to) return null;
          const midX = (from.x + to.x) / 2;
          const path = `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
          return (
            <g key={`${edge.from}-${edge.to}`}>
              <path d={path} fill="none" stroke="rgba(76,141,255,0.22)" strokeWidth="0.5" />
              {!reduced && (
                <circle r="0.9" fill="#2FE8C3">
                  <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${index * 0.35}s`} path={path} />
                </circle>
              )}
            </g>
          );
        })}
      </g>

      {operation.nodes.map((node) => (
        <g key={node.id}>
          <circle cx={node.x} cy={node.y} r="4.2" fill="#0B111A" stroke={kindColor[node.kind]} strokeWidth="0.6" />
          <circle cx={node.x} cy={node.y} r="1.5" fill={kindColor[node.kind]} />
          <text
            x={node.x}
            y={node.y + 9}
            textAnchor="middle"
            fill="#8A98AE"
            fontSize="3.4"
            fontFamily="Inter, system-ui, sans-serif"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default OperationGraph;
