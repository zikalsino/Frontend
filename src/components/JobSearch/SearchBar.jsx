import React, { useState } from 'react';
import JobService from '../../services/JobService';

const SearchBar = ({ onSearchResults }) => {
    const [keywords, setKeywords] = useState('');
    const [location, setLocation] = useState('');
    const [contractType, setContractType] = useState('');

    const handleSearch = async () => {
        try {
            const results = await JobService.searchJobs({ keywords, location, contractType });
            onSearchResults(results.data);
        } catch (error) {
            console.error("Erreur de recherche d'offres", error);
        }
    };

    return (
        <div>
            <h2>Recherche d'Offres</h2>
            <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Mots-clés" />
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Localisation" />
            <input type="text" value={contractType} onChange={(e) => setContractType(e.target.value)} placeholder="Type de contrat" />
            <button onClick={handleSearch}>Rechercher</button>
        </div>
    );
};

export default SearchBar;
