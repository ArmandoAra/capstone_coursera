// MODIFICAR;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Header2 from "./Header2";
// import Footer from "./Footer";
// import Nav from "./Nav";
// import "../assets/styles/Checkout.css";

// export const Checkout = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [creditNo, setCreditNo] = useState("");
//   const [expDate, setExpDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [proceed, setProceed] = useState(false);
//   return (
//     <>
//       <Nav />
//       <Header2 />
//       <main>
//         <section>
//           <form className="checkout-form">
//             <fieldset>
//               <label htmlFor="name">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => {
//                   setName(e.target.value);
//                 }}
//                 required
//               />
//             </fieldset>
//             <fieldset>
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                 }}
//                 required
//               />
//             </fieldset>
//             <fieldset>
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 id="password"
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                 }}
//                 required
//               />
//             </fieldset>
//             <fieldset>
//               <label htmlFor="confirm-password">Confirm Password</label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 id="confirm_password"
//                 onChange={(e) => {
//                   setConfirmPassword(e.target.value);
//                 }}
//                 required
//               />
//             </fieldset>
//             <fieldset>
//               <div className="credit-card-field">
//                 <div className="credit-card-label-num">
//                   <label htmlFor="credit-card-no" className="credit-card-label">
//                     Credit Card
//                   </label>
//                   <input
//                     type="text"
//                     id="credit-card-no"
//                     value={creditNo}
//                     onChange={(e) => {
//                       setCreditNo(e.target.value);
//                     }}
//                     placeholder="credit card number"
//                     required
//                     className="credit-card-input"
//                   />
//                 </div>
//                 <div className="cvv-expdate-field">
//                   <input
//                     type="text"
//                     value={expDate}
//                     onChange={(e) => {
//                       setExpDate(e.target.value);
//                     }}
//                     placeholder="exp.date(mm/yyyy)"
//                     required
//                   />
//                   <input
//                     type="text"
//                     value={cvv}
//                     onChange={(e) => setCvv(e.target.value)}
//                     placeholder="CVV"
//                     required
//                   />
//                 </div>
//               </div>
//             </fieldset>
//             <fieldset className="terms-check">
//               <div>
//                 <input
//                   type="checkbox"
//                   checked={proceed}
//                   onChange={(e) => setProceed(!proceed)}
//                 />
//                 <label htmlFor="terms-check">
//                   Are you sure you want to continue
//                 </label>
//               </div>
//             </fieldset>
//             <fieldset className="bottom-buttons">
//               <div>
//                 <Link to="/checkout">
//                   <button type="submit" aria-label="On click">
//                     Submit
//                   </button>{" "}
//                 </Link>
//               </div>
//               <div className="btnReceive">
//                 <Link to="/booking">
//                   <button type="button" aria-label="On Click">
//                     Cancel
//                   </button>
//                 </Link>
//               </div>
//             </fieldset>
//           </form>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// };
