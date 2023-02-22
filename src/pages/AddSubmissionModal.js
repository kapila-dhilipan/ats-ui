import React, { useState,useEffect} from "react";
import {  Modal,DefaultButton } from "@fluentui/react";
import { Toggle } from "@fluentui/react/lib/Toggle";
import styles from "./AddSubmissionModal.module.css";
import { Icon } from "@fluentui/react/lib/Icon";
import {
  TextField,
  PrimaryButton,
  DatePicker,
  defaultDatePickerStrings,
} from "@fluentui/react";
import { Dropdown } from "@fluentui/react/lib/Dropdown"
import { mergeStyles, mergeStyleSets } from "@fluentui/react";
import { Popup } from "../components/Popup";
import { ActionButton } from "@fluentui/react/lib/Button";
import axios from "axios";
import { useLocation } from "react-router-dom";





const contractIconClass = mergeStyles({
  fontSize: 20,
  height: "20px",
  width: "20px",
  cursor: "pointer",
});
const dropDownRegularStyles = mergeStyleSets({
  dropdown: { minWidth: "300px", minHeight: "20px" },
  title: { height: "22px", lineHeight: "18px", fontSize: "12px" },
  caretDownWrapper: { height: "22px", lineHeight: "20px !important" },
});
const dropDownMonthStyles = mergeStyleSets({
  dropdown: { width: "90px", minWidth: "100%", minHeight: "20px" },
  title: { height: "22px", lineHeight: "18px", fontSize: "12px" },
  caretDownWrapper: { height: "22px", lineHeight: "20px !important" },
});
const closeIconClass = mergeStyles({
  fontSize: 16,
  height: "20px",
  width: "20px",
  cursor: "pointer",
});

const calendarClass = mergeStyleSets({
  root: {
    "*": {
      minWidth: "100px",
      width: "100%",
      fontSize: 12,
      height: "22px !important",
      lineHeight: "20px !important",
    },
  },
  icon: { height: 10, width: 10, left: "80%", padding: "0px 0px" },
  fieldGroup: { border: "0.5px solid grey !important" },
  statusMessage: { marginBottom: "-25px" },
});

const dropDownStyles = mergeStyleSets({
  dropdown: { minWidth: "160px", minHeight: "10px" },
  title: {
    marginLeft:'4px',
    height: "22px",
    lineHeight: "18px",
    fontSize: "12px",
  },
  caretDownWrapper: { height: "22px", lineHeight: "20px !important" },
});

const dropDownStyles2 = mergeStyleSets({
  dropdown: { minHeight: "20px", minWidth: "130px" },
  title: {
    height: "22px",
    lineHeight: "18px",
    fontSize: "12px",
  },
  caretDownWrapper: { height: "22px", lineHeight: "20px !important" },
});

const toggleStyles = mergeStyleSets({
  root: { marginBottom: "0px", width: "120px" },
  label: { width: "190px" },
});

const options = [
    { key: "remote", text: " Remote" },
    { key: "office", text: " Office" },
    { key: "hybrid", text: " Hybrid" },
  ];

  const empTypeOption = [
    { key: "Contract ", text: "Contract" },
    { key: "Permanent", text: "Permanent" },
  ];
  const dropDownMonth = [
    { key: 1, text: "1" },
    { key: 2, text: "2" },
    { key: 3, text: "3" },
    { key: 4, text: "4" },
    { key: 5, text: "5" },
    { key: 6, text: "6" },
    { key: 7, text: "7" },
    { key: 8, text: "8" },
    { key: 9, text: "9" },
    { key: 10, text: "10" },
    { key: 11, text: "11" },
    { key: 12, text: "12" },
  ];
  
  const dropDownYear = [
    { key: 1, text: "1" },
    { key: 2, text: "2" },
    { key: 3, text: "3" },
    { key: 4, text: "4" },
    { key: 5, text: "5" },
    { key: 6, text: "6" },
    { key: 7, text: "7" },
    { key: 8, text: "8" },
    { key: 9, text: "9" },
    { key: 10, text: "10" },
    { key: 11, text: "11" },
    { key: 12, text: "12" },
  ];

const PrefferedModeofHire = [
  { key: "C2H (contract to Hire) - Client side ", text: "C2H (contract to Hire) - Client side " },
  { key: "Permanent  - Internal recruitment ", text: "Permanent  - Internal recruitment " },
];

const dropDownLocation = [
  { key: "Chennai" , text: "Chennai" },
  { key:  "USA", text: "USA" },
  { key: "Bangalore", text: "Bangalore" },
];


const dropDownGender = [
  { key:  "Male", text: "Male" },
  { key:  "Female", text: "Female" },
  { key:  "Others", text: "Others" },
];


