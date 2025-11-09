import { useState } from 'react';

export default function DrugInteractions() {
  const [rxcui, setRxcui] = useState('341248');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchInteractions = async () => {
    setLoading(true); setError(''); setData(null);
    try {
      const res = await fetch(`https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=${encodeURIComponent(rxcui)}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setError('Unable to fetch data. Check RXCUI and network.');
    } finally {
      setLoading(false);
    }
  };

  const flatten = () => {
   
    const interactions = data?.interactionTypeGroup?.flatMap(g => g.interactionType) || [];
    const rows = [];
    for (const it of interactions) {
      const base = it.minConceptItem;
      for (const pair of it.interactionPair || []) {
        rows.push({
          baseName: base?.name,
          interacting: pair.interactionConcept?.map(c => c.minConceptItem?.name).join(' + '),
          severity: pair.severity,
          description: pair.description?.slice(0, 200) + (pair.description?.length > 200 ? '…' : '')
        });
      }
    }
    return rows;
  };

  const rows = data ? flatten() : [];

  return (
    <div className="container mt-4">
      <h2>Drug Interactions (RxNav)</h2>
      <div className="row g-3 align-items-end mb-3">
        <div className="col-auto">
          <label className="form-label">RXCUI</label>
          <input className="form-control" value={rxcui} onChange={e => setRxcui(e.target.value)} />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={fetchInteractions} disabled={loading}>
            {loading ? 'Loading…' : 'Fetch'}
          </button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr><th>Base Drug</th><th>Interacting Drug(s)</th><th>Severity</th><th>Description</th></tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan="4" className="text-center">No results</td></tr>
            ) : rows.map((r, i) => (
              <tr key={i}>
                <td>{r.baseName}</td>
                <td>{r.interacting}</td>
                <td>{r.severity}</td>
                <td>{r.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
