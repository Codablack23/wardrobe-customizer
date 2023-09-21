import { Canvas, useFrame,} from "@react-three/fiber"
import "../styles/customizer.scss"
import Customizer from "../components/Customizer"
import { Suspense, useEffect, useState,  } from "react"
import { useGLTF } from "@react-three/drei"
import { PresentationControls, Stage, useAnimations } from "@react-three/drei/web"
import { Space,Select } from "antd"
import { Vector3 } from "three"
import { WardRobe1 } from "../components/Wardrobe-1"

type Angles = [x:number,y:number,z:number]

const Loader = ()=>{
  return (
    <div className="h-80 md:h-screen flex items-center justify-center">
      <div className="text-center">
       <p>Loading Model....</p>
      </div>
    </div>
  )
}
export default function CustomizerView(){
    const [angle,setAngle] = useState<Angles>([0,0,0])
    const handleChange = (value: string) => {
      const arrValue = value.split(",").map(i=>parseInt(i))
      setAngle([arrValue[0],arrValue[1],arrValue[2]])
    };
    return (
        <div className="customizer-container md:h-screen overflow-y-auto">
            <div className="absolute rounded-md bg-gray-100 top-2 left-2 flex items-center justify-center  gap-4 w-48  z-10 p-1">
              <div>
              <p className="text-lg my-2 font-medium text-center">Your View</p>
               <Space wrap>
                  <Select
                   className="w-full"
                    defaultValue={angle.toString()}
                    style={{ width: 170 }}
                    onChange={handleChange}
                    options={[
                      { value: "1,0,0", label: 'Top View' },
                      { value: "0,0,0", label: 'Front View' },
                      // { value: [], label: '180 degree' },
                      { value: "0,1,0", label: 'Side View' },
                    ]}
                  />
                </Space>
              </div>
            </div>          

          <div className="grid md:grid-cols-3 gap-10">
            <div className="canvas-container h-80 md:h-screen p-5 md:col-span-2">
            <Suspense fallback={<Loader/>}>
              <Canvas>
                 <PresentationControls rotation={angle}>
                    <Stage
                   environment={{files:"/bg.hdr",background:false}}
                   scale={new Vector3(10,10,10)} 
                   intensity={0.6} 
                   castShadow={false}
                   >
                   <WardRobe1/>
                   </Stage> 
                 </PresentationControls>
               </Canvas>
            </Suspense>
            </div>
            <div className="customizer-sidebar md:col-span-1">
                <Customizer setCamera={(angle)=>{setAngle(angle)}}/>
            </div>
          </div>
        </div>
    )
}