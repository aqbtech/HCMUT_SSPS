import React, { useState } from 'react';
import StudentHeader from '../component/StudentHeader';
import paper1 from '../assets/a2.webp';
import paper2 from '../assets/a3.webp';
import paper3 from '../assets/a4.webp';
import sendRequest, {buyPage} from '../API/fetchAPI.jsx';
import {toast} from "react-toastify";

const Buy = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    const papers = [
        {
            name: 'GIẤY A4',
            price: 250,
            image: paper3,
        },
        {
            name: 'GIẤY A3',
            price: 400,
            image: paper2,
        },
        {
            name: 'GIẤY A2',
            price: 700,
            image: paper1,
        },
    ];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    const openModal = (paper) => {
        setSelectedPaper(paper || null);
        setQuantity(1);
        setTotalPrice(paper ? paper.price : 0);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPaper(null);
        setQuantity(1);
        setTotalPrice(0);
    };

    const handleQuantityChange = (e) => {
        const qty = parseInt(e.target.value) || 1;
        setQuantity(qty);
        setTotalPrice(selectedPaper ? selectedPaper.price * qty : 0);
    };

    const handlePaperChange = (e) => {
        const paper = papers.find(p => p.name === e.target.value);
        setSelectedPaper(paper);
        setTotalPrice(paper ? paper.price * quantity : 0);
    };

    const handlePurchase = async () => {
        try {
            let adjustedQuantity = quantity;
            if (selectedPaper.name === 'GIẤY A3') {
                adjustedQuantity *= 2;
            } else if (selectedPaper.name === 'GIẤY A2') {
                adjustedQuantity *= 4;
            }
            const response = await buyPage(adjustedQuantity);
            closeModal();
            toast.success("Thanh toán thành công")
        } catch (error) {
            toast.error('Lỗi khi thanh toán!');
        }
    };

    return (
        <div className="min-h-screen">
            <StudentHeader />
            <div className="container mx-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => openModal(null)}
                    >
                        MUA GIẤY
                    </button>
                </div>

                <h2 className="text-2xl font-bold mb-4">CÁC LOẠI GIẤY HIỆN CÓ</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {papers.map((paper, index) => (
                        <div key={index} className="border rounded-lg p-4">
                            <img src={paper.image} alt={paper.name} className="w-full  object-cover mb-4" />
                            <div className="text-center">
                                <h3 className="text-lg font-semibold">{paper.name}</h3>
                                <p className="text-gray-600">GIÁ: {formatCurrency(paper.price)}/tờ</p>
                                <button
                                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4 flex items-center justify-center"
                                    onClick={() => openModal(paper)}
                                >
                                    <i className="fas fa-shopping-basket mr-2"></i> Mua giấy
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Chọn thông tin mua giấy</h2>
                        <div className="mb-4">
                            <label className="block font-medium mb-2">Loại giấy:</label>
                            <select
                                className="w-full border rounded p-2"
                                value={selectedPaper ? selectedPaper.name : ''}
                                onChange={handlePaperChange}
                            >
                                <option value="" disabled>Chọn loại giấy</option>
                                {papers.map((paper, index) => (
                                    <option key={index} value={paper.name}>{paper.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium mb-2">Số lượng:</label>
                            <input
                                type="number"
                                className="w-full border rounded p-2"
                                value={quantity}
                                min="1"
                                onChange={handleQuantityChange}
                            />
                        </div>

                        <div className="mb-4 font-bold">Tổng tiền: {formatCurrency(totalPrice)}</div>

                        <div className="flex justify-between">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handlePurchase}
                            >
                                Xác nhận mua
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={closeModal}
                            >
                                Hủy bỏ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Buy;
