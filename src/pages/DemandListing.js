import React, { useState, useEffect } from "react";
import styles from "./ManageEmployee.module.css";
import {
  PrimaryButton,
  SearchBox,
  FontIcon,
  MessageBar,
  MessageBarType,
  mergeStyles,
  mergeStyleSets
} from "@fluentui/react";
import AddDemandModal from "./AddDemandModal";
import axios from "axios";
import emptyData from "../image/emptyData.jpeg";
import DatabaseImg from "../image/DataNotFound.png"
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate,Link, createSearchParams } from "react-router-dom";
import Moment from "react-moment";

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



const columns = [
  {
    columnKey: "Demand ID",
    label: "Demand ID",
  },
  {
    columnKey: "Requirement",
    label: "Requirement",
  },
  {
    columnKey: "Recieved Date",
    label: "Recieved Date",
  },
  {
    columnKey: "PDC",
    label: "PDC",
  },
  {
    columnKey: "Sub Vendor",
    label: "Sub Vendor",
  },
  {
    columnKey: "Lead",
    label: "Lead",
  },
  {
    columnKey: "Client",
    label: "Client",
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
    columnKey: "Secondary Skill",
    label: "Secondary Skill ",
  },
  {
    columnKey: "Secondary Skill Experience",
    label: "Secondary Skill Experience",
  },
  {
    columnKey: "More Options",
    label: " ",
  },
];

const messageStyle=mergeStyleSets({
  root: { marginLeft:200,width:600,marginRight:20},
  icon:{display:'none '}
 
})

function DemandListing() {


  const [search, Setsearch] = useState("");

  const [getData, setData] = useState([]);

  //Update method

  //get method for all feilds except lead
  var get = async () => {
    var datas = await axios.get("http://13.228.78.94:4001/addDemandRouter/addDemandGet");
    setData(datas.data);
  };
 

  useEffect(() => {
    get();
  }, []);

  //get method for lead
  const [lead, setLead] = useState([]);

  const getlead = async () => {
    var data = await axios.get("http://13.228.78.94:4001/addEmployeeRouter/get");
    setLead(data.data);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    getlead();
  }, []);

  //mismatch
  const [mismatch, setMismatch] = useState(null);

  useEffect(() => {
    getData?.filter((item) => setMismatch(item));
  }, [search]);

  //Swetha code
  const [selectedItem, setSelectedItem] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleEdit = (item) => {
    setIsModalOpen(!isModalOpen);
    
  };
 const addSubmission=()=>{
  navigate("/submissionlisting?create=true",{
    state:selectedItem
  })
} 
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

//state for skillset

