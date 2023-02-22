const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



export const isEmailValid = (value,setState)=>{

	if(value.length===0){
		setState((prevState)=>{
			return{
				...prevState,
				email: "Required"
			}
		})
		return false;
	}

	if(!String(value).toLowerCase().match(emailRegex)){
		setState((prevState)=>{
			return{
				...prevState,
				email: "Invalid Email"
			}
		})

		return false;
	}

	return true;
}