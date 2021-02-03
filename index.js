const app = require("express")();
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
function createBanglaPdf(content) {
  let doc = new PDFDocument();
  doc.pipe(fs.createWriteStream("public/report.pdf"));
  doc.font("fonts/kalpurush.ttf").fontSize(14);
  doc.text(content, 100, 100);
  doc.end();
}

createBanglaPdf(`
  একটি বাংলাদেশ তুমি জাগ্রত জনতার,
  সারা বিশ্বের বিস্ময় তুমি আমার অহংকার!
  এবং আমরা একটি সফটওয়্যার বানাচ্ছি
`);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "report.pdf"));
});

app.listen(5000, console.log(`Running`));
