import React, {useContext} from 'react'
import{MyContext} from '../context'
import { getHome } from '../services/getHomeService'

 function Home({history}){

    const context = useContext(MyContext)
           const getHomedata=  getHome().then(res=>console.log(res)).catch(err=>err)
    return (
        <MyContext.Consumer>
        {context=>
        
            {
                return(
                    <>
                    <h1>Home</h1>

                    </>


                    )



        }
        }

        </MyContext.Consumer>

    )
}



export default Home
