import React from 'react'
import { NavLink, useOutletContext } from 'react-router-dom';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';


const RessourcesGames = () => {
    const { theme, toggleTheme } = useOutletContext();
    const GamesList=[
      { id:1,
        name:"Fruit Duo ",
        picture:"../images/fruitDuo_images/jeu_fruits.webp",
        description:"Ce jeu aide les enfants à découvrir et reconnaître différents fruits tout en s’amusant.En associant les bonnes paires, l’enfant peut apprendre l’écriture et la prononciation des noms des fruits.C’est une manière simple et amusante de stimuler la mémoire, le vocabulaire et la reconnaissance visuelle.",
        path:"/fruit-game"
      },
      { id:2,
        name:"Ma Voix Magique",
        picture:"",
        description:"",
        path:"/ma-voix-magique"
      }
      
    ]
  return (
    <div>
        <Navbar theme={theme} toggleTheme={toggleTheme}/>
        <main className='container mt-5 px-3 pt-5'>
<p className='me-5 pe-5 fs-5 w-100 text-justify my-4 text-muted'>Le jeu est un outil essentiel dans le développement des enfants, et encore plus pour les enfants autistes.
Sur cette page, nous proposons plusieurs jeux éducatifs et interactifs conçus pour aider les enfants à se détendre, explorer, apprendre et mieux interagir avec le monde qui les entoure.

À travers des activités ludiques et adaptées, les enfants peuvent développer leurs compétences tout en prenant du plaisir. Ces jeux favorisent notamment la communication, l’apprentissage du langage, la concentration et la confiance en soi.
</p>
          <div className="d-flex flex-wrap gap-3 mt-2">
            {GamesList.map((g)=>(
              <div key={g.id} className="card mt-4 card-games rounded-4" style={{backgroundImage:`url(${g.picture})`,backgroundSize: "cover",backgroundRepeat: "no-repeat",backgroundPosition: "center"}}>
              </div>
            ))}
          </div>
        </main>
        <Footer/>
    </div>
  )
}
export default RessourcesGames;
