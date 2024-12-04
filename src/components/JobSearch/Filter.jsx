import React, { useState } from 'react';

const Filter = ({ onApplyFilter }) => {
    const [filter, setFilter] = useState({ salaryRange: '', companyName: '', experienceLevel: '' });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    const applyFilter = () => {
        onApplyFilter(filter);
    };

    return (
        <div>
            <h3>Filtres Avancés</h3>
            <input type="text" name="salaryRange" value={filter.salaryRange} onChange={handleFilterChange} placeholder="Fourchette de salaire" />
            <input type="text" name="companyName" value={filter.companyName} onChange={handleFilterChange} placeholder="Nom de l'entreprise" />
            <input type="text" name="experienceLevel" value={filter.experienceLevel} onChange={handleFilterChange} placeholder="Niveau d'expérience" />
            <button onClick={applyFilter}>Appliquer les Filtres</button>
        </div>
    );
};

export default Filter;
