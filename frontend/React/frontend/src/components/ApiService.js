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


  

  
  getLoggedInTrkac() {
    const token = this.getToken();
    const { id } = this.getLoginInfo(); // Fetch the id from sessionStorage
  
    if (!token || !id) {
      // Handle the case when there is no token or id (user is not logged in)
      return Promise.reject("User is not logged in");
    }
  
    return axios.get(`http://localhost:8000/api/trkaci/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.data)
      .catch((error) => {
        // Handle any errors that occur during the API request
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
      // Pravite HTTP POST zahtev ka odgovarajućoj ruti na serveru
      const response = await axios.post(
        "http://localhost:8000/api/planovi-trka", // Postavite pravilnu rutu za kreiranje plana trke
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      // Vraćate odgovor sa servera
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
  



  
}


let apiService = new ApiService();


export { apiService };
