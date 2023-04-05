
import React, {useState} from "react";
//import Swal from 'sweetalert2-react';
import Swal from 'sweetalert2'

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Label,
    option,
    Row,
    Col
} from "reactstrap";
import Toast from 'react-bootstrap/Toast'
import {register} from "../../network/ApiEmployee";
import {registerresponsable}from "../../network/apiResponsable"
import config from "../../config";

const Register = (props) => {


    const [Fname, setFname] = useState("");
    const [Lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [Emailresponsable,setEmailresponsable]=useState("")
   // const [submitState,setsubmitState]=useState(false)
    const [grade, setgrade] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checkbox, setCheckbox] = useState(false);
    const [error, setError] = useState("");
    //error messages*****************
    const [errorname, setErrorname] = useState("");
    const [errorlastname, setErrorlastname] = useState("");
    const[erroremail,setErroremail]=useState("");
    const [errorPassword,seterrorPassword]=useState("")
    const [errorconfirmPassword, seterrorconfirmPassword]=useState("")
    const [errormatchpassword,seterrormatchpassword] =useState("") 
    const [ Erroremailresp,setErroremailresp] =useState("") 
 
    const[errorgarde,seterrorGrade]=useState("");

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("Email sent! Check it to reset your password.");
    const [userID, setUserID] = useState(null);





    const registerUser = async () => {
     //   submitState=setsubmitState(true);
       // console.log("************ state submmit "+this.submitState);
       if(!errorname){
        setErrorname("Firstname is required")
    }
    if(!errorlastname){
        
      setErrorlastname("Lastname is required")
    }
    if (!email  ) {
     setErroremail ("email must be required")
      } 
      else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
        setErroremail("invalide format " )
      }
      if(email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ){
        setErroremail("" )
      }
    
    if (!errorPassword){
        seterrorPassword("Password is required")
    }
    if (!errorconfirmPassword){
        seterrorconfirmPassword("Confirm Password is required")
    }
    else if (password !== confirmPassword) {
        seterrormatchpassword("Passwords do not match");
        
    }
      if (!grade){
        seterrorGrade("grade is required")
     }
     if (!Emailresponsable  ) {
        setErroremailresp ("email must be required")
         } 
     else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
            setErroremailresp("invalide format " )
         }
     if(email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ){
            setErroremailresp("" )
         }
    
       
  




      
   if(grade=="manager"){
    try {
        const response = await registerresponsable(Fname,Lname, email , password,grade);

        console.log("*************success adding employee"+JSON.stringify(response));
                Swal.fire({
                    icon: 'success',
                    title: 'Oops...',
                    text: 'Successfuly registred',
                    footer: '<a href="">Why do I have this issue?</a>'
                  })
                  props.history.push("/auth/login");
        // Work with the response...
    } 
    catch (err) {
        if (err.response) {
            // The client was given an error response (5xx, 4xx)
        } else if (err.request) {
            // The client never received a response, and the request was never left
        } else {
            // Anything else
            console.log('Error', err.message);
        }
        console.error('There was an error!', JSON.stringify(error));
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'email deja exist===>' +err.message,
            footer: '<a href="">Why do I have this issue?</a>'
          })
    }






    if (config.DEMO) {
        setToastMessage("This is a demo, so we will not send you an email. Instead, click on this link to verify your account:")
     
    }
    setError("");
    setFname("");
    setLname("")
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setgrade("")
    setCheckbox(false);
    setShowToast(true);
}


   else{       
         
            try {
                const response = await register(Fname,Lname, email , password,grade,Emailresponsable);

                console.log("*************success adding employee"+JSON.stringify(response));
                        Swal.fire({
                            icon: 'success',
                            title: 'Oops...',
                            text: 'Successfuly registred',
                            footer: '<a href="">Why do I have this issue?</a>'
                          })
                          props.history.push("/auth/login");
                // Work with the response...
            } catch (err) {
                if (err.response) {
                    // The client was given an error response (5xx, 4xx)
                } else if (err.request) {
                    // The client never received a response, and the request was never left
                } else {
                    // Anything else
                    console.log('Error', err.message);
                }
                console.error('There was an error!', JSON.stringify(error));
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'email deja exist===>' +err.message,
                    footer: '<a href="">Why do I have this issue?</a>'
                  })
            }
        
            if (config.DEMO) {
                setToastMessage("This is a demo, so we will not send you an email. Instead, click on this link to verify your account:")
             
            }
            setError("");
            setFname("");
            setLname("")
            setEmail("");
            setEmailresponsable("")
            setPassword("");
            setConfirmPassword("");
            setgrade("")
            setCheckbox(false);
            setShowToast(true);
        }
 };

    return (
        <>
            <div
                aria-live="polite"
                aria-atomic="true"
                style={{
                    position: 'fixed',
                    minHeight: '100px',
                    width: "35%",
                    right: 10,
                    bottom: 80,
                    zIndex: 50
                }}
            >
                <Toast style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10
                }} onClose={() => setShowToast(false)} show={showToast} delay={10000} autohide={!config.DEMO}>
                    <Toast.Header>
                        <img style={{height: "30px", width: "100px"}} src={require("assets/img/brand/argon-react.png").default}  alt="..."/>
                    </Toast.Header>
                    <Toast.Body>
                        {toastMessage}
                        {config.DEMO ?
                            <a href={config.DOMAIN_NAME + '/auth/confirm-email/' + userID}>
                                {config.DOMAIN_NAME + '/auth/confirm-email/' + userID}
                            </a> : null}
                    </Toast.Body>
                </Toast>
            </div>
            <Col lg="6" md="8">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-5">
                        <div className="text-muted text-center mt-2 mb-4">
                            <small>Sign up with</small>
                        </div>
                        <div className="text-center">
                            <Button
                                className="btn-neutral btn-icon mr-4"
                                color="default"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                    <span className="btn-inner--icon">
                        <img
                            alt="..."
                            src={require("assets/img/icons/common/github.svg").default}
                        />
                    </span>
                                <span className="btn-inner--text">Github</span>
                            </Button>
                            <Button
                                className="btn-neutral btn-icon"
                                color="default"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                  <span className="btn-inner--icon">
                    <img
                        alt="..."
                        src={require("assets/img/icons/common/google.svg").default}
                    />
                  </span>
                                <span className="btn-inner--text">Google</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Or sign up with credentials</small>
                        </div>
                        <Form role="form">
                            <FormGroup style={{float:'left'}}>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-hat-3"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="First Name" type="text" value={Fname}
                                           onChange={e => setFname(e.target.value)} 
                                    />
                                    
                                </InputGroup>
                                {errorname  && Fname.length==0 ?
                            <div className="text-muted font-italic">
                                <small>
                              
                                    <span className="text-red font-weight-700">{errorname}</span>
                                </small>
                            </div> : null }
                                {/* {Fname.length ==0 ?
                            <div className="text-muted font-italic">
                                <small>
                                   
                                    <span className="text-red font-weight-700">First name required</span>
                                </small>
                            </div> : null }  */}
                            </FormGroup >
                           
                            <FormGroup style={{float:'left'}}>
                                <InputGroup className="input-group-alternative mb-3 ml-2">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-hat-3"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Last Name" type="text" value={Lname}
                                           onChange={e => setLname(e.target.value)} 
                                    />
                                </InputGroup>
                                {errorlastname  && Lname.length==0?
                            <div className="text-muted font-italic">
                                <small>
                            
                                    <span className="text-red font-weight-700">{errorlastname}</span>
                                </small>
                            </div> : null }
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input required={true} placeholder="Your Email" type="email"  value={email}
                                           onChange={e => setEmail(e.target.value)}
                                    />
                                </InputGroup>
                          

                            {erroremail  ?
                            <div className="text-muted font-italic">
                                <small>
                            
                                    <span className="text-red font-weight-700">{erroremail} </span>
                                </small>
                            </div> : null }
                            </FormGroup>
                          
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Password" type="password" autoComplete="new-password" value={password}
                                           onChange={e => setPassword(e.target.value)}
                                    />
                                </InputGroup>
                                {errorPassword && password.length==0 ?
                            <div className="text-muted font-italic">
                                <small>
                            
                                    <span className="text-red font-weight-700">{errorPassword} </span>
                                </small>
                            </div> : null }
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Confirm Password" type="password" autoComplete="new-password" value={confirmPassword}
                                           onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                </InputGroup>
                                {errorconfirmPassword && confirmPassword.length==0 ?
                            <div className="text-muted font-italic">
                                <small>
                            
                                    <span className="text-red font-weight-700">{errorconfirmPassword} </span>
                                </small>
                            </div> : null }

                            {errormatchpassword  && password.length > 0 ?
                            <div className="text-muted font-italic">
                                <small>
                            
                                    <span className="text-red font-weight-700">{errormatchpassword} </span>
                                </small>
                            </div> : null }

                            </FormGroup>
                                <FormGroup>
                                        <Label  > <span className="text-muted"> Your Grade : </span></Label>
                                            <div className="">

                                            <Input
                                                name="grade"
                                                type="select"
                                                value={grade}
                                                onChange={(e)=>{
                                                    console.log("grade choosed "+grade)
                                                    setgrade(e.target.value)   }}
                                                >
                                                <option value="" hidden > choose your  grade</option>
                                                <option value={"manager"}>Manager</option>
                                                <option value={"employee"}>Employee</option>

                                            </Input>
                    
                                            </div>
                                          {errorgarde?
                            <div className="text-muted font-italic">
                                <small>
                            
                                    <span className="text-red font-weight-700">{errorgarde}</span>
                                </small>
                            </div> : null } 
                                 </FormGroup> 


                                 {grade=="employee"&& (
                                            <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-email-83"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Senior Manager Email" type="email" autoComplete="new-email" value={Emailresponsable}
                                                       onChange={e => setEmailresponsable(e.target.value)}
                                                />
                                            </InputGroup>
                                            {Erroremailresp ?
                            <div className="text-muted font-italic">
                                <small>
                            
                                    <span className="text-red font-weight-700">{Erroremailresp} </span>
                                </small>
                            </div> : null }
                                         </FormGroup>
                                        )}
                                 
                                 
                            <Row className="my-4">
                                <Col xs="12">
                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                        
                                        <input
                                            className="custom-control-input"
                                            id="customCheckRegister"
                                            type="checkbox"
                                            checked={checkbox}
                                            onChange={() => setCheckbox(!checkbox)}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="customCheckRegister"
                                        >
                                            <span className="text-muted">
                                            I agree with the{" "}
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                Privacy Policy
                                            </a>
                                            </span>
                                        </label>
                                     </div>
                                 </Col>
                             </Row>
                            <div className="text-center">
                                <Button    onClick={registerUser} className="mt-4" color="primary" type="button">
                                    Create account
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default Register;
