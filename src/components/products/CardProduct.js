import React,{useState} from 'react'
import Card from '../common/Card';
import CardSpacer from '../common/CardSpacer';
import GradientBar from '../common/GradientBar';
import Alert from '../common/Alert'
import EditProduct from './EditProduct'
import Label from '../common/Label';
import Carousel from '../common/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import {doc, deleteDoc} from "firebase/firestore";
import { db } from "../../util/firebase";


export default function CardProduct(props) {

    const [mResponse, setMResponse] = useState();
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [product, setProduct] = useState();

    const deleteProduct = async (id)=>{
        try {
            
            const productDocRef = doc(db, 'products', id)

            await deleteDoc(productDocRef)
                
            setMResponse("Se eliminó el producto correctamente")
            setShow(true)
        }
        catch (error) {
            setMResponse("No se pudo eliminar el producto")
            setShow(true)
        }

        setTimeout(() => {
            window.location.reload()
        }, 500);
    }

    const close = ()=>{
        setShow(false)
    }

    const editProduct = (pd)=>{
        setProduct(pd)
        setShowModal(true)
    }

    return (
        <>
            {showModal?<EditProduct setShowModal={setShowModal} product={product} id={props.pd_id} showModal={showModal}/>:<>
            <GradientBar />
            <Card>
                {show?<Alert text={mResponse} close={close}/>:null}
                <div className="inline-block min-w-full rounded-lg overflow-hidden">

                    <div className="flex">

                        <div className="md:grid md:grid-cols-2 sm:flex sm:flex-col">

                            <div className="flex flex-col min-w-full">

                                <div className="grid grid-cols-2">

                                    <div className="w-32 mt-5">
                                        
                                        <CardSpacer>
                                            <div className=" justify-center flex-col ml-5 mt-3">
                                                <Label text = "Name: "/><br/>
                                                <Label text = "Price: "/><br/>                                                
                                            </div>
                                        </CardSpacer>

                                    </div>

                                    <div className=" w-32 mt-5">
                                        
                                        <CardSpacer>
                                            <div className=" justify-center flex-col mt-3">
                                                <label className="text-sm font-bold font-semibold text-app overflow-hidden dark:text-gray-200"> {props.pd.name} </label><br/>
                                                <label className="text-sm font-bold font-semibold text-app overflow-hidden dark:text-gray-200"> {props.pd.price} </label><br/>                                           
                                            </div>
                                        </CardSpacer>

                                    </div>
                                </div>
                                <div className="w-64">
                                    <div className="items-center text-center">
                                        <CardSpacer>
                                            <Label text = "Description: "/><br/>
                                        </CardSpacer>
                                    </div>

                                    <div className=" justify-center text-center">
                                        <CardSpacer>
                                            <label className="text-sm font-bold font-semibold text-app overflow-hidden dark:text-gray-200"> {props.pd.description}</label><br/>
                                        </CardSpacer>
                                    </div>

                                </div>
                            </div>

                            <div className="flex flex-row justify-center items-center text-center">
                                <div className="justify-center items-center text-center">
                                    <Carousel images={props.pd.images}/>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="flex justify-evenly mt-3 mb-2">
                        <div className="flex justify-center">
                            <button className="flex rounded-full items-center py-2 px-6 bg-gradient focus:outline-none shadow-lg text-white" onClick={()=>editProduct(props.pd)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <button className="flex rounded-full items-center py-2 px-6 bg-gradient focus:outline-none shadow-lg text-white" onClick={()=>deleteProduct(props.pd_id)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </div>
                    </div>
                </div>
            </Card></>}
        </>
    )
}
