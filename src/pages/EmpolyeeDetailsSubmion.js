import React,{useState}from "react";
import {
  Stack,
  Dropdown,
  DatePicker,
  TextField,
  
} from "@fluentui/react";

import { IconButton } from '@fluentui/react/lib/Button';
import "./EmployeeDetailsSubmision.css";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import {mergeStyleSets } from '@fluentui/react/lib/Styling';
initializeIcons();
const classNames = mergeStyleSets({
  Red: [{ color: 'red' }],
 
});
const ctcOption = [
  { key: "remote", text: " Remote" },
  { key: "office", text: " Office" },
  { key: "hybrid", text: " Hybrid" },
];
const workModel = [
  { key: "remote", text: " Remote" },
  { key: "office", text: " Office" },
  { key: "hybrid", text: " Hybrid" },
];
const options = [
  { key: "fruitsHeader", text: "Fruits" },
  { key: "apple", text: "Apple" },
  { key: "banana", text: "Banana" },
];
const empTypeOption = [
  { key: "Contract ", text: "Contract" },
  { key: "Permanent", text: "Permanent" },
];
const SubmissionEmployeeDetails = () => {
  const horizontalGapStackTokens = {
    childrenGap: 65,
    padding:20,
    
    
  };
  const StackStyle = {
    childrenGap: 15,
    padding: 5,
  };


  const [fieldList,setfieldList]=useState([
    {
      CompanyName:'',StartDate:'',EndDate:'',JobRole:'',WorkModel:'',CTC:'',EmployementType:'',
      IndustryType:'',C2H:'',JobSKils:'',closeImage:''
    }
   
  ])
  const handleChangeInput=(index,event)=>{
    const values=[...fieldList]  
    values[index][event.target.name]=event.target.value;
    setfieldList(values);
  }
  const handleAddField=()=>{
   setfieldList([...fieldList, {
    CompanyName:'',StartDate:'',EndDate:'',JobRole:'',WorkModel:'',CTC:'',EmployementType:'',
    IndustryType:'',C2H:'',JobSKils:'',closeImage:''
  }])
  }
  const handleRemoveField=(index)=>{
    const values=[...fieldList]
    values.splice(index,1)
    setfieldList(values);
 
  }
  const addIcon= { iconName: 'Add' };
  const closeIcon= { iconName: 'Cancel' };

  
  const SimilarDropDown = mergeStyleSets({
    dropdown: { minWidth: '110px', minHeight:'20px', },
    title :{ height: '22px', lineHeight:'18px', fontSize: '12px', border:'0.5px solid grey' },
    caretDownWrapper : {height: '22px', lineHeight:'20px !important'},
  });


  return (
    <>
    <div>

      <div className="EmpDetail"><p className="p">EMPLOYMENT DETAILS</p></div>
      <div className="AddIcon"> 
        <IconButton iconProps={addIcon} onClick={()=>{handleAddField()}}  label='Add'>
          <h4>Add</h4>
          </IconButton>
     
   </div>
      </div>
       
     <div className="List">
      <Stack
        horizontal
        disableShrink
        className="employee-details-header"
        tokens={horizontalGapStackTokens}
      >
        <span>Company Name</span>
        <span>Start Date</span>
        <span>End Date</span>
        <span>Job Role</span>
        <span>Work Model</span>
        <span>CTC</span>
        <span>Employement Type</span>
        <span>Industry Type</span>
        <span>C2H Payroll</span>
        <span>Job Skills</span>
      </Stack>
      {fieldList.map( (field,index)=>(
        
      <Stack 
        horizontal
        disableShrink
        className="details-container"
        tokens={StackStyle}
        key={index}
      >
        <Dropdown placeholder='select an option' styles={SimilarDropDown} options={options} />
				<DatePicker name='StartDate' value={field.StartDate}className='Start-Date-Style' styles={Field} ></DatePicker>
        <DatePicker name='EndDate' value={field.EndDate} className='Start-Date-Style'></DatePicker>
        <Dropdown name='JobRole' placeholder='select an option' value={field.JobRole} styles={SimilarDropDown} options={options} />

        <Dropdown name='WorkModel' placeholder='select an option' value={field.WorkModel} styles={SimilarDropDown} options={options} />

        <Dropdown name='CTC' placeholder='select an option' value={field.CTC} styles={SimilarDropDown}  options={ctcOption}></Dropdown>
        
        <Dropdown name='EmployementType' value={field.EmployementType} styles={SimilarDropDown}  options={empTypeOption} ></Dropdown>
        <Dropdown name='IndustryType'value={field.IndustryType} styles={SimilarDropDown}  options={options}></Dropdown>
        {/* <TextField name='C2H' value={field.C2H}  ></TextField> */}
        <TextField  type="text" placeholder= '' name="pincode" styles={Field}/>

        <Dropdown name='JobSKils'  value={field.JobSKils} styles={SimilarDropDown} ></Dropdown>
        <IconButton name='closeImage' className={classNames.Red} iconProps={closeIcon} value={field.closeImage} onClick={()=>{handleRemoveField(index)}} >
          </IconButton>
        
      </Stack>
      ))
     }
       
    </div>
    
    
     </>
      );
 };
 function Field(props) {
  return ({fieldGroup: [{height:'22px',width:'120px'},]})
}
export default SubmissionEmployeeDetails;