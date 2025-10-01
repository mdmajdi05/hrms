// import { Candidate } from '../../../../models/Candidate';
// import { authMiddleware } from '../../../../lib/auth';
// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// async function generatePDFForDownload(candidateData) {
//   const pdfDoc = await PDFDocument.create();
//   let page = pdfDoc.addPage([600, 850]);
//   let { width, height } = page.getSize();
  
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
//   let y = height - 50;

//   // COMPANY LOGO Section
//   page.drawText('COMPANY LOGO', {
//     x: 50,
//     y,
//     size: 16,
//     font: boldFont,
//     color: rgb(0, 0, 0),
//   });
  
//   y -= 40;

//   // CANDIDATE PROFILE FORM
//   page.drawText('CANDIDATE PROFILE FORM', {
//     x: 200,
//     y,
//     size: 20,
//     font: boldFont,
//     color: rgb(0, 0, 0),
//   });
  
//   y -= 50;

//   // POSITION CONSIDERED FOR
//   page.drawText('POSITION CONSIDERED FOR:', {
//     x: 50,
//     y,
//     size: 12,
//     font: boldFont,
//   });
//   page.drawText(candidateData.position || 'N/A', {
//     x: 220,
//     y,
//     size: 12,
//     font: font,
//   });
  
//   y -= 30;

//   // Two column layout for basic info
//   page.drawText('NAME:', {
//     x: 50,
//     y,
//     size: 12,
//     font: boldFont,
//   });
//   page.drawText(candidateData.fullName || 'N/A', {
//     x: 120,
//     y,
//     size: 12,
//     font: font,
//   });

//   page.drawText('MOBILE NO.:', {
//     x: 350,
//     y,
//     size: 12,
//     font: boldFont,
//   });
//   page.drawText(candidateData.phone || 'N/A', {
//     x: 430,
//     y,
//     size: 12,
//     font: font,
//   });
  
//   y -= 25;

//   page.drawText('DOM:', {
//     x: 50,
//     y,
//     size: 12,
//     font: boldFont,
//   });
//   page.drawText(candidateData.dom || 'N/A', {
//     x: 120,
//     y,
//     size: 12,
//     font: font,
//   });

//   page.drawText('EMAIL ID:', {
//     x: 350,
//     y,
//     size: 12,
//     font: boldFont,
//   });
//   page.drawText(candidateData.email || 'N/A', {
//     x: 410,
//     y,
//     size: 12,
//     font: font,
//   });
  
//   y -= 25;

//   // PRESENT ADDRESS and Photograph section
//   page.drawText('PRESENT ADDRESS:', {
//     x: 50,
//     y,
//     size: 12,
//     font: boldFont,
//   });
  
//   // Draw photograph box
//   page.drawRectangle({
//     x: 400,
//     y: y - 80,
//     width: 120,
//     height: 120,
//     borderColor: rgb(0, 0, 0),
//     borderWidth: 1,
//   });
  
//   page.drawText('Photograph', {
//     x: 430,
//     y: y - 40,
//     size: 10,
//     font: font,
//     color: rgb(0.5, 0.5, 0.5),
//   });

//   // Present address text (multi-line)
//   const presentAddress = candidateData.presentAddress || 'N/A';
//   const addressLines = presentAddress.split('\n');
//   let addressY = y - 20;
  
//   addressLines.forEach(line => {
//     page.drawText(line, {
//       x: 50,
//       y: addressY,
//       size: 10,
//       font: font,
//     });
//     addressY -= 15;
//   });
  
//   y = addressY - 20;

//   // PERMANENT ADDRESS
//   page.drawText('PERMANENT ADDRESS:', {
//     x: 50,
//     y,
//     size: 12,
//     font: boldFont,
//   });
//   page.drawText('(Passport Size)', {
//     x: 180,
//     y,
//     size: 10,
//     font: font,
//     color: rgb(0.5, 0.5, 0.5),
//   });

//   const permanentAddress = candidateData.permanentAddress || candidateData.presentAddress || 'N/A';
//   const permAddressLines = permanentAddress.split('\n');
//   let permAddressY = y - 20;
  
//   permAddressLines.forEach(line => {
//     page.drawText(line, {
//       x: 50,
//       y: permAddressY,
//       size: 10,
//       font: font,
//     });
//     permAddressY -= 15;
//   });
  
//   y = permAddressY - 30;

//   // PERSONAL DETAILS section
//   page.drawText('PERSONAL DETAILS:', {
//     x: 50,
//     y,
//     size: 14,
//     font: boldFont,
//   });
  
//   y -= 30;

//   // Personal details table headers
//   page.drawText('Name', {
//     x: 80,
//     y,
//     size: 12,
//     font: boldFont,
//   });
  
//   page.drawText('Date of Birth', {
//     x: 250,
//     y,
//     size: 12,
//     font: boldFont,
//   });
  
//   page.drawText('Occupation', {
//     x: 400,
//     y,
//     size: 12,
//     font: boldFont,
//   });
  
//   y -= 25;

//   // FATHER
//   page.drawText('1 FATHER', {
//     x: 50,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.fatherName || 'N/A', {
//     x: 80,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.fatherDOB || 'N/A', {
//     x: 250,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.fatherOccupation || 'N/A', {
//     x: 400,
//     y,
//     size: 11,
//     font: font,
//   });
  
//   y -= 20;

//   // MOTHER
//   page.drawText('2 MOTHER', {
//     x: 50,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.motherName || 'N/A', {
//     x: 80,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.motherDOB || 'N/A', {
//     x: 250,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.motherOccupation || 'N/A', {
//     x: 400,
//     y,
//     size: 11,
//     font: font,
//   });
  
//   y -= 20;

//   // SPOUSE
//   page.drawText('3 SPOUSE (If married)', {
//     x: 50,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.spouseName || 'N/A', {
//     x: 80,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.spouseDOB || 'N/A', {
//     x: 250,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.spouseOccupation || 'N/A', {
//     x: 400,
//     y,
//     size: 11,
//     font: font,
//   });

//   y -= 40;

//   // EDUCATIONAL PROGRESS - Add new page if needed
//   if (y < 150) {
//     page = pdfDoc.addPage([600, 850]);
//     y = height - 50;
//   }

//   page.drawText('EDUCATIONAL PROGRESS:', {
//     x: 50,
//     y,
//     size: 14,
//     font: boldFont,
//   });
  
//   y -= 30;

//   // Educational table headers
//   const eduHeaders = ['S.No.', 'COURSE NAME', 'SCHOOL/INST. Name', 'BOARD / UNIV.', 'Place', '% OR CGPA', 'YOS', 'YOP', 'FT/PT/DL'];
//   const eduHeaderX = [50, 80, 150, 250, 350, 420, 470, 510, 540];
  
//   eduHeaders.forEach((header, index) => {
//     page.drawText(header, {
//       x: eduHeaderX[index],
//       y,
//       size: 8,
//       font: boldFont,
//     });
//   });
  
//   y -= 20;

//   // Educational entries
//   const educationEntries = candidateData.education || [];
//   for (let i = 0; i < 5; i++) {
//     const edu = educationEntries[i] || {};
    
//     page.drawText(`${i + 1}`, {
//       x: 50,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(edu.courseName || getDefaultCourseName(i) || '', {
//       x: 80,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(edu.institution || '', {
//       x: 150,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(edu.board || '', {
//       x: 250,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(edu.place || '', {
//       x: 350,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(edu.percentage || '', {
//       x: 420,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(edu.yos || '', {
//       x: 470,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(edu.yop || '', {
//       x: 510,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(edu.type || '', {
//       x: 540,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     y -= 15;
//   }

//   y -= 20;

//   // Experience summary section
//   const expSummaryX = [50, 200, 350, 450];
//   const expSummaryLabels = [
//     'Total Experience (Yrs.)',
//     'Exp. In Considered Role (Yrs.)',
//     'Exp. In Education (Yrs.)',
//     'Exp. With Present Org.'
//   ];
//   const expSummaryValues = [
//     candidateData.totalExperience || '0',
//     candidateData.roleExperience || '0',
//     candidateData.educationExperience || '0',
//     candidateData.currentOrgExperience || '0'
//   ];

//   for (let i = 0; i < 4; i++) {
//     page.drawText(expSummaryLabels[i], {
//       x: expSummaryX[i],
//       y,
//       size: 9,
//       font: boldFont,
//     });
//     page.drawText(expSummaryValues[i], {
//       x: expSummaryX[i],
//       y: y - 15,
//       size: 9,
//       font: font,
//     });
//   }

//   y -= 40;

//   // Second row of experience summary
//   const expSummary2Labels = [
//     'Avg. Exp. Per Organization',
//     'Team Size:',
//     'Notice Period:'
//   ];
//   const expSummary2Values = [
//     candidateData.avgOrgExperience || '0',
//     candidateData.teamSize || '0',
//     candidateData.noticePeriod || '0'
//   ];

//   for (let i = 0; i < 3; i++) {
//     page.drawText(expSummary2Labels[i], {
//       x: 50 + (i * 200),
//       y,
//       size: 9,
//       font: boldFont,
//     });
//     page.drawText(expSummary2Values[i], {
//       x: 50 + (i * 200),
//       y: y - 15,
//       size: 9,
//       font: font,
//     });
//   }

//   y -= 50;

//   // CAREER CONTOUR section - Add new page if needed
//   if (y < 250) {
//     page = pdfDoc.addPage([600, 850]);
//     y = height - 50;
//   }

//   page.drawText('CAREER CONTOUR (Starting from Present Organization):', {
//     x: 50,
//     y,
//     size: 14,
//     font: boldFont,
//   });
  
//   y -= 30;

