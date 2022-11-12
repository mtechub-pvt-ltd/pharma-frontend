import React, { useState, useEffect, useRef } from 'react'
import {
    CRow,
    CCol,
    CButton,
    CBreadcrumb,
    CBreadcrumbItem,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CFormInput,
    CFormSelect,
  
} from '@coreui/react'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Typography from '@mui/material/Typography';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteTwoTone, EyeTwoTone, EditTwoTone } from '@ant-design/icons';
import { Table, Button, Input, Space, Badge } from 'antd';
import { Tooltip } from 'antd';
import axios from "axios";
import url from '../url'
function StaffMembers() {
    // Get all 
    const [data, setData] = useState([]);

    const [searchText, setSearchText] = useState('');

    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    // placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const getAllData = () => {
        axios.get(`${url}staff/getAllStaff`)
            .then((response) => {
                const allData = response.data;
                console.log(response.data);
                setData(response.data);
                // setLoading(true)
            })
            .catch(error => console.error(`Error:${error}`));

    }
    useEffect(() => {
        getAllData();

    }, []);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'employeeName',
            key: 'employeeName',
            width: '30%',
            ...getColumnSearchProps('employeeName'),

        },
        {
            title: 'Age',
            dataIndex: 'employeeAge',
            key: 'employeeAge',
            width: '20%',
        },
        {
            title: 'Gender',
            dataIndex: 'employeeGender',
            key: 'employeeGender',
            width: '20%',
            ...getColumnSearchProps('employeeGender'),
        },

        {
            title: 'Roles',
            dataIndex: 'employeeRoles',
            key: 'employeeRoles',
            width: '20%',
            // ...getColumnSearchProps('employeeRoles'),
            render: (_, record) => (
                <Space size="middle">
                    {/* Verify User */}

                    {record.employeeRoles == "Manager" ? <Badge count='Manager' style={{
                        backgroundColor: '#52c41a',
                    }} />
                        : null}
                    {record.employeeRoles == "Staff" ? <Badge count='Staff' style={{
                        backgroundColor: 'orange',
                    }} />
                        : null}
                    {record.employeeRoles == "Delivery Man" ? <Badge count='Delivery Man' style={{
                        backgroundColor: 'blue',
                    }} />
                        : null}
                    {record.employeeRoles == "Sales Man" ? <Badge count='Sales Man' style={{
                        backgroundColor: 'brown',
                    }} />
                        : null}
                </Space>
            ),
        },
        {
            title: 'Action',
            width: '50%',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Update">

                        <h6 className='linkBtn' onClick={() => {
                            EditData(record._id)
                        }}><EditTwoTone /></h6>

                    </Tooltip>
                    <Tooltip title="View">
                        <h6 className='linkBtn' onClick={() => {
                            ViewData(record._id)
                        }}><EyeTwoTone twoToneColor="grey" /></h6>
                    </Tooltip>
                    <Tooltip title="Delete">

                        <h6 className='linkBtn' onClick={() => {
                            deleteData(record._id)
                        }}><DeleteTwoTone twoToneColor="red" />
                        </h6>
                    </Tooltip>
                </Space>
            ),
        },
    ];
    //   Validation 
    const [validated, setValidated] = useState(false)
    // Model Add
    const [visible, setVisible] = useState(false)
    const [employeeCnic, setemployeeCnic] = useState('');
    const [productId, setProductId] = useState('');
    const [employeeName, setemployeeName] = useState('');
    const [employeeAge, setemployeeAge] = useState('');
    const [Salaries, setSalaries] = useState('');
    const [employeeGender, setemployeeGender] = useState('');
    const [employeeDob, setemployeeDob] = useState(new Date());
    const [employeeQualification, setemployeeQualification] = useState('');
    const [employeeRoles, setemployeeRoles] = useState('');
    const [attendenceRecord, setattendenceRecord] = useState('');

    const headers = {
        'Content-Type': 'application/json'
    }
    const submitHandler = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()

        }
        setValidated(true)
        if (employeeCnic === '' || employeeName === '' || employeeAge === '' || Salaries === '' || employeeGender === '' || employeeDob === '' || employeeQualification === '' || employeeRoles === '' || attendenceRecord === '') {
            console.log('fill fieklds')
        } else {
            // POst Request Create Driver
            axios.post(`${url}staff/addStaffMember`, {
                employeeCnic: employeeCnic,
                employeeName: employeeName,
                employeeAge: employeeAge,
                Salaries: Salaries,
                employeeGender: employeeGender,
                employeeDob: employeeDob,
                employeeQualification: employeeQualification,
                employeeRoles: employeeRoles,
                attendenceRecord: attendenceRecord,

            }, { headers }).then(response => {
                console.log(response)
                setVisible(false)
                getAllData();
                setemployeeCnic('');
                setemployeeName('');
                setemployeeAge('');
                setSalaries('');
                setemployeeGender('');
                setemployeeDob('');
                setemployeeQualification('');
                setemployeeRoles('');
                setattendenceRecord('')

            })
                .catch(err => {
                    console.log(err)
                })
        }

    }
    // Delete 
    const deleteDataProduct = () => {
        setVisibleDelete(false)
        axios.delete(`${url}staff/removeStaff`, {
            data: {
                _id: productId
            }
        }, { headers })
            .then(res => {
                console.log(res);
                console.log(res.data);
                getAllData();
            }).catch(err => {
                console.log(err)
            })
    }

    const [visibleDelete, setVisibleDelete] = useState(false)
    const deleteData = (idData) => {
        setVisibleDelete(true)
        setProductId(idData)
    }
    // Update 
    const UpdateProductData = () => {
        setVisibleEdit(false)
        axios.put(`${url}staff/updateStaff`, {
            _id: productIdEdit,
            employeeCnic: employeeCnicEdit,
            employeeName: employeeNameEdit,
            employeeAge: employeeAgeEdit,
            Salaries: SalariesEdit,
            employeeGender: employeeGenderEdit,
            employeeDob: employeeDobEdit,
            employeeQualification: employeeQualificationEdit,
            employeeRoles: employeeRolesEdit,
            attendenceRecord: attendenceRecordEdit

        }, { headers }).then(response => {
            console.log(response);
            getAllData()

        })
            .catch(err => {
                console.log(err)
            })
    }
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [employeeCnicEdit, setemployeeCnicEdit] = useState('');

    const [productIdEdit, setProductIdEdit] = useState('');
    const [employeeNameEdit, setemployeeNameEdit] = useState('');
    const [employeeAgeEdit, setemployeeAgeEdit] = useState('');
    const [SalariesEdit, setSalariesEdit] = useState('');
    const [employeeGenderEdit, setemployeeGenderEdit] = useState('');
    const [employeeDobEdit, setemployeeDobEdit] = useState('');
    const [employeeQualificationEdit, setemployeeQualificationEdit] = useState('');
    const [employeeRolesEdit, setemployeeRolesEdit] = useState('');
    const [attendenceRecordEdit, setattendenceRecordEdit] = useState('');
    const EditData = (idData) => {
        axios.get(`${url}staff/getStaff`, {
            params: {
                _id: idData
            }
        })
            .then((response) => {
                console.log('History')
                const allData = response.data;
                console.log(allData);
                setProductIdEdit(response.data._id)
                setemployeeCnicEdit(response.data.employeeCnic)
                setemployeeNameEdit(response.data.employeeName)
                setemployeeAgeEdit(response.data.employeeAge)
                setSalariesEdit(response.data.Salaries)
                setemployeeGenderEdit(response.data.employeeGender)
                setemployeeDobEdit(response.data.employeeDob)
                setemployeeQualificationEdit(response.data.employeeQualification)
                setemployeeRolesEdit(response.data.employeeRoles)
                setattendenceRecordEdit(response.data.attendenceRecord)
            })
            .catch(error => console.error(`Error:${error}`));
        setVisibleEdit(true)
    }
    // View 
    const [visibleView, setVisibleView] = useState(false)

    const ViewData = (idData) => {
        axios.get(`${url}staff/getStaff`, {
            params: {
                _id: idData
            }
        })
            .then((response) => {
                console.log('History')
                const allData = response.data;
                console.log(allData);
                setProductIdEdit(response.data._id)
                setemployeeCnicEdit(response.data.employeeCnic)
                setemployeeNameEdit(response.data.employeeName)
                setemployeeAgeEdit(response.data.employeeAge)
                setSalariesEdit(response.data.Salaries)
                setemployeeGenderEdit(response.data.employeeGender)
                setemployeeDobEdit(response.data.employeeDob)
                setemployeeQualificationEdit(response.data.employeeQualification)
                setemployeeRolesEdit(response.data.employeeRoles)
                setattendenceRecordEdit(response.data.attendenceRecord)
                setVisibleView(true)
            })
            .catch(error => console.error(`Error:${error}`));
    }

    return (
        <>

            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 1 }} >
                <CCol xs>
                    <CBreadcrumb style={{ marginBottom: '40px' }}>
                        <CBreadcrumbItem href="#">Home</CBreadcrumbItem>
                        <CBreadcrumbItem active>Staff Members</CBreadcrumbItem>
                    </CBreadcrumb>

                </CCol>
            </CRow>
            <CRow xs={{ cols: 2, gutter: 4 }} md={{ cols: 6 }}>
                <CCol xs style={{ flexGrow: 1 }}>
                    <h4>Staff Members</h4>
                </CCol>
                <CCol xs>
                    <CButton style={{ marginTop: '-20px' }} color="primary" onClick={() => setVisible(!visible)}>+ Staff</CButton>
                </CCol>
            </CRow>
            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 12 }}>
                <div className='tableResponsive'>
                    <Table columns={columns} dataSource={data} size='small' bordered/>
                </div>
            </CRow>
            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 1 }}>
                {/* Delete  */}
                <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
                    <CModalHeader onClose={() => setVisibleDelete(false)}>
                        <CModalTitle>Delete Staff</CModalTitle>
                    </CModalHeader>
                    <CModalBody>Are you sure you want to delete this Member!</CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
                            No
                        </CButton>
                        <CButton color="primary" onClick={deleteDataProduct}>Yes</CButton>
                    </CModalFooter>
                </CModal>
                {/* View  */}
                <CModal visible={visibleView} onClose={() => setVisibleView(false)}>
                    <CModalHeader onClose={() => setVisibleView(false)}>
                        <CModalTitle> Staff Details</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        {/* <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
                            <CCol xs>
                                <h6>Name:</h6>
                                <h6>Cnic:</h6>
                                <h6>Age:</h6>
                                <h6>Qualification:</h6>
                                <h6>Roles:</h6>
                                <h6>Salary:</h6>
                                <h6>Gender:</h6>
                                <h6>Dob:</h6>
                                <h6>Attendence Record:</h6>
                                </CCol>
                            <CCol xs>
                                <h6>{employeeNameEdit}</h6>
                                <h6>{employeeCnicEdit}</h6>
                                <h6>{employeeAgeEdit}</h6>
                                <h6>{employeeQualificationEdit}</h6>
                                <h6>{employeeRolesEdit}</h6>
                                <h6>{SalariesEdit}</h6>
                                <h6>{employeeGenderEdit}</h6>
                                <h6>{employeeDobEdit}</h6>
                                <h6>{attendenceRecordEdit}</h6>
                            </CCol>
                        </CRow> */}
                        <CForm
                            noValidate
                            className="row g-3 needs-validation"
                            validated={validated}
                        >
                            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
                                <CCol xs>

                                    <CFormInput
                                        type="text"
                                        id="employeeName"
                                        label="Name"
                                        // placeholder="Enter Name"
                                        aria-describedby="employeeName"
                                        required className='itemPadding'
                                        disabled
                                        value={employeeNameEdit}
                                        onChange={(e) => setemployeeNameEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="employeeCnic"
                                        label="Cnic"
                                        // placeholder="Enter Cnic"
                                        aria-describedby="employeeCnic"
                                        required className='itemPadding'
                                        disabled
                                        value={employeeCnicEdit}
                                        onChange={(e) => setemployeeCnicEdit(e.target.value)
                                        }
                                    /><CFormInput
                                        type="text"
                                        id="employeeAge"
                                        label="Age"
                                        // placeholder="Enter Age"
                                        required className='itemPadding'
                                        disabled
                                        aria-describedby="employeeAge"
                                        value={employeeAgeEdit}
                                        onChange={(e) => setemployeeAgeEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="employeeQualification"
                                        label="Qualification"
                                        required className='itemPadding'
                                        disabled
                                        // placeholder="Enter Qualification"
                                        aria-describedby="employeeQualification"
                                        value={employeeQualificationEdit}
                                        onChange={(e) => setemployeeQualificationEdit(e.target.value)
                                        }
                                    />

                                    <CFormInput
                                        type="text"
                                        id="employeeRoles"
                                        label="Employee Role"
                                        required className='itemPadding'
                                        disabled
                                        // placeholder="Enter Employee Role"
                                        aria-describedby="employeeRoles"
                                        value={employeeRolesEdit}
                                        onChange={(e) => setemployeeRolesEdit(e.target.value)
                                        }
                                    />
                                </CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        id="Salaries"
                                        label="Salary"
                                        required className='itemPadding'
                                        disabled
                                        // placeholder="Enter Salary"
                                        aria-describedby="Salaries"
                                        value={SalariesEdit}
                                        onChange={(e) => setSalariesEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="employeeGender"
                                        label="Gender"
                                        required className='itemPadding'
                                        disabled
                                        // placeholder="Enter Gender"
                                        aria-describedby="employeeGender"
                                        value={employeeGenderEdit}
                                        onChange={(e) => setemployeeGenderEdit(e.target.value)
                                        }
                                    />
                                   


                                    <CFormInput
                                        type="text"
                                        id="employeeDob"
                                        label="Dob"
                                        // placeholder="Enter Date of Birth"
                                        required className='itemPadding'
                                        disabled
                                        aria-describedby="employeeDob"
                                        value={employeeDobEdit}
                                        onChange={(e) => setemployeeDobEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="attendenceRecord"
                                        label="Attendence Record"
                                        // placeholder="Enter Attendence Record"
                                        required className='itemPadding'
                                        disabled
                                        aria-describedby="attendenceRecord"
                                        value={attendenceRecordEdit}
                                        onChange={(e) => setattendenceRecordEdit(e.target.value)
                                        }
                                    />
                                </CCol>
                            </CRow>
                        </CForm>

                    </CModalBody>
                </CModal>
                {/* Edit  */}
                <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
                    <CModalHeader onClose={() => setVisibleEdit(false)}>
                        <CModalTitle>Update Staff Details</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm
                            noValidate
                            className="row g-3 needs-validation"
                            validated={validated}
                        >
                            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
                                <CCol xs>

                                    <CFormInput
                                        type="text"
                                        id="employeeName"
                                        label="Name"
                                        // placeholder="Enter Name"
                                        aria-describedby="employeeName"
                                        required className='itemPadding'
                                        value={employeeNameEdit}
                                        onChange={(e) => setemployeeNameEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="employeeCnic"
                                        label="Cnic"
                                        // placeholder="Enter Cnic"
                                        aria-describedby="employeeCnic"
                                        required className='itemPadding'
                                        value={employeeCnicEdit}
                                        onChange={(e) => setemployeeCnicEdit(e.target.value)
                                        }
                                    /><CFormInput
                                        type="text"
                                        id="employeeAge"
                                        label="Age"
                                        // placeholder="Enter Age"
                                        required className='itemPadding'
                                        aria-describedby="employeeAge"
                                        value={employeeAgeEdit}
                                        onChange={(e) => setemployeeAgeEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="employeeQualification"
                                        label="Qualification"
                                        required className='itemPadding'
                                        // placeholder="Enter Qualification"
                                        aria-describedby="employeeQualification"
                                        value={employeeQualificationEdit}
                                        onChange={(e) => setemployeeQualificationEdit(e.target.value)
                                        }
                                    />
                                    <CFormSelect value={employeeRolesEdit}
                                        label="Employee Role"
                                        onChange={(e) => setemployeeRolesEdit(e.target.value)
                                        } required className='itemPadding' aria-label="Default select example">
                                        <option value="">Select Role</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Staff">Staff</option>
                                        <option value="Delivery Man" >Delivery Man</option>
                                        <option value="Sales Man" >Sales Man</option>

                                    </CFormSelect>
                                </CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        id="Salaries"
                                        label="Salary"
                                        required className='itemPadding'
                                        // placeholder="Enter Salary"
                                        aria-describedby="Salaries"
                                        value={SalariesEdit}
                                        onChange={(e) => setSalariesEdit(e.target.value)
                                        }
                                    />
                                    <CFormSelect value={employeeGenderEdit}
                                        label="Gender"
                                        onChange={(e) => setemployeeGenderEdit(e.target.value)
                                        } required className='itemPadding' aria-label="Default select example">
                                        <option disabled>Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other" >Other</option>
                                    </CFormSelect>
                                    {/* <CFormInput
                                        type="text"
                                        id="employeeGender"
                                        label="Gender"
                                        required className='itemPadding'
                                        // placeholder="Enter Gender"
                                        aria-describedby="employeeGender"
                                        value={employeeGenderEdit}
                                        onChange={(e) => setemployeeGenderEdit(e.target.value)
                                        }
                                    /> */}
                                    <CFormInput
                                        type="text"
                                        id="employeeDob"
                                        label="Dob"
                                        // placeholder="Enter Date of Birth"
                                        required className='itemPadding'
                                        aria-describedby="employeeDob"
                                        value={employeeDobEdit}
                                        onChange={(e) => setemployeeDobEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="attendenceRecord"
                                        label="Attendence Record"
                                        // placeholder="Enter Attendence Record"
                                        required className='itemPadding'
                                        aria-describedby="attendenceRecord"
                                        value={attendenceRecordEdit}
                                        onChange={(e) => setattendenceRecordEdit(e.target.value)
                                        }
                                    />
                                </CCol>
                            </CRow>
                        </CForm>
                    </CModalBody>
                    <CModalFooter>
                        <div className="d-grid gap-2 col-12 mx-auto">
                            <CButton color="primary" onClick={UpdateProductData}>Save</CButton>
                        </div>

                    </CModalFooter>
                </CModal>
                {/* Add  */}
                <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                        <CModalTitle>Add Staff Member</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm
                            noValidate
                            className="row g-3 needs-validation"
                            validated={validated}
                        >
                            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
                                <CCol xs>

                                    <CFormInput
                                        type="text"
                                        id="employeeName"
                                        label="Name"
                                        // placeholder="Enter Name"
                                        aria-describedby="employeeName"
                                        required className='itemPadding'
                                        value={employeeName}
                                        onChange={(e) => setemployeeName(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="employeeCnic"
                                        label="Cnic"
                                        // placeholder="Enter Cnic"
                                        aria-describedby="employeeCnic"
                                        required className='itemPadding'
                                        value={employeeCnic}
                                        onChange={(e) => setemployeeCnic(e.target.value)
                                        }
                                    /><CFormInput
                                        type="text"
                                        id="employeeAge"
                                        label="Age"
                                        // placeholder="Enter Age"
                                        required className='itemPadding'
                                        aria-describedby="employeeAge"
                                        value={employeeAge}
                                        onChange={(e) => setemployeeAge(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="employeeQualification"
                                        label="Qualification"
                                        required className='itemPadding'
                                        // placeholder="Enter Qualification"
                                        aria-describedby="employeeQualification"
                                        value={employeeQualification}
                                        onChange={(e) => setemployeeQualification(e.target.value)
                                        }
                                    />

                                    {/* <CFormInput
                                        type="text"
                                        id="employeeRoles"
                                        label="Employee Role"
                                        required className='itemPadding'
                                        // placeholder="Enter Employee Role"
                                        aria-describedby="employeeRoles"
                                        value={employeeRoles}
                                        onChange={(e) => setemployeeRoles(e.target.value)
                                        }
                                    /> */}
                                    <CFormSelect value={employeeRoles}
                                        label="Employee Role"
                                        onChange={(e) => setemployeeRoles(e.target.value)
                                        } required className='itemPadding' aria-label="Default select example">
                                        <option value="">Select Role</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Staff">Staff</option>
                                        <option value="Delivery Man" >Delivery Man</option>
                                        <option value="Sales Man" >Sales Man</option>

                                    </CFormSelect>
                                </CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        id="Salaries"
                                        label="Salary "
                                        required className='itemPadding'
                                        // placeholder="Enter Salary"
                                        aria-describedby="Salaries"
                                        value={Salaries}
                                        onChange={(e) => setSalaries(e.target.value)
                                        }
                                    />
                                    <CFormSelect value={employeeGender}
                                        label="Gender"
                                        onChange={(e) => setemployeeGender(e.target.value)
                                        } required className='itemPadding' aria-label="Default select example">
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other" >Other</option>
                                    </CFormSelect>
                                    {/* <CFormInput
                                        type="text"
                                        id="employeeGender"
                                        label="Gender"
                                        required className='itemPadding'
                                        // placeholder="Enter Gender"
                                        aria-describedby="employeeGender"
                                        value={employeeGender}
                                        onChange={(e) => setemployeeGender(e.target.value)
                                        }
                                    /> */}
                                    <Typography variant="h6" style={{fontSize:'16px'}}>Select Dob</Typography>
                                        <DatePicker className='itemPadding' wrapperClassName="date-picker"  selected={employeeDob} onChange={(date) => setemployeeDob(date)} />

                                    {/* <CFormInput
                                        type="text"
                                        id="employeeDob"
                                        label="Dob"
                                        // placeholder="Enter Date of Birth"
                                        required className='itemPadding'
                                        aria-describedby="employeeDob"
                                        value={employeeDob}
                                        onChange={(e) => setemployeeDob(e.target.value)
                                        }
                                    /> */}
                                    <CFormInput
                                        type="text"
                                        id="attendenceRecord"
                                        label="Attendence Record"
                                        // placeholder="Enter Attendence Record"
                                        required className='itemPadding'
                                        aria-describedby="attendenceRecord"
                                        value={attendenceRecord}
                                        onChange={(e) => setattendenceRecord(e.target.value)
                                        }
                                    />
                                </CCol>
                            </CRow>
                        </CForm>
                    </CModalBody>
                    <CModalFooter>
                        <div className="d-grid gap-2 col-12 mx-auto">
                            <CButton color="primary" onClick={submitHandler}>Save</CButton>
                        </div>

                    </CModalFooter>
                </CModal>
            </CRow>
        </>
    )
}

export default StaffMembers