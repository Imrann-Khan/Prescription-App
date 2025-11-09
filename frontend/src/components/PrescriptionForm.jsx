import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

export default function PrescriptionForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        prescriptionDate: '', patientName: '', patientAge: '',
        patientGender: '', diagnosis: '', medicines: '', nextVisitDate: ''
    });

    useEffect(() => {
        if (id) { // If editing, fetch existing data
            api.get(`/prescriptions/${id}`).then(res => setFormData(res.data));
        }
    }, [id]);

    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!formData.prescriptionDate) e.prescriptionDate = 'Prescription date is required';
        if (!formData.patientName?.trim()) e.patientName = 'Patient name is required';
        const age = Number(formData.patientAge);
        if (!Number.isInteger(age) || age < 0 || age > 150) e.patientAge = 'Age must be between 0 and 150';
        if (!formData.patientGender) e.patientGender = 'Gender is required';
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eMap = validate();
        setErrors(eMap);
        if (Object.keys(eMap).length) return;
        try {
            if (id) await api.put(`/prescriptions/${id}`, formData);
            else await api.post('/prescriptions', formData);
            navigate('/prescriptions');
        } catch (err) {
            const msg = err.response?.data?.message || 'Error saving. Check inputs.';
            alert(msg);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="card p-4">
            <h3>{id ? 'Edit' : 'New'} Prescription</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Date *</label>
                    <input type="date" name="prescriptionDate" className={`form-control ${errors.prescriptionDate ? 'is-invalid' : ''}`} 
                           value={formData.prescriptionDate || ''} onChange={handleChange} />
                    {errors.prescriptionDate && <div className="invalid-feedback">{errors.prescriptionDate}</div>}
                </div>
                <div className="mb-3">
                    <label>Patient Name *</label>
                    <input type="text" name="patientName" className={`form-control ${errors.patientName ? 'is-invalid' : ''}`} 
                           value={formData.patientName || ''} onChange={handleChange} />
                    {errors.patientName && <div className="invalid-feedback">{errors.patientName}</div>}
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label>Age *</label>
                        <input type="number" name="patientAge" className={`form-control ${errors.patientAge ? 'is-invalid' : ''}`} min="0" max="150"
                               value={formData.patientAge || ''} onChange={handleChange} />
                        {errors.patientAge && <div className="invalid-feedback">{errors.patientAge}</div>}
                    </div>
                    <div className="col">
                        <label>Gender *</label>
                        <select name="patientGender" className={`form-select ${errors.patientGender ? 'is-invalid' : ''}`} 
                                value={formData.patientGender || ''} onChange={handleChange}>
                            <option value="">Select...</option><option>Male</option><option>Female</option><option>Other</option>
                        </select>
                        {errors.patientGender && <div className="invalid-feedback">{errors.patientGender}</div>}
                    </div>
                </div>
                <div className="mb-3">
                    <label>Diagnosis</label>
                    <textarea name="diagnosis" className="form-control" rows="3" value={formData.diagnosis || ''} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <label>Medicines</label>
                    <textarea name="medicines" className="form-control" rows="3" value={formData.medicines || ''} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <label>Next Visit Date</label>
                    <input type="date" name="nextVisitDate" className="form-control" value={formData.nextVisitDate || ''} onChange={handleChange} />
                </div>
                <button className="btn btn-primary">Save</button>
                <Link to="/prescriptions" className="btn btn-secondary ms-2">Cancel</Link>
            </form>
        </div>
    );
}