//   // Career table headers
//   const careerHeaders = ['S.No.', 'ORGANIZATION', 'DESIGNATION', 'SALARY (CTC in Lacs P.A.)', 'Duration', 'FROM', 'TO'];
//   const careerHeaderX = [50, 80, 200, 300, 400, 470, 530];
  
//   careerHeaders.forEach((header, index) => {
//     page.drawText(header, {
//       x: careerHeaderX[index],
//       y,
//       size: 8,
//       font: boldFont,
//     });
//   });
  
//   y -= 20;

//   // Career entries
//   const careerEntries = candidateData.career || [];
//   for (let i = 0; i < 7; i++) {
//     const career = careerEntries[i] || {};
    
//     page.drawText(`${i + 1}`, {
//       x: 50,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(career.organization || '', {
//       x: 80,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(career.designation || '', {
//       x: 200,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(career.salary || '', {
//       x: 300,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(career.duration || '', {
//       x: 400,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(career.from || '', {
//       x: 470,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(career.to || '', {
//       x: 530,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     y -= 15;
//   }

//   y -= 30;

//   // ROLE/KRA section
//   page.drawText('ROLE (MAJOR KRA / KP) WITH PRESENT / LAST ORGANISATION', {
//     x: 50,
//     y,
//     size: 12,
//     font: boldFont,
//   });
  
//   y -= 25;

//   const roles = candidateData.roles || [];
//   for (let i = 0; i < 3; i++) {
//     page.drawText(`${i + 1}`, {
//       x: 50,
//       y,
//       size: 10,
//       font: font,
//     });
    
//     page.drawText(roles[i] || '', {
//       x: 70,
//       y,
//       size: 10,
//       font: font,
//     });
    
//     y -= 20;
//   }

//   y -= 20;

//   // Final details section
//   const finalDetails = [
//     `Service Period: ${candidateData.servicePeriod || 'N/A'}`,
//     `Notice Period (in Days): ${candidateData.noticePeriodDays || 'N/A'}`,
//     `Reason for Leaving Previous Organization: ${candidateData.leavingReason || 'N/A'}`,
//     `Present CTC: ${candidateData.presentCTC || 'N/A'}`,
//     `Present per month Salary: ${candidateData.presentMonthlySalary || 'N/A'}`,
//     `Any Other Compensation Benefit: ${candidateData.otherBenefits || 'N/A'}`,
//     `Expected per Month Take Home Salary: ${candidateData.expectedSalary || 'N/A'}`
//   ];

//   finalDetails.forEach(detail => {
//     if (y < 100) {
//       page = pdfDoc.addPage([600, 850]);
//       y = height - 50;
//     }
    
//     page.drawText(detail, {
//       x: 50,
//       y,
//       size: 10,
//       font: font,
//     });
    
//     y -= 20;
//   });

//   y -= 30;

//   // Declaration
//   page.drawText('I hereby affirm that the information furnished in this document is true and correct.', {
//     x: 50,
//     y,
//     size: 10,
//     font: font,
//   });
  
//   y -= 40;

//   page.drawText('Sign:', {
//     x: 50,
//     y,
//     size: 10,
//     font: font,
//   });
  
//   page.drawText('Name:', {
//     x: 200,
//     y,
//     size: 10,
//     font: font,
//   });
  
//   page.drawText('Date', {
//     x: 350,
//     y,
//     size: 10,
//     font: font,
//   });
  
//   page.drawText('Place', {
//     x: 450,
//     y,
//     size: 10,
//     font: font,
//   });

//   const pdfBytes = await pdfDoc.save();
//   return pdfBytes;
// }

// // Helper function for default course names
// function getDefaultCourseName(index) {
//   const defaultCourses = ['X Std.', 'XII Std.', 'Graduation', 'Post Grad.', 'Others'];
//   return defaultCourses[index] || '';
// }

// const handler = async (request, context) => {
//   try {
//     const { id } = context.params;
//     const submission = await Candidate.getSubmissionById(id);
    
//     if (!submission) {
//       return new Response('Submission not found', { status: 404 });
//     }

//     const pdfBytes = await generatePDFForDownload(submission);
    
//     return new Response(pdfBytes, {
//       headers: {
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': `attachment; filename="candidate_profile_${submission.id}.pdf"`,
//       },
//     });
//   } catch (error) {
//     return new Response(error.message, { status: 500 });
//   }
// };

// export const GET = authMiddleware(handler);

// app/api/download/[id]/route.js




//2nd



// import { Candidate } from '../../../../models/Candidate';
// import { authMiddleware } from '../../../../lib/auth';
// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// async function generatePDFForDownload(candidateData) {
//   const pdfDoc = await PDFDocument.create();
//   let page = pdfDoc.addPage([600, 850]);
//   let { width, height } = page.getSize();
  
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
//   let y = height - 50;

//   // COMPANY LOGO Section
//   page.drawText('COMPANY LOGO', {
//     x: 50,
//     y,
//     size: 16,
//     font: boldFont,
//     color: rgb(0, 0, 0),
//   });
  
//   y -= 40;

//   // CANDIDATE PROFILE FORM
//   page.drawText('CANDIDATE PROFILE FORM', {
//     x: 200,
//     y,
//     size: 20,
//     font: boldFont,
//     color: rgb(0, 0, 0),
//   });
  
//   y -= 50;

//   // Add profile image if available - PHOTOGRAPH SECTION
//   if (candidateData.profileImage) {
//     try {
//       console.log('Embedding image in download PDF...');
//       const imageBytes = Uint8Array.from(
//         Buffer.from(candidateData.profileImage.split(',')[1], 'base64')
//       );
      
//       let image;
//       if (candidateData.profileImage.includes('image/png')) {
//         image = await pdfDoc.embedPng(imageBytes);
//       } else {
//         image = await pdfDoc.embedJpg(imageBytes);
//       }
      
//       // Draw image in photograph box
//       const maxWidth = 120;
//       const maxHeight = 120;
//       const { width: imgWidth, height: imgHeight } = image.scale(1);
      
//       let finalWidth = imgWidth;
//       let finalHeight = imgHeight;
      
//       if (imgWidth > maxWidth) {
//         const ratio = maxWidth / imgWidth;
//         finalWidth = maxWidth;
//         finalHeight = imgHeight * ratio;
//       }
      
//       if (finalHeight > maxHeight) {
//         const ratio = maxHeight / finalHeight;
//         finalHeight = maxHeight;
//         finalWidth = finalWidth * ratio;
//       }
      
//       page.drawImage(image, {
//         x: 400,
//         y: y - 80,
//         width: finalWidth,
//         height: finalHeight,
//       });
      
//       console.log('Image embedded successfully in download PDF');
//     } catch (error) {
//       console.error('Error embedding image in download PDF:', error);
//       // Fallback: draw empty box
//       page.drawRectangle({
//         x: 400,
//         y: y - 80,
//         width: 120,
//         height: 120,
//         borderColor: rgb(0, 0, 0),
//         borderWidth: 1,
//       });
//       page.drawText('Photograph', {
//         x: 430,
//         y: y - 40,
//         size: 10,
//         font: font,
//         color: rgb(0.5, 0.5, 0.5),
//       });
//     }
//   } else {
//     // Draw empty photograph box
//     page.drawRectangle({
//       x: 400,
//       y: y - 80,
//       width: 120,
//       height: 120,
//       borderColor: rgb(0, 0, 0),
//       borderWidth: 1,
//     });
//     page.drawText('Photograph', {
//       x: 430,
//       y: y - 40,
//       size: 10,
//       font: font,
//       color: rgb(0.5, 0.5, 0.5),
//     });
//   }

//   // POSITION CONSIDERED FOR
//   page.drawText('POSITION CONSIDERED FOR:', {
//     x: 50,
//     y,
//     size: 12,
//     font: boldFont,
//   });
//   page.drawText(candidateData.positionConsidered || 'N/A', {
//     x: 220,
//     y,
//     size: 12,
//     font: font,
//   });
  
//   y -= 30;

//   // Two column layout for basic info
//   page.drawText('NAME:', {
//     x: 50,
//     y,
//     size: 12,
//     font: boldFont,
//   });
//   page.drawText(candidateData.fullName || 'N/A', {
//     x: 120,
//     y,
//     size: 12,
//     font: font,
//   });

//   page.drawText('MOBILE NO.:', {
//     x: 350,
//     y,
//     size: 12,
//     font: boldFont,
//   });
//   page.drawText(candidateData.phone || 'N/A', {
//     x: 430,
//     y,
//     size: 12,
//     font: font,
//   });
  
//   y -= 25;

//   page.drawText('DOM:', {
//     x: 50,
//     y,
//     size: 12,
//     font: boldFont,
//   });
//   page.drawText(candidateData.dom || 'N/A', {
//     x: 120,
//     y,
//     size: 12,
//     font: font,
//   });

//   page.drawText('EMAIL ID:', {
//     x: 350,
//     y,
//     size: 12,
//     font: boldFont,
//   });
//   page.drawText(candidateData.email || 'N/A', {
//     x: 410,
//     y,
//     size: 12,
//     font: font,
//   });
  
//   y -= 25;

//   // PRESENT ADDRESS section
//   page.drawText('PRESENT ADDRESS:', {
//     x: 50,
//     y,
//     size: 12,
//     font: boldFont,
//   });

//   // Present address text (multi-line)
//   const presentAddress = candidateData.street || 'N/A';
//   const addressLines = presentAddress.split('\n');
//   let addressY = y - 20;
  
//   addressLines.forEach(line => {
//     page.drawText(line, {
//       x: 50,
//       y: addressY,
//       size: 10,
//       font: font,
//     });
//     addressY -= 15;
//   });
  
//   y = addressY - 20;

//   // PERMANENT ADDRESS
//   page.drawText('PERMANENT ADDRESS:', {
//     x: 50,
//     y,
//     size: 12,
//     font: boldFont,
//   });

