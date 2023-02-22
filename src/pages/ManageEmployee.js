import React, { useEffect, useState } from "react";
import styles from "./ManageEmployee.module.css";
import Pagination from 'office-ui-fabric-react-pagination';
import {
  PrimaryButton,
  SearchBox,
  FontIcon,
  mergeStyles,
} from "@fluentui/react";
import AddEmployeeModal from "./AddEmployeeModal";
import axios from "axios";

const addIcon = { iconName: "Add" };
const searchIcon = { iconName: "Search" };

const iconClass = mergeStyles({
  fontSize: 20,
  height: 20,
  width: 20,
  margin: "0 10px",
  color: "#999DA0",
});

const iconClass1 = mergeStyles({
  fontSize: 12,
  height: 12,
  width: 12,
  margin: "0 ",
  color: "#999DA0",
});

const items = [
  {
    currentStatus: {
      status: "available",
    },
    employeeID: {
      label: "450945",
    },
    fullName: {
      label: "Carla Septimus",
    },
    designation: {
      label: "Associate",
    },
    lead: {
      label: "Craig Torff",
    },
    manager: {
      label: "Justin Geidt",
    },
    mobile: {
      label: "9512345678",
    },
    emailID: {
      label: "qgarcia@hotmail.com",
    },
    joiningDate: {
      label: "26 Dec 2021",
    },
    moreOptions: {
      icon: "MoreVertical",
    },
  },
  {
    currentStatus: {
      status: "available",
    },
    employeeID: {
      label: "450945",
    },
    fullName: {
      label: "Carla Septimus",
    },
    designation: {
      label: "Associate",
    },
    lead: {
      label: "Craig Torff",
    },
    manager: {
      label: "Justin Geidt",
    },
    mobile: {
      label: "9512345678",
    },
    emailID: {
      label: "qgarcia@hotmail.com",
    },
    joiningDate: {
      label: "26 Dec 2021",
    },
    moreOptions: {
      icon: "MoreVertical",
    },
  },
  {
    currentStatus: {
      status: "available",
    },
    employeeID: {
      label: "450945",
    },
    fullName: {
      label: "Carla Septimus",
    },
    designation: {
      label: "Associate",
    },
    lead: {
      label: "Craig Torff",
    },
    manager: {
      label: "Justin Geidt",
    },
    mobile: {
      label: "9512345678",
    },
    emailID: {
      label: "qgarcia@hotmail.com",
    },
    joiningDate: {
      label: "26 Dec 2021",
    },
    moreOptions: {
      icon: "MoreVertical",
    },
  },
];

const columns = [
  {
    columnKey: "current",
    label: " ",
  },
  {
    columnKey: "Employee ID",
    label: "Employee ID",
    icon: "Sort",
  },
  {
    columnKey: "Full Name",
    label: "Full Name",
    icon: "Sort",
  },
  {
    columnKey: "Designation",
    label: "Designation",
    icon: "Sort",
  },
  {
    columnKey: "Lead",
    label: "Lead",
  },
  {
    columnKey: "Manager",
    label: "Manager",
  },
  {
    columnKey: "Mobile",
    label: "Mobile",
  },
  {
    columnKey: "Email ID",
    label: "Email ID",
  },
  {
    columnKey: "Joining Date",
    label: "Joining Date",
    icon: "Sort",
  },
  {
    columnKey: "More Options",
    label: " ",
  },
];

