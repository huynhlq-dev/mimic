import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { findInvitation } from "../registry";

// `presentSlug` có khi chạy present mode (VITE_INVITATION_ID), nếu không slug lấy từ URL.
export default function InvitationPage({ slug: presentSlug }: { slug?: string }) {
  const params = useParams();
  const invitation = findInvitation(presentSlug ?? params.slug);

  useEffect(() => {
    if (invitation) document.title = invitation.meta.title;
  }, [invitation]);

  if (!invitation) {
    return (
      <main className="page home">
        <h1>Không tìm thấy thiệp</h1>
        {presentSlug ? (
          <p>VITE_INVITATION_ID="{presentSlug}" không khớp folder nào trong src/invitations/</p>
        ) : (
          <Link to="/">← Về trang chủ</Link>
        )}
      </main>
    );
  }

  const { Component } = invitation;
  return (
    <main className="page">
      <Component />
    </main>
  );
}
