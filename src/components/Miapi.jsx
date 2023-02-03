import React, {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

export function Miapi(){
    // Estado de la API
    const [birds, setBirds] = useState([]);
    const [search, setSearch] = useState(""); 
    const limit = 18;
   
    // Consumo de API
    useEffect(() => {
        const apiBirds = async () => {
            const url = `https://aves.ninjas.cl/api/birds`;
            const response = await fetch(url)
            const data = await response.json()
            setBirds(data.slice(0, limit)); 
            }
        apiBirds();
    }, []);

    // Busqueda de aves
    const searcher = (e) => {
        setSearch(e.target.value)
        e.preventDefault();
        console.log(e)
        }

    //vista Renderizada
    return (
        <div> 
            <nav className="search">
                <input placeholder='Search' value={search} onChange={searcher}></input>
            </nav>
                <div className='container mt-3'>
                    <div className='row g-2'>
                        {birds.filter((data) => {
                                return data.name.spanish.toLowerCase().includes(search.toLocaleLowerCase())
                            })
                            .sort((a,b) => {
                                return a.name.spanish.localeCompare(b.name.spanish) 
                            }).map(bird => (
                                <div key={bird} className='col-12 col-md-4 col-lg-4'>
                                    <div  className="card h-100">
                                            <img src={bird.images.main} className="card-img-top" ></img>
                                        <div className="card-body">
                                            <h5 className="card-title">{bird.name.spanish}</h5>
                                        </div>
                                    </div>
                                </div>
                        ))}
                    </div>
                </div>
        </div>
    )
}
