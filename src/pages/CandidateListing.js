import React, { useState, useEffect } from "react";
import styles from "./ManageEmployee.module.css";
import {  PrimaryButton,
          SearchBox,
          initializeIcons,
          FontIcon,
          mergeStyles } from "@fluentui/react";
import AddCandidateModal from "./AddCandidateModal";
import axios from "axios";
// import emptyData from "../assets/emptyData.jpg";
// import DatabaseImg from "../assets/DataNotFound.jpg";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { alpha, styled } from "@mui/material/styles";

const addIcon = { iconName: "Add" };

const searchIcon = { iconName: "Search" };

const PopoverCard = styled(Popover)(({ theme }) => ({
        width: "100%",
        color: theme.palette.success.main,
        "& .MuiSlider-thumb": {
        "&:hover, &.Mui-focusVisible": {
        boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`, },
        "&.Mui-active": {
        boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`, }, }, }));

const iconClass = mergeStyles({
        fontSize: 20,
        height: 20,
        width: 20,
        margin: "0 10px",
        color: "#999DA0", });
                
const ActionBar = {
        fontSize: "13px",
        color: "#605E5C",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", };

const iconClass1 = mergeStyles({
        fontSize: 12,
        height: 12,
        width: 12,
        margin: "0 ",
        color: "#999DA0", });

const columns = [
  { columnKey: "Candidate ID",
    label: "Candidate ID", },
  { columnKey: "Candidate Name",
    label: "Candidate Name", },
  { columnKey: "Date of Sourcing",
    label: "Date of Sourcing", },
  { columnKey: "Recruiter",
    label: "Recruiter", },
  { columnKey: "Mobile",
    label: "Mobile", },
  { columnKey: "Email ID",
    label: "Email ID", },
  { columnKey: "Primary Skill",
    label: "Primary Skill ", },
  { columnKey: "Primary Skill Experience",
    label: "Primary Skill Experience", },
  { columnKey: "Secondary Skill",
    label: "Secondary Skill ", },
  { columnKey: "Secondary Skill Experience",
    label: "Secondary Skill Experience", },
  { columnKey: "Other Skill",
    label: "Other Skill ", },
  { columnKey: "Other Skill Experience",
    label: "Other Skill Experience", },
  { columnKey: "Total Experience",
    label: "Total Experience", },
  { columnKey: "More Options",
    label: " ", },];

function CandidateListing() {

  const [add, setadd] = useState();

  const [search, Setsearch] = useState("");

  const [getData, setData] = useState([]);

  //get method for all fields except lead
  var get = async () => {
    var datas = await axios.get("http://13.228.78.94:4001/candidate/get");
    setData(datas.data);};

  useEffect(() => {
    get();
  }, []);

//get method for lead
const [lead, setLead] = useState([]);

const getlead = async () => {
  var data = await axios.get("http://localhost:5000/addEmployeeRouter/get");
  setLead(data.data);};

useEffect(() => {
  getlead();
}, []);

//delete method
var deleteData = async (id) => {
  await axios.delete(`http://localhost:5000/candidate/Delete/${id}`)
    .then((res) => {
      get()
      });};
 
const handleClick = (event) => {
    setAnchorEl(event.currentTarget); };
  
const handleClose = () => {
    setAnchorEl(null); };
  
const [mismatch, setMismatch] = useState(null);
  
useEffect(() => {
    getData?.filter((item) => setMismatch(item)); }, [search]);
  
//Popover code
const [selectedItem, setSelectedItem] = useState(null);

const [anchorEl, setAnchorEl] = React.useState(null);

const open = Boolean(anchorEl);

const id = open ? "simple-popover" : undefined;

const [isModalOpen, setIsModalOpen] = useState(false);

const navigate = useNavigate();

const handleEdit = (item) => {
    setIsModalOpen(!isModalOpen);
    setSelectedItem({ ...item }); };

let searchData = (item) => {

   if(item==""){
      return item
    } else if(item.firstName.toLowerCase().includes(search.toLocaleLowerCase())){
      return item
    } 
     else if(item.lastName.toLowerCase().includes(search.toLocaleLowerCase())){
      return item
    } 
     else if(item.createdAt.toLowerCase().includes(search.toLocaleLowerCase())){
      return item
    } 
    else if(item.emailId.toLowerCase().indexOf(search.toLocaleLowerCase())>1){
      return item
    }  
    else if(item.mobile.toString().includes(search.toLocaleLowerCase())){ 
      return item
    }  
    // else if(item.PrimarySkillSet.toString().includes(search.toLocaleLowerCase())){
    //   return item
    // }
    // else if(item.SecondarySkillSet.toString().includes(search.toLocaleLowerCase())){
    //   return item
    // }
    // else if(item.OtherSkillSet.toString().includes(search.toLocaleLowerCase())){
    //   return item
    // }
  };

initializeIcons();

return (

      <div className={styles.container}>
        {
          <AddCandidateModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            data={selectedItem}/>
        }
          <div className={styles.nav_container}>
            <div className={styles.title}>Candidate Listing</div>
              <div className={styles.searchDiv}>
                <div className={styles.search}>
                  <SearchBox
                      placeholder=" Search Candidate "
                      autoComplete="on"
                      iconProps={searchIcon}
                      className={styles.search}
                      onChange={(e) => Setsearch(e.target.value)} />
                </div>
              </div>
            <div className={styles.nav_items}>
              <FontIcon iconName="Breadcrumb" className={iconClass} />
                <PrimaryButton
                    text="Add Candidate"
                    iconProps={addIcon}
                    onClick={() => setIsModalOpen(!isModalOpen)}/>
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
                    key={column.columnKey}>
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
                  position: "fixed", }}  >
                  {/* <img className={styles.imgFound} src={DatabaseImg} /> */}
              </div>
          ) : (
            ""
          )}

          {!getData?.filter(searchData).length ? (
              <div
                style={{
                  width: "55%",
                  height: "20%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "fixed", }}>
                  <img className={styles.dataFound}  alt="" />{" "}
              </div>
          ) : (
              <tbody>
          
            {getData
              ?.filter(searchData)
                .map((item) => {
             console.log(item)
                // //Total Experience Calculation
                // var maxYear = parseFloat(item.MaximumExperienceMonths);
                // var minYear = parseFloat(item.MaximumExperienceYears);
                // var minMonth = parseFloat(item.MaximumExperienceMonths);
                // var maxMonth = parseFloat(item.MinimumExperienceMonths);
                // var yearResult = maxYear + minYear;
                // var monthResult = minMonth + maxMonth;
                // if (monthResult == 12) {
                //   yearResult = yearResult + 1;
                // }
                // if (monthResult >= 12) {
                //   monthResult = monthResult - 12;
                //   yearResult = yearResult + 1;
                // }
          
                // //Primary Skill Experience
                // var PrimaryYears = parseInt(item.PrimarySkillExperienceYears);
                // var PrimaryMonths = parseInt(item.PrimarySkillExperienceMonths);
                // if (PrimaryMonths >= 12) {
                //   PrimaryYears = PrimaryYears + 1;
                // }
                // if (PrimaryMonths >= 12) {
                //   PrimaryMonths = parseInt(PrimaryMonths) - parseInt(12);
                // }
          
                // //secondary Skill Experience
                // var SecondaryYears = parseInt(
                //   item.SecondarySkillExperienceYears
                // );
                // var SecondaryMonths = parseInt(
                //   item.SecondarySkillExperienceMonths
                // );
                // if (SecondaryMonths >= 12) {
                //   SecondaryYears = SecondaryYears + 1;
                // }
                // if (SecondaryMonths >= 12) {
                //   SecondaryMonths = parseInt(SecondaryMonths) - parseInt(12);
                // }

                // //other Skill Experience
                // var OtherYears = parseInt(
                //   item.OtherSkillExperienceYears
                // );
                // var OtherMonths = parseInt(
                //   item.OtherSkillExperienceMonths
                // );
                // if (OtherMonths >= 12) {
                //   OtherYears = OtherYears + 1;
                // }
                // if (OtherMonths >= 12) {
                //  OtherMonths = parseInt(OtherMonths) - parseInt(12);
                // }
          
                return (
                  <>
          
                    {getData == 0 ? (
                        <h1>hi</h1>
                    //   <img className={styles.imgDesign} src={emptyData} />
                   ) : (
                      <>
                   
                        <tr className={styles.table_row} key={item._id}>
                          <td className={styles.table_dataContents}>
                            {item.candidateId}
                          </td>
                          <td className={styles.table_dataContents}>
                          {item.firstName+" "+item.lastName}</td>
                          <td className={styles.table_dataContents}>
                            <Moment
                              format="DD MMM YYYY"
                              date={item.createdAt}  />
                          </td>
                          <td className={styles.table_dataContents}>Swetha
                            {item.recruiter}
                          </td>
                          <td className={styles.table_dataContents}>
                            {item.mobile}
                          </td>
                          <td className={styles.table_dataContents}>
                            {item.emailId}
                          </td>
                              
                {item.inputFields?
                      
                      <td className={styles.table_dataContents}>
                        {item.inputFields.skillSet}</td>:
                        <td className={styles.table_dataContents}>
                        -</td>
              }
                       
                         
                          {/* <td className={styles.table_dataContents}>
                            {PrimaryYears && PrimaryMonths ? (
                              <p>
                                {PrimaryYears}.{PrimaryMonths}
                              </p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                          <td className={styles.table_dataContents}><p></p>
                            {item.inputFields.skillSet}
                          </td>
                          <td className={styles.table_dataContents}>
                            {SecondaryYears && SecondaryMonths ? (
                              <p>
                                {SecondaryYears}.{SecondaryMonths}
                              </p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                          <td className={styles.table_dataContents}>
                            {item.OtherSkillSet}
                          </td>
                          <td className={styles.table_dataContents}>{OtherYears && OtherMonths ? (
                              <p>
                                {OtherYears}.{OtherMonths}
                              </p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                          <td className={styles.table_dataContents}>
                            {yearResult && monthResult ? (
                              <p>
                                {yearResult}.{monthResult}
                              </p>
                            ) : (
                              <p></p>
                            )}
                          </td> */}
                          <td className={styles.table_dataContents}>
                            <MoreVertIcon
                              style={ActionBar}
                              onClick={handleClick}/>
                            
              <PopoverCard id={id}
                           open={open}
                           anchorEl={anchorEl}
                           onClose={handleClose}
                           anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                                        }}>
                              <>
              <div onClick={() => handleEdit(item)}>
                  <Typography sx={{ p: 0.5 }}>View / Edit</Typography> </div>
              <div onClick={() => navigate("/submissionlisting")}>
                  <Typography sx={{ p: 0.5 }}> View Submission </Typography> </div>
              <div onClick={() => navigate("/submissionlisting?create=true")}> </div>
              <div onClick={()=>deleteData(item._id)}>
                  <Typography sx={{ p: 0.5 }}>Delete</Typography> </div>
                              </>
              </PopoverCard>
              </td>
              </tr> 
              </>
             )}
              </>
             );})}
              </tbody>
              )}
              </table>
              </div>
              </div>
              );}

export default CandidateListing;
