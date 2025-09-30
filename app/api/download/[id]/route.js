import { Candidate } from '../../../../models/Candidate';
import { authMiddleware } from '../../../../lib/auth';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

async function generatePDFForDownload(candidateData) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([600, 850]);
  let { width, height } = page.getSize();
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  let y = height - 50;

  // COMPANY LOGO Section
  page.drawText('COMPANY LOGO', {
    x: 50,
    y,
    size: 16,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  
  y -= 40;

  // CANDIDATE PROFILE FORM
  page.drawText('CANDIDATE PROFILE FORM', {
    x: 200,
    y,
    size: 20,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  
  y -= 50;

  // POSITION CONSIDERED FOR
  page.drawText('POSITION CONSIDERED FOR:', {
    x: 50,
    y,
    size: 12,
    font: boldFont,
  });
  page.drawText(candidateData.position || 'N/A', {
    x: 220,
    y,
    size: 12,
    font: font,
  });
  
  y -= 30;

  // Two column layout for basic info
  page.drawText('NAME:', {
    x: 50,
    y,
    size: 12,
    font: boldFont,
  });
  page.drawText(candidateData.fullName || 'N/A', {
    x: 120,
    y,
    size: 12,
    font: font,
  });

  page.drawText('MOBILE NO.:', {
    x: 350,
    y,
    size: 12,
    font: boldFont,
  });
  page.drawText(candidateData.phone || 'N/A', {
    x: 430,
    y,
    size: 12,
    font: font,
  });
  
  y -= 25;

  page.drawText('DOM:', {
    x: 50,
    y,
    size: 12,
    font: boldFont,
  });
  page.drawText(candidateData.dom || 'N/A', {
    x: 120,
    y,
    size: 12,
    font: font,
  });

  page.drawText('EMAIL ID:', {
    x: 350,
    y,
    size: 12,
    font: boldFont,
  });
  page.drawText(candidateData.email || 'N/A', {
    x: 410,
    y,
    size: 12,
    font: font,
  });
  
  y -= 25;

  // PRESENT ADDRESS and Photograph section
  page.drawText('PRESENT ADDRESS:', {
    x: 50,
    y,
    size: 12,
    font: boldFont,
  });
  
  // Draw photograph box
  page.drawRectangle({
    x: 400,
    y: y - 80,
    width: 120,
    height: 120,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  });
  
  page.drawText('Photograph', {
    x: 430,
    y: y - 40,
    size: 10,
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Present address text (multi-line)
  const presentAddress = candidateData.presentAddress || 'N/A';
  const addressLines = presentAddress.split('\n');
  let addressY = y - 20;
  
  addressLines.forEach(line => {
    page.drawText(line, {
      x: 50,
      y: addressY,
      size: 10,
      font: font,
    });
    addressY -= 15;
  });
  
  y = addressY - 20;

  // PERMANENT ADDRESS
  page.drawText('PERMANENT ADDRESS:', {
    x: 50,
    y,
    size: 12,
    font: boldFont,
  });
  page.drawText('(Passport Size)', {
    x: 180,
    y,
    size: 10,
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });

  const permanentAddress = candidateData.permanentAddress || candidateData.presentAddress || 'N/A';
  const permAddressLines = permanentAddress.split('\n');
  let permAddressY = y - 20;
  
  permAddressLines.forEach(line => {
    page.drawText(line, {
      x: 50,
      y: permAddressY,
      size: 10,
      font: font,
    });
    permAddressY -= 15;
  });
  
  y = permAddressY - 30;

  // PERSONAL DETAILS section
  page.drawText('PERSONAL DETAILS:', {
    x: 50,
    y,
    size: 14,
    font: boldFont,
  });
  
  y -= 30;

  // Personal details table headers
  page.drawText('Name', {
    x: 80,
    y,
    size: 12,
    font: boldFont,
  });
  
  page.drawText('Date of Birth', {
    x: 250,
    y,
    size: 12,
    font: boldFont,
  });
  
  page.drawText('Occupation', {
    x: 400,
    y,
    size: 12,
    font: boldFont,
  });
  
  y -= 25;

  // FATHER
  page.drawText('1 FATHER', {
    x: 50,
    y,
    size: 11,
    font: font,
  });
  page.drawText(candidateData.fatherName || 'N/A', {
    x: 80,
    y,
    size: 11,
    font: font,
  });
  page.drawText(candidateData.fatherDOB || 'N/A', {
    x: 250,
    y,
    size: 11,
    font: font,
  });
  page.drawText(candidateData.fatherOccupation || 'N/A', {
    x: 400,
    y,
    size: 11,
    font: font,
  });
  
  y -= 20;

  // MOTHER
  page.drawText('2 MOTHER', {
    x: 50,
    y,
    size: 11,
    font: font,
  });
  page.drawText(candidateData.motherName || 'N/A', {
    x: 80,
    y,
    size: 11,
    font: font,
  });
  page.drawText(candidateData.motherDOB || 'N/A', {
    x: 250,
    y,
    size: 11,
    font: font,
  });
  page.drawText(candidateData.motherOccupation || 'N/A', {
    x: 400,
    y,
    size: 11,
    font: font,
  });
  
  y -= 20;

  // SPOUSE
  page.drawText('3 SPOUSE (If married)', {
    x: 50,
    y,
    size: 11,
    font: font,
  });
  page.drawText(candidateData.spouseName || 'N/A', {
    x: 80,
    y,
    size: 11,
    font: font,
  });
  page.drawText(candidateData.spouseDOB || 'N/A', {
    x: 250,
    y,
    size: 11,
    font: font,
  });
  page.drawText(candidateData.spouseOccupation || 'N/A', {
    x: 400,
    y,
    size: 11,
    font: font,
  });

  y -= 40;

  // EDUCATIONAL PROGRESS - Add new page if needed
  if (y < 150) {
    page = pdfDoc.addPage([600, 850]);
    y = height - 50;
  }

  page.drawText('EDUCATIONAL PROGRESS:', {
    x: 50,
    y,
    size: 14,
    font: boldFont,
  });
  
  y -= 30;

  // Educational table headers
  const eduHeaders = ['S.No.', 'COURSE NAME', 'SCHOOL/INST. Name', 'BOARD / UNIV.', 'Place', '% OR CGPA', 'YOS', 'YOP', 'FT/PT/DL'];
  const eduHeaderX = [50, 80, 150, 250, 350, 420, 470, 510, 540];
  
  eduHeaders.forEach((header, index) => {
    page.drawText(header, {
      x: eduHeaderX[index],
      y,
      size: 8,
      font: boldFont,
    });
  });
  
  y -= 20;

  // Educational entries
  const educationEntries = candidateData.education || [];
  for (let i = 0; i < 5; i++) {
    const edu = educationEntries[i] || {};
    
    page.drawText(`${i + 1}`, {
      x: 50,
      y,
      size: 8,
      font: font,
    });
    
    page.drawText(edu.courseName || getDefaultCourseName(i) || '', {
      x: 80,
      y,
      size: 8,
      font: font,
    });
    
    page.drawText(edu.institution || '', {
      x: 150,
      y,
      size: 8,
      font: font,
    });
    
    page.drawText(edu.board || '', {
      x: 250,
      y,
      size: 8,
      font: font,
    });
    
    page.drawText(edu.place || '', {
      x: 350,
      y,
      size: 8,
      font: font,
    });
    
    page.drawText(edu.percentage || '', {
      x: 420,
      y,
      size: 8,
      font: font,
    });
    
    page.drawText(edu.yos || '', {
      x: 470,
      y,
      size: 8,
      font: font,
    });
    
    page.drawText(edu.yop || '', {
      x: 510,
      y,
      size: 8,
      font: font,
    });
    
    page.drawText(edu.type || '', {
      x: 540,
      y,
      size: 8,
      font: font,
    });
    
    y -= 15;
  }

  y -= 20;

  // Experience summary section
  const expSummaryX = [50, 200, 350, 450];
  const expSummaryLabels = [
    'Total Experience (Yrs.)',
    'Exp. In Considered Role (Yrs.)',
    'Exp. In Education (Yrs.)',
    'Exp. With Present Org.'
  ];
  const expSummaryValues = [
    candidateData.totalExperience || '0',
    candidateData.roleExperience || '0',
    candidateData.educationExperience || '0',
    candidateData.currentOrgExperience || '0'
  ];

  for (let i = 0; i < 4; i++) {
    page.drawText(expSummaryLabels[i], {
      x: expSummaryX[i],
      y,
      size: 9,
      font: boldFont,
    });
    page.drawText(expSummaryValues[i], {
      x: expSummaryX[i],
      y: y - 15,
      size: 9,
      font: font,
    });
  }

  y -= 40;

  // Second row of experience summary
  const expSummary2Labels = [
    'Avg. Exp. Per Organization',
    'Team Size:',
    'Notice Period:'
  ];
  const expSummary2Values = [
    candidateData.avgOrgExperience || '0',
    candidateData.teamSize || '0',
    candidateData.noticePeriod || '0'
  ];

  for (let i = 0; i < 3; i++) {
    page.drawText(expSummary2Labels[i], {
      x: 50 + (i * 200),
      y,
      size: 9,
      font: boldFont,
    });
    page.drawText(expSummary2Values[i], {
      x: 50 + (i * 200),
      y: y - 15,
      size: 9,
      font: font,
    });
  }

  y -= 50;

  // CAREER CONTOUR section - Add new page if needed
  if (y < 250) {
    page = pdfDoc.addPage([600, 850]);
    y = height - 50;
  }

  page.drawText('CAREER CONTOUR (Starting from Present Organization):', {
    x: 50,
    y,
    size: 14,
    font: boldFont,
  });
  
  y -= 30;

  // Career table headers
  const careerHeaders = ['S.No.', 'ORGANIZATION', 'DESIGNATION', 'SALARY (CTC in Lacs P.A.)', 'Duration', 'FROM', 'TO'];
  const careerHeaderX = [50, 80, 200, 300, 400, 470, 530];
  
  careerHeaders.forEach((header, index) => {
    page.drawText(header, {
      x: careerHeaderX[index],
      y,
      size: 8,
      font: boldFont,
    });
  });
  
  y -= 20;

  // Career entries
  const careerEntries = candidateData.career || [];
  for (let i = 0; i < 7; i++) {
    const career = careerEntries[i] || {};
    
    page.drawText(`${i + 1}`, {
      x: 50,
      y,
      size: 8,
      font: font,
    });
    
    page.drawText(career.organization || '', {
      x: 80,
      y,
      size: 8,
      font: font,
    });
    
    page.drawText(career.designation || '', {
      x: 200,
      y,
      size: 8,
      font: font,
    });
    
    page.drawText(career.salary || '', {
      x: 300,
      y,
      size: 8,
      font: font,
    });
    
    page.drawText(career.duration || '', {
      x: 400,
      y,
      size: 8,
      font: font,
    });
    
    page.drawText(career.from || '', {
      x: 470,
      y,
      size: 8,
      font: font,
    });
    
    page.drawText(career.to || '', {
      x: 530,
      y,
      size: 8,
      font: font,
    });
    
    y -= 15;
  }

  y -= 30;

  // ROLE/KRA section
  page.drawText('ROLE (MAJOR KRA / KP) WITH PRESENT / LAST ORGANISATION', {
    x: 50,
    y,
    size: 12,
    font: boldFont,
  });
  
  y -= 25;

  const roles = candidateData.roles || [];
  for (let i = 0; i < 3; i++) {
    page.drawText(`${i + 1}`, {
      x: 50,
      y,
      size: 10,
      font: font,
    });
    
    page.drawText(roles[i] || '', {
      x: 70,
      y,
      size: 10,
      font: font,
    });
    
    y -= 20;
  }

  y -= 20;

  // Final details section
  const finalDetails = [
    `Service Period: ${candidateData.servicePeriod || 'N/A'}`,
    `Notice Period (in Days): ${candidateData.noticePeriodDays || 'N/A'}`,
    `Reason for Leaving Previous Organization: ${candidateData.leavingReason || 'N/A'}`,
    `Present CTC: ${candidateData.presentCTC || 'N/A'}`,
    `Present per month Salary: ${candidateData.presentMonthlySalary || 'N/A'}`,
    `Any Other Compensation Benefit: ${candidateData.otherBenefits || 'N/A'}`,
    `Expected per Month Take Home Salary: ${candidateData.expectedSalary || 'N/A'}`
  ];

  finalDetails.forEach(detail => {
    if (y < 100) {
      page = pdfDoc.addPage([600, 850]);
      y = height - 50;
    }
    
    page.drawText(detail, {
      x: 50,
      y,
      size: 10,
      font: font,
    });
    
    y -= 20;
  });

  y -= 30;

  // Declaration
  page.drawText('I hereby affirm that the information furnished in this document is true and correct.', {
    x: 50,
    y,
    size: 10,
    font: font,
  });
  
  y -= 40;

  page.drawText('Sign:', {
    x: 50,
    y,
    size: 10,
    font: font,
  });
  
  page.drawText('Name:', {
    x: 200,
    y,
    size: 10,
    font: font,
  });
  
  page.drawText('Date', {
    x: 350,
    y,
    size: 10,
    font: font,
  });
  
  page.drawText('Place', {
    x: 450,
    y,
    size: 10,
    font: font,
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

// Helper function for default course names
function getDefaultCourseName(index) {
  const defaultCourses = ['X Std.', 'XII Std.', 'Graduation', 'Post Grad.', 'Others'];
  return defaultCourses[index] || '';
}

const handler = async (request, context) => {
  try {
    const { id } = context.params;
    const submission = await Candidate.getSubmissionById(id);
    
    if (!submission) {
      return new Response('Submission not found', { status: 404 });
    }

    const pdfBytes = await generatePDFForDownload(submission);
    
    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="candidate_profile_${submission.id}.pdf"`,
      },
    });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const GET = authMiddleware(handler);