export default async function SignupHandeler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch("http://localhost:7000/ElhendawyRestaurant/addNewAcount", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(req.body),
      });

      if (!response.ok) {
        throw new Error(response.status || "some thing wrong");
      }
      const result = await response.json();
      res.send(result)
    } catch (error) {
        console.log(error.message);
    }
  }
}
