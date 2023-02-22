import {
  mergeStyleSets,
  Modal,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import React, { useState } from "react";
import styles from "./SubmissionTracker.module.css";
import { Tiptap } from "./TipTap";
import RedThumb from "../../src/assets/quality2-removebg-preview.png";
import GreenThumb from "../../src/assets/quality1-removebg-preview.png";
import AshThumb from "../../src/assets/quality3-removebg-preview.png";

const dropDownStyles = mergeStyleSets({
  dropdown: { minWidth: "160px", minHeight: "10px" },
  title: {
    marginLeft: "4px",
    height: "22px",
    lineHeight: "18px",
    fontSize: "12px",
    border: "0.5px solid grey",
  },
  caretDownWrapper: { height: "22px", lineHeight: "20px !important" },
});

const dropDownStatus = [
  { key: "Initial Discussion", text: "Initial Discussion" },
  { key: "Level 1 Rejected", text: "Level 1 Rejected" },
  { key: "Level 1 Selected", text: "Level 1 Selected" },
  { key: "Level 2 Rejected", text: "Level 2 Rejected" },
  { key: "Level 2 Selected", text: "Level 2 Selected" },
  { key: "Level 3 Rejected", text: "Level 3 Rejected" },
  { key: "Level 3 Selected", text: "Level 3 Selected" },
  { key: "BG Verification Selected", text: "BG Verification Selected" },
  { key: "BG Verification Rejected", text: "BG Verification Rejected" },
  { key: "Offered Selected", text: "Offered Selected" },
  { key: "Offered Rejected", text: "Offered Rejected" },
  { key: "Onboard", text: "Onboard" },
 
];
const steps = [
  "Initial Discussion",
  "Level 1",
  "Level 2",
  "Level 3",
  "BG Verification",
  "Offered",
  "Onboard",
];

const SubmissionTracker = () => {
  const [dropdownValue, setDropdownValue] = useState({
    Status: "",
  });
  const [employeeData, setEmployeeData] = useState({
    candidateId: "",
    demandId: "",
    jobDescription: "",
  });
  const [jobDescription, setJobDesc] = useState("");
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(4);

  const inputChangeHandler = (e) => {
    let { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const dropDownHandler = (e, item, name) => {
    setDropdownValue({ ...dropdownValue, [name]: item.key });
  };

 
  const Validation = (value) => {
    var error = {};

    if (!value.candidateId) {
      error.candidateId = " Required";
    }
    if (!value.demandId) {
      error.demandId = "Required";
    }
    if (!value.Status) {
      error.Status = "Required";
    }
    return error;
  };

  let allData = { ...dropdownValue, ...employeeData };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors(Validation(allData));
  };
let length;
  return (
    <div>
      <Modal
        scrollableContentClassName={
          styles.addSubmission_modal_scrollable_content
        }
        containerClassName={styles.addSubmission_modal_container}
        isOpen={true}
      >
        <div className={styles.addSubmission_modal_header_container}>
          <div className={styles.header_tag_expand_close_icon_container}>
            <div className={styles.header_tag_container}>
              Submission Tracker
            </div>
          </div>
          <div className={styles.header_content_container}>
            <div className={styles.header_content_title_container}>
              <div className={styles.header_content_save_container}>
                <div className={styles.header_save_close_btns_container}>
                  <PrimaryButton
                    text={`Save & Close`}
                    onClick={submitHandler}
                    iconProps={{ iconName: "Save" }}
                  />
                </div>
              </div>
              <div className={styles.header_content_title_container1}>
                Submission ID: SS_1001
              </div>
            </div>
          </div>
        </div>

        <div className={styles.addemployee_modal_main_container}>
          <div className={styles.main_filter_options_container}>
            <div className={styles.subcontainer}>
              <div className={styles.main_dropdown_container}>
                <div className={styles.main_teamlead_title}> Demand ID</div>
                <div className={styles.hidefield}>
                  <TextField
                    type="demandId"
                    name="demandId"
                    value={employeeData.demandId}
                    styles={Field}
                    onChange={(e) => inputChangeHandler(e)}
                    errorMessage={errors.demandId}
                  />
                </div>
              </div>
              <div className={styles.main_dropdown_container}>
                <div className={styles.main_teamlead_title}> Candidate ID</div>
                <div className={styles.hidefield}>
                  <TextField
                    type="candidateId"
                    name="candidateId"
                    value={employeeData.candidateId}
                    styles={Field}
                    onChange={(e) => inputChangeHandler(e)}
                    errorMessage={errors.candidateId}
                  />
                </div>
              </div>
              <div className={styles.main_dropdown_container}>
                <div className={styles.main_teamlead_title}> Status </div>
                <div className={styles.hidefield}>
                  <Dropdown
                    placeholder="select an option"
                    styles={dropDownStyles}
                    name="Status"
                    options={dropDownStatus}
                    onChange={(e, item) => dropDownHandler(e, item, "Status")}
                    className={styles.loc_dropdown_status}
                    errorMessage={errors.Status}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
        
            <Box sx={{ width: "100%", padding: "60px", paddingTop: "5%" }}>
              <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label,index) =>
             { 
              if(dropdownValue.Status.includes(label)===true)
              length=index;
            } ) }
            
                {steps.map((label,index) => (
                  <Step key={label}>
                    <StepLabel
                      icon={
                       
                        (length>=index)?
                             
                         <img
                            src={ dropdownValue.Status.includes(`${label} Rejected`)? RedThumb:GreenThumb}
                            style={{ height: "33px", width: "33px" }}
                            alt='valid'
                          />
                        :
                        <img
                            src={AshThumb}
                            style={{ height: "33px", width: "33px" }}
                            alt='valid'
                          />
                        
                      }
                    >
                      <div
                        style={{
                          fontWeight: "600",
                          color: "black",
                          fontSize: "16px",
                        }}
                      >
                        {label}
                      </div>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
          <div className={styles.dsp}>
            <div className={styles.main_basic_information_title}>REMARKS</div>
            <div className={styles.dsp1}>
              <Tiptap description={jobDescription} setDescription={setJobDesc}>
                <textarea
                  type="text"
                  id="forPlaceholder"
                  rows="9"
                  placeholder="Click to Add Remarks"
                  className={styles.job_description_teatArea1}
                ></textarea>
              </Tiptap>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

function Field() {
  return {
    fieldGroup: [
      {
        height: "22px",
        width: "100%",
        border: "0.5px solid grey",
        marginLeft: "10px",
      },
    ],
  };
}

export default SubmissionTracker;