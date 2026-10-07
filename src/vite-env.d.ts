/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Slug (tên folder trong src/invitations/) của thiệp cần present. Để trống = hiện danh sách thiệp.
  readonly VITE_INVITATION_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
