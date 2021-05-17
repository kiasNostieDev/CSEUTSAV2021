import React, { useState } from 'react'
import './Table.css'
import firebase from 'firebase/app'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import fbref from '../Firebase'

export default function Tabler(props) {
    let currentContest = props.match.params.slug
    const [listofs, setListOfs] = useState([])
    const [isLoadingPar, setIsLoadingPar] = useState('1')
    
    if (isLoadingPar === '1') {
        let listOfsInit = []
        firebase.database().ref(currentContest+"/").once('value', snap => {
            let cont1 = {
                name: '',
                year: '',
                sec: '',
                phone: '',
                mail: '',
                team: '',
            }
            snap.forEach(item => {
                cont1.name = item.val().Name
                cont1.year = item.val().Year
                cont1.sec = item.val().Sec
                cont1.phone = item.val().Phone
                cont1.mail = item.val().Mail
                cont1.team = item.val().Teamname
                if(cont1.team === undefined || cont1.team === 'Indie')cont1.team = '' 
                listOfsInit.push(cont1)
                cont1 = {
                    name: '',
                    year: '',
                    sec: '',
                    phone: '',
                    mail: '',
                    team: ''
                }
            })
            setListOfs(listOfsInit)
            console.log(listOfsInit)
        })
        setIsLoadingPar('0')
    }

    function Tabler1() {
        return (
            <div>
                <Table style={{width: 'fit-content'}}>
                    <TableContainer component={Paper}>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' style={{fontFamily: 'Mulish', fontWeight: 'bolder'}}>Name</TableCell>
                                <TableCell align='center' style={{fontFamily: 'Mulish', fontWeight: 'bolder'}}>Year</TableCell>
                                <TableCell align='center' style={{fontFamily: 'Mulish', fontWeight: 'bolder'}}>Section</TableCell>
                                <TableCell align='center' style={{fontFamily: 'Mulish', fontWeight: 'bolder'}}>Phone</TableCell>
                                <TableCell align='center' style={{fontFamily: 'Mulish', fontWeight: 'bolder'}}>Mail</TableCell>
                                <TableCell align='center' style={{fontFamily: 'Mulish', fontWeight: 'bolder'}}>Team/Individual</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{
                            listofs.map(item => {
                                return (
                                    <TableRow>
                                        <TableCell align='left' style={{fontFamily: 'Mulish'}}>{item.name}</TableCell>
                                        <TableCell align='center' style={{fontFamily: 'Mulish'}}>{item.year}</TableCell>
                                        <TableCell align='center' style={{fontFamily: 'Mulish'}}>{item.sec}</TableCell>
                                        <TableCell align='center' style={{fontFamily: 'Mulish'}}>{item.phone}</TableCell>
                                        <TableCell align='center' style={{fontFamily: 'Mulish'}}>{item.mail}</TableCell>
                                        <TableCell align='center' style={{fontFamily: 'Mulish'}}>{item.team}</TableCell>
                                    </TableRow>
                                )
                            })
                        }</TableBody>
                    </TableContainer>
                </Table>
            </div>
        )
    }

    function Loader() {
        if (isLoadingPar === '1') {
            return <div>Loading</div>
        }
        else return <Tabler1 />
    }

    return <Loader/>
}
