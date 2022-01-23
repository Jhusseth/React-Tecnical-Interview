import React , {useState, useEffect} from 'react'
import Button from '../components/common/GradientButton'
import AddProduct from '../components/products/AddProduct'
import PageTitle from '../components/common/PageTitle';
import CardProduct from '../components/products/CardProduct';
import { query, collection, getDocs} from "firebase/firestore";
import { auth,db } from "../util/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


export default function Products() {

    const [showAdd, setShowAdd] = useState(false);
    const [products, setProducts] = useState([]);
    const [user, loading, error] = useAuthState(auth);

    const fetchProducts = async () => {
        try {
          const q = query(collection(db, "products"));
          const doc = await getDocs(q);
          const data = doc.docs;
          setProducts(data);
        }
        catch (err) {
          console.error(err);
          alert("error en la carga de los productos");
        }
    };
    
    useEffect( () => { 

        fetchProducts();
        
    }, [user, loading])

    const showAddPanel =()=>{
        setShowAdd(!showAdd)
    }

    return (
        <>
            <div className="container mx-auto px-4 dark:bg-zinc-900">
                <PageTitle title="Productos" />
                <div className="py-1">
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="container-add">
                            <Button text="Añadir + " onClick={showAddPanel}/>
                        </div>
                        <div style={{display: `${showAdd ? 'block' : 'none'}`}}>
                            <AddProduct showPanel={showAddPanel}/>
                        </div>                       
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-5 sm:flex sm:flex-col xs:flex xs:flex-col">
                        {products.map((product, index)=>(
                            <div key={index} className ='md:mb-1 sm:mb-3 xs:mb-4'>
                                <div className="md:min-w-full sm:w-full">  
                                    <CardProduct pd_id={product.id } pd={product.data()} />
                                </div>    
                            </div>
                        ))}  
                    </div>                    
                </div>
            </div>
        </>
    )
}
