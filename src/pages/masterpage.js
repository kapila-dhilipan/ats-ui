import React, { useState} from "react";
import {
  TextField,
  Icon,
  Dropdown,
  PrimaryButton,
  mergeStyleSets,
} from "@fluentui/react";
import { Popup } from '../components/Popup';
import { isEmailValid } from "../utils/validations/emailValidation";
import { Grid } from "fluentui-react-grid";
import styles from "./masterpage.module.css";
import axios from "axios";

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

const TextFieldDesign = mergeStyleSets({
  textfield: { minHeight: "20px", fontSize: "200" },
  fieldGroup: [
    {
      height: "22px",
      width: "100%",
      border: "0.5px solid grey",
      fontSize: "2px",
    },
  ],
});
const addNewOptions=[
  { key: "Master", text: "Add New Client" },
  { key: "developer", text: "Add New Location" },
  { key: "Tester", text: "Add New SkillSet" },
]
const dropDownErrorStyles = mergeStyleSets({
  dropdown: { minWidth: "160px", minHeight: "20px" },
  title: {
    height: "22px",
    lineHeight: "18px",
    fontSize: "12px",
    border: "0.5px solid #a80000",
  },
  caretDownWrapper: { height: "22px", lineHeight: "20px !important" },
  dropdownItem: { minHeight: "22px", fontSize: 12 },
  dropdownItemSelected: { minHeight: "22px", fontSize: 12 },
});
const Masterpage = (props) => {
 
	let isModalOpen = props.isModalOpen;

	const  setIsModalOpen = props.setIsModalOpen;
 const loc=window.location.href;
 const currentloc=loc.split('/').slice(4).toString();



  const [isModalShrunk, setIsModalShrunk] = useState(false);
  const[changed,setChaged]=useState(true);
 
  const [showPopup, setShowPopup] = useState(false);
  const modalSizeHandler = () => {
    setIsModalShrunk(!isModalShrunk);
  };

  const closeHandler = () => {
    setShowPopup(!showPopup);
    // setIsModalOpen(!isModalOpen);
  };
  const [masterData, setMasterData] = useState({
    addNew: "",
    CompanyName: "",
    WebsiteURL: "",
    MobileNumber: "",
    LinkedInURL: "",
    PointofContact: "",
    Location: "",
    email: "",
    District: "",
    State: "",
    City: "",
    SkillSet: "",
  });
  const [errors, setErrors] = useState({
    addNew: "",
    CompanyName: "",
    WebsiteURL: "",
    MobileNumber: "",
    LinkedInURL: "",
    PointofContact: "",
    Location: "",
    email: "",
    District: "",
    State: "",
    City: "",
    SkillSet: "",
  });
  const handleDropDown = (e, item, name) => {
    setChaged(false);
    setMasterData((prevData) => {
      return {
        ...prevData,
        [name]: item.text,
      };
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const inputChangeHandler = (e, name) => {
    const { value } = e.target;
    let inputValue = value;

    if (name === "CompanyName" && inputValue.length > 40) {
      inputValue = inputValue.slice(0, 40);
    }

    if (name === "lastName" && inputValue.length > 40) {
      inputValue = inputValue.slice(0, 40);
    }

    if (name === "email" && inputValue.length > 320) {
      inputValue = inputValue.slice(0, 320);
    }

    if (name === "MobileNumber" && inputValue.length > 10) {
      inputValue = inputValue.slice(0, 10);
    }

    setMasterData({
      ...masterData,
      [name]: inputValue,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };
 
 

  const submitHandler = () => {
    if (isAddNewValid(masterData.addNew)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          addNew: null,
        };
      });
    }
    if (isCompanyNameValid(masterData.CompanyName)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          CompanyName: null,
        };
      });
    }
    if (isURLValid(masterData.LinkedInURL)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          LinkedInURL: null,
        };
      });
    }
    if (isWebSiteValid(masterData.WebsiteURL)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          WebsiteURL: null,
        };
      });
    }
    if (isLocationValid(masterData.Location)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          Location: null,
        };
      });
    }
    if (isPointOfContactValid(masterData.PointofContact)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          PointofContact: null,
        };
      });
    }
    if (isEmailValid(masterData.email, setErrors)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          email: "",
        };
      });
    }

    if (isMobileValid(masterData.MobileNumber)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          MobileNumber: false,
        };
      });
    }
    if (isDistrictValid(masterData.District)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          District: null,
        };
      });
    }
    if (isCityValid(masterData.City)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          City: null,
        };
      });
    }
    if (isStateValid(masterData.State)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          State: null,
        };
      });
    }
    if (isSkillSetValid(masterData.SkillSet)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          SkillSet: null,
        };
      });
    }
    axios.post("http://localhost:5000/master/post", masterData);
  };

  const isAddNewValid = (value) => {
    if (value.length === 0) {
      setErrors((prevState) => {
        return {
          ...prevState,
          addNew: "Required",
        };
      });
      return false;
    }
  };
  const isCompanyNameValid = (value) => {
    if (value.length === 0) {
      setErrors((prevState) => {
        return {
          ...prevState,
          CompanyName: "Required",
        };
      });
      return false;
    }
  };
  const isLocationValid = (value) => {
    if (value.length === 0) {
      setErrors((prevState) => {
        return {
          ...prevState,
          Location: "Required",
        };
      });
      return false;
    }
  };
  const isPointOfContactValid = (value) => {
    if (value.length === 0) {
      setErrors((prevState) => {
        return {
          ...prevState,
          PointofContact: "Required",
        };
      });
      return false;
    }
  };

  const isMobileValid = (value) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    if (value.length === 0) {
      setErrors((prevState) => {
        return {
          ...prevState,
          MobileNumber: "Required",
        };
      });
      return false;
    }

    if (!value.match(mobileRegex)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          MobileNumber: "Invalid Number",
        };
      });
      return false;
    }
    return true;
  };
  const isURLValid = (value) => {
    const urlRegex =
      "^((http|https)://)[-a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$";
    if (value.length === 0) {
      setErrors((prevState) => {
        return {
          ...prevState,
          LinkedInURL: "Required",
        };
      });
      return false;
    }

    if (!value.match(urlRegex)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          LinkedInURL: "Invalid URL",
        };
      });
      return false;
    }
    return true;
  };
  const isWebSiteValid = (value) => {
    const urlRegex =
      "^((http|https)://)[-a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$";
    if (value.length === 0) {
      setErrors((prevState) => {
        return {
          ...prevState,
          WebsiteURL: "Required",
        };
      });
      return false;
    }

    if (!value.match(urlRegex)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          WebsiteURL: "Invalid URL",
        };
      });
      return false;
    }
    return true;
  };
  const isCityValid = (value) => {
    if (value.length === 0) {
      setErrors((prevState) => {
        return {
          ...prevState,
          City: "Required",
        };
      });
      return false;
    }
  };
  const isDistrictValid = (value) => {
    if (value.length === 0) {
      setErrors((prevState) => {
        return {
          ...prevState,
          District: "Required",
        };
      });
      return false;
    }
  };
  const isStateValid = (value) => {
    if (value.length === 0) {
      setErrors((prevState) => {
        return {
          ...prevState,
          State: "Required",
        };
      });
      return false;
    }
  };
  const isSkillSetValid = (value) => {
    if (value.length === 0) {
      setErrors((prevState) => {
        return {
          ...prevState,
          SkillSet: "Required",
        };
      });
      return false;
    }
  };
  return (
    <div>
    {currentloc ?(
      <>
      {<Popup showPopup={showPopup} setShowPopup={setShowPopup} />}
       <Grid dir="ltr">
        <Grid.Row>
          <div className={styles.masterpage_container}>
            <div className={styles.masterpage_Main_Header_container}>
              <div className={styles.masterpage_header_container}>
                <div className={styles.masterpage_subleft_header_container}>
                  MasterPage
                </div>
                <div className={styles.masterpage_right_header_container}>
                  <div onClick={modalSizeHandler}>
                    {isModalShrunk ? (
                      <Icon iconName="FullScreen" />
                    ) : (
                      <Icon iconName="BackToWindow" />
                    )}
                  </div>
                  <div onClick={() => closeHandler()}>
                    <Icon iconName="ChromeClose" />
                  </div>
                </div>
              </div>
              <div className={styles.masterpage_subheader_container}>
                <div className={styles.masterpage_left_header_container}>
                  <div
                    className={
                      masterData.addNew || errors.addNew
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <Dropdown
                      placeholder={currentloc}
                      value={currentloc}
                      options={addNewOptions}
                      styles={
                        errors.addNew ? dropDownErrorStyles : dropDownStyles2
                      }
                      
                    ></Dropdown>
                  </div>
                </div>
                <div className={styles.masterpage_right_header_container}>
                  <PrimaryButton onClick={submitHandler}>
                    <Icon iconName="Save" /> Save&Close
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </Grid.Row>

        <Grid.Row>


{currentloc==='addNewClient'?
     <div>
         <Grid.Col className={styles.Grid_col} sizeLg={12}>
            <div className={styles.masterpage_Subheader_container}>
              Add New Clients
            </div>
          </Grid.Col>
          <Grid.Col sizeLg={12}>
            <div
              className={styles.masterpage_basicInformation_header_container}
            >
              <div
                className={
                  styles.masterpage_basicInformation_subheader_container
                }
              >
                BASIC INFORMATION
              </div>

              <Grid.Row
                className={
                  styles.masterpage_basicInformation_subheader2_container
                }
              >
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>Company Name</div>
                  <div
                    className={
                      masterData.CompanyName || errors.CompanyName
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="CompanyName"
                      errorMessage={errors.CompanyName}
                      onChange={(e) => inputChangeHandler(e, "CompanyName")}
                    />
                  </div>
                </Grid.Col>
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>WebsiteURL</div>
                  <div
                    className={
                      masterData.WebsiteURL || errors.WebsiteURL
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="WebsiteURL"
                      errorMessage={errors.WebsiteURL}
                      onChange={(e) => inputChangeHandler(e, "WebsiteURL")}
                    />
                  </div>
                </Grid.Col>
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>Mobile Number</div>
                  <div
                    className={
                      masterData.MobileNumber || errors.MobileNumber
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="MobileNumber"
                      maxLength={10}
                      errorMessage={errors.MobileNumber}
                      onChange={(e) => inputChangeHandler(e, "MobileNumber")}
                    />
                  </div>
                </Grid.Col>
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>LinkedIn URL</div>
                  <div
                    className={
                      masterData.LinkedInURL || errors.LinkedInURL
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="LinkedInURL"
                      errorMessage={errors.LinkedInURL}
                      onChange={(e) => inputChangeHandler(e, "LinkedInURL")}
                    />
                  </div>
                </Grid.Col>
              </Grid.Row>
              <Grid.Row
                className={
                  styles.masterpage_basicInformation_subheader2_container
                }
              >
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>Point of Contact</div>
                  <div
                    className={
                      masterData.PointofContact || errors.PointofContact
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="PointofContact"
                      errorMessage={errors.PointofContact}
                      onChange={(e) => inputChangeHandler(e, "PointofContact")}
                    />
                  </div>
                </Grid.Col>
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>Location</div>
                  <div
                    className={
                      masterData.Location || errors.Location
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="Location"
                      errorMessage={errors.Location}
                      onChange={(e) => inputChangeHandler(e, "Location")}
                    />
                  </div>
                </Grid.Col>
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>Email Id</div>
                  <div
                    className={
                      masterData.email || errors.email
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="email"
                      errorMessage={errors.email}
                      onChange={(e) => inputChangeHandler(e, "email")}
                    />
                  </div>
                </Grid.Col>
              </Grid.Row>
            </div>
          </Grid.Col>
          </div>
          :""
}
{currentloc==='addNewLocation'?
         <div>
          <Grid.Col className={styles.Grid_col} sizeLg={12}>
            <div className={styles.masterpage_Subheader_container}>
              Add New Location
            </div>
          </Grid.Col>
          <Grid.Col sizeLg={12}>
            <div
              className={styles.masterpage_basicInformation_header_container}
            >
              <div
                className={
                  styles.masterpage_basicInformation_subheader_container
                }
              >
                LOCATION INFORMATION
              </div>
              <Grid.Row
                className={
                  styles.masterpage_basicInformation_subheader2_container
                }
              >
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>District</div>
                  <div
                    className={
                      masterData.District || errors.District
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="District"
                      errorMessage={errors.District}
                      onChange={(e) => inputChangeHandler(e, "District")}
                    />
                  </div>
                </Grid.Col>
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>City</div>
                  <div
                    className={
                      masterData.City || errors.City
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="City"
                      errorMessage={errors.City}
                      onChange={(e) => inputChangeHandler(e, "City")}
                    />
                  </div>
                </Grid.Col>
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>State</div>
                  <div
                    className={
                      masterData.State || errors.State
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="State"
                      errorMessage={errors.State}
                      onChange={(e) => inputChangeHandler(e, "State")}
                    />
                  </div>
                </Grid.Col>
              </Grid.Row>
            </div>
          </Grid.Col>
          </div>
          :""}
  {currentloc==='addNewSkillSet'?        
         <div>
          <Grid.Col className={styles.Grid_col} sizeLg={12}>
            <div className={styles.masterpage_Subheader_container}>
              Add New Skill
            </div>
          </Grid.Col>
          <Grid.Col sizeLg={12}>
            <div
              className={styles.masterpage_basicInformation_header_container}
            >
              <div
                className={
                  styles.masterpage_basicInformation_subheader_container
                }
              >
                SKILL INFORMATION
              </div>
              <Grid.Row
                className={
                  styles.masterpage_basicInformation_subheader2_container
                }
              >
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>Skill Set</div>
                  <div
                    className={
                      masterData.SkillSet || errors.SkillSet
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="SkillSet"
                      errorMessage={errors.SkillSet}
                      onChange={(e) => inputChangeHandler(e, "SkillSet")}
                    />
                  </div>
                </Grid.Col>
              </Grid.Row>
            </div>
          </Grid.Col>
          </div>
:""}
        </Grid.Row>
        
      </Grid>
      </>
     ) : (
      <>
       {<Popup showPopup={showPopup} setShowPopup={setShowPopup} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>}
      <Grid dir="ltr">
        <Grid.Row>
          <div className={styles.masterpage_container}>
            <div className={styles.masterpage_Main_Header_container}>
              <div className={styles.masterpage_header_container}>
                <div className={styles.masterpage_subleft_header_container}>
                  MasterPage
                </div>
                <div className={styles.masterpage_right_header_container}>
                  <div onClick={modalSizeHandler}>
                    {isModalShrunk ? (
                      <Icon iconName="FullScreen" />
                    ) : (
                      <Icon iconName="BackToWindow" />
                    )}
                  </div>
                  <div onClick={() => closeHandler()}>
                    <Icon iconName="ChromeClose" />
                  </div>
                </div>
              </div>
              <div className={styles.masterpage_subheader_container}>
                <div className={styles.masterpage_left_header_container}>
                  <div
                    className={
                      masterData.addNew || errors.addNew
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <Dropdown
                      placeholder="Add New"
                      value={masterData.newItem}
                      options={addNewOptions}
                      styles={
                        errors.addNew ? dropDownErrorStyles : dropDownStyles2
                      }
                      onChange={(e, item) => handleDropDown(e, item, "addNew")}
                    ></Dropdown>
                  </div>
                </div>
                <div className={styles.masterpage_right_header_container}>
                  <PrimaryButton onClick={submitHandler}>
                    <Icon iconName="Save" /> Save&Close
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </Grid.Row>

        <Grid.Row>

{ changed||masterData.addNew==='Add New Client'?
     <div>
         <Grid.Col className={styles.Grid_col} sizeLg={12}>
            <div className={styles.masterpage_Subheader_container}>
              Add New Clients
            </div>
          </Grid.Col>
          <Grid.Col sizeLg={12}>
            <div
              className={styles.masterpage_basicInformation_header_container}
            >
              <div
                className={
                  styles.masterpage_basicInformation_subheader_container
                }
              >
                BASIC INFORMATION
              </div>

              <Grid.Row
                className={
                  styles.masterpage_basicInformation_subheader2_container
                }
              >
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>Company Name</div>
                  <div
                    className={
                      masterData.CompanyName || errors.CompanyName
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="CompanyName"
                      errorMessage={errors.CompanyName}
                      onChange={(e) => inputChangeHandler(e, "CompanyName")}
                    />
                  </div>
                </Grid.Col>
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>WebsiteURL</div>
                  <div
                    className={
                      masterData.WebsiteURL || errors.WebsiteURL
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="WebsiteURL"
                      errorMessage={errors.WebsiteURL}
                      onChange={(e) => inputChangeHandler(e, "WebsiteURL")}
                    />
                  </div>
                </Grid.Col>
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>Mobile Number</div>
                  <div
                    className={
                      masterData.MobileNumber || errors.MobileNumber
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="MobileNumber"
                      maxLength={10}
                      errorMessage={errors.MobileNumber}
                      onChange={(e) => inputChangeHandler(e, "MobileNumber")}
                    />
                  </div>
                </Grid.Col>
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>LinkedIn URL</div>
                  <div
                    className={
                      masterData.LinkedInURL || errors.LinkedInURL
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="LinkedInURL"
                      errorMessage={errors.LinkedInURL}
                      onChange={(e) => inputChangeHandler(e, "LinkedInURL")}
                    />
                  </div>
                </Grid.Col>
              </Grid.Row>
              <Grid.Row
                className={
                  styles.masterpage_basicInformation_subheader2_container
                }
              >
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>Point of Contact</div>
                  <div
                    className={
                      masterData.PointofContact || errors.PointofContact
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="PointofContact"
                      errorMessage={errors.PointofContact}
                      onChange={(e) => inputChangeHandler(e, "PointofContact")}
                    />
                  </div>
                </Grid.Col>
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>Location</div>
                  <div
                    className={
                      masterData.Location || errors.Location
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="Location"
                      errorMessage={errors.Location}
                      onChange={(e) => inputChangeHandler(e, "Location")}
                    />
                  </div>
                </Grid.Col>
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>Email Id</div>
                  <div
                    className={
                      masterData.email || errors.email
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="email"
                      errorMessage={errors.email}
                      onChange={(e) => inputChangeHandler(e, "email")}
                    />
                  </div>
                </Grid.Col>
              </Grid.Row>
            </div>
          </Grid.Col>
          </div>
:""}  
{ changed||masterData.addNew==='Add New Location'?
         <div>
          <Grid.Col className={styles.Grid_col} sizeLg={12}>
            <div className={styles.masterpage_Subheader_container}>
              Add New Location
            </div>
          </Grid.Col>
          <Grid.Col sizeLg={12}>
            <div
              className={styles.masterpage_basicInformation_header_container}
            >
              <div
                className={
                  styles.masterpage_basicInformation_subheader_container
                }
              >
                LOCATION INFORMATION
              </div>
              <Grid.Row
                className={
                  styles.masterpage_basicInformation_subheader2_container
                }
              >
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>District</div>
                  <div
                    className={
                      masterData.District || errors.District
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="District"
                      errorMessage={errors.District}
                      onChange={(e) => inputChangeHandler(e, "District")}
                    />
                  </div>
                </Grid.Col>
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>City</div>
                  <div
                    className={
                      masterData.City || errors.City
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="City"
                      errorMessage={errors.City}
                      onChange={(e) => inputChangeHandler(e, "City")}
                    />
                  </div>
                </Grid.Col>
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>State</div>
                  <div
                    className={
                      masterData.State || errors.State
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="State"
                      errorMessage={errors.State}
                      onChange={(e) => inputChangeHandler(e, "State")}
                    />
                  </div>
                </Grid.Col>
              </Grid.Row>
            </div>
          </Grid.Col>
          </div>
      :""  }
      { changed||masterData.addNew==='Add New SkillSet'?
         <div>
          <Grid.Col className={styles.Grid_col} sizeLg={12}>
            <div className={styles.masterpage_Subheader_container}>
              Add New Skill
            </div>
          </Grid.Col>
          <Grid.Col sizeLg={12}>
            <div
              className={styles.masterpage_basicInformation_header_container}
            >
              <div
                className={
                  styles.masterpage_basicInformation_subheader_container
                }
              >
                SKILL INFORMATION
              </div>
              <Grid.Row
                className={
                  styles.masterpage_basicInformation_subheader2_container
                }
              >
                <Grid.Col sizeLg={2}>
                  <div className={styles.textfieldDesign}>Skill Set</div>
                  <div
                    className={
                      masterData.SkillSet || errors.SkillSet
                        ? styles.showfield
                        : styles.hidefield
                    }
                  >
                    <TextField
                      styles={TextFieldDesign}
                      name="SkillSet"
                      errorMessage={errors.SkillSet}
                      onChange={(e) => inputChangeHandler(e, "SkillSet")}
                    />
                  </div>
                </Grid.Col>
              </Grid.Row>
            </div>
          </Grid.Col>
          </div>
        :""  }
        </Grid.Row>
        
      </Grid>
      </>
     ) 
                  }
    </div>
  );
};
export default Masterpage;
