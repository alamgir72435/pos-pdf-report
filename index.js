const app = require("express")();
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const invoice = {
  shipping: {
    name: "John Doe",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: 94111,
  },
  items: [
    {
      item: "TC 100",
      description: "Toner Cartridge",
      quantity: 2,
      amount: 6000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
  ],
  subtotal: 8000,
  paid: 0,
  invoice_nr: 1234,
};

function generateInvoiceTable(doc, invoice) {
  let i,
    invoiceTableTop = 100;

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      i,
      doc,
      position,
      item.item,
      item.description,
      item.amount / item.quantity,
      item.quantity,
      item.amount
    );
  }
}

function generateTableRow(i, doc, y, c1, c2, c3, c4, c5) {
  doc
    .fontSize(14)
    .text(`${i + 1} ${c1}`, 50, y)
    .text(c2, 150, y)
    .text(c3, 280, y, { width: 90, align: "right" })
    .text(c4, 370, y, { width: 90, align: "right" })
    .text(c5, 0, y, { align: "right" });
}

function generateCustomerInformation(doc, invoice) {
  const shipping = invoice.shipping;

  doc
    .text(`Invoice Number: ${invoice.invoice_nr}`, 50, 200)
    .text(`Invoice Date: 21-20-2020`, 50, 215)
    .text(`Balance Due: ${invoice.subtotal - invoice.paid}`, 50, 130)

    .text(shipping.name, 300, 200)
    .text(shipping.address, 300, 215)
    .text(`${shipping.city}, ${shipping.state}, ${shipping.country}`, 300, 130)
    .moveDown();
}

function generateHeader(doc) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("মেসার্স সিয়াম এন্টারপ্রাইজ", 100, 30, { align: "center" })
    .moveDown();
  doc
    .fillColor("#444444")
    .fontSize(16)
    .text("মাদ্রাসা রোড, শিবপুর,নরসিংদী", 100, 55, { align: "center" })
    .moveDown();
  doc
    .fillColor("#444444")
    .fontSize(16)
    .text("০১৭৪২৯৯৮৬৭০,০১৮৭৫৩২৮৩০৫", 100, 75, { align: "center" })
    .moveDown();

  doc
    .moveTo(10, 100) // set the current point
    .lineTo(600, 100) // draw a line
    .fillOpacity(0.5)
    .stroke(); // stroke the path
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text("bainary Bunon.", 300, 700, { align: "center", width: 500 });
}

const makeSalesSummery = new Promise((resolve, reject) => {
  let doc = new PDFDocument({ bufferPages: true });
  doc.pipe(fs.createWriteStream("public/report.pdf"));
  doc.font("fonts/kalpurush.ttf").fontSize(14);
  // create Table
  generateHeader(doc);
  // generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  resolve();
});

app.get("/pdf", (req, res) => {
  var pdf = require("./pdf/table").create();
  pdf.pipe(res);
  pdf.end();
  console.log(123);
});

app.get("/", async (req, res) => {
  await makeSalesSummery;
  setTimeout(() => {
    res.sendFile(path.join(__dirname, "public", "report.pdf"));
  }, 100);
});

app.get("/");

app.listen(5000, console.log(`Running`));