function EmployeeListing() {
  const [dbData, getDbdata] = useState([]);

  //search state
  const [search, Setsearch] = useState("");

  const get = async () => {
    var data = await axios.get("http://localhost:5000/Employee/get");
    
    getDbdata(data.data);
  };

  useEffect(() => {
    get();
  }, []);



  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      {
        <AddEmployeeModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      }

      <div className={styles.nav_container}>
        <div className={styles.title}>Employee Details</div>

        <div className={styles.nav_items}>
          <SearchBox
            placeholder=" "
            iconProps={searchIcon}
            className={styles.search}
            onChange={(e) => Setsearch(e.target.value)}
          />
          <FontIcon iconName="Breadcrumb" className={iconClass} />
          <PrimaryButton
            text="Add Employee"
            iconProps={addIcon}
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
          <FontIcon iconName="Download" className={iconClass} />
        </div>
      </div>

      <div className={styles.table_container}>
        <table>
          <thead className={styles.table_header}>
            <tr className={styles.table_row}>
              {columns.map((column) => (
                <th
                  className={styles.table_headerContents}
                  key={column.columnKey}
                >
                  <div className={styles.table_heading}>
                    <div>{column.label}</div>
                    {column?.icon ? (
                      <FontIcon iconName={column.icon}  className={iconClass1} />
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {dbData
              ?.filter((item) => {
                if (search == "") {
                  return  item;
                } else if (item._id.includes(search)) {
                  return item;
                } else if (
                  item.firstName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                } else if (
                  item.role.toLowerCase().includes(search.toLocaleLowerCase())
                ) {
                  return item;
               
                } else if (
                  item.reportingManager
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
                ) {
                  return item;
                } else if (
                  item.email
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
                ) {
                  return item;
                }
              })

              .map((item) => (
                <tr className={styles.table_row}>
               

                  <td className={styles.table_dataContents}>
                    <div className={styles.status}></div>
                  </td>
                  <td className={styles.table_dataContents}>{item.Id}</td>
                  <td className={styles.table_dataContents}>
                  {item.first_name} 
                  </td>
                  <td className={styles.table_dataContents}>{item.role}</td>
                  <td className={styles.table_dataContents}>
                  {item.LeadId ? item.LeadId : "-"}
                  </td>
                  {console.log(item,'0000')}
                  <td className={styles.table_dataContents}>
                  {item.AccountManger}
                  </td>
                  <td className={styles.table_dataContents}>{item.mobile_number}</td>
                  <td className={styles.table_dataContents}>{item.email}</td>
                  <td className={styles.table_dataContents}>
                  {/* {Last_name_strings == '[object Object]'?'-': joiningDate }  */}
                  </td>

                  {/* <td className={styles.table_dataContents}><FontIcon iconName={item.moreOptions.icon} className={iconClass1} /></td> */}
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
            currentPage={1}
            totalPages={5}
            onChange={(page) => {alert('Send user to page: ' + page)}}
        />
      </div>
   
    </div>
  );
}

export default EmployeeListing;









// import React, { useEffect, useState } from "react";
// import styles from "./ManageEmployee.module.css";
// import {
//   PrimaryButton,
//   SearchBox,
//   FontIcon,
//   mergeStyles,
// } from "@fluentui/react";
// import AddEmployeeModal from "./AddEmployeeModal";
// import axios from "axios";
// import Moment from "react-moment";
// import Pagination from '@mui/material/Pagination';

// const addIcon = { iconName: "Add" };
// const searchIcon = { iconName: "Search" };

// const iconClass = mergeStyles({
//   fontSize: 20,
//   height: 20,
//   width: 20,
//   margin: "0 10px",
//   color: "#999DA0",
// });

// const iconClass1 = mergeStyles({
//   fontSize: 12,
//   height: 12,
//   width: 12,
//   margin: "0 ",
//   color: "#999DA0",
// });

// const items = [
//   {
//     currentStatus: {
//       status: "available",
//     },
//     employeeID: {
//       label: "450945",
//     },
//     fullName: {
//       label: "Carla Septimus",
//     },
//     designation: {
//       label: "Associate",
//     },
//     lead: {
//       label: "Craig Torff",
//     },
//     manager: {
//       label: "Justin Geidt",
//     },
//     mobile: {
//       label: "9512345678",
//     },
//     emailID: {
//       label: "qgarcia@hotmail.com",
//     },
//     joiningDate: {
//       label: "26 Dec 2021",
//     },
//     moreOptions: {
//       icon: "MoreVertical",
//     },
//   },
//   {
//     currentStatus: {
//       status: "available",
//     },
//     employeeID: {
//       label: "450945",
//     },
//     fullName: {
//       label: "Carla Septimus",
//     },
//     designation: {
//       label: "Associate",
//     },
//     lead: {
//       label: "Craig Torff",
//     },
//     manager: {
//       label: "Justin Geidt",
//     },
//     mobile: {
//       label: "9512345678",
//     },
//     emailID: {
//       label: "qgarcia@hotmail.com",
//     },
//     joiningDate: {
//       label: "26 Dec 2021",
//     },
//     moreOptions: {
//       icon: "MoreVertical",
//     },
//   },
//   {
//     currentStatus: {
//       status: "available",
//     },
//     employeeID: {
//       label: "450945",
//     },
//     fullName: {
//       label: "Carla Septimus",
//     },
//     designation: {
//       label: "Associate",
//     },
//     lead: {
//       label: "Craig Torff",
//     },
//     manager: {
//       label: "Justin Geidt",
//     },
//     mobile: {
//       label: "9512345678",
//     },
//     emailID: {
//       label: "qgarcia@hotmail.com",
//     },
//     joiningDate: {
//       label: "26 Dec 2021",
//     },
//     moreOptions: {
//       icon: "MoreVertical",
//     },
//   },
// ];

// const columns = [
//   {
//     columnKey: "current",
//     label: " ",
//   },
//   {
//     columnKey: "Employee ID",
//     label: "Employee ID",
//     icon: "Sort",
//   },
//   {
//     columnKey: "Full Name",
//     label: "Full Name",
//     icon: "Sort",
//   },
//   {
//     columnKey: "Designation",
//     label: "Designation",
//     icon: "Sort",
//   },
//   {
//     columnKey: "Lead",
//     label: "Lead",
//   },
//   {
//     columnKey: "Manager",
//     label: "Manager",
//   },
//   {
//     columnKey: "Mobile",
//     label: "Mobile",
//   },
//   {
//     columnKey: "Email ID",
//     label: "Email ID",
//   },
//   {
//     columnKey: "Joining Date",
//     label: "Joining Date",
//     icon: "Sort",
//   },
//   {
//     columnKey: "More Options",
//     label: " ",
//   },
// ];

// function EmployeeListing() {

//  //pagination code
// //  const [data, setData] = useState([]);
// const [existingData, getDbdata] = useState([]);
// console.log(existingData,"dhdh")

//   // const [currentPage, setCurrentPage] = useState(1);
//   // const [postsPerPage, setPostsPerPage] = useState(10);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const result = await axios.get(
//   //       `http://localhost:5000/get?page=${currentPage}&limit=${postsPerPage}`
//   //     );
//   //     getDbdata(result.data);
//   //   };
//   //   fetchData();
//   // }, [currentPage, postsPerPage]);

//   // const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // const pageNumbers = [];
//   // for (let i = 1; i <= Math.ceil(existingData.length / postsPerPage); i++) {
//   //   pageNumbers.push(i);
//   // }






//   //search state
//   const [search, Setsearch] = useState("");

//   const get = async () => {
//     var data = await axios.get("http://localhost:5000/Employee/get");
    
//     getDbdata(data.data);
//   };

//   useEffect(() => {
//     get();
//   }, []);



//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [page, setPage] = useState(0);
//   const [totalPage, setTotalPage] = useState(10);

//   return (
//     <div className={styles.container}>
//       {
//         <AddEmployeeModal
//           isModalOpen={isModalOpen}
//           setIsModalOpen={setIsModalOpen}
//         />
//       }

//       <div className={styles.nav_container}>
//         <div className={styles.title}>Employee Details</div>

//         <div className={styles.nav_items}>
//           <SearchBox
//             placeholder=" "
//             iconProps={searchIcon}
//             className={styles.search}
//             onChange={(e) => Setsearch(e.target.value)}
//           />
//           <FontIcon iconName="Breadcrumb" className={iconClass} />
//           <PrimaryButton
//             text="Add Employee"
//             iconProps={addIcon}
//             onClick={() => setIsModalOpen(!isModalOpen)}
//           />
//           <FontIcon iconName="Download" className={iconClass} />
//         </div>
//       </div>

//       <div className={styles.table_container}>
//         <table>
//           <thead className={styles.table_header}>
//             <tr className={styles.table_row}>
//               {columns.map((column) => (
//                 <th
//                   className={styles.table_headerContents}
//                   key={column.columnKey}
//                 >
//                   <div className={styles.table_heading}>
//                     <div>{column.label}</div>
//                     {column?.icon ? (
//                       <FontIcon iconName={column.icon}  className={iconClass1} />
//                     ) : null}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>

          
//           <tbody>


//           <div>
     
//           {existingData?.map((item) => {
//               //Total Experience Calculation
         
//             var Last_name_strings = [(item.last_name)].map(value=>String(value))
//             var joiningDate =[(item.date_of_joining)].map(value=>String(value))
            
//             // console.log(resultData,'s')
//               return (
//                 <>

//                   {existingData == 0 ? (
//              ""
//                   ) : (
//                     <>
//                                      <tr className={styles.table_row}>
               

//                <td className={styles.table_dataContents}><div className={styles.status}></div></td>
//                <td className={styles.table_dataContents}>{item.Id}</td>
//                <td className={styles.table_dataContents}>
//                  {item.first_name} {Last_name_strings == '[object Object]'?'': Last_name_strings }  
//                </td>
//                <td className={styles.table_dataContents}>{item.role}</td>
         
//                <td className={styles.table_dataContents}>{item.LeadId ? item.LeadId : "-"}</td>
//                <td className={styles.table_dataContents}>{item.AccountManger}
               
//                </td>
//                <td className={styles.table_dataContents}>  {item.mobile_number}</td>
//                <td className={styles.table_dataContents}>{item.email}</td>
//                <td className={styles.table_dataContents}>
                
//                 {Last_name_strings == '[object Object]'?'-': joiningDate } 

              
//                 </td> 

//              </tr>



                    
//                     </>
//                   )}
//                 </>
//               );
//             })}

     
//     </div>


//           </tbody>



//         </table>
//         {/* <Pagination page={3} count={totalPage} variant="outlined" color="primary" /> */}
    
//       </div>
//     </div>
//   );
// }

// export default EmployeeListing;
