import React, {  useState } from "react";
import { Modal } from "@fluentui/react";
import { Toggle } from "@fluentui/react/lib/Toggle";
import styles from "./AddCandidateModal.module.css";
import { Icon } from "@fluentui/react/lib/Icon";
import { TextField, PrimaryButton, DatePicker } from "@fluentui/react";
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import { mergeStyles, mergeStyleSets } from "@fluentui/react";
import { Popup } from "../components/Popup";
import { ActionButton, DefaultButton } from "@fluentui/react/lib/Button";
import { initializeIcons } from "@uifabric/icons";
import axios from "axios";


const dropDownRegularStyles = mergeStyleSets({
  dropdown: { minWidth: "300px", minHeight: "20px" },
  title: { height: "22px", lineHeight: "18px", fontSize: "12px" },
  caretDownWrapper: { height: "22px", lineHeight: "20px !important" },
});
const dropDownPrimarySkill = [
  { key: "React JS", text: "React JS " },
  { key: "Angular", text: "Angular" },
  { key: "AWS", text: "AWS" },
  { key: "DotNet", text: "DotNet" },
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
const dropDownMonthStyles = mergeStyleSets({
  dropdown: { width: "90px", minWidth: "100%", minHeight: "20px" },
  title: { height: "22px", lineHeight: "18px", fontSize: "12px" },
  caretDownWrapper: { height: "22px", lineHeight: "20px !important" },
});
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
initializeIcons();


// regex
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameRegex = /^[A-Za-z]+$/;
const mobileRegex = /^[6-9]\d{9}$/;
const panNumberRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
const adhaarNumberRegex = /[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;

const contractIconClass = mergeStyles({
  fontSize: 20,
  height: "20px",
  width: "20px",
  cursor: "pointer",
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
      width: "100%",
      fontSize: 12,
      height: "22px !important",
      lineHeight: "20px !important",
    },
  },
  icon: { height: 10, width: 10, left: "85%", padding: "0px 0px" },
  fieldGroup: { border: "0.5px solid grey !important" },
  statusMessage: { marginBottom: "-25px" },
});

const dropDownStyles = mergeStyleSets({
  dropdown: { minWidth: "160px", minHeight: "20px" },
  title: {
    height: "22px",
    lineHeight: "18px",
    fontSize: "12px",
    border: "0.5px solid grey",
  },
  caretDownWrapper: { height: "22px", lineHeight: "20px !important" },
});

const dropDownStyles2 = mergeStyleSets({
  dropdown: { minHeight: "20px" },
  title: {
    height: "22px",
    lineHeight: "18px",
    fontSize: "12px",
    border: "0.5px solid grey",
  },
  caretDownWrapper: { height: "22px", lineHeight: "20px !important" },
});

const toggleStyles = mergeStyleSets({
  root: { marginBottom: "0px" },
});
const dropDownLocation = [
  { key: "Chennai" , text: "Chennai" },
  { key:  "USA", text: "USA" },
  { key: "Bangalore", text: "Bangalore" },
];
const NoticePeriod = [
  { key: "Immediate", text: "Immediate" },
  { key:  "< 15 days", text: "< 15 days" },
  { key: "< 30 Days" , text: "< 30 Days" },
  { key:  "< 60 Days " , text: "< 60 Days " },
  { key: " > 60 days", text: " > 60 days" },
];

const dropDownStatus = [
  { key: "Open", text: "Open" },
  { key: "Close" , text: "Close" },
  { key:"On Hold", text: "On Hold" },
  { key: "In progress" , text: "In progress" },
];

