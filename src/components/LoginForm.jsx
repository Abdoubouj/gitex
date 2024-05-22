// import axios from "axios";
// import React, { useState } from "react";

// const LoginForm = () => {
//   const [userData, setUserData] = useState({});

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios
//       .post("https://otherbluecard48.conveyor.cloud/api/Users",userData)
//       .then((res) => {
//         console.log(res.data);
//       });
// };
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" onChange={handleChange} />
//         <input type="text" name="email" onChange={handleChange} />
//         <input type="text" name="phoneNumber" onChange={handleChange} />
//         <input type="text" name="promoCode" onChange={handleChange} />
//         <button type="submit">submit</button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
