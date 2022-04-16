import axios from "axios";

// export default axios.create({
//   baseURL: "https://mso_kleinanzeigen.jonaslbgtt.live.com",
//   headers: {
//     Authorization:
//       //   "Client-ID 2b98c1afb0aed3b3d94a1866bdc3ac013d21a0c86d236a0fee32355c331c0296",
//       "",
//   },
// });

export async function getBackend(path) {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}${path}`);
  return await response.data;
}

//setLessonsss(response.data);

//     const response = await createRequest('services/spotify/state');
//   return await response.json();

// export default async function createRequest(
//   url: string,
//   method = 'GET',
//   body: object | null = null
// ): Promise<Response> {
//   return await fetch(`/api/${url}`, {
//     method,
//     credentials: 'include',
//     redirect: 'manual',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: body ? JSON.stringify(body) : null,
//   });
// }
