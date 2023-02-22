import {render,screen} from '@testing-library/react'
import LinkingPage from './linkingPage'
it('CheckButton',()=>{
    render(<LinkingPage/>)
       let data=screen.queryByTitle("demo")
       expect(data).toBeTruthy()
})