//   const permanentAddress = candidateData.permanentAddress || candidateData.street || 'N/A';
//   const permAddressLines = permanentAddress.split('\n');
//   let permAddressY = y - 20;
  
//   permAddressLines.forEach(line => {
//     page.drawText(line, {
//       x: 50,
//       y: permAddressY,
//       size: 10,
//       font: font,
//     });
//     permAddressY -= 15;
//   });
  
//   y = permAddressY - 30;

//   // PERSONAL DETAILS section
//   page.drawText('PERSONAL DETAILS:', {
//     x: 50,
//     y,
//     size: 14,
//     font: boldFont,
//   });
  
//   y -= 30;

//   // Personal details table headers
//   page.drawText('Name', {
//     x: 80,
//     y,
//     size: 12,
//     font: boldFont,
//   });
  
//   page.drawText('Date of Birth', {
//     x: 250,
//     y,
//     size: 12,
//     font: boldFont,
//   });
  
//   page.drawText('Occupation', {
//     x: 400,
//     y,
//     size: 12,
//     font: boldFont,
//   });
  
//   y -= 25;

//   // FATHER
//   page.drawText('1 FATHER', {
//     x: 50,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.fatherName || 'N/A', {
//     x: 80,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.fatherDateOfBirth || 'N/A', {
//     x: 250,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.fatherOccupation || 'N/A', {
//     x: 400,
//     y,
//     size: 11,
//     font: font,
//   });
  
//   y -= 20;

//   // MOTHER
//   page.drawText('2 MOTHER', {
//     x: 50,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.motherName || 'N/A', {
//     x: 80,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.motherDateOfBirth || 'N/A', {
//     x: 250,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.motherOccupation || 'N/A', {
//     x: 400,
//     y,
//     size: 11,
//     font: font,
//   });
  
//   y -= 20;

//   // SPOUSE
//   page.drawText('3 SPOUSE (If married)', {
//     x: 50,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.spouseName || 'N/A', {
//     x: 80,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.spouseDateOfBirth || 'N/A', {
//     x: 250,
//     y,
//     size: 11,
//     font: font,
//   });
//   page.drawText(candidateData.spouseOccupation || 'N/A', {
//     x: 400,
//     y,
//     size: 11,
//     font: font,
//   });

//   y -= 40;

//   // EDUCATIONAL PROGRESS - Add new page if needed
//   if (y < 150) {
//     page = pdfDoc.addPage([600, 850]);
//     y = height - 50;
//   }

//   page.drawText('EDUCATIONAL PROGRESS:', {
//     x: 50,
//     y,
//     size: 14,
//     font: boldFont,
//   });
  
//   y -= 30;

//   // Educational table headers
//   const eduHeaders = ['S.No.', 'COURSE NAME', 'SCHOOL/INST. Name', 'BOARD / UNIV.', 'Place', '% OR CGPA', 'YOS', 'YOP', 'FT/PT/DL'];
//   const eduHeaderX = [50, 80, 150, 250, 350, 420, 470, 510, 540];
  
//   eduHeaders.forEach((header, index) => {
//     page.drawText(header, {
//       x: eduHeaderX[index],
//       y,
//       size: 8,
//       font: boldFont,
//     });
//   });
  
//   y -= 20;

//   // Educational entries
//   const educationEntries = candidateData.education || [];
//   for (let i = 0; i < 5; i++) {
//     const edu = educationEntries[i] || {};
    
//     page.drawText(`${i + 1}`, {
//       x: 50,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     // Parse education data from string if needed
//     let courseName = '';
//     if (typeof edu === 'string') {
//       const parts = edu.split(' - ');
//       courseName = parts[0] || '';
//     } else {
//       courseName = edu.courseName || getDefaultCourseName(i) || '';
//     }
    
//     page.drawText(courseName, {
//       x: 80,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(typeof edu === 'string' ? edu : edu.institution || '', {
//       x: 150,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(typeof edu === 'string' ? '' : edu.board || '', {
//       x: 250,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(typeof edu === 'string' ? '' : edu.place || '', {
//       x: 350,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(typeof edu === 'string' ? '' : edu.percentage || '', {
//       x: 420,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(typeof edu === 'string' ? '' : edu.yos || '', {
//       x: 470,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(typeof edu === 'string' ? '' : edu.yop || '', {
//       x: 510,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(typeof edu === 'string' ? '' : edu.type || '', {
//       x: 540,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     y -= 15;
//   }

//   y -= 20;

//   // Experience summary section
//   const expSummaryX = [50, 200, 350, 450];
//   const expSummaryLabels = [
//     'Total Experience (Yrs.)',
//     'Exp. In Considered Role (Yrs.)',
//     'Break in Education (Yrs.)',
//     'Exp. With Present Org.'
//   ];
//   const expSummaryValues = [
//     candidateData.totalExperienceYears || candidateData.totalExperience || '0',
//     candidateData.expInConsideredRole || '0',
//     candidateData.breakGapInEducationYears || '0',
//     candidateData.expWithPresentOrg || '0'
//   ];

//   for (let i = 0; i < 4; i++) {
//     page.drawText(expSummaryLabels[i], {
//       x: expSummaryX[i],
//       y,
//       size: 9,
//       font: boldFont,
//     });
//     page.drawText(expSummaryValues[i], {
//       x: expSummaryX[i],
//       y: y - 15,
//       size: 9,
//       font: font,
//     });
//   }

//   y -= 40;

//   // Second row of experience summary
//   const expSummary2Labels = [
//     'Avg. Exp. Per Organization',
//     'Team Size:',
//     'Notice Period:',
//     'Break in Career:'
//   ];
//   const expSummary2Values = [
//     candidateData.avgExpPerOrganization || '0',
//     candidateData.teamSize || '0',
//     candidateData.noticePeriodMonths || '0',
//     candidateData.breakGapInProfCareerYears || '0'
//   ];

//   for (let i = 0; i < 4; i++) {
//     page.drawText(expSummary2Labels[i], {
//       x: 50 + (i * 140),
//       y,
//       size: 9,
//       font: boldFont,
//     });
//     page.drawText(expSummary2Values[i], {
//       x: 50 + (i * 140),
//       y: y - 15,
//       size: 9,
//       font: font,
//     });
//   }

//   y -= 50;

//   // CAREER CONTOUR section - Add new page if needed
//   if (y < 250) {
//     page = pdfDoc.addPage([600, 850]);
//     y = height - 50;
//   }

//   page.drawText('CAREER CONTOUR (Starting from Present Organization):', {
//     x: 50,
//     y,
//     size: 14,
//     font: boldFont,
//   });
  
//   y -= 30;

//   // Career table headers
//   const careerHeaders = ['S.No.', 'ORGANIZATION', 'DESIGNATION', 'SALARY (CTC in Lacs P.A.)', 'Duration', 'FROM', 'TO'];
//   const careerHeaderX = [50, 80, 200, 300, 400, 470, 530];
  
//   careerHeaders.forEach((header, index) => {
//     page.drawText(header, {
//       x: careerHeaderX[index],
//       y,
//       size: 8,
//       font: boldFont,
//     });
//   });
  
//   y -= 20;

//   // Career entries
//   const careerEntries = candidateData.careerHistory || [];
//   for (let i = 0; i < 7; i++) {
//     const career = careerEntries[i] || {};
    
//     page.drawText(`${i + 1}`, {
//       x: 50,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     // Parse career data from string if needed
//     let organization = '';
//     let designation = '';
    
//     if (typeof career === 'string') {
//       const parts = career.split(' - ');
//       organization = parts[0] || '';
//       designation = parts[1] || '';
//     } else {
//       organization = career.organization || '';
//       designation = career.designation || '';
//     }
    
//     page.drawText(organization, {
//       x: 80,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(designation, {
//       x: 200,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(typeof career === 'string' ? '' : career.salary || '', {
//       x: 300,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(typeof career === 'string' ? '' : career.duration || '', {
//       x: 400,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(typeof career === 'string' ? '' : career.from || '', {
//       x: 470,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     page.drawText(typeof career === 'string' ? '' : career.to || '', {
//       x: 530,
//       y,
//       size: 8,
//       font: font,
//     });
    
//     y -= 15;
//   }

//   y -= 30;

//   // ROLE/KRA section
//   page.drawText('ROLE (MAJOR KRA / KP) WITH PRESENT / LAST ORGANISATION', {
//     x: 50,
//     y,
//     size: 12,
//     font: boldFont,
//   });
  
//   y -= 25;

//   const roles = [
//     candidateData.kraKpi1 || '',
//     candidateData.kraKpi2 || '',
//     candidateData.kraKpi3 || ''
//   ];
  
//   for (let i = 0; i < 3; i++) {
//     if (roles[i]) {
//       page.drawText(`${i + 1}`, {
//         x: 50,
//         y,
//         size: 10,
//         font: font,
//       });
      
//       page.drawText(roles[i], {
//         x: 70,
//         y,
//         size: 10,
//         font: font,
//       });
      
//       y -= 20;
//     }
//   }

//   y -= 20;

//   // Final details section
//   const finalDetails = [
//     `Service Period: ${candidateData.expWithPresentOrg || 'N/A'}`,
//     `Notice Period (in Days): ${candidateData.noticePeriodNegotiatedDays || candidateData.noticePeriodMonths || 'N/A'}`,
//     `Reason for Leaving Previous Organization: ${candidateData.reasonForLeavingLastOrg || 'N/A'}`,
//     `Present CTC: ${candidateData.presentCtcFixedAndVariable || 'N/A'}`,
//     `Present per month Salary: ${candidateData.presentPerMonthSalary || 'N/A'}`,
//     `Any Other Compensation Benefit: ${candidateData.anyOtherCompensationBenefit || 'N/A'}`,
//     `Expected CTC: ${candidateData.expectedCtc || 'N/A'}`,
//     `Expected per Month Take Home Salary: ${candidateData.expectedPerMonthTakeHomeSalary || 'N/A'}`
//   ];

