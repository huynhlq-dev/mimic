// Toàn bộ nội dung chữ của thiệp nằm ở đây. Sửa file này, không cần đụng code.
// Ảnh: bỏ vào thư mục ./photos (xếp theo tên file: 1.jpg, 2.jpg, 3.jpg ...).
export const content = {
  meta: {
    title: "Thiệp sinh nhật",
    description: "Thiệp mời sinh nhật 1 tuổi",
  },

  // Màn mở đầu tự chuyển sang màn chính sau ngần này giây (chạm vào màn hình để bỏ qua).
  introSeconds: 6,

  // Nhạc nền lặp lại liên tục: tên file trong src/mp3/ (để "" nếu không dùng nhạc). volume 0..1.
  music: {
    file: "leberch-happy-birthday.mp3",
    volume: 0.6,
  },

  // Bìa "Chạm để mở thiệp": chỉ hiện khi trình duyệt chặn tự phát nhạc (chạm = mở khoá nhạc + mở thiệp).
  cover: {
    eyebrow: "You’re invited",
    title: "Tên Bé’s 1st Birthday",
    hint: "Tap to open",
  },

  intro: {
    line1: "I blinked…",
    before: "and",
    bold: "my baby",
    middle: "is turning",
    italic: "One",
  },

  main: {
    headline: "Tên Bé is Turning",
    // Mỗi chữ cái lấy 1 ảnh trong ./photos theo thứ tự (thiếu ảnh thì lặp lại).
    word: "one",
    // Cách đặt ảnh trong từng chữ cái, theo thứ tự chữ (CSS background-size / position / repeat).
    // Chữ chỉ lộ phần nửa dưới của khung, nên thu nhỏ ảnh + dồn xuống đáy để mặt bé lọt vào chữ.
    // 1cqw = 1% chiều rộng khung thiệp. "repeat-x" lặp ảnh sang ngang để lấp chỗ trống khi dịch ảnh.
    photoSize: ["cover", "auto 64%", "auto 68%"],
    photoFocus: ["50% 60%", "calc(100% + 5cqw) 100%", "30% 100%"],
    photoRepeat: ["no-repeat", "no-repeat", "no-repeat"],
    joinText: "Please join us to celebrate",
    eventTitle: "Tên Bé’s First Birthday",
    month: "October",
    day: "18",
    time: "17:00",
    venue: "Tên địa điểm",
    address: "Số nhà, đường, thành phố, tiểu bang",
  },
};
