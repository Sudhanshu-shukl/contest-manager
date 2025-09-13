// Auto-detect the correct API URL
const getApiBaseUrl = () => {
  // If running on localhost, use localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }
  // If running on GitHub Pages, use a placeholder (you'll need to deploy backend separately)
  if (window.location.hostname === 'sudhanshu-shukl.github.io') {
    // For now, return a mock URL to prevent errors
    return 'https://jsonplaceholder.typicode.com/posts'; // Temporary mock API
  }
  // If running on your local IP, use the same IP for API
  return `http://${window.location.hostname}:5000/api`;
};

const API_BASE_URL = getApiBaseUrl();

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Contest CRUD operations
  async getContests() {
    return this.request('/contests');
  }

  async getUpcomingContests() {
    return this.request('/contests/upcoming');
  }

  async getPastContests() {
    return this.request('/contests/past');
  }

  async getContest(id) {
    return this.request(`/contests/${id}`);
  }

  async createContest(contestData) {
    return this.request('/contests', {
      method: 'POST',
      body: JSON.stringify(contestData),
    });
  }

  async updateContest(id, contestData) {
    return this.request(`/contests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contestData),
    });
  }

  async markContestAsDone(id, questionsSolved) {
    return this.request(`/contests/${id}/mark-done`, {
      method: 'PUT',
      body: JSON.stringify({ questionsSolved }),
    });
  }

  async markContestAsSkipped(id) {
    return this.request(`/contests/${id}/mark-skipped`, {
      method: 'PUT',
    });
  }

  async deleteContest(id) {
    return this.request(`/contests/${id}`, {
      method: 'DELETE',
    });
  }

  async getContestStats() {
    return this.request('/contests/stats/summary');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService();
