# Mimic — Thiết kế ứng dụng luyện nói tiếng Anh

## 1. Tầm nhìn sản phẩm

Mimic là ứng dụng luyện speaking theo phương pháp nghe và nói theo nội dung podcast ngắn.

Ứng dụng giúp người học đi từ việc hiểu và bắt chước từng cụm nhỏ đến khi có thể:

- Nói trọn vẹn từng câu một cách tự nhiên.
- Nối nhiều câu thành một đoạn hoàn chỉnh.
- Kể lại nội dung mà không nhìn transcript.
- Dùng từ vựng và cấu trúc vừa học để nói về bản thân.
- Chủ động sử dụng 1.000 từ tiếng Anh thông dụng trong đời sống hằng ngày.

North-star metric của sản phẩm là:

> Số phút người dùng có thể nói tiếng Anh dễ hiểu mà không nhìn transcript.

Số lesson hoàn thành, streak và số từ từng nhìn thấy chỉ là chỉ số hỗ trợ, không phải mục tiêu chính.

## 2. Learning loop cốt lõi

```text
Nghe hiểu
   ↓
Bắt chước từng cụm
   ↓
Nói lại từng câu
   ↓
Nối nhiều câu
   ↓
Kể lại cả bài
   ↓
Dùng từ và cấu trúc để nói về bản thân
   ↓
Ôn lại theo lịch
```

Người dùng chỉ được xem là đã học được nội dung khi có thể chủ động nói mà không phụ thuộc vào transcript.

## 3. Cấu trúc nội dung

### 3.1. Cấu trúc một episode

Mỗi episode là một bài nói hoặc đoạn hội thoại dài khoảng 1–3 phút, gồm 8–15 câu, xoay quanh một tình huống hằng ngày như:

- Giới thiệu bản thân.
- Gọi món tại nhà hàng.
- Đi làm muộn.
- Kể về cuối tuần.
- Đặt lịch hẹn.
- Mô tả một vấn đề.
- Đưa ra ý kiến.
- Small talk.

Mỗi episode bao gồm:

- Audio toàn bài.
- Transcript được đồng bộ theo từng câu.
- Bản dịch tự nhiên.
- Các cụm từ cần học.
- 5–8 từ hoặc cụm từ mục tiêu.
- Một số điểm phát âm, trọng âm hoặc nối âm.
- Câu hỏi cá nhân hóa để người dùng áp dụng nội dung vừa học.

### 3.2. Đơn vị học chính

Đơn vị luyện nói chính là cụm từ có nghĩa, không phải từ đơn lẻ.

Ví dụ:

> I ended up staying home because it was raining.

Câu được chia thành các cụm:

```text
I ended up / staying home / because it was raining.
```

Các cụm như `ended up`, `staying home` và `because it was...` có giá trị sử dụng trong giao tiếp cao hơn việc học từng từ riêng biệt.

## 4. Flow của một lesson

### Bước 1: Nghe toàn bài

Người dùng nghe toàn bộ episode một lần mà không nhìn transcript, sau đó trả lời một câu hỏi về ý chính.

Mục tiêu của bước này là luyện khả năng nghe và nắm nghĩa tổng thể, không yêu cầu hiểu từng từ.

### Bước 2: Khám phá từng câu

Với mỗi câu, người dùng thực hiện lần lượt:

1. Nghe câu ở tốc độ tự nhiên.
2. Xem nghĩa của câu.
3. Xem cách câu được chia thành các cụm.
4. Nghe lại ở tốc độ chậm hơn nếu cần.
5. Chạm vào một cụm để xem nghĩa và ví dụ ngắn.

Transcript vẫn được hiển thị trong giai đoạn này.

### Bước 3: Nói theo có hỗ trợ

Ứng dụng phát từng cụm để người dùng lặp lại:

```text
I ended up
→ staying home
→ because it was raining
```

Sau khi hoàn thành từng cụm, người dùng ghép chúng thành cả câu.

Transcript vẫn được hiển thị và các cụm đang nói được làm nổi bật.

### Bước 4: Shadowing

Audio được phát ở tốc độ tự nhiên và người dùng nói gần như đồng thời với người nói mẫu.

Ứng dụng tập trung đánh giá:

