// ===== NƠI CHỈNH NỘI DUNG (không cần đụng vào code animation) =====
export interface BirthdayConfig {
  door: { hint: string; knock: string; reply: string };
  room: { question: string; subtitle: string; yes: string; no: string; accept1: string; accept2: string; giftBtn: string };
  song: { heading: string; sub: string; nextBtn: string; skip: string };
  video: { src: string; poster: string; aspect: string };
  // --chèn ảnh: bỏ ảnh vào public/photos/ rồi điền đường dẫn, ví dụ "/photos/nhu-1.jpg"
  photos: { room: string; song: string; letterTop: string; letterBottom: string };
  envelope: { title: string; sub: string };
  letter: { greeting: string; paragraphs: string[]; signature: string; finalMessage: string };
}

export const birthdayConfig: BirthdayConfig = {
  door: { hint: "Chạm vào cửa nhé 💗", knock: "Cốc!", reply: "Anh tới liền!" },
  room: {
    question: "Em có iu anh hong? 💗",
    subtitle: "Trả lời thật lòng nhaaa...",
    yes: "Cóa 💗",
    no: "Hong 🙈",
    accept1: "ANH BIẾT NGAY MÀAAA! 😚💗",
    accept2: "Hehe, vậy thì hãy đón nhận một chút tấm lòng thành của anh tặng sinh nhật em nhaaa 🎁",
    giftBtn: "Nhận quà thôiii 🎁",
  },
  song: {
    heading: "Một món quà nhỏ dành riêng cho em ♡",
    sub: "Anh đã chuẩn bị điều này chỉ để chúc mừng sinh nhật em.",
    nextBtn: "Còn một điều nữa nè... 💌",
    skip: "Bỏ qua video",
  },
  // Đặt video thật tại public/media/birthday-song.mp4. aspect: "9/16" (dọc) hoặc "16/9" (ngang)
  video: { src: "/media/birthday-song.mp4", poster: "", aspect: "9/16" },
  photos: { room: "/photos/room.jpg", song: "/photos/song.jpg", letterTop: "/photos/letter-top.jpg", letterBottom: "/photos/letter-bottom.jpg" },
  envelope: { title: "Em mở thư nhaaa 💌", sub: "Anh còn một chút điều muốn nói với em..." },
  letter: {
    greeting: "Hiii em bé Tố Nhu,",
    paragraphs: [
      "Chúc mừng sinh nhật em nha, anh cảm thấy bản thân may mắn khi có thể gặp gỡ và quen biết em kịp ngay lúc đón sinh nhật cùng em.",
      "Chúc em bé của anh thêm một tuổi mới với tràn đầy niềm vui, may mắn luôn mỉm cười với em, công danh sự nghiệp thuận lợi phát triển, lúc nào cũng tươi cười.",
      "Nếu có điều gì làm em buồn lòng, anh mong đó là do quá nhiều tiền nên không biết tiêu làm sao :P",
      "Chúc em bé của anh tất cả, mong là chúng ta sẽ may mắn đồng hành được với nhau.",
      "Anh yêu em.",
    ],
    signature: "Tâm Đoàn With Love ♡", // đổi thành biệt danh của anh
    finalMessage: "Chúc em sinh nhật thật vui nhaaa ♡",
  },
};
