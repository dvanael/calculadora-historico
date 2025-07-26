"use strict";

export class ApiWrapper {
  constructor() {
    this.baseUrl = "http://localhost:8000/api/";
  }

  async request(endpoint, method="GET", body=null) {
    const headers = {
      'Content-Type': 'application/json',
    }
    const options = {
      method,
      headers,
      credentials: 'include',
    };

    if (this.getCSRFToken()){
      headers['X-CSRFToken'] = this.getCSRFToken()
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(response.status);
    }

    try {
      return await response.json();
    } catch (error) {
      if (response.status == 204){
        return null
      }
      throw error;
    }
  }
  // Cookies
  getCSRFToken() {
    const cookies = document.cookie.split(";");
    // busca elemento com "csrf, se não for undefined, pega o valor do token"
    const csrftoken = cookies.find( row => row.startsWith("csrftoken="))?.split("=")[1]
    return csrftoken
  }

  // Users
  getUsers() {
    return this.request("users/");
  }

  getUser(id) {
    return this.request(`users/${id}/`);
  }

  getUserMe() {
    return this.request("me/");
  }

  // Operations
  getOperations() {
    return this.request("operations/");
  }

  getOperation(id) {
    return this.request(`operations/${id}/`);
  }

  getUserOperations(id) {
    return this.request(`users/${id}/operations/`);
  }

  createOperation(id, data) {
    return this.request(`users/${id}/operations/`, "POST", data);
  }

  updateOperation(id, data) {
    return this.request(`operations/${id}/`, "PUT", data);
  }

  deleteOperation(id) {
    return this.request(`operations/${id}/`, "DELETE");
  }

}