- Người dùng có nói đủ các từ và cụm quan trọng không.
- Nhịp nói có gần với câu mẫu không.
- Cách ngắt câu có đúng theo cụm nghĩa không.
- Lời nói có đủ rõ để người nghe hiểu không.

Ứng dụng không yêu cầu người dùng phải có accent giống hoàn toàn người bản xứ.

### Bước 5: Recall không transcript

Ứng dụng ẩn câu tiếng Anh và yêu cầu người dùng tự nói lại. Ban đầu có thể hiển thị một trong các gợi ý:

- Nghĩa tiếng Việt.
- Một hình ảnh.
- Một số từ khóa.
- Phần đầu của câu.

Nếu người dùng chưa nhớ, ứng dụng mở dần trợ giúp:

```text
Hình ảnh hoặc nghĩa
→ từ khóa
→ chữ cái đầu mỗi cụm
→ toàn bộ transcript
```

Càng sử dụng ít trợ giúp, điểm ghi nhớ càng cao.

### Bước 6: Nối câu

Người dùng luyện nói theo cách tích lũy:

```text
Câu 1
Câu 1 + câu 2
Câu 1 + câu 2 + câu 3
...
Cả đoạn
```

Một episode dài được chia thành các đoạn gồm 3–5 câu để tránh tạo gánh nặng ghi nhớ quá lớn.

### Bước 7: Nói cả bài

Người dùng luyện theo hai chế độ:

#### Mimic mode

Cố gắng nói lại nội dung gần với bản gốc về từ ngữ, nhịp điệu và cách diễn đạt.

#### Retell mode

Kể lại ý chính bằng lời của mình. Đây là bước quan trọng để chuyển từ học thuộc sang khả năng nói chủ động.

### Bước 8: Cá nhân hóa

Ứng dụng đưa ra một câu hỏi liên quan đến nội dung vừa học.

Ví dụ:

> Have you ever canceled a plan because of the weather?

Người dùng trả lời và được yêu cầu sử dụng 2–3 cụm từ vừa học. Bước này kiểm tra khả năng chuyển kiến thức sang ngữ cảnh mới.

## 5. Logic chấm điểm

Không sử dụng một điểm phát âm tổng hợp duy nhất. Mỗi lần nói được đánh giá theo các thành phần độc lập:

| Thành phần | Ý nghĩa |
| --- | --- |
| Word coverage | Người dùng có nói đủ các từ hoặc cụm quan trọng không |
| Intelligibility | Lời nói có đủ rõ để hệ thống và người nghe hiểu không |
| Fluency | Tốc độ nói, số lần dừng, lặp hoặc sửa câu |
| Rhythm | Trọng âm, nhịp điệu và cách ngắt theo cụm nghĩa |
| Recall | Người dùng cần bao nhiêu trợ giúp để nói được câu |
| Meaning | Trong Retell mode, người dùng có truyền đạt đúng các ý chính không |

Một câu được coi là đạt khi:

- Các từ khóa được nhận diện.
- Không bỏ mất ý chính.
- Nhịp nói đủ tự nhiên ở cấp độ hiện tại.
- Không cần quá nhiều trợ giúp.

### 5.1. Xử lý khi người dùng chưa đạt

Không bắt người dùng lặp lại cùng một câu quá ba lần liên tiếp. Nếu vẫn chưa đạt, ứng dụng sẽ:

1. Chia câu thành các cụm nhỏ hơn.
2. Làm nổi bật âm hoặc cụm đang gặp vấn đề.
3. Cho nghe và đối chiếu từng cụm.
4. Đưa câu đó vào phần ôn tập cuối buổi hoặc ngày tiếp theo.

Mục tiêu là giúp người dùng tiến bộ mà không tạo cảm giác thất bại hoặc mắc kẹt.

## 6. Hệ thống 1.000 từ thông dụng

### 6.1. Chuẩn hóa từ vựng

Từ vựng được quản lý theo lemma. Các biến thể của cùng một từ được liên kết với nhau:

```text
go / goes / went / gone → GO
```

Ứng dụng vẫn theo dõi riêng việc người dùng có nhận ra và sử dụng được các dạng biến đổi quan trọng hay không.

### 6.2. Vòng đời của một từ

