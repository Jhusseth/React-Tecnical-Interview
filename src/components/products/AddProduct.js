import React,{ useState } from 'react'
import GradientBar from '../common/GradientBar';
import Card from '../common/Card';
import { Form, Formik} from 'formik';
import FormSuccess from '../FormSuccess'
import FormError from '../common/FormError'
import FormInput from '../FormInput'
import Label from '../common/Label';
import GradientButton from '../common/GradientButton';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

import {collection, addDoc, Timestamp} from "firebase/firestore";
import { db } from "../../util/firebase";

export default function AddProduct(props) {


    const AddSchema = Yup.object().shape({
        name: Yup.string().required(
            'Product name is required'
        ), 
        price: Yup.string().required(
            'Product price is required'
          ),
        description: Yup.string().required(
            'Product description is required'
        ),
    });

    const [addProductSuccess, setAddProductSuccess] = useState();
    const [addProductError, setAddProductError] = useState();
    const [images, setImages] = useState([]);
    const [loadingAddProduct, setLoadingAddProduct] = useState(false);
    const [isUpload, setIsUpload] = useState(true);

    const uploadFile = async (e) =>{

        let files = e.target.files

        if(files.length<=3){

            let res = []

            for(const file of files){
                const data = {
                    name: '',
                    base64: '',
                };

                 await getBase64(file)
                    .then(result => {
                        file["base64"] = result;
                        data.name = file.name;
                        data.base64 = file["base64"];
                    })
                .catch(err => {
                    console.log(err);
                });

                res.push(data)
            }

            if(res.length>=3){       
                setIsUpload(false)
            }
            else{
                setIsUpload(true)
            }
            setImages(res)
        }
        else{
            alert("Maximo 3 imagenes")
        }
    }

    const getBase64 = file => {
        return new Promise(resolve => {
          let baseURL = "";
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            baseURL = reader.result;
            resolve(baseURL);
          };
        });
    };

    const deleteImages = () => {
        setImages([])
        setIsUpload(true)
    }
    
    const submitProduct = async product => {

        product.images = images;
        
        if(product.images.length>0){
            try {
                setLoadingAddProduct(true);

                await addDoc(collection(db, 'products'), {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    images: product.images,
                    created: Timestamp.now()
                })               
                setAddProductSuccess("Producto agregado con exito");
                setAddProductError('');
                setTimeout(() => {
                    props.showPanel()
                    window.location.reload();
                }, 1000);
            }
            catch (error) {
                setLoadingAddProduct(false)
                setAddProductError("Error al agregar producto");
            }
        }
        else{
            setAddProductError("Error al agregar producto, debe contener al menos 1 imagen");
            setAddProductSuccess('');
        }
        
    };
    return (
        <>
            <section className="w-4/5 h-screen m-auto sm:pt-10">
                <GradientBar />
                <Card>
                    <div className="flex items-center justify-center py-7 px-2 sm:px-3 lg:px-3">
                        <div className="max-w-md w-full flex items-center justify-center">
                            <Formik
                                initialValues={{
                                    name: '',
                                    price: '',
                                    description: '',
                                    images: [],
                                }}
                                onSubmit={values =>
                                    submitProduct(values)
                                }
                                validationSchema={AddSchema}
                            >
                                {() => (
                                <Form className="mt-8">
                                    {addProductSuccess && (
                                    <FormSuccess text={addProductSuccess} />
                                    )}
                                    {addProductError && (
                                    <FormError text={addProductError} />
                                    )}
                                    <input
                                    type="hidden"
                                    name="remember"
                                    value="true"
                                    />
                                    <div>
                                        <div className="flex">
                                            <div className="mb-2 mr-2 w-1/2">
                                                <div className="mb-1">
                                                    <Label text="Name" />
                                                </div>
                                                <FormInput
                                                    ariaLabel="Name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="Name"
                                                />
                                            </div>
                                            <div className="mb-2 mr-2 w-1/2">
                                                <div className="mb-1">
                                                    <Label text="Price" />
                                                </div>
                                                <FormInput
                                                    ariaLabel="Price"
                                                    name="price"
                                                    type="number"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="mb-2 mr-2 w-full">
                                                <div className="mb-1">
                                                    <Label text="Upload images" />
                                                </div>
                                                <div className="grid grid-cols-3 justify-center mt-5 mb-5" >
                                                    {images.length>0 &&images.map((pic, index) => (                                                       
                                                        <div className="justify-around" key={index}>
                                                            <div className="flex-column">                                                  
                                                                <img src={pic.base64} alt="..." className="w-32 h-24"/> 
                                                                <label className="dark:text-gray-300">{pic.name}</label>
                                                            </div>  
                                                        </div>                                                                                                                 
                                                    ))}
                                                </div>
                                                {images.length === 3 && <div className="flex justify-center">
                                                    <button className="rounded-full shadow hover:text-yellow-500 dark:text-yellow-500 dark:hover:text-amber-600 flex items-center px-3 py-3" onClick={()=>deleteImages()}>
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </button>
                                                </div>}
                                                {isUpload &&
                                                <div className="form-group">
                                                    <input type="file" className="form-control dark:text-gray-300" onChange={uploadFile} multiple />
                                                </div>}                                               
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="mb-2 mr-2 w-full">
                                                <div className="mb-1">
                                                    <Label text="Description" />
                                                </div>
                                                <FormInput
                                                    ariaLabel="Description"
                                                    name="description"
                                                    type="text"
                                                    placeholder="Description"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center justify-center">
                                    <GradientButton
                                        type="submit"
                                        text="Save"
                                        loading={loadingAddProduct}
                                    />
                                    </div>
                                </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Card>
            </section>
        </>
    );
};
