import { Link, useNavigate } from 'react-router-dom';
export default function NavBar() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('auth_token');

    const logout = () => {
        localStorage.removeItem('auth_token');
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/prescriptions">Prescription App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample" aria-controls="navbarsExample" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {isAuthenticated && (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/prescriptions">Prescriptions</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/report">Report</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/interactions">Drug Interactions</Link></li>
                            </>
                        )}
                    </ul>
                    <ul className="navbar-nav">
                        {!isAuthenticated ? (
                            <li className="nav-item"><Link to="/login" className="btn btn-outline-light">Login</Link></li>
                        ) : (
                            <li className="nav-item"><button onClick={logout} className="btn btn-outline-light">Logout</button></li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

