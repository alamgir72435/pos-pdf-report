const app = require("express")();
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const makeSalesSummery = new Promise((resolve, reject) => {
  let doc = new PDFDocument({ bufferPages: true });
  doc.pipe(fs.createWriteStream("public/report.pdf"));
  doc.font("fonts/kalpurush.ttf").fontSize(14);
  doc.text(
    `একটি বাংলাদেশ তুমি জাগ্রত জনতার,
  সারা বিশ্বের বিস্ময় তুমি আমার অহংকার!
  এবং আমরা একটি সফটওয়্যার বানাচ্ছি !`,
    100,
    100
  );
  doc.end();
  resolve();
});

app.get("/", async (req, res) => {
  await makeSalesSummery;
  setTimeout(() => {
    res.sendFile(path.join(__dirname, "public", "report.pdf"));
  }, 100);
});

app.listen(5000, console.log(`Running`));
