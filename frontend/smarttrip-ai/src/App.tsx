import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";

import { ThemeProvider } from "@/context/ThemeContext";
import { AppShell } from "@/components/layout/AppShell";
import { routes } from "@/routes";

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <AppShell>
            <Routes>
              {routes.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
          </AppShell>
        </BrowserRouter>
      </MotionConfig>
    </ThemeProvider>
  );
}