//   finalDetails.forEach(detail => {
//     if (y < 100) {
//       page = pdfDoc.addPage([600, 850]);
//       y = height - 50;
//     }
    
//     page.drawText(detail, {
//       x: 50,
//       y,
//       size: 10,
//       font: font,
//     });
    
//     y -= 20;
//   });

//   y -= 30;

//   // Declaration
//   page.drawText('I hereby affirm that the information furnished in this document is true and correct.', {
//     x: 50,
//     y,
//     size: 10,
//     font: font,
//   });
  
//   y -= 40;

//   // Signature section
//   page.drawText('Sign:', {
//     x: 50,
//     y,
//     size: 10,
//     font: font,
//   });
  
//   page.drawText(candidateData.signature || '________________', {
//     x: 90,
//     y,
//     size: 10,
//     font: boldFont,
//   });
  
//   page.drawText('Date:', {
//     x: 250,
//     y,
//     size: 10,
//     font: font,
//   });
  
//   page.drawText(candidateData.signatureDate || new Date().toLocaleDateString(), {
//     x: 290,
//     y,
//     size: 10,
//     font: font,
//   });
  
//   page.drawText('Place:', {
//     x: 450,
//     y,
//     size: 10,
//     font: font,
//   });
  
//   page.drawText(candidateData.signaturePlace || '________________', {
//     x: 490,
//     y,
//     size: 10,
//     font: font,
//   });

//   const pdfBytes = await pdfDoc.save();
//   return pdfBytes;
// }

// // Helper function for default course names
// function getDefaultCourseName(index) {
//   const defaultCourses = ['X Std.', 'XII Std.', 'Graduation', 'Post Grad.', 'Others'];
//   return defaultCourses[index] || '';
// }

// const handler = async (request, context) => {
//   try {
//     const { id } = context.params;
//     console.log('Download request for ID:', id);
    
//     // Auth check - get user from request
//     const user = request.user;
//     if (!user) {
//       return new Response('Unauthorized', { status: 401 });
//     }
    
//     const submission = await Candidate.getSubmissionById(id);
    
//     if (!submission) {
//       return new Response('Submission not found', { status: 404 });
//     }

//     // Check if user has permission to download this submission
//     if (submission.userId !== user.userId && user.role !== 'admin' && user.role !== 'hr') {
//       return new Response('Access denied', { status: 403 });
//     }

//     console.log('Submission found, generating PDF with image:', submission.profileImage ? 'YES' : 'NO');
//     const pdfBytes = await generatePDFForDownload(submission);
    
//     return new Response(pdfBytes, {
//       headers: {
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': `attachment; filename="candidate_profile_${submission.id}.pdf"`,
//         'Cache-Control': 'no-cache, no-store, must-revalidate',
//         'Pragma': 'no-cache',
//         'Expires': '0'
//       },
//     });
//   } catch (error) {
//     console.error('Download error:', error);
//     return new Response(error.message, { status: 500 });
//   }
// };

// export const GET = authMiddleware(handler);


// app/api/download/[id]/route.js







//3nd

// import { Candidate } from '../../../../models/Candidate';
// import { authMiddleware } from '../../../../lib/auth';
// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// async function generatePDFForDownload(candidateData) {
//   const pdfDoc = await PDFDocument.create();
//   let page = pdfDoc.addPage([600, 850]);
//   let { width, height } = page.getSize();
  
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
//   let y = height - 50;

//   // COMPANY LOGO Section with border
//   page.drawRectangle({
//     x: 40,
//     y: y - 10,
//     width: 520,
//     height: 60,
//     borderColor: rgb(0, 0, 0),
//     borderWidth: 2,
//   });

//   page.drawText('COMPANY LOGO', {
//     x: 250,
//     y: y + 10,
//     size: 16,
//     font: boldFont,
//     color: rgb(0, 0, 0),
//   });
  
//   y -= 80;

//   // CANDIDATE PROFILE FORM with underline
//   page.drawText('CANDIDATE PROFILE FORM', {
//     x: 180,
//     y,
//     size: 18,
//     font: boldFont,
//     color: rgb(0, 0, 0),
//   });

//   // Underline
//   page.drawLine({
//     start: { x: 180, y: y - 5 },
//     end: { x: 420, y: y - 5 },
//     thickness: 1,
//     color: rgb(0, 0, 0),
//   });
  
//   y -= 50;

//   // Main container with border
//   page.drawRectangle({
//     x: 40,
//     y: y - 650,
//     width: 520,
//     height: 700,
//     borderColor: rgb(0, 0, 0),
//     borderWidth: 1,
//   });

//   // POSITION CONSIDERED FOR with background
//   page.drawRectangle({
//     x: 50,
//     y: y - 15,
//     width: 500,
//     height: 25,
//     color: rgb(0.9, 0.9, 0.9),
//   });

//   page.drawText('POSITION CONSIDERED FOR:', {
//     x: 60,
//     y: y - 10,
//     size: 12,
//     font: boldFont,
//   });

//   page.drawText(candidateData.positionConsidered || 'N/A', {
//     x: 220,
//     y: y - 10,
//     size: 12,
//     font: font,
//   });
  
//   y -= 40;

//   // Two column layout for basic info with borders
//   const drawFieldWithBorder = (label, value, x, y, width = 220) => {
//     // Field background
//     page.drawRectangle({
//       x: x,
//       y: y - 15,
//       width: width,
//       height: 20,
//       borderColor: rgb(0.7, 0.7, 0.7),
//       borderWidth: 0.5,
//     });

//     page.drawText(label, {
//       x: x + 5,
//       y: y - 10,
//       size: 10,
//       font: boldFont,
//     });

//     page.drawText(value || 'N/A', {
//       x: x + 80,
//       y: y - 10,
//       size: 10,
//       font: font,
//     });
//   };

//   // First row - NAME and MOBILE NO
//   drawFieldWithBorder('NAME:', candidateData.fullName, 50, y, 220);
//   drawFieldWithBorder('MOBILE NO:', candidateData.phone, 300, y, 220);
  
//   y -= 30;

//   // Second row - DOM and EMAIL ID
//   drawFieldWithBorder('DOM:', candidateData.dom, 50, y, 220);
//   drawFieldWithBorder('EMAIL ID:', candidateData.email, 300, y, 220);
  
//   y -= 40;

//   // PRESENT ADDRESS section with proper styling
//   page.drawText('PRESENT ADDRESS:', {
//     x: 50,
//     y,
//     size: 11,
//     font: boldFont,
//   });

//   // Address box
//   page.drawRectangle({
//     x: 50,
//     y: y - 80,
//     width: 250,
//     height: 70,
//     borderColor: rgb(0.7, 0.7, 0.7),
//     borderWidth: 0.5,
//   });

//   // Photograph box with better styling
//   page.drawRectangle({
//     x: 350,
//     y: y - 80,
//     width: 120,
//     height: 120,
//     borderColor: rgb(0, 0, 0),
//     borderWidth: 1,
//   });

//   page.drawText('Photograph', {
//     x: 375,
//     y: y - 40,
//     size: 10,
//     font: font,
//     color: rgb(0.5, 0.5, 0.5),
//   });

//   // Add profile image if available
//   if (candidateData.profileImage) {
//     try {
//       const imageBytes = Uint8Array.from(
//         Buffer.from(candidateData.profileImage.split(',')[1], 'base64')
//       );
      
//       let image;
//       if (candidateData.profileImage.includes('image/png')) {
//         image = await pdfDoc.embedPng(imageBytes);
//       } else {
//         image = await pdfDoc.embedJpg(imageBytes);
//       }
      
//       const maxWidth = 110;
//       const maxHeight = 110;
//       const { width: imgWidth, height: imgHeight } = image.scale(1);
      
//       let finalWidth = imgWidth;
//       let finalHeight = imgHeight;
      
//       if (imgWidth > maxWidth) {
//         const ratio = maxWidth / imgWidth;
//         finalWidth = maxWidth;
//         finalHeight = imgHeight * ratio;
//       }
      
//       if (finalHeight > maxHeight) {
//         const ratio = maxHeight / finalHeight;
//         finalHeight = maxHeight;
//         finalWidth = finalWidth * ratio;
//       }
      
//       page.drawImage(image, {
//         x: 355 + (110 - finalWidth) / 2,
//         y: y - 75 + (110 - finalHeight) / 2,
//         width: finalWidth,
//         height: finalHeight,
//       });
//     } catch (error) {
//       console.error('Error embedding image:', error);
//     }
//   }

//   // Present address text
//   const presentAddress = candidateData.street || 'N/A';
//   const addressLines = presentAddress.split('\n');
//   let addressY = y - 25;
  
//   addressLines.forEach(line => {
//     if (line.trim()) {
//       page.drawText(line, {
//         x: 55,
//         y: addressY,
//         size: 9,
//         font: font,
//       });
//       addressY -= 12;
//     }
//   });
  
//   y -= 130;

//   // PERMANENT ADDRESS
//   page.drawText('PERMANENT ADDRESS:', {
//     x: 50,
//     y,
//     size: 11,
//     font: boldFont,
//   });

//   page.drawText('(Passport Size)', {
//     x: 180,
//     y,
//     size: 8,
//     font: font,
//     color: rgb(0.5, 0.5, 0.5),
//   });

//   // Permanent address box
//   page.drawRectangle({
//     x: 50,
//     y: y - 80,
//     width: 420,
//     height: 70,
//     borderColor: rgb(0.7, 0.7, 0.7),
//     borderWidth: 0.5,
//   });