const d = new Date();
const day= String(d.getDate()).padStart(2, '0')
const Year=d.getFullYear()
const last2 = Year.toString().slice(-2);

  return (
    <div className={styles.container}>
      {
        <AddDemandModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          data={selectedItem}
          // idGen={idData}
        />
      }
    
      <div className={styles.nav_container}>
        <div className={styles.title}>Demand Listing</div>
        <MessageBar   messageBarType={MessageBarType.success} styles={messageStyle}>
        Demand Data Created Successfully! 
       </MessageBar>
        <div className={styles.searchDiv}>
          <div className={styles.search}>
            <SearchBox
              placeholder="Search Demand"
              autoComplete="on"
              iconProps={searchIcon}
              className={styles.search}
              onChange={(e) => Setsearch(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.nav_items}>
          <FontIcon iconName="Breadcrumb" className={iconClass} />
          <PrimaryButton
            onClick={() => setIsModalOpen(!isModalOpen)}
            text="Add Demand"
            iconProps={addIcon}
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
                      <FontIcon iconName={column.icon} className={iconClass1} />
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {getData.length == 0 ? (
            <div
              style={{
                width: "85%",
                height: "70%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
              }}
            >
              <img className={styles.imgFound} src={DatabaseImg} />
            </div>
          ) : (
            ""
          )}
         
          {/* {getData.filter(item=>{
            if(item.demandId.includes(search)){
              return item
            }
          })} */}

          {!getData?.filter(searchData).length ? (
            <div
              style={{
                width: "55%",
                height: "20%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
              }}
            >
              <img className={styles.dataFound} src={emptyData} alt="" />{" "}
            </div>
          ) : (
            ""
          )}

          <tbody>
            {getData
              ?.filter(searchData)

              .map((item) => {
                //Total Experience Calculation
                var maxYear = parseFloat(item.MaximumExperienceYears);
                var minYear = parseFloat(item.MaximumExperienceYears);
                var minMonth = parseFloat(item.MaximumExperienceMonths);
                var maxMonth = parseFloat(item.MinimumExperienceMonths);
                var yearResult = maxYear + minYear;
                var monthResult = minMonth + maxMonth;

                if (monthResult == 12) {
                  yearResult = yearResult + 1;
                }
                if (monthResult >= 12) {
                  monthResult = monthResult - 12;
                  yearResult = yearResult + 1;
                }

                //Primary Skill Experience
                var PrimaryYears = parseInt(item.PrimarySkillExperienceYears);
                var PrimaryMonths = parseInt(item.PrimarySkillExperienceMonths);
                if (PrimaryMonths >= 12) {
                  PrimaryYears = PrimaryYears + 1;
                }
                if (PrimaryMonths >= 12) {
                  PrimaryMonths = parseInt(PrimaryMonths) - parseInt(12);
                }

                //secondary Skill Experience
                var SecondaryYears = parseInt(
                  item.SecondarySkillExperienceYears
                );
                var SecondaryMonths = parseInt(
                  item.SecondarySkillExperienceMonths
                );
                if (SecondaryMonths >= 12) {
                  SecondaryYears = SecondaryYears + 1;
                }
                if (SecondaryMonths >= 12) {
                  SecondaryMonths = parseInt(SecondaryMonths) - parseInt(12);
                }

                return (
                  <>
                  
                    {getData == 0 ? (
                      <img className={styles.imgDesign} src={emptyData} />
                    ) : (
                      <>
                        <tr className={styles.table_row} key={item._id}>
                          <td className={styles.table_dataContents}>{item.DemandId}</td>
                          <td className={styles.table_dataContents}>{item.jobtitle}</td>
                          <td className={styles.table_dataContents}>
                            <Moment
                              format="DD MMM YYYY"
                              date={item.updatedAt}
                            />
                          </td>
                          <td className={styles.table_dataContents}>
                            {item.pointOfContact}
                          </td>
                          <td className={styles.table_dataContents}>
                            {item.subvendor}
                          </td>
                          <td className={styles.table_dataContents}>
                            {item.assigned}
                          </td>
                          <td className={styles.table_dataContents}>
                            {item.Clients}
                          </td>
                          <td className={styles.table_dataContents}>
                            {yearResult && monthResult ? (
                              <p>
                                {yearResult}.{monthResult}
                              </p>
                            ) : (
                              <p>-</p>
                            )}
                          </td>
                         
                          
                       
                      
                         {item.SkillSet[0]?( 
                         <td className={styles.table_dataContents}>
                            {item.SkillSet[0].SkillSet
}
                          </td>
                        ) : (
                          <td className={styles.table_dataContents}>-</td>
                        )}
                    
                    {item.SkillSet[0]?( 
                        <td className={styles.table_dataContents}>
                        {item.SkillSet[0].RelavenceExperienceYear
}
                      </td>
                    ) : (
                      <td className={styles.table_dataContents}>-</td>
                        )}
                 
                      
                         {item.SkillSet[1]?( 
                         <td className={styles.table_dataContents}>
                            {item.SkillSet[1].SkillSet
}
                          </td>
                        ) : (
                          <td className={styles.table_dataContents}>-</td>
                        )}
                    
                      
                         {item.SkillSet[1]?( 
                        <td className={styles.table_dataContents}>
                        {item.SkillSet[1].RelavenceExperienceYear
}
                      </td>
                    ) : (
                      <td className={styles.table_dataContents}>-</td>
                        )}
    
                          <td className={styles.table_dataContents}>
                          <MoreVertIcon onClick={(e)=>{
                      setSelectedItem({...item})
                      handleClick(e)
                  }
                  } />
                          <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
      >
       
       <div onClick={handleEdit}>
       <Typography sx={{ p: 0.5 }} >Edit</Typography>
       </div>
       <div  onClick={() => navigate("/submissionlisting")}>
       <Typography sx={{ p: 0.5 }}>View Submission</Typography>
       </div>
       {selectedItem!=null?
        <div  onClick={addSubmission}>
       <Typography   sx={{ p: 0.5 }}  >Add Submissioon</Typography>
       </div>
       :""}
      </Popover>
                          </td>
                        </tr>
                      </>
                    )}
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DemandListing;
