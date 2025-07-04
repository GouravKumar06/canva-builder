import { Crown, Loader } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { saveDesign } from '@/services/designService'
import { useRouter } from "next/navigation";

const Banner = () => {

    const [loading,setLoading] = useState(false)
    const router = useRouter();

    const handleCreateNewDesign = async() => {

        if(loading) return
        try{
            setLoading(true)
            
            const initialDesignData = {
                name : 'Untitled Design',
                canvaData : null,
                width : 825,
                height : 465,
                category : 'youtube_thumbnail'
            }

            const newDesign = await saveDesign(initialDesignData)

            if (newDesign?.success) {
              router.push(`/editor/${newDesign?.data?._id}`);
              setLoading(false);
            } else {
              throw new Error("Failed to create new design");
            }

        }catch(error){
            console.log(error);
            setLoading(false)
        }
        
    }

  return (
    <div className="rounded-xl overflow-hidden bg-gradient-to-r from-[#00c4cc] via-[#8b3dff] to-[#5533ff] text-white p-4 sm:p-6 md:p-8 text-center">
        <div className="flex flex-col sm:flex-row justify-center items-center mb-2 sm:mb-4">
            <Crown className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-yellow-300 " />
            <span className="sm:ml-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
                Create Innovative Designs
            </span>
        </div>
        <h2 className="text-sm sm:text-base md:text-lg font-bold mb-4 sm:mb-6 max-w-2xl mx-auto">
            Design eye-catching thumbnails that get more views
        </h2>
        <Button
            onClick={handleCreateNewDesign}
            className="text-[#8b3dff] bg-white hover:bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-2.5"
        >
            {loading && <Loader className="w-4 h-4" />}
            Start Desiging
        </Button>
    </div>
  )
}

export default Banner