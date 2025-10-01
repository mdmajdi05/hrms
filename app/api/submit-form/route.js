// import { Candidate } from '../../../models/Candidate';
// import { authMiddleware } from '../../../lib/auth';
// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// async function generatePDF(candidateData) {
//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage([600, 800]);
//   const { width, height } = page.getSize();
  
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
//   let y = height - 50;
  
//   // Title
//   page.drawText('CANDIDATE REGISTRATION FORM', {
//     x: 50,
//     y,
//     size: 18,
//     font: boldFont,
//     color: rgb(0, 0, 0.5),
//   });
  
//   y -= 40;
  
//   // Personal Information
//   page.drawText('Personal Information:', {
//     x: 50,
//     y,
//     size: 14,
//     font: boldFont,
//     color: rgb(0, 0, 0),
//   });
  
//   y -= 25;
//   const personalInfo = [
//     `Full Name: ${candidateData.fullName || 'N/A'}`,
//     `Date of Birth: ${candidateData.dob || 'N/A'}`,
//     `Gender: ${candidateData.gender || 'N/A'}`,
//     `Email: ${candidateData.email || 'N/A'}`,
//     `Phone: ${candidateData.phone || 'N/A'}`,
//   ];
  
//   personalInfo.forEach(line => {
//     page.drawText(line, { x: 60, y, size: 10, font });
//     y -= 20;
//   });
  
//   y -= 10;
  
//   // Address
//   page.drawText('Address:', {
//     x: 50,
//     y,
//     size: 14,
//     font: boldFont,
//   });
  
//   y -= 25;
//   const address = [
//     `Street: ${candidateData.street || 'N/A'}`,
//     `City: ${candidateData.city || 'N/A'}`,
//     `State: ${candidateData.state || 'N/A'}`,
//     `ZIP: ${candidateData.zip || 'N/A'}`,
//   ];
  
//   address.forEach(line => {
//     page.drawText(line, { x: 60, y, size: 10, font });
//     y -= 20;
//   });
  
//   y -= 10;
  
//   // Professional Information
//   page.drawText('Professional Information:', {
//     x: 50,
//     y,
//     size: 14,
//     font: boldFont,
//   });
  
//   y -= 25;
//   const professionalInfo = [
//     `Qualification: ${candidateData.qualification || 'N/A'}`,
//     `Experience: ${candidateData.experienceYears || '0'} years`,
//     `Current Employer: ${candidateData.currentEmployer || 'N/A'}`,
//     `Role: ${candidateData.roleAtWork || 'N/A'}`,
//     `Skills: ${candidateData.skills || 'N/A'}`,
//     `Preferred Location: ${candidateData.preferredLocation || 'N/A'}`,
//   ];
  
//   professionalInfo.forEach(line => {
//     page.drawText(line, { x: 60, y, size: 10, font });
//     y -= 20;
//   });
  
//   y -= 20;
  
//   // Declaration
//   page.drawText('Declaration:', {
//     x: 50,
//     y,
//     size: 12,
//     font: boldFont,
//   });
  
//   y -= 20;
//   page.drawText('I hereby declare that the information provided is true and correct to the best of my knowledge.', {
//     x: 60,
//     y,
//     size: 10,
//     font,
//   });
  
//   y -= 30;
//   page.drawText(`Submitted on: ${new Date().toLocaleDateString()}`, {
//     x: 60,
//     y,
//     size: 10,
//     font,
//     color: rgb(0.5, 0.5, 0.5),
//   });
  
//   const pdfBytes = await pdfDoc.save();
//   return pdfBytes;
// }

// const handler = async (request) => {
//   try {
//     const formData = await request.formData();

//     // Some front-end form fields use different names (name vs fullName, emailId vs email, mobileNo vs phone).
//     // Normalize inputs here so PDF generator and DB receive a consistent candidateData shape.
//     const parsedEducation = (() => {
//       try {
//         const raw = formData.get('education');
//         return raw ? JSON.parse(raw) : [];
//       } catch (e) {
//         return [];
//       }
//     })();

//     const parsedCareer = (() => {
//       try {
//         const raw = formData.get('careerHistory');
//         return raw ? JSON.parse(raw) : [];
//       } catch (e) {
//         return [];
//       }
//     })();

