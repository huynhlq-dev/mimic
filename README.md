# Thiệp mời online

Static landing pages, mỗi thiệp là một trang cố định (không scroll). Không DB, không import thủ công.

## Cấu trúc

```
.env                     # VITE_INVITATION_ID: thiệp nào được present
src/
  main.tsx, App.tsx      # router (HashRouter), chọn chế độ theo VITE_INVITATION_ID
  registry.ts            # tự quét src/invitations/*/index.tsx
  pages/Home.tsx         # trang cha: danh sách thiệp
  pages/InvitationPage.tsx
  styles/global.css      # khoá 100% viewport, overflow hidden
  invitations/
    _template/           # copy folder này để tạo thiệp mới
    dau-tay/             # thiệp thật
      content.ts         # toàn bộ chữ của thiệp
      photos/            # ảnh: 1.jpg, 2.jpg, 3.jpg ... (theo thứ tự chữ cái)
      index.tsx, Intro.tsx, Main.tsx, style.module.css ...
```

## Present một thiệp (biến môi trường)

`VITE_INVITATION_ID` = tên folder của thiệp trong `src/invitations/`.

| Giá trị | Kết quả |
| --- | --- |
| `dau-tay` | `/` mở thẳng thiệp `dau-tay`, không có trang danh sách; mọi URL khác tự về `/` |
| để trống | `/` là danh sách thiệp, mỗi thiệp ở `/#/<slug>` |

- Mặc định lấy từ file `.env` (đã commit). Biến cùng tên trong dashboard deploy sẽ ghi đè.
- Override riêng trên máy (không commit): tạo `.env.local` với `VITE_INVITATION_ID=...`.
- Giá trị được đọc lúc **build**: đổi xong phải restart `npm run dev` hoặc build/deploy lại.
- ID sai (không có folder tương ứng) sẽ hiện trang "Không tìm thấy thiệp".

## Tạo thiệp mới

1. `cp -r src/invitations/_template src/invitations/<slug>`
2. Sửa `content.ts`, bỏ ảnh vào `photos/`.
3. Đặt `VITE_INVITATION_ID=<slug>` để present, hoặc để trống rồi mở `/#/<slug>`.

## Lệnh

`npm run dev` · `npm run build` (output `dist/`) · `npm run preview`
