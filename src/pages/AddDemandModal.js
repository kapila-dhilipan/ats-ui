import React, { useState, useEffect } from "react";
import { Modal } from "@fluentui/react";
import styles from "./AddDemandModal.module.css";
import { Icon } from "@fluentui/react/lib/Icon";
import Alert from "@mui/material/Alert";
import { Tiptap } from "./TipTap";
import Details from "./Details";
import "../pages/CssTextEditor.css";
import {
  defaultDatePickerStrings,
  PrimaryButton,
  DatePicker,
  ActionButton,
  Persona,
  PersonaSize,
  Callout,
} from "@fluentui/react";
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import { TextField } from "@fluentui/react/lib/TextField";
import axios from "axios";
import { mergeStyles, mergeStyleSets } from "@fluentui/react";
import { Popup } from '../components/Popup';
//DefaultStyles
const contractIconClass = mergeStyles({
  fontSize: 20,
  height: 20,
  width: 20,
  cursor: "pointer",
});

const closeIconClass = mergeStyles({
  fontSize: 16,
  height: 20,
  width: 20,
  cursor: "pointer",
});

const downIconClass = mergeStyles({
  fontSize: 14,
  height: 20,
  width: 20,
  cursor: "pointer",
});
const CancelIconClass = mergeStyles({
  fontSize: 14,
  height: 20,
  width: 20,
  cursor: "pointer",
  color: "red",
});

const textFieldClassChange = {
  fieldGroup: { width: "55%", height: "22px", border: "0.5px solid grey" },
};

const NotextFieldClass = {
  fieldGroup: {
    width: "160px",
    minWidth: "160px",
    minHeight: "20px",
    height: "20px",
  },
  
};
const dropDownPrimarySkill = [
  { key: "React JS", text: "React JS " },
  { key: "Angular", text: "Angular" },
  { key: "AWS", text: "AWS" },
  { key: "DotNet", text: "DotNet" },
];

const dropDownStyles = mergeStyleSets({
  dropdown: { width: "160px", minWidth: "160px", minHeight: "20px" },
  title: { height: "22px", lineHeight: "18px", fontSize: "12px" },
  caretDownWrapper: { height: "22px", lineHeight: "20px !important" },
});
const dropDownMonthStyles = mergeStyleSets({
  dropdown: { width: "90px", minWidth: "100%", minHeight: "20px" },
  title: { height: "22px", lineHeight: "18px", fontSize: "12px" },
  caretDownWrapper: { height: "22px", lineHeight: "20px !important" },
});

const dropDownRegularStyles = mergeStyleSets({
  dropdown: { minWidth: "100%", minHeight: "20px" },
  title: { height: "22px", lineHeight: "18px", fontSize: "12px" },
  caretDownWrapper: { height: "22px", lineHeight: "20px !important" },
});

const dropDownSmallStyles = mergeStyleSets({
  root: { width: "49%" },
  dropdown: { width: "100%", minHeight: "20px" },
  title: { height: "22px", lineHeight: "18px", fontSize: "12px" },
  caretDownWrapper: { height: "22px", lineHeight: "20px !important" },
});

const calendarClass = mergeStyleSets({
  root: {
    "*": {
      width: "100%",
      Top: "3px",
      fontSize: 12,
      height: "22px !important",
      lineHeight: "20px !important",
    },
  },
  icon: { height: 10, width: 10, left: "85%", padding: "0px 0px" },
});

const jobDescriptionStyles = {
  fieldGroup: {
    height: 32,
    width: 1100,
  },
  field: {
    fontStyle: "italic",
  },
};

const personaStyles = {
  primaryText: {
    height: 13,
  },
};

const personaDropDownStyles = {
  root: {
    margin: "0px 5px",
  },
};

//DropDownOptions
const dropDownStatus = [
  { key: "Open", text: "Open" },
  { key: "Close", text: "Close" },
  { key: "On hold", text: "On Hold" },
  { key: "In progress", text: "In Progress" },
];

