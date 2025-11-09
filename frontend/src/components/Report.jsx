import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { Link } from 'react-router-dom';

export default function Report() {
    const [reportData, setReportData] = useState([]);
    const [filters, setFilters] = useState({ start: '', end: '' });

    const fetchReport = async () => {
        try {
            const res = await api.get('/report', { params: filters });
            setReportData(res.data);
        } catch (err) {
            console.error("Error fetching report", err);
        }
    };

    // Initial fetch on component mount
    useEffect(() => {
        fetchReport();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Day-wise Prescription Report</h2>
            <Link to="/prescriptions" className="btn btn-outline-secondary mb-3">← Back to List</Link>

            <div className="row g-3 mb-4 align-items-end">
                <div className="col-auto">
                    <label className="form-label">From:</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        value={filters.start}
                        onChange={e => setFilters({...filters, start: e.target.value})} 
                    />
                </div>
                <div className="col-auto">
                    <label className="form-label">To:</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        value={filters.end}
                        onChange={e => setFilters({...filters, end: e.target.value})} 
                    />
                </div>
                <div className="col-auto">
                    <button onClick={fetchReport} className="btn btn-primary">Generate Report</button>
                </div>
            </div>

            <table className="table table-bordered table-hover">
                <thead className="table-light">
                    <tr>
                        <th>Date</th>
                        <th>Prescription Count</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.length > 0 ? (
                        reportData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.date}</td>
                                <td>{row.count}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colspan="2" className="text-center">No data found for this period.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}