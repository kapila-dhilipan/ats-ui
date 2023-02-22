 import React from 'react'
import { Modal } from '@fluentui/react'
import styles from './Popup.module.css'
import { Icon } from '@fluentui/react/lib/Icon';
import {PrimaryButton, DefaultButton} from '@fluentui/react';
import { mergeStyles, mergeStyleSets} from '@fluentui/react';

 
export function Popup(props) {

    let showPopup = props.showPopup;
    let setShowPopup = props.setShowPopup;
    let isModalOpen = props.isModalOpen;
    let setIsModalOpen = props.setIsModalOpen;

    return(
    <>
        <Modal isOpen={showPopup} containerClassName={styles.mainContainer}>

            <div className={styles.closePopup}>
                <div className={styles.topContainer}>

                    <div className={styles.title}>Confirm</div>

                    <div className={styles.closeButton} onClick={() => setShowPopup(!showPopup)}><Icon iconName='ChromeClose'/></div>
                    
                </div>

                <div className={styles.message}>You have modified this page, You can save your changes, discard your changes, or cancel to continue editing.</div>
                
                <div className={styles.bottomContainer}>
                    <div className={styles.spacer}></div>
                    <div className={styles.buttonContainer}>
                        <DefaultButton text={`no`} onClick={() => setShowPopup(!showPopup)}/>
                        <PrimaryButton text={`yes`} onClick={() => {setShowPopup(!showPopup); setIsModalOpen(!isModalOpen)}}/>
                    </div>
                </div>
               
            </div>
        </Modal>
    </>
    )
}