const dropDownPriority = [
  { key: "Low", text: "Low" },
  { key: "Medium", text: "Medium" },
  { key: "High", text: "High" },
];

const dropdownClients = [
  { key: "Sightspectrum", text: "Sightspectrum" },
  { key: "Google", text: "Google" },
  { key: "HGS", text: "HGS" },
];

const dropDownNoticePeriod = [
  { key: "< 15 Days", text: "< 15 Days" },
  { key: "< 30 Days", text: "< 30 Days" },
  { key: "< 60 Days", text: "< 60 Days" },
  { key: "> 60 Days", text: "> 60 Days" },
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

const modeOfHireDropdown = [
  { key: "C2H", text: "C2H (contract to Hire) - Client side " },
  { key: "permanent", text: "Permanent  - Internal recruitment" },
];

//Date Formate
const onFormatDate = (date) => {
  return !date
    ? ""
    : date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        (date.getFullYear() % 100);
};

const AddDemandModal = (props) => {
  let isModalOpen = props.isModalOpen;
  const setIsModalOpen = props.setIsModalOpen;
   let status;
  //SetInitial State
  const [id, setId] = useState("");
  const [getData, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [isedit, setisEdit] = useState(false);
  const [isshow, setisShow] = useState(false);
  const [isShowField, setshowField] = useState(false);
  const [additionalInformation, setAditonInfo] = useState("");
  const [jobDescription, setJobDesc] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [demandData, setDemandData] = useState({
    demandId: "",
    assigned: "",
    jobtitle: "",
    pointOfContact: "",
    subvendor: "",
    NoOfOptions: "",
    DueDate: "",
    JobRRID: "",
  });
  const [dropdownValue, setDropdownValue] = useState({
    Status: "",
    Priority: "",
    Clients: "",
    NoticePeriod: "",
    MaximumExperienceMonths: "",
    MaximumExperienceYears: "",
    MinimumExperienceMonths: "",
    MinimumExperienceYears: "",
    ModeOfHire: "",
  });
  const [fieldList, setfieldList] = useState([
    { SkillSet: "", RelavenceExperienceMonth: "", RelavenceExperienceYear: "" },
  ]);

  let SkillSet = fieldList;
  const Data = {
    ...demandData,
    ...dropdownValue,
    additionalInformation,
    jobDescription,
    SkillSet,
  };
  //HandleSubmitPost Method

useEffect(()=>{
   setDemandData(
   {demandId:props.idGen}
  )

},[])

const closeHandler= () => {
  setShowPopup(!showPopup);
};

  const postData = (e) => {
    e.preventDefault();
    if (!isedit) {
      setErrors(Validation(Data));
      if (
        Data.jobtitle &&
        Data.Clients &&
        Data.DueDate &&
        Data.JobRRID &&
        Data.MaximumExperienceMonths &&
        Data.MaximumExperienceYears &&
        Data.ModeOfHire &&
        Data.NoOfOptions &&
        Data.NoticePeriod &&
        Data.Status &&
        Data.SkillSet &&
        Data.subvendor
      ) {
        axios
          .post("http://13.228.78.94:4001/addDemandRouter/addDemandCreate", Data)
          .then((res) => {
         
            if (alert) {
              setIsModalOpen(!isModalOpen);
              window.location.reload(true);
              return status=true
            }
          })
          .catch((err) => 
         { 
         console.log(err)
         
        });
      } else {
        if (alert) {
          setIsModalOpen(!isModalOpen);
          window.location.reload(true);
          return status=false
        }
      }
    } else if (isedit) {
      axios
        .put(`http://13.228.78.94:4001/addDemandRouter/addDemandUpdate/${id}`, Data)
        .then((res) => {
          setIsModalOpen(!isModalOpen);
          window.location.reload(true);
          axios.get("http://13.228.78.94:4001/addDemandRouter/addDemandGet");
        })
        .catch((err) => console.log(err));
    }
  };

  //Handle Date onChnage Statement
  const dateHandler = (date, name) => {
    setDemandData((prevData) => {
      return {
        ...prevData,
        [name]: date,
      };
    });
    setErrors({
      [name]: "Required",
    });
  };

  //get method
  var get = async () => {
    var datas = await axios.get("http://13.228.78.94:4001/addEmployeeRouter/get");
    setData(datas.data);
  };
  useEffect(() => {
    get();
  }, []);

  const inputChangeHandler = (e) => {
    let { name, value } = e.target;
    setDemandData({ ...demandData, [name]: value });
  };

  const closeIcon = { iconName: "Cancel" };

  const handleAddField = () => {
    let addField = {
      SkillSet: "",
      RelavenceExperienceMonth: "",
      RelavenceExperienceYear: "",
    };
    setfieldList([...fieldList, addField]);
  };

  const handleDropDown = (index, i, name) => {
    let data = [...fieldList];
    data[index][name] = i.key;
  };
  //handle remove
  const handleRemoveField = (index) => {
    const values = [...fieldList];
    values.splice(
      values.findIndex((value) => value.index === index),
      1
    );
    setfieldList(values);
  };
  //Handle DropDown onChnage Statement
  const dropDownHandler = (e, item, name) => {
    setDropdownValue({ ...dropdownValue, [name]: item.key });
  };

  useEffect(() => {
    if (props?.data?._id != null) {

      setId(props.data._id);
      setisEdit(true);
      let updateDate = new Date(props.data.DueDate);
      setDemandData({
        id: props.data._id,
        assigned: props.data.assigned,
        demandId: props.data.demandId,
        jobtitle: props.data.jobtitle,
        pointOfContact: props.data.pointOfContact,
        subvendor: props.data.subvendor,
        DueDate: updateDate,
        NoOfOptions: props.data.NoOfOptions,
        JobRRID: props.data.JobRRID,
      });
      setfieldList(props.data.SkillSet.map((i) => i));
      setAditonInfo(props.data.additionalInformation);
      setJobDesc(props.data.jobDescription);
      setDropdownValue({
        Status: props.data.Status,
        Priority: props.data.Priority,
        Clients: props.data.Clients,
        NoticePeriod: props.data.NoticePeriod,
        MaximumExperienceMonths: props.data.MaximumExperienceMonths,
        MaximumExperienceYears: props.data.MaximumExperienceYears,
        MinimumExperienceMonths: props.data.MinimumExperienceMonths,
        MinimumExperienceYears: props.data.MinimumExperienceYears,
        ModeOfHire: props.data.ModeOfHire,
      });
    }
  }, [props.data]);

  const Validation = (value) => {
    var error = {};

    if (!value.MinimumExperienceMonths) {
      error.MinimumExperienceMonths = "Required";
    }
    if (!value.MinimumExperienceYears) {
      error.MinimumExperienceYears = "Required";
    }
    if (!value.MaximumExperienceMonths) {
      error.MaximumExperienceMonths = "Required";
    }
    if (!value.MaximumExperienceYears) {
      error.MaximumExperienceYears = "Required";
    }
    if (!value.pointOfContact) {
      error.pointOfContact = "Required";
    }
    if (!value.jobtitle) {
      error.jobtitle = " ";
    }
    if (!value.Status) {
      error.Status = " ";
    }
    if (!value.Priority) {
      error.Priority = " ";
    }
    if (!value.NoOfOptions) {
      error.NoOfOptions = " ";
    }
    if (!value.Clients) {
      error.Clients = " ";
    }
    if (!value.JobRRID) {
      error.JobRRID = "Required ";
    }
    if (!value.ModeOfHire) {
      error.ModeOfHire = "Required ";
    }
    if (!value.assigned) {
      error.assigned = " ";
    }

   

    if (!value.subvendor) {
      error.subvendor = "Required";
    }

    return error;
  };

  const [isModalShrunk, setIsModalShrunk] = useState(false);
  const [isPersonaOpen, setIsPersonaOpen] = useState(false);

  const modalSizeHandler = () => {
    setIsModalShrunk(!isModalShrunk);
  };

  const personaClickHandler = (secondaryText) => {
    setDemandData((prevState) => {
      return {
        ...prevState,
        assigned: secondaryText,
      };
    });
    setIsPersonaOpen(!isPersonaOpen);
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
        scrollableContentClassName={styles.adddemand_modal_scrollable_content}
        containerClassName={`${
          isModalShrunk
            ? styles.adddemand_modal_container_shrunk
            : styles.adddemand_modal_container
        }`}
        isOpen={isModalOpen}
      >
        <div className={styles.adddemand_modal_header_container}>
          <div className={styles.header_tag_expand_close_icon_container}>
            <div className={styles.header_title}>
              <div className={styles.header_tag_container}>Demand</div>
              {isedit ? (
                <div className={styles.main_Demand_Id}>
                  Demand ID: {demandData.demandId}
                </div>
              ) : (
                ""
              )}
            </div>
            {!isedit ? (
              <div className={styles.header_expand_close_icon_container}>
                <div
                  onClick={modalSizeHandler}
                  className={styles.header_expand_icon_container}
                >
                  {isModalShrunk ? (
                    <Icon iconName="FullScreen" className={contractIconClass} />
                  ) : (
                    <Icon
                      iconName="BackToWindow"
                      className={contractIconClass}
                    />
                  )}
                </div>
                <div
                  onClick={() =>  closeHandler()}
                  className={styles.header_close_icon_container}
                >
                  <Icon iconName="ChromeClose" className={closeIconClass} />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className={styles.header_content_container}>
            <div
              className={
                styles.header_content_job_description_unassigned_save_container
              }
            >
              <div
                className={
                  styles.header_content_job_description_unassigned_container
                }
              >
                <div
                  className={styles.header_content_job_description_container}
                >
                  <TextField
                    styles={jobDescriptionStyles}
                    placeholder={"Enter the Job Description Title"}
                    resizable={false}
                    value={demandData.jobtitle}
                    onChange={(e) => inputChangeHandler(e)}
                    errorMessage={errors.jobtitle}
                    name="jobtitle"
                  />
                </div>

                <div
                  id="personaId"
                  onClick={() => setIsPersonaOpen(!isPersonaOpen)}
                  className={
                    styles.header_content_unassigned_dropdown_container
                  }
                >
                  <div className={styles.unassigned_title_icon_container}>
                    <div className={styles.unassigned_title_container}>
                      {demandData.assigned === "" ||
                      demandData.assigned === undefined
                        ? "unassigned"
                        : getData

                            .filter(
                              (person) =>
                                person.firstName === demandData.assigned
                            )
                            .map((i) => {
                              var dataShort = {
                                text: i.firstName,
                                secondaryText: i.email,
                                showSecondaryText: true,
                              };

                              return (
                                <Persona
                                  {...dataShort}
                                  styles={personaStyles}
                                  errorMessage={errors.assigned}
                                  size={PersonaSize.size24}
                                />
                              );
                            })}
                    </div>
                    <div className={styles.unassigned_icon_container}>
                      <Icon iconName="ChevronDown" className={downIconClass} />
                    </div>
                  </div>

                  {isPersonaOpen && (
                    <Callout
                      role="dialog"
                      placeholder="unassigned"
                      isBeakVisible={false}
                      value={dropdownValue.assigned}
                      calloutMaxHeight={145}
                      target={"#personaId"}
                      onChange={(e, item) =>
                        dropDownHandler(e, item, "assigned")
                      }
                    >
                      {getData.map((i) => {
                        var personaList = {
                          text: i.firstName,
                          secondaryText: i.email,
                          showSecondaryText: true,
                        };

                        return (
                          <div onClick={() => personaClickHandler(i.firstName)}>
                            {
                              <Persona
                                text={i.email}
                                secondaryText={i.firstName}
                                {...personaList}
                                styles={personaDropDownStyles}
                                size={PersonaSize.size24}
                              />
                            }
                          </div>
                        );
                      })}
                    </Callout>
                  )}
                </div>
              </div>

              <div className={styles.header_save_close_btns_container}>
                <PrimaryButton
                  text={isedit ? "Save&Close" : "Save&CLose"}
                  iconProps={{ iconName: "Save" }}
                  onClick={postData}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.main_filter_options_container}>
          <div className={styles.main_filter_options_sub_container}>
            <div className={styles.main_role_dropdown_container}>
              <div className={styles.main_role_title}>Status </div>

              <Dropdown
                placeholder="select an option"
                styles={dropDownStyles}
                options={dropDownStatus}
                defaultSelectedKey={dropdownValue.Status}
                errorMessage={errors.Status}
                onChange={(e, item) => {
                  dropDownHandler(e, item, "Status");
                }}
              />
            </div>
            <div className={styles.main_role_dropdown_container}>
              <div className={styles.main_role_title}>No of Options</div>
              <TextField
                styles={NotextFieldClass}
                value={demandData.NoOfOptions}
                errorMessage={errors.NoOfOptions}
                onChange={(e) => inputChangeHandler(e)}
                name="NoOfOptions"
              />
               
            </div>
          </div>
          <div className={styles.main_filter_options_sub_container}>
            <div className={styles.main_role_dropdown_container}>
              <div className={styles.main_role_title}>Priority </div>
              <Dropdown
                placeholder="select an option"
                styles={dropDownStyles}
                name="Priority"
                options={dropDownPriority}
                defaultSelectedKey={dropdownValue.Priority}
                errorMessage={errors.Priority}
                onChange={(e, item) => {
                  dropDownHandler(e, item, "Priority");
                }}
              />
            </div>
            <div className={styles.main_role_dropdown_container}>
              <div className={styles.main_role_title}>Clients</div>
              <Dropdown
                placeholder="select an option"
                styles={dropDownStyles}
                defaultSelectedKey={dropdownValue.Clients}
                errorMessage={errors.Clients}
                options={dropdownClients}
                onChange={(e, item) => {
                  dropDownHandler(e, item, "Clients");
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.main_information_container}>
          <div className={styles.main_information_sub_container_left}>
            <div
              className={styles.main_job_description_demand_vendor_container}
            >
              <div className={styles.main_basic_information_title}>
                JOB DESCRIPTION
              </div>

              <div>
                <Details />
               {isedit?<Tiptap
                  description={jobDescription}
                  setDescription={setJobDesc}
                />:isShowField?<Tiptap
                  description={jobDescription}
                  setDescription={setJobDesc}
                />:<textarea type="text" id="forPlaceholder" rows="9" placeholder="Click to addDescription" className={styles.job_description_teatArea1}
                onClick={(event) => setshowField(true)}></textarea>}
               
              </div>
            </div>
            <div
              className={styles.main_job_description_demand_vendor_container}
            >
              <div  className={styles.main_basic_information_title}>
                ADDITIONAL INFORMATION
              </div>

              <div>
                {/* <Details  /> */}
                
                {isedit?<Tiptap
                  additionalInformation={additionalInformation}
                  setAddtionInfo={setAditonInfo}
                />:isshow?<Tiptap
                  additionalInformation={additionalInformation}
                  setAddtionInfo={setAditonInfo}
                />:<textarea type="text" placeholder="Click to addDescription" rows="9" className={styles.job_description_teatArea2}
                onClick={(event) => setisShow(true)}></textarea>}
  
                
              </div>
            </div>
          </div>
          <div className={styles.main_information_sub_container_right}>
            <div className={styles.main_right_demand_vendor_info_container}>
              <div className={styles.main_right_demand_info_container}>
                <div className={styles.main_basic_information_title}>
                  DEMAND INFORMATION
                </div>
                <div
                  className={styles.main_right_demand_info_content_container}
                >
                  <div
                    className={
                      styles.demand_info_duedate_min_experience_container
                    }
                  >
                    <div className={styles.demand_info_due_date_title}>
                      Due Date
                    </div>
                    <div
                      className={styles.demand_info_due_date_dropdown_container}
                    >
                      <DatePicker
                        placeholder={"DD/MM/YYYY"}
                        styles={calendarClass}
                        formatDate={onFormatDate}
                        strings={defaultDatePickerStrings}
                        value={demandData.DueDate}
                        onSelectDate={(date) => dateHandler(date, "DueDate")}
                        onChange={(e) => inputChangeHandler(e)}
                      />
                    </div>
                    <div className={styles.demand_info_min_experience_title}>
                      Minimum Experience
                    </div>
                    <div
                      className={
                        styles.demand_info_min_experience_dropdown_container
                      }
                    >
                      <Dropdown
                        placeholder="months"
                        styles={dropDownSmallStyles}
                        options={dropDownMonth}
                        defaultSelectedKey={
                          dropdownValue.MinimumExperienceMonths
                        }
                        errorMessage={errors.MinimumExperienceMonths}
                        onChange={(e, item) => {
                          dropDownHandler(e, item, "MinimumExperienceMonths");
                        }}
                      />
                      <Dropdown
                        placeholder="Years"
                        styles={dropDownSmallStyles}
                        options={dropDownYear}
                        defaultSelectedKey={
                          dropdownValue.MinimumExperienceYears
                        }
                        errorMessage={errors.MinimumExperienceYears}
                        onChange={(e, item) => {
                          dropDownHandler(e, item, "MinimumExperienceYears");
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className={
                      styles.demand_info_notice_period_min_experience_container
                    }
                  >
                    <div className={styles.demand_info_notice_period_title}>
                      Notice Period
                    </div>
                    <div
                      className={
                        styles.demand_info_notice_period_dropdown_container
                      }
                    >
                      <Dropdown
                        placeholder="Select"
                        styles={dropDownRegularStyles}
                        options={dropDownNoticePeriod}
                        defaultSelectedKey={dropdownValue.NoticePeriod}
                        onChange={(e, item) => {
                          dropDownHandler(e, item, "NoticePeriod");
                        }}
                      />
                    </div>

                    <div className={styles.demand_info_max_experience_title}>
                      Maximum Experience
                    </div>
                    <div
                      className={
                        styles.demand_info_max_experience_dropdown_container
                      }
                    >
                      <Dropdown
                        placeholder="months"
                        styles={dropDownSmallStyles}
                        options={dropDownMonth}
                        defaultSelectedKey={
                          dropdownValue.MaximumExperienceMonths
                        }
                        onChange={(e, item) => {
                          dropDownHandler(e, item, "MaximumExperienceMonths");
                        }}
                        errorMessage={errors.MaximumExperienceMonths}
                      />

                      <Dropdown
                        placeholder="years"
                        styles={dropDownSmallStyles}
                        options={dropDownYear}
                        defaultSelectedKey={
                          dropdownValue.MaximumExperienceYears
                        }
                        onChange={(e, item) => {
                          dropDownHandler(e, item, "MaximumExperienceYears");
                        }}
                        errorMessage={errors.MaximumExperienceYears}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.NewTextFeild}>
                  <div className={styles.demand_info_max_experience_title}>
                    Mode of Hire
                  </div>
                  <div
                    className={
                      styles.vendor_info_mode_of_hire_dropdown_container
                    }
                  >
                    <Dropdown
                      placeholder="Select"
                      styles={dropDownStyles}
                      options={modeOfHireDropdown}
                      defaultSelectedKey={dropdownValue.ModeOfHire}
                      errorMessage={errors.ModeOfHire}
                      onChange={(e, item) => {
                        dropDownHandler(e, item, "ModeOfHire");
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.main_right_vendor_info_container}>
                <div className={styles.main_basic_information_title}>
                  VENDOR INFORMATION
                </div>
                <div
                  className={styles.main_right_vendor_info_content_container}
                >
                  <div
                    className={
                      styles.vendor_info_mode_of_hire_point_of_contact_vendor_job_rr_id_container
                    }
                  >
                    <div className={styles.vendor_info_mode_of_hire_title}>
                      Vendor Name
                    </div>
                    <div
                      className={
                        styles.vendor_info_mode_of_hire_dropdown_container
                      }
                    >
                      <TextField
                        styles={textFieldClassChange}
                        name="subvendor"
                        value={demandData.subvendor}
                        onChange={(e) => inputChangeHandler(e)}
                        errorMessage={errors.subvendor}
                      />
                    </div>

                    <div
                      className={
                        styles.vendor_info_point_of_contact_vendor_title
                      }
                    >
                      Point of contact
                    </div>
                    <div
                      className={
                        styles.vendor_info_point_of_contact_vendor_dropdown_container
                      }
                    >
                      <TextField
                        styles={textFieldClassChange}
                        value={demandData.pointOfContact}
                        onChange={(e) => inputChangeHandler(e)}
                        errorMessage={errors.pointOfContact}
                        name="pointOfContact"
                      />
                    </div>
                    <div className={styles.vendor_info_job_rr_id_title}>
                      Job / RR ID
                    </div>
                    <div
                      className={
                        styles.vendor_info_job_rr_id_dropdown_container
                      }
                    >
                      <TextField
                        styles={textFieldClassChange}
                        value={demandData.JobRRID}
                        errorMessage={errors.JobRRID}
                        onChange={(e) => inputChangeHandler(e)}
                        name="JobRRID"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.main_right_skillset_container}>
              <div
                className={styles.main_right_skill_set_title_add_icon_container}
              >
                <div className={styles.main_right_skill_set_title}>
                  <div className={styles.main_right_title}> SKILL SET</div>
                  <div className={styles.main_left_title}>
                    <ActionButton onClick={() => handleAddField()}>
                      <Icon iconName="Add"></Icon><p style={{paddingLeft:'5px'}}>Add</p>  
                    </ActionButton>
                  </div>
                </div>
                <div className={styles.main_right_add_icon_container}></div>
              </div>
              {fieldList.map((field, index) => (
                <div
                  className={styles.main_right_skill_set_experience_container}
                  key={index}
                >
                  <div
                    className={
                      styles.main_right_skill_set_title_dropdown_container
                    }
                  >
                    <div
                      className={
                        styles.main_right_skill_set_title_dropdown_container
                      }
                    ></div>
                    Skill Set
                    <div
                      className={styles.main_right_skill_set_dropdown_container}
                    >
                      <Dropdown
                        placeholder="Select"
                        styles={dropDownRegularStyles}
                        options={dropDownPrimarySkill}
                        defaultSelectedKey={field.SkillSet}
                        errorMessage={errors.PrimarySkillSet}
                        onChange={(e, i) =>
                          handleDropDown(index, i, "SkillSet")
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
                        errorMessage={errors.PrimarySkillExperienceYears}
                        onChange={(e, i) =>
                          handleDropDown(index, i, "RelavenceExperienceYear")
                        }
                      />
                      <Dropdown
                        placeholder="Month(s)"
                        styles={dropDownMonthStyles}
                        options={dropDownMonth}
                        defaultSelectedKey={field.RelavenceExperienceMonth}
                        errorMessage={errors.PrimarySkillExperienceMonths}
                        onChange={(e, i) =>
                          handleDropDown(index, i, "RelavenceExperienceMonth")
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
                            handleRemoveField(index);
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
      </Modal>
    </div>
  );
};

export default AddDemandModal;
