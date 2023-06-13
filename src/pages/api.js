const API_URL = "https://dummyjson.com/users";

export const fetchDummyData = () => {
  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      const users = data.users || [];

      // Modify and return the data if needed
      const modifiedData = users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        age: user.age,
      }));

      return modifiedData;
    });
};
