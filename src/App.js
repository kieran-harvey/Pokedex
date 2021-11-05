import {Switch,Route} from 'react-router-dom';
import Pokedex from './Pokedex';
import Pokekon from './Pokemon';

function App() {
  


  return (
    <Switch>
      <Route exact path='/' render={(props) => <Pokedex {...props}/>}/>
      <Route 
        exact 
        path='/:pokemonId'
        render={(props) => <Pokekon {...props}/>}
      />
    </Switch>
  );
}

export default App;
