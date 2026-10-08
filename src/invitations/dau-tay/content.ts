// Nội dung thiệp Dâu Tây. Ảnh nằm ở ./photos (1,2,3 = chữ o, n, e).
export const content = {
  meta: {
    title: "Dâu Tây 1st Birthday",
    description: "Thiệp mời sinh nhật 1 tuổi của Dâu Tây",
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
    title: "Dâu Tây’s 1st Birthday",
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
    headline: "Dâu Tây is Turning",
    // Mỗi chữ cái lấy 1 ảnh trong ./photos theo thứ tự (thiếu ảnh thì lặp lại).
    word: "one",
    // Cách đặt ảnh trong từng chữ cái, theo thứ tự chữ (CSS background-size / position / repeat).
    // Chữ chỉ lộ phần nửa dưới của khung, nên thu nhỏ ảnh + dồn xuống đáy để mặt bé lọt vào chữ.
    // 1cqw = 1% chiều rộng khung thiệp. "repeat-x" lặp ảnh sang ngang để lấp chỗ trống khi dịch ảnh.
    photoSize: ["cover", "auto 64%", "auto 68%"],
    photoFocus: ["50% 60%", "calc(100% + 5cqw) 100%", "calc(30% - 7cqw) 100%"],
    photoRepeat: ["no-repeat", "no-repeat", "repeat-x"],
    joinText: "Please join us to celebrate",
    eventTitle: "Dâu Tây’s First Birthday",
    month: "October",
    day: "18",
    time: "17:00",
    venue: "Royal Queen",
    address: "136-20 Roosevelt Ave 3F, Flushing, NY 11354",
  },
};
