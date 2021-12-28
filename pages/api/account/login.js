import cookie from 'cookie'
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'POST','HEAD'],
})
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
  }

export default async function handeler(req, res) {
    
  if (req.method === "POST") {
    const loginData = req.body;
    try {
      const response =await fetch("http://localhost:7000/ElhendawyRestaurant/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error (response.status)
    }
      const result = await response.json()
      console.log(result);
      if (result.response ===  " Authentication ") {
          res.setHeader('Set-Cookie',cookie.serialize('RTU',result.tokenID,{
            httpOnly: true,
            secure:process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60,
            sameSite:'strict',
            path:'/'
          }))
      }
      return {
        redirect: {
            destination: '/',
            permanent: false,
        },
    };
    } catch (error) {
        console.log(error);
        
    }
  }

}
