import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No saved candidates yet.</p>
      ) : (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Avatar</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Username</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Location</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Company</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Email</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Profile</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  <img src={candidate.avatar_url} alt={candidate.login} width="50" />
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{candidate.login}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{candidate.name || '—'}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{candidate.location || '—'}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{candidate.company || '—'}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{candidate.email || '—'}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  <a href={candidate.html_url} target="_blank" rel="noreferrer">GitHub</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default SavedCandidates;