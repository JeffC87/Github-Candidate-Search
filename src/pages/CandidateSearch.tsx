import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    login: '',
    name: '',
    avatar_url: '',
    location: '',
    email: '',
    html_url: '',
    company: '',
  });
  const [candidateIndex, setCandidateIndex] = useState(0);

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      setCandidates(data);
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    if (candidates.length === 0 || candidateIndex >= candidates.length) return;

    const fetchCandidate = async () => {
      const candidate = candidates[candidateIndex];
      const data = await searchGithubUser(candidate.login);
      setCurrentCandidate(data);
    };
    fetchCandidate();
  }, [candidates, candidateIndex]);

  const handleNext = () => {
    setCandidateIndex((prevIndex) => prevIndex + 1);
  };

  const handleReject = () => {
    // You can optionally log rejected candidates
    handleNext();
  };

  const handleSave = () => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(currentCandidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    handleNext();
  };

  if (candidateIndex >= candidates.length) {
    return <h2>No more candidates</h2>;
  }

  return (
    <>
      <h1>Candidate Search</h1>
      <article>
        <img src={currentCandidate.avatar_url} alt={currentCandidate.name} width="150" />
        <h2>{currentCandidate.login}</h2>
        <p>{currentCandidate.name || "Name not set"}</p>
        <p>{currentCandidate.location || "Location not provided"}</p>
        <p>{currentCandidate.email || "No email provided."}</p>
        <p>{currentCandidate.company || "No company provided."}</p>
        <a href={currentCandidate.html_url} target="_blank" rel="noreferrer">GitHub Profile</a>
      </article>

    <div>
    <button onClick={handleReject} className="round-button reject-button">–</button>
    <button onClick={handleSave} className="round-button save-button">+</button>
    </div>
    </>
  );
};

export default CandidateSearch;
