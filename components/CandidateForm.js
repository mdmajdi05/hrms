'use client';
import { useState } from 'react';

export default function CandidateForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    experienceYears: '',
    skills: '',
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
    declaration: false,
    education: [],
    careerHistory: []
  });

  // add section 2..8 fields
  // Note: keep them in the same formData object for simplicity
  if (!('fatherName' in formData)) {
    setFormData(prev => ({ ...prev,
      fatherName: '', fatherDateOfBirth: '', fatherOccupation: '',
      motherName: '', motherDateOfBirth: '', motherOccupation: '',
      spouseName: '', spouseDateOfBirth: '', spouseOccupation: '',
      totalExperienceYears: '', expWithPresentOrg: '', avgExpPerOrganization: '', breakGapInEducationYears: '', breakGapInProfCareerYears: '', roleKcrTeam: '', teamSize: '',
      kraKpi1: '', kraKpi2: '', kraKpi3: '',
      noticePeriodMonths: '', noticePeriodNegotiatedDays: '', reasonForLeavingLastOrg: '', presentCtcFixedAndVariable: '', presentPerMonthSalary: '', anyOtherCompensationBenefit: '', expectedCtc: '', expectedPerMonthTakeHomeSalary: '',
      signature: '', signatureDate: '', signaturePlace: ''
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare a payload similar to app/page.js: stringify arrays
    const payload = { ...formData };
    payload.education = JSON.stringify(payload.education || []);
    payload.careerHistory = JSON.stringify(payload.careerHistory || []);
    payload.declaration = payload.declaration ? 'yes' : 'no';

    // also add UPPER_SNAKE keys for compatibility
    const toUpperSnake = (s) => s.replace(/([A-Z])/g, '_$1').toUpperCase();
    const augmented = { ...payload };
    Object.keys(payload).forEach(k => {
      augmented[toUpperSnake(k)] = payload[k];
    });

    onSubmit(augmented);
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth: '500px'}}>
      <h4>Candidate Registration Form</h4>
      
      <input
        type="text"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
        style={{
          padding: '10px',
          width: '100%',
          margin: '8px 0',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxSizing: 'border-box'
        }}
      />
      
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        style={{
          padding: '10px',
          width: '100%',
          margin: '8px 0',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxSizing: 'border-box'
        }}
      />

      <div style={{ display: 'flex', gap: '10px' }}>
        <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ padding: '10px', flex: 1, margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px' }} />
        <input type="date" placeholder="DOB" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} style={{ padding: '10px', width: '180px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px' }} />
      </div>

      <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} style={{ padding: '10px', width: '100%', margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px' }}>
        <option value="">Select gender (optional)</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <input type="text" placeholder="Street / locality" value={formData.street} onChange={(e) => setFormData({...formData, street: e.target.value})} style={{ padding: '10px', width: '100%', margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px' }} />
      <div style={{ display: 'flex', gap: '8px' }}>
        <input type="text" placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} style={{ padding: '10px', flex: 1, margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px' }} />
        <input type="text" placeholder="State" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} style={{ padding: '10px', flex: 1, margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px' }} />
        <input type="text" placeholder="ZIP" value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})} style={{ padding: '10px', width: '90px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px' }} />
      </div>

      <input type="text" placeholder="Permanent Address" value={formData.permanentAddress} onChange={(e) => setFormData({...formData, permanentAddress: e.target.value})} style={{ padding: '10px', width: '100%', margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px' }} />

      <input type="text" placeholder="Current Employer" value={formData.currentEmployer} onChange={(e) => setFormData({...formData, currentEmployer: e.target.value})} style={{ padding: '10px', width: '100%', margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px' }} />
      <input type="text" placeholder="Role / Designation" value={formData.roleAtWork} onChange={(e) => setFormData({...formData, roleAtWork: e.target.value})} style={{ padding: '10px', width: '100%', margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px' }} />

      <input type="text" placeholder="Preferred Location" value={formData.preferredLocation} onChange={(e) => setFormData({...formData, preferredLocation: e.target.value})} style={{ padding: '10px', width: '100%', margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px' }} />
      <input type="text" placeholder="Position Considered" value={formData.positionConsidered} onChange={(e) => setFormData({...formData, positionConsidered: e.target.value})} style={{ padding: '10px', width: '100%', margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px' }} />

      <div style={{ display: 'flex', gap: '8px' }}>
        <input type="text" placeholder="Total Experience" value={formData.totalExperience} onChange={(e) => setFormData({...formData, totalExperience: e.target.value})} style={{ padding: '10px', flex: 1, margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px' }} />
        <input type="text" placeholder="Experience in Role" value={formData.expInConsideredRole} onChange={(e) => setFormData({...formData, expInConsideredRole: e.target.value})} style={{ padding: '10px', width: '160px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px' }} />
      </div>

      <input type="date" placeholder="DOM" value={formData.dom} onChange={(e) => setFormData({...formData, dom: e.target.value})} style={{ padding: '10px', width: '200px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px' }} />

      <label style={{ display: 'block', marginTop: '10px' }}>Education (one line per entry)</label>
      <textarea placeholder="Course - Institution - Year - Grade" value={(formData.education || []).join('\n')} onChange={(e) => setFormData({...formData, education: e.target.value.split('\n')})} style={{ padding: '8px', width: '100%', minHeight: '80px', margin: '6px 0', border: '1px solid #ddd', borderRadius: '4px' }} />

      <label style={{ display: 'block', marginTop: '10px' }}>Career History (one line per entry)</label>
      <textarea placeholder="Org - Designation - From - To - Salary" value={(formData.careerHistory || []).join('\n')} onChange={(e) => setFormData({...formData, careerHistory: e.target.value.split('\n')})} style={{ padding: '8px', width: '100%', minHeight: '80px', margin: '6px 0', border: '1px solid #ddd', borderRadius: '4px' }} />

      <button 
        type="submit"
        style={{
          padding: '12px 24px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Submit Form
      </button>
    </form>
  );
}
