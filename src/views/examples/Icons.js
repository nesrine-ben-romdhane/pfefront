import { React, useEffect, useState } from "react";
// react component that copies the given text inside your clipboard
// reactstrap components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUser,
  faCalendarDays,
  faAward,
} from "@fortawesome/free-solid-svg-icons";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  CardHeader,
  Container,
  Row,
  Col,
  CardTitle,
  CardText,
  Button,
  Media,

} from "reactstrap";

import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";

import Swal from "sweetalert2";

// core components
import Header from "components/Headers/Header.js";
import { Card, Icon, Image } from "semantic-ui-react";
import { getAllEmployeeRecomponses } from "network/ApiRecompense";
import { updaterewardstatus } from "network/ApiRecompense";
import{Deletereward,getAllrewardsvalidate } from "network/ApiRecompense"






import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import Imagebg from "../../assets/img/brand/triangle-light.png";
import Imagere from"../../assets/img/brand/trophy.png";
import data from"../../assets/img/brand/no-data-found.png";


// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Icons = () => {
  const id_r = JSON.parse(localStorage.getItem("ResponsableInfo")).id_r;
  const nom_rsp = JSON.parse(localStorage.getItem("ResponsableInfo")).nom;
  const prenom_rsp = JSON.parse(localStorage.getItem("ResponsableInfo")).prenom;
  const [allrecompenses, setallrecompenses] = useState([]);
  const [allrewardValidate, setallrewardValidate] = useState([]);
  const [basicActive, setBasicActive] = useState("tab1");




  useEffect(() => {
    const runAsync = async () => {
      const response = await getAllEmployeeRecomponses(id_r);
      const { data } = response;
      if (data.success) {
        setallrecompenses(data.listEmplooyee);
       // console.log("data success///////////////////////////////////", data);
      }
      const resp = await getAllrewardsvalidate(id_r);
    //console.log("****************** reponse validated rewards result "+JSON.stringify(resp));
      if (resp.data.success) {
        setallrewardValidate(resp.data.listEmplooyee);
        console.log("data rewards success///////////////////////////////////", resp.data.listEmplooyee);
      }
    };
    runAsync();
  }, []);
  //////////////////////////////////////////////////////

  const handleBasicClick = (value) => {
    console.log("************** selected tabs " + value);
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  ///////////////////////////////////////////////////////////////////////////////

  const onItemClickHandler = (id,nom_rsp,prenom_rsp,nomE,PrenomE,nomR,PrenomR,EmailE,EmailR,date_attribuation,nbr_points,id_e,id_e_r) => {
    console.log("//////////////////////////////////////test variable","Nom Responsable==>"+nom_rsp,+"Prenom Resposanble==>"
    +prenom_rsp+"nom Emetteur==>"+nomE+
    "Prenom E==>"
    +PrenomE,"nom Recepteur==>"+nomR+"Prenom Recepetur==>"+
    PrenomR+"Email Emetteur==>"+EmailE, "Email R==>"+ EmailR+"date attribution==>"+date_attribuation+
    "Nbr points"+nbr_points+" id e "+id_e+"id_e_r"+id_e_r);
    Swal.fire({
      title: "Do you want to to validate  this rewards",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Validate",
      confirmButtonColor: "#5cb85c",
      denyButtonText: `Don't Validate`,
    }).then((result) => {
      console.log(
        "***************result ============================================>" +
          JSON.stringify(result)
      );
      /* Read more about isConfirmed, isDenied below */
      if (result.value == true) {
        console.log("************************** delete  ");
        const reponse = updaterewardstatus(id,nom_rsp,prenom_rsp,nomE,PrenomE,nomR,PrenomR,EmailE,EmailR,date_attribuation,nbr_points,id_e,id_e_r)
          .then((reponse) => {
            console.log("**************** validate  operation success ");
            // var newlistEmployee = activeemployee.filter(
            //   (item) => item !== employee
            // );
            // setactiveemployee(newlistEmployee);
            Swal.fire("validated rewards!", "", "success");
          })
          .catch((err) => {
            console.log("**************** update rewards  operation failed======>"+JSON.stringify(err));

            Swal.fire("rewards not validated", "", "info");
          });
      } else {
        console.log("**************** not confirmed ");
        Swal.fire("Validate not confirmed", "", "info");
      }
    });
  };

  ////////////////////////////////////////////////////


  const handleReword  = (id_r) => {
    Swal.fire({
      title: "Do you want  to Delete the reward" ,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      console.log("***************result " + JSON.stringify(result));
      /* Read more about isConfirmed, isDenied below */
      if (result.value == true) {
        console.log("************************** delete  ");
        const reponse =  Deletereward (id_r)
          .then((reponse) => {
            console.log("**************** delete operation success ");
            // var newlistEmployee = inactiveemployee.filter(
            //   (item) => item !== employee
            // );
            // setinactiveemployee(newlistEmployee);
            Swal.fire("Deleted!", "", "success");
          })
          .catch((err) => {
            console.log("**************** delete operation failed");

            Swal.fire("Delete not confirmed", "", "info");
          });
      } else {
        console.log("**************** not confirmed ");
        Swal.fire("Delete not confirmed", "", "info");
      }
    });
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <div className="col mt-4">
            <Card className="shadow" style={{paddingBottom:"100px"}}>
              {/* <CardHeader className="border-0">
                <h3 className="mb-0" >rewards</h3>
              </CardHeader> */}
              <MDBTabs className="mb-3 mt-4 ml-5" style={{color:"#1c3474",width:"85%",}}>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleBasicClick("tab1")}
                    active={basicActive === "tab1"}
                  >
                    <b>Invalidated Rewards</b>
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleBasicClick("tab2")}
                    active={basicActive === "tab2"}
                  >
                    
                   <b>Validated Rewards</b> 
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>

              <MDBTabsContent>
                <MDBTabsPane  show={basicActive === "tab1"} style={{width:"80%",marginLeft:"80px",}}>

                  <div>
                    {allrecompenses.length==0 ? <div>
                    
                      <img src={data} style={{width:"600px",height:"450px",marginTop:"70px",marginLeft:"100px"}}></img>
                    </div>
                   
                    :''}
                    {allrecompenses.map((employe, index) => {
                      return (
                        <Accordion style={{backgroundColor:"#f8f9fe"}}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{backgroundColor:"", marginTop:"20px", }}
                          >
                              <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="no image availble"
                              src={`data:image/jpeg;base64,${allrecompenses[index].image}`}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                            {allrecompenses[index].nom}{" "}
                              {allrecompenses[index].prenom}
                            </span>
                          </Media>
                         </Media>
                            {/* <Typography >
                              <FontAwesomeIcon icon={faUser} /> <b>
                              {allrecompenses[index].nom}{" "}
                              {allrecompenses[index].prenom}</b>
                            </Typography> */}
                          </AccordionSummary>
                          <AccordionDetails style={{backgroundColor:"#f8f9fe"}}>
                            <Row>
                              {allrecompenses[index].recomponses.map(
                                (rec, key) => {
                                  return (
                                    <Col sm="6"  >
                                      <Card body  sx={{ position: 'relative' }} style={{paddingLeft:"20px",paddingBottom:"20px"}}>
                                        <CardTitle  >
                                         <Typography variant='h6'>Congratulations 🥳! {rec.id_e_r_employee.nom}{" "}
                                          {rec.id_e_r_employee.prenom}</Typography>
                                          <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
                                          {allrecompenses[index].nom}{" "}
                                          {allrecompenses[index].prenom} <br />
                                             Send him   {rec.nbr_point} points
                                         </Typography>
                                      </CardTitle>
                                        <CardText>
                                         <Row>
                                            <Col>
                                              <FontAwesomeIcon
                                              style={{color:"#f0ad4e",fontSize:"20px"}}
                                                icon={faCalendarDays }
                                              />
                                             {''}  {''} {rec.date_attribuation}
                                            </Col>
                                          </Row>
                                          <Col>
                                          {/* <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
                                              <FontAwesomeIcon icon={faAward} />
                                            
                                              Number of points
                                              </Typography> */}
                                            </Col>
                                          <Row>
                                            

                                          </Row>
                                        </CardText>
                                        
                                        <Row style={{marginLeft:"15px"}}>
                                        <Button size="sm" color="success"
                                          onClick={() =>
                                            onItemClickHandler(rec.id_r,nom_rsp,prenom_rsp,allrecompenses[index].nom,allrecompenses[index].prenom,rec.id_e_r_employee.nom, rec.id_e_r_employee.prenom,allrecompenses[index].email,  rec.id_e_r_employee.email,rec.date_attribuation,rec.nbr_point,rec.id_e,rec.id_e_r)
                                          }
                                        >Validate
                                         </Button>
                                         
                                         <Button size="sm" color="danger"  onClick={() =>
                                            handleReword(rec.id_r)
                                          }> 
                                          
                                         Delete
                                         </Button>

                                       
                                        </Row>
                                         <TriangleImg alt='triangle background' src={Imagebg} />
                                        <TrophyImg alt='trophy' src={Imagere } />
                                        
                                       
                                      </Card>
                                    </Col>
                                  );
                                }
                              )}
                            </Row>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                  </div>
                </MDBTabsPane>
                <MDBTabsPane show={basicActive === "tab2"}  style={{width:"80%",marginLeft:"80px",}}>
                
                <div>
                    {allrewardValidate.length==0?<h1>no rewards avalaible </h1>:''}
                    {allrewardValidate.map((employe, index) => {
                      return (
                        <Accordion style={{backgroundColor:"#f8f9fe"}}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{backgroundColor:"", marginTop:"20px", }}
                          >
                              <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="no image availble"
                              src={`data:image/jpeg;base64,${allrewardValidate[index].image}`}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                            {allrewardValidate[index].nom}{" "}
                              {allrewardValidate[index].prenom}
                            </span>
                          </Media>
                        </Media>
                            {/* <Typography >
                              <FontAwesomeIcon icon={faUser} /> <b>
                              {allrecompenses[index].nom}{" "}
                              {allrecompenses[index].prenom}</b>
                            </Typography> */}
                          </AccordionSummary>
                          <AccordionDetails style={{backgroundColor:"#f8f9fe"}}>
                            <Row>
                              {allrewardValidate[index].recomponses.map(
                                (rec, key) => {
                                  return (
                                    <Col sm="6"  >
                                      <Card body  sx={{ position: 'relative' }} style={{paddingLeft:"20px",paddingBottom:"20px"}}>
                                        <CardTitle  >
                                         <Typography variant='h6'>Congratulations 🥳! {rec.id_e_r_employee.nom}{" "}
                                          {rec.id_e_r_employee.prenom}</Typography>
                                          <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
                                          {allrewardValidate[index].nom}{" "}
                                          {allrewardValidate[index].prenom} <br />
                                             Send him   {rec.nbr_point} points
                                         </Typography>
                                      </CardTitle>
                                        <CardText>
                                         <Row>
                                            <Col>
                                              <FontAwesomeIcon
                                              style={{color:"#f0ad4e",fontSize:"20px"}}
                                                icon={faCalendarDays }
                                              />
                                             {''}  {''} {rec.date_attribuation}
                                            </Col>
                                          </Row>
                                          <Col>
                                          {/* <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
                                              <FontAwesomeIcon icon={faAward} />
                                            
                                              Number of points
                                              </Typography> */}
                                            </Col>
                                          <Row>
                                            

                                          </Row>
                                        </CardText>
                                        
                                    
                                         <TriangleImg alt='triangle background' src={Imagebg} />
                                        <TrophyImg alt='trophy' src={Imagere } />
                                        
                                       
                                      </Card>


  



                                    </Col>
                                  );
                                }
                              )}
                            </Row>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                  </div>
                </MDBTabsPane>
              </MDBTabsContent>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Icons;
