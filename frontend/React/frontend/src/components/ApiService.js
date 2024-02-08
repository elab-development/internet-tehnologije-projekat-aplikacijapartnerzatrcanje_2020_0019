import axios from "axios";

class ApiService {

  register(trkac) {
    return axios.post("http://localhost:8000/api/register", trkac);
  }


  login(email, password) {
    return axios.post("http://localhost:8000/api/login", {
      email: email,
      password: password,
    });
  }


  logout() {
    return window.sessionStorage.clear();
  }

  setToken(token) {
    window.sessionStorage.setItem("token", token);
  }


  getToken() {
    return window.sessionStorage.getItem("token");
  }

  setLoginInfo(role, email, id) {
    window.sessionStorage.setItem("role", role);
    window.sessionStorage.setItem("email", email);
    window.sessionStorage.setItem("id", id);

  }

  getLoginInfo() {
    const role = window.sessionStorage.getItem("role");
    const email = window.sessionStorage.getItem("email");
    const id = window.sessionStorage.getItem("id");

    return { role, email, id };
  }

  getLoggedInTrkac() {
    const token = this.getToken();
    const { id } = this.getLoginInfo();

    if (!token || !id) {

      return Promise.reject("User is not logged in");
    }

    return axios.get(`http://localhost:8000/api/trkaci/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.data)
      .catch((error) => {

        console.error("Error fetching logged-in trkac:", error);
        throw error;
      });
  }

  async uploadProfileImage(file) {
    try {
      const formData = new FormData();
      formData.append('slika', file);

      const response = await axios.post(`http://localhost:8000/api/trkaci/${this.getLoginInfo().id}/upload-slike`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      console.log('Server response after uploading image:', response);
      return response.data;
    } catch (error) {
      console.error('Error uploading profile image:', error);
      throw error;
    }
  }

  async createRunningPlan(formData) {
    try {

      const response = await axios.post(
        "http://localhost:8000/api/planovi-trka",
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating running plan:", error);
      throw error;
    }
  }

  getTrkaci() {
    return axios.get("http://localhost:8000/api/trkaci");
  }


  getPlanoviTrka() {
    return axios.get("http://localhost:8000/api/planovi-trka");
  }

  async getStatistikeByTrkacId(trkacId) {
    try {
      const response = await axios.get(`http://localhost:8000/api/statistike-trke/${trkacId}`);
      return response.data;
    } catch (error) {
      console.error('Greška pri dohvatanju statistika trčanja:', error);
      throw error;
    }
  }


  async downloadStatistics(trkacId) {
    try {
      const response = await axios.get(`http://localhost:8000/api/statistike-trke/export/${trkacId}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `statistika_trke_export_trkac_${trkacId}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading statistics:', error);
      throw error;
    }
  }


  async getMestoInfo(trkacId) {
    return axios.get(`http://localhost:8000/api/trkaci/${trkacId}/mesto`);
  }

  getTrkaciFilter(params) {
    return axios.get("http://localhost:8000/api/trkaci", { params });
  }




  async addFriend(trkacId, friendId) {
    try {
      const response = await axios.post(`http://localhost:8000/api/trkaci/${trkacId}/add-friend`, {
        trkacId: friendId,
      }, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error adding friend:', error);
      throw error;
    }
  }


  getKomentari(planTrkeId) {
    return axios.get(`http://localhost:8000/api/komentari/${planTrkeId}`)
      .then((response) => response.data.data || [])
      .catch((error) => {
        throw error;
      });
  }

  async addKomentar(komentarData) {
    try {
      const response = await axios.post(`http://localhost:8000/api/komentari`, komentarData, {
        headers: {
          Authorization: `Bearer ${apiService.getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async createRunningStatistics(formData) {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/statistike-trke",
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating running plan:", error);
      throw error;
    }

  }



  async calculateAverageSpeed(statistikaId) {
    try {
      const response = await axios.get(`http://localhost:8000/api/statistika-trke/${statistikaId}`);
      console.log('statistiika', response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating average speed:", error);
      throw error;
    }
  }



  async getComments() {
    try {
      const response = await axios.get('http://localhost:8000/api/komentari');
      console.log("komentari", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  async deleteComment(commentId) {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/komentari/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${apiService.getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  async getAllStatistics() {
    try {
      const response = await axios.get(`http://localhost:8000/api/statistike-trke`, {
        headers: {
          Authorization: `Bearer ${apiService.getToken()}`,
        },
      }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }


  async getTrkacImage(trkacId) {
    try {
      const response = await axios.get(`http://localhost:8000/api/trkaci/${trkacId}/slika`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const imageUrl = URL.createObjectURL(blob);

      return imageUrl;
    } catch (error) {
      console.error('Greška pri dohvatanju slike trkača:', error);
      throw error;
    }
  }
};



let apiService = new ApiService();


export { apiService };
