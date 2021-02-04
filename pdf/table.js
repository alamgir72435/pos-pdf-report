var PdfTable = require("voilab-pdf-table"),
  PdfDocument = require("pdfkit");

module.exports = {
  create: function () {
    // create a PDF from PDFKit, and a table from PDFTable

    var pdf = new PdfDocument({
        autoFirstPage: false,
      }),
      table = new PdfTable(pdf, {
        bottomMargin: 30,
      });

    pdf.font("fonts/kalpurush.ttf").fontSize(14);

    table
      // add some plugins (here, a 'fit-to-width' for a column)
      .addPlugin(
        new (require("voilab-pdf-table/plugins/fitcolumn"))({
          column: "description",
        })
      )
      // set defaults to your columns
      .setColumnsDefaults({
        headerBorder: "B",
        align: "right",
      })
      // add table columns
      .addColumns([
        {
          id: "description",
          header: "তারিখ",
          align: "left",
          align: "center",
        },
        {
          id: "quantity",
          header: "ইনভয়েস নাম্বার",
          width: 100,
          align: "center",
        },
        {
          id: "price",
          header: "ক্রেতার নাম",
          width: 100,
          align: "center",
        },
        {
          id: "total",
          header: "Total",
          align: "center",
          width: 200,
          renderer: function (tb, data) {
            return "CHF " + data.total;
          },
        },
      ])
      // add events (here, we draw headers on each new page)
      .onPageAdded(function (tb) {
        tb.addHeader();
      });

    // if no page already exists in your PDF, do not forget to add one
    pdf.addPage();

    // draw content, by passing data to the addBody method
    table.addBody([
      { description: "Product 1", quantity: 1, price: 20.1, total: 20.1 },
      { description: "Product 2", quantity: 4, price: 4.0, total: 16.0 },
      { description: "Product 3", quantity: 2, price: 17.85, total: 35.7 },
      { description: "Product 3", quantity: 2, price: 17.85, total: 35.7 },
      { description: "Product 3", quantity: 2, price: 17.85, total: 35.7 },
      { description: "Product 3", quantity: 2, price: 17.85, total: 35.7 },
    ]);

    return pdf;
  },
};