//   const permanentAddress = candidateData.permanentAddress || candidateData.street || 'N/A';
//   const permAddressLines = permanentAddress.split('\n');
//   let permAddressY = y - 25;
  
//   permAddressLines.forEach(line => {
//     if (line.trim()) {
//       page.drawText(line, {
//         x: 55,
//         y: permAddressY,
//         size: 9,
//         font: font,
//       });
//       permAddressY -= 12;
//     }
//   });
  
//   y -= 110;

//   // PERSONAL DETAILS section with background
//   page.drawRectangle({
//     x: 50,
//     y: y - 15,
//     width: 500,
//     height: 25,
//     color: rgb(0.9, 0.9, 0.9),
//   });

//   page.drawText('PERSONAL DETAILS:', {
//     x: 200,
//     y: y - 10,
//     size: 12,
//     font: boldFont,
//   });
  
//   y -= 40;

//   // Personal details table with proper borders
//   const drawTableHeader = () => {
//     // Header background
//     page.drawRectangle({
//       x: 50,
//       y: y + 5,
//       width: 500,
//       height: 20,
//       color: rgb(0.8, 0.8, 0.8),
//     });

//     const headers = ['', 'Name', 'Date of Birth', 'Occupation'];
//     const headerX = [60, 120, 280, 420];
    
//     headers.forEach((header, index) => {
//       page.drawText(header, {
//         x: headerX[index],
//         y: y + 10,
//         size: 10,
//         font: boldFont,
//       });
//     });

//     // Horizontal lines
//     page.drawLine({
//       start: { x: 50, y: y + 5 },
//       end: { x: 550, y: y + 5 },
//       thickness: 0.5,
//       color: rgb(0, 0, 0),
//     });

//     page.drawLine({
//       start: { x: 50, y: y - 45 },
//       end: { x: 550, y: y - 45 },
//       thickness: 0.5,
//       color: rgb(0, 0, 0),
//     });

//     // Vertical lines
//     [50, 110, 270, 410, 550].forEach(x => {
//       page.drawLine({
//         start: { x: x, y: y + 25 },
//         end: { x: x, y: y - 45 },
//         thickness: 0.5,
//         color: rgb(0, 0, 0),
//       });
//     });
//   };

//   drawTableHeader();
  
//   y -= 20;

//   // FATHER
//   page.drawText('1 FATHER', {
//     x: 60,
//     y,
//     size: 10,
//     font: font,
//   });
//   page.drawText(candidateData.fatherName || 'N/A', {
//     x: 120,
//     y,
//     size: 10,
//     font: font,
//   });
//   page.drawText(candidateData.fatherDateOfBirth || 'N/A', {
//     x: 280,
//     y,
//     size: 10,
//     font: font,
//   });
//   page.drawText(candidateData.fatherOccupation || 'N/A', {
//     x: 420,
//     y,
//     size: 10,
//     font: font,
//   });
  
//   y -= 20;

//   // MOTHER
//   page.drawText('2 MOTHER', {
//     x: 60,
//     y,
//     size: 10,
//     font: font,
//   });
//   page.drawText(candidateData.motherName || 'N/A', {
//     x: 120,
//     y,
//     size: 10,
//     font: font,
//   });
//   page.drawText(candidateData.motherDateOfBirth || 'N/A', {
//     x: 280,
//     y,
//     size: 10,
//     font: font,
//   });
//   page.drawText(candidateData.motherOccupation || 'N/A', {
//     x: 420,
//     y,
//     size: 10,
//     font: font,
//   });
  
//   y -= 20;

//   // SPOUSE
//   page.drawText('3 SPOUSE (If married)', {
//     x: 60,
//     y,
//     size: 10,
//     font: font,
//   });
//   page.drawText(candidateData.spouseName || 'N/A', {
//     x: 120,
//     y,
//     size: 10,
//     font: font,
//   });
//   page.drawText(candidateData.spouseDateOfBirth || 'N/A', {
//     x: 280,
//     y,
//     size: 10,
//     font: font,
//   });
//   page.drawText(candidateData.spouseOccupation || 'N/A', {
//     x: 420,
//     y,
//     size: 10,
//     font: font,
//   });

//   y -= 50;

//   // EDUCATIONAL PROGRESS - Add new page if needed
//   if (y < 150) {
//     page = pdfDoc.addPage([600, 850]);
//     y = height - 50;
    
//     // Main container for new page
//     page.drawRectangle({
//       x: 40,
//       y: y - 650,
//       width: 520,
//       height: 700,
//       borderColor: rgb(0, 0, 0),
//       borderWidth: 1,
//     });
//   }

//   // EDUCATIONAL PROGRESS header with background
//   page.drawRectangle({
//     x: 50,
//     y: y - 15,
//     width: 500,
//     height: 25,
//     color: rgb(0.9, 0.9, 0.9),
//   });

//   page.drawText('EDUCATIONAL PROGRESS:', {
//     x: 200,
//     y: y - 10,
//     size: 12,
//     font: boldFont,
//   });
  
//   y -= 40;

//   // Educational table with proper styling
//   const drawEducationTable = () => {
//     // Table header background
//     page.drawRectangle({
//       x: 50,
//       y: y + 5,
//       width: 500,
//       height: 20,
//       color: rgb(0.8, 0.8, 0.8),
//     });

//     const eduHeaders = ['S.No.', 'COURSE NAME', 'SCHOOL/INST. Name', 'BOARD / UNIV.', 'Place', '% OR CGPA', 'YOS', 'YOP', 'FT/PT/DL'];
//     const eduHeaderX = [55, 80, 150, 240, 320, 380, 430, 470, 510];
    
//     eduHeaders.forEach((header, index) => {
//       page.drawText(header, {
//         x: eduHeaderX[index],
//         y: y + 10,
//         size: 7,
//         font: boldFont,
//       });
//     });

//     // Table borders
//     page.drawRectangle({
//       x: 50,
//       y: y - 70,
//       width: 500,
//       height: 95,
//       borderColor: rgb(0, 0, 0),
//       borderWidth: 0.5,
//     });

//     // Vertical lines
//     [50, 75, 145, 235, 315, 375, 425, 465, 505, 550].forEach(x => {
//       page.drawLine({
//         start: { x: x, y: y + 25 },
//         end: { x: x, y: y - 70 },
//         thickness: 0.3,
//         color: rgb(0, 0, 0),
//       });
//     });

//     // Horizontal lines
//     for (let i = 0; i <= 5; i++) {
//       const lineY = y + 25 - (i * 15);
//       page.drawLine({
//         start: { x: 50, y: lineY },
//         end: { x: 550, y: lineY },
//         thickness: 0.3,
//         color: rgb(0, 0, 0),
//       });
//     }
//   };

//   drawEducationTable();
  
//   y -= 15;

//   // Educational entries
//   const educationEntries = candidateData.education || [];
//   for (let i = 0; i < 5; i++) {
//     const edu = educationEntries[i] || {};
    
//     let courseName = '';
//     if (typeof edu === 'string') {
//       const parts = edu.split(' - ');
//       courseName = parts[0] || '';
//     } else {
//       courseName = edu.courseName || getDefaultCourseName(i) || '';
//     }

//     const eduData = [
//       `${i + 1}`,
//       courseName,
//       typeof edu === 'string' ? edu : edu.institution || '',
//       typeof edu === 'string' ? '' : edu.board || '',
//       typeof edu === 'string' ? '' : edu.place || '',
//       typeof edu === 'string' ? '' : edu.percentage || '',
//       typeof edu === 'string' ? '' : edu.yos || '',
//       typeof edu === 'string' ? '' : edu.yop || '',
//       typeof edu === 'string' ? '' : edu.type || ''
//     ];

//     const eduX = [55, 80, 150, 240, 320, 380, 430, 470, 510];
    
//     eduData.forEach((text, index) => {
//       page.drawText(text, {
//         x: eduX[index],
//         y,
//         size: 7,
//         font: font,
//       });
//     });
    
//     y -= 15;
//   }

//   y -= 30;

//   // Experience summary section with grid layout
//   const drawExperienceGrid = () => {
//     const experiences = [
//       { label: 'Total Experience (Yrs.)', value: candidateData.totalExperienceYears || '0' },
//       { label: 'Exp. In Considered Role (Yrs.)', value: candidateData.expInConsideredRole || '0' },
//       { label: 'Break in Education (Yrs.)', value: candidateData.breakGapInEducationYears || '0' },
//       { label: 'Exp. With Present Org.', value: candidateData.expWithPresentOrg || '0' },
//       { label: 'Avg. Exp. Per Organization', value: candidateData.avgExpPerOrganization || '0' },
//       { label: 'Team Size:', value: candidateData.teamSize || '0' },
//       { label: 'Notice Period:', value: candidateData.noticePeriodMonths || '0' },
//       { label: 'Break in Career:', value: candidateData.breakGapInProfCareerYears || '0' }
//     ];

//     // Draw grid background
//     page.drawRectangle({
//       x: 50,
//       y: y - 40,
//       width: 500,
//       height: 50,
//       borderColor: rgb(0.7, 0.7, 0.7),
//       borderWidth: 0.5,
//     });

//     // Vertical lines
//     [50, 175, 300, 425, 550].forEach(x => {
//       page.drawLine({
//         start: { x: x, y: y + 10 },
//         end: { x: x, y: y - 40 },
//         thickness: 0.3,
//         color: rgb(0.7, 0.7, 0.7),
//       });
//     });

//     // Horizontal line
//     page.drawLine({
//       start: { x: 50, y: y - 15 },
//       end: { x: 550, y: y - 15 },
//       thickness: 0.3,
//       color: rgb(0.7, 0.7, 0.7),
//     });

//     // Draw labels and values
//     experiences.forEach((exp, index) => {
//       const row = Math.floor(index / 4);
//       const col = index % 4;
//       const x = 55 + col * 125;
//       const currentY = y - (row * 25);

