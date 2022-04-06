import React from "react";
import MyContext from "../MyContext";

export default function FinalPage() {
  return (
    <MyContext.Consumer>
      {({ course, media }) => {
        return (
          <p>
            {course}
            {media}
          </p>
        );
      }}
    </MyContext.Consumer>
  );
}
///

// const AdvancedTestOne = ({ item }) => {
//     return (
//       <CurrencyContext.Consumer>
//         {(currency) => (
//           <li>
//             {item.title} - {item.price} {currency}
//           </li>
//         )}
//       </CurrencyContext.Consumer>
//     );
//   };
