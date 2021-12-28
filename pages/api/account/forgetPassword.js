export default async function ForgetPasswordHandeler(req, res) {
    if (req.method === "POST") {
      try {
        const response = await fetch("http://localhost:7000/ElhendawyRestaurant/forgetPassword", {
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
        console.log(result);
        res.status(200).send(result)
      } catch (error) {
          console.log(error.message);
          if (error.message === 404) {
            res.status(400).send('email not exist')
          }
      }
    }
  }
  