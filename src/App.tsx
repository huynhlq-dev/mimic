import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import InvitationPage from "./pages/InvitationPage";

// VITE_INVITATION_ID (đọc lúc build): có giá trị → site chỉ present đúng thiệp đó tại "/",
// không có trang danh sách. Để trống → "/" là danh sách, mỗi thiệp ở "/#/<slug>".
const PRESENT_ID = import.meta.env.VITE_INVITATION_ID?.trim();

// HashRouter: static hosting needs no SPA rewrite rule. URLs look like /#/dau-tay.
export default function App() {
  return (
    <HashRouter>
      <Routes>
        {PRESENT_ID ? (
          <>
            <Route path="/" element={<InvitationPage slug={PRESENT_ID} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/:slug" element={<InvitationPage />} />
          </>
        )}
      </Routes>
    </HashRouter>
  );
}
