/* global axios */
import evoConstants from 'dashboard/constants/globals';

export const getTestimonialContent = () => {
  return axios.get(evoConstants.TESTIMONIAL_URL);
};
