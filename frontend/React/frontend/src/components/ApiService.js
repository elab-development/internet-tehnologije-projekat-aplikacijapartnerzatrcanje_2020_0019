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
 
  setLoginInfo(role, email,id) {
    window.sessionStorage.setItem("role", role);
    window.sessionStorage.setItem("email", email);
    window.sessionStorage.setItem("id", id);
    
  }

  getLoginInfo() {
    const role = window.sessionStorage.getItem("role");
    const email = window.sessionStorage.getItem("email");
    const id = window.sessionStorage.getItem("id");

    return { role, email,id };
  }


  
  async getTrkacById(id) {
    try {
      const response = await axios.get(`http://localhost:8000/api/trkaci/${id}`, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching trkac by ID:', error);
      throw error;
    }
  }
  
  async getLoggedInTrkac() {
    const { id } = this.getLoginInfo();
    
    if (!id) {
      console.error('Trkac ID not found in session storage');
      return null;
    }
  
    try {
      const trkacData = await this.getTrkacById(id);
  
      console.log('Fetched data for logged-in trkac:', trkacData);
      return trkacData;
    } catch (error) {
      console.error('Error fetching logged-in trkac:', error);
      throw error;
    }
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
  
  
  




  
}


let apiService = new ApiService();


export { apiService };
