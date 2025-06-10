export default class CommunityDetailModel {
  async getCardById(id) {
    try {
      const response = await fetch(`http://localhost:5000/cards/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch card data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
