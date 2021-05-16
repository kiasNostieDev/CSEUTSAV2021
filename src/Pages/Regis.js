import React, { useState } from 'react'
import './Regis.css'
import Svg from './Svg'
import logo from '../psnalogo.png'
import firebase from 'firebase/app'
import { Button, FormControl, FormHelperText, InputLabel, makeStyles, MenuItem, OutlinedInput, TextField, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    okbox: {
        width: '60%',
        marginTop: '30px',
        textAlign: 'center',
        // eslint-disable-next-line no-useless-computed-key
        ['@media (max-width:600px)']: {
            marginTop: '30px',
            width: '90%'
        }
    },
    box: {
        width: '450px',
        marginLeft: '5%',
        // eslint-disable-next-line no-useless-computed-key
        ['@media (max-width:600px)']: {
            width: '80VW',
            margin: '0 auto',
            marginLeft: '10%',
        }
    },
    form: {
        marginLeft: '2%',
        // eslint-disable-next-line no-useless-computed-key
        ['@media (max-width:600px)']: {
            marginLeft: '2%',
        }
    }
}));

export default function Regis(props) {
    const classes = useStyles()
    const slug = props.match.params.slug
    var name, year, section, phone, mail, teamname='Indie'
    const [isLoading, setIsLoading] = useState('1')
    const [details, setDetails] = useState([])

    if (isLoading === '1') {
        let detailsInit = []
        firebase.database().ref('ContestList/').child(slug.split(".").join("")).once('value', snap => {
            snap.forEach(item => {
                detailsInit.push(item.val())
                console.log(item.val())
            })
            setDetails(detailsInit)
        })
        setIsLoading('0')
    }

    function InputRoulette() {
        return (
            <div className='getter' style={{ width: 'fit-content', margin: '0 auto' }}>
                <div className='contestName' style={{marginTop: '30px', textAlign: 'center'}}>Details for Registration</div>
                <FormControl className={classes.box}  style={{marginTop: '60px'}} variant="outlined">
                    <InputLabel htmlFor="standard-adornment-amount" >Name</InputLabel>
                    <OutlinedInput onChange={(e)=>name=e.target.value} labelWidth={60}/>
                    <FormHelperText>Present in a formal manner</FormHelperText>
                </FormControl>

                <TextField
                className={classes.box}
                style={{marginTop: '60px'}} 
                id="outlined-select-annotation"
                select
                label='Year you are in'
                helperText='Year you are in'
                variant="outlined"
                onChange={(e) =>year = e.target.value}
                >
                {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
                </TextField>
                
                <TextField
                className={classes.box}
                style={{marginTop: '60px'}} 
                id="outlined-select-annotation"
                select
                label='Section you are in'
                helperText='Section you are in'
                variant="outlined"
                onChange={(e) =>section = e.target.value}
                >
                {['A', 'B', 'C', 'D', 'E'].map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
                </TextField>
                
                <FormControl className={classes.box} style={{marginTop: '60px'}} variant="outlined">
                    <InputLabel htmlFor="standard-adornment-amount" >Phone</InputLabel>
                    <OutlinedInput onChange={(e)=>phone=e.target.value} labelWidth={60}/>
                    <FormHelperText>Section allocated</FormHelperText>
                </FormControl>

                <FormControl className={classes.box} style={{marginTop: '60px'}} variant="outlined">
                    <InputLabel htmlFor="standard-adornment-amount" >Mail</InputLabel>
                    <OutlinedInput onChange={(e)=>mail=e.target.value} labelWidth={60}/>
                    <FormHelperText>Section allocated</FormHelperText>
                </FormControl>


                <FormControl className={classes.box} style={{ marginTop: '60px'}} variant="outlined">
                    <InputLabel htmlFor="standard-adornment-amount" >Team Name</InputLabel>
                    <OutlinedInput onChange={(e)=>teamname=e.target.value} labelWidth={60}/>
                    <FormHelperText>Teamname that you are in. If Individual leave empty</FormHelperText>
                </FormControl>

                <Button
                    className={classes.form}
                    onClick={()=>{
                        firebase.database().ref(slug.split('.').join('')).child(name.split('.').join('')).child('Name').set(name)
                        firebase.database().ref(slug.split('.').join('')).child(name.split('.').join('')).child('Year').set(year)
                        firebase.database().ref(slug.split('.').join('')).child(name.split('.').join('')).child('Sec').set(section)
                        firebase.database().ref(slug.split('.').join('')).child(name.split('.').join('')).child('Phone').set(phone)
                        firebase.database().ref(slug.split('.').join('')).child(name.split('.').join('')).child('Teamname').set(teamname)
                        firebase.database().ref(slug.split('.').join('')).child(name.split('.').join('')).child('Mail').set(mail).then(() => {
                            if(!(alert('Registered Successfully')))window.location.reload()
                        })
                    }}
                    style={{
                        width: '96%',
                        fontFamily: 'Rubik',
                        color: 'white',
                        marginTop: '4%',
                        backgroundColor: 'orange',
                }}>Register</Button>
            </div>
        )
    }

    function Loader() {
        if (isLoading === '1') return <div>loading</div>
        return (
            <div className='regisPage'>
                <div className='detailsColumn'>
                    <div style={{margin: '15px 20px 20px 20px'}}>
                        <img src={logo} alt='logo' style={{
                            float: 'left',
                            width: '40px',
                            marginRight: '10px'
                        }}/>
                        <div className='contestName'>CSE Utsav</div>
                    </div>
                    <div className='whiteborder' />
                    <div className='detailHead'>Contest Details</div>
                    <div className='detailsParti'>{"This particular contest is about to be conducted on " + details[0] + " at " + details[2] + ". Students must be registered before competing else submissions will go invalid even if it's considerate."}</div>
                </div>
                <div className='mainColumn'>
                    <div className='mainBgImage'>
                        <div className='svgHolder'><Svg /></div>
                        <div className='mainName'>
                            <div>{slug}</div>
                            <button className='resultButton'>Check Results</button>
                        </div>
                    </div>
                    <div className='mainRegis'>
                        <InputRoulette />
                    </div>
                </div>
            </div>
        )
    }

    return <Loader />
}
