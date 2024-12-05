import React from 'react'
import StudentHeader from '../component/StudentHeader'
import paper1 from '../assets/paper1.png';
import paper2 from '../assets/paper2.png';
import paper3 from '../assets/paper3.png';

const Buy = () => {
  const papers = [
    {
      name: 'GIẤY DOUBLE A',
      price: '180 VND/tờ',
      image: paper1,
    },
    {
      name: 'GIẤY PAPER ONE',
      price: '170 VND/tờ',
      image: paper2
    },
    {
      name: 'GIẤY IK PLUS',
      price: '140 VND/tờ',
      image: paper3
    },
  ];

  return (
    <div>
        <StudentHeader />
        <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          MUA GIẤY
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded flex items-center">
          <i className="fas fa-shopping-cart mr-2"></i> Thanh toán
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">CÁC LOẠI GIẤY HIỆN CÓ</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {papers.map((paper, index) => (
          <div key={index} className="border rounded-lg p-4">
            <img src={paper.image} alt={paper.name} className="w-full h-48 object-cover mb-4" />
            <div className="text-center">
              <h3 className="text-lg font-semibold">{paper.name}</h3>
              <p className="text-gray-600">GIÁ: {paper.price}</p>
              <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4 flex items-center justify-center">
                <i className="fas fa-shopping-basket mr-2"></i> Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-gray-600">
        <a href="#" className="mr-4 hover:underline">Điều khoản</a>
        <a href="#" className="mr-4 hover:underline">Trợ giúp</a>
        <a href="#" className="hover:underline">Chăm sóc khách hàng</a>
      </div>
    </div>
    </div>
  )
}

export default Buy