//   const candidateData = {
//       // name mapping
//       fullName: formData.get('fullName') || formData.get('name') || '',
//       // personal/demographic
//       dob: formData.get('dob') || formData.get('dateOfBirth') || '',
//       gender: formData.get('gender') || '',
//       email: formData.get('email') || formData.get('emailId') || '',
//       phone: formData.get('phone') || formData.get('mobileNo') || '',
//       // addresses
//       street: formData.get('street') || formData.get('presentAddress') || '',
//       permanentAddress: formData.get('permanentAddress') || '',
//       city: formData.get('city') || '',
//       state: formData.get('state') || '',
//       zip: formData.get('zip') || '',
//       // professional
//       qualification: formData.get('qualification') || '',
//       experienceYears: formData.get('experienceYears') || formData.get('totalExperience') || '',
//       currentEmployer: formData.get('currentEmployer') || '',
//       roleAtWork: formData.get('roleAtWork') || '',
//       skills: formData.get('skills') || '',
//       preferredLocation: formData.get('preferredLocation') || '',
//       // candidate-specific complex fields
//       education: parsedEducation,
//       careerHistory: parsedCareer,
//       // other fields
//       positionConsidered: formData.get('positionConsidered') || '',
//       dom: formData.get('dom') || '',
//       presentAddress: formData.get('presentAddress') || '',
//       totalExperience: formData.get('totalExperience') || '',
//       expInConsideredRole: formData.get('expInConsideredRole') || '',
//       // declaration stored as 'yes' or 'no' from the client
//       declaration: formData.get('declaration'),
//     };

//   // Debug: log the normalized candidate data
//   console.log('DEBUG: submit-form received candidateData:', JSON.stringify(candidateData).slice(0, 2000));

//     // Validate main required fields. CandidateForm uses 'name' so we normalized into fullName.
//     if (!candidateData.fullName || candidateData.fullName.trim() === '') {
//       return Response.json({ error: 'Name is required' }, { status: 400 });
//     }

//     if (!candidateData.declaration || candidateData.declaration !== 'yes') {
//       return Response.json({ error: 'Declaration must be accepted' }, { status: 400 });
//     }

//     const submission = await Candidate.createSubmission(candidateData, request.user.userId);
    
//     // Generate PDF
//     const pdfBytes = await generatePDF(candidateData);
    
//     // In a real application, you would save the PDF to a file system or cloud storage
//     // For demo, we'll return the PDF as base64
//     const pdfBase64 = Buffer.from(pdfBytes).toString('base64');
    
//     return Response.json({
//       message: 'Form submitted successfully',
//       id: submission.id,
//       previewUrl: `data:application/pdf;base64,${pdfBase64}`,
//       downloadUrl: `/api/download/${submission.id}`
//     });
    
//   } catch (error) {
//     console.error('Form submission error:', error);
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// };

// export const POST = authMiddleware(handler);

// app/api/submit-form/route.js
import { Candidate } from '../../../models/Candidate';
import { authMiddleware } from '../../../lib/auth';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Image processing function
async function processImage(file) {
  if (!file) return null;
  
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';
    
    return `data:${mimeType};base64,${base64Image}`;
  } catch (error) {
    console.error('Image processing error:', error);
    return null;
  }
}

