//Axios
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
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}${path}`,
    { withCredentials: true },
    {
      headers: {
        "Access-Control-Allow-Origin":
          "http://kleinanzeigen_api.jonaslbgtt.live:8080",
      },
    }
  );
  return await response.data;
}

export async function postBackend(data) {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/me/articles`,
    data,
    { withCredentials: true }
    // {
    //   headers: {
    //     "Access-Control-Allow-Origin":
    //       "http://kleinanzeigen_api.jonaslbgtt.live:8080",
    //   },
    // },
  );
  return await response.data;
}

export async function putBackend(data) {
  delete data.realName;
  delete data.owner;

  const response = await axios
    .put(
      `${process.env.REACT_APP_API_URL}/api/me/articles`,
      data,
      { withCredentials: true }
      // {
      //   headers: {
      //     "Access-Control-Allow-Origin":
      //       "http://kleinanzeigen_api.jonaslbgtt.live:8080",
      //   },
      // },
    )
    .catch(function (error) {
      console.log(error);
    });
  localStorage.setItem("putproduct", JSON.stringify(response.data));

  return await response.data;
}

export async function postFavorites(id) {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/me/favorites?favorites=${id}`,
    null,
    { withCredentials: true }
    // {
    //   headers: {
    //     "Access-Control-Allow-Origin":
    //       "http://kleinanzeigen_api.jonaslbgtt.live:8080",
    //   },
    // }
  );
  return await response.data;
}

export async function deleteFavorites(id) {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/me/favorites?favorites=${id}`,
      { withCredentials: true }
      // {
      //   headers: {
      //     "Access-Control-Allow-Origin":
      //       "http://kleinanzeigen_api.jonaslbgtt.live:8080",
      //   },
      // }
    );
    return await response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getInfoProduct() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/articles/info`,
      { withCredentials: true }
      // {
      //   headers: {
      //     "Access-Control-Allow-Origin":
      //       "http://kleinanzeigen_api.jonaslbgtt.live:8080",
      //   },
      // }
    );
    return await response.data.count;
  } catch (error) {
    console.log(error);
  }
}

// export async function getProducts(start, end) {
//   const res = await fetch(start);
//   const d = await res.json();
//   return d.data;
// }

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
