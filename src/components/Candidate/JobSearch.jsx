import React, { useState } from "react";

const JobSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8080/api/job-offers/search?query=${encodeURIComponent(
          searchQuery
        )}`
      );

      if (!response.ok) {
        throw new Error(`Erreur du serveur: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (jobOfferId) => {
    window.location.href = `/apply/${jobOfferId}`;
  };

  return (
    <div style={styles.resultsContainer}>
    <div style={styles.container}>
      <h1 style={styles.title}>Rechercher des Offres d'Emploi</h1>
      <form onSubmit={handleSearch} style={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ex: développeur, Dakar, React, 5 ans d'expérience"
          style={styles.input}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Recherche..." : "Rechercher"}
        </button>
      </form>

      
        {error && <p style={styles.error}>Erreur : {error}</p>}
        {results.length > 0 ? (
          <ul style={styles.list}>
            {results.map((offer) => (
              <li key={offer.id} style={styles.listItem}>
                <h3>{offer.title || "Titre indisponible"}</h3>
                <p>{offer.description || "Description indisponible"}</p>
                <p>
                  <strong>Lieu :</strong> {offer.location || "Non spécifié"}
                </p>
                <p>
                  <strong>Exigences :</strong>{" "}
                  {offer.requirements || "Non spécifié"}
                </p>
                <button
                  onClick={() => handleApply(offer.id)}
                  style={styles.applyButton}
                >
                  Postuler
                </button>
              </li>
            ))}
          </ul>
        ) : (
          !loading && !error && <p>Aucun résultat trouvé.</p>
        )}
      </div>
    </div>
  );
};

// Styles en ligne
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    height: "100vh", // Occupe toute la hauteur de la fenêtre
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
  },
  searchForm: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginBottom: "30px",
  },
  input: {
    width: "300px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#003078",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  resultsContainer: {
    flex: 1, // Permet à ce conteneur d'occuper tout l'espace restant
    width: "100%",
    maxWidth: "600px",
    overflowY: "auto", // Active le défilement vertical si nécessaire
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#fff",
  },
  list: {
    listStyle: "none",
    padding: "0",
  },
  listItem: {
    borderBottom: "1px solid #ddd",
    padding: "15px",
    backgroundColor: "#fff",
  },
  applyButton: {
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    textAlign: "center",
  },
};

export default JobSearch;