```text
Chưa gặp
→ Đã gặp
→ Hiểu khi nghe
→ Nói được khi bắt chước
→ Tự nhớ và nói được
→ Dùng được trong tình huống mới
→ Thành thạo
```

Một từ chỉ được tính là thành thạo khi người dùng:

- Nhận ra từ trong audio.
- Nói được từ trong câu gốc.
- Recall được sau nhiều ngày.
- Dùng được từ trong ít nhất 2–3 ngữ cảnh khác nhau.

Việc từng nhìn thấy một từ không được tính là đã học từ đó.

### 6.3. Phân bổ từ trong mỗi episode

Mỗi lesson nên có:

- 5–8 từ hoặc cụm từ mới.
- Nhiều từ cũ được tái sử dụng.
- Khoảng 85–95% nội dung người dùng đã biết hoặc có thể đoán được.

Một từ mục tiêu phải xuất hiện lại trong nhiều episode và ngữ cảnh. Ví dụ, `actually` có thể được sử dụng khi:

- Sửa lại một thông tin.
- Bày tỏ sự bất ngờ.
- Trả lời small talk.
- Đưa ra một ý kiến trái chiều.

Mục tiêu là học cách sử dụng từ linh hoạt, không học một bản dịch cố định.

## 7. Hệ thống ôn tập

Một daily session tiêu chuẩn kéo dài khoảng 15 phút:

```text
3 phút: Ôn câu và từ sắp quên
8 phút: Học nội dung mới
2 phút: Nói lại một đoạn
2 phút: Trả lời câu hỏi cá nhân
```

Lịch ôn tập khởi điểm:

```text
Sau buổi học → 1 ngày → 3 ngày → 7 ngày → 14 ngày → 30 ngày
```

Lịch thực tế được điều chỉnh theo kết quả:

- Nói đúng không cần gợi ý: tăng khoảng cách đến lần ôn tiếp theo.
- Nói đúng nhưng cần từ khóa: giữ lịch ôn ở khoảng cách gần.
- Không nhớ nội dung: đưa câu về bước luyện theo cụm.
- Nhớ đúng nhưng phát âm chưa rõ: tạo bài ôn phát âm, không đánh dấu là quên từ.

Khả năng ghi nhớ và khả năng phát âm là hai vấn đề khác nhau, cần được theo dõi độc lập.

## 8. Lộ trình học

### Chặng 1: Survival English

- Câu ngắn.
- Tình huống thiết yếu.
- Tốc độ audio vừa phải.
- Transcript và trợ giúp được hiển thị nhiều.

### Chặng 2: Daily routines

- Công việc.
- Gia đình.
- Ăn uống.
- Mua sắm.
- Đi lại.

### Chặng 3: Social English

- Small talk.
- Cảm xúc.
- Kế hoạch.
- Sở thích.
- Đưa ra ý kiến.

### Chặng 4: Storytelling

- Kể lại một sự kiện.
- Sử dụng từ nối.
- Duy trì một đoạn nói dài.
- Làm rõ trình tự và quan hệ nguyên nhân–kết quả.

### Chặng 5: Natural conversation

- Filler words tự nhiên.
- Nối ý.
- Phản hồi nhanh.
- Diễn đạt lại khi thiếu từ.
- Thể hiện sắc thái và quan điểm cá nhân.

Độ khó tăng theo nhiều chiều:

- Độ dài câu.
- Tốc độ audio.
- Số lượng trợ giúp.
- Độ dài đoạn phải nhớ.
- Mức độ tự do khi trả lời.
- Số từ và cấu trúc phải chủ động sử dụng.

## 9. Logic thích ứng độ khó

Ứng dụng theo dõi kết quả gần đây để điều chỉnh lesson tiếp theo.

### Khi bài quá dễ

- Giảm transcript và gợi ý.
- Tăng tốc độ audio.
- Tăng độ dài đoạn recall.
- Chuyển sớm sang Retell mode.
- Yêu cầu dùng từ mục tiêu trong câu mới.

### Khi bài quá khó

- Chia câu thành cụm nhỏ hơn.
- Giảm số từ mới.
- Cho nghe chậm hơn.
- Tăng số lần gặp lại từ cũ.
- Ưu tiên Mimic mode trước Retell mode.

