
import React from "react";

// reactstrap components
import {Button, Container, Row, Col} from "reactstrap";
import {useHistory} from "react-router-dom";

const EditHeader = () => {

    const Fname = JSON.parse(localStorage.getItem("ResponsableInfo")).nom;
    const Lname = JSON.parse(localStorage.getItem("ResponsableInfo")).prenom;
    const history = useHistory();

    return (
        <>
            <div
                className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                style={{
                    minHeight: "600px",
                    backgroundImage:
                        "url(" + require("assets/img/theme/profile-cover.jpg") + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center top"
                }}
            >
                {/* Mask */}
                <span className="mask bg-gradient-default opacity-8"/>
                {/* Header container */}
                <Container className="d-flex align-items-center" fluid>
                    <Row>
                        <Col lg="7" md="10">
                            <h1 className="display-2 text-white">Hello {Fname} {Lname}</h1>
                            {/*<p className="text-white mt-0 mb-5">*/}
                            {/*    This is your profile page. You can see the progress you've*/}
                            {/*    made with your work and manage your projects or assigned tasks*/}
                            {/*</p>*/}
                            <Button
                                color="info"
                                onClick={() => history.push('/admin/user-profile')}
                            >
                                Back to your profile
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default EditHeader;
