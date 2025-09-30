import { Candidate } from '../../../models/Candidate';
import { authMiddleware } from '../../../lib/auth';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

async function generatePDF(candidateData) {
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
  ];
  
  professionalInfo.forEach(line => {
    page.drawText(line, { x: 60, y, size: 10, font });
    y -= 20;
  });
  
  y -= 20;
  
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
  
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

const handler = async (request) => {
  try {
    const formData = await request.formData();

    // Some front-end form fields use different names (name vs fullName, emailId vs email, mobileNo vs phone).
    // Normalize inputs here so PDF generator and DB receive a consistent candidateData shape.
    const parsedEducation = (() => {
      try {
        const raw = formData.get('education');
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    })();

    const parsedCareer = (() => {
      try {
        const raw = formData.get('careerHistory');
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
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
      // declaration stored as 'yes' or 'no' from the client
      declaration: formData.get('declaration'),
    };

  // Debug: log the normalized candidate data
  console.log('DEBUG: submit-form received candidateData:', JSON.stringify(candidateData).slice(0, 2000));

    // Validate main required fields. CandidateForm uses 'name' so we normalized into fullName.
    if (!candidateData.fullName || candidateData.fullName.trim() === '') {
      return Response.json({ error: 'Name is required' }, { status: 400 });
    }

    if (!candidateData.declaration || candidateData.declaration !== 'yes') {
      return Response.json({ error: 'Declaration must be accepted' }, { status: 400 });
    }

    const submission = await Candidate.createSubmission(candidateData, request.user.userId);
    
    // Generate PDF
    const pdfBytes = await generatePDF(candidateData);
    
    // In a real application, you would save the PDF to a file system or cloud storage
    // For demo, we'll return the PDF as base64
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