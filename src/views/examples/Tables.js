import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faGifts,faIdCardClip} from "@fortawesome/free-solid-svg-icons";



import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

import logo from "../../assets/img/brand/pointFiedelty.png";
import p2 from "../../assets/img/brand/p2.png";
import p3 from "../../assets/img/brand/p3.png";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { getAllEmploye } from "../../network/apiResponsable";
import{rewardemployee} from "../../network/apiResponsable";
import { DeleteEmployee } from "../../network/ApiEmployee";

const Tables = () => {
  const [activeemployee, setactiveemployee] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [point, setpoint] = useState(0);

  const [show, setShow] = useState(false);
  const [employeemodal, setEmployeemodal] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    //  console.log("************** employe modal "+JSON.stringify(id_e));
  };
  const id_r = JSON.parse(localStorage.getItem("ResponsableInfo")).id_r;

  const handlepoints = async () => {
    console.log("//////////////////////////////////test")
     
      const response = await rewardemployee (employeemodal.id_e,point);
      console.log("//////////////////////////////////reward///////////")
    
      setShow(false);

  }

  const convertBlobToBase64 = async (blob) => {
    // blob data
    return await blobToBase64(blob);
  };
  

  const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    const runAsync = async () => {
      console.log("/////id_r",id_r)
  
      const response = await getAllEmploye(id_r);
      const { data } = response;
      console.log(
        "data**************************************************",
        data
      );

      if (data.success) {
        setactiveemployee(data.data);
        console.log(
          "data success///////////////////////////////////",
          activeemployee
        );
      }
    };
    runAsync();
  }, []);

  const saveEmployeeinfoModal = (employee) => {
    setEmployeemodal(employee);
    console.log("************ epmloyee data modal " + JSON.stringify(employee));
  };

  const DeleteEmployeeFn = (id_e, nom, prenom, employee) => {
    console.log(
      "************************** nom " +
        nom +
        " prenom " +
        prenom +
        " id e " +
        id_e
    );

    Swal.fire({
      title: "Do you want to to Delete " + nom + " " + prenom,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      console.log("***************result " + JSON.stringify(result));
      /* Read more about isConfirmed, isDenied below */
      if (result.value == true) {
        console.log("************************** delete  ");
        const reponse = DeleteEmployee(id_e)
          .then((reponse) => {
            console.log("**************** delete operation success ");
            var newlistEmployee = activeemployee.filter(
              (item) => item !== employee
            );
            setactiveemployee(newlistEmployee);
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

  // const blobToFile=(theBlob, fileName){
  //  // return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
  // }
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt-4" fluid>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Setting point to {employeemodal.nom} {employeemodal.prenom}{" "}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <style>
              {`
              .imgDiv{
                height:80px;
                
              }
              .divpoint{
                
                transition: 1s;
              }
              .divpoint:hover {
                transform: scale(0.9);
                background-color:rgba(0,0,255,0.3);
              }
              .rowpoint{
                margin : auto;
              }
                .selectedPoint {
                  position: absolute;
                  margin-top: 20px;
                  margin-left: 20px;
              }
            
              
              
              

          `}
            </style>

            <Form>
              <Row className="rowpoint">
                <Col className="divpoint"
                  xs={6}
                  md={4}
                  onClick={() => {
                    setpoint(20);
                    
                  }}
                >
                  <img alt="not disponible" className="imgDiv" src={p2} />
                  <h4>20 points</h4>
                </Col>
                <Col className="divpoint"
                  xs={6}
                  md={4}
                  onClick={() => {
                    setpoint(50);
                   
                  }}
                >
                  <img alt="not disponible" className="imgDiv" src={logo} />
                  <h4>50 points</h4>
                </Col>

                <Col className="divpoint"
                  xs={6}
                  md={4}
                  onClick={() => {
                    setpoint(70);
                    
                  }}
                >
                  <img alt="not disponible" className="imgDiv" src={p3} />
                  <h4>70 points</h4>
                </Col>
            
              </Row>
              <Row className="selectedPoint">
                
                
                <h4>selected Points {point}  </h4> 
                
                  </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handlepoints}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Score</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Rank</th>
                    <th scope="col">Score</th>
                    <th scope="col">rewards</th>
                    <th scope="col">Action </th>
                  </tr>
                </thead>
                <tbody>
                  {activeemployee.map((employee) => (
                    <tr key={employee.email}>
                      {/* <p>{convertBlobToBase64(employee.image.data)}</p> */}
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="no image availble"
                              src={`data:image/jpeg;base64,${employee.image}`}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              {employee.nom} {employee.prenom}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{employee.email}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-success" />
                          {employee.grade}
                        </Badge>
                      </td>
                      <td>{employee.nbr_point}</td>
                      <td>
                      <Button outline size="sm" color="primary"> Rewards </Button>

                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={() =>
                                DeleteEmployeeFn(
                                  employee.id_e,
                                  employee.nom,
                                  employee.prenom,
                                  employee
                                )
                              }
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{ color: "#d51b07" }}
                              />
                              Delete
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              //onClick={handleShow}
                              onClick={() => {
                                handleShow();
                                saveEmployeeinfoModal(employee);
                              }}
                            >
                           <FontAwesomeIcon icon={faGifts} style={{color: "#4d6ca3",}} />
                             Gift Points
                            </DropdownItem>



                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
