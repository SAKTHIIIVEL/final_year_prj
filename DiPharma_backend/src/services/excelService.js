import ExcelJS from "exceljs";

const HEADER_FILL = { type: "pattern", pattern: "solid", fgColor: { argb: "FF161952" } };
const HEADER_FONT = { bold: true, color: { argb: "FFFFFFFF" }, size: 12 };

export const generateApplicationsExcel = async (applications) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Applications");

  sheet.columns = [
    { header: "Name", key: "name", width: 20 },
    { header: "Email", key: "email", width: 28 },
    { header: "Phone", key: "phone", width: 15 },
    { header: "Country Code", key: "countryCode", width: 14 },
    { header: "Job Position", key: "role", width: 30 },
    { header: "Message", key: "message", width: 40 },
    { header: "Resume", key: "resumePath", width: 35 },
    { header: "Status", key: "status", width: 14 },
    { header: "Applied Date", key: "createdAt", width: 20 },
  ];

  sheet.getRow(1).eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.alignment = { horizontal: "center" };
  });

  applications.forEach((app) => {
    sheet.addRow({
      name: app.name,
      email: app.email,
      phone: app.phone,
      countryCode: app.countryCode,
      role: app.role,
      message: app.message,
      resumePath: app.resumePath || "N/A",
      status: app.status,
      createdAt: new Date(app.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }),
    });
  });

  return workbook;
};

export const generateInquiriesExcel = async (inquiries) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Inquiries");

  sheet.columns = [
    { header: "First Name", key: "firstName", width: 16 },
    { header: "Last Name", key: "lastName", width: 16 },
    { header: "Email", key: "email", width: 28 },
    { header: "Phone", key: "phone", width: 15 },
    { header: "Country Code", key: "countryCode", width: 14 },
    { header: "Subject", key: "subject", width: 30 },
    { header: "Message", key: "message", width: 40 },
    { header: "Status", key: "status", width: 12 },
    { header: "Submitted Date", key: "createdAt", width: 20 },
  ];

  sheet.getRow(1).eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.alignment = { horizontal: "center" };
  });

  inquiries.forEach((inq) => {
    sheet.addRow({
      firstName: inq.firstName,
      lastName: inq.lastName,
      email: inq.email,
      phone: inq.phone,
      countryCode: inq.countryCode,
      subject: inq.subject,
      message: inq.message,
      status: inq.status,
      createdAt: new Date(inq.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }),
    });
  });

  return workbook;
};
