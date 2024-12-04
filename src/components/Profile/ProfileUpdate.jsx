import React, { useState, useEffect } from 'react';
import ProfileService from '../../services/ProfileService';

const ProfileUpdate = () => {
    const [profile, setProfile] = useState({
       
        address: '',
        phoneNumber: '',
        Email: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await ProfileService.getProfile();
                setProfile(response.data);
            } catch (error) {
                console.error("Erreur de chargement du profil", error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    

    const handleSubmit = async () => {
        try {
            await ProfileService.updateProfile(profile);
            alert("Profil mis à jour !");
        } catch (error) {
            console.error("Erreur de mise à jour du profil", error);
        }
    };

    return (
        <div>
            <h2>Mise à jour du profil</h2>
            <input type="text" name="Email" value={profile.name} onChange={handleChange} placeholder="Email" />
            <input type="text" name="address" value={profile.address} onChange={handleChange} placeholder="Adresse" />
            <input type="text" name="phoneNumber" value={profile.phone} onChange={handleChange} placeholder="Téléphone" />
            <button onClick={handleSubmit}>Enregistrer</button>
            <button onClick={goBack}>Cancel</button>
        </div>
    );
};

export default ProfileUpdate;