//       page.drawText(exp.label, {
//         x,
//         y: currentY,
//         size: 8,
//         font: boldFont,
//       });

//       page.drawText(exp.value, {
//         x,
//         y: currentY - 12,
//         size: 9,
//         font: font,
//       });
//     });
//   };

//   drawExperienceGrid();
  
//   y -= 70;

//   // CAREER CONTOUR section - Add new page if needed
//   if (y < 250) {
//     page = pdfDoc.addPage([600, 850]);
//     y = height - 50;
    
//     // Main container for new page
//     page.drawRectangle({
//       x: 40,
//       y: y - 650,
//       width: 520,
//       height: 700,
//       borderColor: rgb(0, 0, 0),
//       borderWidth: 1,
//     });
//   }

//   // CAREER CONTOUR header with background
//   page.drawRectangle({
//     x: 50,
//     y: y - 15,
//     width: 500,
//     height: 25,
//     color: rgb(0.9, 0.9, 0.9),
//   });

//   page.drawText('CAREER CONTOUR (Starting from Present Organization):', {
//     x: 120,
//     y: y - 10,
//     size: 12,
//     font: boldFont,
//   });
  
//   y -= 40;

//   // Career table with proper styling
//   const drawCareerTable = () => {
//     // Table header background
//     page.drawRectangle({
//       x: 50,
//       y: y + 5,
//       width: 500,
//       height: 20,
//       color: rgb(0.8, 0.8, 0.8),
//     });

//     const careerHeaders = ['S.No.', 'ORGANIZATION', 'DESIGNATION', 'SALARY (CTC in Lacs P.A.)', 'Duration', 'FROM', 'TO'];
//     const careerHeaderX = [55, 80, 200, 300, 400, 460, 510];
    
//     careerHeaders.forEach((header, index) => {
//       page.drawText(header, {
//         x: careerHeaderX[index],
//         y: y + 10,
//         size: 8,
//         font: boldFont,
//       });
//     });

//     // Table borders
//     page.drawRectangle({
//       x: 50,
//       y: y - 100,
//       width: 500,
//       height: 125,
//       borderColor: rgb(0, 0, 0),
//       borderWidth: 0.5,
//     });

//     // Vertical lines
//     [50, 75, 195, 295, 395, 455, 505, 550].forEach(x => {
//       page.drawLine({
//         start: { x: x, y: y + 25 },
//         end: { x: x, y: y - 100 },
//         thickness: 0.3,
//         color: rgb(0, 0, 0),
//       });
//     });

//     // Horizontal lines
//     for (let i = 0; i <= 7; i++) {
//       const lineY = y + 25 - (i * 15);
//       page.drawLine({
//         start: { x: 50, y: lineY },
//         end: { x: 550, y: lineY },
//         thickness: 0.3,
//         color: rgb(0, 0, 0),
//       });
//     }
//   };

//   drawCareerTable();
  
//   y -= 15;

//   // Career entries
//   const careerEntries = candidateData.careerHistory || [];
//   for (let i = 0; i < 7; i++) {
//     const career = careerEntries[i] || {};
    
//     let organization = '';
//     let designation = '';
    
//     if (typeof career === 'string') {
//       const parts = career.split(' - ');
//       organization = parts[0] || '';
//       designation = parts[1] || '';
//     } else {
//       organization = career.organization || '';
//       designation = career.designation || '';
//     }

//     const careerData = [
//       `${i + 1}`,
//       organization,
//       designation,
//       typeof career === 'string' ? '' : career.salary || '',
//       typeof career === 'string' ? '' : career.duration || '',
//       typeof career === 'string' ? '' : career.from || '',
//       typeof career === 'string' ? '' : career.to || ''
//     ];

//     const careerX = [55, 80, 200, 300, 400, 460, 510];
    
//     careerData.forEach((text, index) => {
//       page.drawText(text, {
//         x: careerX[index],
//         y,
//         size: 8,
//         font: font,
//       });
//     });
    
//     y -= 15;
//   }

//   y -= 30;

//   // ROLE/KRA section with proper styling
//   page.drawRectangle({
//     x: 50,
//     y: y - 15,
//     width: 500,
//     height: 25,
//     color: rgb(0.9, 0.9, 0.9),
//   });

//   page.drawText('ROLE (MAJOR KRA / KP) WITH PRESENT / LAST ORGANISATION', {
//     x: 100,
//     y: y - 10,
//     size: 11,
//     font: boldFont,
//   });
  
//   y -= 40;

//   const roles = [
//     candidateData.kraKpi1 || '',
//     candidateData.kraKpi2 || '',
//     candidateData.kraKpi3 || ''
//   ];
  
//   // KRA boxes
//   roles.forEach((role, index) => {
//     if (role) {
//       page.drawRectangle({
//         x: 50,
//         y: y - 15,
//         width: 500,
//         height: 20,
//         borderColor: rgb(0.7, 0.7, 0.7),
//         borderWidth: 0.5,
//       });

//       page.drawText(`${index + 1}`, {
//         x: 55,
//         y: y - 10,
//         size: 9,
//         font: boldFont,
//       });
      
//       page.drawText(role, {
//         x: 75,
//         y: y - 10,
//         size: 9,
//         font: font,
//       });
      
//       y -= 30;
//     }
//   });

//   y -= 20;

//   // Final details section with proper formatting
//   const finalDetails = [
//     { label: 'Service Period:', value: candidateData.expWithPresentOrg || 'N/A' },
//     { label: 'Notice Period (in Days):', value: candidateData.noticePeriodNegotiatedDays || candidateData.noticePeriodMonths || 'N/A' },
//     { label: 'Reason for Leaving Previous Organization:', value: candidateData.reasonForLeavingLastOrg || 'N/A' },
//     { label: 'Present CTC:', value: candidateData.presentCtcFixedAndVariable || 'N/A' },
//     { label: 'Present per month Salary:', value: candidateData.presentPerMonthSalary || 'N/A' },
//     { label: 'Any Other Compensation Benefit:', value: candidateData.anyOtherCompensationBenefit || 'N/A' },
//     { label: 'Expected CTC:', value: candidateData.expectedCtc || 'N/A' },
//     { label: 'Expected per Month Take Home Salary:', value: candidateData.expectedPerMonthTakeHomeSalary || 'N/A' }
//   ];

//   finalDetails.forEach(detail => {
//     if (y < 100) {
//       page = pdfDoc.addPage([600, 850]);
//       y = height - 50;
      
//       // Main container for new page
//       page.drawRectangle({
//         x: 40,
//         y: y - 650,
//         width: 520,
//         height: 700,
//         borderColor: rgb(0, 0, 0),
//         borderWidth: 1,
//       });
//     }
    
//     page.drawText(detail.label, {
//       x: 50,
//       y,
//       size: 9,
//       font: boldFont,
//     });
    
//     page.drawText(detail.value, {
//       x: 250,
//       y,
//       size: 9,
//       font: font,
//     });
    
//     y -= 20;
//   });

//   y -= 30;

//   // Declaration with signature boxes
//   page.drawText('I hereby affirm that the information furnished in this document is true and correct.', {
//     x: 50,
//     y,
//     size: 10,
//     font: font,
//   });
  
//   y -= 50;

//   // Signature section with boxes
//   const signatureFields = [
//     { label: 'Sign:', value: candidateData.signature, x: 50, width: 120 },
//     { label: 'Name:', value: candidateData.fullName, x: 200, width: 150 },
//     { label: 'Date', value: candidateData.signatureDate, x: 380, width: 80 },
//     { label: 'Place', value: candidateData.signaturePlace, x: 480, width: 70 }
//   ];

//   signatureFields.forEach(field => {
//     // Signature box
//     page.drawRectangle({
//       x: field.x,
//       y: y - 15,
//       width: field.width,
//       height: 20,
//       borderColor: rgb(0, 0, 0),
//       borderWidth: 0.5,
//     });

//     page.drawText(field.label, {
//       x: field.x + 5,
//       y: y - 10,
//       size: 9,
//       font: font,
//     });

//     if (field.value) {
//       page.drawText(field.value, {
//         x: field.x + 35,
//         y: y - 10,
//         size: 9,
//         font: font,
//       });
//     }
//   });

//   const pdfBytes = await pdfDoc.save();
//   return pdfBytes;
// }

// // Helper function for default course names
// function getDefaultCourseName(index) {
//   const defaultCourses = ['X Std.', 'XII Std.', 'Graduation', 'Post Grad.', 'Others'];
//   return defaultCourses[index] || '';
// }

// const handler = async (request, context) => {
//   try {
//     const { id } = context.params;
//     console.log('Download request for ID:', id);
    
//     const user = request.user;
//     if (!user) {
//       return new Response('Unauthorized', { status: 401 });
//     }
    
//     const submission = await Candidate.getSubmissionById(id);
    
//     if (!submission) {
//       return new Response('Submission not found', { status: 404 });
//     }

//     if (submission.userId !== user.userId && user.role !== 'admin' && user.role !== 'hr') {
//       return new Response('Access denied', { status: 403 });
//     }

//     console.log('Generating professional PDF...');
//     const pdfBytes = await generatePDFForDownload(submission);
    
//     return new Response(pdfBytes, {
//       headers: {
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': `attachment; filename="candidate_profile_${submission.id}.pdf"`,
//         'Cache-Control': 'no-cache, no-store, must-revalidate',
//         'Pragma': 'no-cache',
//         'Expires': '0'
//       },
//     });
//   } catch (error) {
//     console.error('Download error:', error);
//     return new Response(error.message, { status: 500 });
//   }
// };

// export const GET = authMiddleware(handler);}


import { Candidate } from '../../../../models/Candidate';
import { authMiddleware } from '../../../../lib/auth';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