const PreferredModeofHire = [
  { key:"C2H (contract to Hire) - Client side", text: "C2H (contract to Hire) - Client side" },
  { key: "Permanent  - Internal recruitment ", text: "Permanent  - Internal recruitment " },
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

const dropDownGender = [
  { key:  "Male", text: "Male" },
  { key:  "Female", text: "Female" },
  { key:  "Others", text: "Others" },
];

const WorkModel = [
  { key: "remote", text: " Remote" },
  { key: "office", text: " Office" },
  { key: "hybrid", text: " Hybrid" },
];

const employmentType = [
  { key: "Contract ", text: "Contract" },
  { key: "Permanent", text: "Permanent" },
];

const IndustryType = [
  { key: "remote", text: " Remote" },
    { key: "office", text: " Office" },
    { key: "hybrid", text: " Hybrid" },
];

//Add Icon & Style
const addIcon = { iconName: "Add" };
const tickIcon = { iconName: "Accept" };
const closeIcon = { iconName: "Cancel" };
const classNames = mergeStyleSets({
  Red: [{ color: "red" }],
});

const AddCandidateModal = (props) => {
  let isModalOpen = props.isModalOpen;

  const setIsModalOpen = props.setIsModalOpen;

  const [isModalShrunk, setIsModalShrunk] = useState(false);
  const [WillingToRelocate, setWillingToRelocate] = useState(true);
  const [isedit, setisEdit] = useState(false);
  
  //handling upload 

const [selectedFile, setselectedFile] = useState([])
  
 
 
  
  // const postRes = async(selectedFile) => {
   
  //   try {

 
  // }
  
  const handleFileChange = (e) => {
    setselectedFile(e.target.files[0])
    // if(selectedFile!==undefined|| null){
      // postRes(e.target.files[0])
    // }

  };
  const [candidateDropDown,setCandidateDropDown]=useState({
    Status:"",
    PreferredModeOfHire:"",
    PreferredLocation :"" ,
    CurrentLocation: "",
    NoticePeriod: "",
  })


  //Toggle Statement
  const [show, toggleShow] = useState(true);

  const [employeeData, setEmployeeData] = useState({
    ExpectedCTC: "",
    Status: "",
    firstName: "",
    lastName: "",
    emailId: "",
    mobile: "",
    Gender: "",
    State: "",
    City: "",
    Pincode: "",
  
  });

  const [errors, setErrors] = useState({});

  const Validation = (value) => {
    var error = {};
  
    if (!value.role) {
      error.role = "Required";
    }
    if (!value.firstName) {
      error.firstName = "Required";
    } else if (!nameRegex.test(value.firstName)) {
      error.firstName = "Enter Proper Name";
      
    }
    if (!value.lastName) {
      error.lastName = "Required";
    } else if (!nameRegex.test(value.lastName)) {
      error.lastName = "Enter Proper Name";
    }
    if (!value.emailId) {
      error.emailId = "Required";
    } else if (!emailRegex.test(value.emailId)) {
      error.emailId = "Enter Proper Email";
    }
    if (!value.mobile) {
      error.mobile = "Required";
    } else if (!mobileRegex.test(value.mobile)) {
      error.mobile = "Enter Correct Number";
    }
    // if (!value.EndDate) {
    //   error.EndDate = "";
    // }
    // if (!value.dateOfJoin) {
    //   error.dateOfJoin = " ";
    // }
    // if (!value.dateOfBirth) {
    //   error.dateOfBirth = " ";
    // }
    // if (!value.maritalStatus) {
    //   error.maritalStatus = " ";
    // }
    // if (!value.address1) {
    //   error.address1 = " ";
    // }
    // if (!value.address2) {
    //   error.address2 = "Required ";
    // }
    if (!value.City) {
      error.City = "Required";
    }
    if (!value.Pincode) {
      error.Pincode= "Required";
    }

    if (!value.gender) {
      error.gender = "Required";
    }

    if (!panNumberRegex.test(!value.panNumber)) {
      error.panNumber = "Required";
    }

    if (!value.adhaarNumber) {
      error.adhaarNumber = "Required";
    }

    if (!value.noticePeriod) {
      error.noticePeriod = "Required";
    }
    if (!value.status) {
      error.status = "required";
    }
    if (!value.PreffedModeofHire) {
      error.PreffedModeofHire = "required";
    }
    if (!value.PreferredLocation) {
      error.PreferredLocation = "required";
    }
   
    if (!value.State) {
      error.State = "required";
    }
    if (!value.ExpectedCTC) {
      error.ExpectedCTC = "required";
    }
    if (!value.CurrentLocation) {
      error.CurrentLocation = "required";
      

    }
    if (!value.PreferredLocation) {
      error.PreferredLocation = "required";
    }
value.skillSet.map(i=>{
      if(!i.SkillSet){
      error.SkillSet = "required";
    }
    })

    value.skillSet.map(i=>{
      if(!i.Year){
      error.Year = "required";
    }
    })

    value.skillSet.map(i=>{
      if(!i.Month){
      error.Month = "required";
    }
    })

    value.CandidateEmpDetails.map(i=>{
      if(!i.CompanyName){
      error.CompanyName = "required";
    }
    })

    value.CandidateEmpDetails.map(i=>{
      if(!i.StartDate){
      error.StartDate = "required";
    }
    })

    value.CandidateEmpDetails.map(i=>{
      if(!i.EndDate){
      error.EndDate = "required";
    }
    })

    value.CandidateEmpDetails.map(i=>{
      if(!i.JobRole){
      error.JobRole = "required";
    }
    })


    value.CandidateEmpDetails.map(i=>{
      if(!i.WorkModel){
      error.WorkModel = "required";
    }
    })


   


    value.CandidateEmpDetails.map(i=>{
      if(!i.CTC){
      error.CTC = "required";
    }
    })


    value.CandidateEmpDetails.map(i=>{
      if(!i.EmployementType){
      error.EmployementType = "required";
    }
    })


    value.CandidateEmpDetails.map(i=>{
      if(!i.IndustryType){
      error.IndustryType = "required";
    }
    })


    value.CandidateEmpDetails.map(i=>{
      if(!i.C2H){
      error.C2H = "required";
    }
    })


    value.CandidateEmpDetails.map(i=>{
      if(!i.JobSKills){
      error.JobSKills = "required";
    }
    })

    value.CandidateEmpDetails.map(i=>{
      if(!i.radio){
      error.radio = "required";
    }
    })
    return error;
  };

  const [showPopup, setShowPopup] = useState(false);

  const [skillSet, setskillSet] = useState([
      {
    SkillSet: "",
    RelavenceExperienceYear: "",
    RelavenceExperienceMonth: "",
  },
  ]);

  const [CandidateEmpDetails, setCandidateEmpDetails] = useState([
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
  
 
  const formData= new FormData();
formData.append("file_path", selectedFile);
formData.append('City',employeeData.City)
formData.append('mobile',employeeData.mobile)
formData.append('emailId',employeeData.emailId)
formData.append('firstName',employeeData.firstName)
formData.append('State',employeeData.State)
formData.append('Gender',candidateDropDown.Gender)
formData.append('lastName',employeeData.lastName)
formData.append('Pincode',employeeData.Pincode)
formData.append('ExpectedCTC',employeeData.ExpectedCTC)
formData.append('PreferredModeofHire',candidateDropDown.PreferredModeOfHire)
formData.append('PreferredLocation',candidateDropDown.PreferredLocation)
formData.append('CurrentLocation',candidateDropDown.CurrentLocation)
formData.append('NoticePeriod',candidateDropDown.NoticePeriod)
formData.append('Status',candidateDropDown.Status)
CandidateEmpDetails.forEach(input=>{formData.append('EmployeeDetails',JSON.stringify(input))})
skillSet.forEach(input=>{formData.append('skillSet',JSON.stringify(input))})


const alldata={...employeeData,candidateDropDown,skillSet,CandidateEmpDetails}
 
const postData2 = async(e) => {
   e.preventDefault();
    if (!isedit) {
      setErrors(Validation(alldata));
      if (alldata )
        {
        const response = await axios({
        method: "post",
        url: "http://localhost:5000/candidate/post",
        data: formData
      }).catch(error=> {
      console.log(error)
    })
    }
    setIsModalOpen(!isModalOpen);
    window.location.reload(true); };
    
}


  const addFields = () => {
    let newfield = {
      SkillSet: "",
      RelavenceExperienceYear: "",
      RelavenceExperienceMonth: "",
    };
    setskillSet([...skillSet, newfield]);
  };

  const removeFields = (index) => {
    let data = [...skillSet];
    data.splice(index, 1);
    setskillSet(data);
  };
  const removeFields0 = (index) => {
    let data = [...CandidateEmpDetails];
    data.splice(index, 1);
    setCandidateEmpDetails(data);
  };
  const handleDropDown = (index, i, name) => {
   
    let data = [...skillSet];
    data[index][name] = i.key
    setskillSet(data)
  };
  const addFields0 = () => {
    let newfield0 = {
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
    };
    setCandidateEmpDetails([...CandidateEmpDetails, newfield0]);
  };

  const modalSizeHandler = () => {
    setIsModalShrunk(!isModalShrunk);
  };

  const dropDownHandler = (e, item, name) => {
    setCandidateDropDown({...candidateDropDown,[name]:item.key})
  };

  const handleDropDown2 = (index, i, name) => {
    let data = [...CandidateEmpDetails];

    data[index][name] = i.text;
  };

  const dateHandler2 = (index, date, name) => {
    let data = [...CandidateEmpDetails];
    data[index][name] = date;
  };

  const handleFormChange0 = (index, event) => {
    let data = [...CandidateEmpDetails];
    data[index][event.target.name] = event.target.value;
    setCandidateEmpDetails(data);
  };
  const handleFormChangeradio = (index, event,name) => {
    
    let data = [...CandidateEmpDetails];
    data.map(input =>{
      if(input.radio == true){
        return input.radio = false;
      }
    })
    data[index][name] = event.target.value == "false" ? true : false ;
    setCandidateEmpDetails(data);
    
  };

  const inputChangeHandler = (e, name) => {
    const { value } = e.target;
    let inputValue = value;

    if (name === "firstName" && inputValue.length > 40) {
      inputValue = inputValue.slice(0, 40);
    }

    if (name === "lastName" && inputValue.length > 40) {
      inputValue = inputValue.slice(0, 40);
    }
    if (name === "ExpectedCTC" && inputValue.length > 40) {
      inputValue = inputValue.slice(0, 40);
    }

    if (name === "emailId" && inputValue.length > 320) {
      inputValue = inputValue.slice(0, 320);
    }

    if (name === "mobile" && inputValue.length > 10) {
      inputValue = inputValue.slice(0, 10);
    }

    if (name === "panNumber" && inputValue.length > 10) {
      inputValue = inputValue.slice(0, 10);
    }

    if (name === "adhaarNumber" && inputValue.length > 12) {
      inputValue = inputValue.slice(0, 12);
    }

    setEmployeeData({
      ...employeeData,
      [name]: inputValue,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // validations

  const closeHandler = () => {
    setShowPopup(!showPopup);
    // setIsModalOpen(!isModalOpen);
  };

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
          styles.addcandidate_modal_scrollable_content
        }
        containerClassName={`${
          isModalShrunk
            ? styles.addcandidate_modal_container_shrunk
            : styles.addcandidate_modal_container
        }`}
        isOpen={isModalOpen}
      >
        <div className={styles.addcandidate_modal_header_container}>
          <div className={styles.header_tag_expand_close_icon_container}>
            <div className={styles.header_tag_container}>Candidate</div>

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
          </div>

          <div className={styles.header_content_container}>
            <div className={styles.header_content_title_container}>
              <div className={styles.header_content_title_container}>
                Add Candidate
              </div>

              <div className={styles.header_content_save_container}>
                <div className={styles.header_save_close_btns_container}>
               
            
                  
                    <input type="file" name="file_path" id="getFile" className={styles.myupload} onChange={handleFileChange}
                     
                    ></input>


                  
                   <DefaultButton text={(selectedFile.type===undefined) ?  "Attach Resume" : (`${selectedFile.name}`)} 
                  // 
                  iconProps={(selectedFile.type===undefined) ?  addIcon : tickIcon} 
                  className={styles.upbtn}
                  onClick={()=>{document.getElementById('getFile').click()}}
                  />

                  



                  <PrimaryButton
                    text={`Save & Close`}
                    onClick={postData2}
                    iconProps={{ iconName: "Save" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.addemployee_modal_main_container}>
          <div className={styles.main_filter_options_container}>
            <div className={styles.subcontainer}>
              

              <div className={styles.main_dropdown_container}>
                <div className={styles.main_status_title}> Status</div>
                <Dropdown
                  placeholder="Select"
                  styles={dropDownStyles}
                  options={dropDownStatus}
                  className={styles.loc_dropdown_status}
                  onChange={(e, item) => dropDownHandler(e, item, "Status")}
                  errorMessage={errors.Status}
                />
              </div>
              {/* <div className={styles.main_dropdown_container}>
                <div className={styles.main_teamlead_title}> Candidate ID</div>
                <div>
                  <TextField
                    type="text"
                    name="CandidateId"
                    styles={Field}
                    value={employeeData.CandidateId}
                    onChange={(e) => inputChangeHandler(e, "CandidateId")}
                  />
                </div>
              </div> */}
              <div className={styles.main_dropdown_container}>
                <div className={styles.main_repotingmanager_title}>
                  Notice Period
                </div>
                <Dropdown
                  placeholder="Select"
                  styles={dropDownStyles}
                  options={NoticePeriod}
                  className={styles.loc_dropdown_reportingmanager}
                  onChange={(e, item) =>
                    dropDownHandler(e, item, "NoticePeriod")
                  }
                  errorMessage={errors.NoticePeriod}
                />
              </div>
            </div>

            <div className={styles.subcontainer}>
              <div className={styles.main_dropdown_container}>
                <div className={styles.main_repotingmanager_title}>
                  Expected CTC
                </div>
                <TextField
                  className={styles.ExpectedCTCstyle}
                  type="text"
                  name="ExpectedCTC"
                  placeholder="Select"
                  value={employeeData.ExpectedCTC}
                  onChange={(e) => inputChangeHandler(e, "ExpectedCTC")}
                  errorMessage={errors.ExpectedCTC}
                  styles={Field}
                />
              </div>

              <div className={styles.main_dropdown_container}>
                <div className={styles.main_location_title}>
                  Preferred Mode of Hire
                </div>
                <Dropdown
                  placeholder="Select"
                  styles={dropDownStyles}
                  options={PreferredModeofHire}
                  className={styles.loc_dropdown_location}
                  onChange={(e, item) =>
                    dropDownHandler(e, item, "PreferredModeofHire")
                  }
                  errorMessage={errors.PreferredModeofHire}
                />
              </div>
            </div>

            <div className={styles.subcontainer}>
              
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
                        placeholder="First Name"
                        value={employeeData.firstName}
                        onChange={(e) => inputChangeHandler(e, "firstName")}
                        errorMessage={errors.firstName}
                        styles={Field}
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
                        placeholder="Last Name"
                        name="lastName"
                        styles={Field}
                        value={employeeData.lastName}
                        onChange={(e) => inputChangeHandler(e, "lastName")}
                        errorMessage={errors.lastName}
                      />
                    </div>
                  </div>

                  <div className={styles.main_sub_from_field}>
                    <div>Email ID</div>
                    <div
                      className={
                        employeeData.emailId || errors.emailId
                          ? styles.showfield
                          : styles.hidefield
                      }
                    >
                      <TextField
                        type="email"
                        placeholder="Email ID"
                        name="emailId"
                        errorMessage={errors.emailId}
                        styles={Field}
                        value={employeeData.emailId}
                        onChange={(e) => inputChangeHandler(e, "emailId")}
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
                        type="text"
                        name="mobile"
                        placeholder="Mobile Number"
                        styles={Field}
                        value={employeeData.mobile}
                        errorMessage={errors.mobile}
                        onChange={(e) => inputChangeHandler(e, "mobile")}
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
                        placeholder="Select"
                        options={dropDownGender}
                        onChange={(e, item) =>
                          dropDownHandler(e, item, "Gender")
                        }
                        errorMessage={errors.Gender}
                        styles={dropDownStyles2}
                      />
                    </div>
                  </div>

                  <div className={styles.main_sub_from_field}>
                    <div>State</div>
                    <div
                      className={
                        employeeData.City || errors.City
                          ? styles.showfield
                          : styles.hidefield
                      }
                    >
                      <TextField
                        type="text"
                        placeholder="State"
                        name="State"
                        value={employeeData.State}
                        errorMessage={errors.State}
                        styles={Field}
                        onChange={(e) => inputChangeHandler(e, "State")}
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
                        placeholder="City"
                        value={employeeData.City}
                        styles={Field}
                        errorMessage={errors.City}
                        onChange={(e) => inputChangeHandler(e, "City")}
                      />
                    </div>
                  </div>

                  <div className={styles.main_sub_from_field}>
                    <div>Pincode</div>
                    <div
                      className={
                        employeeData.Pincode|| errors.Pincode
                          ? styles.showfield
                          : styles.hidefield
                      }
                    >
                      <TextField
                        type="text"
                        name="Pincode"
                        placeholder="Pincode"
                        value={employeeData.Pincode}
                        errorMessage={errors.Pincode}
                        styles={Field}
                        onChange={(e) => inputChangeHandler(e, "Pincode")}
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
                    onClick={addFields0}
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
                          <div className={styles.table_heading}></div>
                        </th>
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

                    {CandidateEmpDetails.map((input, index) => (
                     
                      <tbody>
                         
                        <td className={styles.table_dataContents}>
                          <div
                            className={
                              employeeData.Pincode|| errors.Pincode
                                ? styles.showfield
                                : styles.hidefield
                            }
                          >
                            <input
                              type="radio"
                              name="radio"
                              value={input.radio}
                              errorMessage={errors.radio}
                              styles={Field}
                              onChange={(event) =>{
                                handleFormChangeradio(index, event, "radio")
                                
                                
                                
                              }
                              }
                            />
                          </div>
                        </td>

                        <td className={styles.table_dataContents}>
                          <div
                            className={
                              employeeData.Pincode|| errors.Pincode
                                ? styles.showfield
                                : styles.hidefield
                            }
                          >
                            <TextField
                              type="text"
                              placeholder="CompanyName"
                              name="CompanyName"
                              value={input.CompanyName}
                              errorMessage={errors.CompanyName}
                              styles={Field}
                              
                              onChange={(event) =>
                                handleFormChange0(index, event)
                              }
                            />
                          </div>
                        </td>

                        <td className={styles.table_dataContents}>
                          <div
                            className={
                              employeeData.EndDate || errors.EndDate
                                ? styles.showfield
                                : styles.hidefield
                            }
                          >
                            <DatePicker
                              placeholder="DD/MM/YYYY"
                              name="EndDate"
                              formatDate={onFormatDate}
                              onSelectDate={(date) =>
                                dateHandler2(index, date, "StartDate")
                              }
                              // isRequired={errors.Date}
                                errorMessage={errors.StartDate}
                              isRequired={errors.StartDate}
                              styles={calendarClass}
                            />
                          </div>
                        </td>

                        <td className={styles.table_dataContents}>
                          <div
                            className={
                              employeeData.EndDate || errors.EndDate
                                ? styles.showfield
                                : styles.hidefield
                            }
                          >
                            <DatePicker
                              placeholder="DD/MM/YYYY"
                              formatDate={onFormatDate}
                              onSelectDate={(date) =>
                                dateHandler2(index, date, "EndDate")
                              }
                              isRequired={errors.EndDate}
                              errorMessage={errors.EndDate}
                              styles={calendarClass}
                            />
                          </div>
                        </td>

                        <td className={styles.table_dataContents}>
                          <div
                            className={
                              employeeData.Gender || errors.Gender
                                ? styles.showfield
                                : styles.hidefield
                            }
                          >
                            <TextField
                              type="text"
                              placeholder="JobRole"
                              name="JobRole"
                              value={input.JobRole}
                              errorMessage={errors.JobRole}
                              styles={Field}
                              onChange={(event) =>
                                handleFormChange0(index, event)
                              }
                              // onChange={(e) => inputChangeHandler(e, "JobRole")}
                            />
                          </div>
                        </td>

                        <td className={styles.table_dataContents}>
                          <div
                            className={
                              employeeData.Pincode|| errors.Pincode
                                ? styles.showfield
                                : styles.hidefield
                            }
                          >
                            <Dropdown
                              placeholder="Select"
                              options={WorkModel}
                              onChange={(e, i) =>
                                handleDropDown2(index, i, "WorkModel")
                              }
                              errorMessage={errors.WorkModel}
                              styles={dropDownStyles2}
                            />
                          </div>
                        </td>

                        <td className={styles.table_dataContents}>
                          <div
                            className={
                              employeeData.Pincode|| errors.Pincode
                                ? styles.showfield
                                : styles.hidefield
                            }
                          >
                            <TextField
                              type="text"
                              name="CTC"
                              placeholder="CTC"
                              value={input.CTC}
                              errorMessage={errors.CTC}
                              styles={Field}
                              // onChange={(e) => inputChangeHandler(e, "CTC")}
                              onChange={(event) =>
                                handleFormChange0(index, event)
                              }
                            />
                          </div>
                        </td>

                        <td className={styles.table_dataContents}>
                          <div
                            className={
                              employeeData.Gender || errors.Gender
                                ? styles.showfield
                                : styles.hidefield
                            }
                          >
                            <Dropdown
                              placeholder="Select"
                              options={employmentType}
                              onChange={(e, i) =>
                                handleDropDown2(index, i, "EmployementType")
                              }
                              errorMessage={errors.EmployementType}
                              styles={dropDownStyles2}
                            />
                          </div>
                        </td>

                        <td className={styles.table_dataContents}>
                          <div
                            className={
                              employeeData.Gender || errors.Gender
                                ? styles.showfield
                                : styles.hidefield
                            }
                          >
                            <Dropdown
                              placeholder="select"
                              options={IndustryType}
                              // onChange={(e, item) =>
                              //   dropDownHandler(e, item, "IndustryType")
                              // }
                              onChange={(e, i) =>
                                handleDropDown2(index, i, "IndustryType")
                              }
                              errorMessage={errors.IndustryType}
                              styles={dropDownStyles2}
                            />
                          </div>
                        </td>

                        <td className={styles.table_dataContents}>
                          <div
                            className={
                              employeeData.Pincode|| errors.Pincode
                                ? styles.showfield
                                : styles.hidefield
                            }
                          >
                            <TextField
                              type="text"
                              placeholder="Payroll"
                              value={input.C2H}
                              errorMessage={errors.C2H}
                              name="C2H"
                              styles={Field}
                              onChange={(event) =>
                                handleFormChange0(index, event)
                              }
                            />
                          </div>
                        </td>

                        <td className={styles.table_dataContents}>
                          <div
                            className={
                              employeeData.Pincode|| errors.Pincode
                                ? styles.showfield
                                : styles.hidefield
                            }
                          >
                            <TextField
                              type="text"
                              name="JobSKills"
                              placeholder="Job Skill"
                              errorMessage={errors.JobSKills}
                              value={input.JobSKills}
                              styles={Field}
                              // onChange={(e) =>
                              //   inputChangeHandler(e, "JobSKills")
                              // }
                              onChange={(event) =>
                                handleFormChange0(index, event)
                              }
                            />
                          </div>
                        </td>
                        <td className={styles.table_dataContents}>
                          <ActionButton
                            name="closeImage"
                            className={classNames.Red}
                            value={input.closeImage}
                            iconProps={closeIcon}
                            // onClick={() => {
                            //   handleRemoveField(index);
                            // }}
                            onClick={() => removeFields0(index)}
                          ></ActionButton>
                        </td>

                        {/* </div> */}
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
                        defaultSelectedKey={candidateDropDown.CurrentLocation}
                        options={dropDownLocation}
                        onChange={(e, item) =>
                          dropDownHandler(e, item, "CurrentLocation")
                        }
                        styles={dropDownStyles2}
                      />
                    </div>
                     
                    <Toggle
                
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
                        value={candidateDropDown.PreferredLocation}
                        defaultSelectedKey={candidateDropDown.PreferredLocation}
                        onChange={(e, item) =>
                          dropDownHandler(e, item, "PreferredLocation")
                        }
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
                      addFields()
                    }}
                   
                  >
                    Add
                  </ActionButton>
                  </div>
                </div>
              </div>



            {skillSet.map((field, index) => (
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
                      
                      />
                      <Dropdown
                        placeholder="Month(s)"
                        styles={dropDownMonthStyles}
                        options={dropDownMonth}
                        defaultSelectedKey={field.RelavenceExperienceMonth}
                        errorMessage={errors.Months}
                        onChange={(e, i) =>
                          handleDropDown(index, i, "RelavenceExperienceMonth",false)
                        }
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
                            removeFields(index);
                          }}
                          
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
};

function halfField(props) {
  return {
    fieldGroup: [{ width: "50%", height: "22px", border: "0.5px solid grey" }],
  };
}

function Field(props) {
  return {
    fieldGroup: [{ height: "22px", width: "100%", border: "0.5px solid grey" }],
  };
}


export default AddCandidateModal;
