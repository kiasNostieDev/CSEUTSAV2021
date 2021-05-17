import { Button, FormControl, FormHelperText, InputLabel, makeStyles, OutlinedInput, Typography } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import './Console.css'
import firebase from 'firebase/app'
import fbref from '../Firebase'
import { IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
}));

export default function Console() {
    const classes = useStyles();
    var name, date, time
    const [contests, setContests] = useState([])
    const [isLoading, setIsLoading] = useState('1')
    const [isLoadingPar, setIsLoadingPar] = useState('0')
    const [selec, setSelec] = useState('0')
    const [currentContest, setCurrentContest] = useState('')
    const [listofs, setListOfs] = useState([])
    const [key, setKey] = useState([])

    if(isLoading === '1'){
        let contestsInit = [], cont = {}, keylist = []
        firebase.database().ref('ContestList/').on('value', snap => {
            snap.forEach(item => {
                cont["name"] = item.val().Name
                cont["date"] = item.val().Date
                cont["time"] = item.val().Time
                contestsInit.push(cont)
                cont = {}
                keylist.push(item.key)
            })
            setContests(contestsInit)
            setKey(keylist)
            console.log(contestsInit)
        })
        setIsLoading('0')
    }

    function ListCompo() {

        if (isLoadingPar === '1') {
            let listOfsInit = []
            firebase.database().ref(currentContest+"/").once('value', snap => {
                let cont1 = {
                    name: '',
                    year: '',
                    sec: '',
                    phone: '',
                    mail: '',
                    team: ''
                }
                snap.forEach(item => {
                    cont1.name = item.val().Name
                    cont1.year = item.val().Year
                    cont1.sec = item.val().Sec
                    cont1.phone = item.val().Phone
                    cont1.mail = item.val().Mail
                    cont1.team = item.val().Teamname
                    if(cont1.team === undefined)cont1.team = 'Indie'    
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

        if (selec === '1') {
            if(isLoadingPar === '1')return <div>loading</div>
            return (
                <div>
                    <div className='headingSpace'>
                        <IconButton onClick={()=>setSelec('0')} style={{ color: 'yellow', float: 'left'}} aria-label="upload picture" component="span">
                            <ArrowBack />
                        </IconButton>
                        <Typography fullWidth style={{ fontFamily: 'Rubik', color: 'gray', textAlign: 'center', padding: '9px' }} variant='h5'>{currentContest + "(" + listofs.length + ")"}</Typography>
                    </div>
                    <Link to={'/table/'+currentContest}  style={{textDecoration: 'none'}}><Button fullWidth onClick={()=>{}}>Tablulate the List</Button></Link>
                    <div className='competerTab'>{
                        listofs.map(item => {
                            let first = item.name + " from  " + item.year + " and section "  + item.sec + " for team " + item.team
                            if(item.team === 'Indie')first = item.name + " from  " + item.year + " and section "  + item.sec
                            return (
                                <div className='contestTab'>
                                    <Typography fullWidth style={{ fontFamily: 'Rubik', color: 'yellow', textAlign: 'center' }} variant='h5'>{first}</Typography>
                                    <Typography  fullWidth style={{ fontFamily: 'Rubik', color: 'white', textAlign: 'center'}} variant='h5'>{"Contact[" + item.phone + ", " + item.mail + "]"}</Typography>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            )
        }
        return (
            <div>{
                contests.map(item => {
                    return (
                        <div onClick={() => {
                            console.log(item.name)
                            setSelec('1')
                            setIsLoadingPar('1')
                            setCurrentContest(key[contests.indexOf(item)])
                            return <ListCompo/>
                        }}className='contestTab'>
                            <Typography  fullWidth style={{ fontFamily: 'Rubik', color: 'yellow', textAlign: 'center' }} variant='h5'>{item.name}</Typography>
                        </div>
                    )
                })
            }</div>
        )
    }

    function Loader() {
        if (isLoading === '1') {
            return <div>Loading</div>
        }
        return (
            <div>
                <div className='contestHolder'>
                    <div className='listOfContests'>
                        <Typography fullWidth style={{ fontFamily: 'Rubik', color: 'white', padding: '3vh', textAlign: 'center', border: 'solid', borderWidth: '0 0 0.1px 0', borderColor: 'rgb(207, 207, 207)', boxShadow: 'inset 0 6px 20px 0 rgba(0, 0, 0, 0.19), 0 4px 8px 0 rgba(0, 0, 0, 0.2) inset' }} variant='h5'>List Of Contests in CSE Utsav 2021</Typography>
                        <ListCompo />
                    </div>
                </div>
            </div>
        )
    }

    return <Loader />
}
