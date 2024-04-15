import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDashboard from './UserDashboard';
import { useLocation } from 'react-router-dom';

function SubmisstionT() {
    const { state } = useLocation();
    const { userD } = state || {};
    const navigate = useNavigate();

    function printpage() {
        window.print();
    }

    console.log(userD);

    const theoryArray = new Array(5).fill(' ');
    userD.subjects.theory.forEach((subject, index) => {
        if (index < 5) {
            theoryArray[index] = subject.title;
        }
    });

    const practicalArray = new Array(5).fill(' ');
    userD.subjects.practical.forEach((subject, index) => {
        if (index < 5) {
            practicalArray[index] = subject.title;
        }
    });

    const ut1marks = new Array(5).fill(' ');
    theoryArray.forEach((subject, index) => {
        ut1marks[index] = userD.unitTests[subject]?.ut1 || ' ';
    });

    console.log(ut1marks);

    const ut2marks = new Array(5).fill(' ');
    theoryArray.forEach((subject, index) => {
        ut2marks[index] = userD.unitTests[subject]?.ut2 || ' ';
    });
    //const marks = userD.unitTests.CC.ut1;

    const ut1sign = Array.from({ length: 5 }, () => ' ');
    theoryArray.forEach((subject, index) => {
        ut1sign[index] = userD.unitTests[subject]?.ut1Alternate !== undefined ? userD.unitTests[subject].ut1Alternate.toString() : ' ';
    });
    
    const ut2sign = Array.from({ length: 5 }, () => ' ');
    theoryArray.forEach((subject, index) => {
        ut2sign[index] = userD.unitTests[subject]?.ut2Alternate !== undefined ? userD.unitTests[subject].ut2Alternate.toString() : ' ';
    });
    
    const practicalsign = Array.from({ length: 5 }, () => ' ');
    practicalArray.forEach((subject, index) => {
        practicalsign[index] = userD.assignments[subject]?.allCompleted !== undefined ? userD.assignments[subject].allCompleted.toString() : ' ';
    });
    

    console.log(ut2marks);
    console.log(theoryArray);
    console.log(practicalArray);
    console.log(ut1sign);
    console.log(ut2sign);
    console.log(practicalsign);
    return (
        <div>
            <div className="flex items-center justify-center ">
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta httpEquiv="Content-Style-Type" content="text/css" />
                <meta name="generator" content="Aspose.Words for .NET 24.2.0" />
                <title />
                <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n        body {\n            font-family: 'Times New Roman';\n            font-size: 12pt\n        }\n\n        p {\n            margin: 0pt\n        }\n\n        table {\n            margin-top: 0pt;\n            margin-bottom: 0pt\n        }\n    " }} />
                <div>
                    <table cellSpacing={0} cellPadding={0} style={{ AwBorderInsideh: '0.5pt single #000000', AwBorderInsidev: '0.5pt single #000000', borderCollapse: 'collapse' }}>
                        <tbody><tr style={{ height: '12.1pt', AwHeightRule: 'exactly' }}>
                            <td colSpan={13} style={{ width: '221.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '106.22pt', paddingLeft: '119.02pt', verticalAlign: 'middle', backgroundColor: '#000000', AwBorder: '0.5pt single' }}>
                                <p style={{ textAlign: 'justify', lineHeight: '11.15pt' }}><span style={{ fontSize: '10pt', fontWeight: 'bold', letterSpacing: '0.05pt', color: '#ffffff', backgroundColor: '#000000' }}>SCTR’s</span><span style={{ fontSize: '10pt', fontWeight: 'bold', color: '#ffffff', backgroundColor: '#000000' }}>
                                </span><span style={{ fontSize: '10pt', fontWeight: 'bold', letterSpacing: '0.05pt', color: '#ffffff', backgroundColor: '#000000' }}>Pune</span><span style={{ fontSize: '10pt', fontWeight: 'bold', color: '#ffffff', backgroundColor: '#000000' }}> Institute
                                    of </span><span style={{ fontSize: '10pt', fontWeight: 'bold', letterSpacing: '0.05pt', color: '#ffffff', backgroundColor: '#000000' }}>Computer</span><span style={{ fontSize: '10pt', fontWeight: 'bold', color: '#ffffff', backgroundColor: '#000000' }}>
                                    </span><span style={{ fontSize: '10pt', fontWeight: 'bold', letterSpacing: '0.05pt', color: '#ffffff', backgroundColor: '#000000' }}>Technology</span><span style={{ fontSize: '10pt', fontWeight: 'bold', color: '#ffffff', backgroundColor: '#000000' }}>
                                    </span><span style={{ fontSize: '10pt', fontWeight: 'bold', letterSpacing: '0.4pt', color: '#ffffff', backgroundColor: '#000000', AwImport: 'spaces' }}>&nbsp;</span>
                                </p>
                            </td>
                        </tr>
                            <tr style={{ height: '17.15pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={13} style={{ width: '170.1pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '132.57pt', paddingLeft: '143.98pt', verticalAlign: 'top', backgroundColor: '#000000', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.75pt', textAlign: 'justify', lineHeight: '11.15pt' }}><span style={{ fontSize: '10pt', fontWeight: 'bold', letterSpacing: '0.05pt', color: '#ffffff', backgroundColor: '#000000' }}>Department</span><span style={{ fontSize: '10pt', fontWeight: 'bold', color: '#ffffff', backgroundColor: '#000000' }}>
                                    </span><span style={{ fontSize: '10pt', fontWeight: 'bold', letterSpacing: '0.1pt', color: '#ffffff', backgroundColor: '#000000' }}>of</span><span style={{ fontSize: '10pt', fontWeight: 'bold', color: '#ffffff', backgroundColor: '#000000' }}>
                                            Information Technology </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '18.25pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={13} style={{ width: '117.3pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '163.18pt', paddingLeft: '166.18pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '15.85pt' }}><span style={{ fontSize: '14.5pt', fontWeight: 'bold' }}>Submission Ticket</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '9.95pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={13} style={{ width: '207pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '234.78pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Sem :- I </span><span style={{ fontSize: '8.5pt', letterSpacing: '98.15pt', AwImport: 'spaces' }}>&nbsp;</span><span style={{ fontSize: '8.5pt' }}>A. Y. :- 2023 – 2024 </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '10.1pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={2} style={{ width: '34.65pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '6.48pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', fontWeight: 'bold', color: '#ff0000' }}>-Note :-</span><span style={{ fontSize: '8.5pt', fontWeight: 'bold' }}> </span></p>
                                </td>
                                <td colSpan={11} style={{ width: '158.25pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '228.92pt', paddingLeft: '12.72pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', fontWeight: 'bold', color: '#ff0000' }}>To be submitted to Class
                                        Coordinator/TG</span><span style={{ fontSize: '8.5pt', fontWeight: 'bold' }}> </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '9.95pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={2} style={{ width: '46pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td colSpan={11} style={{ width: '399.9pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '9.9pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={13} style={{ width: '93.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '348.38pt', paddingLeft: '4.88pt', verticalAlign: 'middle', backgroundColor: '#000000', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', fontWeight: 'bold', color: '#ffffff', backgroundColor: '#000000' }}>1.
                                        Students Information </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '16pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '34.2pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '88.92pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.65pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Roll No </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.65pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={8} style={{ width: '273.75pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center', }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{userD.rollNo}</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '15.7pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '27.45pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '95.68pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.35pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Name </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.35pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={8} style={{ width: '273.75pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center', }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{userD.name}</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '15.7pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '40.65pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '82.48pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Class/Div </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={8} style={{ width: '273.75pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center', }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{userD.class}</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '15.6pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '44.15pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '78.97pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.35pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Mobile No </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.35pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={8} style={{ width: '273.75pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center', }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{userD.mobile}</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '15.7pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '27.5pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '95.62pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Email </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={8} style={{ width: '273.75pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center', }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{userD.email}</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '15.5pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '35.7pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '87.42pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.35pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>ABC ID </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.35pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={8} style={{ width: '273.75pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center', }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{userD.ABCID}</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '10.15pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={13} style={{ width: '147.25pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '294.52pt', paddingLeft: '4.88pt', verticalAlign: 'middle', backgroundColor: '#000000', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', fontWeight: 'bold', color: '#ffffff', backgroundColor: '#000000' }}>2.
                                        Students Average Attendance Details </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '13.4pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '61.65pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '61.48pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.7pt', textAlign: 'justify', lineHeight: '8.35pt' }}><span style={{ fontSize: '7.5pt' }}>Name of Lab Asst </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.65pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={8} style={{ width: '273.75pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '8.5pt', color: '#a5a5a5' }}><span style={{ AwImport: 'ignore' }}>Rane Madam</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '13.1pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '64.65pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '58.48pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.4pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Avg. Attendance </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.4pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={8} style={{ width: '273.75pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center', }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{userD.attendance}</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '12.85pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '55.22pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '72.78pt', verticalAlign: 'top', AwBorder: '0.5pt single', AwPaddingLeft: '0.2pt' }}>
                                    <p style={{ marginTop: '0.35pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '7.5pt', AwImport: 'spaces' }}>&nbsp;</span><span style={{ fontSize: '7.5pt' }}>Lab
                                        Asst.</span><span style={{ fontSize: '8.5pt' }}> Sign </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.35pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={8} style={{ width: '273.75pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '10.15pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={13} style={{ width: '87.1pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '354.68pt', paddingLeft: '4.88pt', verticalAlign: 'middle', backgroundColor: '#000000', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', fontWeight: 'bold', color: '#ffffff', backgroundColor: '#000000' }}>3. Mentor
                                        Record File </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '13.25pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '63.6pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '59.52pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.65pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Name </span><span style={{ fontSize: '8.5pt', letterSpacing: '0.05pt' }}>of</span><span style={{ fontSize: '8.5pt' }}>
                                        Mentor </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.65pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={8} style={{ width: '273.75pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '17.75pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '106.5pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '16.62pt', paddingLeft: '4.88pt', verticalAlign: 'middle', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', lineHeight: '8.6pt' }}><span style={{ fontSize: '7.5pt' }}>Documents Submitted
                                        (Extra-Co- Curricular, </span><span style={{ fontSize: '7.5pt', fontWeight: 'bold' }}>Internship</span><span style={{ fontSize: '7.5pt' }}>)
                                        </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={8} style={{ width: '273.75pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '11.5pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '66.7pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '56.42pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Mentor Signature </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={8} style={{ width: '273.75pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '9.7pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={13} style={{ width: '352.35pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '89.42pt', paddingLeft: '4.88pt', verticalAlign: 'middle', backgroundColor: '#000000', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', fontWeight: 'bold', color: '#ffffff', backgroundColor: '#000000' }}>4.
                                        Student Achievement File (Certificates </span><span style={{ fontSize: '8.5pt', fontWeight: 'bold', letterSpacing: '0.05pt', color: '#ffffff', backgroundColor: '#000000' }}>of</span><span style={{ fontSize: '8.5pt', fontWeight: 'bold', color: '#ffffff', backgroundColor: '#000000' }}> Extra
                                            and Co-Curricular Activities to be submitted) </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '10.45pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={13} style={{ width: '446.65pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', backgroundColor: '#000000', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ color: '#ffffff', AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '15.95pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '120.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '2.72pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.25pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Student Achievement Committee </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.25pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={8} style={{ width: '78pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '190.72pt', paddingLeft: '5.03pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.25pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', color: '#a5a5a5' }}>Sheetal Patil Madam </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '15.95pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '41.9pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '81.22pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Signature</span><span style={{ fontSize: '8.5pt', AwImport: 'spaces' }}>&nbsp; </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={8} style={{ width: '273.75pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '10pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={13} style={{ width: '89.15pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '352.62pt', paddingLeft: '4.88pt', verticalAlign: 'middle', backgroundColor: '#000000', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', color: '#ffffff', backgroundColor: '#000000' }}>5. Unit Test Record File
                                    </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '10.25pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '45.1pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '50.08pt', paddingLeft: '32.83pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Unit Test 1 </span></p>
                                </td>
                                <td colSpan={4} style={{ width: '45.2pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '66.28pt', paddingLeft: '32.98pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Unit Test 2 </span></p>
                                </td>
                                <td colSpan={5} style={{ width: '93.55pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '46.12pt', paddingLeft: '32.98pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Unit Test 3/ Assignments </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '17.9pt', AwHeightRule: 'exactly' }}>
                                <td style={{ width: '29.8pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '7.62pt', paddingLeft: '4.88pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center'}}>
                                    <p style={{ marginTop: '0.05pt', lineHeight: '8.6pt' }}><span style={{ fontSize: '8pt' }}>Course Name</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '28.9pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '8.52pt', paddingLeft: '4.92pt', verticalAlign: 'top', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Marks </span></p>
                                </td>
                                <td style={{ width: '33.78pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingLeft: '8.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '8.35pt' }}><span style={{ fontSize: '7.5pt' }}>Staff Sign </span></p>
                                </td>
                                <td style={{ width: '29.8pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '8.48pt', paddingLeft: '5.12pt', verticalAlign: 'middle', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ lineHeight: '8.6pt' }}><span style={{ fontSize: '8pt' }}>Course Name</span></p>
                                </td>
                                <td style={{ width: '28.9pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '15.73pt', paddingLeft: '5.03pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Marks </span></p>
                                </td>
                                <td colSpan={2} style={{ width: '37.15pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '7.82pt', paddingLeft: '4.92pt', verticalAlign: 'top', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '8.35pt' }}><span style={{ fontSize: '7.5pt' }}>Staff Sign </span></p>
                                </td>
                                <td colSpan={2} style={{ width: '48.65pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '1.23pt', paddingLeft: '4.92pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.65pt', textAlign: 'justify', lineHeight: '8.9pt' }}><span style={{ fontSize: '8pt' }}>Course Name</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '26.75pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '27.22pt', paddingLeft: '4.92pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.7pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Marks</span></p>
                                </td>
                                <td style={{ width: '37.2pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '15.48pt', paddingLeft: '4.78pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '8.35pt' }}><span style={{ fontSize: '7.5pt' }}>Staff Sign </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '18.5pt', AwHeightRule: 'exactly' }}>
                                <td style={{ width: '26.7pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.58pt', paddingLeft: '5.03pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{theoryArray[0]} </span></p>
                                </td>
                                <td colSpan={2} style={{
                                    width: '42.35pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single',
                                    textAlign: 'center'
                                }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut1marks[0]}</span></p>
                                </td>
                                <td style={{ width: '41.9pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut1sign[0]}</span></p>
                                </td>
                                <td style={{ width: '26.75pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '11.52pt', paddingLeft: '5.12pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center', }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{theoryArray[0]} </span></p>
                                </td>
                                <td style={{ width: '49.65pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut2marks[0]}</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '49.9pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut2sign[0]}</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '26.75pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '22.92pt', paddingLeft: '5.12pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{theoryArray[0]} </span></p>
                                </td>
                                <td colSpan={2} style={{ width: '58.9pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td style={{ width: '57.45pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '18.35pt', AwHeightRule: 'exactly' }}>
                                <td style={{ width: '26.7pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.58pt', paddingLeft: '5.03pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{theoryArray[1]} </span></p>
                                </td>
                                <td colSpan={2} style={{ width: '42.35pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut1marks[1]}</span></p>
                                </td>
                                <td style={{ width: '41.9pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut1sign[1]}</span></p>
                                </td>
                                <td style={{ width: '26.75pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '11.52pt', paddingLeft: '5.12pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{theoryArray[1]} </span></p>
                                </td>
                                <td style={{ width: '49.65pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut2marks[1]}</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '49.9pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut2sign[1]}</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '26.75pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '22.92pt', paddingLeft: '5.12pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{theoryArray[1]} </span></p>
                                </td>
                                <td colSpan={2} style={{ width: '58.9pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td style={{ width: '57.45pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '18.35pt', AwHeightRule: 'exactly' }}>
                                <td style={{ width: '26.7pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.58pt', paddingLeft: '5.03pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{theoryArray[2]} </span></p>
                                </td>
                                <td colSpan={2} style={{ width: '42.35pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut1marks[2]}</span></p>
                                </td>
                                <td style={{ width: '41.9pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut1sign[2]}</span></p>
                                </td>
                                <td style={{ width: '26.75pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '11.52pt', paddingLeft: '5.12pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{theoryArray[2]} </span></p>
                                </td>
                                <td style={{ width: '49.65pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut2marks[2]}</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '49.9pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut2sign[2]}</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '26.75pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '22.92pt', paddingLeft: '5.12pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{theoryArray[2]}</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '58.9pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td style={{ width: '57.45pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '18.35pt', AwHeightRule: 'exactly' }}>
                                <td style={{ width: '26.7pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.58pt', paddingLeft: '5.03pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.6pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{theoryArray[3]}</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '42.35pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut1marks[3]}</span></p>
                                </td>
                                <td style={{ width: '41.9pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut1sign[3]}</span></p>
                                </td>
                                <td style={{ width: '26.75pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '11.52pt', paddingLeft: '5.12pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.6pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{theoryArray[3]} </span></p>
                                </td>
                                <td style={{ width: '49.65pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut2marks[3]}</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '49.9pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut2sign[3]}</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '26.75pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '22.92pt', paddingLeft: '5.12pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.6pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{theoryArray[3]} </span></p>
                                </td>
                                <td colSpan={2} style={{ width: '58.9pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td style={{ width: '57.45pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '18.1pt', AwHeightRule: 'exactly' }}>
                                <td style={{ width: '26.7pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.58pt', paddingLeft: '5.03pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{theoryArray[4]}</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '42.35pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut1marks[4]}</span></p>
                                </td>
                                <td style={{ width: '41.9pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut1sign[4]}</span></p>
                                </td>
                                <td style={{ width: '26.75pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '11.52pt', paddingLeft: '5.12pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{theoryArray[4]} </span></p>
                                </td>
                                <td style={{ width: '49.65pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut1marks[4]}</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '49.9pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{ut2sign[4]}</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '26.75pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '22.92pt', paddingLeft: '5.12pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{theoryArray[4]}</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '58.9pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td style={{ width: '57.45pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '10.2pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={13} style={{ width: '129.8pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '311.98pt', paddingLeft: '4.88pt', verticalAlign: 'middle', backgroundColor: '#000000', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', color: '#ffffff', backgroundColor: '#000000' }}>6. Lab/Tutorial Submissions
                                        Record </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '10.45pt', AwHeightRule: 'exactly' }}>
                                <td style={{ width: '42.3pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td colSpan={3} style={{ width: '56.45pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '23.58pt', paddingLeft: '4.92pt', verticalAlign: 'top', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', fontWeight: 'bold' }}>Course Name </span></p>
                                </td>
                                <td style={{ width: '43.4pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '62.78pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingLeft: '5.03pt', verticalAlign: 'middle', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', color: '#a5a5a5' }}>Lab Teacher Sign </span></p>
                                </td>
                                <td colSpan={2} style={{ width: '67.75pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '56.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '6.38pt', paddingLeft: '5.03pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', fontWeight: 'bold' }}>Course Name</span><span style={{ fontSize: '8.5pt' }}>
                                    </span></p>
                                </td>
                                <td colSpan={2} style={{ width: '52.25pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.82pt', paddingLeft: '5.03pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', color: '#a5a5a5' }}>Teacher Sign </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '16.2pt', AwHeightRule: 'exactly' }}>
                                <td style={{ width: '26.7pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.58pt', paddingLeft: '5.03pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{practicalArray[0]}</span></p>
                                </td>
                                <td colSpan={3} style={{ width: '84.95pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={2} style={{ width: '67.8pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{practicalsign[0] }</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '26.7pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '16.92pt', paddingLeft: '24.12pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{practicalArray[4]} </span></p>
                                </td>
                                <td colSpan={2} style={{ width: '67.8pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '68.1pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{practicalsign[4]}</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '16.3pt', AwHeightRule: 'exactly' }}>
                                <td style={{ width: '26.7pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.58pt', paddingLeft: '5.03pt', verticalAlign: 'top', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{practicalArray[1]}</span></p>
                                </td>
                                <td colSpan={3} style={{ width: '84.95pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={2} style={{ width: '67.8pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{practicalsign[1]}</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '67.42pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingLeft: '0.32pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.6pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', color: '#a5a5a5' }}>Stationary item box</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '67.8pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '68.1pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '16.1pt', AwHeightRule: 'exactly' }}>
                                <td style={{ width: '26.7pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.58pt', paddingLeft: '5.03pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{practicalArray[2]}</span></p>
                                </td>
                                <td colSpan={3} style={{ width: '84.95pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={2} style={{ width: '67.8pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{practicalsign[2]}</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '48.9pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '6.98pt', paddingLeft: '11.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ marginTop: '0.6pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', color: '#a5a5a5' }}>Wallet/Purse</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '67.8pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '68.1pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '16pt', AwHeightRule: 'exactly' }}>
                                <td style={{ width: '26.7pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.58pt', paddingLeft: '5.03pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>{practicalArray[3]} </span></p>
                                </td>
                                <td colSpan={3} style={{ width: '84.95pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={2} style={{ width: '67.8pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>{practicalsign[3]}</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '50.1pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '6.38pt', paddingLeft: '11.28pt', verticalAlign: 'top', AwBorder: '0.5pt single', textAlign: 'center'}}>
                                    <p style={{ marginTop: '0.6pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', color: '#a5a5a5' }}>Paper cutting</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '67.8pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td colSpan={2} style={{ width: '68.1pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' , textAlign: 'center'}}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '10.4pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={13} style={{ width: '172.05pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '269.73pt', paddingLeft: '4.88pt', verticalAlign: 'middle', backgroundColor: '#000000', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', color: '#ffffff', backgroundColor: '#000000' }}>7. Seminar (Only for TE
                                        students) As applicable </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '15.8pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '33.2pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '89.92pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.65pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Review </span></p>
                                </td>
                                <td colSpan={9} style={{ width: '84.95pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '227.92pt', paddingLeft: '5.03pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.65pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', color: '#a5a5a5' }}>Sign </span><span style={{ fontSize: '8.5pt', letterSpacing: '0.05pt', color: '#a5a5a5' }}>of</span><span style={{ fontSize: '8.5pt', color: '#a5a5a5' }}> Seminar Guide</span><span style={{ fontSize: '8.5pt' }}>
                                    </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '14pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '60.8pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '62.32pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Seminar Report </span></p>
                                </td>
                                <td colSpan={9} style={{ width: '317.9pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '10.2pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={13} style={{ width: '133.2pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '308.58pt', paddingLeft: '4.88pt', verticalAlign: 'middle', backgroundColor: '#000000', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', color: '#ffffff', backgroundColor: '#000000' }}>8. BE Project (Only for BE
                                        Students) </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '13.6pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '49.3pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '73.82pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.65pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>All Reviews </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.65pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={8} style={{ width: '80.65pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '188.08pt', paddingLeft: '5.03pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.65pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', color: '#a5a5a5' }}>Sign </span><span style={{ fontSize: '8.5pt', letterSpacing: '0.05pt', color: '#a5a5a5' }}>of</span><span style={{ fontSize: '8.5pt', color: '#a5a5a5' }}> Project Guide</span><span style={{ fontSize: '8.5pt' }}>
                                    </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '10.85pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={13} style={{ width: '49.55pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '392.22pt', paddingLeft: '4.88pt', verticalAlign: 'top', backgroundColor: '#000000', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.1pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', color: '#ffffff', backgroundColor: '#000000' }}>9.</span><span style={{ fontSize: '8.5pt', color: '#ffffff', backgroundColor: '#000000', AwImport: 'spaces' }}>&nbsp;
                                    </span><span style={{ fontSize: '8.5pt', color: '#ffffff', backgroundColor: '#000000' }}>Feedback </span>
                                    </p>
                                </td>
                            </tr>
                            <tr style={{ height: '10.15pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={6} style={{ width: '222.8pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', backgroundColor: '#ffffff', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td colSpan={4} style={{ width: '72.35pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '28.08pt', paddingLeft: '5.03pt', verticalAlign: 'middle', backgroundColor: '#ffffff', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Course Exit survey </span></p>
                                </td>
                                <td colSpan={3} style={{ width: '39.7pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '72.18pt', paddingLeft: '5.03pt', verticalAlign: 'middle', backgroundColor: '#ffffff', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.05pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Feedback </span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '14.1pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '112.65pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.48pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.9pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Name Of Class Coordina</span><span style={{ fontSize: '7.5pt' }}>tor/TG
                                    </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.9pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={8} style={{ width: '273.75pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '13.75pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '99.65pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '23.48pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Class Coordinator Sign/TG </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '0.5pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td style={{ width: '49.65pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td colSpan={4} style={{ width: '105.45pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                                <td colSpan={3} style={{ width: '117.1pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '11.65pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={13} style={{ width: '94.17pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '352.48pt', verticalAlign: 'top', backgroundColor: '#000000', AwBorder: '0.5pt single', AwPaddingLeft: '0.2pt' }}>
                                    <p style={{ marginTop: '0.4pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt', color: '#ffffff', backgroundColor: '#000000' }}>10. Class Coordinator
                                        File</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '15.65pt', AwHeightRule: 'exactly' }}>
                                <td colSpan={4} style={{ width: '85.9pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '37.22pt', paddingLeft: '4.88pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '2.35pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>Class Coordinator Sign </span></p>
                                </td>
                                <td style={{ width: '12.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '10.88pt', paddingLeft: '20.12pt', verticalAlign: 'top', AwBorder: '0.5pt single' }}>
                                    <p style={{ marginTop: '2.35pt', textAlign: 'justify', lineHeight: '9.4pt' }}><span style={{ fontSize: '8.5pt' }}>:-
                                    </span></p>
                                </td>
                                <td colSpan={8} style={{ width: '273.75pt', borderStyle: 'solid', borderWidth: '0.75pt', verticalAlign: 'middle', AwBorder: '0.5pt single' }}>
                                    <p style={{ fontSize: '12pt' }}><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                                </td>
                            </tr>
                            <tr style={{ height: '0pt' }}>
                                <td style={{ width: '43.05pt' }} />
                                <td style={{ width: '3.7pt' }} />
                                <td style={{ width: '39.4pt' }} />
                                <td style={{ width: '42.65pt' }} />
                                <td style={{ width: '44.15pt' }} />
                                <td style={{ width: '50.6pt' }} />
                                <td style={{ width: '17.95pt' }} />
                                <td style={{ width: '32.7pt' }} />
                                <td style={{ width: '35.8pt' }} />
                                <td style={{ width: '19.75pt' }} />
                                <td style={{ width: '48.8pt' }} />
                                <td style={{ width: '10.85pt' }} />
                                <td style={{ width: '58.2pt' }} />
                            </tr>
                        </tbody></table>
                    <p><span style={{ AwImport: 'ignore' }}>&nbsp;</span></p>
                </div>
            </div>

            <div className="flex justify-center mt-8 mb-8 print:hidden">
    <button
        className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 print:hidden"
        onClick={() => navigate('/UserPage')}
    >
        Go back
    </button>
    <button
        className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md print:hidden"
        onClick={() => printpage()}
    >
        Click to Print
    </button>
</div>



        </div>
    );
}

export default SubmisstionT;