async function generatePDF(candidateData, profileImageBase64 = null) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  let y = height - 50;

  // Title
  page.drawText('CANDIDATE REGISTRATION FORM', {
    x: 50,
    y,
    size: 18,
    font: boldFont,
    color: rgb(0, 0, 0.5),
  });
  
  y -= 40;

  // Add profile image if available - TOP RIGHT CORNER
  if (profileImageBase64) {
    try {
      console.log('Embedding image in PDF...');
      const imageBytes = Uint8Array.from(
        Buffer.from(profileImageBase64.split(',')[1], 'base64')
      );
      
      let image;
      if (profileImageBase64.includes('image/png')) {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        image = await pdfDoc.embedJpg(imageBytes);
      }
      
      // Resize image to fit
      const maxWidth = 80;
      const maxHeight = 80;
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
        x: width - finalWidth - 50, // Right side
        y: height - finalHeight - 50, // Top side
        width: finalWidth,
        height: finalHeight,
      });
      
      console.log('Image embedded successfully in PDF');
    } catch (error) {
      console.error('Error embedding image in PDF:', error);
      // Fallback: show text that image exists
      page.drawText('📷 Profile Photo Available', {
        x: width - 150,
        y: height - 70,
        size: 10,
        font: boldFont,
        color: rgb(0, 0.5, 0),
      });
    }
  }

  // Personal Information
  page.drawText('Personal Information:', {
    x: 50,
    y,
    size: 14,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  
  y -= 25;
  const personalInfo = [
    `Full Name: ${candidateData.fullName || 'N/A'}`,
    `Date of Birth: ${candidateData.dob || 'N/A'}`,
    `Gender: ${candidateData.gender || 'N/A'}`,
    `Email: ${candidateData.email || 'N/A'}`,
    `Phone: ${candidateData.phone || 'N/A'}`,
  ];
  
  personalInfo.forEach(line => {
    page.drawText(line, { x: 60, y, size: 10, font });
    y -= 20;
  });
  
  y -= 10;

  // Address
  page.drawText('Address:', {
    x: 50,
    y,
    size: 14,
    font: boldFont,
  });
  
  y -= 25;
  const address = [
    `Street: ${candidateData.street || 'N/A'}`,
    `City: ${candidateData.city || 'N/A'}`,
    `State: ${candidateData.state || 'N/A'}`,
    `ZIP: ${candidateData.zip || 'N/A'}`,
    `Permanent Address: ${candidateData.permanentAddress || 'Same as above'}`,
  ];
  
  address.forEach(line => {
    page.drawText(line, { x: 60, y, size: 10, font });
    y -= 20;
  });
  
  y -= 10;

  // Professional Information
  page.drawText('Professional Information:', {
    x: 50,
    y,
    size: 14,
    font: boldFont,
  });
  
  y -= 25;
  const professionalInfo = [
    `Qualification: ${candidateData.qualification || 'N/A'}`,
    `Experience: ${candidateData.experienceYears || '0'} years`,
    `Current Employer: ${candidateData.currentEmployer || 'N/A'}`,
    `Role: ${candidateData.roleAtWork || 'N/A'}`,
    `Skills: ${candidateData.skills || 'N/A'}`,
    `Preferred Location: ${candidateData.preferredLocation || 'N/A'}`,
    `Position Considered: ${candidateData.positionConsidered || 'N/A'}`,
    `Total Experience: ${candidateData.totalExperience || 'N/A'}`,
    `DOM: ${candidateData.dom || 'N/A'}`,
  ];
  
  professionalInfo.forEach(line => {
    if (y < 100) {
      // Add new page if running out of space
      const newPage = pdfDoc.addPage([600, 800]);
      y = newPage.getHeight() - 50;
    }
    page.drawText(line, { x: 60, y, size: 10, font });
    y -= 20;
  });
  
  y -= 20;

  // Education
  if (candidateData.education && candidateData.education.length > 0) {
    page.drawText('Education:', {
      x: 50,
      y,
      size: 14,
      font: boldFont,
    });
    y -= 25;
    
    candidateData.education.forEach((edu, index) => {
      if (y < 100) {
        const newPage = pdfDoc.addPage([600, 800]);
        y = newPage.getHeight() - 50;
      }
      page.drawText(`${index + 1}. ${edu}`, { x: 60, y, size: 10, font });
      y -= 15;
    });
    y -= 10;
  }

  // Career History
  if (candidateData.careerHistory && candidateData.careerHistory.length > 0) {
    page.drawText('Career History:', {
      x: 50,
      y,
      size: 14,
      font: boldFont,
    });
    y -= 25;
    
    candidateData.careerHistory.forEach((career, index) => {
      if (y < 100) {
        const newPage = pdfDoc.addPage([600, 800]);
        y = newPage.getHeight() - 50;
      }
      page.drawText(`${index + 1}. ${career}`, { x: 60, y, size: 10, font });
      y -= 15;
    });
    y -= 10;
  }

  // Declaration
  page.drawText('Declaration:', {
    x: 50,
    y,
    size: 12,
    font: boldFont,
  });
  
  y -= 20;
  page.drawText('I hereby declare that the information provided is true and correct to the best of my knowledge.', {
    x: 60,
    y,
    size: 10,
    font,
  });
  
  y -= 30;
  page.drawText(`Submitted on: ${new Date().toLocaleDateString()}`, {
    x: 60,
    y,
    size: 10,
    font,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Add signature if available
  if (candidateData.signature) {
    y -= 30;
    page.drawText(`Signature: ${candidateData.signature}`, {
      x: 60,
      y,
      size: 10,
      font: boldFont,
    });
  }
  
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

const handler = async (request) => {
  try {
    const formData = await request.formData();
    console.log('Form data received, processing image...');

    // Process profile image
    const profileImageFile = formData.get('profileImage');
    let profileImageBase64 = null;
    
    if (profileImageFile && profileImageFile.size > 0) {
      console.log('Profile image found, size:', profileImageFile.size);
      profileImageBase64 = await processImage(profileImageFile);
      if (profileImageBase64) {
        console.log('Image processed successfully, base64 length:', profileImageBase64.length);
      }
    } else {
      console.log('No profile image found');
    }

    // Parse other form data
    const parsedEducation = (() => {
      try {
        const raw = formData.get('education');
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        const raw = formData.get('education');
        return raw ? [raw] : [];
      }
    })();

    const parsedCareer = (() => {
      try {
        const raw = formData.get('careerHistory');
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        const raw = formData.get('careerHistory');
        return raw ? [raw] : [];
      }
    })();

    const candidateData = {
      // name mapping
      fullName: formData.get('fullName') || formData.get('name') || '',
      // personal/demographic
      dob: formData.get('dob') || formData.get('dateOfBirth') || '',
      gender: formData.get('gender') || '',
      email: formData.get('email') || formData.get('emailId') || '',
      phone: formData.get('phone') || formData.get('mobileNo') || '',
      // addresses
      street: formData.get('street') || formData.get('presentAddress') || '',
      permanentAddress: formData.get('permanentAddress') || '',
      city: formData.get('city') || '',
      state: formData.get('state') || '',
      zip: formData.get('zip') || '',
      // professional
      qualification: formData.get('qualification') || '',
      experienceYears: formData.get('experienceYears') || formData.get('totalExperience') || '',
      currentEmployer: formData.get('currentEmployer') || '',
      roleAtWork: formData.get('roleAtWork') || '',
      skills: formData.get('skills') || '',
      preferredLocation: formData.get('preferredLocation') || '',
      // candidate-specific complex fields
      education: parsedEducation,
      careerHistory: parsedCareer,
      // other fields
      positionConsidered: formData.get('positionConsidered') || '',
      dom: formData.get('dom') || '',
      presentAddress: formData.get('presentAddress') || '',
      totalExperience: formData.get('totalExperience') || '',
      expInConsideredRole: formData.get('expInConsideredRole') || '',
      // SECTION 2: PERSONAL DETAILS
      fatherName: formData.get('fatherName') || '',
      fatherDateOfBirth: formData.get('fatherDateOfBirth') || '',
      fatherOccupation: formData.get('fatherOccupation') || '',
      motherName: formData.get('motherName') || '',
      motherDateOfBirth: formData.get('motherDateOfBirth') || '',
      motherOccupation: formData.get('motherOccupation') || '',
      spouseName: formData.get('spouseName') || '',
      spouseDateOfBirth: formData.get('spouseDateOfBirth') || '',
      spouseOccupation: formData.get('spouseOccupation') || '',
      // SECTION 4: TOTAL EXPERIENCE & GAPS
      totalExperienceYears: formData.get('totalExperienceYears') || '',
      expWithPresentOrg: formData.get('expWithPresentOrg') || '',
      avgExpPerOrganization: formData.get('avgExpPerOrganization') || '',
      breakGapInEducationYears: formData.get('breakGapInEducationYears') || '',
      breakGapInProfCareerYears: formData.get('breakGapInProfCareerYears') || '',
      roleKcrTeam: formData.get('roleKcrTeam') || '',
      teamSize: formData.get('teamSize') || '',
      // SECTION 6: KRA/KPI
      kraKpi1: formData.get('kraKpi1') || '',
      kraKpi2: formData.get('kraKpi2') || '',
      kraKpi3: formData.get('kraKpi3') || '',
      // SECTION 7: OTHER DETAILS
      noticePeriodMonths: formData.get('noticePeriodMonths') || '',
      noticePeriodNegotiatedDays: formData.get('noticePeriodNegotiatedDays') || '',
      reasonForLeavingLastOrg: formData.get('reasonForLeavingLastOrg') || '',
      presentCtcFixedAndVariable: formData.get('presentCtcFixedAndVariable') || '',
      presentPerMonthSalary: formData.get('presentPerMonthSalary') || '',
      anyOtherCompensationBenefit: formData.get('anyOtherCompensationBenefit') || '',
      expectedCtc: formData.get('expectedCtc') || '',
      expectedPerMonthTakeHomeSalary: formData.get('expectedPerMonthTakeHomeSalary') || '',
      // SECTION 8: DECLARATION SIGNATURE
      signature: formData.get('signature') || '',
      signatureDate: formData.get('signatureDate') || '',
      signaturePlace: formData.get('signaturePlace') || '',
      // Profile image
      profileImage: profileImageBase64,
      // declaration stored as 'yes' or 'no' from the client
      declaration: formData.get('declaration'),
    };

    console.log('DEBUG: Candidate data prepared with image:', profileImageBase64 ? 'YES' : 'NO');

    // Validate main required fields
    if (!candidateData.fullName || candidateData.fullName.trim() === '') {
      return Response.json({ error: 'Name is required' }, { status: 400 });
    }

    if (!candidateData.declaration || candidateData.declaration !== 'yes') {
      return Response.json({ error: 'Declaration must be accepted' }, { status: 400 });
    }

    const submission = await Candidate.createSubmission(candidateData, request.user.userId);
    console.log('Submission saved with ID:', submission.id);
    
    // Generate PDF with image
    console.log('Generating PDF with image...');
    const pdfBytes = await generatePDF(candidateData, profileImageBase64);
    console.log('PDF generated successfully');
    
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');
    
    return Response.json({
      message: 'Form submitted successfully',
      id: submission.id,
      previewUrl: `data:application/pdf;base64,${pdfBase64}`,
      downloadUrl: `/api/download/${submission.id}`
    });
    
  } catch (error) {
    console.error('Form submission error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
};

export const POST = authMiddleware(handler);