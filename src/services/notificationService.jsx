import axios from './api';

export const getNotifications = (candidateId) => {
  return axios.get(`/notifications/${candidateId}`);
};

export const markNotificationAsRead = (notificationId) => {
  return axios.patch(`/notifications/${notificationId}/read`);
};
