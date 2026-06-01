import React, { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';

const CODE_LINES = [
  'const app = express();',
  'export default function Home() {',
  'await mongoose.connect(uri);',
  'SELECT * FROM users WHERE id = ?;',
  'git push origin main',
  'npm run build',
  'interface Project { id: string; }',
  'useEffect(() => { fetchData(); }, []);',
  'spring.datasource.url=jdbc:mysql://',
  'docker compose up -d',
  'const [mode, setMode] = useState("light");',
  'return res.status(200).json(data);',
  'import { motion } from "framer-motion";',
  'public static void main(String[] args)',
  'def train_model(X, y):',
  'CREATE TABLE projects (id INT);',
];

function buildColumn(lineOffset, speed, isDark) {
  const lines = [];
  for (let i = 0; i < 14; i += 1) {
    lines.push(CODE_LINES[(i + lineOffset) % CODE_LINES.length]);
  }
  return { lines, speed, isDark };
}

export default function HomeCodeDrift() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const columns = useMemo(
    () => [
      buildColumn(0, 42, isDark),
      buildColumn(3, 55, isDark),
      buildColumn(6, 38, isDark),
      buildColumn(9, 48, isDark),
      buildColumn(12, 52, isDark),
    ],
    [isDark]
  );

  return (
    <div className="home-code-drift" aria-hidden>
      {columns.map((col, i) => (
        <div
          key={i}
          className="home-code-drift__column"
          style={{ '--drift-duration': `${col.speed}s` }}
        >
          <div className="home-code-drift__track">
            {[...col.lines, ...col.lines].map((line, j) => (
              <div key={j} className="home-code-drift__line">
                {line}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
