
import React,{useEffect,useState} from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell} from "@fortawesome/free-solid-svg-icons";
// reactstrap components
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Navbar,
    Nav,
    Container,
    Media,
    NavbarBrand 
} from "reactstrap";
import p2 from "../../assets/img/brand/argon-react.png"
import {getAllEmploye} from "../../network/apiResponsable";
import { padding } from "@mui/system";

const AdminNavbar = props => {
    const [activeemployee, setactiveemployee] = useState([]);


  
  
    const Fname = JSON.parse(localStorage.getItem("ResponsableInfo")).nom;
    const Lname = JSON.parse(localStorage.getItem("ResponsableInfo")).prenom;
    const imageR=JSON.parse(localStorage.getItem("ResponsableInfo")).image;

    const logOut = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            
        
            
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                props.history.push("/auth/login");
            
        }
    }

    return (
        <>
            <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
                <Container fluid>
                    <Link
                        className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                        to="/"
                    >
                        {/* {props.brandText} */}
                    </Link>
                    {/* <NavbarBrand className="pt-0">
                    <img
                        alt=""
                        className="navbar-brand-img"
                        src={p2}
                        style={ {height:"50px",width:"200px",marginLeft:"-200px"}}
                        
                    />
                    </NavbarBrand> */}
                    <Form className="navbar-search navbar-search form-inline ">
                        <FormGroup  >
                            <InputGroup className="input-group-alternative" >
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-search"/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Search" type="text" className="pt-3 " style={ {height:"20px",width:"300px"}} />
                            </InputGroup>
                        </FormGroup>
                    </Form>
                    <div style={{backgroundcolor: "#dce0e4",width:"20px",height:"20px"}}>
                    {/* <FontAwesomeIcon icon={faBell} style={{color: "#fafcff",}} /> */} 
                     </div>
                    <Nav className="align-items-center d-none d-md-flex" navbar>
                    <span className="bg-white" style={{width:"37px",height:"37px", borderRadius:"50%"}}> <FontAwesomeIcon icon={faBell} style={{color: "black", fontSize:"20" , marginLeft:"10px",marginTop:"10px"}} /></span>
                               
                    <UncontrolledDropdown nav>
                            
                    <DropdownToggle className="pr-0" nav>
                                <Media className="align-items-center">
                              
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                          alt="..."
                          
                          src={`data:image/jpeg;base64,${imageR}`}
                      />
                    </span>
                    
                    <Media className="ml-2 d-none d-lg-block">
                    
                                    
                      <span className="mb-0 text-sm font-weight-bold text-dark">
                          {/* {Fname} {Lname} */}
                      </span>
                     
                                    </Media>
                                </Media>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem className="noti-title" header tag="div">
                                    <h6 className="text-overflow m-0">Welcome!</h6>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile" tag={Link}>
                                    <i className="ni ni-single-02"/>
                                    <span>My profile</span>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile" tag={Link}>
                                    <i className="ni ni-settings-gear-65"/>
                                    <span>Settings</span>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile" tag={Link}>
                                    <i className="ni ni-calendar-grid-58"/>
                                    <span>Activity</span>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile" tag={Link}>
                                    <i className="ni ni-support-16"/>
                                    <span>Support</span>
                                </DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem href="#pablo" onClick={logOut}>
                                    <i className="ni ni-user-run"/>
                                    <span>Logout</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default AdminNavbar;
