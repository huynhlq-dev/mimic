import { NavLink, Route, Routes } from "react-router-dom";
import { EpisodesPage } from "./pages/EpisodesPage";
import { EpisodeDetailPage } from "./pages/EpisodeDetailPage";
import { ProgressPage } from "./pages/ProgressPage";
import { useTheme } from "./lib/theme";

export function App() {
  const { theme, toggle } = useTheme();

  return (
    <div className="app-shell">
      <nav className="top-nav">
        <div className="nav-left">
          <NavLink to="/" end className="brand">
            Mimic
          </NavLink>
          <NavLink to="/progress" className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}>
            Tiến độ
          </NavLink>
        </div>
        <button
          type="button"
          className="ios-switch"
          role="switch"
          aria-checked={theme === "dark"}
          aria-label="Chế độ tối"
          onClick={toggle}
        >
          <span className="ios-switch-knob" />
        </button>
      </nav>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<EpisodesPage />} />
          <Route path="/episode/:id" element={<EpisodeDetailPage />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Routes>
      </main>
    </div>
  );
}
