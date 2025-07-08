// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Cart from './cart';
// import { FaShoppingCart } from 'react-icons/fa';
// import { FaRegUser } from "react-icons/fa6";
// import { getNavItems } from '../services/api';
// function NavBar() {
//   const [isDropdownOpen, setDropdownOpen] = useState(null);
//   const[navItems, setNavItems] = useState([])
//   const toggleDropdown = (menu) => {
//     setDropdownOpen(isDropdownOpen === menu ? null : menu);
//   };
//   useEffect(()=>{
//     //fetch-->convertto json-->return data -->setNavItems
//     const loadNavItems = async ()=>{
//         try{
//             const data = await getNavItems();
//             setNavItems(data);
//         }
//         catch(error){
//             console.error("Error fetching nav items:", error);
//         }
//     }
//     loadNavItems();
//   },[]);

// //   const navItems = [
// //   {
// //     label: "Tariffs",
// //     children: [
// //       { name: "Prepaid", path: "/" },
// //       { name: "Postpaid", path: "/" },
// //     ],
// //   },
// //   {
// //     label: "Info",
// //     children: [
// //       { name: "eSIM", path: "/" },
// //       { name: "Shipping", path: "/" },
// //     ],
// //   },
// //   {
// //     label: "Help & Service",
// //     children: [
// //       { name: "FAQ & Contact", path: "/" },
// //       { name: "Service Overview", path: "/" },
// //     ],
// //   },
// //   {
// //     label: "Counselor",
// //     children: [
// //       { name: "Guide Overview", path: "/" },
// //       { name: "Parents Guide", path: "/" },
// //       { name: "Children Guide", path: "/" },
// //     ],
// //   },
// // ];


//   return (
//     <>
    
//     <nav className="bg-white shadow-md w-full z-10 relative">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <div className="text-xl font-bold text-green-600">
//           TELCO-WEB-SHOP
//         </div>
//         {/* Navigation Links */}
//         <div className="hidden md:flex space-x-6 items-center">







//           {navItems.map((item)=>(
//             <>
            
//             <div className="relative" key={item.label}>
//                 <button onClick={() => toggleDropdown(item.label)}
//               className="text-gray-700 hover:text-green-600">
//                     {item.label}
//                 </button>
            
            
//             {isDropdownOpen === item.label && (
//                 <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg border rounded">
//                 {item.children.map((child)=>(
//                     <Link to={child.path} key={child.name} className="block px-4 py-2 hover:bg-gray-100">{child.name}</Link>
//                 ))}
//               </div>
//             )}
//             </div>
//             </>

//           ))}
//         </div>

        
//         <div className="hidden md:flex space-x-4">
//           <Cart />
          
//           <button className="bg-green-200 text-white px-4 py-2 rounded hover:bg-green-700  shadow-xl">
//             <div className="text-green-500 text-2xl">
//                 <FaRegUser />
//             </div>
//           </button>
         
//         </div>
//       </div>
//     </nav>
//     </>
//   );
// }

// export default NavBar;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from './cart';
import { FaShoppingCart } from 'react-icons/fa';
import { FaRegUser } from "react-icons/fa6";
import { getNavItems } from '../services/api';
import { useUser, UserButton } from "@clerk/clerk-react";

function NavBar() {
  const [isDropdownOpen, setDropdownOpen] = useState(null);
  const [navItems, setNavItems] = useState([]);
  const { user, isSignedIn } = useUser();

  const toggleDropdown = (menu) => {
    setDropdownOpen(isDropdownOpen === menu ? null : menu);
  };

  useEffect(() => {
    const loadNavItems = async () => {
      try {
        const data = await getNavItems();
        setNavItems(data);
      } catch (error) {
        console.error("Error fetching nav items:", error);
      }
    };
    loadNavItems();
  }, []);

  return (
    <nav className="bg-white shadow-md w-full z-10 relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-green-600">
          TELCO-WEB-SHOP
        </div>
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <div className="relative" key={item.label}>
              <button onClick={() => toggleDropdown(item.label)}
                className="text-gray-700 hover:text-green-600">
                {item.label}
              </button>
              {isDropdownOpen === item.label && (
                <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg border rounded">
                  {item.children.map((child) => (
                    <Link to={child.path} key={child.name} className="block px-4 py-2 hover:bg-gray-100">{child.name}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:flex space-x-4 items-center">
          <Cart />
          {isSignedIn ? (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-medium">Hi, {user.firstName}!</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/sign-in"
                className="bg-green-200 text-green-800 px-4 py-2 rounded hover:bg-green-700 hover:text-white font-semibold shadow-xl"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 font-semibold shadow-xl"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
