import { useContext, useEffect, useState } from "react";
import { SetJWT } from "../../store/context";
import { AllCustomersAndOwners, ResetUserPassword, ToggleUserStatus } from "../../services/AdminService";
import { Tabel, TabelWrap, Tbody, Td, Th, Thead, Tr, TrTabel } from "./style";
import { Button } from "../shared/style";
import { SignText } from "../shared/style";

const ManageUsers = () => {
    const [usres, setUsres] = useState([]);
    const { jwt } = useContext(SetJWT);
    const [flag, setFlag] = useState([]);

    useEffect(() => {
        AllCustomersAndOwners({ jwt })
            .then((res) => {
                setUsres(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        AllCustomersAndOwners({ jwt })
            .then((res) => {
                setUsres(res.data);
            })
            .catch((err) => console.log(err));
    }, [flag]);

    const HandleResetPassword = (id) => {
        ResetUserPassword({ jwt }, { id: id })
            .then((res) => {
                setFlag(!flag);
            })
            .catch((err) => console.log(err));
    };

    const HandleActivate = (id) => {
        ToggleUserStatus({ jwt }, { id: id, status: "ACTIVE" })
            .then((res) => {
                setFlag(!flag);
            })
            .catch((err) => console.log(err));
    };

    const HandleDeactivate = (id) => {
        ToggleUserStatus({ jwt }, { id: id, status: "INACTIVE" })
            .then((res) => {
                setFlag(!flag);
            })
            .catch((err) => console.log(err));
    };

    return <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TabelWrap>
                <Tabel>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Email</Th>
                            <Th>Name</Th>
                            <Th>Type</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {usres.map((user) => {
                            return (
                                <TrTabel key={user.id}>
                                    <Td>{user.id}</Td>
                                    <Td>{user.email}</Td>
                                    <Td>{user.name}</Td>
                                    <Td>{user.role}</Td>
                                    <Td>
                                        <Button style={{ backgroundColor: user.status === "ACTIVE" && "red", marginRight: '2rem' }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                user.status === "ACTIVE"
                                                    ? HandleDeactivate(user.id)
                                                    : HandleActivate(user.id)
                                            }
                                            }
                                        >
                                            {user.status === "ACTIVE" ? "Deactivate" : "Activate"}
                                        </Button>
                                        <SignText onClick={() => HandleResetPassword(user.id)}>Reset Password</SignText>
                                    </Td>
                                </TrTabel>
                            )
                        })}
                    </Tbody>
                </Tabel>
            </TabelWrap>
        </div>
    </>
}

export default ManageUsers;