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
      // .setColumnsDefaults({
      //   headerBorder: "B",
      //   align: "right",
      // })
      // add table columns
      .addColumns([
        {
          id: "description",
          header: "তারিখ",
          width: 100,
        },
        {
          id: "quantity",
          header: "ইনভয়েস নং",
          width: 130,
          align: "center",
        },
        {
          id: "price",
          header: "ক্রেতার নাম",
          width: 70,
          align: "center",
        },
        {
          id: "phone",
          header: "ফোন",
          width: 70,
          align: "center",
        },
        {
          id: "address",
          header: "ফোন",
          width: 70,
          align: "center",
        },
        {
          id: "totalAmount",
          header: "ফোন",
          width: 70,
          align: "center",
        },
        {
          id: "discount",
          header: "ডিসকাউন্ট",
          width: 70,
          align: "center",
        },
        {
          id: "total",
          header: "মোট",
          width: 70,
          align: "center",
        },
        // {
        //   id: "total",
        //   header: "Total",
        //   align: "center",
        //   width: 200,
        //   renderer: function (tb, data) {
        //     return "CHF " + data.total;
        //   },
        // },
      ])
      // add events (here, we draw headers on each new page)
      .onPageAdded(function (tb) {
        tb.addHeader();
      });

    // if no page already exists in your PDF, do not forget to add one
    pdf.addPage();

    // draw content, by passing data to the addBody method
    table.addBody([
      {
        description: "12.12.12",
        quantity: 1,
        price: 13,
        phone: "019829292",
        address: "ok",
        totalAmount: 0,
        discount: 12,
        total: 20.1,
      },
      {
        description: "12.22.33",
        quantity: 4,
        price: 13,
        phone: "019829292",
        address: "ok",
        totalAmount: 0,
        discount: 12,
        total: 16.0,
      },
    ]);

    return pdf;
  },
};
