import { useState } from "react";
import StudentHeader from "../../components/StudentHeader";
import "./../../styles/buy-page.css";
import Button from "../../components/Button";
import sendRequest, { sendGetRequest } from "../../helpers/request";
import { useAuth } from "../../contexts/AuthContext";
import { dumpObject } from "../../helpers/dump";
import { useNavigate } from "react-router-dom";
import LoginFooter from "./../../components/LoginFooter"

export default function BuyPage() {
    const [paymentMethod, setPaymentMethod] = useState(''); // Thanh toán phương thức
    const [numPages, setNumPages] = useState(0); // Số trang muốn mua
    const [unitPrice] = useState(500); // Đơn giá mỗi trang
    const [bankForm, setBankForm] = useState(null); // Form thông tin ngân hàng (nếu có)
    const navigate = useNavigate(); // Dùng để điều hướng sau khi thanh toán thành công

    const handlePaymentMethod = (e) => {
        const selectedMethod = e.target.value;
        setPaymentMethod(selectedMethod);
        if (selectedMethod === 'bank') {
            setBankForm(<div className="bank-info">Thông tin ngân hàng...</div>); // Hiển thị form thông tin ngân hàng
        } else {
            setBankForm(null); // Ẩn form ngân hàng khi chọn phương thức khác
        }
    };

    const sendPaymentRequest = () => {
        console.log('Gửi yêu cầu thanh toán');
        alert(`Tổng số tiền cần thanh toán là ${numPages * unitPrice} VND`);
    };

    return (
        <>
         <StudentHeader />
         <div className="buy-page">
           
           <main>
               <div className="payment-info">
                   <h2>Thanh toán</h2>
                   <div className="payment-form">
                       <ul className="payment-method" onChange={handlePaymentMethod}>
                           <li>
                               <input type="radio" name="payment-method" value="bank" id="bank"
                                   checked={paymentMethod === 'bank'}
                               />
                               <label htmlFor="bank">Thẻ ngân hàng</label>
                           </li>
                           <li>
                               <input type="radio" name="payment-method" value="momo" id="momo"
                                   checked={paymentMethod === 'momo'}
                               />
                               <label htmlFor="momo">Momo</label>
                           </li>
                           <li>
                               <input type="radio" name="payment-method" value="bkpay" id="bkpay"
                                   checked={paymentMethod === 'bkpay'}
                               />
                               <label htmlFor="bkpay">BKPay</label>
                           </li>
                       </ul>
                       {paymentMethod === 'bank' ? bankForm : ''}
                   </div>
               </div>

               <div className="num-pages">
                   <h2>Thông tin trang mua</h2>
                   <div>
                       <label htmlFor="num-pages">Số trang muốn mua thêm</label>
                       <input type="number" name="num-pages" id="num-pages" 
                           value={numPages}
                           onChange={(e) => setNumPages(Number(e.target.value))}
                       />
                   </div>

                   <table className="unit-price">
                       <tbody>
                           <tr>
                               <td>Tổng số trang</td>
                               <td>{numPages || 0}</td>
                           </tr>
                           <tr>
                               <td>Đơn giá</td>
                               <td>{unitPrice} VND</td>
                           </tr>
                       </tbody>
                   </table>

                   <table className="total-cost">
                       <tbody>
                           <tr>
                               <td>Tổng cộng</td>
                               <td></td>
                           </tr>
                           <tr>
                               <td></td>
                               <td className="figure">{numPages * unitPrice} VND</td>
                           </tr>
                       </tbody>
                   </table>

                   <Button action={sendPaymentRequest}>
                       Thanh toán
                   </Button>
               </div>
           </main>
       </div>
      

        </>
  
       
    );
}
