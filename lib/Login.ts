
const Login = async ({ email, password}: {
email: string,
password: string
}) => {



  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/login`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email,
        password
    }),
  });
  const data = await response.json();
  return data



}

export default Login