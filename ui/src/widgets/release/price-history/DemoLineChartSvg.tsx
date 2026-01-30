import { Box, Typography } from "@mui/material";
import { uiTokens } from "@/shared/ui/tokens";
import { demoChartPoints } from "./constants";

export interface DemoLineChartSvgProps {
  points?: Array<{ x: number; y: number }>;
}

export function DemoLineChartSvg({ points = demoChartPoints }: DemoLineChartSvgProps) {
  const w = 920;
  const h = 280;
  const pad = 18;

  const xTo = (x: number) => pad + (x / 100) * (w - pad * 2);
  const yTo = (y: number) => pad + ((100 - y) / 100) * (h - pad * 2);

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xTo(p.x).toFixed(1)} ${yTo(p.y).toFixed(1)}`)
    .join(" ");

  const lastPoint = points[points.length - 1] ?? { x: 100, y: 0 };
  const firstPoint = points[0] ?? { x: 0, y: 0 };

  const areaPath =
    `${linePath} L ${xTo(lastPoint.x).toFixed(1)} ${yTo(0).toFixed(1)} ` +
    `L ${xTo(firstPoint.x).toFixed(1)} ${yTo(0).toFixed(1)} Z`;

  const nowX = xTo(lastPoint.x);
  const nowY = yTo(lastPoint.y);

  const msrpYNorm = 58;
  const msrpY = yTo(msrpYNorm);

  return (
    <Box sx={{ borderRadius: 3, background: uiTokens.softBg, border: `1px solid ${uiTokens.border}`, p: 2 }}>
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="280" preserveAspectRatio="none">
          <g opacity="0.18">
            {Array.from({ length: 6 }).map((_, i) => {
              const yy = pad + (i / 5) * (h - pad * 2);
              return <line key={`gy-${i}`} x1={pad} y1={yy} x2={w - pad} y2={yy} stroke={uiTokens.chartGrid} strokeWidth="1" />;
            })}
            {Array.from({ length: 8 }).map((_, i) => {
              const xx = pad + (i / 7) * (w - pad * 2);
              return <line key={`gx-${i}`} x1={xx} y1={pad} x2={xx} y2={h - pad} stroke={uiTokens.chartGrid} strokeWidth="1" />;
            })}
          </g>

          <line x1={pad} y1={msrpY} x2={w - pad} y2={msrpY} stroke={uiTokens.chartMsrp} strokeWidth="2" opacity="0.22" strokeDasharray="6 6" />
          <text x={pad} y={msrpY - 8} fill="white" opacity="0.55" fontSize="20" fontFamily="system-ui, -apple-system, Segoe UI, Roboto">
            MSRP
          </text>

          <path d={areaPath} fill={uiTokens.chartAreaFill} />

          <path
            d={linePath}
            fill="none"
            stroke={uiTokens.accentPurple}
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          <circle cx={nowX} cy={nowY} r="7" fill={uiTokens.accentPurple} opacity="0.95" />
          <circle cx={nowX} cy={nowY} r="14" fill={uiTokens.chartPointGlow} opacity="0.9" />
        </svg>
      </Box>

      <Box sx={{ mt: 1.5, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="caption" sx={{ opacity: 0.55, letterSpacing: 1.8 }}>
          Older
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.55, letterSpacing: 1.8 }}>
          Now
        </Typography>
      </Box>
    </Box>
  );
}
