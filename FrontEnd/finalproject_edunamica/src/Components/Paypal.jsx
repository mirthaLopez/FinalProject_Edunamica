import React, { useEffect, useState } from 'react';
import {PayPalScriptProvider,PayPalButtons} from "@paypal/react-paypal-js"
import GetCourses from '../Services/Courses/GetCourses';


const Paypal=()=> {
    const [valores, setValores] = useState({
        compra: null,
        venta: null
      });

    const [courses, setCourses] = useState([]);
    console.log(courses);
    

    useEffect(() => {
      const fetchData = async () => {
        const coursesData = await GetCourses();
        setCourses(coursesData);
      };
      fetchData();
    }, []);
  
      useEffect(() => {
        // Función para consultar el endpoint
        const obtenerValores = async () => {
          try {
            const response = await fetch('https://apis.gometa.org/tdc/tdc.json');
            if (!response.ok) {
              throw new Error('Error al obtener los datos');
            }
            const data = await response.json();
            // Asumimos que la respuesta tiene los valores en los campos compra y venta
            setValores({
              compra: data.compra,
              venta: data.venta
            });
          } catch (error) {
            console.error('Error:', error);
          }
        };
        
        obtenerValores();
      }, []);

    ////Hay que traer el curso relacionado a este pago y acceder al precio

    const total_amount= 70000/valores.venta;
    console.log(total_amount);
    
      

    const createOrder = (data,actions)=> {
          return actions.order.create({
            purchase_units:[
                {
                    amount:{
                        currency:"USD",
                        value:total_amount                        
                    }
                }
            ]

        })
    }

    const onApprove = (data,actions)=> {
      return actions.order.capture().then(function(details){
        alert("Pago Completado" + details.payer.name.given_name)
      })
    }

    const onCancel = () => {
        alert("Pago Cancelado");
    };


  return (

    <div>
        <PayPalScriptProvider options={initianlOptions} >
            
            <PayPalButtons
            
            style={{
                layout: "horizontal",
                color: "blue",
                shape:"rect",
                label: "paypal"
            }}
            createOrder={(data,actions)=>createOrder(data,actions)}
            onApprove={(data,actions)=> onApprove(data,actions)}
            onCancel={onCancel}
            />
            
        </PayPalScriptProvider>
        <div>
      <h3>Valores del Dólar</h3>
      <p>Compra: {valores.compra ? valores.compra : 'Cargando...'}</p>
      <p>Venta: {valores.venta ? valores.venta : 'Cargando...'}</p>
    </div>
    </div>
  )

}



export default Paypal