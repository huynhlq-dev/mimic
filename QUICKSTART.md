# Quickstart

## Yêu cầu

- Node.js 18+ (đã test với v20)
- Trình duyệt hỗ trợ MediaRecorder (Chrome/Edge/Firefox khuyến nghị)

## Cài đặt & chạy

```bash
npm install
npm run dev
```

Mở [http://localhost:5173](http://localhost:5173).

Khi bấm **Ghi âm**, trình duyệt sẽ hỏi quyền micro — cần cho phép để dùng được bước Nói theo / Recall.

## Các lệnh khác

```bash
npm run build      # type-check + build production vào dist/
npm run preview    # chạy thử bản build production
```

## Cấu trúc dự án

```text
public/
  audio/<lesson-id>/<lesson-id>-NN.mp3   # audio từng câu
  data/lessons.json                      # nội dung 8 lesson x 20 câu
src/
  types.ts               # kiểu dữ liệu Lesson/Sentence/Progress
  lib/
    lessons.ts            # load lessons.json (hook useLessons)
    storage.ts             # tiến độ học lưu ở localStorage + lịch ôn tập
    useRecorder.ts          # hook ghi âm bằng MediaRecorder
    theme.ts                # dark/light mode (hook useTheme, lưu localStorage)
  components/
    AudioPlayer.tsx        # phát audio, chọn tốc độ 0.7x/1x/1.3x
    Recorder.tsx            # ghi âm + nghe lại
  pages/
    EpisodesPage.tsx        # danh sách episode
    EpisodeDetailPage.tsx    # luồng học: Khám phá → Nói theo → Recall
    ProgressPage.tsx          # thống kê tiến độ + danh sách ôn tập hôm nay
```

## Reset tiến độ học

Tiến độ lưu trong `localStorage` của trình duyệt, key `mimic:progress:v1`. Để xoá:

```js
localStorage.removeItem("mimic:progress:v1");
```

hoặc mở DevTools → Application → Local Storage → xoá key đó.

## Ghi chú phạm vi

Đây là bản "basic" theo `APP_DESIGN.md`, đã lược bớt so với thiết kế đầy đủ: chưa có chunk-level breakdown, ghép câu thành đoạn, Mimic/Retell mode, câu hỏi cá nhân hoá, chấm điểm tự động đa thành phần, hay hệ thống 1.000 từ chi tiết. Việc "nói đúng chưa" hiện dựa vào người dùng tự đánh giá (ghi âm + tự nghe lại), chưa dùng speech-to-text.

## UI design

Style tham khảo từ [yamete-app.online](https://www.yamete-app.online/): dark-mode-first (mặc định tối, có switch chuyển sáng/tối ở góc phải nav, lưu lựa chọn trong `localStorage`), màu chủ đạo teal `#0ABAB5` + điểm nhấn saffron cam vàng, font Inter, toàn bộ app nằm trong khung hẹp kiểu điện thoại (max-width 448px) dù xem trên desktop, thẻ bo góc 16px + shadow 3 cấp (e1/e2/e3), nút/chip bo tròn pill, và control tốc độ audio dạng segmented 3 mức (0.7x/1x/1.3x) thay vì toggle nhị phân.
