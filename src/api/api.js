import axios from "axios";

// export default axios.create({
//   baseURL: "https://mso_kleinanzeigen.jonaslbgtt.live.com",
//   headers: {
//     Authorization:
//       //   "Client-ID 2b98c1afb0aed3b3d94a1866bdc3ac013d21a0c86d236a0fee32355c331c0296",
//       "",
//   },
// });

//Die nächsten beiden Funktionen muss ich hinsichtlich Parametern noch umschreiben. Es geht aber auch mit mehreren Params, jedoch muss das dann in nem Oject übergeben werden!
export async function getBackend(path) {
  console.log(path);
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

  console.log(response.data);
  return await response.data;
}

export async function postBackend(data) {
  console.log("penim  " + JSON.stringify(data));
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
  console.log(response.data + "fjnh");
  return await response.data;
}

export async function getProducts(start, end) {
  console.log("Übergebene Parameter: " + start + " und " + end);
  const res = await fetch(start);
  const d = await res.json();
  return d.data;
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
