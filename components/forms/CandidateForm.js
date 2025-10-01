// 'use client';
// import { useState } from 'react';
// function CandidateForm({ onSuccess, onError }) {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     qualification: '',
//     experienceYears: '',
//     skills: '',
//     declaration: false,
//     profileImage: null, // Image field add kiya
//     // additional personal fields
//     dob: '',
//     gender: '',
//     street: '',
//     city: '',
//     state: '',
//     zip: '',
//     permanentAddress: '',
//     // professional fields
//     currentEmployer: '',
//     roleAtWork: '',
//     preferredLocation: '',
//     positionConsidered: '',
//     totalExperience: '',
//     expInConsideredRole: '',
//     dom: '',
//     // complex/multi entries
//     education: [], // array of strings
//     careerHistory: [] // array of strings
//   });
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [downloadUrl, setDownloadUrl] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.fullName) {
//       onError('Full name is required');
//       return;
//     }

//     if (!formData.declaration) {
//       onError('Please accept the declaration');
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const formDataToSend = new FormData();

//       // Image upload handle karo
//       if (formData.profileImage) {
//         formDataToSend.append('profileImage', formData.profileImage);
//         formDataToSend.append('PROFILE_IMAGE', formData.profileImage);
//       }

//       const toUpperSnake = (s) => s.replace(/([A-Z])/g, '_$1').toUpperCase();

//       Object.keys(formData).forEach(key => {
//         if (key === 'declaration' || key === 'profileImage') return; // profileImage ko exclude karo

//         const value = formData[key];
//         const payload = (Array.isArray(value) || (value && typeof value === 'object')) ? JSON.stringify(value) : (value !== undefined && value !== null ? String(value) : '');

//         // append both naming variants
//         formDataToSend.append(key, payload);
//         formDataToSend.append(toUpperSnake(key), payload);
//       });

//       // declaration is sent as 'yes' / 'no' (also mirrored)
//       const decl = formData.declaration ? 'yes' : 'no';
//       formDataToSend.append('declaration', decl);
//       formDataToSend.append('DECLARATION', decl);

//       const response = await fetch('/api/submit-form', {
//         method: 'POST',
//         headers: {
//           Authorization: 'Bearer ' + token
//         },
//         body: formDataToSend
//       });

//       const result = await response.json();

//       if (response.ok) {
//         // show preview and provide download link
//         if (result.previewUrl) setPreviewUrl(result.previewUrl);
//         if (result.downloadUrl) setDownloadUrl(result.downloadUrl);
//         onSuccess();
//         // Reset form (clear all added fields)
//         setFormData({
//           fullName: '',
//           email: '',
//           phone: '',
//           qualification: '',
//           experienceYears: '',
//           skills: '',
//           declaration: false,
//           profileImage: null, // Image bhi reset karo
//           dob: '',
//           gender: '',
//           street: '',
//           city: '',
//           state: '',
//           zip: '',
//           permanentAddress: '',
//           currentEmployer: '',
//           roleAtWork: '',
//           preferredLocation: '',
//           positionConsidered: '',
//           totalExperience: '',
//           expInConsideredRole: '',
//           dom: '',
//           education: [],
//           careerHistory: []
//         });
//         // Clear newly added section 2..8 fields
//         setFormData(prev => ({
//           ...prev,
//           fatherName: '', fatherDateOfBirth: '', fatherOccupation: '',
//           motherName: '', motherDateOfBirth: '', motherOccupation: '',
//           spouseName: '', spouseDateOfBirth: '', spouseOccupation: '',
//           totalExperienceYears: '', expWithPresentOrg: '', avgExpPerOrganization: '', breakGapInEducationYears: '', breakGapInProfCareerYears: '', roleKcrTeam: '', teamSize: '',
//           kraKpi1: '', kraKpi2: '', kraKpi3: '',
//           noticePeriodMonths: '', noticePeriodNegotiatedDays: '', reasonForLeavingLastOrg: '', presentCtcFixedAndVariable: '', presentPerMonthSalary: '', anyOtherCompensationBenefit: '', expectedCtc: '', expectedPerMonthTakeHomeSalary: '',
//           signature: '', signatureDate: '', signaturePlace: ''
//         }));
//       } else {
//         onError(result.error || 'Submission failed');
//       }
//     } catch (error) {
//       onError('Network error: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   return (
//     <div style={{
//       border: '1px solid #ddd',
//       padding: '20px',
//       borderRadius: '8px',
//       backgroundColor: '#f8f9fa',
//       margin: '20px 0'
//     }}>
//       <h4>📋 Candidate Registration Form</h4>

//       <form onSubmit={handleSubmit}>
//         {/* Profile Image Upload - Full Name ke pehle add kiya */}
//         <div style={{ marginBottom: '15px', textAlign: 'center' }}>
//           <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
//             Profile Photo
//           </label>
          
//           {/* Image Preview */}
//           {formData.profileImage ? (
//             <div style={{ marginBottom: '10px' }}>
//               <img 
//                 src={typeof formData.profileImage === 'string' 
//                   ? formData.profileImage 
//                   : URL.createObjectURL(formData.profileImage)
//                 } 
//                 alt="Profile Preview" 
//                 style={{
//                   width: '150px',
//                   height: '150px',
//                   borderRadius: '50%',
//                   objectFit: 'cover',
//                   border: '2px solid #ddd'
//                 }}
//               />
//             </div>
//           ) : (
//             <div style={{
//               width: '150px',
//               height: '150px',
//               borderRadius: '50%',
//               border: '2px dashed #ddd',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               margin: '0 auto 10px',
//               backgroundColor: '#f8f9fa'
//             }}>
//               <span style={{ color: '#666', fontSize: '12px' }}>No Image</span>
//             </div>
//           )}

//           {/* File Input */}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               const file = e.target.files[0];
//               if (file) {
//                 // File size check (max 2MB)
//                 if (file.size > 2 * 1024 * 1024) {
//                   onError('Image size should be less than 2MB');
//                   return;
//                 }
                
//                 // File type check
//                 if (!file.type.startsWith('image/')) {
//                   onError('Please select a valid image file');
//                   return;
//                 }
                
//                 handleInputChange('profileImage', file);
//               }
//             }}
//             style={{ display: 'none' }}
//             id="profileImageInput"
//           />
          
//           <label
//             htmlFor="profileImageInput"
//             style={{
//               display: 'inline-block',
//               padding: '8px 16px',
//               backgroundColor: '#007bff',
//               color: 'white',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontSize: '14px'
//             }}
//           >
//             📷 Choose Photo
//           </label>
          
//           {formData.profileImage && (
//             <button
//               type="button"
//               onClick={() => handleInputChange('profileImage', null)}
//               style={{
//                 marginLeft: '10px',
//                 padding: '8px 12px',
//                 backgroundColor: '#dc3545',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//                 fontSize: '14px'
//               }}
//             >
//               ❌ Remove
//             </button>
//           )}
          
//           <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
//             Supported: JPG, PNG, GIF (Max 2MB)
//           </div>
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name *</label>
//           <input
//             type="text"
//             value={formData.fullName}
//             onChange={(e) => handleInputChange('fullName', e.target.value)}
//             placeholder="Enter your full name"
//             required
//             style={{
//               padding: '10px',
//               width: '100%',
//               border: '1px solid #ddd',
//               borderRadius: '4px',
//               boxSizing: 'border-box'
//             }}
//           />
//         </div>

//         <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
//           <div style={{ flex: 1 }}>
//             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
//             <input
//               type="email"
//               value={formData.email}
//               onChange={(e) => handleInputChange('email', e.target.value)}
//               placeholder="Enter your email"
//               style={{
//                 padding: '10px',
//                 width: '100%',
//                 border: '1px solid #ddd',
//                 borderRadius: '4px',
//                 boxSizing: 'border-box'
//               }}
//             />
//           </div>
//           <div style={{ flex: 1 }}>
//             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone</label>
//             <input
//               type="tel"
//               value={formData.phone}
//               onChange={(e) => handleInputChange('phone', e.target.value)}
//               placeholder="Enter your phone number"
//               style={{
//                 padding: '10px',
//                 width: '100%',
//                 border: '1px solid #ddd',
//                 borderRadius: '4px',
//                 boxSizing: 'border-box'
//               }}
//             />
//           </div>
//         </div>

//         {/* Additional personal fields */}
//         <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
//           <div style={{ flex: 1 }}>
//             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date of Birth</label>
//             <input
//               type="date"
//               value={formData.dob}
//               onChange={(e) => handleInputChange('dob', e.target.value)}
//               style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }}
//             />
//           </div>
//           <div style={{ flex: 1 }}>
//             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Gender</label>
//             <select value={formData.gender} onChange={(e) => handleInputChange('gender', e.target.value)} style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }}>
//               <option value="">Select</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//         </div>

//         {/* Address fields */}
//         <div style={{ marginBottom: '15px' }}>
//           <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Present Address</label>
//           <input type="text" value={formData.street} onChange={(e) => handleInputChange('street', e.target.value)} placeholder="Street / locality" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
//           <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
//             <input type="text" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} placeholder="City" style={{ padding: '10px', flex: 1, border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" value={formData.state} onChange={(e) => handleInputChange('state', e.target.value)} placeholder="State" style={{ padding: '10px', flex: 1, border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" value={formData.zip} onChange={(e) => handleInputChange('zip', e.target.value)} placeholder="ZIP" style={{ padding: '10px', width: '120px', border: '1px solid #ddd', borderRadius: '4px' }} />
//           </div>
//           <div style={{ marginTop: '8px' }}>
//             <label style={{ fontSize: '12px', color: '#666' }}>Permanent Address (optional)</label>
//             <input type="text" value={formData.permanentAddress} onChange={(e) => handleInputChange('permanentAddress', e.target.value)} placeholder="Permanent address" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', marginTop: '6px' }} />
//           </div>
//         </div>

//         <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
//           <div style={{ flex: 1 }}>
//             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Qualification</label>
//             <input
//               type="text"
//               value={formData.qualification}
//               onChange={(e) => handleInputChange('qualification', e.target.value)}
//               placeholder="Highest qualification"
//               style={{
//                 padding: '10px',
//                 width: '100%',
//                 border: '1px solid #ddd',
//                 borderRadius: '4px',
//                 boxSizing: 'border-box'
//               }}
//             />
//           </div>
//           <div style={{ flex: 1 }}>
//             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Experience (Years)</label>
//             <input
//               type="number"
//               value={formData.experienceYears}
//               onChange={(e) => handleInputChange('experienceYears', e.target.value)}
//               placeholder="Years of experience"
//               style={{
//                 padding: '10px',
//                 width: '100%',
//                 border: '1px solid #ddd',
//                 borderRadius: '4px',
//                 boxSizing: 'border-box'
//               }}
//             />
//           </div>
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Skills</label>
//           <input
//             type="text"
//             value={formData.skills}
//             onChange={(e) => handleInputChange('skills', e.target.value)}
//             placeholder="List your skills (comma separated)"
//             style={{
//               padding: '10px',
//               width: '100%',
//               border: '1px solid #ddd',
//               borderRadius: '4px',
//               boxSizing: 'border-box'
//             }}
//           />
//         </div>

//         {/* Professional extras */}
//         <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
//           <div style={{ flex: 1 }}>
//             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Current Employer</label>
//             <input type="text" value={formData.currentEmployer} onChange={(e) => handleInputChange('currentEmployer', e.target.value)} placeholder="Current employer" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
//           </div>
//           <div style={{ flex: 1 }}>
//             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Role / Designation</label>
//             <input type="text" value={formData.roleAtWork} onChange={(e) => handleInputChange('roleAtWork', e.target.value)} placeholder="Your role" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
//           </div>
//         </div>

//         <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
//           <div style={{ flex: 1 }}>
//             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Preferred Location</label>
//             <input type="text" value={formData.preferredLocation} onChange={(e) => handleInputChange('preferredLocation', e.target.value)} placeholder="Preferred location" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
//           </div>
//           <div style={{ flex: 1 }}>
//             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Position Considered</label>
//             <input type="text" value={formData.positionConsidered} onChange={(e) => handleInputChange('positionConsidered', e.target.value)} placeholder="Position applied for" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
//           </div>
//         </div>

//         <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
//           <div style={{ flex: 1 }}>
//             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Total Experience</label>
//             <input type="text" value={formData.totalExperience} onChange={(e) => handleInputChange('totalExperience', e.target.value)} placeholder="e.g., 3 years" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
//           </div>
//           <div style={{ flex: 1 }}>
//             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Experience in Considered Role</label>
//             <input type="text" value={formData.expInConsideredRole} onChange={(e) => handleInputChange('expInConsideredRole', e.target.value)} placeholder="e.g., 1 year" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
//           </div>
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date of Mobility (DOM)</label>
//           <input type="date" value={formData.dom} onChange={(e) => handleInputChange('dom', e.target.value)} style={{ padding: '10px', width: '250px', border: '1px solid #ddd', borderRadius: '4px' }} />
//         </div>

//         {/* Education and Career as multi-line textareas (one per line) */}
//         <div style={{ marginBottom: '15px' }}>
//           <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Education (one entry per line)</label>
//           <textarea value={(formData.education || []).join('\n')} onChange={(e) => handleInputChange('education', e.target.value.split('\n'))} placeholder="Course - Institution - Year - Grade" style={{ padding: '10px', width: '100%', minHeight: '80px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Career History (one entry per line)</label>
//           <textarea value={(formData.careerHistory || []).join('\n')} onChange={(e) => handleInputChange('careerHistory', e.target.value.split('\n'))} placeholder="Org - Designation - From - To - Salary" style={{ padding: '10px', width: '100%', minHeight: '80px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
//         </div>

//         {/* SECTION 2: PERSONAL DETAILS (FATHER / MOTHER / SPOUSE) */}
//         <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
//           <h5>PERSONAL DETAILS</h5>
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//             <input type="text" placeholder="Father's Name" value={formData.fatherName} onChange={(e) => handleInputChange('fatherName', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="date" placeholder="Father DOB" value={formData.fatherDateOfBirth} onChange={(e) => handleInputChange('fatherDateOfBirth', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" placeholder="Father Occupation" value={formData.fatherOccupation} onChange={(e) => handleInputChange('fatherOccupation', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />

//             <input type="text" placeholder="Mother's Name" value={formData.motherName} onChange={(e) => handleInputChange('motherName', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="date" placeholder="Mother DOB" value={formData.motherDateOfBirth} onChange={(e) => handleInputChange('motherDateOfBirth', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" placeholder="Mother Occupation" value={formData.motherOccupation} onChange={(e) => handleInputChange('motherOccupation', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />

//             <input type="text" placeholder="Spouse Name (if married)" value={formData.spouseName} onChange={(e) => handleInputChange('spouseName', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="date" placeholder="Spouse DOB" value={formData.spouseDateOfBirth} onChange={(e) => handleInputChange('spouseDateOfBirth', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" placeholder="Spouse Occupation" value={formData.spouseOccupation} onChange={(e) => handleInputChange('spouseOccupation', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//           </div>
//         </div>

//         {/* SECTION 3: EDUCATIONAL PROGRESS - note: education entries are captured as lines in the education textarea; for richer UX we can add dynamic rows in future */}
//         <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
//           <h5>EDUCATIONAL PROGRESS</h5>
//           <p style={{ fontSize: '13px', color: '#666' }}>Please add each qualification on a new line in the Education box above (Course | Institute | Board | Place | %/CGPA | YOS | YOP | FT/PT/DL)</p>
//         </div>

//         {/* SECTION 4: TOTAL EXPERIENCE & GAPS */}
//         <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
//           <h5>TOTAL EXPERIENCE & GAPS</h5>
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//             <input type="text" placeholder="Total Experience (years)" value={formData.totalExperienceYears} onChange={(e) => handleInputChange('totalExperienceYears', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" placeholder="Experience with present org" value={formData.expWithPresentOrg} onChange={(e) => handleInputChange('expWithPresentOrg', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" placeholder="Avg experience per org" value={formData.avgExpPerOrganization} onChange={(e) => handleInputChange('avgExpPerOrganization', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" placeholder="Break/gap in education (years)" value={formData.breakGapInEducationYears} onChange={(e) => handleInputChange('breakGapInEducationYears', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" placeholder="Break/gap in prof career (years)" value={formData.breakGapInProfCareerYears} onChange={(e) => handleInputChange('breakGapInProfCareerYears', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" placeholder="Role KCR/Team" value={formData.roleKcrTeam} onChange={(e) => handleInputChange('roleKcrTeam', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" placeholder="Team Size" value={formData.teamSize} onChange={(e) => handleInputChange('teamSize', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//           </div>
//         </div>

//         {/* SECTION 5: CAREER CONTOUR - Career history lines are used; for richer structure we can parse lines into objects in the future */}
//         <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
//           <h5>CAREER CONTOUR</h5>
//           <p style={{ fontSize: '13px', color: '#666' }}>Add up to 7 entries in the Career History box above. Each line: Organization | Designation | Salary Fixed | Salary Variable | Salary Total CTC | Salary Per Month | Duration From | Duration To</p>
//         </div>

//         {/* SECTION 6: KRA / KPI */}
//         <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
//           <h5>ROLE (MAJOR KRA / KPI)</h5>
//           <textarea value={formData.kraKpi1} onChange={(e) => handleInputChange('kraKpi1', e.target.value)} placeholder="KRA / KPI 1" style={{ padding: '8px', width: '100%', minHeight: '50px', border: '1px solid #ddd', borderRadius: '4px' }} />
//           <textarea value={formData.kraKpi2} onChange={(e) => handleInputChange('kraKpi2', e.target.value)} placeholder="KRA / KPI 2" style={{ padding: '8px', width: '100%', minHeight: '50px', border: '1px solid #ddd', borderRadius: '4px', marginTop: '8px' }} />
//           <textarea value={formData.kraKpi3} onChange={(e) => handleInputChange('kraKpi3', e.target.value)} placeholder="KRA / KPI 3" style={{ padding: '8px', width: '100%', minHeight: '50px', border: '1px solid #ddd', borderRadius: '4px', marginTop: '8px' }} />
//         </div>

//         {/* SECTION 7: OTHER DETAILS */}
//         <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
//           <h5>OTHER DETAILS</h5>
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//             <input type="text" placeholder="Notice period (months)" value={formData.noticePeriodMonths} onChange={(e) => handleInputChange('noticePeriodMonths', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" placeholder="Negotiated notice (days)" value={formData.noticePeriodNegotiatedDays} onChange={(e) => handleInputChange('noticePeriodNegotiatedDays', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" placeholder="Reason for leaving last org" value={formData.reasonForLeavingLastOrg} onChange={(e) => handleInputChange('reasonForLeavingLastOrg', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" placeholder="Present CTC (F & V)" value={formData.presentCtcFixedAndVariable} onChange={(e) => handleInputChange('presentCtcFixedAndVariable', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" placeholder="Present per month salary" value={formData.presentPerMonthSalary} onChange={(e) => handleInputChange('presentPerMonthSalary', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" placeholder="Any other compensation / benefit" value={formData.anyOtherCompensationBenefit} onChange={(e) => handleInputChange('anyOtherCompensationBenefit', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" placeholder="Expected CTC" value={formData.expectedCtc} onChange={(e) => handleInputChange('expectedCtc', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" placeholder="Expected per month take-home" value={formData.expectedPerMonthTakeHomeSalary} onChange={(e) => handleInputChange('expectedPerMonthTakeHomeSalary', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//           </div>
//         </div>

//         {/* SECTION 8: DECLARATION SIGNATURE */}
//         <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
//           <h5>DECLARATION</h5>
//           <input type="text" placeholder="Signature (type your name)" value={formData.signature} onChange={(e) => handleInputChange('signature', e.target.value)} style={{ padding: '8px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
//           <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
//             <input type="date" placeholder="Date" value={formData.signatureDate} onChange={(e) => handleInputChange('signatureDate', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//             <input type="text" placeholder="Place" value={formData.signaturePlace} onChange={(e) => handleInputChange('signaturePlace', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
//           </div>
//         </div>

//         <div style={{ marginBottom: '20px' }}>
//           <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <input
//               type="checkbox"
//               checked={formData.declaration}
//               onChange={(e) => handleInputChange('declaration', e.target.checked)}
//               style={{ transform: 'scale(1.2)' }}
//             />
//             <span>✅ I declare that all information provided is true and correct</span>
//           </label>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             padding: '12px 30px',
//             backgroundColor: loading ? '#6c757d' : '#28a745',
//             color: 'white',
//             border: 'none',
//             borderRadius: '6px',
//             cursor: loading ? 'not-allowed' : 'pointer',
//             fontSize: '16px',
//             fontWeight: 'bold'
//           }}
//         >
//           {loading ? 'Submitting...' : '📤 Submit Application'}
//         </button>
//       </form>

//       {/* Preview and actions */}
//       {previewUrl && (
//         <div style={{ marginTop: '20px', textAlign: 'center' }}>
//           <h5>Preview</h5>
//           <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '6px', background: '#fff' }}>
//             <iframe
//               title="pdf-preview"
//               src={previewUrl}
//               style={{ width: '100%', height: '500px', border: 'none' }}
//             />
//           </div>

//           <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
//             <a href={previewUrl} download="submission.pdf">
//               <button type="button" style={{ padding: '10px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Download Preview</button>
//             </a>

//             {downloadUrl && (
//               <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
//                 <button type="button" style={{ padding: '10px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Open Download</button>
//               </a>
//             )}

//             <button type="button" onClick={() => {
//               // open preview in new window for printing
//               const w = window.open(previewUrl, '_blank');
//               if (w) {
//                 // give the window a moment to load then print
//                 setTimeout(() => w.print(), 500);
//               }
//             }} style={{ padding: '10px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Print</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default CandidateForm;



'use client';
import { useState } from 'react';
function CandidateForm({ onSuccess, onError }) {
  const [formData, setFormData] = useState({
    title: '',
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    qualification: '',
    experienceYears: '',
    skills: '',
    declaration: false,
    profileImage: null,
    // additional personal fields
    dob: '',
    gender: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    permanentAddress: '',
    // professional fields
    currentEmployer: '',
    roleAtWork: '',
    preferredLocation: '',
    positionConsidered: '',
    totalExperience: '',
    expInConsideredRole: '',
    dom: '',
    // complex/multi entries
    education: [],
    careerHistory: [],
    // SECTION 2: PERSONAL DETAILS
    fatherName: '',
    fatherDateOfBirth: '',
    fatherOccupation: '',
    motherName: '',
    motherDateOfBirth: '',
    motherOccupation: '',
    spouseName: '',
    spouseDateOfBirth: '',
    spouseOccupation: '',
    // SECTION 4: TOTAL EXPERIENCE & GAPS
    totalExperienceYears: '',
    expWithPresentOrg: '',
    avgExpPerOrganization: '',
    breakGapInEducationYears: '',
    breakGapInProfCareerYears: '',
    roleKcrTeam: '',
    teamSize: '',
    // SECTION 6: KRA/KPI
    kraKpi1: '',
    kraKpi2: '',
    kraKpi3: '',
    // SECTION 7: OTHER DETAILS
    noticePeriodMonths: '',
    noticePeriodNegotiatedDays: '',
    reasonForLeavingLastOrg: '',
    presentCtcFixedAndVariable: '',
    presentPerMonthSalary: '',
    anyOtherCompensationBenefit: '',
    expectedCtc: '',
    expectedPerMonthTakeHomeSalary: '',
    // SECTION 8: DECLARATION SIGNATURE
    signature: '',
    signatureDate: '',
    signaturePlace: ''
  });
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // File size check (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        onError('Image size should be less than 2MB');
        e.target.value = ''; // Clear input
        return;
      }
      
      // File type check
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        onError('Please select a valid image file (JPG, PNG, GIF)');
        e.target.value = ''; // Clear input
        return;
      }
      
      // Create preview and store file
      handleInputChange('profileImage', file);
      
      // Success message
      console.log('Image selected:', file.name, 'Size:', file.size, 'Type:', file.type);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName) {
      onError('Full name is required');
      return;
    }

    if (!formData.declaration) {
      onError('Please accept the declaration');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      // Image upload handle karo
      if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage);
        formDataToSend.append('PROFILE_IMAGE', formData.profileImage);
      }

      const toUpperSnake = (s) => s.replace(/([A-Z])/g, '_$1').toUpperCase();

      Object.keys(formData).forEach(key => {
        if (key === 'declaration' || key === 'profileImage') return;

        const value = formData[key];
        const payload = (Array.isArray(value) || (value && typeof value === 'object')) ? JSON.stringify(value) : (value !== undefined && value !== null ? String(value) : '');

        // append both naming variants
        formDataToSend.append(key, payload);
        formDataToSend.append(toUpperSnake(key), payload);
      });

      // declaration is sent as 'yes' / 'no' (also mirrored)
      const decl = formData.declaration ? 'yes' : 'no';
      formDataToSend.append('declaration', decl);
      formDataToSend.append('DECLARATION', decl);

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token
        },
        body: formDataToSend
      });

      const result = await response.json();

      if (response.ok) {
        // show preview and provide download link
        if (result.previewUrl) setPreviewUrl(result.previewUrl);
        if (result.downloadUrl) setDownloadUrl(result.downloadUrl);
        onSuccess();
        // Reset form (clear all added fields)
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          qualification: '',
          experienceYears: '',
          skills: '',
          declaration: false,
          profileImage: null,
          dob: '',
          gender: '',
          street: '',
          city: '',
          state: '',
          zip: '',
          permanentAddress: '',
          currentEmployer: '',
          roleAtWork: '',
          preferredLocation: '',
          positionConsidered: '',
          totalExperience: '',
          expInConsideredRole: '',
          dom: '',
          education: [],
          careerHistory: [],
          fatherName: '', 
          fatherDateOfBirth: '', 
          fatherOccupation: '',
          motherName: '', 
          motherDateOfBirth: '', 
          motherOccupation: '',
          spouseName: '', 
          spouseDateOfBirth: '', 
          spouseOccupation: '',
          totalExperienceYears: '', 
          expWithPresentOrg: '', 
          avgExpPerOrganization: '', 
          breakGapInEducationYears: '', 
          breakGapInProfCareerYears: '', 
          roleKcrTeam: '', 
          teamSize: '',
          kraKpi1: '', 
          kraKpi2: '', 
          kraKpi3: '',
          noticePeriodMonths: '', 
          noticePeriodNegotiatedDays: '', 
          reasonForLeavingLastOrg: '', 
          presentCtcFixedAndVariable: '', 
          presentPerMonthSalary: '', 
          anyOtherCompensationBenefit: '', 
          expectedCtc: '', 
          expectedPerMonthTakeHomeSalary: '',
          signature: '', 
          signatureDate: '', 
          signaturePlace: ''
        });
      } else {
        onError(result.error || 'Submission failed');
      }
    } catch (error) {
      onError('Network error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '20px',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa',
      margin: '20px 0'
    }}>
      <h4>📋 Candidate Registration Form</h4>

      <form onSubmit={handleSubmit}>
        {/* Profile Image Upload - Full Name ke pehle add kiya */}
        <div style={{ marginBottom: '15px', textAlign: 'center' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Profile Photo
          </label>
          
          {/* Image Preview */}
          {formData.profileImage ? (
            <div style={{ marginBottom: '10px' }}>
              <img 
                src={typeof formData.profileImage === 'string' 
                  ? formData.profileImage 
                  : URL.createObjectURL(formData.profileImage)
                } 
                alt="Profile Preview" 
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #ddd'
                }}
              />
            </div>
          ) : (
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              border: '2px dashed #ddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px',
              backgroundColor: '#f8f9fa'
            }}>
              <span style={{ color: '#666', fontSize: '12px' }}>No Image</span>
            </div>
          )}

          {/* File Input */}
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="profileImageInput"
          />
          
          <label
            htmlFor="profileImageInput"
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            📷 Choose Photo
          </label>
          
          {formData.profileImage && (
            <button
              type="button"
              onClick={() => handleInputChange('profileImage', null)}
              style={{
                marginLeft: '10px',
                padding: '8px 12px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ❌ Remove
            </button>
          )}
          
          <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
            Supported: JPG, PNG, GIF (Max 2MB)
          </div>
        </div>

        <div style={{ marginBottom: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ width: '120px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title</label>
            <select value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }}>
              <option value="">Select</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Dr">Dr</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name *</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              required
              style={{
                padding: '10px',
                width: '100%',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              style={{
                padding: '10px',
                width: '100%',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
           <div style={{ flex: 1 }}>
             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone</label>
             <div style={{ display: 'flex', gap: '8px' }}>
               <select value={formData.countryCode} onChange={(e) => handleInputChange('countryCode', e.target.value)} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', width: '120px' }}>
                 <option value="+91">+91 (IN)</option>
                 <option value="+1">+1 (US)</option>
                 <option value="+44">+44 (UK)</option>
                 <option value="+61">+61 (AU)</option>
                 <option value="+92">+92 (PK)</option>
                 <option value="+971">+971 (AE)</option>
               </select>
               <input
                 type="tel"
                 value={formData.phone}
                 onChange={(e) => handleInputChange('phone', e.target.value)}
                 placeholder="Enter your phone number"
                 style={{
                   padding: '10px',
                   flex: 1,
                   border: '1px solid #ddd',
                   borderRadius: '4px',
                   boxSizing: 'border-box'
                 }}
               />
             </div>
           </div>
        </div>

        {/* Additional personal fields */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date of Birth</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => handleInputChange('dob', e.target.value)}
              style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Gender</label>
            <select value={formData.gender} onChange={(e) => handleInputChange('gender', e.target.value)} style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Address fields */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Present Address</label>
          <input type="text" value={formData.street} onChange={(e) => handleInputChange('street', e.target.value)} placeholder="Street / locality" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <input type="text" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} placeholder="City" style={{ padding: '10px', flex: 1, border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" value={formData.state} onChange={(e) => handleInputChange('state', e.target.value)} placeholder="State" style={{ padding: '10px', flex: 1, border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" value={formData.zip} onChange={(e) => handleInputChange('zip', e.target.value)} placeholder="ZIP" style={{ padding: '10px', width: '120px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          <div style={{ marginTop: '8px' }}>
            <label style={{ fontSize: '12px', color: '#666' }}>Permanent Address (optional)</label>
            <input type="text" value={formData.permanentAddress} onChange={(e) => handleInputChange('permanentAddress', e.target.value)} placeholder="Permanent address" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', marginTop: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Qualification</label>
            <input
              type="text"
              value={formData.qualification}
              onChange={(e) => handleInputChange('qualification', e.target.value)}
              placeholder="Highest qualification"
              style={{
                padding: '10px',
                width: '100%',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Experience (Years)</label>
            <input
              type="number"
              value={formData.experienceYears}
              onChange={(e) => handleInputChange('experienceYears', e.target.value)}
              placeholder="Years of experience"
              style={{
                padding: '10px',
                width: '100%',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Skills</label>
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => handleInputChange('skills', e.target.value)}
            placeholder="List your skills (comma separated)"
            style={{
              padding: '10px',
              width: '100%',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Professional extras */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Current Employer</label>
            <input type="text" value={formData.currentEmployer} onChange={(e) => handleInputChange('currentEmployer', e.target.value)} placeholder="Current employer" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Role / Designation</label>
            <input type="text" value={formData.roleAtWork} onChange={(e) => handleInputChange('roleAtWork', e.target.value)} placeholder="Your role" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Preferred Location</label>
            <input type="text" value={formData.preferredLocation} onChange={(e) => handleInputChange('preferredLocation', e.target.value)} placeholder="Preferred location" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Position Considered</label>
            <input type="text" value={formData.positionConsidered} onChange={(e) => handleInputChange('positionConsidered', e.target.value)} placeholder="Position applied for" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Total Experience</label>
            <input type="text" value={formData.totalExperience} onChange={(e) => handleInputChange('totalExperience', e.target.value)} placeholder="e.g., 3 years" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Experience in Considered Role</label>
            <input type="text" value={formData.expInConsideredRole} onChange={(e) => handleInputChange('expInConsideredRole', e.target.value)} placeholder="e.g., 1 year" style={{ padding: '10px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date of Mobility (DOM)</label>
          <input type="date" value={formData.dom} onChange={(e) => handleInputChange('dom', e.target.value)} style={{ padding: '10px', width: '250px', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>

        {/* Education and Career as multi-line textareas (one per line) */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Education (one entry per line)</label>
          <textarea value={(formData.education || []).join('\n')} onChange={(e) => handleInputChange('education', e.target.value.split('\n'))} placeholder="Course - Institution - Year - Grade" style={{ padding: '10px', width: '100%', minHeight: '80px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Career History (one entry per line)</label>
          <textarea value={(formData.careerHistory || []).join('\n')} onChange={(e) => handleInputChange('careerHistory', e.target.value.split('\n'))} placeholder="Org - Designation - From - To - Salary" style={{ padding: '10px', width: '100%', minHeight: '80px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
        </div>

        {/* SECTION 2: PERSONAL DETAILS (FATHER / MOTHER / SPOUSE) */}
        <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
          <h5>PERSONAL DETAILS</h5>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input type="text" placeholder="Father's Name" value={formData.fatherName} onChange={(e) => handleInputChange('fatherName', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="date" placeholder="Father DOB" value={formData.fatherDateOfBirth} onChange={(e) => handleInputChange('fatherDateOfBirth', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Father Occupation" value={formData.fatherOccupation} onChange={(e) => handleInputChange('fatherOccupation', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />

            <input type="text" placeholder="Mother's Name" value={formData.motherName} onChange={(e) => handleInputChange('motherName', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="date" placeholder="Mother DOB" value={formData.motherDateOfBirth} onChange={(e) => handleInputChange('motherDateOfBirth', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Mother Occupation" value={formData.motherOccupation} onChange={(e) => handleInputChange('motherOccupation', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />

            <input type="text" placeholder="Spouse Name (if married)" value={formData.spouseName} onChange={(e) => handleInputChange('spouseName', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="date" placeholder="Spouse DOB" value={formData.spouseDateOfBirth} onChange={(e) => handleInputChange('spouseDateOfBirth', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Spouse Occupation" value={formData.spouseOccupation} onChange={(e) => handleInputChange('spouseOccupation', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </div>

        {/* SECTION 3: EDUCATIONAL PROGRESS - note: education entries are captured as lines in the education textarea; for richer UX we can add dynamic rows in future */}
        <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
          <h5>EDUCATIONAL PROGRESS</h5>
          <p style={{ fontSize: '13px', color: '#666' }}>Please add each qualification on a new line in the Education box above (Course | Institute | Board | Place | %/CGPA | YOS | YOP | FT/PT/DL)</p>
        </div>

        {/* SECTION 4: TOTAL EXPERIENCE & GAPS */}
        <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
          <h5>TOTAL EXPERIENCE & GAPS</h5>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input type="text" placeholder="Total Experience (years)" value={formData.totalExperienceYears} onChange={(e) => handleInputChange('totalExperienceYears', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Experience with present org" value={formData.expWithPresentOrg} onChange={(e) => handleInputChange('expWithPresentOrg', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Avg experience per org" value={formData.avgExpPerOrganization} onChange={(e) => handleInputChange('avgExpPerOrganization', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Break/gap in education (years)" value={formData.breakGapInEducationYears} onChange={(e) => handleInputChange('breakGapInEducationYears', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Break/gap in prof career (years)" value={formData.breakGapInProfCareerYears} onChange={(e) => handleInputChange('breakGapInProfCareerYears', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Role KCR/Team" value={formData.roleKcrTeam} onChange={(e) => handleInputChange('roleKcrTeam', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Team Size" value={formData.teamSize} onChange={(e) => handleInputChange('teamSize', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </div>

        {/* SECTION 5: CAREER CONTOUR - Career history lines are used; for richer structure we can parse lines into objects in the future */}
        <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
          <h5>CAREER CONTOUR</h5>
          <p style={{ fontSize: '13px', color: '#666' }}>Add up to 7 entries in the Career History box above. Each line: Organization | Designation | Salary Fixed | Salary Variable | Salary Total CTC | Salary Per Month | Duration From | Duration To</p>
        </div>

        {/* SECTION 6: KRA / KPI */}
        <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
          <h5>ROLE (MAJOR KRA / KPI)</h5>
          <textarea value={formData.kraKpi1} onChange={(e) => handleInputChange('kraKpi1', e.target.value)} placeholder="KRA / KPI 1" style={{ padding: '8px', width: '100%', minHeight: '50px', border: '1px solid #ddd', borderRadius: '4px' }} />
          <textarea value={formData.kraKpi2} onChange={(e) => handleInputChange('kraKpi2', e.target.value)} placeholder="KRA / KPI 2" style={{ padding: '8px', width: '100%', minHeight: '50px', border: '1px solid #ddd', borderRadius: '4px', marginTop: '8px' }} />
          <textarea value={formData.kraKpi3} onChange={(e) => handleInputChange('kraKpi3', e.target.value)} placeholder="KRA / KPI 3" style={{ padding: '8px', width: '100%', minHeight: '50px', border: '1px solid #ddd', borderRadius: '4px', marginTop: '8px' }} />
        </div>

        {/* SECTION 7: OTHER DETAILS */}
        <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
          <h5>OTHER DETAILS</h5>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input type="text" placeholder="Notice period (months)" value={formData.noticePeriodMonths} onChange={(e) => handleInputChange('noticePeriodMonths', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Negotiated notice (days)" value={formData.noticePeriodNegotiatedDays} onChange={(e) => handleInputChange('noticePeriodNegotiatedDays', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Reason for leaving last org" value={formData.reasonForLeavingLastOrg} onChange={(e) => handleInputChange('reasonForLeavingLastOrg', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Present CTC (F & V)" value={formData.presentCtcFixedAndVariable} onChange={(e) => handleInputChange('presentCtcFixedAndVariable', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Present per month salary" value={formData.presentPerMonthSalary} onChange={(e) => handleInputChange('presentPerMonthSalary', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Any other compensation / benefit" value={formData.anyOtherCompensationBenefit} onChange={(e) => handleInputChange('anyOtherCompensationBenefit', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Expected CTC" value={formData.expectedCtc} onChange={(e) => handleInputChange('expectedCtc', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Expected per month take-home" value={formData.expectedPerMonthTakeHomeSalary} onChange={(e) => handleInputChange('expectedPerMonthTakeHomeSalary', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </div>

        {/* SECTION 8: DECLARATION SIGNATURE */}
        <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px', marginTop: '15px' }}>
          <h5>DECLARATION</h5>
          <input type="text" placeholder="Signature (type your name)" value={formData.signature} onChange={(e) => handleInputChange('signature', e.target.value)} style={{ padding: '8px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <input type="date" placeholder="Date" value={formData.signatureDate} onChange={(e) => handleInputChange('signatureDate', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input type="text" placeholder="Place" value={formData.signaturePlace} onChange={(e) => handleInputChange('signaturePlace', e.target.value)} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              checked={formData.declaration}
              onChange={(e) => handleInputChange('declaration', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span>✅ I declare that all information provided is true and correct</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 30px',
            backgroundColor: loading ? '#6c757d' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Submitting...' : '📤 Submit Application'}
        </button>
      </form>

      {/* Preview and actions */}
      {previewUrl && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h5>Preview</h5>
          <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '6px', background: '#fff' }}>
            <iframe
              title="pdf-preview"
              src={previewUrl}
              style={{ width: '100%', height: '500px', border: 'none' }}
            />
          </div>

          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <a href={previewUrl} download="submission.pdf">
              <button type="button" style={{ padding: '10px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Download Preview</button>
            </a>

            {downloadUrl && (
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                <button type="button" style={{ padding: '10px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Open Download</button>
              </a>
            )}

            <button type="button" onClick={() => {
              // open preview in new window for printing
              const w = window.open(previewUrl, '_blank');
              if (w) {
                // give the window a moment to load then print
                setTimeout(() => w.print(), 500);
              }
            }} style={{ padding: '10px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Print</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default CandidateForm;