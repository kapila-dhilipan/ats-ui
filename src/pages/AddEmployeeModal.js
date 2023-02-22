import React,{useState} from 'react'
import { Modal } from '@fluentui/react'
import { Toggle } from '@fluentui/react/lib/Toggle';
import styles from './AddEmployeeModal.module.css'
import { Icon } from '@fluentui/react/lib/Icon';
import { TextField, PrimaryButton, DatePicker } from '@fluentui/react';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { mergeStyles, mergeStyleSets} from '@fluentui/react';
import { Popup } from '../components/Popup';
import axios from 'axios';
//validations

import { isEmailValid } from '../utils/validations/emailValidation';

// regex
const nameRegex= /^[A-Za-z]+$/;
const mobileRegex=/^[6-9]\d{9}$/;
const panNumberRegex= /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
const adhaarNumberRegex= /[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;

const contractIconClass = mergeStyles({
	fontSize: 20,
	height: '20px',
	width: '20px',
	cursor: 'pointer',
});

const closeIconClass = mergeStyles({
	fontSize: 16,
	height: '20px',
	width: '20px',
	cursor: 'pointer'

});

const calendarClass = mergeStyleSets({
	root: {'*' : {width: '100%', fontSize: 12, height: '22px !important', lineHeight: '20px !important',}},
	icon: {height: 10, width: 10, left: '85%', padding: '0px 0px',},
	fieldGroup:{border:'0.5px solid grey !important'},
	statusMessage:{marginBottom:'-25px'},
});

const calendarErrorClass = mergeStyleSets({
	root: {'*' : {width: '100%', fontSize: 12, height: '22px !important', lineHeight: '20px !important',borderColor: '#a80000'}},
	icon: {height: 10, width: 10, left: '85%', padding: '0px 0px', color: '#a80000'},
	fieldGroup:{border:'0.5px solid #a80000 !important'},
	statusMessage:{marginBottom:'-25px'},
});

const dropDownStyles = mergeStyleSets({
	dropdown: { minWidth: '160px', minHeight:'20px', },
	title :{ height: '22px', lineHeight:'18px', fontSize: '12px', border:'0.5px solid grey' },
	caretDownWrapper : {height: '22px', lineHeight:'20px !important'},
	dropdownItem : {minHeight: '22px', fontSize: 12},
	dropdownItemSelected: {minHeight: '22px', fontSize: 12}, 
});

const dropDownErrorStyles = mergeStyleSets({
	dropdown: { minWidth: '160px', minHeight:'20px', },
	title :{ height: '22px', lineHeight:'18px', fontSize: '12px', border:'0.5px solid #a80000' },
	caretDownWrapper : {height: '22px', lineHeight:'20px !important'},
	dropdownItem : {minHeight: '22px', fontSize: 12},
	dropdownItemSelected: {minHeight: '22px', fontSize: 12},
});

const toggleStyles = mergeStyleSets({
	root: {marginBottom : '0px'},
});

const dropDownRole =  [
  { key: 'recruiter', text: 'Recruiter' },
  { key: 'teamLead', text: 'Team Lead' },
  { key: 'accountManager', text: 'Reporting Manager'},
  { key: 'admin', text: 'Admin' },
  { key: 'businessDevelopment', text: 'Business Development' },
];

const dropDownTeamLead =  [
	{ key: 'TL', text: 'Bruce Wayne' },
	{ key: 'TL', text: 'Tommy Shelby' },
];

const dropDownReportingManager =  [
	{ key: 'RM', text: 'Alfred Pennyworth' },
	{ key: 'RM', text: 'Arthur' },
	{ key: 'RM', text: 'Jhon'},
];

const dropDownStatus =  [
	{ key: '1', text: 'Active' },
	{ key: '2', text: 'In - Active' },
];

const dropDownLocation =  [
	{ key: '1', text: 'Gotham' },
	{ key: '2', text: 'USA' },
];

const dropDownMaritalStatus =  [
	{ key: '1', text: 'Married' },
	{ key: '2', text: 'Unmarried' },
	{ key: '3', text: 'Others'},
];

const dropDownGender =  [
	{ key: '1', text: 'Male' },
	{ key: '2', text: 'Female' },
	{ key: '3', text: 'Others'},
];


const AddEmployeeModal = (props) => {

	let isModalOpen = props.isModalOpen;

	const  setIsModalOpen = props.setIsModalOpen;

	const [isModalShrunk,setIsModalShrunk] = useState(false);
	const [autoGeneratePass,setAutoGeneratePass] = useState(false);

	const [employeeData,setEmployeeData] = useState({
		role: '',
		teamLead:'',
		status:'',
		reportingManager:'',
		location:'',
		firstName:'',
		lastName:'',
		email:'',
		mobile:'',
		dateOfHire: '',
		dateOfJoin: '',
		dateOfBirth: '',
		maritalStatus: '',
		address1:'',
		address2:'',
		city:'',
		pincode:'',
		gender:'',
		panNumber:'',
		adhaarNumber:'',
	});

	const [errors,setErrors] = useState({
		role: '',
		teamLead:'',
		status:'',
		reportingManager:'',
		location:'',
		firstName:'',
		lastName:'',
		email:'',
		mobile:'',
		dateOfHire: '',
		dateOfJoin: '',
		dateOfBirth: '',
		maritalStatus: '',
		address1:'',
		address2:'',
		city:'',
		pincode:'',
		gender:'',
		panNumber:'',
		adhaarNumber:'',
 });

	const [showPass, setShowPass] = useState(true);
	const [showPopup, setShowPopup] = useState(false);
	const[password,setPwd]=useState("Click the toggle again to generate");

	function genPassword() {
		var chars =
		  "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var passwordLength = 9;
		var newpass = "";
		for (var i = 0; i <= passwordLength; i++) {
		  var randomNumber = Math.floor(Math.random() * chars.length);
		  newpass += chars.substring(randomNumber, randomNumber + 1);
		}
		return newpass;
	  }


	const modalSizeHandler =()=>{
     setIsModalShrunk(!isModalShrunk)
	}

	const dropDownHandler=(e,item,name)=>{
    setEmployeeData((prevData)=>{

			return{
				...prevData,
				[name]: item.text,
			}
      
		})
	setErrors({
			...errors,
			[name]: ''
		})
	};

	const dateHandler=(date,name)=>{
    setEmployeeData((prevData)=>{

			return{
				...prevData,
				[name]: date,
			}
      
		})
		setErrors({
			...errors,
			[name]: ''
		})
	};

	const inputChangeHandler =(e,name)=>{
		const {value} = e.target;
		let inputValue = value;

		if(name==='firstName' && inputValue.length > 40){
			inputValue = inputValue.slice(0,40)
		}

		if(name==='lastName' && inputValue.length > 40){
			inputValue = inputValue.slice(0,40)
		}

		if(name==='email' && inputValue.length > 320){
			inputValue = inputValue.slice(0,320)
		}

		if(name==='mobile' && inputValue.length > 10){
			inputValue = inputValue.slice(0,10)
		}

		if(name==='panNumber' && inputValue.length > 10){
			inputValue = inputValue.slice(0,10)
		}

		if(name==='adhaarNumber' && inputValue.length >12){
			inputValue = inputValue.slice(0,12)
		}

		setEmployeeData({
      ...employeeData,
			[name]: inputValue
		})

		setErrors({
			...errors,
			[name]: ''
		})
     
	};




	const submitHandler=()=>{
		if(isEmailValid(employeeData.email,setErrors)){
			setErrors((prevState)=>{
				return{
					...prevState,
					email: null,
				}
			})
		}

		if(isNameValid(employeeData.firstName,'firstName')){
			setErrors((prevState)=>{
				return{
					...prevState,
					firstName: null,
				}
			})
		}

		if(isNameValid(employeeData.lastName,'lastName')){
			setErrors((prevState)=>{
				return{
					...prevState,
					lastName: false,
				}
			})
		}

		if(isMobileValid(employeeData.mobile)){
			setErrors((prevState)=>{
				return{
					...prevState,
					mobile: false,
				}
			})
		}


		if(isPanNumberValid(employeeData.panNumber)){
			setErrors((prevState)=>{
				return{
					...prevState,
					panNumber: null,
				}
			})
		}

		if(isAdhaarNumberValid(employeeData.adhaarNumber)){
			setErrors((prevState)=>{
				return{
					...prevState,
					adhaarNumber: null,
				}
			})
		}
		
		if(isDateOfHireValid(employeeData.dateOfHire)){
			setErrors((prevState)=>{
				return{
					...prevState,
					dateOfHire: null,
				}
			})
		}

		if(isDateOfJoinValid(employeeData.dateOfJoin)){
			setErrors((prevState)=>{
				return{
					...prevState,
					dateOfJoin: null,
				}
			})
		}

		if(isDateOfBirthValid(employeeData.dateOfBirth)){
			setErrors((prevState)=>{
				return{
					...prevState,
					dateOfBirth: null,
				}
			})
		}

		if(isAddress1Valid(employeeData.address1)){
			setErrors((prevState)=>{
				return{
					...prevState,
					address1: null,
				}
			})
		}

		if(isAddress2Valid(employeeData.address2)){
			setErrors((prevState)=>{
				return{
					...prevState,
					address2: null,
				}
			})
		}

		if(isMaritalStatusValid(employeeData.maritalStatus)){
			setErrors((prevState)=>{
				return{
					...prevState,
					maritalStatus: null,
				}
			})
		}

		if(isGenderValid(employeeData.gender)){
			setErrors((prevState)=>{
				return{
					...prevState,
					gender: null,
				}
			})
		}

		if(isRoleValid(employeeData.maritalStatus)){
			setErrors((prevState)=>{
				return{
					...prevState,
					role: null,
				}
			})
		}

		if(isTeamLeadValid(employeeData.gender)){
			setErrors((prevState)=>{
				return{
					...prevState,
					teamLead: null,
				}
			})
		}

		if(isStatusValid(employeeData.maritalStatus)){
			setErrors((prevState)=>{
				return{
					...prevState,
					Status: null,
				}
			})
		}

		if(isReportingManagerValid(employeeData.gender)){
			setErrors((prevState)=>{
				return{
					...prevState,
					reportingManager: null,
				}
			})
		}

		if(isLocationValid(employeeData.location)){
			setErrors((prevState)=>{
				return{
					...prevState,
					location: null,
				}
			})
		}

		if(isPincodeValid(employeeData.location)){
			setErrors((prevState)=>{
				return{
					...prevState,
					pincode: null,
				}
			})
		}

		if(isCityValid(employeeData.location)){
			setErrors((prevState)=>{
				return{
					...prevState,
					city: null,
				}
			})
		}
		if(errors){
	  axios.post('http://localhost:5000/addEmployeeRouter/post',employeeData).then(res=> 
		{
	  setIsModalOpen(!isModalOpen);
	 window.location.reload(true)
	}).catch(err=>console.log(err)
		)}
	}

	// validations


	const isNameValid = (value,name)=>{

		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					[name]: "Required"
				}
			})
			return false;
		}

		if(!value.match(nameRegex)){
			setErrors((prevState)=>{
				return{
					...prevState,
					[name]: "Invalid Name"
				}
			})
			return false;
		}
		return true;
		
     
	}

	const isMobileValid =(value)=>{

		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					'mobile': "Required"
				}
			})
			return false;
		}

		if(!value.match(mobileRegex)){
			setErrors((prevState)=>{
				return{
					...prevState,
					mobile: "Invalid Number"
				}
			})
			return false;
		}
		return true;
		
	}

	const isPanNumberValid=(value)=>{
		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					'panNumber': "Required"
				}
			})
			return false;
		}
		if(!value.match(panNumberRegex)){
			setErrors((prevState)=>{
				return{
					...prevState,
					panNumber: "Invalid Pan Number"
				}
			})
			return false;
		}
		return true;

	}

	const isAdhaarNumberValid=(value)=>{
		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					adhaarNumber: "Required"
				}
			})
			return false;
		}
		if(!value.match(adhaarNumberRegex)){
			setErrors((prevState)=>{
				return{
					...prevState,
					adhaarNumber: "Invalid Adhaar Number"
				}
			})
			return false;
		}
		return true;
	}


	const isDateOfHireValid=(value)=>{
		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					dateOfHire: "Required"
				}
			})
			return false;
		}

	}

	const isDateOfJoinValid=(value)=>{
		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					dateOfJoin: "Required"
				}
			})
			return false;
		}

	}

	const isDateOfBirthValid=(value)=>{
		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					dateOfBirth: "Required"
				}
			})
			return false;
		}

	}

	const isAddress1Valid=(value)=>{
		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					address1: "Required"
				}
			})
			return false;
		}
	}

	const isAddress2Valid=(value)=>{
		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					address2: "Required"
				}
			})
			return false;
		}
	}

	const isMaritalStatusValid=(value)=>{
		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					maritalStatus: "Required"
				}
			})
			return false;
		}
	}

	const isGenderValid=(value)=>{
		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					gender: "Required"
				}
			})
			return false;
		}
	}

	const isRoleValid=(value)=>{
		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					role: "Required"
				}
			})
			return false;
		}
	}

	const isTeamLeadValid=(value)=>{
		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					teamLead: "Required"
				}
			})
			return false;
		}
	}

	const isStatusValid=(value)=>{
		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					status: "Required"
				}
			})
			return false;
		}
	}

	const isReportingManagerValid=(value)=>{
		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					reportingManager: "Required"
				}
			})
			return false;
		}
	}

	const isLocationValid=(value)=>{
		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					location: "Required"
				}
			})
			return false;
		}
	}

	const isPincodeValid = (value)=>{

		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					pincode: "Required"
				}
			})
			return false;
		}
	}

	const isCityValid = (value)=>{

		if(value.length===0){
			setErrors((prevState)=>{
				return{
					...prevState,
					city: "Required"
				}
			})
			return false;
		}
	}

    function submitCheck () {

		let dummy = false;
		for (const field in errors) {

			if (errors [field])
			{
				dummy = true;
				break;
			}

		}

		return dummy;
	}

	const closeHandler = () => {

		setShowPopup(!showPopup);		
		// setIsModalOpen(!isModalOpen);
	}


	return (

		<div>
			{<Popup showPopup={showPopup} setShowPopup={setShowPopup} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>}
			<Modal scrollableContentClassName={styles.addemployee_modal_scrollable_content} 
			  containerClassName={`${isModalShrunk ? styles.addemployee_modal_container_shrunk : styles.addemployee_modal_container}`}
			  isOpen={isModalOpen}>
				<div className={styles.addemployee_modal_header_container}>
					<div className={styles.header_tag_expand_close_icon_container}>

						<div className={styles.header_tag_container}>
							Employee
						</div>

						
						<div className={styles.header_expand_close_icon_container}>
							<div onClick={modalSizeHandler} className={styles.header_expand_icon_container}>
								{isModalShrunk ? <Icon iconName='FullScreen' className={contractIconClass}/>:
								<Icon iconName='BackToWindow' className={contractIconClass}/>}
							</div>
							<div onClick={()=>closeHandler()} className={styles.header_close_icon_container}>
								<Icon iconName='ChromeClose' className={closeIconClass}/>
							</div>

						</div>
		
					</div>

					<div className={styles.header_content_container}>

						<div className={styles.header_content_title_role_container}>
							<div className={styles.header_content_title_container}>
								Add Employee
							</div>

							<div className={styles.header_content_role_save_container}>
								<div className={styles.main_role_dropdown_container}>
										<div className={styles.main_role_title}>ROLE</div>
										<div className={(employeeData.role || errors.role) ? styles.showfield : styles.hidefield }>
											<Dropdown placeholder='select an option' 
												styles={errors.role ? dropDownErrorStyles : dropDownStyles} 
												onChange={(e,item)=>dropDownHandler(e,item,"role")} 
												options={dropDownRole}/>
										</div>
								</div>

								<div className={styles.header_employeeid_save_close_container}>
									<div className={styles.header_save_close_btns_container}>
										<PrimaryButton text={`Save & Close`} 
											onClick={submitHandler} 
											iconProps={{iconName:"Save"}}/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.addemployee_modal_main_container}>

					<div className={styles.main_filter_options_container}>

						<div className={styles.subcontainer}>
							<div className={styles.main_dropdown_container}>
								<div className={styles.main_teamlead_title}>Team Lead</div>
								<div className={(employeeData.teamLead || errors.teamLead) ? styles.showfield : styles.hidefield }>
									<Dropdown placeholder='select an option' 
										styles={errors.teamLead ? dropDownErrorStyles : dropDownStyles} 
										disabled={employeeData.role==='Team Lead'|| employeeData.role==='Reporting Manager' || employeeData.role==='Admin'}
										options={dropDownTeamLead}
										onChange={(e,item)=>dropDownHandler(e,item,"teamLead")} 
										className={styles.loc_dropdown_teamlead}/>
								</div>
							</div>

							<div className={styles.main_dropdown_container}>
								<div className={styles.main_status_title}>Status</div>
								<div className={(employeeData.status || errors.status) ? styles.showfield : styles.hidefield }>
									<Dropdown placeholder='select an option' 
										styles={errors.status ? dropDownErrorStyles : dropDownStyles} 
										options={dropDownStatus}
										onChange={(e,item)=>dropDownHandler(e,item,"status")}
										className={styles.loc_dropdown_status}/>
								</div>
							</div>

						</div>

						<div className={styles.subcontainer}>
							<div className={styles.main_dropdown_container}>
								<div className={styles.main_repotingmanager_title}>{isModalShrunk ? 'Manager' : 'Reporting Manager'}</div>
								<div className={(employeeData.reportingManager || errors.reportingManager) ? styles.showfield : styles.hidefield }>
									<Dropdown placeholder='select an option' 
										styles={errors.reportingManager ? dropDownErrorStyles : dropDownStyles} 
										disabled={employeeData.role==='Recruiter'|| employeeData.role==='Reporting Manager' || employeeData.role==='Admin' } 
										options={dropDownReportingManager}
										onChange={(e,item)=>dropDownHandler(e,item,"reportingManager")} 
										className={styles.loc_dropdown_reportingmanager}/>
								</div>
							</div>

							<div className={styles.main_dropdown_container}>
								<div className={styles.main_location_title}>Location</div>
								<div className={(employeeData.location || errors.location) ? styles.showfield : styles.hidefield }>
									<Dropdown placeholder='select an option' 
										styles={errors.location ? dropDownErrorStyles : dropDownStyles} 
										options={dropDownLocation}
										onChange={(e,item)=>dropDownHandler(e,item,"location")} 
										className={styles.loc_dropdown_location}/>
								</div>
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
										<div className={(employeeData.firstName || errors.firstName)? styles.showfield : styles.hidefield } >
												<TextField  type="text" 
												name="firstName" 
												value={employeeData.firstName}
												onChange={(e)=>inputChangeHandler(e,'firstName')} 
												errorMessage={errors.firstName} 
												styles={Field} />
										</div>

									</div>

									<div className={styles.main_sub_from_field}>

										<div>Last Name</div>
										<div className={(employeeData.lastName || errors.lastName) ? styles.showfield : styles.hidefield } >
												<TextField  type="text" 
												name="lastName" 
												styles={Field} 
												value={employeeData.lastName}
												onChange={(e)=>inputChangeHandler(e,'lastName')} 
												errorMessage={errors.lastName}/>
										</div>

									</div>
								</div>

								<div className={styles.main_from_field}>
									<div className={styles.main_sub_from_field}>

										<div>Email ID</div>
										<div className={(employeeData.email || errors.email) ? styles.showfield : styles.hidefield } >
												<TextField  type="email" 
												name="email" 
												errorMessage={errors.email} 
												styles={Field}  
												value={employeeData.email}
												onChange={(e)=>inputChangeHandler(e,'email')} />
										</div>

									</div>

									<div className={styles.main_sub_from_field}>

										<div>Mobile Number</div>
										<div className={(employeeData.mobile || errors.mobile) ? styles.showfield : styles.hidefield } >
												<TextField  type="text" 
												name="mobile"  
												styles={Field} 
												value={employeeData.mobile} 
												errorMessage={errors.mobile}
												onChange={(e)=>inputChangeHandler(e,'mobile')}/>
										</div>

									</div>
								</div>

								<div className={styles.main_from_field}>
									<div className={styles.main_sub_from_field}>

										<div>Date of hire</div>
										<div className={(employeeData.dateOfHire || errors.dateOfHire ) ? styles.showfield : styles.hidefield } >
												<DatePicker placeholder='DD/MM/YYYY' 
												onSelectDate={(date)=>dateHandler(date,'dateOfHire')} 
												styles={errors.dateOfHire ? calendarErrorClass : calendarClass} />
										</div>
										<div className= {styles.errorfield}>{errors.dateOfHire}</div>
									
									</div>

									<div className={styles.main_sub_from_field}>

										<div>Date of Joining</div>
										<div className={(employeeData.dateOfJoin || errors.dateOfJoin) ? styles.showfield : styles.hidefield } >
												<DatePicker placeholder='DD/MM/YYYY' 
												onSelectDate={(date)=>dateHandler(date,'dateOfJoin')} 
												styles={errors.dateOfJoin ? calendarErrorClass : calendarClass} />
										</div>
										<div className= {styles.errorfield}>{errors.dateOfJoin}</div>
									
									</div>
								</div>
							</div>

						</div>

						<div className={styles.main_basic_information_container}>

							<div className={styles.main_basic_information_title}>
                 				PERSONAL DETAILS
							</div>

							<div className={styles.main_basic_information_content_container}>

								<div className={styles.main_from_field}>
									<div className={styles.main_sub_from_field}>

										<div>Date of Birth</div>
										<div className={(employeeData.dateOfBirth || errors.dateOfBirth) ? styles.showfield : styles.hidefield } >
												<DatePicker placeholder='DD/MM/YYYY' 
												onSelectDate={(date)=>dateHandler(date,'dateOfBirth')} 
												styles={errors.dateOfBirth ? calendarErrorClass : calendarClass} />
										</div>
										<div className= {styles.errorfield}>{errors.dateOfBirth}</div>

									</div>

									<div className={styles.main_sub_from_field}>

										<div>Marital Status</div>
										<div className={(employeeData.maritalStatus || errors.maritalStatus) ? styles.showfield : styles.hidefield } >
												<Dropdown placeholder='select an option'  
												options={dropDownMaritalStatus} 
												onChange={(e,item)=>dropDownHandler(e,item,'maritalStatus')}
												errorMessage={errors.maritalStatus} 
												styles={errors.maritalStatus ? dropDownErrorStyles : dropDownStyles}/>
										</div>
									
									</div>
								</div>


								<div className={styles.main_from_field}>
									
									<div className={styles.main_sub_from_field_gender}>
										<div>Gender</div>
										<div className={(employeeData.gender || errors.gender) ? styles.showfield : styles.hidefield } >
												<Dropdown placeholder='select an option'  
												options={dropDownGender} 
												onChange={(e,item)=>dropDownHandler(e,item,'gender')}
												errorMessage={errors.gender} styles={errors.gender ? dropDownErrorStyles : dropDownStyles}/>
										</div>
									</div>

								</div>

								<div className={styles.main_from_field}>
									<div className={styles.main_sub_from_field}>
										<div>Address Line 1</div>
										<div className={(employeeData.address1 || errors.address1) ? styles.showfield : styles.hidefield } >
												<TextField  type="text" 
												name="address1" 
												styles={Field} 
												onChange={(e)=>inputChangeHandler(e,'address1')} 
												errorMessage={errors.address1}/>
											</div>
									</div>

								</div>

								<div className={styles.main_from_field}>
									<div className={styles.main_sub_from_field}>
										<div>Address Line 2</div>
										<div className={(employeeData.address2 || errors.address2) ? styles.showfield : styles.hidefield } >
												<TextField type="text" 
												name="address2" 
												styles={Field} 
												onChange={(e)=>inputChangeHandler(e,'address2')}
												errorMessage={errors.address2}/>
											</div>
									</div>

								</div>

								<div className={styles.main_from_field}>
									<div className={styles.main_sub_from_field}>
										<div>City</div>
										<div className={(employeeData.city || errors.city) ? styles.showfield : styles.hidefield } >
												<TextField type="text" 
												name="city" 
												styles={Field} 
												onChange={(e)=>inputChangeHandler(e,'city')}
												value={employeeData.city} 
												errorMessage={errors.city} />
											</div>
									</div>

									<div className={styles.main_sub_from_field}>
										<div>Pincode</div>
										<div className={(employeeData.pincode || errors.pincode) ? styles.showfield : styles.hidefield } >
												<TextField type="text" 
												name="pincode" 
												styles={Field} 
												onChange={(e)=>inputChangeHandler(e,'pincode')}
												value={employeeData.pincode} 
												errorMessage={errors.pincode}/>
											</div>
									</div>
								</div>
							</div>
						</div>

						<div className={styles.main_basic_information_container}>

							<div className={styles.main_basic_information_title}>
                 				IDENTITY INFORMATION
							</div>

							<div className={styles.main_basic_information_content_container}>

								<div className={styles.main_from_field}>
									<div className={styles.main_sub_from_field}>
										<div>PAN Number</div>
										<div className={(employeeData.panNumber || errors.panNumber) ? styles.showfield : styles.hidefield } >
												<TextField  type="text" 
												name="panNumber" 
												styles={halfField} 
												onChange={(e)=>inputChangeHandler(e,'panNumber')}
												value={employeeData.panNumber} 
												errorMessage={errors.panNumber}/>
											</div>
									</div>

								</div>

								<div className={styles.main_from_field}>
									<div className={styles.main_sub_from_field}>
										<div>Aadhaar Number</div>
										<div className={(employeeData.adhaarNumber || errors.adhaarNumber ) ? styles.showfield : styles.hidefield } >
												<TextField  
												type="text" 
												name="adhaarNumber" 
												styles={halfField} 
												onChange={(e)=>inputChangeHandler(e,'adhaarNumber')} 
												value={employeeData.adhaarNumber} 
												errorMessage={errors.adhaarNumber}/>
											</div>
									</div>

								</div>
	

							</div>

							<div className={styles.main_basic_information_title}>
                 				ACCOUNT
							</div>

							<div className={styles.main_basic_information_content_container_toggle}>
								<Toggle label="Autogenerate Password" 
									 onText="Yes"  
									offText="No" 
									// defaultChecked
									styles={toggleStyles} 
									onChange={()=>setAutoGeneratePass(!autoGeneratePass)}
									onClick={() => setPwd(genPassword)}/>

									{autoGeneratePass && <div className={styles.main_from_field}>
										<div className={styles.main_sub_from_field}>
											<div>Autogenerate Password</div>
											<div>
												<TextField  type="pass" 
												name="pass" 
												disabled={!showPass} 
												value={password} 
												styles={halfField} />
											</div>
										</div>

									</div>}

								<Toggle label="Send Welcome Mail" 
								defaultChecked 
								onText="Yes" 
								offText="No" 
								styles={toggleStyles} />
							</div>

						</div>
					</div>

				</div>
       

			</Modal>

		</div>
		
	)
}

  function halfField(props) {
	  return ({fieldGroup: [{width:'50%',height:'22px', border:'0.5px solid grey'},]})
  }

  function Field(props) {
	  return ({fieldGroup: [{height:'22px',width:'100%', border:'0.5px solid grey'},]})
  }

export default AddEmployeeModal;