Không đánh giá độ khó chỉ dựa trên điểm phát âm. Hệ thống cần xem riêng khả năng nghe hiểu, ghi nhớ, độ trôi chảy và khả năng chủ động tạo câu.

## 10. Gamification

Gamification nên khuyến khích hành vi học thật:

- Streak theo số ngày có luyện nói.
- Điểm cho câu nói không cần transcript.
- Huy hiệu khi một từ được dùng trong nhiều ngữ cảnh.
- Bản ghi âm trước và sau để người dùng nghe thấy sự tiến bộ.
- Thống kê số phút nói chủ động.
- Bản đồ 1.000 từ với trạng thái thực tế của từng từ.

Không nên thưởng quá nhiều cho việc bấm hoàn thành lesson hoặc chỉ nghe audio mà không nói.

## 11. Phạm vi MVP

Phiên bản đầu tiên cần có:

- Danh sách course và episode.
- Audio và transcript theo timestamp.
- Trình phát audio theo từng câu.
- Luyện nói từng cụm và từng câu.
- Ghi âm và speech-to-text.
- So khớp từ khóa trong câu nói.
- Ẩn transcript để luyện recall.
- Ghép câu thành đoạn.
- Theo dõi tiến độ từ vựng.
- Spaced repetition.
- Daily session.
- Màn hình tiến độ học tập.

MVP chưa cần chấm accent quá chi tiết. Ưu tiên xác định:

- Người dùng có nói hay không.
- Có nói đủ ý và từ khóa không.
- Có thể nói mà không nhìn transcript không.
- Có nhớ lại nội dung sau vài ngày không.

## 12. Những tính năng có thể phát triển sau MVP

- Feedback phát âm ở cấp độ âm vị.
- So sánh waveform hoặc nhịp câu mẫu với câu của người dùng.
- Tạo câu hỏi cá nhân hóa bằng AI.
- Chấm Retell mode theo ý nghĩa thay vì so khớp nguyên văn.
- Tạo hội thoại nối tiếp từ nội dung podcast.
- Tự động điều chỉnh độ khó.
- Cho phép người dùng nhập podcast riêng.
- Tạo lesson tự động từ audio và transcript.
- Coach AI tổng kết lỗi và đề xuất bài luyện tiếp theo.

## 13. Data model sơ bộ

Các entity cốt lõi:

```text
Course
Episode
Segment
Sentence
Chunk
VocabularyItem
VocabularyOccurrence
PronunciationFocus
UserAttempt
SentenceMastery
VocabularyMastery
ReviewSchedule
DailySession
```

Quan hệ tổng quát:

```text
Course
└── Episode
    └── Segment
        └── Sentence
            ├── Chunk
            ├── VocabularyOccurrence
            └── PronunciationFocus

User
├── UserAttempt
├── SentenceMastery
├── VocabularyMastery
├── ReviewSchedule
└── DailySession
```

## 14. Các chỉ số sản phẩm quan trọng

### Chỉ số học tập

- Số phút nói không nhìn transcript.
- Tỷ lệ câu recall thành công.
- Số từ có thể chủ động sử dụng.
- Tỷ lệ từ còn nhớ sau 7 và 30 ngày.
- Độ dài trung bình của đoạn nói liên tục.
- Mức giảm số lần cần trợ giúp theo thời gian.

### Chỉ số sử dụng

- Số ngày luyện nói mỗi tuần.
- Tỷ lệ hoàn thành daily session.
- Tỷ lệ quay lại sau 1, 7 và 30 ngày.
- Thời gian thực sự ghi âm so với tổng thời gian dùng app.
- Tỷ lệ người dùng hoàn thành bước Retell và Personalization.

## 15. Nguyên tắc sản phẩm

1. Ưu tiên khả năng giao tiếp dễ hiểu hơn accent hoàn hảo.
2. Học cụm từ trong ngữ cảnh thay vì học từ đơn lẻ.
3. Chuyển dần từ có hỗ trợ sang tự nói.
4. Luôn có bước áp dụng vào câu chuyện của người học.
5. Ôn theo khả năng nhớ thực tế, không chỉ theo lịch cố định.
6. Không để người dùng mắc kẹt quá lâu ở một câu.
7. Mọi điểm số phải dẫn đến một hành động học tập cụ thể.
8. AI hỗ trợ learning loop, không thay thế learning loop.

