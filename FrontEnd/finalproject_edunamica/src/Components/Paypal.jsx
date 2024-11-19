import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import GetCourses from '../Services/Courses/GetCourses';
import GetPaymentMethod from '../Services/Payments/GetPaymentMethods';
import PostPayment from '../Services/Payments/PostPayments';

const Paypal = () => {
  const [valores, setValores] = useState({ compra: null, venta: null });
  const [courses, setCourses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentImg, setPaymentImg] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');
  const [paymentDate, setPaymentDate] = useState('');

  const courseFkId=1; 


  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await GetCourses();
      setCourses(coursesData);
      const paymentMethodData = await GetPaymentMethod();
      setPaymentMethods(paymentMethodData);
    };
    fetchData();
  }, []);

  ///////Encuentra el curso relacionado a la matricula ///////
  const chosen_course= courses.find(c => c.id == courseFkId);
  console.log(chosen_course);
  
  const price = chosen_course?.course_price || "No disponible";

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
          venta: data.venta,
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };
    obtenerValores();
  }, []);

  // Calcular el total amount
  const total_amount = (price / valores.venta).toFixed(2);
  console.log(total_amount); // Esto devolverá un string con 2 decimales

  const initianlOptions = {
    clientId: import.meta.env.VITE_CLIENTE_ID, // ponerlo .env
    currency: "USD",
    intent: "capture",
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency: "USD",
            value: total_amount, // Usar el valor total calculado
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture(); // Esperamos la captura del pago
      alert("Pago Completado " + details.payer.name.given_name);
      if (details.status === "COMPLETED") {
        /////Seteo de datos relacionados a la transaccion/////
        setReceiptNumber(details.id)
        setPaymentDate(details.create_time);
        

      }
    } catch (error) {
      console.error('Error en la transacción:', error);
    }
  };

  const onCancel = () => {
    alert("Pago Cancelado");
  };

  const handlePaymentImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentImg(file);
    }
  };

  const handleChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };


    const PaymentButton = async () => {
      console.log("Boton pagar");
      try {

        const dataPayment = await PostPayment(
          paymentDate,
          price, //////PRECIO DEL CURSO, RELACIONADO A LA TABLA DE MATRICULA
          paymentImg,
          receiptNumber,
          selectedPaymentMethod
        );

        console.log(dataPayment);

          if (dataPayment) {
            const PaymentId = dataPayment.id
            console.log(PaymentId);
            
          }else{
            console.log("No se pudo obtener el id del pago");
          }
        
      } catch (error) {
        console.error("Error al agregar el payment", error);
      }
      

        
    }

  
  return (
    <div>
      <h3>Valores del Dólar</h3>
      <p>Compra: {valores.compra ? valores.compra : 'Cargando...'}</p>
      <p>Venta: {valores.venta ? valores.venta : 'Cargando...'}</p>

      {/* Selección del método de pago */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Selecciona un Método de Pago</FormLabel>
        <RadioGroup value={selectedPaymentMethod} onChange={handleChange} name="payment-methods">
          {paymentMethods.map((method) => (
            <FormControlLabel
              key={method.id}
              value={method.id.toString()}
              control={<Radio />}
              label={method.payment_method_name}
            />
          ))}
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="Pagos en Efectivo, únicamente matrícula presencial"
          />
        </RadioGroup>
      </FormControl>

      {/* Solo muestra el botón de PayPal si el método seleccionado es Paypal */}
      {selectedPaymentMethod === '3' && ( // Suponiendo que '3' es el id de PayPal
        <PayPalScriptProvider options={initianlOptions}>
          <PayPalButtons
            style={{
              layout: "horizontal",
              color: "blue",
              shape: "rect",
              label: "paypal",
            }}
            createOrder={createOrder}
            onApprove={onApprove}
            onCancel={onCancel}
          />
        </PayPalScriptProvider>
      )}

      {/* Subir imagen del comprobante de pago */}
      <div>
        <label>Foto o captura de comprobante de pago:</label>
        <input type="file" onChange={handlePaymentImg} accept="image/*" required />
      </div>

      <button onClick={PaymentButton}>Pagar</button>

    </div>
  );
};

export default Paypal;
