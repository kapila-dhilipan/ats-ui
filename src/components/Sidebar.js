import React ,{ useState,useContext } from 'react'
import styles from './Sidebar.module.css'
import classNames from 'classnames/bind'
import Sidebaritem from './Sidebaritem'

import { DefaultButton,Callout,DirectionalHint} from '@fluentui/react';
import { useLocation, useNavigate} from 'react-router-dom';
import { useUserContext } from '../contexts/UserProvider';


import  dashboardicon from '../assets/dashboard.svg';
import candidateicon from '../assets/candidate.svg';
import demandreport from '../assets/demandreport.svg';
import masterpage from '../assets/masterpage.svg';
import reports from '../assets/reports.svg';
import submission from '../assets/submission.svg';
import teammanagement from '../assets/teammanagement.svg';
import collapseicon from '../assets/collapsebtn.svg';
import collapseicon1 from '../assets/collapsebtn1.svg';

import addcandidate from '../assets/addcandidate.svg';
import viewsubmission from '../assets/viewsubmission.svg';
import adddemands from '../assets/adddemand.svg';
import managedemands from '../assets/managedemand.svg';
import demandstatus from '../assets/demandstatus.svg';


import addskills from '../assets/addskill.svg';
import addlocation from '../assets/addlocation.svg';
import addclient from '../assets/addclient.svg';
import addsubmissionstatus from '../assets/addsubmissionstatus.svg';
import addsubvendor from '../assets/addsubvendor.svg';


import recruitersubmission from '../assets/recruitersubmission.svg';
import leaddemand from '../assets/leaddemand.png';
import accountmanager from '../assets/accountmanager.svg';
import clientreport from '../assets/clientreport.svg';
import subvendorsubmissions from '../assets/subvendorsubmission.svg';
import clientreportcount from '../assets/clientreportcount.svg';
import addemployee from '../assets/addemployee.svg';
import manageemployee from '../assets/manageemployee.svg';
import assignemployee from '../assets/assignemployee.svg';
import NaukriIcon from '../assets/Naukri-icon.png'
import jobPotal from '../assets/JobPortalImage.png'
import Indeed from '../assets/Indeed-icon.png'
import freshersworld from '../assets/Freshersworld-icon.png'
import Shine from '../assets/shine.png'
const cx = classNames.bind(styles)


