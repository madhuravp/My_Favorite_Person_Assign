// TODO It will be loaded from env. file for the real deployment
const API_URL = "http://localhost:1337";

//Sends a Get request to the server
export async function listFavPeople() {
  const response = await fetch(API_URL + "/api/logs");
  return response.json();
}

//Posts the favourite person data to the server
export async function createFavPeople(entry) {
  const response = await fetch(API_URL + "/api/logs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  return response.json();
}

//Edits the favourite person data in the database by making a PUT request
export async function editFavPeople(entry, id) {
  const response = await fetch(API_URL + "/api/logs/" + id + "/", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  return response.json();
}

//Deletes the favourite person data in the database.
export async function deleteFavPerson(id) {
  const response = await fetch(API_URL + "/api/logs/" + id + "/", {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  return response.json();
}
