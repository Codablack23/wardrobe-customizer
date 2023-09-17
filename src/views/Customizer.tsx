import { Canvas, useFrame,} from "@react-three/fiber"
import "../styles/customizer.scss"
import Customizer from "../components/Customizer"
import { Suspense, useEffect, useState,  } from "react"
import { useGLTF } from "@react-three/drei"
import { PresentationControls, Stage, useAnimations } from "@react-three/drei/web"
import { Space,Select } from "antd"

type Angles = [x:number,y:number,z:number]
type ModelProps={
  [key:string]:any,
  angles?:Angles
}

const Model= (props:ModelProps)=>{
  const {scene,animations} = useGLTF("/models/animated.glb")
  const all = useAnimations(animations)
  useEffect(() => {
     console.log({animations,all})
  }, [])
  return <primitive object={scene} position={[0,0,5]} {...props} />
}
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
      console.log(`selected ${value}`);
    };
    return (
        <div className="customizer-container md:h-screen overflow-y-auto">
            <div className="absolute rounded-md bg-gray-100 top-2 left-2 flex items-center justify-center  gap-4 w-48  z-10 p-1">
              <div>
              <p className="text-lg my-2 font-medium text-center">Your View</p>
               <Space wrap>
                  <Select
                   className="w-full"
                    defaultValue="front"
                    style={{ width: 170 }}
                    onChange={handleChange}
                    options={[
                      { value: 'top', label: 'Top View' },
                      { value: 'front', label: 'Front View' },
                      { value: '180', label: '180 degree' },
                      { value: 'side', label: 'Side View' },
                    ]}
                  />
                </Space>
              </div>
            </div>          

          <div className="grid md:grid-cols-3 gap-10">
            <div className="canvas-container h-80 md:h-screen p-5 md:col-span-2">
            
            </div>
            <div className="customizer-sidebar md:col-span-1">
                <Customizer setCamera={(angle)=>{setAngle(angle)}}/>
            </div>
          </div>
        </div>
    )
}