async function generatePDFForDownload(candidateData) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([600, 850]);
  let { width, height } = page.getSize();
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const smallFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  let y = height - 40;

  // Header Section
  const drawHeader = () => {
    // Company Header
    page.drawRectangle({
      x: 40,
      y: y - 25,
      width: 520,
      height: 35,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
      color: rgb(0.9, 0.9, 0.9),
    });

    page.drawText('COMPANY LOGO', {
      x: 250,
      y: y - 15,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    y -= 55;

    // Main Title
    page.drawText('CANDIDATE PROFILE FORM', {
      x: 180,
      y,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    // Underline
    page.drawLine({
      start: { x: 180, y: y - 5 },
      end: { x: 420, y: y - 5 },
      thickness: 2,
      color: rgb(0, 0, 0),
    });
    
    y -= 40;
  };

  drawHeader();

  // Main Container
  page.drawRectangle({
    x: 40,
    y: y - 650,
    width: 520,
    height: 680,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  });

  // Position Section
  const drawPositionSection = () => {
    page.drawRectangle({
      x: 50,
      y: y - 15,
      width: 500,
      height: 25,
      color: rgb(0.8, 0.8, 0.8),
    });

    page.drawText('POSITION CONSIDERED FOR:', {
      x: 180,
      y: y - 10,
      size: 12,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(candidateData.positionConsidered || 'N/A', {
      x: 50,
      y: y - 35,
      size: 12,
      font: boldFont,
      color: rgb(0.2, 0.2, 0.2),
    });
    
    y -= 60;
  };

  drawPositionSection();

  // Personal Information Table
  const drawPersonalInfoTable = () => {
    const personalInfo = [
      { label: 'NAME:', value: candidateData.fullName || 'N/A' },
      { label: 'MOBILE NO:', value: candidateData.phone || 'N/A' },
      { label: 'DOM:', value: candidateData.dom || 'N/A' },
      { label: 'EMAIL ID:', value: candidateData.email || 'N/A' }
    ];

    // Draw table with 2 columns and 2 rows
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        const index = i * 2 + j;
        const x = 50 + j * 250;
        const cellY = y - (i * 25);

        // Cell background
        page.drawRectangle({
          x: x,
          y: cellY - 20,
          width: 250,
          height: 25,
          borderColor: rgb(0.6, 0.6, 0.6),
          borderWidth: 0.5,
        });

        if (personalInfo[index]) {
          // Label
          page.drawText(personalInfo[index].label, {
            x: x + 5,
            y: cellY - 15,
            size: 9,
            font: boldFont,
            color: rgb(0, 0, 0),
          });

          // Value
          page.drawText(personalInfo[index].value, {
            x: x + 80,
            y: cellY - 15,
            size: 9,
            font: font,
            color: rgb(0.2, 0.2, 0.2),
          });
        }
      }
    }

    y -= 70;
  };

  drawPersonalInfoTable();

  // Address and Photo Section
  const drawAddressAndPhoto = async () => {
    // Present Address Header
    page.drawText('PRESENT ADDRESS:', {
      x: 50,
      y,
      size: 10,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    // Present Address Box
    page.drawRectangle({
      x: 50,
      y: y - 80,
      width: 250,
      height: 70,
      borderColor: rgb(0.6, 0.6, 0.6),
      borderWidth: 0.5,
    });

    // Photo Box
    page.drawRectangle({
      x: 420,
      y: y - 100,
      width: 120,
      height: 120,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });

    page.drawText('Photograph', {
      x: 450,
      y: y - 40,
      size: 9,
      font: font,
      color: rgb(0.5, 0.5, 0.5),
    });

    // Add profile image if available
    if (candidateData.profileImage) {
      try {
        const imageBytes = Uint8Array.from(
          Buffer.from(candidateData.profileImage.split(',')[1], 'base64')
        );
        
        let image;
        if (candidateData.profileImage.includes('image/png')) {
          image = await pdfDoc.embedPng(imageBytes);
        } else {
          image = await pdfDoc.embedJpg(imageBytes);
        }
        
        const maxWidth = 110;
        const maxHeight = 110;
        const { width: imgWidth, height: imgHeight } = image.scale(1);
        
        let finalWidth = imgWidth;
        let finalHeight = imgHeight;
        
        if (imgWidth > maxWidth) {
          const ratio = maxWidth / imgWidth;
          finalWidth = maxWidth;
          finalHeight = imgHeight * ratio;
        }
        
        if (finalHeight > maxHeight) {
          const ratio = maxHeight / finalHeight;
          finalHeight = maxHeight;
          finalWidth = finalWidth * ratio;
        }
        
        page.drawImage(image, {
          x: 425 + (110 - finalWidth) / 2,
          y: y - 95 + (110 - finalHeight) / 2,
          width: finalWidth,
          height: finalHeight,
        });
      } catch (error) {
        console.error('Error embedding image:', error);
      }
    }

    // Present Address Text
    const presentAddress = candidateData.street || 'N/A';
    const addressLines = presentAddress.split('\n');
    let addressY = y - 25;
    
    addressLines.forEach(line => {
      if (line.trim()) {
        page.drawText(line, {
          x: 55,
          y: addressY,
          size: 8,
          font: font,
        });
        addressY -= 12;
      }
    });

    y -= 130;

    // Permanent Address Header
    page.drawText('PERMANENT ADDRESS:', {
      x: 50,
      y,
      size: 10,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    // page.drawText('(Passport Size)', {
    //   x: 180,
    //   y,
    //   size: 8,
    //   font: font,
    //   color: rgb(0.5, 0.5, 0.5),
    // });

    // Permanent Address Box
    page.drawRectangle({
      x: 50,
      y: y - 80,
      width: 390,
      height: 70,
      borderColor: rgb(0.6, 0.6, 0.6),
      borderWidth: 0.5,
    });

    const permanentAddress = candidateData.permanentAddress || candidateData.street || 'N/A';
    const permAddressLines = permanentAddress.split('\n');
    let permAddressY = y - 25;
    
    permAddressLines.forEach(line => {
      if (line.trim()) {
        page.drawText(line, {
          x: 55,
          y: permAddressY,
          size: 8,
          font: font,
        });
        permAddressY -= 12;
      }
    });
    
    y -= 110;
  };

  await drawAddressAndPhoto();

  // Family Details Table
  const drawFamilyTable = () => {
    // Section Header
    page.drawRectangle({
      x: 50,
      y: y - 15,
      width: 500,
      height: 25,
      color: rgb(0.8, 0.8, 0.8),
    });

    page.drawText('PERSONAL DETAILS:', {
      x: 200,
      y: y - 10,
      size: 12,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    
    y -= 40;

    // Table Headers
    const headers = ['', 'Name', 'Date of Birth', 'Occupation'];
    const headerWidths = [60, 160, 110, 170];
    let headerX = 50;

    // Header Background
    page.drawRectangle({
      x: 50,
      y: y + 5,
      width: 500,
      height: 20,
      color: rgb(0.7, 0.7, 0.7),
    });

    // Draw Headers
    headers.forEach((header, index) => {
      page.drawText(header, {
        x: headerX + 5,
        y: y + 10,
        size: 9,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      headerX += headerWidths[index];
    });

    y -= 15;

    // Family Data
    const familyData = [
      { relation: '1 FATHER', name: candidateData.fatherName, dob: candidateData.fatherDateOfBirth, occupation: candidateData.fatherOccupation },
      { relation: '2 MOTHER', name: candidateData.motherName, dob: candidateData.motherDateOfBirth, occupation: candidateData.motherOccupation },
      { relation: '3 SPOUSE (If)', name: candidateData.spouseName, dob: candidateData.spouseDateOfBirth, occupation: candidateData.spouseOccupation }
    ];

    // Draw Rows
    familyData.forEach((row, rowIndex) => {
      let cellX = 50;
      
      // Alternate row background
      if (rowIndex % 2 === 0) {
        page.drawRectangle({
          x: 50,
          y: y - 5,
          width: 500,
          height: 20,
          color: rgb(0.95, 0.95, 0.95),
        });
      }

      // Draw cells
      const rowValues = [row.relation, row.name || 'N/A', row.dob || 'N/A', row.occupation || 'N/A'];
      
      headerWidths.forEach((width, colIndex) => {
        // Cell border
        page.drawRectangle({
          x: cellX,
          y: y - 5,
          width: width,
          height: 20,
          borderColor: rgb(0.6, 0.6, 0.6),
          borderWidth: 0.3,
        });

        // Cell content
        page.drawText(rowValues[colIndex], {
          x: cellX + 3,
          y: y,
          size: 8,
          font: colIndex === 0 ? boldFont : font,
          color: rgb(0.2, 0.2, 0.2),
        });

        cellX += width;
      });

      y -= 20;
    });

    y -= 30;
  };

  drawFamilyTable();

  // Education Table
  const drawEducationTable = () => {
    // Section Header
    page.drawRectangle({
      x: 50,
      y: y - 15,
      width: 500,
      height: 25,
      color: rgb(0.8, 0.8, 0.8),
    });

    page.drawText('EDUCATIONAL PROGRESS:', {
      x: 180,
      y: y - 10,
      size: 12,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    
    y -= 40;

    // Table Headers
    const eduHeaders = ['S.No.', 'COURSE NAME', 'SCHOOL/INST. Name', 'BOARD / UNIV.', 'Place', '% OR CGPA', 'YOS', 'YOP', 'FT/PT/DL'];
    const eduWidths = [25, 65, 90, 85, 45, 50, 25, 25, 40];
    let headerX = 50;

    // Header Background
    page.drawRectangle({
      x: 50,
      y: y + 5,
      width: 500,
      height: 20,
      color: rgb(0.7, 0.7, 0.7),
    });

    // Draw Headers
    eduHeaders.forEach((header, index) => {
      page.drawText(header, {
        x: headerX + 2,
        y: y + 10,
        size: 6,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      headerX += eduWidths[index];
    });

    y -= 15;

    // Education Data
    const educationEntries = candidateData.education || [];
    
    // Draw 5 rows for education
    for (let i = 0; i < 5; i++) {
      const edu = educationEntries[i] || {};
      
      let courseName = '';
      if (typeof edu === 'string') {
        const parts = edu.split(' - ');
        courseName = parts[0] || '';
      } else {
        courseName = edu.courseName || getDefaultCourseName(i) || '';
      }

      const eduData = [
        `${i + 1}`,
        courseName,
        typeof edu === 'string' ? edu : edu.institution || '',
        typeof edu === 'string' ? '' : edu.board || '',
        typeof edu === 'string' ? '' : edu.place || '',
        typeof edu === 'string' ? '' : edu.percentage || '',
        typeof edu === 'string' ? '' : edu.yos || '',
        typeof edu === 'string' ? '' : edu.yop || '',
        typeof edu === 'string' ? '' : edu.type || ''
      ];

      let cellX = 50;

      // Alternate row background
      if (i % 2 === 0) {
        page.drawRectangle({
          x: 50,
          y: y - 5,
          width: 500,
          height: 15,
          color: rgb(0.95, 0.95, 0.95),
        });
      }

      // Draw cells
      eduWidths.forEach((width, colIndex) => {
        // Cell border
        page.drawRectangle({
          x: cellX,
          y: y - 5,
          width: width,
          height: 15,
          borderColor: rgb(0.6, 0.6, 0.6),
          borderWidth: 0.2,
        });

        // Cell content
        page.drawText(eduData[colIndex] || '', {
          x: cellX + 2,
          y: y,
          size: 6,
          font: font,
          color: rgb(0.2, 0.2, 0.2),
        });

        cellX += width;
      });

      y -= 15;
    }

    y -= 25;
  };

  drawEducationTable();

  // Experience Summary Grid
  const drawExperienceGrid = () => {
    const experiences = [
      { label: 'Total Experience (Yrs.)', value: candidateData.totalExperienceYears || '0' },
      { label: 'Exp. In Considered Role (Yrs.)', value: candidateData.expInConsideredRole || '0' },
      { label: 'Break in Education (Yrs.)', value: candidateData.breakGapInEducationYears || '0' },
      { label: 'Exp. With Present Org.', value: candidateData.expWithPresentOrg || '0' },
      { label: 'Avg. Exp. Per Organization', value: candidateData.avgExpPerOrganization || '0' },
      { label: 'Team Size:', value: candidateData.teamSize || '0' },
      { label: 'Notice Period:', value: candidateData.noticePeriodMonths || '0' },
      { label: 'Break in Career:', value: candidateData.breakGapInProfCareerYears || '0' }
    ];

    // Draw 4x2 grid
    experiences.forEach((exp, index) => {
      const row = Math.floor(index / 4);
      const col = index % 4;
      const x = 50 + col * 125;
      const currentY = y - (row * 25);

      // Cell background
      page.drawRectangle({
        x: x,
        y: currentY - 18,
        width: 125,
        height: 20,
        borderColor: rgb(0.6, 0.6, 0.6),
        borderWidth: 0.3,
      });

      // Label
      page.drawText(exp.label, {
        x: x + 3,
        y: currentY - 8,
        size: 7,
        font: boldFont,
        color: rgb(0.2, 0.2, 0.2),
      });

      // Value
      page.drawText(exp.value, {
        x: x + 3,
        y: currentY - 15,
        size: 8,
        font: font,
        color: rgb(0, 0, 0),
      });
    });

    y -= 60;
  };

  drawExperienceGrid();

  // Career History Table (on new page if needed)
  if (y < 250) {
    page = pdfDoc.addPage([600, 850]);
    y = height - 40;
    drawHeader();
    page.drawRectangle({
      x: 40,
      y: y - 650,
      width: 520,
      height: 680,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });
    y -= 60;
  }

  const drawCareerTable = () => {
    // Section Header
    page.drawRectangle({
      x: 50,
      y: y - 15,
      width: 500,
      height: 25,
      color: rgb(0.8, 0.8, 0.8),
    });

    page.drawText('CAREER CONTOUR (Starting from Present Organization):', {
      x: 100,
      y: y - 10,
      size: 11,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    
    y -= 40;

    // Table Headers
    const careerHeaders = ['S.No.', 'ORGANIZATION', 'DESIGNATION', 'SALARY (CTC in Lacs P.A.)', 'Duration', 'FROM', 'TO'];
    const careerWidths = [25, 115, 100, 100, 55, 45, 60];
    let headerX = 50;

    // Header Background
    page.drawRectangle({
      x: 50,
      y: y + 5,
      width: 500,
      height: 20,
      color: rgb(0.7, 0.7, 0.7),
    });

    // Draw Headers
    careerHeaders.forEach((header, index) => {
      page.drawText(header, {
        x: headerX + 2,
        y: y + 10,
        size: 7,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      headerX += careerWidths[index];
    });

    y -= 15;

    // Career Data
    const careerEntries = candidateData.careerHistory || [];
    
    // Draw 7 rows for career history
    for (let i = 0; i < 7; i++) {
      const career = careerEntries[i] || {};
      
      let organization = '';
      let designation = '';
      
      if (typeof career === 'string') {
        const parts = career.split(' - ');
        organization = parts[0] || '';
        designation = parts[1] || '';
      } else {
        organization = career.organization || '';
        designation = career.designation || '';
      }

      const careerData = [
        `${i + 1}`,
        organization,
        designation,
        typeof career === 'string' ? '' : career.salary || '',
        typeof career === 'string' ? '' : career.duration || '',
        typeof career === 'string' ? '' : career.from || '',
        typeof career === 'string' ? '' : career.to || ''
      ];

      let cellX = 50;

      // Alternate row background
      if (i % 2 === 0) {
        page.drawRectangle({
          x: 50,
          y: y - 5,
          width: 500,
          height: 15,
          color: rgb(0.95, 0.95, 0.95),
        });
      }

      // Draw cells
      careerWidths.forEach((width, colIndex) => {
        // Cell border
        page.drawRectangle({
          x: cellX,
          y: y - 5,
          width: width,
          height: 15,
          borderColor: rgb(0.6, 0.6, 0.6),
          borderWidth: 0.2,
        });

        // Cell content
        page.drawText(careerData[colIndex] || '', {
          x: cellX + 2,
          y: y,
          size: 7,
          font: font,
          color: rgb(0.2, 0.2, 0.2),
        });

        cellX += width;
      });

      y -= 15;
    }

    y -= 25;
  };

  drawCareerTable();

  // Final Details Section
  const drawFinalDetails = () => {
    const finalDetails = [
      { label: 'Service Period:', value: candidateData.expWithPresentOrg || 'N/A' },
      { label: 'Notice Period (in Days):', value: candidateData.noticePeriodNegotiatedDays || candidateData.noticePeriodMonths || 'N/A' },
      { label: 'Reason for Leaving Previous Organization:', value: candidateData.reasonForLeavingLastOrg || 'N/A' },
      { label: 'Present CTC:', value: candidateData.presentCtcFixedAndVariable || 'N/A' },
      { label: 'Present per month Salary:', value: candidateData.presentPerMonthSalary || 'N/A' },
      { label: 'Any Other Compensation Benefit:', value: candidateData.anyOtherCompensationBenefit || 'N/A' },
      { label: 'Expected CTC:', value: candidateData.expectedCtc || 'N/A' },
      { label: 'Expected per Month Take Home Salary:', value: candidateData.expectedPerMonthTakeHomeSalary || 'N/A' }
    ];

    finalDetails.forEach(detail => {
      if (y < 100) {
        page = pdfDoc.addPage([600, 850]);
        y = height - 40;
        drawHeader();
      }
      
      // Label
      page.drawText(detail.label, {
        x: 50,
        y,
        size: 9,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      
      // Value with underline
      page.drawText(detail.value, {
        x: 250,
        y,
        size: 9,
        font: font,
        color: rgb(0.2, 0.2, 0.2),
      });
      
      y -= 20;
    });

    y -= 20;

    // Declaration
    page.drawText('I hereby affirm that the information furnished in this document is true and correct.', {
      x: 50,
      y,
      size: 9,
      font: font,
      color: rgb(0, 0, 0),
    });
    
    y -= 40;

    // Signature Section
    const signatureFields = [
      { label: 'Sign:', x: 50, width: 100 },
      { label: 'Name:', x: 170, width: 150 },
      { label: 'Date', x: 340, width: 80 },
      { label: 'Place', x: 440, width: 70 }
    ];

    signatureFields.forEach(field => {
      // Signature box
      page.drawRectangle({
        x: field.x,
        y: y - 15,
        width: field.width,
        height: 20,
        borderColor: rgb(0, 0, 0),
        borderWidth: 0.5,
      });

      page.drawText(field.label, {
        x: field.x + 5,
        y: y - 10,
        size: 9,
        font: font,
        color: rgb(0, 0, 0),
      });
    });
  };

  drawFinalDetails();

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
    console.log('Download request for ID:', id);
    
    const user = request.user;
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    const submission = await Candidate.getSubmissionById(id);
    
    if (!submission) {
      return new Response('Submission not found', { status: 404 });
    }

    if (submission.userId !== user.userId && user.role !== 'admin' && user.role !== 'hr') {
      return new Response('Access denied', { status: 403 });
    }

    console.log('Generating professional PDF...');
    const pdfBytes = await generatePDFForDownload(submission);
    
    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="candidate_profile_${submission.id}.pdf"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return new Response(error.message, { status: 500 });
  }
};

export const GET = authMiddleware(handler);