const dropDownNoticePeriods = [
  { key: "Immediate", text: "Immediate" },
  { key:  "< 15 days", text: "< 15 days" },
  { key: "< 30 Days" , text: "< 30 Days" },
  { key:  "< 60 Days " , text: "< 60 Days " },
  { key: " > 60 days", text: " > 60 days" },
];

const onFormatDate = (date) => {
  return !date
    ? ""
    : date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        (date.getFullYear() % 100);
};

//Add Icon & Style
const addIcon = { iconName: "Add" };
const tickIcon = { iconName: "Accept" };
const closeIcon = { iconName: "Cancel" };

const dropDownPrimarySkill = [
  { key: "React JS", text: "React JS " },
  { key: "Angular", text: "Angular" },
  { key: "AWS", text: "AWS" },
  { key: "DotNet", text: "DotNet" },
];
const AddSubmissionModal = (props) => {
  const da=useLocation()
  //Model Open State
  let isModalOpen = props.isModalOpen;
  const setIsModalOpen = props.setIsModalOpen;
  const [cid,setCid]=useState('')
  const [isModalShrunk, setIsModalShrunk] = useState(false);
  const [id, setId] = useState("");
  const [isedit, setisEdit] = useState(false);
  //Toggle Statement
  const [show, toggleShow] = useState(true);

  //Open and Close Popup Syntanx
  const [showPopup, setShowPopup] = useState(false);
  //State for all textField
  const[getId,setGetId]=useState([])
  const [selectedFile, setselectedFile] = useState('')
  const [employeeData, setEmployeeData] = useState({
    //Basic InFormation
    demandId:"",
    submissionId:"",
    ExpectedCTC:"",
    firstName:"",
    lastName: "",
    emailId:"",
    mobile: "",
    State: "",
    City: "",
    Pincode: "",
  });
  const [dropdownValue,setDropdownValue]=useState({
    NoticePeriod:"",
    Status:"",
    PreferredModeOfHire:"",
    Gender:"",
    CurrentLocation: "",
    PreferredLocation: "",
  })
  //Error handling Statement
  const [errors, setErrors] = useState({});

 //Chanage size for zoom in and Zoom Out
  const modalSizeHandler = () => {
    setIsModalShrunk(!isModalShrunk);
  };
//Chanage size for  Zoom Ou
  const closeHandler = () => {
    setShowPopup(!showPopup);
    // setIsModalOpen(!isModalOpen);
  };
const [fieldList, setfieldList] = useState([
  {
    CompanyName: "",
    StartDate: "",
    EndDate: "",
    JobRole: "",
    WorkModel: "",
    CTC: "",
    EmployementType: "",
    IndustryType: "",
    C2H: "",
    JobSKills: "",
  },
]);
const [skillList, setSkillList] = useState([
  {
    SkillSet: "",
    RelavenceExperienceYear: "",
    RelavenceExperienceMonth: "",
  },
]);
 //Handle employee Details field add and close
 const handleAddField = (l) => {
 l? setfieldList([
  ...fieldList,
  {
    CompanyName: "",
    StartDate: "",
    EndDate: "",
    JobRole: "",
    WorkModel: "",
    CTC: "",
    EmployementType: "",
    IndustryType: "",
    C2H: "",
    JobSKills: "",
  },
]):  setSkillList([
  ...skillList,
  {
    SkillSet: "",
    RelavenceExperienceYear: "",
    RelavenceExperienceMonth: "",
  },
])

};
const handleDropDown = (index, i, name,con) => {
  let data = [...fieldList];
  let skill=[...skillList]
  con?data[index][name] = i.key:
  skill[index][name] = i.key
};
const DynamicChangeHandler=(i,e)=>{
  let data = [...fieldList];
data[i][e.target.name]=e.target.value
setfieldList(data)

}
  const handleRemoveField = (index,con) => {
    const values = [...fieldList];
    values.splice(
      values.findIndex((value) => value.index === index),
      1
    )
    const  skill= [...skillList];
    skill.splice(
      values.findIndex((value) => value.index === index),
      1
    )
    con?
   setfieldList([values])
    :
    setSkillList(skill);
  };

  useEffect(() => {
    if(da.state!=null)
   { setEmployeeData({
        demandId:da.state.DemandId})
      }else if(props.data!==null){
        setEmployeeData({
          demandId:props.data.demandId,
          ExpectedCTC:props.data.ExpectedCTC,
          firstName:props.data.firstName,
          lastName:props.data.lastName,
          emailId:props.data.emailId,
          mobile: props.data.mobile,
          State: props.data.State,
          City:props.data.City,
          Pincode: props.data.Pincode,
        });
    
        setSkillList( props.data.skillSet.map((i) =>i))
        

        props.data.EmployeeDetails.map(i=>{
          return(
        setfieldList([{
          StartDate:new Date(i.StartDate),
          CompanyName: i.CompanyName,
          EndDate: new Date(i.EndDate),
          JobRole: i.JobRole,
          WorkModel: i.WorkModel,
          CTC:i.CTC ,
          EmployementType:i.EmployementType,
          IndustryType:i.IndustryType,                                                             
          C2H:i.C2H ,
          JobSKills:i.JobSKills,
        }]) )});
      setDropdownValue({
      demandId:props.data.demandId,
      NoticePeriod:props.data.NoticePeriod,
      Status:props.data.Status,
      PreferredModeOfHire:props.data.PreferredModeOfHire,
      Gender:props.data.Gender,
      CurrentLocation: props.data.CurrentLocation,
      PreferredLocation: props.data.PreferredLocation,
        });
      }
    },[props.data,da.state])

//Handle TextFilled onChange Statement
  const inputChangeHandler = (e) => {
    let {name,value}=e.target
 
    setEmployeeData({...employeeData,[name]:value})
  }
 
 //Handle DropDown onChnage Statement
  const dropDownHandler = (e, item, name) => {
    setDropdownValue({...dropdownValue,[name]:item.key})
  
  };
  const getCandidateData=(id)=>{
    axios.get(`http://localhost:5000/candidate/get/${id}`).then(res=>{
     
      console.log(res.data)
    if(da.state!==null){
      
        setDropdownValue({
          NoticePeriod:res.data.NoticePeriod,        
          PreferedModeOfHire:res.data.preferedModeofHire ,
          Gender:res.data.Gender,
          CurrentLocation:res.data.CurrentLocation,
          PreferredLocation: res.data.PreferredLocation,
            });
           
         console.log(res.data.PreferedModeOfHire,'kkkkkkkk')
      setEmployeeData({
        demandId:da.state.DemandId,
        ExpectedCTC:res.data.ExpectedCTC,
        firstName:res.data.firstName,
        lastName:res.data.lastName,
        emailId:res.data.emailId,
        mobile:res.data.mobile,
        State:res.data.State,
        City: res.data.City,
        Pincode: res.data.Pincode,
      });
       
      // setSkillList(getId.inputFields.map(i=>i))
      res.data.skillSet.map(i=>{
        let obj = JSON.parse(i)
        console.log(obj)
        return(
      setSkillList([{
     SkillSet:obj.SkillSet,
    RelavenceExperienceYear: obj.RelavenceExperienceYear,
    RelavenceExperienceMonth: obj.RelavenceExperienceMonth,
      }]))})
      
      setselectedFile(res.data.file_path)
       
      res.data.EmployeeDetails.map(i=>{
        let obj = JSON.parse(i)
       
        return(
      setfieldList([{
        StartDate:new Date(obj.StartDate),
        CompanyName: obj.CompanyName,
        EndDate: new Date(obj.EndDate),
        JobRole: obj.JobRole,
        WorkModel: obj.WorkModel,
        CTC:obj.CTC ,
        EmployementType:obj.EmployementType,
        IndustryType:obj.IndustryType,
        C2H:obj.C2H ,
        JobSKills:obj.JobSKills,
      }]) )});
    } })}
 
  
     
  const postRes = async(selectedFile) => {
    // console.log("selectedFile",selectedFile.name)
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    try {

      const response = await axios({
        method: "post",
        url: "http://localhost:5000/api/resumeupload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch(error) {
      console.log(error)
    }
  }
  const  handleFileChange = (e) => {
    setselectedFile(e.target.files[0])
    // if(selectedFile!==undefined|| null){
      postRes(e.target.files[0])
    // }
  };
  
  //Handle Date onChnage Statement
  const dateHandler = (index,date, name) => {
    let data = [...fieldList];
    data[index][name] = date;
  };
let EmployeeDetails=fieldList

let skillSet=skillList;
let allData={...employeeData,...dropdownValue,EmployeeDetails,skillSet}
  //Submission Validation
  const submitHandler=(e)=>{
    e.preventDefault()
    if (!isedit) {
   
      setErrors(Validation(allData))
      if (
       allData
      ) {
        
        axios.post('http://localhost:5000/addSubmissionRouter/addSubmissionCreate',allData)
              .then((res) => {
               
                let alert = window.confirm(
                  `${allData.submissionId} data posted Successfully`
                );
                if (alert) {
                  setIsModalOpen(!isModalOpen);
                  window.location.reload(true);
                  
                }
              })
              .catch((err) => console.log(err));
      }
      else {
        alert("please Fill the form");
      }
         
      } 
      
     else if (isedit) {
      axios
        .put(`http://localhost:5000/addSubmissionRouter/addSubmissionUpdate/${id}`, allData)
        .then((res) => {
          setIsModalOpen(!isModalOpen);
          window.location.reload(true);
          axios.get("http://localhost:5000/addSubmissionRouter/addSubmissionGet");
        })
        .catch((err) => console.log(err));
    }
  };

 //Validation for Submission
const Validation=(value)=>{

  // regex
const emailRegex =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameRegex = /^[A-Za-z]+$/;
const mobileRegex = /^[6-9]\d{9}$/;
var error={}

//FirstName Validation
if(!value.firstName){
  error.firstName=' Required'
}else if(!nameRegex.test(value.firstName)){
  error.firstName='Enter Currect name'
}

//LastName Validation
if(!value.lastName){
  error.lastName='Required'
}else if(!nameRegex.test(value.lastName)){
  error.lastName='Enter Currect name'
}

//Gmail validation
if(!value.emailId){
  error.emailId='Required'
}else if(!emailRegex.test(value.emailId)){
  error.emailId='Enter Valid Email'
}
//Mobile Number Validation
if(!value.mobile){
  error.mobile='Required'
}else if(!mobileRegex.test(value.mobile)){
  error.mobile='Enter Currect Number'
}

if(!value.Gender){
  error.Gender='Required'
}
if(!value.State){
  error.State='Required'
}
if(!value.City){
  error.City='Required'
}
if(!value.Pincode){
  error.Pincode='Required'
}

//Employee Details Validation


return error 
}
  return (
    <div>
      {
        <Popup
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      }
      <Modal
        scrollableContentClassName={
          styles.addSubmission_modal_scrollable_content
        }
        containerClassName={`${
          isModalShrunk
            ? styles.addSubmission_modal_container_shrunk
            : styles.addSubmission_modal_container
        }`}
        isOpen={isModalOpen}
      >
        <div className={styles.addSubmission_modal_header_container}>
          <div className={styles.header_tag_expand_close_icon_container}>
            <div className={styles.header_tag_container}>Submission</div>
            { da.state?  (
            <div className={styles.header_expand_close_icon_container}>
              <div
                onClick={modalSizeHandler}
                className={styles.header_expand_icon_container}
              >
                {isModalShrunk ? (
                  <Icon iconName="FullScreen" className={contractIconClass} />
                ) : (
                  <Icon iconName="BackToWindow" className={contractIconClass} />
                )}
              </div>
              <div
                onClick={() => closeHandler()}
                className={styles.header_close_icon_container}
              >
                <Icon iconName="ChromeClose" className={closeIconClass} />
              </div>
            </div>
            ):""}
          </div>
          <div className={styles.header_content_container}>
            <div className={styles.header_content_title_container}>
            {isedit ? (
              <div className={styles.header_content_title_container}>
             Submission ID:{employeeData.submissionId}
            </div>
              ) : (
                <div className={styles.header_content_title_container}>
                Add Submission
              </div>
              )}
              

              <div className={styles.header_content_save_container}>
              
                <div className={styles.header_save_close_btns_container}>
                      
                <input type="file" id="getFile" className={styles.myupload} onChange={  handleFileChange}
                     
                     ></input>
                <DefaultButton text={(selectedFile.type===undefined) ?  "Attach Resume" : (`${selectedFile.name}`)} 
                  iconProps={(selectedFile.type===undefined) ?  addIcon : tickIcon} 
                  className={styles.upbtn}
                  onClick={()=>{document.getElementById('getFile').click()}}
                  />
                   {da.state?
                  <PrimaryButton
                    text={`Save & Close`}
                    onClick={submitHandler}
                    iconProps={{ iconName: "Save" }}
                  />:''
                   }
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.addemployee_modal_main_container}>
          <div className={styles.main_filter_options_container}>
            <div className={styles.subcontainer}>
              <div className={styles.main_dropdown_container}>
                <div className={styles.main_teamlead_title}> Demand ID</div>
                <div
                    >

                      <TextField
                        placeholder="Search"
                        type="text"
                        name="demandId"
                        value={employeeData.demandId}
                        styles={HalfField}
                        onChange={(e) => inputChangeHandler(e)} 
                        disabled      
                      />

                    </div>
              </div>
          
              <div className={styles.main_dropdown_container}>
                <div className={styles.main_status_title}>CandidateId</div>
                {da.state?
                <>
                <TextField
                  placeholder="select an option"
                  value={cid}
                  name='CandidateID'
                  styles={TextHalfField}
                  onChange={(e)=>setCid(e.target.value)}
                />
                <button onClick={()=>{
                  getCandidateData(cid)
                  }}>get</button>
                  </>:<TextField
                  disabled
                placeholder="select an option"
                value={employeeData.candidateId}
                name='CandidateID'
                styles={HalfField}
                className={styles.loc_dropdown_status}
                onChange={(e)=>inputChangeHandler(e)}
              />}
                
               
                
              </div>
             
            </div>

            <div className={styles.subcontainer}>
              <div className={styles.main_dropdown_container}>
                <div className={styles.main_repotingmanager_title}>
                  Expected CTC
                </div>
                <TextField
                            type="text"
                       name="ExpectedCTC"
                       styles={HalfField}
                       value={employeeData.ExpectedCTC}
                       onChange={(e) => inputChangeHandler(e)} 
                       disabled
                />
              </div>

              <div className={styles.main_dropdown_container}>
                <div className={styles.main_location_title}>
                  Preferred Mode of Hire
                </div>
              <Dropdown
                  placeholder="select an option"
                  styles={dropDownStyles}
                  options={PrefferedModeofHire}
                  defaultSelectedKey={dropdownValue.PreferredModeOfHire}
                  onChange={(e,item)=>dropDownHandler(e,item,"PreferredModeOfHire")}
                  disabled
                />
               
              </div>
            </div>

            <div className={styles.subcontainer}>
              <div className={styles.main_dropdown_container}>
                <div className={styles.main_repotingmanager_title}>
                  Notice Period
                </div>
                <Dropdown
                  placeholder="select an option"
                  styles={dropDownStyles}
                  options={dropDownNoticePeriods}
                 defaultSelectedKey={dropdownValue.NoticePeriod}
                  onChange={(e,item)=>dropDownHandler(e,item,"NoticePeriod") 
                }
                disabled
                />
              </div>
            </div>
          </div>

          <div className={styles.main_information_container}>
            <div className={styles.main_basic_information_container}>
              <div className={styles.main_basic_information_title}>
                BASIC INFORMATION
              </div>

              <div className={styles.main_basic_information_content_container}>
                <div className={styles.main_from_field}>
                  <div className={styles.main_sub_from_field}>
                    <div>First Name</div>
                    <div
                      className={
                        employeeData.firstName || errors.firstName
                          ? styles.showfield
                          : styles.hidefield
                      }
                    >
                      
                      <TextField
                        type="text"
                        name="firstName"
                        value={employeeData.firstName}
                        onChange={(e) => inputChangeHandler(e)}
                        errorMessage={errors.firstName}
                        styles={Field}
                        disabled
                      />
                    </div>
                  </div>

                  <div className={styles.main_sub_from_field}>
                    <div>Last Name</div>
                    <div
                      className={
                        employeeData.lastName || errors.lastName
                          ? styles.showfield
                          : styles.hidefield
                      }
                    >
                      <TextField
                        type="text"
                        name="lastName"
                        styles={Field}
                        value={employeeData.lastName}
                        onChange={(e) => inputChangeHandler(e)}
                        errorMessage={errors.lastName}
                        disabled
                      />
                    </div>
                  </div>

                  <div className={styles.main_sub_from_field}>
                    <div>Email ID</div>
                    <div
                      className={
                        employeeData.emailId||errors.emailId
                          ? styles.showfield
                          : styles.hidefield
                      }
                    >
                      <TextField
                        type="email"
                        name="emailId"
                        value={employeeData.emailId}
                        errorMessage={errors.emailId}
                        styles={Field}
                        disabled
                        onChange={(e) => inputChangeHandler(e)}
                      />
                    </div>
                  </div>

                  <div className={styles.main_sub_from_field}>
                    <div>Mobile Number</div>
                    <div
                      className={
                        employeeData.mobile || errors.mobile
                          ? styles.showfield
                          : styles.hidefield
                      }
                    >
                      <TextField
                        maxLength='10'
                        disabled
                        name="mobile"
                        styles={Field}
                        value={employeeData.mobile}
                        errorMessage={errors.mobile}
                        onChange={(e) => inputChangeHandler(e)}
                      />
                    </div>
                  </div>

                  <div className={styles.main_sub_from_field_gender}>
                    <div>Gender</div>
                    <div
                      className={
                        employeeData.Gender || errors.Gender
                          ? styles.showfield
                          : styles.hidefield
                      }
                    >
                      <Dropdown
                        placeholder="select an option"
                        options={dropDownGender}
                        defaultSelectedKey={dropdownValue.Gender}
                        onChange={(e, item) =>
                          dropDownHandler(e, item, "Gender")
                        }disabled
                        errorMessage={errors.Gender}
                        styles={dropDownStyles2}
                      />
                    </div>
                  </div>

                  <div className={styles.main_sub_from_field}>
                    <div>State</div>
                    <div
                      className={
                        employeeData.State || errors.State
                          ? styles.showfield
                          : styles.hidefield
                      }
                    >
                      <TextField
                      disabled
                        type="text"
                        name="State"
                        value={employeeData.State}
                        styles={Field}
                        errorMessage={errors.State}
                        onChange={(e) => inputChangeHandler(e)}
                      />
                    </div>
                  </div>

                  <div className={styles.main_sub_from_field}>
                    <div>City</div>
                    <div
                      className={
                        employeeData.City || errors.City
                          ? styles.showfield
                          : styles.hidefield
                      }
                    >
                      <TextField
                        type="text"
                        name="City"
                        value={employeeData.City}
                        styles={Field}
                        errorMessage={errors.City}
                        onChange={(e) => inputChangeHandler(e)}
                        disabled
                      />
                    </div>
                  </div>

                  <div className={styles.main_sub_from_field}>
                    <div>Pincode</div>
                    <div
                      className={
                        employeeData.Pincode || errors.Pincode
                          ? styles.showfield
                          : styles.hidefield
                      }
                    >
                      <TextField
                      maxLength='6'
                        type="text"
                        name="Pincode"
                        value={employeeData.Pincode}
                        styles={Field}
                        errorMessage={errors.Pincode}
                        onChange={(e) => inputChangeHandler(e)}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.main_basic_information_container}>
              <div className={styles.main_basic_header}>
                <div className={styles.main_basic_header_title}>
                  EMPLOYMENT DETAILS
                </div>
                <div className={styles.main_basic_header_title2}>
                  <ActionButton
                    iconProps={addIcon}
                    ariaLabel="Add"
                    onClick={() => {
                      handleAddField(true);
                    }}
                    disabled
                  >
                    Add
                  </ActionButton>
                </div>
              </div>
              <div className={styles.main_basic_information_content_container}>
                <div className={styles.table_container}>
                  <table>
                    <thead className={styles.table_header}>
                      <tr className={styles.table_row}>
                        <th className={styles.table_headerContents}>
                          <div className={styles.table_heading}>
                            Company Name
                          </div>
                        </th>

                        <th className={styles.table_headerContents}>
                          <div className={styles.table_heading}>Start Date</div>
                        </th>

                        <th className={styles.table_headerContents}>
                          <div className={styles.table_heading}>End Date</div>
                        </th>

                        <th className={styles.table_headerContents}>
                          <div className={styles.table_heading}>Job Role</div>
                        </th>

                        <th className={styles.table_headerContents}>
                          <div className={styles.table_heading}>Work Model</div>
                        </th>

                        <th className={styles.table_headerContents}>
                          <div className={styles.table_heading}>CTC</div>
                        </th>

                        <th className={styles.table_headerContents}>
                          <div className={styles.table_heading}>
                            Employment Type
                          </div>
                        </th>

                        <th className={styles.table_headerContents}>
                          <div className={styles.table_heading}>
                            Industry Type
                          </div>
                        </th>

                        <th className={styles.table_headerContents}>
                          <div className={styles.table_heading}>
                            C2H Payroll
                          </div>
                        </th>

                        <th className={styles.table_headerContents}>
                          <div className={styles.table_heading}>Job Skills</div>
                        </th>
                      </tr>
                    </thead>

                    {fieldList?.map((field, index) => (
                      <tbody>
                      
                        <tr className={styles.table_row}>
                       
                          <td className={styles.table_dataContents}>
                          
                            <div
                              className={
                                employeeData.CompanyName || errors.CompanyName
                                  ? styles.showfield
                                  : styles.hidefield
                              }
                            >
                          
                              <TextField
                                type="text"
                                name="CompanyName"
                                value={field.CompanyName}
                                styles={Field}
                                onChange={(e) =>
                                  DynamicChangeHandler(index,e)
                                }
                                disabled
                                errorMessage={errors.CompanyName}
                              />
                            </div>
                            
                          </td>

                          <td className={styles.table_dataContents}>
                            <div
                              className={
                                employeeData.StartDate || errors.Date
                                  ? styles.showfield
                                  : styles.hidefield
                              }
                            >
                              
                              <DatePicker
                                placeholder="DD/MM/YYYY"
                                name="StartDate"
                                value={field.StartDate}
                                formatDate={onFormatDate}
                                strings={defaultDatePickerStrings}
                                onSelectDate={(date) =>
                                  dateHandler(index,date, "StartDate")
                                }
                                disabled
                                isRequired={errors.Date}
                                styles={calendarClass}
                              />
                            </div>
                          </td>

                          <td className={styles.table_dataContents}>
                            <div
                              className={
                                employeeData.EndDate || errors.Date
                                  ? styles.showfield
                                  : styles.hidefield
                              }
                            >
                              
                              <DatePicker
                               placeholder="DD/MM/YYYY"
                               name="EndDate"
                               value={field.EndDate}
                               formatDate={onFormatDate}
                               onSelectDate={(date) =>
                                dateHandler(index,date, "EndDate")
                              }
                              disabled
                               strings={defaultDatePickerStrings}
                               isRequired={errors.Date}
                               styles={calendarClass}
                              />
                            </div>
                          </td>

                          <td className={styles.table_dataContents}>
                            <div
                              className={
                                employeeData.JobRole || errors.JobRole
                                  ? styles.showfield
                                  : styles.hidefield
                              }
                            >
                              <Dropdown
                                placeholder="select an option"
                                name="JobRole"
                                 defaultSelectedKey={field.JobRole}
                                options={options}
                                onChange={(e, i) =>
                                  handleDropDown(index, i,'JobRole',true)
                                }
                                disabled
                                errorMessage={errors.JobRole}
                                styles={dropDownStyles2}
                              />
                            </div>
                          </td>

                          <td className={styles.table_dataContents}>
                            <div
                              className={
                                employeeData.WorkModel|| errors.WorkModel
                                  ? styles.showfield
                                  : styles.hidefield
                              }
                            >
                              <TextField
                                type="text"
                                name="WorkModel"
                                value={field.WorkModel}
                                styles={Field}
                                onChange={(e) =>
                                  DynamicChangeHandler(index,e)
                                }
                                disabled
                                errorMessage={errors.WorkModel}
                              />
                            </div>
                          </td>

                          <td className={styles.table_dataContents}>
                            <div
                              className={
                                employeeData.CTC || errors.CTC
                                  ? styles.showfield
                                  : styles.hidefield
                              }
                            >
                              
                              <TextField
                                type="text"
                                name="CTC"
                                value={field.CTC}
                                styles={Field}
                                onChange={(e) =>
                                  DynamicChangeHandler(index,e)
                                }disabled
                                errorMessage={errors.CTC}
                              />
                            </div>
                          </td>

                          <td className={styles.table_dataContents}>
                            <div
                              className={
                                employeeData.C2H || errors.C2H
                                  ? styles.showfield
                                  : styles.hidefield
                              }
                            >
                              <Dropdown
                                placeholder="select an option"
                                name="EmployementType"
                                options={empTypeOption}
                                defaultSelectedKey={field.EmployementType}
                                onChange={(e, i) =>
                                  handleDropDown(index, i, "EmployementType",true)
                                }disabled
                                // errorMessage={errors.gender}
                                styles={dropDownStyles2}
                              />
                            </div>
                          </td>

                          <td className={styles.table_dataContents}>
                            <div
                              
                            >
                              <Dropdown
                                placeholder="select an option"
                                name="IndustryType"
                                options={options}
                                defaultSelectedKey={field.IndustryType}
                                disabled
                                onChange={(e, i) =>
                                  handleDropDown(index, i, "IndustryType",true)
                                }
                               
                                styles={dropDownStyles2}
                              />
                                
                            </div>
                          </td>

                          <td className={styles.table_dataContents}>
                            <div
                              className={
                                employeeData.C2H || errors.C2H
                                  ? styles.showfield
                                  : styles.hidefield
                              }
                            >
                              <TextField
                                type="text"
                                name="C2H"
                                value={field.C2H}
                                styles={Field}
                                onChange={(e) =>
                                  DynamicChangeHandler(index,e)
                                }disabled
                                errorMessage={errors.C2H}
                              />
                            </div>
                          </td>

                          <td className={styles.table_dataContents}>
                            <div
                              className={
                                employeeData.JobSKills|| errors.JobSKills
                                  ? styles.showfield
                                  : styles.hidefield
                              }
                            >
                              <TextField
                                type="text"
                                name="JobSKills"
                                value={field.JobSKills}
                                styles={Field}
                                onChange={(event) =>
                                  DynamicChangeHandler(index,event)
                                }disabled
                                errorMessage={errors.JobSKills}
                              />
                             
                            </div>
                          </td>
                          <td className={styles.table_dataContents}>
                            <ActionButton
                              iconProps={closeIcon}
                              onClick={() => {
                                handleRemoveField(index,true);
                              }}disabled
                            ></ActionButton>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>

              <div className={styles.main_information_container2}>
                <div className={styles.main_preference_style}>
                  <div className={styles.main_basic_information_title}>
                    PREFERENCES
                  </div>

                  <div className={styles.main_basic_information_container2}>
                    <div className={styles.main_sub_from_field}>
                      <div>Current Location</div>
                      <Dropdown
                        placeholder="select an option"
                        defaultSelectedKey={dropdownValue.CurrentLocation}
                        options={dropDownLocation}
                        onChange={(e, item) =>
                          dropDownHandler(e, item, "CurrentLocation")
                        }disabled
                        styles={dropDownStyles2}
                      />
                    </div>
                     
                    <Toggle
                    disabled
                      label="Willing to relocate"
                      defaultChecked
                      onText="Yes"
                      offText="No"
                      styles={toggleStyles}
					  onClick={() => toggleShow(!show)}
					  
                    />
						  {show && 
                    <div className={styles.main_sub_from_field}>
                      <div>Preferred Location</div>
                      <Dropdown
                        placeholder="select an option"
                        options={dropDownLocation}
                        value={dropdownValue.PreferredLocation}
                        defaultSelectedKey={dropdownValue.PreferredLocation}
                        onChange={(e, item) =>
                          dropDownHandler(e, item, "PreferredLocation")
                        }disabled
                        styles={dropDownStyles2}
                      />
                    </div>
                 }
                  </div>
                </div>
                <div >
              <div
                className={styles.main_right_skill_set_experience_container}
              >
                <div 
                className={styles.main_right_skill_set_title}
                >
                  <div className={styles.main_right_title}> SKILL SET</div>
                  <div className={styles.main_left_title}>
                  <ActionButton
                    iconProps={addIcon}
                    ariaLabel="Add"
                    onClick={() => {
                      handleAddField(false);
                    }}
                    disabled
                  >
                    Add
                  </ActionButton>
                  </div>
                </div>
              </div>



              {skillList.map((field, index) => (
                <div
                  className={styles.main_right_skill_set_experience_container}
                  key={index}
                >
                  <div
                    className={
                      styles.skillsetStyle
                    }
                  >
                    Skill Set
                    <div
                      className={styles.main_right_skill_set_dropdown_container}
                    >
                      <Dropdown
                        placeholder="Select"
                        styles={dropDownRegularStyles}
                        options={dropDownPrimarySkill}
                        defaultSelectedKey={field.SkillSet}
                        errorMessage={errors.skillSet}
                        disabled
                        onChange={(e, i) =>
                          handleDropDown(index, i, "SkillSet",false)
                        }
                      />
                    
                    </div>
                       
                  </div>
                  <div className={styles.main_right_skill_experience_container}>
                    <div className={styles.main_right_skill_experience_title}>
                      Relavent Skill Experience
                    </div>
                    <div
                      className={
                        styles.main_right_skill_experience_dropdown_container
                      }
                    >
                      <Dropdown
                        placeholder="Year(s)"
                        styles={dropDownMonthStyles}
                        options={dropDownYear}
                        defaultSelectedKey={field.RelavenceExperienceYear}
                        errorMessage={errors.Years}
                        onChange={(e, i) =>
                          handleDropDown(index, i, "RelavenceExperienceYear",false)
                        }
                        disabled
                      />
                      <Dropdown
                        placeholder="Month(s)"
                        styles={dropDownMonthStyles}
                        options={dropDownMonth}
                        defaultSelectedKey={field.RelavenceExperienceMonth}
                        errorMessage={errors.Months}
                        onChange={(e, i) =>
                          handleDropDown(index, i, "RelavenceExperienceMonth",false)
                        }disabled
                      />
                      <div className={styles.main_icon_right_Alignment}>
                        <ActionButton
                          iconProps={closeIcon}
                          styles={{
                            icon: { color: "red", fontSize: 19 },
                            root: {
                              paddingBottom: 20,
                            },
                          }}
                          onClick={() => {
                            handleRemoveField(index,false);
                          }}
                          disabled
                        ></ActionButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
 }

function Field(props) {
  return {
    fieldGroup: [{ height: "22px", width: "100%", border: "0.5px solid grey" }],
  };
}
function TextHalfField(props) {
  return {
    fieldGroup: [{ height: "19px", width: "68%", border: "0.5px solid grey",marginLeft:"60px" }],
  };
}

function HalfField(props) {
  return {
    fieldGroup: [{ height: "22px", width: "73%", border: "0.5px solid grey",marginLeft:"60px" }],
  };
}

export default AddSubmissionModal;