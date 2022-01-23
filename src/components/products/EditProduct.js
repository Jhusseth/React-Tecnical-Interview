import React,{useState} from "react";
import GradientBar from '../common/GradientBar';
import Card from '../common/Card';
import { Form, Formik} from 'formik';
import FormSuccess from '../FormSuccess'
import FormError from '../common/FormError'
import FormInput from '../FormInput'
import Label from '../common/Label';
import GradientButton from '../common/GradientButton';
import GradientLink from '../common/GradientLink';
import * as Yup from 'yup';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../util/firebase";

export default function Modal(props) {
  const EditSchema = Yup.object().shape({
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
    
    
    const [editProduct, setEditProduct] = useState(false);

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
    
    const submitProduct = async product => {
        try {
            setEditProduct(true);
            const productDocRef = doc(db, 'products', props.id);

            await updateDoc(productDocRef, {
                name: product.name,
                description: product.description,
                price: product.price,
                images: product.images,
            })

            setAddProductSuccess("Se editó el producto correctamente");
            setAddProductError('');

        }
        catch (error) {
            console.lopg(error);
            setEditProduct(false);
            setAddProductError("No se pudo editar el producto");
            setAddProductSuccess('');
        }
        finally{
            setTimeout(() => {
                props.setShowModal(false)
                window.location.reload();
            }, 1000);
        }

    };
  return (
    <>
      {props.showModal ? (
        <>
            <section className="w-3/4 h-screen m-auto sm:pt-10">
                <GradientBar />
                <Card>
                    <div className="flex items-center justify-center py-7 px-2 sm:px-3 lg:px-3">
                        <div className="max-w-md w-full flex items-center justify-center">
                            <Formik
                                initialValues={{
                                    name: props.product.name,
                                    price: props.product.price,
                                    description: props.product.description,                                    
                                    images: props.product.images
                                }}
                                onSubmit={values =>
                                    submitProduct(values)
                                }
                                validationSchema={EditSchema}
                            >
                                {({values}) => (
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
                                        <div className="flex flex-col">
                                            <div className="mb-2 mr-2 w-full">
                                                <div className="mb-1">
                                                    <Label text="Upload images" />
                                                </div>                                               
                                            </div>
                                            {images.length===0? (
                                                <div className="grid grid-cols-3 justify-center mt-3 mb-3" >
                                                    {props.product.images.length>0 &&props.product.images.map((pic, index) => (                                                       
                                                        <div className="justify-around" key={index}>
                                                            <div className="flex-column">                                                  
                                                                <img src={pic.base64} alt="..." className="w-32 h-24"/> 
                                                                <label className="dark:text-gray-300">{pic.name}</label>
                                                            </div>  
                                                        </div>                                                                                                                 
                                                    ))}
                                                </div>):(
                                                <div className="grid grid-cols-3 justify-center mt-3 mb-3" >
                                                    {images.map((pic, index) => (                                                       
                                                        <div className="justify-around" key={index}>
                                                            <div className="flex-column">                                                  
                                                                <img src={pic.base64} alt="..." className="w-32 h-24 dark:text-gray-300"/> 
                                                                <label className="dark:text-gray-300">{pic.name}</label>
                                                            </div>  
                                                        </div>                                                                                                                 
                                                    ))}
                                                </div>
                                            )}                                                                         
                                            <div className="form-group">
                                                <input type="file" className="form-control dark:text-gray-300" onChange={uploadFile} multiple />
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
                                            loading={editProduct}
                                        />
                                        <div className="ml-6">
                                            <GradientLink
                                                to="/products2"
                                                text="Exit"
                                            />
                                        </div>
                                    </div>
                                </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Card>
            </section>
        </>
      ) : null}
    </>
  );
}