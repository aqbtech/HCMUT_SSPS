import SPSOHeader from "../component/SPSOHeader";
import bgImage from "../assets/bk.jpg"; 

export default function SPSO_home() {
 

  return (
      <>
     <SPSOHeader />
      <div
        className="student-homepage h-screen w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white bg-opacity-75 p-8 rounded-lg backdrop-blur-md">
            <h1 className="text-4xl font-bold text-center">CHÀO MỪNG BẠN QUAY TRỞ LẠI</h1>
          </div>
        </div>
      </div>
       </>
  );
}