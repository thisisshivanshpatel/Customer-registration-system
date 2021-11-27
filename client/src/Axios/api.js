import axios from "./axios";

export function registerCustomer(request) {
  // const config = {
  //   headers: {
  //     "content-type": "multipart/formdata",
  //   },
  // };
  return axios.post("/customer/registration", request);
}

export function customerList() {
  return axios.get("/admin/getCustomerList");
}

export function getCustomerById(id) {
  return axios.get(`/admin/getCustomerByUid/${id}`);
}
