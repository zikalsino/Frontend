import React, { useEffect, useState } from 'react';
import NotificationService from '../../services/NotificationService';

function Alerts() {
  const [offerNotifications, setOfferNotifications] = useState([]);
  const [applicationAlerts, setApplicationAlerts] = useState([]);

  useEffect(() => {
    // Charger les notifications d'offres
    NotificationService.getOfferNotifications().then(setOfferNotifications);
    // Charger les alertes de candidatures
    NotificationService.getApplicationStatusAlerts().then(setApplicationAlerts);
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <h3>Offres correspondantes :</h3>
      <ul>
        {offerNotifications.map(notification => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>

      <h3>Statut des candidatures :</h3>
      <ul>
        {applicationAlerts.map(alert => (
          <li key={alert.id}>{alert.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Alerts;
