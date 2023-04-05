import React, {useEffect, useState} from 'react';
import Header from "../../components/Headers/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faCheck } from "@fortawesome/free-solid-svg-icons";
import { DeleteEmployee } from "../../network/ApiEmployee";

import {
    Card,
    CardHeader,
    Container,
    Row,
    Table,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle
} from "reactstrap";
import {getAllEmployeeNotActiveList} from "../../network/apiResponsable";
import {updateStateAccountToActive} from "../../network/ApiEmployee";
import Swal from 'sweetalert2'
const UsersTable = () => {

    const [active,setactive]=useState(false)
    
    
     const [inactiveemployee, setinactiveemployee] = useState([]);
     const id_r = JSON.parse(localStorage.getItem("ResponsableInfo")).id_r;

    useEffect(() => {
        const runAsync = async () => {
            const response = await getAllEmployeeNotActiveList(id_r);
            const {data} = response;
            console.log("data**************************************************",data);
           
         
            if (data.success) {
                setinactiveemployee(data.data);
                   console.log("data success///////////////////////////////////",inactiveemployee);
            }
        }
        runAsync();
    }, []);

    const onItemClickHandler = (id) => {
        console.log("test"+id);
     //   console.log(event);
   updateStateAccountToActive(id).then(rep=>{
    console.log("******************************success update "+JSON.stringify(rep));
    Swal.fire({
        icon: 'success',
        title: 'Oops...',
        text: 'Successfuly activation account  ',
        footer: '<a href="">Why do I have this issue?</a>'
      })
     }).catch(err=>{
        console.log("******************************err  update  employee");
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'error activation account  ',
            footer: '<a href="">Why do I have this issue?</a>'
          })
     })
    }
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
                var newlistEmployee = inactiveemployee.filter(
                  (item) => item !== employee
                );
                setinactiveemployee(newlistEmployee);
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
            <Header/>
            <Container>
                <Row>
                    <div className="col mt-4">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Inactive Employee</h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col"><b>User Name</b></th>
                                    <th scope="col"><b>Email</b></th>
                                    <th scope="col"><b>Status</b></th>
                                    <th scope="col"><b>Action</b></th>
                                </tr>
                                </thead>
                                <tbody>
                                {inactiveemployee.map(user => (
                                    <tr key={user.email}>
                                        <th scope="row">
                                            {user.nom} {user.prenom}
                                        </th>
                                        <td>{user.email}</td>
                                        <td>{ user. isActive===true?"Active":"Inactive" } 
                                        </td>
                                        <td className="text-right">
                                        <UncontrolledDropdown>
                                        <DropdownToggle
                                            className="btn-icon-only text-light"
                                            href="#pablo"
                                            role="button"
                                            size="sm"
                                            color=""
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className="fas fa-ellipsis-v" />
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                            <DropdownItem
                                            href="#pablo"
                                            onClick={()=> onItemClickHandler(user.id_e)}
                                            >
                                                <FontAwesomeIcon icon={faCheck} style={{color: "#245106",}} />Activate 
                                            </DropdownItem>
                                            <DropdownItem
                                            href="#pablo"
                                            onClick={() =>
                                                DeleteEmployeeFn(
                                                  user.id_e,
                                                  user.nom,
                                                  user.prenom,
                                                  user
                                                )
                                              }

                                           
                                            >
                                                <FontAwesomeIcon icon={faTrash} style={{color: "#d51b07",}} />
                                                Delete
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
}

export default UsersTable;
