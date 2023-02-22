import React, { useEffect, useState } from "react";
import styles from "./ManageEmployee.module.css";
import {
  PrimaryButton,
  SearchBox,
  initializeIcons,
  FontIcon,
  mergeStyles,
} from "@fluentui/react";
import AddSubmissionModal from "./AddSubmissionModal";
import axios from "axios";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { alpha, styled } from "@mui/material/styles";

import Moment from "react-moment";
const addIcon = { iconName: "Add" };
const searchIcon = { iconName: "Search" };

const PopoverCard = styled(Popover)(({ theme }) => ({
  width: "100%",
  color: theme.palette.success.main,
  "& .MuiSlider-thumb": {
    "&:hover, &.Mui-focusVisible": {
      boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
    },
    "&.Mui-active": {
      boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
    },
  },
}));

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



const columns = [
  {
    columnKey: "Demand ID",
    label: "Demand ID",
  },
  {
    columnKey: "Recruiter Name",
    label: "Recruiter Name",
  },
  {
    columnKey: "Submission ID",
    label: "Submission ID",
  },
  {
    columnKey: "Submission Date",
    label: "Submission Date",
  },
  {
    columnKey: "Candidate ID",
    label: "Candidate ID",
  },
  {
    columnKey: "Candidate Name",
    label: "Candidate Name",
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
    columnKey: "Total Experience",
    label: "Total Experience",
  },
  {
    columnKey: "Primary Skill",
    label: "Primary Skill ",
  },
  {
    columnKey: "Primary Skill Experience",
    label: "Primary Skill Experience",
  },
  {
    columnKey: "More Options",
    label: " ",
  },
];

const ActionBar = {
  fontSize: "13px",
  color: "#605E5C",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

function SubmissionListing(props) {
  
  
  const [search, Setsearch] = useState("");

  const [getDemandID, setDemandID] = useState([]);

  //demand id 

  const get = async () => {
    const {data} = await axios.get("http://localhost:5000/addSubmissionRouter/addSubmissionGet")
    setDemandID(data);
 
  };

useEffect(()=>{

get()
},[])

  //delete method
  var deleteData = async (id) => {
    await axios.delete(`http://localhost:5000/addSubmissionRouter/addSubmissionDelete/${id}`)
      .then((res) => {
        get()
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let isCreate = new URLSearchParams(window.location.search).get("create");
    if (isCreate) {
      setIsModalOpen(true);
    }
  }, [props]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
 let data=[];
  const [getDemand, setDemand] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    setIsModalOpen(!isModalOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const navigate = useNavigate();

  initializeIcons();

  let searchData = (item) => {
    if (item._id.includes(search)) {
      return item;
    } else if (item.jobtitle.toLowerCase().includes(search.toLowerCase())) {
      return item;
    } else if (
      item.assigned &&
      item.assigned.toLowerCase().includes(search.toLowerCase())
    ) {
      return item;
    } else if (item.updatedAt.toLowerCase().includes(search.toLowerCase())) {
      return item;
    } else if (
      item.pointOfContact.toLowerCase().includes(search.toLowerCase())
    ) {
      return item;
    } else if (item.Clients.toLowerCase().includes(search.toLowerCase())) {
      return item;
    } else if (
      item.PrimarySkillSet.toLowerCase().includes(search.toLowerCase())
    ) {
      return item;
    } else if (
      item.SecondarySkillSet.toLowerCase().includes(search.toLowerCase())
    ) {
      return item;
    } else {
    }
  };

  return (
    <div className={styles.container}>
      {
        <AddSubmissionModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          data={selectedItem}
        />
      }
      
      <div className={styles.nav_container}>
        <div className={styles.title}>Submission Listing</div>

        <div className={styles.nav_items}>
          <SearchBox
            placeholder="Search"
            iconProps={searchIcon}
            className={styles.search}
          />
          <FontIcon iconName="Breadcrumb" className={iconClass} />
          
          {/* <PrimaryButton
            text="Add Submission"
            iconProps={addIcon}
            onClick={() => setIsModalOpen(!isModalOpen)}
          /> */}
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
                      <FontIcon iconName={column.icon} className={iconClass1} />
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>


      

          <tbody>
            {getDemandID.map((item) => {
              return(
              <tr className={styles.table_row} key={item._id}>
                <td className={styles.table_dataContents}>{item.demandId}</td>
                <td className={styles.table_dataContents}>recruiter</td>
                <td className={styles.table_dataContents}>{item.submissionId}
                </td>
                
              
                
               <td className={styles.table_dataContents}>  <Moment
                              format="DD MMM YYYY"
                              date={item.EmployeeDetails[0].StartDate}
                            /></td>
               <td className={styles.table_dataContents}>-</td>
                <td className={styles.table_dataContents}>{item.firstName}</td>

                <td className={styles.table_dataContents}>{item.mobile}</td>
                <td className={styles.table_dataContents}>{item.emailId}</td>
             
                 
                {item.skillSet[0]?
                      
                        <td className={styles.table_dataContents}>
                          {item.skillSet[0].RelavenceExperienceYear}</td>:
                          <td className={styles.table_dataContents}>
                          -</td>
                }
                 
                {item.skillSet[0]?
                      
                        <td className={styles.table_dataContents}>
                          {item.skillSet[0].SkillSet}</td>:
                          <td className={styles.table_dataContents}>
                          -</td>
                }
                {item.skillSet[1]?
                      
                        <td className={styles.table_dataContents}>
                          {item.skillSet[0].RelavenceExperienceYear}</td>:
                          <td className={styles.table_dataContents}>
                          {item.skillSet[0].RelavenceExperienceYear}</td>
                }
               
                 <td className={styles.table_dataContents}>
                <MoreVertIcon onClick={(e)=>{
                      setSelectedItem({...item})
                      handleClick(e)
                  }
                  } />
                  <PopoverCard
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <>
                      <div onClick={handleEdit}>
                        <Typography sx={{ p: 0.5 }}>Edit</Typography>
                      </div>
                      <div onClick={() => navigate("/demandreport/managedemands?create=true")}>
                        <Typography sx={{ p: 0.5 }}>View Demand</Typography>
                      </div>
                      
                      <div
                     onClick={() =>
                          navigate("/demandreport/managedemands?create=true")
                        }
                      >
                        <Typography sx={{ p: 0.5 }}>Add Demand</Typography>
                      </div>
                      <div onClick={()=>deleteData(item._id)}>
                        <Typography sx={{ p: 0.5 }}>Delete</Typography>
                      </div>
                    </>
                  </PopoverCard>
                </td>
              </tr>
           )})}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubmissionListing;