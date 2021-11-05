import React,{useState,useEffect} from 'react'
import { Typography, Link, CircularProgress, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { toFirstCharUppercase } from './utils/utils';
import { display } from '@mui/system';


const useStyles = makeStyles(theme =>({
    title:{
        textAlign:'center',
        color:'black',
        margin:'auto',
        borderBottom:'10px solid black',
        width:'80%'
    },



}))



export const Pokemon = (props) => {

    const {history,match} = props;
    const {params} = match;
    const {pokemonId} = params;
    const [pokemon, setPokemon] = useState(undefined);
    const classes = useStyles();

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(function (response){
            const {data} = response;
            setPokemon(data);
        })
        .catch(function(error){
            setPokemon(false);
        })
    },[pokemonId])

    //1. pokemonData = undefined - loading
    //2. good info - return info
    //3. bad data - return pokemon not found

    const generatePokemonJSX = () =>{
        const {name,id,species,height,weight,types,sprites} = pokemon;
        const {imgURL} = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const {front_default} = sprites;
        return(
            <>
            <Typography className={classes.title} variant='h1' >
                {`${id}. ${toFirstCharUppercase(name)}`}
                <img src={front_default}></img>
            </Typography>
            <img style={{width:'300px', height:'300px'}} src={front_default}></img>
            <Typography variant='h3'>
                {"Species: "}
                <Link href={species.url}>{species.name}</Link>
            </Typography>
            <Typography variant='h6'>Height:{height}</Typography>
            <Typography variant='h6'>Weight:{weight}</Typography>
            <Typography variant='h6'>Types: </Typography>
            {types.map((typeInfo)  => {
                const {type} = typeInfo;
                const {name} = type;
                return <Typography key={name} variant='h6'>{`${name}`}</Typography>
            })}
            </>
        )
    }
    return (
        <>
        { pokemon === undefined && <CircularProgress/>}
        {pokemon !== undefined && pokemon && generatePokemonJSX()}
        {pokemon === false && <Typography>Pokemon not found</Typography>}
        {pokemon !== undefined && (
            <Button variant='contained' onClick={()=> history.push('/')}>
                Back to Pokedex
            </Button>
        )}
        </>
    )
}

export default Pokemon;