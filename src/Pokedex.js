import React,{useState,useEffect} from 'react'
import { AppBar,Toolbar,Grid, Card, CardContent, CircularProgress, CardMedia, Typography, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { toFirstCharUppercase } from './utils/utils';

const useStyles = makeStyles(theme =>({
    pokedexContainer:{
        paddingTop:'20px',
        paddingLeft:'50px',
        paddingRight: '50px'
    },
    cardMedia:{
        margin:'auto'
    },
    CardContent:{
        textAlign:'center'
    },

    searchContainer:{
        display:'flex',
        backgroundColor:'lightgray',
        paddingLeft:'20px',
        paddingRight:'20px',
        marginTop:'5px',
        marginBottom:'5px',
    },

    SearchIcon:{
        alignSelf:'flex-end',
        marginBottom:'5px',
    },

    SearchInput:{
        width:'200px',
        margin:0
    },

    CardText:{
        margin:'auto',
        textAlign:'center',
        fontSize:'22px',
        borderTop:'3px solid grey'
    }
}))





export const Pokedex = props => {
    const {history} = props;
    const classes = useStyles();
    const [pokemonData,setPokemonData] = useState();
    const [filter, setFilter] = useState('');

    const handleInput = (e) =>{
        setFilter(e.target.value);
    }

    const handleSelectInput = (e) =>{
        return null;
    } 

    useEffect(()=>{
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
        .then( function (response){
            const {data} = response;
            const {results} = data;
            const newPokemonData = {};
            results.forEach((pokemon,index) => {
                newPokemonData[index + 1] = {
                    id: index + 1,
                    name:pokemon.name,
                    sprite:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
                }
            })
            setPokemonData(newPokemonData);
        })
    },[])

    const getPokemonCard = () =>{
        return (
            Object.values(pokemonData).map(pokemon =>{
                if(pokemon.name.includes(filter)){
                    const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
                return (
                    <Grid item xs={4} key={pokemon.id}>
                        <Card onClick={()=> history.push('/' + pokemon.id)}>
                            <CardMedia 
                                className={classes.cardMedia}
                                image = {sprite}
                                style={{width:'200px', height:'200px'}}/>
                            <CardContent>
                                <Typography className={classes.CardText}>{`${pokemon.id}. ${toFirstCharUppercase(pokemon.name)}`}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )
                }
                
            })
        )
    }

    return (
        <>
            <AppBar position='static' className={classes.AppBar} enableColorOnDark >
                <Toolbar>
                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.SearchIcon}/>
                        <TextField 
                            className={classes.SearchInput}
                            label='Pokemon'
                            variant='standard'
                            onChange={handleInput}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
              {getPokemonCard()}
        </Grid>
      ) : (
        <div><CircularProgress/></div>
      )}

        </>
    )
}

export default Pokedex;
