import React from 'react'
import Styles from './jobPortal'
import {PrimaryButton,Stack,Link} from '@fluentui/react'
const LinkingPage = () => {
   const sectionStackTokens = { childrenGap: 10 }
   const [shown, setShown] = React.useState(false)
   const [fresh, setfresh] = React.useState(false)
  return (
    <div>
      
   {shown?   
  <iframe src="https://www.naukri.com" style={Styles.iframe} title="Iframe Example"></iframe>:""}
 
   {fresh?   
  <iframe src={ <Link href='https://in.indeed.com'/>} style={Styles.iframe} title="Iframe Example"></iframe>:""}
  <Stack   horizontal tokens={sectionStackTokens}>
  <PrimaryButton onClick={()=>
    setShown(true)
     }>Naukri</PrimaryButton>
  <PrimaryButton  title='demo' onClick={()=>
    setfresh(true)
     }>freshersworld</PrimaryButton>
     </Stack>
  </div>
  )
}

export default LinkingPage