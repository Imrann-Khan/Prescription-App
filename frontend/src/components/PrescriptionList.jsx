import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { Link } from 'react-router-dom';

export default function PrescriptionList() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [filters, setFilters] = useState({ start: '', end: '' });

    const fetchData = async () => {
        try {
            const params = {};
            if (filters.start) params.start = filters.start;
            if (filters.end) params.end = filters.end;
            const res = await api.get('/prescriptions', { params });
            setPrescriptions(res.data);
        } catch (err) {
            if (err.response?.status === 401) window.location.href = '/login';
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Delete this prescription?")) {
            await api.delete(`/prescriptions/${id}`);
            fetchData();
        }
    };

    return (
        <div>
            <h2>Prescriptions</h2>
            <div className="row g-3 mb-3">
                <div className="col-auto"><input type="date" className="form-control" onChange={e => setFilters({...filters, start: e.target.value})} /></div>
                <div className="col-auto"><input type="date" className="form-control" onChange={e => setFilters({...filters, end: e.target.value})} /></div>
                <div className="col-auto"><button onClick={fetchData} className="btn btn-primary">Filter</button></div>
            </div>
            <Link to="/prescriptions/new" className="btn btn-success mb-3">New</Link>
            <table className="table table-striped">
                <thead><tr><th>Date</th><th>Patient</th><th>Age</th><th>Gender</th><th>Actions</th></tr></thead>
                <tbody>
                    {prescriptions.map(p => (
                        <tr key={p.id}>
                            <td>{p.prescriptionDate}</td><td>{p.patientName}</td><td>{p.patientAge}</td><td>{p.patientGender}</td>
                            <td>
                                <Link to={`/prescriptions/edit/${p.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                                <button onClick={() => handleDelete(p.id)} className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}