const Sidebar = (props) => {

	const {isCollapsed,setCollapsed} = useUserContext();

	const location = useLocation().pathname;

	let navigate = useNavigate(); 

  	function handleNavigation (p) { 
    	navigate(`/${p}`);
    }


	const path = location.split('/');
	const mainPath = path[1];
	const subPath = path[path.length - 1] 

   
	// const {isCollapsed, setCollapsed} = props;
	


	const [isCollapseIconCalloutOpen, setIsCollapseIconCalloutOpen ] = useState(false);

	const [currentIconCallout,setCurrentIconCallout] = useState('');


	const clickCollapseHandler =() =>{
    setCollapsed(!isCollapsed)
	}

	const collapseIconOverHandler =() =>{
		setIsCollapseIconCalloutOpen(!isCollapseIconCalloutOpen)
	} 

	const iconHoverHandler =(e,iconTitle) =>{
    setCurrentIconCallout(iconTitle);
		console.log(iconTitle)
	}
	
   
	return (
		
		<div className={`${styles.sidebar_container} ${isCollapsed ? styles.sidebar_container_collapsed: ''}`}>
			<div className={styles.sidebar_items_container}>
				<Sidebaritem  title={"Dashboard"} 
					sideIcon ={dashboardicon} 
					isCollapsed={isCollapsed}
					handleNavigation ={()=>handleNavigation('dashboard')} isActive={mainPath==='dashboard'} singleItem={true}/>

				<Sidebaritem  handleNavigation ={()=>handleNavigation('demandreport/demandstatus')} id="demand"
				title={"Demand Report"} isActive={mainPath==='demandreport'} sideIcon ={demandreport}
				onMouseEnter={(e)=>iconHoverHandler(e,"demandreport")} onMouseLeave={(e)=>iconHoverHandler(e,'')}

				callout={ currentIconCallout=== "demandreport" && <Callout role='dialog' target={"#demand"} isBeakVisible={false}
				setInitialFocus directionalHint={DirectionalHint.rightTopEdge} calloutMaxWidth={200} >


					 <DefaultButton className={styles.sidebar_sub_btn} 
						 onClick={() => handleNavigation('demandreport/adddemands')}>
						 <div className={cx('submenu-container')}>
							 <img className={cx('submenu-img')} src={adddemands} alt="" />
							 <div className={cx('submenu-title')}> Add Demands </div>
						 </div>
					 </DefaultButton>
	 

				 
					 <DefaultButton className={`${styles.sidebar_sub_btn} 
						 ${subPath==="managedemands" ? styles.sidebar_sub_btn_active : '' }`}  onClick={() => handleNavigation('demandreport/managedemands')}>
						 <div className={cx('submenu-container')}>
							 <img className={cx('submenu-img')} src={managedemands} alt="" />
							 <div className={cx('submenu-title')}> Manage Demands </div>
						 </div>
					 </DefaultButton>
				 

				 
					 <DefaultButton className={`${styles.sidebar_sub_btn} 
						 ${subPath==="demandstatus" ? styles.sidebar_sub_btn_active : '' }`}  onClick={() => handleNavigation('demandreport/demandstatus')}>
						 <div className={cx('submenu-container')}>
							 <img className={cx('submenu-img')} src={demandstatus} alt="" />
							 <div className={cx('submenu-title')}>  Demands Status </div>
						 </div>
					 </DefaultButton>

				 </Callout>}>
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="adddemands" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('demandreport/adddemands')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={adddemands} alt="" />
								<div className={cx('submenu-title')}> Add Demands </div>
							</div>
						</DefaultButton>
		

					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
							${subPath==="managedemands" ? styles.sidebar_sub_btn_active : '' }`}  onClick={() => handleNavigation('demandreport/managedemands')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={managedemands} alt="" />
								<div className={cx('submenu-title')}> Manage Demands </div>
							</div>
						</DefaultButton>
					

					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
							${subPath==="demandstatus" ? styles.sidebar_sub_btn_active : '' }`}  onClick={() => handleNavigation('demandreport/demandstatus')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={demandstatus} alt="" />
								<div className={cx('submenu-title')}>  Demands Status </div>
							</div>
						</DefaultButton>

						
					

 


				</Sidebaritem>

				<Sidebaritem handleNavigation={()=>handleNavigation('submissionlisting')}  title={"Submission Report"} sideIcon ={submission} 
				isActive={mainPath==="submissionlisting"} singleItem={true}/>


				<Sidebaritem title={"Candidate"} handleNavigation={()=>handleNavigation('candidate/viewsubmission')} 
				sideIcon ={candidateicon} isActive={mainPath==="candidate"} id={"Candidate"}
				onMouseEnter={(e)=>iconHoverHandler(e,"candidate")} onMouseLeave={(e)=>iconHoverHandler(e,'')}
				callout={ currentIconCallout=== "candidate" && <Callout role='dialog' calloutMaxWidth={200} gapSpace={0}
				setInitialFocus isBeakVisible={false} target={"#Candidate"} directionalHint={DirectionalHint.rightTopEdge}>


						<DefaultButton className={`${styles.sidebar_sub_btn} 
							${subPath==="addcandidate" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('candidate/addcandidate')}>
								<div className={cx('submenu-container')}>
									<img className={cx('submenu-img')} src={addcandidate} alt="" />
									<div className={cx('submenu-title')}> Add Candidate</div>
								</div>
							</DefaultButton>
						

						
							<DefaultButton className={`${styles.sidebar_sub_btn} 
							${subPath==="viewsubmission" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('candidate/viewsubmission')}>
								<div className={cx('submenu-container')}>
									<img className={cx('submenu-img')} src={viewsubmission} alt="" />
									<div className={cx('submenu-title')}> View submission </div>
								</div>
							</DefaultButton>
				 </Callout>}>


					
							<DefaultButton className={`${styles.sidebar_sub_btn} 
							${subPath==="addcandidate" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('candidate/addcandidate')}>
								<div className={cx('submenu-container')}>
									<img className={cx('submenu-img')} src={addcandidate} alt="" />
									<div className={cx('submenu-title')}> Add Candidate</div>
								</div>
							</DefaultButton>
						

						
							<DefaultButton className={`${styles.sidebar_sub_btn} 
							${subPath==="viewsubmission" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('candidate/viewsubmission')}>
								<div className={cx('submenu-container')}>
									<img className={cx('submenu-img')} src={viewsubmission} alt="" />
									<div className={cx('submenu-title')}> View submission </div>
								</div>
							</DefaultButton>
					
				</Sidebaritem>

					<Sidebaritem title={"Reports"} sideIcon ={reports} handleNavigation={()=>handleNavigation('reports/recruitersubmission')}
					isActive={mainPath==='reports'} id={'reports'}
					onMouseEnter={(e)=>iconHoverHandler(e,'reports')} onMouseLeave={(e)=>iconHoverHandler(e,'')}
					callout={ currentIconCallout=== 'reports' && <Callout role='dialog' calloutMaxWidth={240} gapSpace={0}
					setInitialFocus isBeakVisible={false} target={'#reports'} directionalHint={DirectionalHint.rightTopEdge}>
	
	
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="recruitersubmission" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('reports/recruitersubmission')} >
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={recruitersubmission} alt="" />
								<div className={cx('submenu-title')}> Recruiter Submission </div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="leaddemand" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('reports/leaddemand')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={leaddemand} alt="" />
								<div className={cx('submenu-title')}>  Lead Demand </div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="accountmanager" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('reports/accountmanager')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={accountmanager} alt="" />
								<div className={cx('submenu-title')}>  Account Manager</div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="clientreport" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('reports/clientreport')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={clientreport} alt="" />
								<div className={cx('submenu-title')}> Client Report </div>
							</div>
						</DefaultButton>
				
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="subvendorsubmission" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('reports/subvendorsubmission')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={subvendorsubmissions} alt="" />
								<div className={cx('submenu-title')}>Sub Vendor Submissions </div>
							</div>
						</DefaultButton>
				
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="clientreportcount" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('reports/clientreportcount')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={clientreportcount} alt="" />
								<div className={cx('submenu-title')}>Client Report Count </div>
							</div>
						</DefaultButton>
					 </Callout>}>
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="recruitersubmission" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('reports/recruitersubmission')} >
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={recruitersubmission} alt="" />
								<div className={cx('submenu-title')}> Recruiter Submission </div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="leaddemand" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('reports/leaddemand')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={leaddemand} alt="" />
								<div className={cx('submenu-title')}>  Lead Demand </div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="accountmanager" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('reports/accountmanager')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={accountmanager} alt="" />
								<div className={cx('submenu-title')}>  Account Manager</div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="clientreport" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('reports/clientreport')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={clientreport} alt="" />
								<div className={cx('submenu-title')}> Client Report </div>
							</div>
						</DefaultButton>
				
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="subvendorsubmission" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('reports/subvendorsubmission')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={subvendorsubmissions} alt="" />
								<div className={cx('submenu-title')}>Sub Vendor Submissions </div>
							</div>
						</DefaultButton>
				
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="clientreportcount" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('reports/clientreportcount')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={clientreportcount} alt="" />
								<div className={cx('submenu-title')}>Client Report Count </div>
							</div>
						</DefaultButton>
					

				</Sidebaritem>

				
				<Sidebaritem title={"Master Page"} sideIcon ={masterpage} handleNavigation={()=>handleNavigation('masterpage')}
			  isActive={mainPath === 'masterpage'} id={'masterpage'}
				onMouseEnter={(e)=>iconHoverHandler(e,'masterpage')} onMouseLeave={(e)=>iconHoverHandler(e,'')}
				callout={ currentIconCallout=== 'masterpage' && <Callout role='dialog' calloutMaxWidth={240} gapSpace={0}
				setInitialFocus isBeakVisible={false} target={'#reports'} directionalHint={DirectionalHint.rightTopEdge}>
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="addskills" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('masterpage/addNewSkillSet')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={addskills} alt="" />
								<div className={cx('submenu-title')}>  Add Skill </div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="addlocation" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('masterpage/addNewLocation')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={addlocation} alt="" />
								<div className={cx('submenu-title')}>  Add Location </div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="addclient" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('masterpage/addNewClient')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={addclient} alt="" />
								<div className={cx('submenu-title')}>  Add Client </div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="addsubmissionstatus" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('masterpage/addsubmissionstatus')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={addsubmissionstatus} alt="" />
								<div className={cx('submenu-title')}>  Add Submission Status </div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="addsubvendor" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('masterpage/addsubvendor')}> 
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={addsubvendor} alt="" />
								<div className={cx('submenu-title')}>  Add Sub Vendor</div>
							</div>
						</DefaultButton>

					
				 </Callout>}>
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="addskills" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('masterpage/addskills')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={addskills} alt="" />
								<div className={cx('submenu-title')}>  Add Skill </div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="addlocation" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('masterpage/addlocation')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={addlocation} alt="" />
								<div className={cx('submenu-title')}>  Add Location </div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="addclient" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('masterpage/addclient')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={addclient} alt="" />
								<div className={cx('submenu-title')}>  Add Client </div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="addsubmissionstatus" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('masterpage/addsubmissionstatus')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={addsubmissionstatus} alt="" />
								<div className={cx('submenu-title')}>  Add Submission Status </div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="addsubvendor" ? styles.sidebar_sub_btn_active : '' }`} onClick={() => handleNavigation('masterpage/addsubvendor')}> 
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={addsubvendor} alt="" />
								<div className={cx('submenu-title')}>  Add Sub Vendor</div>
							</div>
						</DefaultButton>
					

				</Sidebaritem>
				
				
					
				<Sidebaritem title={"Team Management"} sideIcon={teammanagement} handleNavigation={()=>handleNavigation('teammanagement/manageemployee')}
				 isActive={mainPath === 'teammanagement'} id={'teammanagement'}
				 onMouseEnter={(e)=>iconHoverHandler(e,'teammanagement')} onMouseLeave={(e)=>iconHoverHandler(e,'')}
				 callout={ currentIconCallout=== 'teammanagement' && <Callout role='dialog' calloutMaxWidth={200} gapSpace={0}
				 setInitialFocus isBeakVisible={false} target={'#teammanagement'} directionalHint={DirectionalHint.rightTopEdge}>

					<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="addemployee" ? styles.sidebar_sub_btn_active : '' }`}
						onClick={() => handleNavigation('teammanagement/addemployee')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={addemployee} alt="" />
								<div className={cx('submenu-title')}>Add Employee </div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="manageemployee" ? styles.sidebar_sub_btn_active : '' }`}
						onClick={() => handleNavigation('teammanagement/manageemployee')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={manageemployee} alt="" />
								<div className={cx('submenu-title')}>Manage Employee </div>
							</div>
						</DefaultButton>
					
				
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="assignemployee" ? styles.sidebar_sub_btn_active : '' }`}
						onClick={() => handleNavigation('teammanagement/assignemployee')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={assignemployee} alt="" />
								<div className={cx('submenu-title')}>Assign Employee </div>
							</div>
						</DefaultButton>
					
						 
					 
					</Callout>}>
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="addemployee" ? styles.sidebar_sub_btn_active : '' }`}
						onClick={() => handleNavigation('teammanagement/addemployee')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={addemployee} alt="" />
								<div className={cx('submenu-title')}>Add Employee </div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="manageemployee" ? styles.sidebar_sub_btn_active : '' }`}
						onClick={() => handleNavigation('teammanagement/manageemployee')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={manageemployee} alt="" />
								<div className={cx('submenu-title')}>Manage Employee </div>
							</div>
						</DefaultButton>
					
				
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="assignemployee" ? styles.sidebar_sub_btn_active : '' }`}
						onClick={() => handleNavigation('teammanagement/assignemployee')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={assignemployee} alt="" />
								<div className={cx('submenu-title')}>Assign Employee </div>
							</div>
						</DefaultButton>
					

				
				</Sidebaritem>
				<Sidebaritem title={"Job Portal"} sideIcon={jobPotal} handleNavigation={()=>handleNavigation('jobportal')}
				 isActive={mainPath === 'jobportal'} id={'jobportal'}
				 onMouseEnter={(e)=>iconHoverHandler(e,'jobportal')} onMouseLeave={(e)=>iconHoverHandler(e,'')}
				 callout={ currentIconCallout=== 'jobportal' && <Callout role='dialog' calloutMaxWidth={200} gapSpace={0}
				 setInitialFocus isBeakVisible={false} target={'#jobportal'} directionalHint={DirectionalHint.rightTopEdge}>

					<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="naukri" ? styles.sidebar_sub_btn_active : '' }`}
						onClick={() => handleNavigation('jobportal/naukri')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={NaukriIcon} alt="" />
								<div className={cx('submenu-title')}>Naukri </div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="freshworld" ? styles.sidebar_sub_btn_active : '' }`}
						onClick={() => handleNavigation('jobportal/freshworld')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={freshersworld} alt="" />
								<div className={cx('submenu-title')}>Freshersworld </div>
							</div>
						</DefaultButton>
					
				
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="shine" ? styles.sidebar_sub_btn_active : '' }`}
						onClick={() => handleNavigation('jobportal/shine')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={Shine} alt="" />
								<div className={cx('submenu-title')}>Shine </div>
							</div>
						</DefaultButton>
					
						 
					 
					</Callout>}>
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="addemployee" ? styles.sidebar_sub_btn_active : '' }`}
						onClick={() => handleNavigation('teammanagement/addemployee')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={addemployee} alt="" />
								<div className={cx('submenu-title')}>Add Employee </div>
							</div>
						</DefaultButton>
					
					
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="manageemployee" ? styles.sidebar_sub_btn_active : '' }`}
						onClick={() => handleNavigation('teammanagement/manageemployee')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={manageemployee} alt="" />
								<div className={cx('submenu-title')}>Manage Employee </div>
							</div>
						</DefaultButton>
					
				
						<DefaultButton className={`${styles.sidebar_sub_btn} 
						${subPath==="assignemployee" ? styles.sidebar_sub_btn_active : '' }`}
						onClick={() => handleNavigation('teammanagement/assignemployee')}>
							<div className={cx('submenu-container')}>
								<img className={cx('submenu-img')} src={assignemployee} alt="" />
								<div className={cx('submenu-title')}>Assign Employee </div>
							</div>
						</DefaultButton>
					

				
				</Sidebaritem>
			</div>
			

   
			<div className={styles.collapse_icon_separator_container}>
				<div className={styles.collapse_separator_container}>

					<div className={styles.collapse_separator}>

					</div>

				</div>


				<div id={'collapseId'} onClick={clickCollapseHandler} onMouseEnter={collapseIconOverHandler} 
				onMouseLeave={collapseIconOverHandler} className={styles.collapse_icon_container} >

					{isCollapseIconCalloutOpen  && isCollapsed && 
					 <Callout target={'#collapseId'} isBeakVisible={false}  popupProps={{className:styles.collapse_icon_callout_container}} role='dialog' 
					 gapSpace={0} setInitialFocus directionalHint={DirectionalHint.topRightEdge}>

						Show more information
					
					</Callout>}
					<img className={cx('collapse-icon',{icon_collapsed: isCollapsed})} src={collapseicon} alt='collapse icon' />
				</div>

			
			</div>



			




		</div>
	)
}


export default Sidebar;